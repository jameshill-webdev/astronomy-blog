<script>
    import Heading from '$lib/components/Heading.svelte';
	import PageComponent from '$lib/components/PageComponent.svelte';
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
    <title>About</title>
    <meta name="description" content={data.metadata.summary} />
	<meta property="og:title" content="{data.metadata.title} | JH Astro blog" />
    <meta property="og:description" content={data.metadata.summary} />
    <meta property="og:image" content={data.metadata.thumbnail.src} />
    <meta property="og:url" content="/gallery/{data.metadata.slug}" />
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
</article>
