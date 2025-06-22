<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { TRANSITION_4_DURATION_MS } from "$lib/constants";
	import Overlay from "./Overlay.svelte";

    export let src: string;
    export let expandedSrc: string;
    export let alt: string = '';
    export let isOpen = false;
    export let isGalleryOverlay = false;

    const dispatch = createEventDispatcher();

    let isExpanded = false;
    let image: HTMLImageElement;
    let expandedImage: HTMLImageElement;

    function openOverlay () {
        isOpen = true;
        dispatch('open');
    }

    function closeOverlay () {
        isOpen = false;
        document.body.style.cursor = '';
        dispatch('close');
    }

    function expand () {
        openOverlay();

        window.requestAnimationFrame(() => {
            isExpanded = true;
        });
    }

    function collapse () {
        isExpanded = false;

        setTimeout(() => {
            closeOverlay();
        }, TRANSITION_4_DURATION_MS);
    }

    function onExpandButtonClick (event: Event) {
        event.preventDefault();
        expand();
    }

    function onOverlayClose () {
        collapse();
    }

    function onImageLoad (event: Event) {
        dispatch('imageLoad');
    }
</script>

<style lang="scss">
    @import '../scss/main';

    .expandable-image {
        &__container {
            display: block;
            position: relative;
            margin-bottom: $spacing-1;

            &--gallery-overlay {
                display: flex;
                width: 100%;
                max-width: 100%;
                margin-bottom: 0;

                @include breakpoint-desktop {
                    height: 100%;
                    background-color: $color-black;
                    flex-direction: column;
                    justify-content: center;
                }
            }
        }

        &__expand-button {
            display: block;
            margin: 0 auto;
            appearance: none;
            background: none;
            border: none;
            padding: 0;
            cursor: pointer;

            &-label {
                @include sr-only;
            }
        }

        &__image {
            display: block;
            max-width: 100%;
            margin: 0 auto;
        }

        &__expanded-image {
            $collapsed-size: 50;
            $expanded-size: 100;

            display: block;
            position: relative;
            transition: opacity $transition-4;
            opacity: 0;
            pointer-events: none;
            width: auto;
            height: #{$collapsed-size}vh;

            @include landscape {
                width: #{$collapsed-size}vw;
                height: auto;
            }

            &--expanded {
                opacity: 1;
                width: auto;
                height: #{$expanded-size}vh;

                @include landscape {
                    width: #{$expanded-size}vw;
                    height: auto;
                }
            }
        }
    }
</style>

<section class="expandable-image__container{ isGalleryOverlay ? ' expandable-image__container--gallery-overlay' : ''}">
    <a href="{expandedSrc}" target="_blank" class="expandable-image__expand-button" on:click={onExpandButtonClick}>
        <span class="expandable-image__expand-button-label">View full size image</span>
        <img class="expandable-image__image" src="{src}" alt="{alt}" bind:this={image} />
    </a>
    <Overlay isOpen={isOpen} isExpanded={isExpanded} allowContentScrolling={true} on:close={onOverlayClose}>
        <img class="expandable-image__expanded-image{isExpanded ? ' expandable-image__expanded-image--expanded' : ''}" src={expandedSrc} alt={alt || ''} bind:this={expandedImage} on:load={onImageLoad} />
    </Overlay>
</section>
