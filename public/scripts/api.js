// this is not 100% 'api' but at least it's the only file that makes requests to the backend
import * as Realm from 'realm-web';
import { backend_url } from './config.js';

const app = new Realm.App({ id: 'data-spdfc' });
const credentials = Realm.Credentials.apiKey(
	'LoPwO3JV8OI4BzayweuRmdSsYaB7SxrDoXVDSf2Ha9o1a7bAOTaubFYHNcXCcgOc'
);
const user = await app.logIn(credentials);
const mongoCluster = user.mongoClient('YAKINIKU');
const database = mongoCluster.db('Yakiniku');
// const collection = database.collection('cow_breeds');
// const result = await collection.find();

/**@typedef {import('./config.js').Breed_card } Breed_card */
/**@typedef {import('./config.js').Cut_card } Cut_card */
/**@typedef {import('./config.js').Cooking_cut } Cooking_cut */

export async function get_breeds(q) {
	const query = q[0];
	const sort = q[1];
	const options = q[2];
	options.sort = sort;
	const collection = database.collection('cow_breeds');
	/**
	 * @type {Breed_card[]}
	 */
	const breeds = await collection.find(query, options);
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
