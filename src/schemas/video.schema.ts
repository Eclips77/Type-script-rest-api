import { z } from 'zod';

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

export const VideoUpdateSchema = VideoSchema.partial();

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
});

export type Video = z.infer<typeof VideoSchema>;
