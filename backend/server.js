import express from 'express';
import cors from 'cors';
import YakinikuDB from './src/db/mongo.js';
import InitCowBreeds from './src/db/init/cow_breeds_init.js';

const app = express();
const PORT = 81;

InitCowBreeds();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/', express.static('public'));

app.get('/breeds', async (req, res) => {
	const breeds = await YakinikuDB();
	res.json(breeds);
});

app.listen(PORT, '0.0.0.0', () => {
	console.log(`Backend Server ready at http://localhost:${PORT}`);
});

export default app;
