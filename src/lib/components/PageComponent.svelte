<script lang="ts">
    import Figure from '$lib/components/Figure.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import List from '$lib/components/List.svelte';
	import Paragraph from '$lib/components/Paragraph.svelte';
	import ImageComparison from '$lib/components/ImageComparison.svelte';

	import type { PageComponentMap } from '$lib/types.js';

	const components: PageComponentMap = {
		'heading': Heading,
		'paragraph': Paragraph,
		'list': List,
		'figure': Figure,
		'image-comparison': ImageComparison
	};

	export let component;
</script>

<svelte:component this={components[component.type]} {...component.parameters} />