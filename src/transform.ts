import path from 'path';
import fs from 'fs';
import sharp from 'sharp';

const transform = async (
  filename: string,
  width: string | number = 200,
  height: string | number = 200
) => {
  const image: { path: string } = { path: '' };
  const fullPath = path.resolve(__dirname, `./images/full/${filename}.jpg`);
  const thumbPath = path.resolve(__dirname, `./images/thumb/${filename}.jpg`);
  const thumbDir = path.resolve(__dirname, './images/thumb');

  if (!filename) {
    throw new Error('File name is missing');
  }

  if (fs.existsSync(thumbPath)) {
    const imageSize = await (async () => {
      let width: number | undefined = 0;
      let height: number | undefined = 0;
      await sharp(thumbPath)
        .metadata()
        .then((data) => {
          width = data.width;
          height = data.height;
        })
        .catch((error) => {
          throw error;
        });
      return { width, height };
    })();

    if (imageSize.width === +width && imageSize.height === +height) {
      image.path = thumbPath;
      return image;
    }
  }

  if (!fs.existsSync(thumbDir)) {
    const makeDir = async () => {
      await fs.promises.mkdir(thumbDir);
    };
    try {
      await makeDir();
    } catch (error) {
      console.log(error);
      throw error;
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
