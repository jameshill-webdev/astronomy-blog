<script lang="ts">
	import type { HeadingClassModifier } from "$lib/types";

    export let level: 1 | 2 | 3;
    export let text: string;
</script>

<style lang="scss">
	@import '$lib/scss/main';

    h1, 
    h2, 
    h3 {
        text-align: center;
    }

    h1 {
        @include typeface-heading-1;

        max-width: 90%;
        margin: $spacing-1 auto $spacing-1 auto;

        @include breakpoint-tablet {
            max-width: 80%;
        }

        @include breakpoint-desktop {
            max-width: 70%;
        }
    }
    h2 {
        @include typeface-heading-2;
        
        margin: 0 0 $spacing-1 0;

        @include breakpoint-tablet {
            margin: 0 0 $spacing-2 0;
        }
    }
    h3 {
        @include typeface-heading-3;

        margin: 0 0 $spacing-1 0;

        @include breakpoint-tablet {
            margin: 0 0 $spacing-2 0;
        }
    }
    span {
        @include typeface-body-large;

        margin: 0 0 $spacing-1 0;

        @include breakpoint-tablet {
            margin: 0 0 $spacing-2 0;
        }
    }
</style>

{#if level === 1}
    <h1>{text}</h1>
{:else if level === 2}
    <h2>{text}</h2>
{:else if level === 3}
    <h3>{text}</h3>
{:else}
    <span>{text}</span>
{/if}