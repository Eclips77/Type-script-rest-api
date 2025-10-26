import { v4 as uuidv4 } from 'uuid';
import { Video, VideoSchema } from '../schemas/video.schema';
import { readDatabase, writeDatabase } from '../utils/database.util';
import { applyFilters } from './filter.service';
import { NotFoundError } from '../utils/errors.util';
import { VideoFilters } from '../types/video.types';
import { z } from 'zod';

const VideoArraySchema = z.array(VideoSchema);

const getVideosWithParsedDates = async (): Promise<Video[]> => {
    const videosFromDb = await readDatabase();
    return VideoArraySchema.parse(videosFromDb);
}

export const getAll = async (filters: VideoFilters): Promise<Video[]> => {
  const videos = await getVideosWithParsedDates();
  return applyFilters(videos, filters);
};

export const getById = async (id: string): Promise<Video> => {
  const videos = await getVideosWithParsedDates();
  const video = videos.find((v) => v.id === id);
  if (!video) {
    throw new NotFoundError('Video not found');
  }
  return video;
};

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

export const update = async (
  id: string,
  videoData: Partial<Video>
): Promise<Video> => {
  const videos = await getVideosWithParsedDates();
  const index = videos.findIndex((v) => v.id === id);
  if (index === -1) {
    throw new NotFoundError('Video not found');
  }
  const updatedVideo = { ...videos[index], ...videoData, id, uploadTime: videos[index].uploadTime };
  videos[index] = updatedVideo;
  await writeDatabase(videos);
  return updatedVideo;
};

export const remove = async (id: string): Promise<void> => {
  const videos = await getVideosWithParsedDates();
  const index = videos.findIndex((v) => v.id === id);
  if (index === -1) {
    throw new NotFoundError('Video not found');
  }
  videos.splice(index, 1);
  await writeDatabase(videos);
};
