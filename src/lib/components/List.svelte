<script lang="ts">
    export let listType: 'ordered' | 'unordered';
    export let items: string[];
</script>

{#if listType === 'ordered'}
    <ol>
        {#each items as item}
            <li>{item}</li>
        {/each}
    </ol>
{:else}
    <ul>
        {#each items as item}
            <li>{item}</li>
        {/each}
    </ul>
{/if}