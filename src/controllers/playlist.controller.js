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
import { asyncHandler } from '../utils/asyncHandler.util.js';

function getAllPlaylistsHandler(req, res) {
  getAll(req.query)
    .then(playlists => {
      res.status(200).json(playlists);
    });
}

function getPlaylistByIdHandler(req, res, next) {
  getById(req.params.id)
    .then(playlist => {
      res.status(200).json(playlist);
    })
    .catch(next);
}

function createPlaylistHandler(req, res) {
  create(req.body)
    .then(newPlaylist => {
      res.status(201).json(newPlaylist);
    });
}

function updatePlaylistHandler(req, res, next) {
  update(req.params.id, req.body)
    .then(updatedPlaylist => {
      res.status(200).json(updatedPlaylist);
    })
    .catch(next);
}

function deletePlaylistHandler(req, res, next) {
  remove(req.params.id)
    .then(() => {
      res.status(204).send();
    })
    .catch(next);
}

function addVideoToPlaylistHandler(req, res, next) {
    const { playlistId, videoId } = req.params;
    addVideo(playlistId, videoId)
        .then(playlist => {
            res.status(200).json(playlist);
        })
        .catch(next);
}


export const getAllPlaylists = asyncHandler(getAllPlaylistsHandler);
export const getPlaylistById = asyncHandler(getPlaylistByIdHandler);
export const createPlaylist = asyncHandler(createPlaylistHandler);
export const updatePlaylist = asyncHandler(updatePlaylistHandler);
export const deletePlaylist = asyncHandler(deletePlaylistHandler);
export const addVideoToPlaylist = asyncHandler(addVideoToPlaylistHandler);
