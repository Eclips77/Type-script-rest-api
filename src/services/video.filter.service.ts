/**
 * @file Builds a MongoDB query object from video filter parameters.
 * @module services/video.filter.service
 */

import { FilterQuery } from 'mongoose';
import { VideoFilters } from '../types/video.types';
import { IVideoDocument } from '../models/video.model';

/**
 * Builds a MongoDB query object based on the provided filter criteria.
 * @param {VideoFilters} filters - The filter criteria from the query parameters.
 * @returns {FilterQuery<IVideoDocument>} A MongoDB query object.
 */
export function buildMongoQuery(filters: VideoFilters): FilterQuery<IVideoDocument> {
  const query: FilterQuery<IVideoDocument> = {};

  if (filters.creator) {
    query.creator = filters.creator;
  }

  if (filters.language) {
    query.language = filters.language;
  }

  if (filters.targetAudience) {
    query.targetAudience = { $in: filters.targetAudience };
  }

  const durationQuery: Record<string, number> = {};
  if (filters.minDuration !== undefined) {
    durationQuery.$gte = filters.minDuration;
  }
  if (filters.maxDuration !== undefined) {
    durationQuery.$lte = filters.maxDuration;
  }
  if (Object.keys(durationQuery).length > 0) {
    query.duration = durationQuery;
  }

  const uploadTimeQuery: Record<string, Date> = {};
  if (filters.startDate !== undefined) {
    uploadTimeQuery.$gte = filters.startDate;
  }
  if (filters.endDate !== undefined) {
    uploadTimeQuery.$lte = filters.endDate;
  }
  if (Object.keys(uploadTimeQuery).length > 0) {
    query.uploadTime = uploadTimeQuery;
  }

  if (filters.search) {
    const searchRegex = new RegExp(filters.search, 'i'); // Case-insensitive regex
    query.$or = [
      { title: searchRegex },
      { description: searchRegex },
    ];
  }

  return query;
}
