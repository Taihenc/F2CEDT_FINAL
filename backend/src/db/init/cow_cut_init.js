import database from '../mongo.js';
import { cow_cuts_img_dir } from '../../config/config.js';
import fs from 'fs';
import path from 'path';

export default async function InitCowCuts() {
	fs.readFile(
		path.resolve('./public/resource/cow_cuts/cow_cuts.json'),
		'utf8',
		async (err, data) => {
			if (err) {
				console.log(err);
			}
			const cuts = JSON.parse(data);
			cuts.forEach((cut) => {
				cut.cut_path_img = cut.cut_path_img?.replace(
					/^(\.\/|(\.\.\/)+)/,
					cow_cuts_img_dir
				);
			});
			await database.createCollection('cow_cuts');
			const collection = database.collection('cow_cuts');
			await collection.deleteMany({});
			console.log('inserted');

			await collection.insertMany(cuts, (err, result) => {
				if (err) {
					console.log(err);
				}
			});
		}
	);
}
