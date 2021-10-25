import path from 'path';
import fs from 'fs';
import { Metadata, OutputInfo } from 'sharp';
const sharp = require('sharp');

const transform = async (
  filename: string,
  width: string | number = 200,
  height: string | number = 200
) => {
  const image: {
    path: string;
    error: Error | undefined;
  } = {
    path: '',
    error: undefined,
  };

  const fullDirName = 'full';
  const thumbDirName = 'thumb';
  const thumbDirPath = path.resolve(__dirname, `./images/${thumbDirName}/`);
  const imageResolver = (dir: string): string =>
    path.resolve(__dirname, `./images/${dir}/${filename}.jpg`);
  const fullPath = imageResolver(fullDirName);
  const thumbPath = imageResolver(thumbDirName);

  if (fs.existsSync(thumbPath)) {
    const imageSize = await (async () => {
      let width: number | undefined = 0;
      let height: number | undefined = 0;
      await sharp(thumbPath)
        .metadata()
        .then((data: Metadata) => {
          width = data.width;
          height = data.height;
        });
      return { width, height };
    })();

    if (imageSize.width === +width && imageSize.height === +height) {
      image.path = thumbPath;
      return image;
    }
  }

  if (!fs.existsSync(thumbDirPath)) {
    const makeDir = async () => {
      await fs.promises.mkdir(thumbDirPath);
    };
    await makeDir();
  }

  await sharp(fullPath)
    .resize(+width, +height)
    .toFile(thumbPath)
    .then((info: OutputInfo) => {
      image.path = thumbPath;
    })
    .catch((error: Error) => {
      image.error = error;
    });

  return image;
};

export default transform;
