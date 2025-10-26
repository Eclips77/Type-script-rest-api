/**
 * @file Service functions for filtering video data.
 * @module services/filter.service
 */

import { Video } from '../schemas/video.schema';
import { VideoFilters } from '../types/video.types';

/**
 * Filters videos by exact match on string properties.
 * Currently supports 'creator' and 'language'.
 * @function filterByExactMatch
 * @param {Video[]} videos - The array of videos to filter.
 * @param {Pick<VideoFilters, 'creator' | 'language'>} filters - The filter criteria.
 * @returns {Video[]} The filtered array of videos.
 */
export const filterByExactMatch = (
  videos: Video[],
  filters: Pick<VideoFilters, 'creator' | 'language'>
): Video[] => {
  let filteredVideos = [...videos];
  if (filters.creator) {
    filteredVideos = filteredVideos.filter(
      (video) => video.creator === filters.creator
    );
  }
  if (filters.language) {
    filteredVideos = filteredVideos.filter(
      (video) => video.language === filters.language
    );
  }
  return filteredVideos;
};

/**
 * Filters videos by a numeric or date range.
 * Supports 'minDuration', 'maxDuration', 'startDate', and 'endDate'.
 * @function filterByRange
 * @param {Video[]} videos - The array of videos to filter.
 * @param {Pick<VideoFilters, 'minDuration' | 'maxDuration' | 'startDate' | 'endDate'>} filters - The filter criteria.
 * @returns {Video[]} The filtered array of videos.
 */
export const filterByRange = (
  videos: Video[],
  filters: Pick<
    VideoFilters,
    'minDuration' | 'maxDuration' | 'startDate' | 'endDate'
  >
): Video[] => {
  let filteredVideos = [...videos];
  if (filters.minDuration) {
    filteredVideos = filteredVideos.filter(
      (video) => video.duration >= filters.minDuration!
    );
  }
  if (filters.maxDuration) {
    filteredVideos = filteredVideos.filter(
      (video) => video.duration <= filters.maxDuration!
    );
  }
  if (filters.startDate) {
    filteredVideos = filteredVideos.filter(
      (video) => new Date(video.uploadTime) >= filters.startDate!
    );
  }
  if (filters.endDate) {
    filteredVideos = filteredVideos.filter(
      (video) => new Date(video.uploadTime) <= filters.endDate!
    );
  }
  return filteredVideos;
};

/**
 * Filters videos where a property matches any value in a given array.
 * Currently supports 'targetAudience'.
 * This implements an OR logic for the values within the array.
 * @function filterByArray
 * @param {Video[]} videos - The array of videos to filter.
 * @param {Pick<VideoFilters, 'targetAudience'>} filters - The filter criteria.
 * @returns {Video[]} The filtered array of videos.
 * @example
 * // Returns videos where targetAudience is either 'children' or 'teens'.
 * filterByArray(videos, { targetAudience: ['children', 'teens'] });
 */
export const filterByArray = (
  videos: Video[],
  filters: Pick<VideoFilters, 'targetAudience'>
): Video[] => {
  if (!filters.targetAudience || filters.targetAudience.length === 0) {
    return videos;
  }
  return videos.filter((video) =>
    filters.targetAudience!.includes(video.targetAudience)
  );
};

/**
 * Applies all available filters to an array of videos.
 * This function acts as a central orchestrator for the modular filter functions.
 * @function applyFilters
 * @param {Video[]} videos - The array of videos to filter.
 * @param {VideoFilters} filters - An object containing all possible filter criteria.
 * @returns {Video[]} The final filtered array of videos.
 */
export const applyFilters = (
  videos: Video[],
  filters: VideoFilters
): Video[] => {
  let filteredVideos = [...videos];
  filteredVideos = filterByExactMatch(filteredVideos, filters);
  filteredVideos = filterByRange(filteredVideos, filters);
  filteredVideos = filterByArray(filteredVideos, filters);
  return filteredVideos;
};
