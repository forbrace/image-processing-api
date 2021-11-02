import express from 'express';
import transform from '../../utilities/transform';
import { ApiError } from '../../services/apiError';

const images = express.Router();

images.get('/', (req, res, next) => {
  if (req.baseUrl === req.originalUrl) {
    return res.send(
      `
      Usage example: ${req.protocol}://${req.get(
        'Host'
      )}/api/images?filename=encenadaport&width=200&height=200
      `
    );
  }
  transform(
    req.query.filename as string,
    req.query.width as string,
    req.query.height as string
  )
    .then((image) => {
      res.sendFile(image.path);
    })
    .catch((error) => {
      const body =
        error instanceof ApiError
          ? `${error.name}: ${error.message}`
          : `${error.message}`;
      res.status(error.statusCode || 500).send(body);
      next(error);
    });
});

export default images;
