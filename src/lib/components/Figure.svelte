<script lang="ts">
	import type { ImageProps, ExpandableImageProps, ImageComparisonProps } from "$lib/types";
	import ExpandableImage from "./ExpandableImage.svelte";
	import ImageComparison from "./ImageComparison.svelte";

	export let caption: string = '';
	export let imageProps: ImageProps|null = null;
	export let expandableImageProps: ExpandableImageProps|null = null;
	export let imageComparisonProps: ImageComparisonProps|null = null;
</script>

<style lang="scss">
	@import '../scss/main';

	.figure {
		text-align: center;
		margin: 0 auto;
		max-width: 100%;

		&__image {
			display: block;
			max-width: 100%;
			margin: 0 auto;
			margin-bottom: $spacing-1;
		}

		&__caption {
			@include typeface-caption;

			text-align: center;
		}
	}
</style>

<figure class="figure">
	{#if expandableImageProps}
		<ExpandableImage src={expandableImageProps.src} expandedSrc={expandableImageProps.expandedSrc} alt={expandableImageProps.alt} />
	{:else if imageComparisonProps}
		<ImageComparison lowerImageSrc={imageComparisonProps.lowerImageSrc} lowerImageAlt={imageComparisonProps.lowerImageAlt} upperImageSrc={imageComparisonProps.upperImageSrc} upperImageAlt={imageComparisonProps.upperImageAlt} />
	{:else if imageProps}
		<img src={imageProps.src} alt={imageProps.alt || ''} class='figure__image' />
	{/if}
	{#if caption}
		<figcaption class="figure__caption">{@html caption}</figcaption>
	{/if}
</figure>
