import { MongoClient } from 'mongodb';

const uri = 'mongodb://root:root@localhost:27017/';

const client = new MongoClient(uri);

const database = client.db('Yakiniku');
const collection = database.collection('cow_cuts');

const result = await collection.find().toArray();

const cutsObject = result.reduce((acc, cut) => {
	acc[cut.cut_id] = cut;
	return acc;
}, {});

export default function get() {
	return cutsObject['cut_rib'];
}
