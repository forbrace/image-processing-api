import fs from 'fs';
import sharp from 'sharp';
import { ApiError } from '../errors/apiError';
import { numericPositiveIntegerString } from '../utilities/is';
import { Image } from './types';

async function createDir(dir: string) {
  await (async () => {
    await fs.promises.mkdir(dir).catch(() => {
      throw new ApiError('INTERNAL_SERVER_ERROR', 500, 'Error creating folder');
    });
  })();
}

function validatePath(fullPath: string) {
  if (!fs.existsSync(fullPath)) {
    throw new ApiError(
      'BAD_REQUEST',
      400,
      `File located by this path ${fullPath} does not exist`
    );
  }
}

function validateParams(image: Image) {
  if (!image.filename) {
    throw new ApiError('BAD_REQUEST', 400, `File name param is missing.`);
  }
  if (!image.width || !numericPositiveIntegerString(image.width as string)) {
    throw new ApiError(
      'BAD_REQUEST',
      400,
      `Expected positive integer for width but received ${image.width}.`
    );
  }
  if (!image.height || !numericPositiveIntegerString(image.height as string)) {
    throw new ApiError(
      'BAD_REQUEST',
      400,
      `Expected positive integer for height but received ${image.height}.`
    );
  }
}

export default class ImageService {
  static async Transform(params: Image) {
    validateParams(params);

    const image: { path: string } = { path: '' };
    const fullPath = `${process.cwd()}/images/full/${params.filename}.jpg`;
    const thumbPath = `${process.cwd()}/images/thumb/${params.filename}-${
      params.width
    }x${params.height}.jpg`;
    const thumbDir = `${process.cwd()}/images/thumb`;

    validatePath(fullPath);

    if (!fs.existsSync(thumbDir)) {
      await createDir(thumbDir);
    }

    await sharp(fullPath)
      .resize(+params.width, +params.height)
      .toFile(thumbPath)
      .then(() => {
        image.path = thumbPath;
      })
      .catch(() => {
        throw new ApiError('INTERNAL_SERVER_ERROR', 500, 'Sharp resize error');
      });

    return image;
  }
}
