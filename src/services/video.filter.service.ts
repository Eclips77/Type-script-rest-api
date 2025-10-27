/**
 * @file Applies generic filtering logic specifically for the Video model.
 * @module services/video.filter.service
 */

import { Video } from '../schemas/video.schema';
import { VideoFilters } from '../types/video.types';
import {
  filterByExactMatch,
  filterByRange,
  filterByArray,
} from './generic.filter.service';

/**
 * Applies all relevant filters to an array of videos based on the provided criteria.
 * This function orchestrates calls to the generic filter functions with video-specific keys.
 * @param {Video[]} videos - The array of videos to filter.
 * @param {VideoFilters} filters - The filter criteria for videos.
 * @returns {Video[]} The filtered array of videos.
 */
export const applyVideoFilters = (
  videos: Video[],
  filters: VideoFilters
): Video[] => {
  let filteredVideos = [...videos];

  // Apply exact match filters
  if (filters.creator) {
    filteredVideos = filterByExactMatch(filteredVideos, 'creator', filters.creator);
  }
  if (filters.language) {
    filteredVideos = filterByExactMatch(filteredVideos, 'language', filters.language);
  }

  // Apply range filters
  filteredVideos = filterByRange(
    filteredVideos,
    'duration',
    filters.minDuration,
    filters.maxDuration
  );
  filteredVideos = filterByRange(
    filteredVideos,
    'uploadTime',
    filters.startDate,
    filters.endDate
  );

  // Apply array filters
  if (filters.targetAudience) {
    filteredVideos = filterByArray(
      filteredVideos,
      'targetAudience',
      filters.targetAudience
    );
  }

  return filteredVideos;
};
