/**
 * @file Utility for handling asynchronous Express route handlers.
 * @module utils/asyncHandler.util
 */

export function asyncHandler(fn) {
  return function(req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
