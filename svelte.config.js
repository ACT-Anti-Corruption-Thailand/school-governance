import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter({
			fallback: 'index.html'
		}),
		prerender: { entries: [] },
		alias: {
			'components/*': 'src/components/*',
			'data/*': 'src/data/*',
			'stores/*': 'src/stores/*',
			'styles/*': 'src/styles/*',
			'types/*': 'src/types/*',
			'utils/*': 'src/utils/*'
		}
	}
};

export default config;
