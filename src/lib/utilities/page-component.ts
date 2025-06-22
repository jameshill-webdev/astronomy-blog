import PageComponent from '$lib/components/PageComponent.svelte';

export function getBlockClassesForComponent(component: PageComponent) {
	if (component.blockClasses) {
		return ` ${component.blockClasses}`;
	}

	switch (component.type) {
		case 'heading':
			if (component.parameters.level === 1) {
				return ' article__block--gap-large';
			}
			return ' article__block--gap-small';
		case 'figure':
		case 'image-comparison':
			return ' article__block--gap-medium article__block--constrain';
		default:
			return ' article__block--gap-medium';
	}
}
