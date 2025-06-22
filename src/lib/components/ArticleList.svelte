<script>
	import ArticleListItem from '$lib/components/ArticleListItem.svelte';

	export let articles;
</script>

<style lang="scss">
	@import '../../lib/scss/main';

	.article-list {
		&__heading {
			@include typeface-heading-3;

			text-align: left;
			margin-bottom: 0;

			@include breakpoint-desktop {
				margin-top: 51px;
			}
		}

		&__list {
			padding: 0;
			list-style: none;
			margin-bottom: $spacing-7;
		}
	}
</style>

<div class="article-list">
	<h1 class="article-list__heading">Blog articles</h1>
	<ul class="article-list__list">
		{#each articles as article}
			<ArticleListItem article={article} />
		{/each}
	</ul>
</div>