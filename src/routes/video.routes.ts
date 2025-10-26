/**
 * @file Defines the routes for the video API.
 * Connects the API endpoints to the corresponding controller functions
 * and applies validation middleware.
 * @module routes/video.routes
 */

import { Router } from 'express';
import {
  getAllVideos,
  getVideoById,
  createVideo,
  updateVideo,
  deleteVideo,
} from '../controllers/video.controller';
import { validate, validateQuery } from '../middleware/validation.middleware';
import {
  VideoSchema,
  VideoUpdateSchema,
  VideoFilterSchema,
} from '../schemas/video.schema';

const router = Router();

// GET /api/videos - Get all videos with filtering
router.get('/', validateQuery(VideoFilterSchema), getAllVideos);

// GET /api/videos/:id - Get a single video by ID
router.get('/:id', getVideoById);

// POST /api/videos - Create a new video
router.post('/', validate(VideoSchema.omit({ id: true, uploadTime: true })), createVideo);

// PUT /api/videos/:id - Update an existing video
router.put('/:id', validate(VideoUpdateSchema), updateVideo);

// DELETE /api/videos/:id - Delete a video
router.delete('/:id', deleteVideo);

export default router;
