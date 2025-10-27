/**
 * @file Applies generic filtering logic to the Video model using a clean, map-driven architecture.
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

// Map fields from the Video model to the appropriate generic filter function.
const filterFunctionMap = {
  creator: filterByExactMatch,
  language: filterByExactMatch,
  targetAudience: filterByArray,
  duration: filterByRange,
  uploadTime: filterByRange,
  search: filterByFuzzyMatch,
};

// Map query parameters to their corresponding field in the Video model.
// This handles cases like `minDuration` and `maxDuration` both mapping to the `duration` field.
const queryParamToFieldMap: Partial<Record<keyof VideoFilters, keyof typeof filterFunctionMap>> = {
  creator: 'creator',
  language: 'language',
  targetAudience: 'targetAudience',
  minDuration: 'duration',
  maxDuration: 'duration',
  startDate: 'uploadTime',
  endDate: 'uploadTime',
  search: 'search',
};

/**
 * Applies all relevant filters to an array of videos using a functional pipeline.
 * @param {Video[]} videos - The array of videos to filter.
 * @param {VideoFilters} queryParams - The filter criteria from the query parameters.
 * @returns {Video[]} The filtered array of videos.
 */
export const applyVideoFilters = (
  videos: Video[],
  queryParams: VideoFilters
): Video[] => {

  // Prepare a unified set of filters to apply, handling ranges cleanly.
  const filtersToApply = {
    creator: queryParams.creator,
    language: queryParams.language,
    targetAudience: queryParams.targetAudience,
    search: queryParams.search,
    duration: (queryParams.minDuration !== undefined || queryParams.maxDuration !== undefined)
      ? { min: queryParams.minDuration, max: queryParams.maxDuration }
      : undefined,
    uploadTime: (queryParams.startDate !== undefined || queryParams.endDate !== undefined)
      ? { min: queryParams.startDate, max: queryParams.endDate }
      : undefined,
  };

  return Object.entries(filtersToApply).reduce((currentVideos, [field, value]) => {
    if (value === undefined || value === null) {
      return currentVideos;
    }

    const filterFn = filterFunctionMap[field as keyof typeof filterFunctionMap];
    if (!filterFn) {
        return currentVideos;
    }

    if (field === 'search') {
      return filterFn(currentVideos, ['title', 'description'], value as string);
    }

    return filterFn(currentVideos, field, value);
  }, videos);
};
