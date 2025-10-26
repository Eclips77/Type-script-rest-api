/**
 * @file Global error handling middleware for the Express application.
 * @module middleware/errorHandler.middleware
 */

import { Request, Response, NextFunction } from 'express';
import { AppError, ValidationError } from '../utils/errors.util';

/**
 * Express middleware to handle all application errors.
 * It formats the error response based on the error type.
 * For `ValidationError`, it includes detailed error information.
 * For other `AppError` instances, it sends a generic error message.
 * For unknown errors, it logs the error and sends a 500 Internal Server Error response.
 * @function errorHandler
 * @param {Error} err - The error object.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The Express next middleware function.
 */
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    if (err instanceof ValidationError) {
      return res.status(err.statusCode).json({
        message: err.message,
        errors: err.errors,
      });
    }
    return res.status(err.statusCode).json({ message: err.message });
  }

  // Log unexpected errors for debugging purposes.
  console.error(err);
  res.status(500).json({ message: 'Internal Server Error' });
};
