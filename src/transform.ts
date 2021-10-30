import path from 'path';
import fs from 'fs';
import sharp from 'sharp';
import imageSize from 'image-size';

const transform = async (
  filename: string,
  width: string | number = 200,
  height: string | number = 200
) => {
  if (!filename) {
    throw new Error('File name is missing');
  }

  const image: { path: string } = { path: '' };
  const fullPath = path.resolve(__dirname, `./images/full/${filename}.jpg`);
  const thumbPath = path.resolve(__dirname, `./images/thumb/${filename}.jpg`);
  const thumbDir = path.resolve(__dirname, './images/thumb');

  if (!fs.existsSync(thumbDir)) {
    await (async () => {
      await fs.promises.mkdir(thumbDir).catch((error) => {
        throw error;
      });
    })();
  }

  if (fs.existsSync(thumbDir) && fs.existsSync(thumbPath)) {
    const dimensions = await imageSize(thumbPath);

    if (dimensions.width === +width && dimensions.height === +height) {
      image.path = thumbPath;
      return image;
    }
  }

  await sharp(fullPath)
    .resize(+width, +height)
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
