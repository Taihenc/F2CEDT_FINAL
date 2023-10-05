import { MongoClient } from 'mongodb';

const uri = 'mongodb://root:root@localhost:27017/';

export const client = new MongoClient(uri);

const database = client.db('Yakiniku');
const collection = database.collection('cow_breeds');

const result = await collection.find().toArray();

// const cutsObject = result.reduce((acc, cut) => {
// 	acc[cut.cut_id] = cut;
// 	return acc;
// }, {});

export default function get() {
	return result;
}
