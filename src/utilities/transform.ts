import fs from 'fs';
import sharp from 'sharp';
import imageSize from 'image-size';
import { ApiError } from '../services/apiError';

const transform = async (
  filename: string,
  width: string,
  height: string
): Promise<{ path: string }> => {
  if (!filename) {
    throw new ApiError('BAD_REQUEST', 400, 'File name param is missing');
  }

  const image: { path: string } = { path: '' };
  const fullPath = `${process.cwd()}/images/full/${filename}.jpg`;
  const thumbPath = `${process.cwd()}/images/thumb/${filename}.jpg`;
  const thumbDir = `${process.cwd()}/images/thumb`;

  if (!fs.existsSync(fullPath)) {
    throw new ApiError(
      'BAD_REQUEST',
      400,
      `File located by this path ${fullPath} does not exist`
    );
  }

  if (!fs.existsSync(thumbDir)) {
    await (async () => {
      await fs.promises.mkdir(thumbDir).catch(() => {
        throw new ApiError(
          'INTERNAL_SERVER_ERROR',
          500,
          'Error creating folder'
        );
      });
    })();
  }

  if (fs.existsSync(thumbPath)) {
    const dimensions = imageSize(thumbPath);

    if (dimensions.width === +width && dimensions.height === +height) {
      image.path = thumbPath;
      return image;
    }
  }

  await sharp(fullPath)
    .resize(
      +width || imageSize(fullPath).width,
      +height || imageSize(fullPath).height
    )
    .toFile(thumbPath)
    .then(() => {
      image.path = thumbPath;
    })
    .catch(() => {
      throw new ApiError('INTERNAL_SERVER_ERROR', 500, 'Sharp resize error');
    });

  return image;
};

export default transform;
