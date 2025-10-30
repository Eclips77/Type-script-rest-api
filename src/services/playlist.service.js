/**
 * @file Service layer for playlist business logic using JSON files.
 * @module services/playlist.service
 */

import { v4 as uuidv4 } from 'uuid';
import { readDatabase, writeDatabase } from '../utils/database.util.js';
import { NotFoundError } from '../utils/errors.util.js';

const PLAYLIST_DB_FILE = 'playlists.json';

/**
 * Retrieves all playlists.
 * @param {object} filters - The filter criteria.
 * @returns {Promise<any[]>}
 */
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

/**
 * Retrieves a single playlist by its ID.
 * @param {string} id - The ID of the playlist.
 * @returns {Promise<any>}
 */
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

/**
 * Creates a new playlist.
 * @param {object} playlistData - The data for the new playlist.
 * @returns {Promise<any>}
 */
export function create(playlistData) {
  return readDatabase(PLAYLIST_DB_FILE)
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

/**
 * Updates an existing playlist by its ID.
 * @param {string} id - The ID of the playlist.
 * @param {object} playlistData - The fields to update.
 * @returns {Promise<any>}
 */
export function update(id, playlistData) {
  return readDatabase(PLAYLIST_DB_FILE)
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

/**
 * Deletes a playlist by its ID.
 * @param {string} id - The ID of the playlist.
 * @returns {Promise<void>}
 */
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

/**
 * Adds a video to a playlist.
 * @param {string} playlistId
 * @param {string} videoId
 * @returns {Promise<any>}
 */
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
