import express from 'express';
import home from './public/components/home.js';
import breed from './public/components/breed.js';
import cut from './public/components/cut.js';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = 80;
const backend_PORT = 81;

app.use(express.static('public'));

// works but 2x slower
// app.use('/resource', (req, res) => {
// 	const serverURL = `${req.protocol}://${req.get('host')}`;
// 	res.redirect(`${serverURL}:${backend_PORT}/resource${req.path}`);
// });

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
			append += home(0, true);
			append += breed(1, false);
			append += cut(2, false);
			append += home(3, false);
			return res.send(html.replace('<!-- replace me! -->', append));
		}
	);
});
