import express from 'express';
import home from './public/scripts/home.js';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = 80;

app.use(express.static('public'));

app.listen(PORT, '0.0.0.0', () => {
	console.log(`Frontend Server ready at http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
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
			// append += home(0, true);
			append += home(1, false);
			append += home(2, false);
			append += home(3, false);
			return res.send(html.replace('<!-- replace me! -->', append));
		}
	);
});
