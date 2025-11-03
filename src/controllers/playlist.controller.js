/**
 * @file Controller for handling playlist-related API requests.
 * @module controllers/playlist.controller
 */

import { playlistService } from '../services/index.js';
import { NotFoundError, ValidationError } from '../services/playlist.service.js';

export function getAllPlaylists(req, res) {
  playlistService.getAll(req.query)
    .then(playlists => {
      res.status(200).json(playlists);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    });
}

export function getPlaylistById(req, res) {
  playlistService.getById(req.params.id)
    .then(playlist => {
      res.status(200).json(playlist);
    })
    .catch(error => {
      if (error instanceof NotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    });
}

export function createPlaylist(req, res) {
  playlistService.create(req.body)
    .then(newPlaylist => {
      res.status(201).json(newPlaylist);
    })
    .catch(error => {
      if (error instanceof ValidationError) {
        return res.status(400).json({ message: error.message });
      }
      if (error instanceof NotFoundError) { // For videoId validation
        return res.status(404).json({ message: error.message });
      }
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    });
}

export function updatePlaylist(req, res) {
  playlistService.update(req.params.id, req.body)
    .then(updatedPlaylist => {
      res.status(200).json(updatedPlaylist);
    })
    .catch(error => {
      if (error instanceof NotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      if (error instanceof ValidationError) {
        return res.status(400).json({ message: error.message });
      }
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    });
}

export function deletePlaylist(req, res) {
  playlistService.remove(req.params.id)
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

export function addVideoToPlaylist(req, res) {
    const { id } = req.params;
    const { videoId } = req.body; // Expecting videoId in the body
    if (!videoId) {
        return res.status(400).json({ message: 'videoId is required' });
    }
    playlistService.addVideoToPlaylist(id, videoId)
        .then(playlist => {
            res.status(200).json(playlist);
        })
        .catch(error => {
            if (error instanceof NotFoundError) {
                return res.status(404).json({ message: error.message });
            }
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        });
}

export function removeVideoFromPlaylist(req, res) {
    const { id, videoId } = req.params;
    playlistService.removeVideoFromPlaylist(id, videoId)
        .then(playlist => {
            res.status(200).json(playlist);
        })
        .catch(error => {
            if (error instanceof NotFoundError) {
                return res.status(404).json({ message: error.message });
            }
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        });
}
