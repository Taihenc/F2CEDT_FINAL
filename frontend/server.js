import express from 'express';
import home from './public/components/home.js';
import breed from './public/components/breed.js';
import cut from './public/components/cut.js';
import cooking from './public/components/cooking.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 80;
const backend_PORT = 8080;

app.use(express.static('public'));

app.listen(PORT, '0.0.0.0', () => {
	console.log(`Frontend Server ready at http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
	Set_backend_url(`${req.protocol}://${req.get('host')}:${backend_PORT}`);
	fs.readFile(
		path.resolve('./public/template.html'),
		'utf-8',
		(err, data) => {
			if (err) {
				console.log(err);
				res.status(500).send('Some error happened');
			}
			let html = data;
			let append = '';
			(async () => {
				append += home(0, true);
				append += await breed(1, false);
				append += await cut(2, false);
				append += await cooking(3, false);
				return res.send(html.replace('<!-- replace me! -->', append));
			})();
		}
	);
});

function Set_backend_url(url) {
	const config_path = `${fileURLToPath(import.meta.url)}`;
	const regex = /\b(backend_url\s*=\s*')[^']*'/i;

	let data = fs.readFileSync(config_path, 'utf-8');
	fs.writeFileSync(config_path, data.replace(regex, `$1${url}'`), 'utf-8');
}
