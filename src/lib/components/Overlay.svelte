<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { browser } from '$app/environment';
    import { createFocusTrap } from 'focus-trap';
    import type { FocusTrap } from 'focus-trap';

    export let isOpen = false;
    export let isExpanded = false;
    export let isCloseButtonVisible = true;
    export let allowContentScrolling = false;

    let closeButton: HTMLButtonElement;
    let overlay: HTMLElement;
    let overlayFocusTrap : FocusTrap;

    const dispatch = createEventDispatcher();

    function activateFocusTrap () {
        overlayFocusTrap = createFocusTrap(overlay, { allowOutsideClick: true });
        overlayFocusTrap.activate();
    }

    function deactivateFocusTrap () {
        overlayFocusTrap?.deactivate();
    }

    function onCloseButtonClick () {
        dispatch('close');
    }

    $: if (isOpen) {
        if (browser) {
            (overlay?.closest('.gallery-overlay__container') || document?.body).classList.add('hide-scrollbar');

            window.requestAnimationFrame(() => {
                activateFocusTrap();
            });
        }
    } else {
        if (browser) {
            (overlay?.closest('.gallery-overlay__container') || document?.body).classList.remove('hide-scrollbar');
            deactivateFocusTrap();
        }
    }
</script>

<style lang="scss">
    @import '../scss/main';

    .overlay {
        @include overlay;

        $root: &;

        z-index: $z-index-5;
        opacity: 0;
        transition: opacity $transition-1;

        &__content {
            position: relative;
            max-height: 100%;
            max-width: 100%;
            overflow: hidden;
            z-index: $z-index-2;
            top: 50%;
            transform: translateY(-50%);

            &--scrolling {
                @include scrollbar;

                overflow: auto;
            }

            .gallery-overlay & {
                overflow-y: scroll;

                @include breakpoint-desktop {
                    overflow-y: hidden;
                }
            }
        }

        &__close {
            $close-button-size: px-to-rem(50px);
            $close-button-line-size: px-to-rem(40px);

            display: block;
            position: fixed;
            top: $spacing-1;
            right: $spacing-1;
            background-color: $color-black-90;
            width: $close-button-size;
            height: $close-button-size;
            z-index: $z-index-2;
            border: none;
            transition: opacity $transition-1;

            cursor: pointer;

            &:before,
            &:after {
                content: "";
                display: block;
                position: absolute;
                top: 50%;
                left: 50%;
                width: $close-button-line-size;
                height: 1px;
                background-color: $color-grey-alto;
                transition: top $transition-1, transform $transition-1;
            }

            &:before {
                transform: translateX(-50%) rotate(0deg);
            }

            &:after {
                transform: translateX(-50%) rotate(0deg);
            }

            @include breakpoint-tablet {
                top: $spacing-3;
                right: px-to-rem(64px);
            }

            &-label {
                @include sr-only;
            }

            &--hidden {
                opacity: 0;
                pointer-events: none;
            }
        }

        &--active {
            .overlay__close {
                opacity: 0;

                &:before {
                    transform: translateX(-50%) rotate(0deg);
                }

                &:after {
                    transform: translateX(-50%) rotate(0deg);
                }
            }
        }

        &--expanded {
            opacity: 1;
            
            .overlay__close {
                opacity: 1;

                &:before {
                    transform: translateX(-50%) rotate(-45deg);
                }

                &:after {
                    transform: translateX(-50%) rotate(45deg);
                }
            }
        }
    }
</style>

<section class="overlay{isOpen ? ' overlay--active' : ''}{isExpanded ? ' overlay--expanded' : ''}" bind:this={overlay}>
    <div class="overlay__content{allowContentScrolling ? ' overlay__content--scrolling' : ''}">
        <slot></slot>
    </div>
    <button type="button" class="overlay__close{isCloseButtonVisible ? '' : ' overlay__close--hidden'}" on:click={onCloseButtonClick} bind:this={closeButton}><span class="overlay__close-label">close overlay</span></button>
</section>