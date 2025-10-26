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

router.get('/', validateQuery(VideoFilterSchema), getAllVideos);
router.get('/:id', getVideoById);
router.post('/', validate(VideoSchema.omit({ id: true, uploadTime: true })), createVideo);
router.put('/:id', validate(VideoUpdateSchema), updateVideo);
router.delete('/:id', deleteVideo);

export default router;
