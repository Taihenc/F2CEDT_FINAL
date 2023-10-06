import database from '../db/mongo.js';

export default async function GetCowCuts(req, res) {
	const collection = database.collection('cow_cuts');
	const result = await collection.find().toArray();

	return res.json(result);
}
