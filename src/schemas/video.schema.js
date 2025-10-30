/**
 * @file Zod schemas for video data validation and type inference.
 * @module schemas/video.schema
 */

import { z } from 'zod';

/**
 * Zod schema for a video object.
 */
export const VideoSchema = z.object({
  id: z.string(),
  title: z.string(),
  creator: z.string(),
  duration: z.number(),
  uploadTime: z.preprocess((arg) => {
    if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
  }, z.date()),
  description: z.string(),
  targetAudience: z.enum(['children', 'teens', 'adults']),
  language: z.string().length(2),
  productionCompany: z.string().optional(),
});

/**
 * Zod schema for updating a video.
 */
export const VideoUpdateSchema = VideoSchema.partial();
