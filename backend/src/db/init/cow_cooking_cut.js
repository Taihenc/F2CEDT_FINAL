import database from '../mongo.js';
import { cow_cooking_img_dir } from '../../config/config.js';
import fs from 'fs';
import path from 'path';

export default async function InitCowCooking() {
	fs.readFile(
		path.resolve('./public/resource/cow_cooking/cow_cooking.json'),
		'utf8',
		async (err, data) => {
			if (err) {
				console.log(err);
			}
			const cookings = JSON.parse(data);
			cookings.forEach((cooking) => {
				cooking.cooking_path_img.forEach((path, idx) => {
					cooking.cooking_path_img[idx] = path?.replace(
						/^(\.\/|(\.\.\/)+)/,
						cow_cooking_img_dir
					);
				});
			});
			await database.createCollection('cow_cooking');
			const collection = database.collection('cow_cooking');
			await collection.deleteMany({});

			await collection.insertMany(cookings, (err, result) => {
				if (err) {
					console.log(err);
				}
			});
		}
	);
}
