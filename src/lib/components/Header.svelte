<script lang="ts">
	import PrimaryNav from '$lib/components/PrimaryNav.svelte';
</script>

<style lang="scss">
    @import '../scss/main';

    .header {
        @include content-constraint;

        padding-top: $spacing-5;
        padding-bottom: $spacing-5;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        @include breakpoint-tablet {
            justify-content: space-between;
        }

        &__logo {
            @include nav-link;
            @include typeface-logo;

            position: relative;
            z-index: $z-index-3;
			white-space: nowrap;
        }
    }
</style>

<header class="header">
	<a class="header__logo" href="/">
        <span class="header__logo-text">JH Astro</span>
    </a>
	<PrimaryNav />
</header>