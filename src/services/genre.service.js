/**
 * @file Service layer for genre business logic using JSON files.
 * @module services/genre.service
 */

import { v4 as uuidv4 } from 'uuid';
import { readDatabase, writeDatabase } from '../utils/database.util.js';
import { NotFoundError } from '../utils/errors.util.js';

const GENRE_DB_FILE = 'genres.json';

export function getAll() {
  return readDatabase(GENRE_DB_FILE);
}

export function getById(id) {
  return readDatabase(GENRE_DB_FILE)
    .then(genres => {
      const genre = genres.find(g => g.id === id);
      if (!genre) {
        return Promise.reject(new Error('Genre not found'));
      }
      return genre;
    });
}

export function create(genreData) {
  return readDatabase(GENRE_DB_FILE)
    .then(genres => {
      const newGenre = {
        id: uuidv4(),
        ...genreData,
      };
      genres.push(newGenre);
      return writeDatabase(GENRE_DB_FILE, genres)
        .then(() => newGenre);
    });
}

export function update(id, genreData) {
  return readDatabase(GENRE_DB_FILE)
    .then(genres => {
      const index = genres.findIndex(g => g.id === id);
      if (index === -1) {
        return Promise.reject(new Error('Genre not found'));
      }
      const updatedGenre = { ...genres[index], ...genreData };
      genres[index] = updatedGenre;
      return writeDatabase(GENRE_DB_FILE, genres)
        .then(() => updatedGenre);
    });
}

export function remove(id) {
  return readDatabase(GENRE_DB_FILE)
    .then(genres => {
      const index = genres.findIndex(g => g.id === id);
      if (index === -1) {
        return Promise.reject(new Error('Genre not found'));
      }
      genres.splice(index, 1);
      return writeDatabase(GENRE_DB_FILE, genres);
    });
}
