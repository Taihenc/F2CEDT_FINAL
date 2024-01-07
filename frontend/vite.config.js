import { defineConfig } from 'vite';
const REPO_NAME = 'YAKITEMP';

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
