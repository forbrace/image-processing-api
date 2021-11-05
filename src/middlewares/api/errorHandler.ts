import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../../services/errors/apiError';

const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  /* eslint-disable */
  next: NextFunction
  /* eslint-enable */
) => {
  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({
      error: {
        name: error.name,
        statusCode: error.statusCode,
        message: error.message,
      },
    });
  }
  return res.status(500).json({ error });
};

export { errorHandler };
