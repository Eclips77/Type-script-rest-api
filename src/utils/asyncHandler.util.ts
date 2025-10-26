/**
 * @file Utility for handling asynchronous Express route handlers.
 * @module utils/asyncHandler.util
 */

import { Request, Response, NextFunction } from 'express';

/**
 * Defines the shape of an asynchronous Express route handler function.
 * @typedef {function(Request, Response, NextFunction): Promise<any>} AsyncFunction
 */
type AsyncFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

/**
 * Wraps an asynchronous route handler to catch any errors and pass them to the Express error handling middleware.
 * This avoids the need for try-catch blocks in every controller.
 * @function asyncHandler
 * @param {AsyncFunction} fn - The asynchronous route handler function to wrap.
 * @returns {function(Request, Response, NextFunction): void} An Express route handler.
 * @example
 * import { asyncHandler } from '../utils/asyncHandler.util';
 *
 * export const getAllVideos = asyncHandler(async (req, res) => {
 *   const videos = await videoService.getAll();
 *   res.status(200).json(videos);
 * });
 */
export const asyncHandler = (fn: AsyncFunction) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
