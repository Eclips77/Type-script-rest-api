/**
 * @file Zod schemas for playlist data validation.
 * @module schemas/playlist.schema
 */

import { z } from 'zod';

export const PlaylistSchema = z.object({
  id: z.string(),
  name: z.string(),
  videoIds: z.array(z.string()),
  genres: z.array(z.string()), // Changed from enum to string array
});

export const PlaylistUpdateSchema = PlaylistSchema.partial();
