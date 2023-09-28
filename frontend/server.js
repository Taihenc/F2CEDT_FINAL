import express from 'express';
import home from './public/scripts/home.js';
import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';

const app = express();
const PORT = 80;
const dom = new JSDOM();

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
			const html = dom.window.document.createElement('html');
			html.innerHTML = data;

			// html.getElementsByTagName('main')[0].innerHTML += home(0, true);
			html.getElementsByTagName('main')[0].innerHTML += home(1, false);
			html.getElementsByTagName('main')[0].innerHTML += home(2, false);
			html.getElementsByTagName('main')[0].innerHTML += home(3, false);
			return res.send(html.outerHTML);
		}
	);
});
