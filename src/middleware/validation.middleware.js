/**
 * @file Express middleware for validating request bodies and query parameters using Zod schemas.
 * @module middleware/validation.middleware
 */

import { ZodError } from 'zod';

/**
 * Creates an Express middleware to validate the request body against a Zod schema.
 * @param {import('zod').ZodObject<any, any>} schema
 * @returns {import('express').RequestHandler}
 */
export function validate(schema) {
  return function(req, res, next) {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: 'Validation Error',
          errors: error.errors,
        });
      }
      next(error);
    }
  };
}

/**
 * Creates an Express middleware to validate the request query parameters against a Zod schema.
 * @param {import('zod').ZodObject<any, any>} schema
 * @returns {import('express').RequestHandler}
 */
export function validateQuery(schema) {
  return function(req, res, next) {
    try {
      schema.parse(req.query);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
            message: 'Validation Error',
            errors: error.errors,
        });
      }
      next(error);
    }
  };
}
