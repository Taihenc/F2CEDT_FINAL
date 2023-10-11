import { query } from '../../../frontend/public/components/breed.js';
import database from '../db/mongo.js';

export default async function GetCowBreeds(req, res) {
	const collection = database.collection('cow_breeds');
	let query;
	try {
		query = JSON.parse(req.query.query);
	} catch (error) {
		query = {};
	}
	if (typeof query === 'string') query = JSON.parse(query);
	try {
		const result = await collection.find(query).toArray();
		return res.json(result);
	} catch {
		return res.status(500).json({ error: error.message });
	}
}

// search query {$or: [{breed_name: {$regex: /angus/i}}, {breed_country: {$regex: /country/i}}, {breed_info: {$regex: /offers good/i}}]}
