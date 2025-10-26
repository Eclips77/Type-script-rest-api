import { Request, Response, NextFunction } from 'express';
import { AppError, ValidationError } from '../utils/errors.util';

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

  console.error(err);
  res.status(500).json({ message: 'Internal Server Error' });
};
