import { client } from '../mongo.js';
import { cow_breeds_img_dir, country_img_dir } from '../../config/config.js';
import fs from 'fs';
import path from 'path';

export default function InitCowBreeds() {
	fs.readFile(
		path.resolve('./public/resource/cow_breeds/cow_breeds.json'),

		'utf8',
		(err, data) => {
			if (err) {
				console.log(err);
			}
			/**@type Breed */
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
			const database = client.db('Yakiniku');

			database.createCollection('cow_breeds');
			const collection = database.collection('cow_breeds');
			collection.deleteMany({});

			collection.insertMany(breeds, (err, result) => {
				if (err) {
					console.log(err);
				}
				client.close();
			});
		}
	);
}
