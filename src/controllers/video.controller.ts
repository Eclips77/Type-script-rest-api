/**
 * @file Controller for handling video-related API requests.
 * @module controllers/video.controller
 */

import { Request, Response } from 'express';
import {
  getAll as getAllVideosService,
  getById as getVideoByIdService,
  create as createVideoService,
  update as updateVideoService,
  remove as deleteVideoService,
} from '../services/video.service';
import { asyncHandler } from '../utils/asyncHandler.util';

async function getAllVideosHandler(req: Request, res: Response) {
  const videos = await getAllVideosService(req.query);
  res.status(200).json(videos);
}

async function getVideoByIdHandler(req: Request, res: Response) {
  const video = await getVideoByIdService(req.params.id);
  res.status(200).json(video);
}

async function createVideoHandler(req: Request, res: Response) {
  const newVideo = await createVideoService(req.body);
  res.status(201).json(newVideo);
}

async function updateVideoHandler(req: Request, res: Response) {
  const updatedVideo = await updateVideoService(req.params.id, req.body);
  res.status(200).json(updatedVideo);
}

async function deleteVideoHandler(req: Request, res: Response) {
  await deleteVideoService(req.params.id);
  res.status(204).send();
}

export const getAllVideos = asyncHandler(getAllVideosHandler);
export const getVideoById = asyncHandler(getVideoByIdHandler);
export const createVideo = asyncHandler(createVideoHandler);
export const updateVideo = asyncHandler(updateVideoHandler);
export const deleteVideo = asyncHandler(deleteVideoHandler);
