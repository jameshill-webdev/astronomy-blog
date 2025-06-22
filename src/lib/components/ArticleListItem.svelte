<script>
	export let article;
</script>

<style lang="scss">
	@import '../../lib/scss/main';

	$thumbnail-size-mobile: 100px;
	$thumbnail-size-desktop: 150px;

	.article-list-item {
		$root: &;

		display: flex;
		flex-direction: column;
		margin: 0;
		padding: 0;

		&:first-child {
			margin-top: 0;
		}

		&__wrapping-link {
			display: block;
			position: relative;
			text-decoration: none;
			color: $color-grey-alto;
			padding-top: $spacing-3;

			@include breakpoint-tablet {
				padding-top: $spacing-6;
			}

			&:active,
			&:hover,
			&:visited {
				color: $color-grey-alto;
			}

			&:hover,
			&:focus {
				#{$root}__thumbnail {
					@include gallery-tile-hoverable-active;
				}
				#{$root}__hover-indicator {
					margin-left: $spacing-2;
				}
			}
		}

		&__header {
			display: flex;
			position: relative;
			flex-direction: row;
			padding-bottom: $spacing-1;
			margin-bottom: $spacing-5;
		}

		&__thumbnail {
			@include gallery-tile-hoverable;

			display: block;
			position: relative;
			width: px-to-rem($thumbnail-size-mobile * $const-hex-width-ratio);
			height: px-to-rem($thumbnail-size-mobile);
			clip-path: polygon(75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%, 25% 0%);
			backface-visibility: hidden;
        	z-index: $z-index-2;

			&-image {
				display: block;
				object-fit: cover;
				position: absolute;
				height: 100%;
				top: 50%;
				left: 50%;
				bottom: 0;
				right: 0;
				transform: translate(-50%, -50%) scale(1.2);
				image-rendering: optimizeQuality;
			}

			@include breakpoint-desktop {
				width: px-to-rem($thumbnail-size-desktop * $const-hex-width-ratio);
				height: px-to-rem($thumbnail-size-desktop);
			}
		}

		&__heading {
			width: calc(100% - px-to-rem(100px));
			padding-left: $spacing-1;
			box-sizing: border-box;
			position: relative;
			
			@include breakpoint-tablet {
				width: calc(100% - px-to-rem(150px));
			}

			&-text {
				@include typeface-heading-3;
			
				font-weight: normal;
				font-size: $font-size-l;
				display: inline-block;
				position: relative;
				margin: 0;
				padding-bottom: 1px;
				top: 50%;
				transform: translateY(-50%);

				@include breakpoint-desktop {
					font-size: $font-size-xl;
				}
			}
		}

		&__content {
			@include typeface-body;

			margin-bottom: $spacing-4;
		}

		&__hover-indicator {
			display: inline-block;
    		position: relative;
			width: px-to-rem(12px);
			height: px-to-rem(12px);
			top: px-to-rem(1px);
			margin-left: $spacing-1;
			transition: margin-left $transition-1;

			&:after {
				@include icon('arrow');
			}

			@include breakpoint-tablet {
				width: px-to-rem(16px);
				height: px-to-rem(16px);
				top: px-to-rem(2px);
			}
		}
	}
</style>

<li class="article-list-item">
	<a class="article-list-item__wrapping-link" href="/blog/{article.metadata.slug}">
		<article class="article-list-item__article">
			<div class="article-list-item__header">
				<div class="article-list-item__thumbnail">
					<img class="article-list-item__thumbnail-image" src={article.metadata.thumbnail.src} alt={article.metadata.thumbnail.alt}>
				</div>
				<div class="article-list-item__heading">
					<h2 class="article-list-item__heading-text">{article.metadata.title}</h2>
				</div>
			</div>
			<div>
				<p class="article-list-item__content">{article.metadata.summary} <span class="article-list-item__hover-indicator"></span></p>
			</div>
		</article>
	</a>
</li>