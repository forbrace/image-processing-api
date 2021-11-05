import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../../services/errors/apiError';

const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
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
}


export { errorHandler };
