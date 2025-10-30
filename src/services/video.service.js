/**
 * @file Service layer for video-related business logic using JSON files.
 * @module services/video.service
 */

import { v4 as uuidv4 } from 'uuid';
import { readDatabase, writeDatabase } from '../utils/database.util.js';
import { applyVideoFilters } from './video.filter.service.js';
import { NotFoundError } from '../utils/errors.util.js';

const VIDEO_DB_FILE = 'videos.json';

/**
 * Retrieves all videos, with optional filtering.
 * @param {object} filters - The filter criteria.
 * @returns {Promise<any[]>}
 */
export function getAll(filters) {
  return readDatabase(VIDEO_DB_FILE)
    .then(videos => {
      return applyVideoFilters(videos, filters);
    });
}

/**
 * Retrieves a single video by its ID.
 * @param {string} id - The ID of the video.
 * @returns {Promise<any>}
 */
export function getById(id) {
  return readDatabase(VIDEO_DB_FILE)
    .then(videos => {
      const video = videos.find(v => v.id === id);
      if (!video) {
        throw new NotFoundError('Video not found');
      }
      return video;
    });
}

/**
 * Creates a new video.
 * @param {object} videoData - The data for the new video.
 * @returns {Promise<any>}
 */
export function create(videoData) {
  return readDatabase(VIDEO_DB_FILE)
    .then(videos => {
      const newVideo = {
        id: uuidv4(),
        ...videoData,
        uploadTime: new Date(),
      };
      videos.push(newVideo);
      return writeDatabase(VIDEO_DB_FILE, videos)
        .then(() => newVideo);
    });
}

/**
 * Updates an existing video by its ID.
 * @param {string} id - The ID of the video.
 * @param {object} videoData - The fields to update.
 * @returns {Promise<any>}
 */
export function update(id, videoData) {
  return readDatabase(VIDEO_DB_FILE)
    .then(videos => {
      const index = videos.findIndex(v => v.id === id);
      if (index === -1) {
        throw new NotFoundError('Video not found');
      }
      const updatedVideo = { ...videos[index], ...videoData };
      videos[index] = updatedVideo;
      return writeDatabase(VIDEO_DB_FILE, videos)
        .then(() => updatedVideo);
    });
}

/**
 * Deletes a video by its ID.
 * @param {string} id - The ID of the video.
 * @returns {Promise<void>}
 */
export function remove(id) {
  return readDatabase(VIDEO_DB_FILE)
    .then(videos => {
      const index = videos.findIndex(v => v.id === id);
      if (index === -1) {
        throw new NotFoundError('Video not found');
      }
      videos.splice(index, 1);
      return writeDatabase(VIDEO_DB_FILE, videos);
    });
}
