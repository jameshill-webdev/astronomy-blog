<script lang="ts">
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';
    import { isTouchDevice } from '$lib/utilities/media';

	export let lowerImageSrc: string;
    export let lowerImageAlt: string;
    export let upperImageSrc: string;
    export let upperImageAlt: string;

    const initialPosition = 0.5;

    let container: HTMLElement;
    let slider: HTMLElement;
    let upperImage: HTMLElement;
    let scrollActive: boolean = false;

    function setSliderPosition (normalisedPosition: number) {
        const positionPercentage = normalisedPosition * 100;

        upperImage.style.clipPath = `rect(0 100% 100% ${positionPercentage}%)`;
        slider.style.left = `calc(${positionPercentage}% - ${(slider.getBoundingClientRect().width / 2) + 1}px)`;
    }

    function scrollSlider (xOffset: number) {
        if (!scrollActive) {
            return;
        }

        const containerRect = container.getBoundingClientRect();
        let x = Math.round(xOffset - containerRect.left);

        if (x <= 0) {
            x = 0;
        }
        else if (x > containerRect.width) {
            x = containerRect.width;
        }

        setSliderPosition(x / containerRect.width);
    }

    function setScrollActive (active: boolean) {
        scrollActive = active;
    }

    function onSliderMouseDown (event: MouseEvent) {
        setScrollActive(true);
    }

    function onSliderTouchStart (event: TouchEvent) {
        setScrollActive(true);
    }

    function onMouseUp (event: MouseEvent) {
        setScrollActive(false);
    }

    function onMouseLeave (event: MouseEvent) {
        setScrollActive(false);
    }

    function onTouchEnd (event: TouchEvent) {
        setScrollActive(false);
    }

    function onTouchCancel (event: TouchEvent) {
        setScrollActive(false);
    }

    function onMouseMove (event: MouseEvent) {
        scrollSlider(event.pageX);
    }

    function onTouchMove (event: TouchEvent) {
        scrollSlider(event.touches[0].pageX);
    }

    function initialise () {
        setSliderPosition(initialPosition);
    }

    $: if (scrollActive) {
        if (browser && isTouchDevice()) {
           document?.body.classList.add('hide-scrollbar');
        }
    } else {
        if (browser && isTouchDevice()) {
            document?.body.classList.remove('hide-scrollbar');
        }
    }

    onMount(() => {
        container.classList.remove('no-js');
        initialise();
    });
</script>

<style lang="scss">
	@import '../../lib/scss/main';

    $slider-size: 60px;

    .image-comparison {
        max-width: 100%;
        display: block;
        position: relative;
        overflow: hidden;
        margin-bottom: $spacing-1;
        background-color: $color-black;

        &.no-js {
            background-color: transparent;
        }

        &__image {
            display: block;
            width: 100%;
            height: auto;
            z-index: 2;

            &--upper {
                display: block;
                position: absolute;
                top: 0;
                left: 0;
                z-index: 3;

                .no-js & {
                    position: relative;
                    margin-top: $spacing-4;
                }
            }
        }

        &__slider {
            position: absolute;
            top: calc(50% - ($slider-size * 0.5));
            left: calc(50% - ($slider-size * 0.5));
            z-index: 4;
            width: $slider-size;
            height: $slider-size;
            background: transparent;
            border: 1px solid $color-white;
            border-radius: $slider-size * 0.5;
            cursor: grab;
            opacity: 1;
            transition: opacity $transition-3;

            .no-js & {
                display: none;
            }

            &::before,
            &::after {
                content: "";
                display: block;
                position: absolute;
                width: 1px;
                height: 999px;
                background-color: rgba(255, 255, 255, 0.5);
                left: 50%;
            }

            &::before {
                bottom: 100%;
            }

            &::after {
                top: 100%;
            }

            &--active {
                cursor: none;
                opacity: 0.2;
            }

            &-icon {
                width: 20px;
                position: relative;
                top: 2px;
                pointer-events: none;
            }
        }
    }
</style>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<div class="image-comparison no-js" role="group" bind:this={container} on:mousemove={onMouseMove} on:touchmove={onTouchMove} on:mouseup={onMouseUp} on:mouseleave={onMouseLeave} on:touchend={onTouchEnd} on:touchcancel={onTouchCancel}>
    <img class="image-comparison__image image-comparison__image--lower" src="{lowerImageSrc}" alt="{lowerImageAlt}">
    <img class="image-comparison__image image-comparison__image--upper" src="{upperImageSrc}" alt="{upperImageAlt}" bind:this={upperImage}>
    <button class="image-comparison__slider{scrollActive ? ' image-comparison__slider--active' : ''}" type="button" bind:this={slider} on:mousedown={onSliderMouseDown} on:touchstart={onSliderTouchStart}>
        <img class="image-comparison__slider-icon" src="/icons/arrows-left-right.svg" alt="">
    </button>
</div>