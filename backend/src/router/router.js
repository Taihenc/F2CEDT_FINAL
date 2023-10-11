import express from 'express';
import { GetCowBreeds, GetCowBreedsSorted } from '../handler/handler_breeds.js';
import GetCowCuts from '../handler/handler_cuts.js';
import GetCowCooking from '../handler/handler_cooking.js';

const router = express.Router();

router.get('/breeds', GetCowBreeds);
router.get('/breedsSorted', GetCowBreedsSorted);
router.get('/cuts', GetCowCuts);
router.get('/cookings', GetCowCooking);

export default router;
