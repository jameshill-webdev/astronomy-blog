<script lang="ts">
    export let text: string;
    export let modifiers: string[] = [];
</script>

<style lang="scss">
    @import '$lib/scss/main';

    .paragraph {
        @include typeface-body;

        margin-bottom: $spacing-1;

        @include breakpoint-tablet {
            margin-bottom: $spacing-2;
        }

        &:last-child {
            margin-bottom: 0;
        }

        &--small {
            @include typeface-body-small;
        }
    }
</style>

<p class="paragraph{modifiers.map(modifier => ` paragraph--${modifier}`).join('')}">{@html text}</p>