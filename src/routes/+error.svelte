<script lang="ts">
	import { page } from '$app/stores';
</script>

<style lang="scss">
	@import '$lib/scss/main';

	.page-content {
		@include content-constraint;
	}
</style>

<svelte:head>
    <title>Error</title>
    <meta name="description" content="Error page" />
</svelte:head>

<div class="page-content">
	<h1>{$page?.error?.message || 'An error occurred'}</h1>
</div>
