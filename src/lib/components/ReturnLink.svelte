<script>
    /** @type {string} */
	export let href;
</script>

<style lang="scss">
	@import '../scss/main';

	.return-link {
		text-align: center;
        margin-bottom: 0;

        &__link {
            @include typeface-link;

            color: $color-grey-alto;
            display: inline-block;
            margin: 0 auto;
            position: relative;
            text-decoration: none;
            padding-left: px-to-rem(20px);
            padding-top: $spacing-3;
            padding-bottom: $spacing-3;

            &:hover,
            &:focus {
                &::before {
                    left: px-to-rem(-10px);
                }
            }

            &:hover,
            &:active,
            &:visited {
                color: $color-grey-alto;
            }

            &::before {
                content: url('/icons/play.svg');
                display: block;
                height: px-to-rem(13px);
                position: absolute;
                top: calc($spacing-3 + px-to-rem(5px));
                left: px-to-rem(-5px);
                transform: rotate(180deg);
                width: px-to-rem(12px);
                transition: left $transition-1;
            }
        }
    }
</style>

<nav class="return-link">
	<a class="return-link__link" href={href}>Return to listing</a>
</nav>
