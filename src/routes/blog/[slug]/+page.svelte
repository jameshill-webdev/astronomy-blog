<script lang="ts">
	import Heading from '$lib/components/Heading.svelte';
	import PageComponent from '$lib/components/PageComponent.svelte';
	import ReturnLink from '$lib/components/ReturnLink.svelte';
	import { getBlockClassesForComponent } from '$lib/utilities/page-component';

	export let data;
</script>

<style lang="scss">
	@import '$lib/scss/main';

	.article {
		@include article;
	}
</style>

<svelte:head>
    <title>Blog article | {data.metadata.title || data.metadata.slug} | JH Astro</title>
	<meta name="description" content={data.metadata.summary.slice(0, 100)} />
	<meta property="og:title" content="Blog article | {data.metadata.title || data.metadata.slug} | JH Astro" />
    <meta property="og:description" content={data.metadata.summary.slice(0, 100)} />
    <meta property="og:image" content={data.metadata.thumbnail.src} />
    <meta property="og:url" content="/blog/{data.metadata.slug}" />
    <meta property="og:type" content="article" />
</svelte:head>

<article class="article">
	<div class="article__block article__block--gap-large">
		<Heading level={1} text={data.content.heading} />
	</div>
	{#each data.content.components as component}
		<div class="article__block{getBlockClassesForComponent(component)}">
			<PageComponent component={component} />
		</div>
	{/each}
	<ReturnLink href="/blog" />
</article>