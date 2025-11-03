/**
 * @file Defines the routes for the video API.
 * @module routes/video.routes
 */

import { Router } from 'express';
import { videoController } from '../controllers/index.js';
import { validate, validateQuery } from '../middleware/index.js';
import { VideoSchema, VideoUpdateSchema } from '../schemas/index.js';
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

router.get('/', validateQuery(VideoFilterSchema), videoController.getAllVideos);
router.get('/:id', videoController.getVideoById);
router.post('/', validate(VideoSchema.omit({ id: true, uploadTime: true })), videoController.createVideo);
router.put('/:id', validate(VideoUpdateSchema), videoController.updateVideo);
router.delete('/:id', videoController.deleteVideo);

export default router;
