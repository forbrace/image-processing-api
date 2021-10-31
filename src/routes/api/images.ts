import express from 'express';
import transform from '../../utilities/transform';

const images = express.Router();

images.get('/', (req, res, next) => {
  if (req.baseUrl === req.originalUrl) {
    return res.send(
      `Usage example: ${req.protocol}://${req.get(
        'Host'
      )}/api/images?filename={encenadaport|fjord|icelandwaterfall|palmtunnel|santamonica}&width=200&height=200`
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
      res.send(`Error: ${error.message}`);
      next(error);
    });
});

export default images;
