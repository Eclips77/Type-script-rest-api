/**
 * @file Applies a hyper-efficient, predicate-based filtering logic for the Video model.
 * @module services/video.filter.service
 */

import Fuse from 'fuse.js';
import { Video } from '../schemas/video.schema';
import { VideoFilters } from '../types/video.types';

// A Predicate is a function that returns a boolean, used for filtering.
type Predicate = (video: Video) => boolean;

/**
 * @private
 * A map where each key is a query parameter and each value is a function
 * that generates a predicate for that filter. This is a clean, declarative
 * way to define filtering logic.
 */
const predicateMap: Partial<Record<keyof VideoFilters, (value: any) => Predicate>> = {
  creator: (value: string) => (video) => video.creator === value,
  language: (value: string) => (video) => video.language === value,
  targetAudience: (values: string[]) => (video) => values.includes(video.targetAudience),
  minDuration: (value: number) => (video) => video.duration >= value,
  maxDuration: (value: number) => (video) => video.duration <= value,
  startDate: (value: Date) => (video) => video.uploadTime >= value,
  endDate: (value: Date) => (video) => video.uploadTime <= value,
};

/**
 * Applies all relevant filters to an array of videos with maximum efficiency.
 * It first applies a fuzzy search to narrow down the dataset, then applies all
 * other filters in a single iteration.
 * @param {Video[]} videos - The initial array of videos to filter.
 * @param {VideoFilters} queryParams - The filter criteria from the query parameters.
 * @returns {Video[]} The final, filtered array of videos.
 */
export const applyVideoFilters = (
  videos: Video[],
  queryParams: VideoFilters
): Video[] => {
  let potentiallyFilteredVideos = videos;

  // Step 1: Apply fuzzy search first if present, as it's the most expensive
  // and can significantly reduce the dataset for subsequent filters.
  if (queryParams.search) {
    const fuse = new Fuse(videos, {
      keys: ['title', 'description'],
      threshold: 0.4,
    });
    potentiallyFilteredVideos = fuse.search(queryParams.search).map(result => result.item);
  }

  // Step 2: Build a list of active predicates from other query parameters.
  const activePredicates: Predicate[] = [];
  for (const key in queryParams) {
    const paramKey = key as keyof VideoFilters;
    if (paramKey !== 'search' && predicateMap[paramKey] && queryParams[paramKey] !== undefined) {
      const predicateGenerator = predicateMap[paramKey]!;
      activePredicates.push(predicateGenerator(queryParams[paramKey]));
    }
  }

  // If no other filters are active, return the result from the fuzzy search (or the original list).
  if (activePredicates.length === 0) {
    return potentiallyFilteredVideos;
  }

  // Step 3: Filter the data ONCE using a composite predicate.
  return potentiallyFilteredVideos.filter(video =>
    activePredicates.every(predicate => predicate(video))
  );
};
