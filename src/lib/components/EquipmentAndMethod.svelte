<script lang="ts">
    import type { GalleryArticleEquipmentAndMethod, GalleryArticleMode } from '$lib/types';

    export let data: GalleryArticleEquipmentAndMethod;
    export let date: string;
    export let mode: GalleryArticleMode;
    export let showHeading = true;
</script>

<style lang="scss">
    @import '../scss/main';

    .equipment-method {
        @include info-table;
    }
</style>

<div class="equipment-method equipment-method--{mode}">
    {#if showHeading}
        <h2 class="equipment-method__heading">Equipment & method</h2>
    {/if}
    <dl class="equipment-method__info">
        <dt class="equipment-method__info-label">Optics:</dt>
        <dd class="equipment-method__info-value">{data.optics}</dd>
        <dt class="equipment-method__info-label">Mount:</dt>
        <dd class="equipment-method__info-value">{data.mount}</dd>
        <dt class="equipment-method__info-label">Camera:</dt>
        <dd class="equipment-method__info-value">{data.camera}</dd>
        <dt class="equipment-method__info-label">Exposures:</dt>
        <dd class="equipment-method__info-value">{data.exposures}</dd>
        <dt class="equipment-method__info-label">Software:</dt>
        <dd class="equipment-method__info-value">{data.software}</dd>
        <dt class="equipment-method__info-label">Date:</dt>
        <dd class="equipment-method__info-value">{date}</dd>
    </dl>
</div>