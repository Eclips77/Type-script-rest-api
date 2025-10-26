/**
 * @file Controller for handling video-related API requests.
 * @module controllers/video.controller
 */

import { Request, Response } from 'express';
import {
  getAll,
  getById,
  create,
  update,
  remove,
} from '../services/video.service';
import { asyncHandler } from '../utils/asyncHandler.util';

/**
 * Handles the request to get all videos.
 * Passes query parameters to the service layer for filtering.
 * @function getAllVideos
 * @param {Request} req - The Express request object, containing query parameters.
 * @param {Response} res - The Express response object.
 */
export const getAllVideos = asyncHandler(async (req: Request, res: Response) => {
  const videos = await getAll(req.query);
  res.status(200).json(videos);
});

/**
 * Handles the request to get a single video by its ID.
 * Extracts the ID from the request parameters.
 * @function getVideoById
 * @param {Request} req - The Express request object, containing the video ID as a parameter.
 * @param {Response} res - The Express response object.
 */
export const getVideoById = asyncHandler(async (req: Request, res: Response) => {
  const video = await getById(req.params.id);
  res.status(200).json(video);
});

/**
 * Handles the request to create a new video.
 * The video data is taken from the request body.
 * @function createVideo
 * @param {Request} req - The Express request object, containing the video data in the body.
 * @param {Response} res - The Express response object.
 */
export const createVideo = asyncHandler(async (req: Request, res: Response) => {
  const newVideo = await create(req.body);
  res.status(201).json(newVideo);
});

/**
 * Handles the request to update an existing video.
 * The video ID is taken from the request parameters, and the update data from the body.
 * @function updateVideo
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 */
export const updateVideo = asyncHandler(async (req: Request, res: Response) => {
  const updatedVideo = await update(req.params.id, req.body);
  res.status(200).json(updatedVideo);
});

/**
 * Handles the request to delete a video.
 * The video ID is taken from the request parameters.
 * @function deleteVideo
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 */
export const deleteVideo = asyncHandler(async (req: Request, res: Response) => {
  await remove(req.params.id);
  res.status(204).send();
});
