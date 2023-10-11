import database from '../db/mongo.js';

export default async function GetCowBreeds(req, res) {
	const collection = database.collection('cow_breeds');
	const result = await collection.find().toArray();

	return res.json(result);
}

// search query {$or: [{breed_name: {$regex: /angus/i}}, {breed_country: {$regex: /country/i}}, {breed_info: {$regex: /offers good/i}}]}
