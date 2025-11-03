/**
 * @file Defines the routes for the playlist API.
 * @module routes/playlist.routes
 */

import { Router } from 'express';
import { playlistController } from '../controllers/index.js';
import { validate, validateQuery } from '../middleware/index.js';
import { PlaylistSchema, PlaylistUpdateSchema } from '../schemas/index.js';
import { z } from 'zod';

const router = Router();

const PlaylistFilterSchema = z.object({
    genre: z.string().optional(),
});

router.get('/', validateQuery(PlaylistFilterSchema), playlistController.getAllPlaylists);
router.get('/:id', playlistController.getPlaylistById);
router.post('/', validate(PlaylistSchema.omit({ id: true })), playlistController.createPlaylist);
router.put('/:id', validate(PlaylistUpdateSchema), playlistController.updatePlaylist);
router.delete('/:id', playlistController.deletePlaylist);

// New, explicit routes for managing videos in a playlist
router.post('/:id/videos', playlistController.addVideoToPlaylist);
router.delete('/:id/videos/:videoId', playlistController.removeVideoFromPlaylist);

export default router;
