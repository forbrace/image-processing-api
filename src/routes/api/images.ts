import express from 'express';
import { index } from '../../middlewares/api';
import { transform } from '../../middlewares/api/transform';
import { response } from '../../middlewares/api/response';
import * as cache from '../../middlewares/api/cache';
import { errorHandler } from '../../middlewares/api/errorHandler';

const images = express.Router();

images.get('/', cache.get, index, transform, cache.set, response);
images.use(errorHandler);

export default images;
