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

// Validation for genre is now handled dynamically in the service layer
const PlaylistFilterSchema = z.object({
    genre: z.string().optional(),
});

router.get('/', validateQuery(PlaylistFilterSchema), playlistController.getAllPlaylists);
router.get('/:id', playlistController.getPlaylistById);
router.post('/', validate(PlaylistSchema.omit({ id: true, videoIds: true })), playlistController.createPlaylist);
router.put('/:id', validate(PlaylistUpdateSchema), playlistController.updatePlaylist);
router.delete('/:id', playlistController.deletePlaylist);
router.patch('/:playlistId/videos/:videoId', playlistController.addVideoToPlaylist);

export default router;
