/**
 * @file Zod schemas for playlist data validation.
 * @module schemas/playlist.schema
 */

import { z } from 'zod';

export const genres = [
    'Comedy', 'Horror', 'Action', 'Animation',
    'Drama', 'Sci-Fi', 'Documentary', 'Thriller'
];

export const PlaylistSchema = z.object({
  id: z.string(),
  name: z.string(),
  videoIds: z.array(z.string()),
  genres: z.array(z.enum(genres)),
});

export const PlaylistUpdateSchema = PlaylistSchema.partial();
