/**
 * @file Service layer for video-related business logic using JSON files.
 * @module services/video.service
 */

import { v4 as uuidv4 } from 'uuid';
import { readDatabase, writeDatabase } from '../utils/index.js';
import { applyVideoFilters } from './video.filter.service.js';

export class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotFoundError';
    }
}

const VIDEO_DB_FILE = 'videos.json';

export function getAll(filters) {
  return readDatabase(VIDEO_DB_FILE)
    .then(videos => {
      return applyVideoFilters(videos, filters);
    });
}

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
