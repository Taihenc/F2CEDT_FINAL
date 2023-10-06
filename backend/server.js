import express from 'express';
import cors from 'cors';
import router from './src/router/router.js';
import InitCowBreeds from './src/db/init/cow_breeds_init.js';
import InitCowCuts from './src/db/init/cow_cut_init.js';

const app = express();
const PORT = 81;

await InitCowBreeds();
await InitCowCuts();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/', express.static('public'));

app.use('/', router);

app.listen(PORT, '0.0.0.0', () => {
	console.log(`Backend Server ready at http://localhost:${PORT}`);
});

export default app;
