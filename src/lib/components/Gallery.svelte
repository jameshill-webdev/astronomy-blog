<script lang="ts">
    import { onMount } from "svelte";
    import { debounce } from 'lodash-es';
    import type { ExpandedGalleryItem, GalleryItem } from "$lib/types";
    import { TRANSITION_4_DURATION_MS, TILE_OPEN_DELAY } from "$lib/constants";
	import GalleryTile from "./GalleryTile.svelte";
    import GalleryOverlay from "./GalleryOverlay.svelte";
    export let data: { items: GalleryItem[] };
    
    const resizeDebounceMs = 300;
    const galleryColumns: GalleryItem[][] = [];
    const tilesPerEvenColumn = 2;
    const tilesPerOddColumn = 3;

    let isOpen = false;
    let isExpanded = false;
    let expandedItemContent: ExpandedGalleryItem = {
        ...data.items[0].expandedView,
        date: data.items[0].metadata.date
    };
    let lastOpenedTile: HTMLElement;
    let gallery: HTMLElement;
    
    function populateGrid () {
        galleryColumns.length = 0;
        let column = [];

        for (let i = 0; i < data.items.length; i++) {
            const item = data.items[i];
            const itemsPerColumn = galleryColumns.length % 2 === 0 ? tilesPerEvenColumn : tilesPerOddColumn;

            if (column.length === itemsPerColumn) {
                galleryColumns.push(column);
                column = [];
            }

            item.index = i;

            column.push(item);
        }

        galleryColumns.push(column);
    }

    function openTile (tile: HTMLElement, content: ExpandedGalleryItem) {
        expandedItemContent = content;
        isOpen = true;
        
        if (tile instanceof HTMLElement) {
            lastOpenedTile = tile;
        }

        setTimeout(() => {
            isExpanded = true;
            window.addEventListener('keydown', handleKeyDown);
        }, TILE_OPEN_DELAY);
    }

    function closeTile () {
        isExpanded = false;

        window.removeEventListener('keydown', handleKeyDown);

        setTimeout(() => {
            isOpen = false;
            lastOpenedTile?.focus();
        }, TRANSITION_4_DURATION_MS);
    }

    function onTileOpen (event: CustomEvent) {
        openTile(event.detail.target, event.detail.data);
    }

    function onTileClose () {
        closeTile();
    }

    function handleKeyDown (event: KeyboardEvent) {
        switch (event.code) {
            case 'Escape':
                closeTile();
                break;
            default:
                break;
        }
    }

    const onWindowResize = debounce(() => {
        populateGrid();
    }, resizeDebounceMs);

    onMount(() => {
        gallery.classList.remove('no-js');
        populateGrid();

        window.addEventListener('resize', onWindowResize);

        return () => {
            window.removeEventListener('resize', onWindowResize);
        };
    });
</script>

<style lang="scss">
    @import '../scss/main';

    $tile-size: px-to-rem(180px);
    $tile-size-desktop: px-to-rem(280px);

    .gallery {
        display: block;
        text-align: center;
        margin-top: $spacing-1;
        margin-bottom: $spacing-2;
        margin-left: 0;

        @include breakpoint-tablet {
            margin-left: 0;
        }

        @include breakpoint-desktop {
            margin-left: 0;
        }

        &__container {
            @include scrollbar;

            overflow-x: auto;
            overflow-y: hidden;
            user-select: none;

            @include breakpoint-desktop {
                overflow-x: hidden;
                overflow-y: hidden;
                padding-bottom: px-to-rem(120px);
            }
        }

        &__tiles {
            list-style: none;
            display: flex;
            flex-direction: row-reverse;
            flex-wrap: nowrap;
            justify-content: flex-end;
            align-items: center;
            padding: 0;
            margin: 0;
            padding-bottom: $spacing-2;

            .no-js & {
                display: none;
            }

            @include breakpoint-desktop {
                flex-direction: column-reverse;
            }
        }

        &__column {
            display: flex;
            flex-direction: column;
            justify-content: center;

            @include breakpoint-desktop {
                flex-direction: row;
            }
        }

        &__item {
            width: px-to-rem(135px);
            height: px-to-rem(156px);

            @include breakpoint-tablet {
                width: px-to-rem(222px);
                height: px-to-rem(256px);
            }

            @include breakpoint-desktop {
                flex-direction: column;
                width: px-to-rem(452px);
                height: px-to-rem(130px);
            }
        }

        &__nav {
            @include content-constraint;

            display: none;

            .no-js & {
                display: block;
            }

            &-items {
                list-style: none;
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                padding: $spacing-3 0 25vw 0;
                margin-right: -($spacing-5);

                @include breakpoint-tablet {
                    padding-bottom: 10vw;
                }

                @include breakpoint-desktop {
                    padding-bottom: 0;
                }
            }

            &-item {
                display: block;
                position: relative;
                width: 56%;
                padding-right: 2.5%;
                box-sizing: border-box;
                margin-right: -13%;
                margin-top: -4.3%;

                &:nth-child(even) {
                    transform: translateY(46%);
                }

                @include breakpoint-tablet {
                    width: 31.1%;
                    margin-right: -7.6%;
                    margin-top: -1.5%;

                    &:nth-child(even) {
                        transform: translateY(47%);
                    }
                }

                @include breakpoint-desktop {
                    width: 22%;
                    margin-right: -6%;
                    margin-top: -1.2%;
                }
            }

            &-link {
                display: block;
                position: relative;
                transition: transform $transition-4, filter $transition-4;

                @include gallery-tile-hoverable;

                &:hover,
                &:focus {
                    @include gallery-tile-hoverable-active;

                    outline: none;
                }

                &-image-fallback {
                    background: $gradient-gallery-tile;
                }

                &-image,
                &-image-fallback {
                    display: block;
                    width: 100%;
                    height: 100%;
                    aspect-ratio: 1;
                    object-fit: cover;
                    clip-path: $shape-hexagon;
                }

                &-label {
                    @include sr-only;
                }
            }
        }
    }
</style>

<section class="gallery no-js" bind:this={gallery}>
    <div class="gallery__container">
        <nav class="gallery__tiles" aria-label="Photo gallery">
            {#each galleryColumns as column}
                <div class="gallery__column">
                    {#each column as item}
                        <div class="gallery__item">
                            <GalleryTile data={item} on:open={onTileOpen} />
                        </div>
                    {/each}
                </div>
            {/each}
        </nav>
        <nav class="gallery__nav">
            <ul class="gallery__nav-items">
                {#each data.items as item}
                    {#if item.collapsedView.thumbnail.src.length}
                        <li class="gallery__nav-item">
                            <a href="/gallery/{item.metadata.slug}" class="gallery__nav-link">
                                <img src="{item.collapsedView.thumbnail.src}" alt="{item.collapsedView.thumbnail.alt}" class="gallery__nav-link-image">
                                <p class="gallery__nav-link-label">{item.collapsedView.title}</p>
                            </a>
                        </li>
                    {/if}
                {/each}
            </ul>
        </nav>
    </div>
    <GalleryOverlay data={expandedItemContent} isOpen={isOpen} isExpanded={isExpanded} on:close={onTileClose} />
</section>