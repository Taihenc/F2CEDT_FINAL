import database from '../db/mongo.js';

export default async function GetCowBreeds(req, res) {
	const collection = database.collection('cow_breeds');
	const query = JSON.parse(req.query.query);
	const sort = JSON.parse(req.query.sort);
	const options = JSON.parse(req.query.options);
	console.log(query, sort, options);
	try {
		const result = await collection
			.find(query)
			.sort(sort)
			.skip(options.skip)
			.limit(options.limit)
			.toArray();
		return res.json(result);
	} catch {
		return res.status(500).json({ error: error.message });
	}
}
