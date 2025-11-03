/**
 * @file Controller for handling genre-related API requests.
 * @module controllers/genre.controller
 */

import {
  getAll,
  getById,
  create,
  update,
  remove,
} from '../services/genre.service.js';

export function getAllGenres(req, res) {
  getAll()
    .then(genres => {
      res.status(200).json(genres);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    });
}

export function getGenreById(req, res) {
  getById(req.params.id)
    .then(genre => {
      res.status(200).json(genre);
    })
    .catch(error => {
      if (error.message.includes('not found')) {
        return res.status(404).json({ message: error.message });
      }
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    });
}

export function createGenre(req, res) {
  create(req.body)
    .then(newGenre => {
      res.status(201).json(newGenre);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    });
}

export function updateGenre(req, res) {
  update(req.params.id, req.body)
    .then(updatedGenre => {
      res.status(200).json(updatedGenre);
    })
    .catch(error => {
      if (error.message.includes('not found')) {
        return res.status(404).json({ message: error.message });
      }
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    });
}

export function deleteGenre(req, res) {
  remove(req.params.id)
    .then(() => {
      res.status(204).send();
    })
    .catch(error => {
      if (error.message.includes('not found')) {
        return res.status(404).json({ message: error.message });
      }
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    });
}
