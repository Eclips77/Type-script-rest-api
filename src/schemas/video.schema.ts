/**
 * @file Zod schemas for video data validation and type inference.
 * @module schemas/video.schema
 */

import { z } from 'zod';

/**
 * Zod schema for a video object.
 * Defines the shape and validation rules for a video.
 * - `id`: Must be a valid UUID.
 * - `title`: Must be a string.
 * - `creator`: Must be a string.
 * - `duration`: Must be a number (in milliseconds).
 * - `uploadTime`: Coerced into a Date object from a string or Date.
 * - `description`: Must be a string.
 * - `targetAudience`: Must be one of 'children', 'teens', or 'adults'.
 * - `language`: Must be a two-letter string (ISO 639-1 code).
 * @constant {z.ZodObject} VideoSchema
 */
export const VideoSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  creator: z.string(),
  duration: z.number(),
  uploadTime: z.preprocess((arg) => {
    if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
  }, z.date()),
  description: z.string(),
  targetAudience: z.enum(['children', 'teens', 'adults']),
  language: z.string().length(2),
});

/**
 * Zod schema for updating a video.
 * All fields from `VideoSchema` are made optional.
 * @constant {z.ZodObject} VideoUpdateSchema
 */
export const VideoUpdateSchema = VideoSchema.partial();

/**
 * Zod schema for filtering videos via query parameters.
 * - `targetAudience`: Coerced into an array from a single string or an array of strings.
 * - `minDuration`, `maxDuration`: Coerced into a number from a string.
 * - `startDate`, `endDate`: Coerced into a Date object from a string or Date.
 * @constant {z.ZodObject} VideoFilterSchema
 */
export const VideoFilterSchema = z.object({
  creator: z.string().optional(),
  language: z.string().optional(),
  targetAudience: z.preprocess(
    (a) => (Array.isArray(a) ? a : [a]),
    z.array(z.string())
  ).optional(),
  minDuration: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number().positive()
  ).optional(),
  maxDuration: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number().positive()
  ).optional(),
  startDate: z.preprocess((arg) => {
    if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
  }, z.date()).optional(),
  endDate: z.preprocess((arg) => {
    if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
  }, z.date()).optional(),
  search: z.string().optional(),
});

/**
 * TypeScript type inferred from the `VideoSchema`.
 * Represents a single video object.
 * @typedef {z.infer<typeof VideoSchema>} Video
 */
export type Video = z.infer<typeof VideoSchema>;
