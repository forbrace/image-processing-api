import transform from '../utilities/transform';

describe('2. Image transform function should resolve or reject.', () => {
  it('Expect transform to not throw error', () => {
    expect(function () {
      transform('encenadaport', '200', '200');
    }).not.toThrowError();
  });

  it('Expect transform to throw specific error', async () => {
    let error;
    try {
      await transform('', '200', '200');
    } catch (err) {
      error = err;
    }
    const specificError = new Error('File name param is missing');
    expect(error).toEqual(specificError);
  });
});
