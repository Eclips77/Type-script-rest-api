import { Video } from '../schemas/video.schema';

export interface VideoFilters {
  creator?: string;
  language?: string;
  targetAudience?: string[];
  minDuration?: number;
  maxDuration?: number;
  startDate?: Date;
  endDate?: Date;
}

export interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface SearchResult {
  data: Video[];
  total: number;
  page: number;
  pageSize: number;
}
