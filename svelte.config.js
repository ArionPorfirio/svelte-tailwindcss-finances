import preprocess from 'svelte-preprocess'
import path from 'path'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		// hydrate the body element in src/app.html
		target: 'body',
		vite: {
			resolve: {
				alias: {
					components: path.resolve('./src/components'),
					styles: path.resolve('./src/styles'),
					stores: path.resolve('./src/stores')
				}
			}
		}
	}
}

export default config
