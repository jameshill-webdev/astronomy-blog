<script lang="ts">
	import GalleryArticle from '$lib/components/GalleryArticle.svelte';
	import ReturnLink from '$lib/components/ReturnLink.svelte';
	import type { GalleryItem } from '$lib/types.js';

	export let data: GalleryItem;
</script>

<svelte:head>
    <title>Gallery | {data.expandedView.title} | JH Astro</title>
	<meta name="description" content={`Gallery image of ${data.expandedView.title} taken on ${data.metadata.date}`} />
	<meta property="og:title" content="{data.expandedView.title} | JH Astro Gallery" />
    <meta property="og:description" content={`Gallery image of ${data.expandedView.title} taken on ${data.metadata.date}`} />
    <meta property="og:image" content={data.collapsedView.thumbnail.src} />
    <meta property="og:url" content="/gallery/{data.metadata.slug}" />
    <meta property="og:type" content="article" />
</svelte:head>

<div>
	<GalleryArticle data={{...data.expandedView, date: data.metadata.date}} mode={'static'} />
	<ReturnLink href="/" />
</div>