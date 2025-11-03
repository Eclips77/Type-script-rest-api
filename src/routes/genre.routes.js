/**
 * @file Defines the routes for the genre API.
 * @module routes/genre.routes
 */

import { Router } from 'express';
import {
  getAllGenres,
  getGenreById,
  createGenre,
  updateGenre,
  deleteGenre,
} from '../controllers/genre.controller.js';
import { validate } from '../middleware/validation.middleware.js';
import { GenreSchema, GenreUpdateSchema } from '../schemas/genre.schema.js';

const router = Router();

router.get('/', getAllGenres);
router.get('/:id', getGenreById);
router.post('/', validate(GenreSchema.omit({ id: true })), createGenre);
router.put('/:id', validate(GenreUpdateSchema), updateGenre);
router.delete('/:id', deleteGenre);

export default router;
