import { Request, Response } from 'express';
import { ApiError } from '../../services/errors/apiError';

export const response = (req: Request, res: Response) => {
  try {
    res.sendFile(res.locals.data);
  } catch (error) {
    if (error) {
      if (error instanceof ApiError) {
        return res.status(error.statusCode).json({
          error: {
            name: error.name,
            statusCode: error.statusCode,
            message: error.message,
          },
        });
      } else {
        return res.status(500).json({ error });
      }
    }
  }
};
