<script lang="ts">
    import type { GalleryArticleObjectInfo, GalleryArticleMode } from '$lib/types';

    export let data: GalleryArticleObjectInfo;
    export let mode: GalleryArticleMode;
    export let showHeading = true;
</script>

<style lang="scss">
    @import '../scss/main';

    .object-info {
        @include info-table(150px);
    }
</style>

<div class="object-info object-info--{mode}">
    {#if showHeading}
        <h2 class="object-info__heading">Object information</h2>
    {/if}
    <dl class="object-info__info">
        <dt class="object-info__info-label">Other names:</dt>
        <dd class="object-info__info-value">{data.otherNames}</dd>
        <dt class="object-info__info-label">Object type:</dt>
        <dd class="object-info__info-value">{data.type}</dd>
        <dt class="object-info__info-label">Age:</dt>
        <dd class="object-info__info-value">{data.age}</dd>
        <dt class="object-info__info-label">Distance:</dt>
        <dd class="object-info__info-value">{data.distance}</dd>
        <dt class="object-info__info-label">Size:</dt>
        <dd class="object-info__info-value">{data.size}</dd>
        <dt class="object-info__info-label">Constellation:</dt>
        <dd class="object-info__info-value">{data.constellation}</dd>
    </dl>
</div>