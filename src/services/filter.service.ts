import { Video } from '../schemas/video.schema';
import { VideoFilters } from '../types/video.types';

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
