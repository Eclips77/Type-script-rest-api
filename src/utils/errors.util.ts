/**
 * @file Custom error classes for handling application-specific errors.
 * @module utils/errors.util
 */

/**
 * Base class for all application errors.
 * @class AppError
 * @extends {Error}
 */
export class AppError extends Error {
  /**
   * The HTTP status code to be sent in the response.
   * @type {number}
   */
  public readonly statusCode: number;

  /**
   * Creates an instance of AppError.
   * @param {string} message - The error message.
   * @param {number} statusCode - The HTTP status code.
   */
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

/**
 * Represents a 404 Not Found error.
 * @class NotFoundError
 * @extends {AppError}
 */
export class NotFoundError extends AppError {
  /**
   * Creates an instance of NotFoundError.
   * @param {string} [message='Not Found'] - The error message.
   */
  constructor(message = 'Not Found') {
    super(message, 404);
  }
}

/**
 * Represents a 400 Bad Request error due to validation failure.
 * @class ValidationError
 * @extends {AppError}
 */
export class ValidationError extends AppError {
  /**
   * Detailed validation errors, typically from Zod.
   * @type {*}
   */
  public readonly errors: any;

  /**
   * Creates an instance of ValidationError.
   * @param {*} errors - The detailed validation errors.
   * @param {string} [message='Validation Error'] - The error message.
   */
  constructor(errors: any, message = 'Validation Error') {
    super(message, 400);
    this.errors = errors;
  }
}

/**
 * Represents a 409 Conflict error.
 * @class ConflictError
 * @extends {AppError}
 */
export class ConflictError extends AppError {
  /**
   * Creates an instance of ConflictError.
   * @param {string} [message='Conflict'] - The error message.
   */
  constructor(message = 'Conflict') {
    super(message, 409);
  }
}
