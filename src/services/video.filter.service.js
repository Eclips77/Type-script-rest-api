/**
 * @file In-memory filtering functions for video data.
 * @module services/video.filter.service
 */

import Fuse from 'fuse.js';

/**
 * Applies all relevant filters to an array of videos.
 * @param {any[]} videos - The array of videos to filter.
 * @param {object} filters - The filter criteria from the query parameters.
 * @returns {any[]} The filtered array of videos.
 */
export function applyVideoFilters(videos, filters) {
  let filteredVideos = videos;

  if (filters.creator) {
    filteredVideos = filteredVideos.filter(v => v.creator === filters.creator);
  }

  if (filters.language) {
    filteredVideos = filteredVideos.filter(v => v.language === filters.language);
  }

  if (filters.productionCompany) {
    filteredVideos = filteredVideos.filter(v => v.productionCompany === filters.productionCompany);
  }

  if (filters.targetAudience) {
    const audiences = Array.isArray(filters.targetAudience) ? filters.targetAudience : [filters.targetAudience];
    filteredVideos = filteredVideos.filter(v => audiences.includes(v.targetAudience));
  }

  if (filters.minDuration) {
    filteredVideos = filteredVideos.filter(v => v.duration >= Number(filters.minDuration));
  }

  if (filters.maxDuration) {
    filteredVideos = filteredVideos.filter(v => v.duration <= Number(filters.maxDuration));
  }

  if (filters.startDate) {
    filteredVideos = filteredVideos.filter(v => new Date(v.uploadTime) >= new Date(filters.startDate));
  }

  if (filters.endDate) {
    filteredVideos = filteredVideos.filter(v => new Date(v.uploadTime) <= new Date(filters.endDate));
  }

  if (filters.search) {
    const fuse = new Fuse(filteredVideos, {
      keys: ['title', 'description'],
      threshold: 0.4,
    });
    filteredVideos = fuse.search(filters.search).map(result => result.item);
  }

  return filteredVideos;
}
