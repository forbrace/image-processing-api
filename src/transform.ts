import path from 'path';
import fs from 'fs';
import sharp from 'sharp';
import imageSize from 'image-size';

const transform = async (filename: string, width: string, height: string) => {
  if (!filename) {
    throw new Error('File name param is missing');
  }

  const image: { path: string } = { path: '' };
  const fullPath = path.resolve(__dirname, `./images/full/${filename}.jpg`);
  const thumbPath = path.resolve(__dirname, `./images/thumb/${filename}.jpg`);
  const thumbDir = path.resolve(__dirname, './images/thumb');

  if (!fs.existsSync(fullPath)) {
    throw new Error(`File located by this path ${fullPath} does not exist`);
  }

  if (!fs.existsSync(thumbDir)) {
    await (async () => {
      await fs.promises.mkdir(thumbDir).catch((error) => {
        throw error;
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
    .catch((error) => {
      throw error;
    });

  return image;
};

export default transform;
