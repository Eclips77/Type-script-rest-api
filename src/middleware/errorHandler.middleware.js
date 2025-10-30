/**
 * @file Global error handling middleware for the Express application.
 * @module middleware/errorHandler.middleware
 */

import { AppError, ValidationError } from '../utils/errors.util.js';

/**
 * Express middleware to handle all application errors.
 * @param {Error} err
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export function errorHandler(err, req, res, next) {
  if (err instanceof AppError) {
    if (err instanceof ValidationError) {
      return res.status(err.statusCode).json({
        message: err.message,
        errors: err.errors,
      });
    }
    return res.status(err.statusCode).json({ message: err.message });
  }

  console.error(err);
  res.status(500).json({ message: 'Internal Server Error' });
}
