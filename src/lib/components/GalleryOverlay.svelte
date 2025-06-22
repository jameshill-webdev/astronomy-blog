<script lang="ts">
    import { createEventDispatcher, onDestroy } from "svelte";
    import { browser } from '$app/environment';
    import Overlay from "./Overlay.svelte";
	import type { ExpandedGalleryItem } from "$lib/types";
    import GalleryArticle from "./GalleryArticle.svelte";

    const dispatch = createEventDispatcher();

    export let data: ExpandedGalleryItem;
    export let isOpen = false;
    export let isExpanded = false;

    const loadedImageSources: string[] = [];

    let isImageVisible = false;
    let isCloseButtonVisible = true;

    function onOverlayClose () {
        dispatch('close');
    }

    function onImageLoad (event: CustomEvent) {
        if (event.detail?.imageSrc) {
            loadedImageSources.push(event.detail.imageSrc);
            isImageVisible = true;
        }
    }

    $: if (isExpanded) {
        if (browser) {
            if (loadedImageSources.find(loadedImageSource => loadedImageSource.endsWith(data.image.src))) {
                isImageVisible = true;
            }
        }
    }
    else {
        if (browser) {
            isImageVisible = false;
        }
    }
</script>

<section>
    <Overlay isOpen={isOpen} isExpanded={isExpanded} isCloseButtonVisible={isCloseButtonVisible} on:close={onOverlayClose}>
        <GalleryArticle data={data} mode={'overlay'} isExpanded={isExpanded} isImageVisible={isImageVisible} on:load={onImageLoad} />
    </Overlay>
</section>