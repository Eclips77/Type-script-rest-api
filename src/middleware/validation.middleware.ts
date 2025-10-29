/**
 * @file Express middleware for validating request bodies and query parameters using Zod schemas.
 * @module middleware/validation.middleware
 */

import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';
import { ValidationError } from '../utils/errors.util';

/**
 * Creates an Express middleware to validate the request body against a Zod schema.
 * @function validate
 * @param {z.ZodObject<any, any>} schema - The Zod schema to validate against.
 * @returns {function(Request, Response, NextFunction): void} An Express middleware function.
 * @throws {ValidationError} If the request body fails validation.
 */
export function validate(schema: z.ZodObject<any, any>) {
  return function(req: Request, res: Response, next: NextFunction) {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        throw new ValidationError(error.errors);
      }
      next(error);
    }
  };
}

/**
 * Creates an Express middleware to validate the request query parameters against a Zod schema.
 * @function validateQuery
 * @param {z.ZodObject<any, any>} schema - The Zod schema to validate against.
 * @returns {function(Request, Response, NextFunction): void} An Express middleware function.
 * @throws {ValidationError} If the query parameters fail validation.
 */
export function validateQuery(schema: z.ZodObject<any, any>) {
  return function(req: Request, res: Response, next: NextFunction) {
    try {
      schema.parse(req.query);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        throw new ValidationError(error.errors);
      }
      next(error);
    }
  };
}
