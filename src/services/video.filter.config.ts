/**
 * @file Configuration map for video filtering.
 * @module services/video.filter.config
 */

import { VideoFilters } from '../types/video.types';

/**
 * Defines the type of filter to be applied.
 * @typedef {'exact' | 'range' | 'array' | 'fuzzy'} FilterType
 */
export type FilterType = 'exact' | 'range' | 'array' | 'fuzzy';

/**
 * Defines the structure for a filter configuration entry.
 * @interface FilterConfigEntry
 * @property {FilterType} type - The type of filter.
 * @property {(keyof import('../schemas/video.schema').Video) | (keyof import('../schemas/video.schema').Video)[]} keyOrKeys - The model key(s) to apply the filter on.
 */
export interface FilterConfigEntry {
  type: FilterType;
  keyOrKeys: keyof import('../schemas/video.schema').Video | (keyof import('../schemas/video.schema').Video)[];
}

/**
 * A map that links query parameters to their corresponding filter configurations.
 * @constant {Record<keyof VideoFilters, FilterConfigEntry>}
 */
export const filterConfig: Record<keyof Omit<VideoFilters, 'minDuration' | 'maxDuration' | 'startDate' | 'endDate'> | 'duration' | 'uploadTime' | 'search', FilterConfigEntry> = {
    creator: { type: 'exact', keyOrKeys: 'creator' },
    language: { type: 'exact', keyOrKeys: 'language' },
    duration: { type: 'range', keyOrKeys: 'duration' },
    uploadTime: { type: 'range', keyOrKeys: 'uploadTime' },
    targetAudience: { type: 'array', keyOrKeys: 'targetAudience' },
    search: { type: 'fuzzy', keyOrKeys: ['title', 'description'] },
};
