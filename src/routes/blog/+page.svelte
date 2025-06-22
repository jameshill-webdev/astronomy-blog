<script>
	import ArticleList from "$lib/components/ArticleList.svelte";
	import Sidebar from "$lib/components/Sidebar.svelte";
	import SearchButton from "$lib/components/SearchButton.svelte";

	export let data;
</script>

<style lang="scss">
	@import '../../lib/scss/main';

	.blog {
		@include content-constraint;
		
		display: flex;
		flex-direction: column;

		@include breakpoint-tablet {
			flex-direction: row;		
		}

		&__articles {
			width: 100%;

			@include breakpoint-tablet {
				width: 60%;
			}

			@include breakpoint-desktop {
				width: 70%;
			}
		}

		&__sidebar {
			display: block;
			position: absolute;
			top: 70px;
			right: 0;
			left: 0;
			height: 0;

			@include breakpoint-tablet {
				position: relative;
				top: auto;
				height: auto;
				left: auto;
				right: auto;
				width: 40%;
			}

			@include breakpoint-desktop {
				width: 30%;
			}
		}
	}
</style>

<svelte:head>
    <title>Blog | JH Astro</title>
    <meta name="description" content="List of astronomy and astrophotography articles by James Hill" />
	<meta property="og:title" content="Blog | JH Astro" />
    <meta property="og:description" content="List of astronomy and astrophotography articles by James Hill" />
    <meta property="og:image" content="/images/NGC7000-20240728-thumb.jpg" />
    <meta property="og:url" content="/blog" />
    <meta property="og:type" content="website" />
</svelte:head>

<SearchButton />
<div class="blog">
	<div class="blog__articles">
		<ArticleList articles={data.articles} />
	</div>
	<div class="blog__sidebar">
		<Sidebar articles={data.articles} />
	</div>
</div>

