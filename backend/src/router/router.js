import express from 'express';
import GetCowBreeds from '../handler/handler_breeds.js';
import GetCowCuts from '../handler/handler_cuts.js';

const router = express.Router();

router.get('/breeds', GetCowBreeds);
router.get('/cuts', GetCowCuts);

export default router;
