/**
 * @file Service layer for playlist business logic with strict validation.
 * @module services/playlist.service
 */

import { v4 as uuidv4 } from 'uuid';
import { readDatabase, writeDatabase } from '../utils/index.js';
import { getVideoById } from './index.js'; // Import for inter-service communication

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
    if (!genresToValidate || genresToValidate.length === 0) return Promise.resolve();
    return readDatabase(GENRE_DB_FILE).then(existingGenres => {
        const existingGenreNames = existingGenres.map(g => g.name);
        if (!genresToValidate.every(g => existingGenreNames.includes(g))) {
            throw new ValidationError('One or more genres are invalid');
        }
    });
}

function validateAllVideosExist(videoIds) {
    if (!videoIds || videoIds.length === 0) return Promise.resolve();
    const validationPromises = videoIds.map(videoId => getVideoById(videoId));
    return Promise.all(validationPromises);
}

export function getAll(filters) {
    return readDatabase(PLAYLIST_DB_FILE).then(playlists => {
        if (filters.genre) {
            return playlists.filter(p => p.genres.includes(filters.genre));
        }
        return playlists;
    });
}

export function getById(id) {
    return readDatabase(PLAYLIST_DB_FILE).then(playlists => {
        const playlist = playlists.find(p => p.id === id);
        if (!playlist) throw new NotFoundError('Playlist not found');
        return playlist;
    });
}

export function create(playlistData) {
    return validateGenres(playlistData.genres)
        .then(() => validateAllVideosExist(playlistData.videoIds))
        .then(() => readDatabase(PLAYLIST_DB_FILE))
        .then(playlists => {
            const newPlaylist = {
                id: uuidv4(),
                videoIds: playlistData.videoIds || [],
                ...playlistData,
            };
            playlists.push(newPlaylist);
            return writeDatabase(PLAYLIST_DB_FILE, playlists).then(() => newPlaylist);
        });
}

export function update(id, playlistData) {
    return validateGenres(playlistData.genres)
        .then(() => validateAllVideosExist(playlistData.videoIds))
        .then(() => readDatabase(PLAYLIST_DB_FILE))
        .then(playlists => {
            const index = playlists.findIndex(p => p.id === id);
            if (index === -1) throw new NotFoundError('Playlist not found');
            const updatedPlaylist = { ...playlists[index], ...playlistData };
            playlists[index] = updatedPlaylist;
            return writeDatabase(PLAYLIST_DB_FILE, playlists).then(() => updatedPlaylist);
        });
}

export function remove(id) {
    return readDatabase(PLAYLIST_DB_FILE).then(playlists => {
        const index = playlists.findIndex(p => p.id === id);
        if (index === -1) throw new NotFoundError('Playlist not found');
        playlists.splice(index, 1);
        return writeDatabase(PLAYLIST_DB_FILE, playlists);
    });
}

export function addVideoToPlaylist(playlistId, videoId) {
    return Promise.all([
        getById(playlistId),      // 1. Check if playlist exists
        getVideoById(videoId)   // 2. Check if video exists
    ]).then(([playlist, video]) => {
        if (playlist.videoIds.includes(videoId)) {
            return playlist; // Video already in playlist, do nothing
        }
        playlist.videoIds.push(videoId);
        return readDatabase(PLAYLIST_DB_FILE).then(playlists => {
            const index = playlists.findIndex(p => p.id === playlistId);
            playlists[index] = playlist;
            return writeDatabase(PLAYLIST_DB_FILE, playlists).then(() => playlist);
        });
    });
}

export function removeVideoFromPlaylist(playlistId, videoId) {
    return getById(playlistId).then(playlist => {
        const videoIndex = playlist.videoIds.indexOf(videoId);
        if (videoIndex === -1) {
            // Video not in playlist, do nothing
            return playlist;
        }
        playlist.videoIds.splice(videoIndex, 1);
        return readDatabase(PLAYLIST_DB_FILE).then(playlists => {
            const index = playlists.findIndex(p => p.id === playlistId);
            playlists[index] = playlist;
            return writeDatabase(PLAYLIST_DB_FILE, playlists).then(() => playlist);
        });
    });
}
