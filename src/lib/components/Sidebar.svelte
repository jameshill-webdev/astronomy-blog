<script lang="ts">
    import { debounce } from 'lodash-es';
    import { browser } from '$app/environment';
    import { onMount, onDestroy } from 'svelte';
    import { createFocusTrap } from 'focus-trap';
    import type { FocusTrap } from 'focus-trap';
    import type { Article, ArticleGroup } from '$lib/types.d.ts';
    import { eventStore, EventTypes } from '../../stores/eventStore';
    import type { CustomEvent } from '../../stores/eventStore';
	import SidebarGroup from './SidebarGroup.svelte';

    export let articles: Article[];
    export let isOpen = false;
    export let searchDebounceMs = 300;

    const articleGroups: ArticleGroup[] = [];
    const filteredArticleGroups: ArticleGroup[] = [];

    let sidebarFocusTrap : FocusTrap;
    let sidebarContainer: HTMLElement;

    function updatePageScrollingLock () {
        isOpen
            ? document?.body.classList.add('hide-scrollbar')
            : document?.body.classList.remove('hide-scrollbar');
    }

    function openOverlay () {
        eventStore.set({ type: EventTypes.OverlayOpened, data: 'Sidebar' });
        isOpen = true;
        updatePageScrollingLock();
    }

    function closeOverlay () {
        deactivateFocusTrap();
        isOpen = false;
        updatePageScrollingLock();
    }

    function toggleOverlay () {
        isOpen ? closeOverlay() : openOverlay();
    }

    function activateFocusTrap () {
        sidebarFocusTrap = createFocusTrap(sidebarContainer, { allowOutsideClick: true });
        sidebarFocusTrap.activate();
    }

    function deactivateFocusTrap () {
        sidebarFocusTrap.deactivate();
    }

    function initialiseArticleGroups () {
        articleGroups.length = 0;

        for (const article of articles) {
            article.metadata.year = article.metadata.date.split('-')[0];

            let group = articleGroups.find(group => group.name === article.metadata.year);

            if (!group) {
                const newGroup = {
                    name: article.metadata.year,
                    articles: []
                };

                articleGroups.push(newGroup);
                group = articleGroups[articleGroups.length - 1];
            }

            group.articles.push(article); 
        }

        filterArticleGroups('');
    }

    function filterArticleGroups (searchTerm: string) {
        filteredArticleGroups.length = 0;

        for (const group of articleGroups) {
            const matchingArticles = group.articles.filter(article => searchTerm.length === 0 || article.metadata.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()));

            if (matchingArticles.length) {
                filteredArticleGroups.push({
                    name: group.name,
                    articles: matchingArticles
                });
            }
        }

        filteredArticleGroups.sort((a, b) => parseInt(b.name) - parseInt(a.name));
    }

    const updateSearchTerm = debounce((event: Event) => {
        filterArticleGroups((event.target as HTMLInputElement).value);
    }, searchDebounceMs);

    function onCloseButtonClick (event: Event) {
        closeOverlay();
    }

    initialiseArticleGroups();

    const unsubscribe = eventStore.subscribe((event: CustomEvent) => {
        switch (event?.type) {
            case EventTypes.OverlayOpened:
                if (event?.data !== 'Sidebar') {
                    closeOverlay();
                    return;
                }
                if (browser) {
                    window.requestAnimationFrame(() => {
                        activateFocusTrap();
                    });
                }
                return;
            case EventTypes.SearchButtonClicked:
                toggleOverlay();
                return;
            default:
                return;
        }
    });

    onMount(() => {
        sidebarContainer.classList.remove('no-js');
    });

    onDestroy(() => {
        unsubscribe();
    });
</script>

<style lang="scss">
	@import '../../lib/scss/main';

	.sidebar {
        @include overlay;

        padding-top: px-to-rem(30px);
        z-index: $z-index-4;
        flex-direction: column;
        justify-content: flex-start;

        @include breakpoint-tablet {
            display: block;
            position: relative;
            background: none;
            margin-top: px-to-rem(46px);
            padding-top: 0;
        }

        @include breakpoint-desktop {
            margin-top: px-to-rem(69px);
        }

        &__close-button {
            display: block;
            position: absolute;
            top: px-to-rem(20px);
            right: px-to-rem(20px);
            z-index: $z-index-2;
            appearance: none;
            border: none;
            background: none;
            width: px-to-rem(16px);
            height: px-to-rem(16px);
            cursor: pointer;

            &-line {
                display: block;
                position: absolute;
                top: 50%;
                left: 50%;
                width: 20px;
                height: 1px;
                background-color: $color-grey-alto;
                opacity: 1;
                transform: translateX(-50%) rotate(45deg);

                &--alt {
                    transform: translateX(-50%) rotate(-45deg);
                }
            }

            @include breakpoint-tablet {
                display: none;
            }
        }

        &__search {
            $root: &;

            display: block;
            position: relative;
            margin-top: $spacing-1;
            margin-bottom: $spacing-2;
            padding: 0 $spacing-1;

            .no-js & {
                display: none;

				@include breakpoint-tablet {
					display: block;
				}
            }

            @include breakpoint-tablet {
                margin: 0 0 0 $spacing-3;
                padding: 0;
            }

            &-input {
                @include typeface-body;

                font-size: $font-size-s;
                height: px-to-rem(50px);
                background: transparent;
                border: none;
                color: $color-grey-alto;
                width: 100%;
                padding: 0;
                border-bottom: $border-bottom-1;
                transition: all $transition-3;

                &::placeholder {
                    color: $color-grey-alto;
                    opacity: 0.4;
                }

                &:focus {
                    $padding: px-to-rem(10px);

                    outline: 1px solid $color-white;
                    border-bottom-color: transparent;
                    padding: 0 0 0 $padding;
                    width: calc(100% - $padding);

                    & + #{$root}-icon {
                        right: $spacing-5;
                    }
                }
            }

            &-icon {
                @include icon('search');

                display: none;
                width: px-to-rem(16px);
                height: px-to-rem(16px);
                top: px-to-rem(18px);
                right: 0;
                bottom: auto;
                left: auto;
                transition: right $transition-1;
                pointer-events: none;

                @include breakpoint-tablet {
                    display: block;
                }
            }
        }

        &__heading {
            @include typeface-heading-4;

            display: none;
            border-bottom: $border-bottom-1;
            padding-bottom: $spacing-1;
            margin-top: px-to-rem(48px);
            margin-left: $spacing-3;

            .no-js & {
                display: block;
            }

            @include breakpoint-desktop {
                margin-top: 0;
                padding-bottom: px-to-rem(14px);
            }
        }
    }
</style>

<nav class="sidebar {isOpen ? 'sidebar--active' : 'no-js'}" bind:this={sidebarContainer}>
    <button type="button" class="sidebar__close-button" on:click={onCloseButtonClick}>
        <span class="sidebar__close-button-line"></span>
        <span class="sidebar__close-button-line sidebar__close-button-line--alt"></span>
    </button>
    <div class="sidebar__search">
        <input type="text" class="sidebar__search-input" placeholder="Search articles" on:keyup={updateSearchTerm} />
        <span class="sidebar__search-icon"></span>
    </div>
    <h2 class="sidebar__heading">By year</h2>
    <div>
        {#each filteredArticleGroups as group}
            <SidebarGroup data={group} listLabel={`Search results from ${group.name}`} />
        {/each}
    </div>
</nav>