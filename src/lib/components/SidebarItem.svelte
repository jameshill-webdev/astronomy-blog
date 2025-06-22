<script>
    export let article;
</script>

<style lang="scss">
    @import '../scss/main';

    .sidebar-item {
        $root: &;

        display: block;

        &__link {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            color: $color-grey-alto;
            text-decoration: none;
            padding-bottom: $spacing-1;
        
            &:active,
            &:hover,
            &:visited {
                color: $color-grey-alto;
                text-decoration: none;
            }

            &-text {
                @include typeface-body-large;

                display: block;
                width: calc(100% - 50px);
                color: $color-grey-alto;
            }

            &:hover,
            &:focus {
				#{$root}__hover-indicator:after {
                    left: $spacing-5;
				}
			}
        }

        &__hover-indicator {
            display: block;
    		position: relative;
			height: px-to-rem(12px);
			top: px-to-rem(1px);
            left: px-to-rem(-20px);

			&:after {
				@include icon('arrow');

                width: px-to-rem(23px);
                transition: left $transition-1;
			}

			@include breakpoint-tablet {
				width: px-to-rem(16px);
				height: px-to-rem(16px);
				top: px-to-rem(2px);
                left: px-to-rem(-10px);
			}
        }
    }
</style>

<li class="sidebar-item">
    <a href="/blog/{article.metadata.slug}" class="sidebar-item__link">
        <span class="sidebar-item__link-text">{article.metadata.title}</span>
        <span class="sidebar-item__hover-indicator"></span>
    </a>
</li>