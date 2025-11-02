/**
 * @file Controller for handling playlist-related API requests.
 * @module controllers/playlist.controller
 */

import {
  getAll,
  getById,
  create,
  update,
  remove,
  addVideo,
} from '../services/playlist.service.js';

export function getAllPlaylists(req, res) {
  getAll(req.query)
    .then(playlists => {
      res.status(200).json(playlists);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    });
}

export function getPlaylistById(req, res) {
  getById(req.params.id)
    .then(playlist => {
      res.status(200).json(playlist);
    })
    .catch(error => {
      if (error.message.includes('not found')) {
        return res.status(404).json({ message: error.message });
      }
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    });
}

export function createPlaylist(req, res) {
  create(req.body)
    .then(newPlaylist => {
      res.status(201).json(newPlaylist);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    });
}

export function updatePlaylist(req, res) {
  update(req.params.id, req.body)
    .then(updatedPlaylist => {
      res.status(200).json(updatedPlaylist);
    })
    .catch(error => {
      if (error.message.includes('not found')) {
        return res.status(404).json({ message: error.message });
      }
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    });
}

export function deletePlaylist(req, res) {
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

export function addVideoToPlaylist(req, res) {
    const { playlistId, videoId } = req.params;
    addVideo(playlistId, videoId)
        .then(playlist => {
            res.status(200).json(playlist);
        })
        .catch(error => {
            if (error.message.includes('not found')) {
                return res.status(404).json({ message: error.message });
            }
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        });
}
