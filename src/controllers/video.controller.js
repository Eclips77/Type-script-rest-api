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
import { asyncHandler } from '../utils/asyncHandler.util.js';

function getAllVideosHandler(req, res) {
  getAll(req.query)
    .then(videos => {
      res.status(200).json(videos);
    });
}

function getVideoByIdHandler(req, res, next) {
  getById(req.params.id)
    .then(video => {
      res.status(200).json(video);
    })
    .catch(next);
}

function createVideoHandler(req, res) {
  create(req.body)
    .then(newVideo => {
      res.status(201).json(newVideo);
    });
}

function updateVideoHandler(req, res, next) {
  update(req.params.id, req.body)
    .then(updatedVideo => {
      res.status(200).json(updatedVideo);
    })
    .catch(next);
}

function deleteVideoHandler(req, res, next) {
  remove(req.params.id)
    .then(() => {
      res.status(204).send();
    })
    .catch(next);
}

export const getAllVideos = asyncHandler(getAllVideosHandler);
export const getVideoById = asyncHandler(getVideoByIdHandler);
export const createVideo = asyncHandler(createVideoHandler);
export const updateVideo = asyncHandler(updateVideoHandler);
export const deleteVideo = asyncHandler(deleteVideoHandler);
