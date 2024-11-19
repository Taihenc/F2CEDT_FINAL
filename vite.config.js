import { defineConfig } from 'vite';
const REPO_NAME = 'YAKINIKU';

export default defineConfig({
	base: `/${REPO_NAME}/`,
	build: {
		target: 'esnext',
		rollupOptions: {
			output: {
				globals: {
					'realm-web': 'Realm', // Add global variable for realm-web
				},
			},
		},
	},
	target: 'esnext',
	esbuild: {
		target: 'esnext',
	},
	optimizeDeps: {
		include: ['realm-web'], // Ensure Vite pre-bundles this dependency
	},
});
