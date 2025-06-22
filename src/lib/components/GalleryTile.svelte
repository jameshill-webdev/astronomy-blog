<script lang="ts">
    import type { GalleryItem } from "$lib/types";
    import { createEventDispatcher } from 'svelte';

    export let data: GalleryItem;
    
    let tileButton: HTMLButtonElement;

    const dispatch = createEventDispatcher();

    function open (target: EventTarget | null) {
        if (target && target instanceof Element) {
            if (target.classList.contains('tile--no-image')) {
                return false;
            }
        }

        dispatch('open', {
            target: tileButton,
            data: {
                ...data.expandedView,
                date: data.metadata.date
            }
        });
    }

    function onTileClick (event: MouseEvent) {
        open(event.target);
    }

    function onTileKeyUp (event: KeyboardEvent) {

        if (event.code === 'Enter') {
            open(event.target);
        }
    }
</script>

<style lang="scss">
    @import '../scss/main';

    $tile-size: px-to-rem(170px);
    $tile-size-desktop: px-to-rem(280px);

    .tile {
        @include gallery-tile-hoverable;

        display: block;
        position: relative;
        width: $tile-size;
        height: $tile-size;
        overflow: hidden;
        appearance: none;
        border: none;
        padding: 0;
        margin: 0;
        background: $color-grey-slate;
        color: $color-grey-alto;
        cursor: pointer;
        backface-visibility: hidden;
        z-index: $z-index-2;
        clip-path: $shape-hexagon;

        &:hover,
        &:focus {
            @include gallery-tile-hoverable-active;

            z-index: $z-index-3;
        }

        &--no-image {
            filter: saturate(1.1) brightness(1.1);
            cursor: default;

            &:hover,
            &:focus {
                @include gallery-tile-hoverable-active;
            }
        }

        &--no-image {
            background: $gradient-gallery-tile;
        }

        &__accessible-title {
            @include sr-only;
        }

        &__image {
            display: block;
            object-fit: cover;
            position: absolute;
            height: 100%;
            top: 50%;
            left: 50%;
            bottom: 0;
            right: 0;
            transform: translate(-50%, -50%);
            image-rendering: optimizeQuality;
        }

        &__placeholder-title {
            @include typeface-header-link;

            font-size: $font-size-s;
            margin: 0 auto;
            text-align: center;
            max-width: 50%;
            pointer-events: none;
        }

        @include breakpoint-tablet {
            width: $tile-size-desktop;
            height: $tile-size-desktop;
        }

        @include breakpoint-desktop {
            margin: 0 auto;
        }
    }
</style>

<button class="tile{data.collapsedView.thumbnail.src.length === 0 ? ' tile--no-image' : ''}" type="button" aria-disabled={data.collapsedView.thumbnail.src.length === 0} on:click={onTileClick} on:keyup={onTileKeyUp} bind:this={tileButton} aria-label="Gallery item: {data.collapsedView.title}">
    {#if data.collapsedView.thumbnail.src.length}
        <span class="tile__accessible-title">{data.collapsedView.title}</span>
        <img class="tile__image" src="{data.collapsedView.thumbnail.src}" alt="{data.collapsedView.thumbnail.alt}">
    {:else}
        <p class="tile__placeholder-title">Coming soon</p>
    {/if}
</button>