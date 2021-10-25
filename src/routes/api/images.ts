import express from 'express';
import transform from '../../transform';

const images = express.Router();

images.get('/', (req, res) => {
  transform(
    req.query.filename as string,
    req.query.width as string | number,
    req.query.height as string | number
  )
    .then((image) => {
      if (image?.path) {
        res.sendFile(image.path);
      } else {
        res.send(image?.error || 'Something went wrong.');
      }
    })
    .catch((error) => {
      res.send(error.message);
    });
});

export default images;
