import express from 'express';
import GetCowBreeds from '../handler/handler_breeds.js';

const router = express.Router();

router.get('/breeds', GetCowBreeds);

export default router;
