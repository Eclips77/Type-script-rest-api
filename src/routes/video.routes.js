/**
 * @file Defines the routes for the video API.
 * @module routes/video.routes
 */

import { Router } from 'express';
import {
  getAllVideos,
  getVideoById,
  createVideo,
  updateVideo,
  deleteVideo,
} from '../controllers/video.controller.js';
import { validate, validateQuery } from '../middleware/validation.middleware.js';
import { VideoSchema, VideoUpdateSchema } from '../schemas/video.schema.js';
import { z } from 'zod';

const router = Router();

const VideoFilterSchema = z.object({
    creator: z.string().optional(),
    language: z.string().optional(),
    productionCompany: z.string().optional(),
    targetAudience: z.union([z.string(), z.array(z.string())]).optional(),
    minDuration: z.string().optional().transform(Number),
    maxDuration: z.string().optional().transform(Number),
    startDate: z.string().optional().transform(val => new Date(val)),
    endDate: z.string().optional().transform(val => new Date(val)),
    search: z.string().optional(),
});

router.get('/', validateQuery(VideoFilterSchema), getAllVideos);
router.get('/:id', getVideoById);
router.post('/', validate(VideoSchema.omit({ id: true, uploadTime: true })), createVideo);
router.put('/:id', validate(VideoUpdateSchema), updateVideo);
router.delete('/:id', deleteVideo);

export default router;
