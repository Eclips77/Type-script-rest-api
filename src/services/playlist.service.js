/**
 * @file Service layer for playlist business logic using JSON files.
 * @module services/playlist.service
 */

import { v4 as uuidv4 } from 'uuid';
import { readDatabase, writeDatabase } from '../utils/index.js';

export class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotFoundError';
    }
}

export class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
    }
}


const PLAYLIST_DB_FILE = 'playlists.json';
const GENRE_DB_FILE = 'genres.json';

function validateGenres(genresToValidate) {
    if (!genresToValidate || genresToValidate.length === 0) {
        return Promise.resolve();
    }
    return readDatabase(GENRE_DB_FILE).then(existingGenres => {
        const existingGenreNames = existingGenres.map(g => g.name);
        const allFound = genresToValidate.every(g => existingGenreNames.includes(g));
        if (!allFound) {
            throw new ValidationError('One or more genres are invalid');
        }
    });
}

export function getAll(filters) {
  return readDatabase(PLAYLIST_DB_FILE)
    .then(playlists => {
        let filteredPlaylists = playlists;
        if (filters.genre) {
            filteredPlaylists = filteredPlaylists.filter(p => p.genres.includes(filters.genre));
        }
        return filteredPlaylists;
    });
}

export function getById(id) {
  return readDatabase(PLAYLIST_DB_FILE)
    .then(playlists => {
      const playlist = playlists.find(p => p.id === id);
      if (!playlist) {
        throw new NotFoundError('Playlist not found');
      }
      return playlist;
    });
}

export function create(playlistData) {
  return validateGenres(playlistData.genres)
    .then(() => readDatabase(PLAYLIST_DB_FILE))
    .then(playlists => {
      const newPlaylist = {
        id: uuidv4(),
        videoIds: [],
        ...playlistData,
      };
      playlists.push(newPlaylist);
      return writeDatabase(PLAYLIST_DB_FILE, playlists)
        .then(() => newPlaylist);
    });
}

export function update(id, playlistData) {
    return validateGenres(playlistData.genres)
        .then(() => readDatabase(PLAYLIST_DB_FILE))
        .then(playlists => {
            const index = playlists.findIndex(p => p.id === id);
            if (index === -1) {
                throw new NotFoundError('Playlist not found');
            }
            const updatedPlaylist = { ...playlists[index], ...playlistData };
            playlists[index] = updatedPlaylist;
            return writeDatabase(PLAYLIST_DB_FILE, playlists)
                .then(() => updatedPlaylist);
        });
}

export function remove(id) {
  return readDatabase(PLAYLIST_DB_FILE)
    .then(playlists => {
      const index = playlists.findIndex(p => p.id === id);
      if (index === -1) {
        throw new NotFoundError('Playlist not found');
      }
      playlists.splice(index, 1);
      return writeDatabase(PLAYLIST_DB_FILE, playlists);
    });
}

export function addVideo(playlistId, videoId) {
    return readDatabase(PLAYLIST_DB_FILE)
        .then(playlists => {
            const index = playlists.findIndex(p => p.id === playlistId);
            if (index === -1) {
                throw new NotFoundError('Playlist not found');
            }
            if (!playlists[index].videoIds.includes(videoId)) {
                playlists[index].videoIds.push(videoId);
            }
            return writeDatabase(PLAYLIST_DB_FILE, playlists)
                .then(() => playlists[index]);
        });
}
