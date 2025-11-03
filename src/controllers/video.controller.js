/**
 * @file Controller for handling video-related API requests.
 * @module controllers/video.controller
 */

import { videoService } from '../services/index.js';
import { NotFoundError } from '../services/video.service.js';

export function getAllVideos(req, res) {
  videoService.getAll(req.query)
    .then(videos => {
      res.status(200).json(videos);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    });
}

export function getVideoById(req, res) {
  videoService.getById(req.params.id)
    .then(video => {
      res.status(200).json(video);
    })
    .catch(error => {
      if (error instanceof NotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    });
}

export function createVideo(req, res) {
  videoService.create(req.body)
    .then(newVideo => {
      res.status(201).json(newVideo);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    });
}

export function updateVideo(req, res) {
  videoService.update(req.params.id, req.body)
    .then(updatedVideo => {
      res.status(200).json(updatedVideo);
    })
    .catch(error => {
      if (error instanceof NotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    });
}

export function deleteVideo(req, res) {
  videoService.remove(req.params.id)
    .then(() => {
      res.status(204).send();
    })
    .catch(error => {
      if (error instanceof NotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    });
}
