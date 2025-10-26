import { Request, Response } from 'express';
import {
  getAll,
  getById,
  create,
  update,
  remove,
} from '../services/video.service';
import { asyncHandler } from '../utils/asyncHandler.util';

export const getAllVideos = asyncHandler(async (req: Request, res: Response) => {
  const videos = await getAll(req.query);
  res.status(200).json(videos);
});

export const getVideoById = asyncHandler(async (req: Request, res: Response) => {
  const video = await getById(req.params.id);
  res.status(200).json(video);
});

export const createVideo = asyncHandler(async (req: Request, res: Response) => {
  const newVideo = await create(req.body);
  res.status(201).json(newVideo);
});

export const updateVideo = asyncHandler(async (req: Request, res: Response) => {
  const updatedVideo = await update(req.params.id, req.body);
  res.status(200).json(updatedVideo);
});

export const deleteVideo = asyncHandler(async (req: Request, res: Response) => {
  await remove(req.params.id);
  res.status(204).send();
});
