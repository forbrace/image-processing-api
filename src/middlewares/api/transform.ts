import { NextFunction, Request, Response } from 'express';
import ImageService from '../../services/image/imageService';

export const transform = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const image = await ImageService.Transform({
      filename: req.query.filename as string,
      width: req.query.width as string,
      height: req.query.height as string,
    });
    res.locals.data = image.path;
    next(); // => response
  } catch (error) {
    return next(error);
  }
};
