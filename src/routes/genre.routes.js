/**
 * @file Defines the routes for the genre API.
 * @module routes/genre.routes
 */

import { Router } from 'express';
import { genreController } from '../controllers/index.js';
import { validate } from '../middleware/index.js';
import { GenreSchema, GenreUpdateSchema } from '../schemas/index.js';

const router = Router();

router.get('/', genreController.getAllGenres);
router.get('/:id', genreController.getGenreById);
router.post('/', validate(GenreSchema.omit({ id: true })), genreController.createGenre);
router.put('/:id', validate(GenreUpdateSchema), genreController.updateGenre);
router.delete('/:id', genreController.deleteGenre);

export default router;
