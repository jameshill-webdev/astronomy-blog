<script lang="ts">
    import { browser } from '$app/environment';

    let isHydrated: boolean = false;

    $: if (browser) {
        if (typeof window !== 'undefined') {
            requestAnimationFrame(() => {
                isHydrated = true;
            });
        }
    }
</script>

<style lang="scss">
   @import '../scss/main';

    $loader-size-mobile: 64px;

    .loader {
        display: block;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: $color-blue-midnight-80;
        z-index: $z-index-6;
        transition: opacity $transition-2;
        opacity: 0;
        pointer-events: none;

        &--active {
            opacity: 1;
            pointer-events: auto;

            :global(.no-js) & {
                display: none;
            }
        }

        &__icon {
            @include icon('loader');

            position: fixed;
            top: 50%;
            left: 50%;
            width: $loader-size-mobile;
            height: $loader-size-mobile;
            transform: translate(-50%, -50%);
        }
        
        &__label {
            @include sr-only;
        }
    }
</style>

<div class="loader{isHydrated ? '' : ' loader--active'}">
    <div class="loader__icon"></div>
    <span class="loader__label">Loading</span>
</div>