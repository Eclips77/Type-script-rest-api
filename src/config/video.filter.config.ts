/**
 * @file Dedicated configuration for the video filtering system.
 * This file separates the configuration (the "what") from the execution logic (the "how").
 * @module config/video.filter.config
 */

import {
    filterByExactMatch,
    filterByRange,
    filterByArray,
    filterByFuzzyMatch,
} from '../services/generic.filter.service';
import { VideoFilters } from '../types/video.types';

// Map fields from the Video model to the appropriate generic filter function.
export const filterFunctionMap = {
    creator: filterByExactMatch,
    language: filterByExactMatch,
    targetAudience: filterByArray,
    duration: filterByRange,
    uploadTime: filterByRange,
    search: filterByFuzzyMatch,
};

// Map query parameters to their corresponding field in the Video model.
export const queryParamToFieldMap: Partial<Record<keyof VideoFilters, keyof typeof filterFunctionMap>> = {
    creator: 'creator',
    language: 'language',
    targetAudience: 'targetAudience',
    minDuration: 'duration',
    maxDuration: 'duration',
    startDate: 'uploadTime',
    endDate: 'uploadTime',
    search: 'search',
};
