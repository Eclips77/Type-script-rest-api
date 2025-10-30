/**
 * @file Defines the routes for the playlist API.
 * @module routes/playlist.routes
 */

import { Router } from 'express';
import {
  getAllPlaylists,
  getPlaylistById,
  createPlaylist,
  updatePlaylist,
  deletePlaylist,
  addVideoToPlaylist,
} from '../controllers/playlist.controller.js';
import { validate, validateQuery } from '../middleware/validation.middleware.js';
import { PlaylistSchema, PlaylistUpdateSchema, genres } from '../schemas/playlist.schema.js';
import { z } from 'zod';

const router = Router();

const PlaylistFilterSchema = z.object({
    genre: z.enum(genres).optional(),
});

router.get('/', validateQuery(PlaylistFilterSchema), getAllPlaylists);
router.get('/:id', getPlaylistById);
router.post('/', validate(PlaylistSchema.omit({ id: true, videoIds: true })), createPlaylist);
router.put('/:id', validate(PlaylistUpdateSchema), updatePlaylist);
router.delete('/:id', deletePlaylist);
router.patch('/:playlistId/videos/:videoId', addVideoToPlaylist);

export default router;
