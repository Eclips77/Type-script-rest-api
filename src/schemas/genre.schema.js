/**
 * @file Zod schemas for genre data validation.
 * @module schemas/genre.schema
 */

import { z } from 'zod';

export const GenreSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const GenreUpdateSchema = GenreSchema.partial().omit({ id: true });
