/**
 * @file Applies generic filtering logic specifically for the Video model using a clean, functional, and configuration-driven approach.
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

// Type definition for a function that takes a Video array and returns a filtered Video array.
type VideoFilterFunction = (videos: Video[]) => Video[];

/**
 * @private
 * A map of filter handlers. Each handler is a function that, when called with the query parameters,
 * returns a filter function ready to be applied to the data. This avoids code repetition
 * and makes the filtering logic clean and declarative.
 */
const filterHandlers = {
  creator: (params: VideoFilters): VideoFilterFunction => (videos) =>
    filterByExactMatch(videos, 'creator', params.creator),

  language: (params: VideoFilters): VideoFilterFunction => (videos) =>
    filterByExactMatch(videos, 'language', params.language),

  targetAudience: (params: VideoFilters): VideoFilterFunction => (videos) =>
    filterByArray(videos, 'targetAudience', params.targetAudience!),

  duration: (params: VideoFilters): VideoFilterFunction => (videos) =>
    filterByRange(videos, 'duration', params.minDuration, params.maxDuration),

  uploadTime: (params: VideoFilters): VideoFilterFunction => (videos) =>
    filterByRange(videos, 'uploadTime', params.startDate, params.endDate),

  search: (params: VideoFilters): VideoFilterFunction => (videos) =>
    filterByFuzzyMatch(videos, ['title', 'description'], params.search!),
};

// Maps specific query parameters to the correct handler. This is especially useful
// for range filters where multiple query params control a single filter type.
const queryParamToHandlerMap: Partial<Record<keyof VideoFilters, keyof typeof filterHandlers>> = {
    creator: 'creator',
    language: 'language',
    targetAudience: 'targetAudience',
    minDuration: 'duration',
    maxDuration: 'duration',
    startDate: 'uploadTime',
    endDate: 'uploadTime',
    search: 'search'
};

/**
 * Applies all relevant filters to an array of videos based on the provided query parameters.
 * This function uses a functional approach to chain active filters together.
 * @param {Video[]} videos - The array of videos to filter.
 * @param {VideoFilters} queryParams - The filter criteria from the query parameters.
 * @returns {Video[]} The filtered array of videos.
 */
export const applyVideoFilters = (
  videos: Video[],
  queryParams: VideoFilters
): Video[] => {
  // 1. Identify which handlers need to run based on the provided query params.
  // Using a Set ensures that each handler is considered only once.
  const activeHandlers = new Set<keyof typeof filterHandlers>();
  for (const param in queryParams) {
      const key = param as keyof VideoFilters;
      if (queryParams[key] !== undefined && queryParamToHandlerMap[key]) {
          activeHandlers.add(queryParamToHandlerMap[key]!);
      }
  }

  // 2. Create an array of active filter functions.
  const filterPipeline: VideoFilterFunction[] = Array.from(activeHandlers).map(handlerName =>
    filterHandlers[handlerName](queryParams)
  );

  // 3. Apply the filters sequentially using a functional reduce.
  return filterPipeline.reduce(
    (currentVideos, filterFunction) => filterFunction(currentVideos),
    videos
  );
};
