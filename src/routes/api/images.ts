import express from 'express';
import { index } from '../../middlewares/api';
import { transform } from '../../middlewares/api/transform';

const images = express.Router();

images.get('/', index, transform);

export default images;
