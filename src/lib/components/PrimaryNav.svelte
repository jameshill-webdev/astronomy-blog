<script lang="ts">
    import { afterNavigate } from '$app/navigation';
    import { page } from '$app/stores';
    import type { NavPageName } from '$lib/types';

    let activePage: NavPageName = 'gallery';

    afterNavigate(() => {
        if ($page.url.pathname === '/' || $page.url.pathname.includes('/gallery')) {
            activePage = 'gallery';
        }
        else if ($page.url.pathname.includes('/blog')) {
            activePage = 'blog';
        }
        else if ($page.url.pathname.includes('/about')) {
            activePage = 'about';
        }
    });
</script>

<style lang="scss">
    @import '../scss/main';

    .nav {
        $root: &;

        background: rgba(0, 22, 70, 0.975);
        border-top: 1px solid $color-white-25;
        position: fixed;
        right: 0;
        bottom: 0;
        left: 0;
        height: px-to-rem(60px);
        z-index: $z-index-6;

        @include breakpoint-tablet {
            display: block;
            position: static;
            background: none;
            border-top: none;
        }

        &__link {
            @include nav-link;

            &:after {
                left: auto;
                right: 0;
                transform: none;
            }

            &--active {
                span:after {
                    width: 100%;
                }
            }

            @include breakpoint-tablet {
                &:after {
                    left: 50%;
                    right: auto;
                    transform: translateX(-50%);
                }

                &--active {
                    span:after {
                        width: 0%;
                    }
                }
            }
        }

        &__list {
            @include content-constraint;

            display: flex;
            flex-direction: row;
            justify-content: space-evenly;
            list-style: none;
            padding: 0;

            @include breakpoint-tablet {
                display: flex;
                flex-direction: row;
                justify-content: flex-end;
                align-items: center;
                margin: 0;
                padding-top: 0;
                padding-right: 0;
                text-align: right; // ?
            }
        }

        &__item {
            margin: 0;

            @include breakpoint-tablet {
                margin-bottom: 0;
            }

            &:last-child {
                #{$root}__link {
                    @include breakpoint-tablet {
                        padding-right: 0;
                    }
                }
            }
        }

        &__link {
            @include breakpoint-tablet {
                padding-right: $spacing-2;
            }
        }
    }
</style>

<div>
    <nav class="nav">
        <ul class="nav__list">
            <li class="nav__item">
                <a href="/" class="nav__link{activePage === 'gallery' ? ' nav__link--active' : ''}">
                    <span>Gallery</span>
                </a>
            </li>
            <li class="nav__item">
                <a href="/blog" class="nav__link{activePage === 'blog' ? ' nav__link--active' : ''}">
                    <span>Blog</span>
                </a>
            </li>
            <li class="nav__item">
                <a href="/about" class="nav__link{activePage === 'about' ? ' nav__link--active' : ''}">
                    <span>About</span>
                </a>
            </li>
        </ul>
    </nav>
</div>
