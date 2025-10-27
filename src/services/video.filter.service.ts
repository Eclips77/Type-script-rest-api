/**
 * @file Applies generic filtering logic to the Video model using a clean, map-driven architecture.
 * @module services/video.filter.service
 */

import { Video } from '../schemas/video.schema';
import { VideoFilters } from '../types/video.types';
import { filterFunctionMap, queryParamToFieldMap } from '../config/video.filter.config';

/**
 * Applies all relevant filters to an array of videos using a concise and efficient pipeline.
 * @param {Video[]} videos - The array of videos to filter.
 * @param {VideoFilters} queryParams - The filter criteria from the query parameters.
 * @returns {Video[]} The filtered array of videos.
 */
export const applyVideoFilters = (
  videos: Video[],
  queryParams: VideoFilters
): Video[] => {
  const processedRangeFields = new Set<string>();

  return Object.entries(queryParams).reduce((currentVideos, [param, value]) => {
    if (value === undefined || value === null) {
      return currentVideos;
    }

    const field = queryParamToFieldMap[param as keyof VideoFilters];
    if (!field) {
      return currentVideos;
    }

    const filterFn = filterFunctionMap[field];

    if (field === 'duration' || field === 'uploadTime') {
      if (processedRangeFields.has(field)) {
        return currentVideos; // Already processed this range field
      }
      processedRangeFields.add(field);
      const range = (field === 'duration')
        ? { min: queryParams.minDuration, max: queryParams.maxDuration }
        : { min: queryParams.startDate, max: queryParams.endDate };
      return filterFn(currentVideos, field, range);
    }

    if (field === 'search') {
      return filterFn(currentVideos, ['title', 'description'], value as string);
    }

    return filterFn(currentVideos, field, value);
  }, videos);
};
