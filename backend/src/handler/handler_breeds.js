import database from '../db/mongo.js';

export default async function GetCowBreeds(req, res) {
	const collection = database.collection('cow_breeds');
	const result = await collection.find().toArray();

	return res.json(result);
}
