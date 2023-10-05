import express from 'express';
import cors from 'cors';
import YakinikuDB from './src/db/mongoose.js';

const app = express();
const PORT = 81;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use('/', express.static('public'));

app.listen(PORT, '0.0.0.0', () => {
	console.log(`Backend Server ready at http://localhost:${PORT}`);
});

export default app;
