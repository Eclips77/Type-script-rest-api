/**
 * @file Service layer for video-related business logic using Mongoose.
 * @module services/video.service
 */

import { Video as VideoModel, IVideoDocument } from '../models/video.model';
import { Video } from '../schemas/video.schema';
import { buildMongoQuery } from './video.filter.service';
import { NotFoundError } from '../utils/errors.util';
import { VideoFilters } from '../types/video.types';

/**
 * Retrieves all videos from MongoDB, with optional filtering.
 * @async
 * @param {VideoFilters} filters - The filter criteria to apply.
 * @returns {Promise<IVideoDocument[]>} A promise that resolves to an array of videos.
 */
export const getAll = async (filters: VideoFilters): Promise<IVideoDocument[]> => {
  const query = buildMongoQuery(filters);
  return await VideoModel.find(query);
};

/**
 * Retrieves a single video by its ID from MongoDB.
 * @async
 * @param {string} id - The ID of the video to retrieve.
 * @returns {Promise<IVideoDocument>} A promise that resolves to the found video.
 * @throws {NotFoundError} If no video with the specified ID is found.
 */
export const getById = async (id: string): Promise<IVideoDocument> => {
  const video = await VideoModel.findById(id);
  if (!video) {
    throw new NotFoundError('Video not found');
  }
  return video;
};

/**
 * Creates a new video in MongoDB.
 * @async
 * @param {Omit<Video, 'id'>} videoData - The data for the new video.
 * @returns {Promise<IVideoDocument>} A promise that resolves to the newly created video.
 */
export const create = async (videoData: Omit<Video, 'id'>): Promise<IVideoDocument> => {
  const newVideo = new VideoModel(videoData);
  await newVideo.save();
  return newVideo;
};

/**
 * Updates an existing video by its ID in MongoDB.
 * @async
 * @param {string} id - The ID of the video to update.
 * @param {Partial<Video>} videoData - An object containing the fields to update.
 * @returns {Promise<IVideoDocument>} A promise that resolves to the updated video.
 * @throws {NotFoundError} If no video with the specified ID is found.
 */
export const update = async (id: string, videoData: Partial<Video>): Promise<IVideoDocument> => {
  const updatedVideo = await VideoModel.findByIdAndUpdate(id, videoData, { new: true });
  if (!updatedVideo) {
    throw new NotFoundError('Video not found');
  }
  return updatedVideo;
};

/**
 * Deletes a video by its ID from MongoDB.
 * @async
 * @param {string} id - The ID of the video to delete.
 * @returns {Promise<void>} A promise that resolves when the video has been deleted.
 * @throws {NotFoundError} If no video with the specified ID is found.
 */
export const remove = async (id: string): Promise<void> => {
  const result = await VideoModel.findByIdAndDelete(id);
  if (!result) {
    throw new NotFoundError('Video not found');
  }
};
