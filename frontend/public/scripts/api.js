import { backend_url } from './config.js';

/**@typedef {import('./config.js').Breed_card } Breed_card */
/**@typedef {import('./config.js').Cut_card } Cut_card */
/**@typedef {import('./config.js').Cooking_cut } Cooking_cut */

export async function get_breeds() {
	/**
	 * @type {Breed_card[]}
	 */
	const breeds = await fetch(`${backend_url}/breeds`)
		.then((res) => res.json())
		.catch((err) => {
			console.log('err', err);
		});

	return breeds;
}

export async function get_cuts() {
	/**
	 * @type {Cut_card[]}
	 */
	const cuts = await fetch(`${backend_url}/cuts`)
		.then((res) => res.json())
		.catch((err) => {
			console.log('err', err);
		});

	return cuts;
}

export async function get_cookings() {
	/**
	 * @type {Cooking_cut[]}
	 */
	const cookings = await fetch(`${backend_url}/cookings`)
		.then((res) => res.json())
		.catch((err) => {
			console.log('err', err);
		});

	return cookings;
}
