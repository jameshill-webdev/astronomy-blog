<script lang="ts">
	import SidebarItem from "./SidebarItem.svelte";

    export let data;
    export let listLabel: string;
</script>

<style lang="scss">
    @import '../../lib/scss/main';

    .sidebar-group {
        padding: 0 $spacing-1;

        @include breakpoint-tablet {
            margin: $spacing-2 0 0 $spacing-3;
            padding: 0;
        }

        &__heading {
            @include typeface-caption;

            display: inline-block;
            padding: $spacing-5 0;
            border-bottom: 1px solid $color-white-25;
            margin-bottom: $spacing-2;
        }

        &__list {
            list-style: none;
            padding: 0;
        }
    }
</style>

<section class="sidebar-group">
    <h2 class="sidebar-group__heading">{data.name}</h2>
    <ul class="sidebar-group__list" aria-label={listLabel}>
        {#each data.articles as article}
            <SidebarItem article={article} />
        {/each}
    </ul>
</section>