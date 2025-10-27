/**
 * @file Service layer for video-related business logic.
 * @module services/video.service
 */

import { v4 as uuidv4 } from 'uuid';
import { Video, VideoSchema } from '../schemas/video.schema';
import { readDatabase, writeDatabase } from '../utils/database.util';
import { applyVideoFilters } from './video.filter.service';
import { NotFoundError } from '../utils/errors.util';
import { VideoFilters } from '../types/video.types';
import { z } from 'zod';

/**
 * Zod schema to validate an array of video objects.
 * @constant {z.ZodArray}
 */
const VideoArraySchema = z.array(VideoSchema);

/**
 * Reads videos from the database and parses them to ensure correct types, especially for dates.
 * @async
 * @private
 * @function getVideosWithParsedDates
 * @returns {Promise<Video[]>} A promise that resolves to an array of validated video objects.
 */
const getVideosWithParsedDates = async (): Promise<Video[]> => {
    const videosFromDb = await readDatabase();
    // This ensures that date strings from JSON are converted to Date objects.
    return VideoArraySchema.parse(videosFromDb);
}

/**
 * Retrieves all videos, with optional filtering.
 * @async
 * @function getAll
 * @param {VideoFilters} filters - The filter criteria to apply.
 * @returns {Promise<Video[]>} A promise that resolves to an array of filtered videos.
 */
export const getAll = async (filters: VideoFilters): Promise<Video[]> => {
  const videos = await getVideosWithParsedDates();
  return applyVideoFilters(videos, filters);
};

/**
 * Retrieves a single video by its ID.
 * @async
 * @function getById
 * @param {string} id - The UUID of the video to retrieve.
 * @returns {Promise<Video>} A promise that resolves to the found video object.
 * @throws {NotFoundError} If no video with the specified ID is found.
 */
export const getById = async (id: string): Promise<Video> => {
  const videos = await getVideosWithParsedDates();
  const video = videos.find((v) => v.id === id);
  if (!video) {
    throw new NotFoundError('Video not found');
  }
  return video;
};

/**
 * Creates a new video and adds it to the database.
 * The `id` and `uploadTime` are auto-generated.
 * @async
 * @function create
 * @param {Omit<Video, 'id' | 'uploadTime'>} videoData - The data for the new video.
 * @returns {Promise<Video>} A promise that resolves to the newly created video object.
 */
export const create = async (videoData: Omit<Video, 'id' | 'uploadTime'>): Promise<Video> => {
  const videos = await getVideosWithParsedDates();
  const newVideo: Video = {
    id: uuidv4(),
    ...videoData,
    uploadTime: new Date(),
  };
  videos.push(newVideo);
  await writeDatabase(videos);
  return newVideo;
};

/**
 * Updates an existing video by its ID.
 * This performs a partial update. The `id` and `uploadTime` cannot be changed.
 * @async
 * @function update
 * @param {string} id - The UUID of the video to update.
 * @param {Partial<Video>} videoData - An object containing the fields to update.
 * @returns {Promise<Video>} A promise that resolves to the updated video object.
 * @throws {NotFoundError} If no video with the specified ID is found.
 */
export const update = async (
  id: string,
  videoData: Partial<Video>
): Promise<Video> => {
  const videos = await getVideosWithParsedDates();
  const index = videos.findIndex((v) => v.id === id);
  if (index === -1) {
    throw new NotFoundError('Video not found');
  }
  // Ensure id and uploadTime are not mutated.
  const updatedVideo = { ...videos[index], ...videoData, id, uploadTime: videos[index].uploadTime };
  videos[index] = updatedVideo;
  await writeDatabase(videos);
  return updatedVideo;
};

/**
 * Deletes a video by its ID.
 * @async
 * @function remove
 * @param {string} id - The UUID of the video to delete.
 * @returns {Promise<void>} A promise that resolves when the video has been deleted.
 * @throws {NotFoundError} If no video with the specified ID is found.
 */
export const remove = async (id: string): Promise<void> => {
  const videos = await getVideosWithParsedDates();
  const index = videos.findIndex((v) => v.id === id);
  if (index === -1) {
    throw new NotFoundError('Video not found');
  }
  videos.splice(index, 1);
  await writeDatabase(videos);
};
