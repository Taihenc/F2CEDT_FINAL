import database from '../db/mongo.js';

export default async function GetCowCooking(req, res) {
	const collection = database.collection('cow_cooking');
	const result = await collection.find().toArray();

	return res.json(result);
}
