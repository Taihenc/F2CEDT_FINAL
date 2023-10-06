import { MongoClient } from 'mongodb';

const uri = 'mongodb://root:root@localhost:27017/';

const client = new MongoClient(uri);
const database = client.db('Yakiniku');

export default database;
