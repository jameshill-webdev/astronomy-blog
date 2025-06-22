<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { browser } from '$app/environment';
    import type { ExpandedGalleryItem, GalleryArticleMode } from "$lib/types";
    import PageComponent from "./PageComponent.svelte";
    import Figure from "./Figure.svelte";
    import ObjectInfo from "./ObjectInfo.svelte";
	import EquipmentAndMethod from "./EquipmentAndMethod.svelte";

    export let data: ExpandedGalleryItem;
    export let mode: GalleryArticleMode;
    export let isExpanded = false;
    export let isImageVisible = false;

    let imageElement: HTMLImageElement;
    let contentColumn: HTMLElement;

    const dispatch = createEventDispatcher();

    function onImageLoad () {
        dispatch('load', { imageSrc: imageElement.src });
    }

    function resetContentScroll () {
        contentColumn.scrollTop = 0;
    };

    $: if (isExpanded) {
        if (browser) {
            resetContentScroll();
        }
    }

    $: if (imageElement && imageElement.complete) {
        onImageLoad();
    } 
</script>

<style lang="scss">
    @import '../scss/main';

    .gallery-article {
        $root: &;

        @include content-constraint;

        &--overlay {
            margin-bottom: 0;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            flex-wrap: nowrap;
            max-height: 100vh;
            overflow-x: hidden;
            overflow-y: auto;
            opacity: 0;
            transform: scale(0.5);
            transition: all $transition-4;

            @include breakpoint-desktop {
                flex-direction: row-reverse;
                align-items: stretch;
                overflow-y: hidden;
            }

            &#{$root}--expanded {
                opacity: 1; 
                transform: scale(1);
            }
        }

        &__column {
            #{$root}--overlay & {
                padding-top: $spacing-1;

                @include breakpoint-tablet {
                    padding-top: $spacing-3;
                }

                &:last-child {
                    @include scrollbar;

                    padding-top: 0;
                    padding-bottom: $spacing-1;
                    padding-right: $spacing-5;
                    margin: $spacing-1 0;
                    
                    @include breakpoint-desktop {
                        overflow-x: hidden;
                        overflow-y: auto;
                    }
                }

                @include breakpoint-desktop {
                    width: 50%;
                    padding-right: 0;
                    display: flex;
                    padding-top: $spacing-3;
                    padding-bottom: $spacing-3;
                    max-height: 100%;

                    &:last-child {
                        margin: $spacing-3 $spacing-1 $spacing-3 0;
                        padding-right: $spacing-1;
                    }
                }
            }
        }

        &__content {
            margin-bottom: px-to-rem(80px);

            @include breakpoint-tablet {
                margin-bottom: $spacing-1;
            }
        }

        &__article {
            padding-bottom: $spacing-1;
        }
        
        &__heading {
            @include typeface-heading-3;

            text-align: left;
            font-size: $font-size-m;
            margin-top: $spacing-1;
            margin-bottom: $spacing-1;
            padding-bottom: $spacing-5;
            border-bottom: 1px solid $color-grey-alto;

            @include breakpoint-tablet {
                margin-top: $spacing-2;
                margin-bottom: $spacing-2;
                padding-bottom: $spacing-5;
                font-size: $font-size-xl;
            }
        }

        &__heading {
            @include typeface-heading-1;

            padding-bottom: $spacing-1;
            margin: $spacing-1 auto $spacing-2 auto;
            text-align: center;

            #{$root}--overlay & {
                @include typeface-heading-2;

                text-align: left;
                margin-top: $spacing-4;

                @include breakpoint-desktop {
                    margin-top: 0;
                }
            }
        }

        &__page-components {
            text-align: left;
        }

        &__image {
            display: block;
            max-width: 100%;
            background-color: $color-black;
            opacity: 0;

            &--visible {
                opacity: 1;
            }

            &-link {
                display: flex;
                flex-direction: column;
                justify-content: center;
                background-color: $color-black;
            }
        }

        &__info {
            display: flex;
            flex-direction: column;
            flex-wrap: nowrap;

            @include breakpoint-desktop {
                flex-direction: row;
            }

            &-column {
                display: block;
                margin-top: $spacing-1;

                @include breakpoint-desktop {
                    width: calc(50% - $spacing-3);
                    padding-right: $spacing-3;

                    &:last-child {
                        padding-right: 0;
                    }

                    #{$root}--overlay & {
                        width: 100%;
                    }
                }
            }
        }
    }
</style>

<article class="gallery-article gallery-article--{mode}{isExpanded ? ' gallery-article--expanded' : ''}">
    {#if mode === 'static'}
        <h1 class="gallery-article__heading">{data.title}</h1>
    {:else if mode === 'overlay'}
        <div class="gallery-article__column">
            <a href="{data.image.src}" target="_blank" class="gallery-article__image-link">
                <img class="gallery-article__image{isImageVisible ? ' gallery-article__image--visible' : ''}" src="{data.image.src}" alt="{data.image.alt}" on:load={onImageLoad} bind:this={imageElement}>
            </a>
        </div>
    {/if}
    <div class="gallery-article__column" bind:this={contentColumn}>
        <div class="gallery-article__content">
            {#if mode === 'overlay'}
                <h1 class="gallery-article__heading">{data.title}</h1>
                <ObjectInfo data={data.objectInformation} mode={mode} showHeading={false} />
            {/if}
            <div class="gallery-article__page-components">
                {#if mode === 'static'}
                    <Figure expandableImageProps={data.image} />
                {/if}
                {#each data.content.components as component}
                    <PageComponent component={component} />
                {/each}
            </div>
            <div class="gallery-article__info">
                {#if mode === 'static'}
                    <div class="gallery-article__info-column">
                        <ObjectInfo data={data.objectInformation} mode={mode} />
                    </div>
                {/if}
                <div class="gallery-article__info-column">
                    <EquipmentAndMethod data={data.equipmentAndMethod} date={data?.date || 'unknown'} mode={mode} />
                </div>
            </div>
        </div>
    </div>
</article>
