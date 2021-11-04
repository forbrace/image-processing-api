import ImageService from '../services/image/imageService';

describe('2. Image transform function should resolve or reject.', () => {
  it('Expect transform to not throw error', () => {
    expect(function () {
      ImageService.Transform({
        filename: 'encenadaport',
        width: '200',
        height: '200',
      });
    }).not.toThrowError();
  });

  it('Expect transform to throw specific error', async () => {
    let error;
    try {
      await ImageService.Transform({
        filename: '',
        width: '200',
        height: '200',
      });
    } catch (err) {
      error = err;
    }
    const specificError = new Error('File name param is missing.');
    expect(error).toEqual(specificError);
  });

  const size = ['200a', '', 'null', '\n', '0'];
  for (let i = 0; i < size.length; i++) {
    // width
    it(`Expect transform to throw width=${size[i]} error`, async () => {
      await expectAsync(
        ImageService.Transform({
          filename: 'encenadaport',
          width: size[i],
          height: '200',
        })
      ).toBeRejectedWith(
        new Error(
          `Expected positive integer for width but received ${size[i]}.`
        )
      );
    });
    // height
    it(`Expect transform to throw height=${size[i]} error`, async () => {
      await expectAsync(
        ImageService.Transform({
          filename: 'encenadaport',
          width: '200',
          height: size[i],
        })
      ).toBeRejectedWith(
        new Error(
          `Expected positive integer for height but received ${size[i]}.`
        )
      );
    });
  }
});
