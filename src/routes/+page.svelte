<script>
    import Gallery from "$lib/components/Gallery.svelte";

    export let data;
</script>

<svelte:head>
    <title>Gallery | JH Astro</title>
    <meta name="description" content="Gallery of astrophotography images by James Hill" />
    <meta property="og:title" content="Gallery | JH Astro" />
    <meta property="og:description" content="Gallery of astrophotography images by James Hill" />
    <meta property="og:image" content="/images/NGC7000-20240728-thumb.jpg" />
    <meta property="og:url" content="/" />
    <meta property="og:type" content="website" />
</svelte:head>

<div class="page-content">
    <Gallery data={data.gallery} />
</div>