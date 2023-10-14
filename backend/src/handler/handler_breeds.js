import database from '../db/mongo.js';

export default async function GetCowBreeds(req, res) {
	const collection = database.collection('cow_breeds');
	const query = JSON.parse(req.query.query);
	const sort = JSON.parse(req.query.sort);
	console.log('parse at backend query', query);
	console.log('parse at backend sort', sort);
	try {
		const result = await collection.find(query).sort(sort).toArray();
		return res.json(result);
	} catch {
		return res.status(500).json({ error: error.message });
	}
}
