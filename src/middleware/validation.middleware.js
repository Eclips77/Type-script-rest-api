/**
 * @file Express middleware for validating request bodies and query parameters using Zod schemas.
 * @module middleware/validation.middleware
 */

import { ZodError } from 'zod';
import { ValidationError } from '../utils/errors.util.js';

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
        next(new ValidationError(error.errors));
      } else {
        next(error);
      }
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
        next(new ValidationError(error.errors));
      } else {
        next(error);
      }
    }
  };
}
