import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

const SCSS_Logger = {
    warn(message: any, options: any) {
        // Mute "Mixed Declarations" warning
        if (options.deprecation && message.includes('mixed-decls')) {
            return
        }
        // List all other warnings
        console.warn(`▲ [WARNING]: ${message}`);
    },
};

export default defineConfig({
	plugins: [sveltekit()],
	css: {
        preprocessorOptions: {
            scss: {
                logger: SCSS_Logger
            }
        }
    },
    server: {
        host: true
    }
});
