<script lang="ts">
    import { eventStore, EventTypes } from "../../stores/eventStore";
    import { onMount } from 'svelte';

    let search: HTMLElement;

    function onSearchButtonClick () {
        eventStore.set({ type: EventTypes.SearchButtonClicked });
    }

    onMount(() => {
        search.classList.remove('no-js');
    });
</script>

<style lang="scss">
    @import '../scss/main';

    .search-button {
        $root: &;

        display: block;
        position: absolute;
        top: px-to-rem(128px);
        right: px-to-rem(30px);
        bottom: auto;
        left: auto;
        z-index: $z-index-2;
        appearance: none;
        border: none;
        background: none;
        width: px-to-rem(20px);
        height: px-to-rem(20px);
        cursor: pointer;

        &:after {
            @include icon('search');

            opacity: 1;
            transition: opacity $transition-1;
        }

        &.no-js {
            display: none;
        }

        @include breakpoint-tablet {
           display: none;
        }

        &__line {
            display: block;
            position: absolute;
            top: 0%;
            left: 50%;
            width: 20px;
            height: 1px;
            background-color: $color-grey-alto;
            opacity: 0;
            transform: translateX(-50%) rotate(0deg);
            transition: all $transition-1;

            &--alt {
                top: 100%;
                transform: translateX(-50%) rotate(0deg);
            }
        }

        &--active {
            &:after {
                opacity: 0;
            }

            #{$root}__line {
                opacity: 1;
                top: 50%;
                transform: translateX(-50%) rotate(45deg);

                &--alt {
                    top: 50%;
                    transform: translateX(-50%) rotate(-45deg);
                }
            }
        }
    }
</style>

<button type="button" class="search-button no-js" on:click={onSearchButtonClick} bind:this={search}>
    <span class="search-button__line"></span>
    <span class="search-button__line search-button__line--alt"></span>
</button>