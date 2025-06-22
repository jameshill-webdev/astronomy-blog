<script context="module">
	export const hydrate = true;
</script>

<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import Loader from '$lib/components/Loader.svelte';
	import { afterNavigate } from '$app/navigation';

	afterNavigate(() => {
		document?.body.classList.remove('hide-scrollbar');
	});
</script>

<style lang="scss">
	@import '../lib/scss/main';

	main {
		margin: 0;
		border-top: 1px solid $color-white-25;
		border-bottom: 1px solid $color-white-25;
	}
</style>

<svelte:head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta charset="UTF-8" />
</svelte:head>

<Header />
<main>
	<slot />
	<Loader />
</main>
<Footer />
