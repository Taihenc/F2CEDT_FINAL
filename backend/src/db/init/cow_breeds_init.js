import database from '../mongo.js';
import { cow_breeds_img_dir, country_img_dir } from '../../config/config.js';
import fs from 'fs';
import path from 'path';

export default async function InitCowBreeds() {
	fs.readFile(
		path.resolve('./public/resource/cow_breeds/cow_breeds.json'),
		'utf8',
		async (err, data) => {
			if (err) {
				console.log(err);
			}
			const breeds = JSON.parse(data);
			breeds.forEach((breed) => {
				breed.breed_path_img = breed.breed_path_img?.replace(
					/^(\.\/|(\.\.\/)+)/,
					cow_breeds_img_dir
				);
				breed.breed_country_img = breed.breed_country_img?.replace(
					/^(\.\/|(\.\.\/)+)/,
					country_img_dir
				);
			});
			await database.createCollection('cow_breeds');
			const collection = database.collection('cow_breeds');
			await collection.deleteMany({});

			await collection.insertMany(breeds, (err, result) => {
				if (err) {
					console.log(err);
				}
			});
		}
	);
}
