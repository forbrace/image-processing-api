import { Request, Response } from 'express';
import ImageService from '../../services/image/imageService';
import { ApiError } from '../../services/errors/apiError';

export const transform = async (req: Request, res: Response) => {
  try {
    const image = await ImageService.Transform({
      filename: req.query.filename as string,
      width: req.query.width as string,
      height: req.query.height as string,
    });
    res.sendFile(image.path);
  } catch (error) {
    if (error instanceof ApiError) {
      res
        .status(error.statusCode)
        .json({
          error: {
            name: error.name,
            statusCode: error.statusCode,
            message: error.message,
          },
        });
    } else {
      res.status(500).json({ error });
    }
  }
};