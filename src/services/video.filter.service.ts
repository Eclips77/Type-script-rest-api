/**
 * @file Applies generic filtering logic specifically for the Video model using a configuration-driven approach.
 * @module services/video.filter.service
 */

import { Video } from '../schemas/video.schema';
import { VideoFilters } from '../types/video.types';
import {
  filterByExactMatch,
  filterByRange,
  filterByArray,
  filterByFuzzyMatch,
} from './generic.filter.service';
import { filterConfig } from './video.filter.config';

/**
 * Applies all relevant filters to an array of videos based on the provided query parameters.
 * This function dynamically applies filters by consulting the `filterConfig` map.
 * @param {Video[]} videos - The array of videos to filter.
 * @param {VideoFilters} queryParams - The filter criteria from the query parameters.
 * @returns {Video[]} The filtered array of videos.
 */
export const applyVideoFilters = (
  videos: Video[],
  queryParams: VideoFilters
): Video[] => {
  let filteredVideos = [...videos];

  for (const configKey in filterConfig) {
    const key = configKey as keyof typeof filterConfig;
    const config = filterConfig[key];

    switch (config.type) {
      case 'exact': {
        const value = queryParams[key as keyof VideoFilters];
        if (value !== undefined) {
          filteredVideos = filterByExactMatch(filteredVideos, config.keyOrKeys as keyof Video, value);
        }
        break;
      }
      case 'range': {
        const rangeKeys = {
            duration: { min: queryParams.minDuration, max: queryParams.maxDuration },
            uploadTime: { min: queryParams.startDate, max: queryParams.endDate },
        };
        const { min, max } = rangeKeys[key as 'duration' | 'uploadTime'];
        if (min !== undefined || max !== undefined) {
            filteredVideos = filterByRange(filteredVideos, config.keyOrKeys as keyof Video, min, max);
        }
        break;
      }
      case 'array': {
        const value = queryParams[key as keyof VideoFilters];
        if (value && Array.isArray(value)) {
          filteredVideos = filterByArray(filteredVideos, config.keyOrKeys as keyof Video, value);
        }
        break;
      }
      case 'fuzzy': {
        const value = queryParams.search;
        if (value) {
          filteredVideos = filterByFuzzyMatch(filteredVideos, config.keyOrKeys as (keyof Video)[], value);
        }
        break;
      }
    }
  }

  return filteredVideos;
};
