/**
 * @file Controller for handling video-related API requests.
 * @module controllers/video.controller
 */

import {
  getAll,
  getById,
  create,
  update,
  remove,
} from '../services/video.service.js';

export function getAllVideos(req, res) {
  getAll(req.query)
    .then(videos => {
      res.status(200).json(videos);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    });
}

export function getVideoById(req, res) {
  getById(req.params.id)
    .then(video => {
      res.status(200).json(video);
    })
    .catch(error => {
      if (error.message.includes('not found')) {
        return res.status(404).json({ message: error.message });
      }
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    });
}

export function createVideo(req, res) {
  create(req.body)
    .then(newVideo => {
      res.status(201).json(newVideo);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    });
}

export function updateVideo(req, res) {
  update(req.params.id, req.body)
    .then(updatedVideo => {
      res.status(200).json(updatedVideo);
    })
    .catch(error => {
      if (error.message.includes('not found')) {
        return res.status(404).json({ message: error.message });
      }
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    });
}

export function deleteVideo(req, res) {
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
