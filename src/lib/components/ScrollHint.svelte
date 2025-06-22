<script lang="ts">
    import { browser } from '$app/environment';

    export let isActive = false;

    const activeDuration = 2000;

    $: if (isActive) {
        if (browser) {
            setTimeout(() => {
                isActive = false;
            }, activeDuration);
        }
    }
</script>

<style lang="scss">
    @import '../scss/main.scss';

    $icon-size: px-to-rem(36px);
    $chevron-gap: px-to-rem(40px);

    .scroll-hint {
        display: block;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: $color-blue-midnight-50;
        opacity: 0;
        transition: opacity $transition-1;

        &--active {
            opacity: 1;
        }

        &__icons {
            display: flex;
            position: absolute;
            flex-direction: row;
            justify-content: space-between;
            flex-wrap: nowrap;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }

        &__icon {
            display: block;
            width: $icon-size;
            height: $icon-size;

            &--left,
            &--right {
                opacity: 0.5;
                transition: opacity $transition-1;

                &.active {
                    opacity: 1;
                }
            }

            &--left {
                @include icon('chevron-up');
                
                position: relative;
                transform: rotate(-90deg);
            }

            &--right {
                @include icon('chevron-up');
                
                position: relative;
                transform: rotate(90deg);
            }

            &--pointer {
                @include icon('hand-pointer');
                
                position: relative;
                transform: rotate(0deg);
                margin: 0 $chevron-gap;
                animation: hand 3s infinite 0.5s;
            }
        }
    }

    @keyframes hand {
        0% {
            transform: translateX(0px) rotate(0deg);
        }
        10% {
            transform: translateX(20px) rotate(10deg);
        }
        35% {
            transform: translateX(-20px) rotate(-10deg);
        }
        50% {
            transform: translateX(0px) rotate(0deg);
        }
        100% {
            transform: translateX(0px) rotate(0deg);
        }
    }
</style>

<div class="scroll-hint{isActive ? ' scroll-hint--active' : ''}">
    <div class="scroll-hint__icons">
        <span class="scroll-hint__icon scroll-hint__icon--left"></span>
        <span class="scroll-hint__icon scroll-hint__icon--pointer"></span>
        <span class="scroll-hint__icon scroll-hint__icon--right"></span>
    </div>
</div>