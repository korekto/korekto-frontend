import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	base: './',
	build: {
		sourcemap: true,
		minify: false
	},
	css: {
		devSourcemap: true
	},
	mode: 'development'
});
