import { defineConfig } from 'vite';
const REPO_NAME = 'YAKINIKU';

export default defineConfig({
	base: `/${REPO_NAME}/`,
	build: {
		target: 'esnext',
	},
	target: 'esnext',
	esbuild: {
		target: 'esnext',
	},
});
