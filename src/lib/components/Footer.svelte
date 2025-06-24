<style lang="scss">
    @import '../scss/main';

    .footer {
        @include typeface-footer;
       
        text-align: center;
        padding: $spacing-4;
        user-select: none;
        margin-bottom: 62px;

        @include breakpoint-tablet {
            margin-bottom: 0;
        }
    }
</style>

<footer class="footer">
	&copy; 2025 James Hill - All rights reserved
</footer>