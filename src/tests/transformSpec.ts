import transform from '../transform';

describe('2. Image transform function should resolve or reject', () => {
  it('Expect transform to not throw error', () => {
    expect(function () {
      transform('encenadaport', 200, 200);
    }).not.toThrowError();
  });

  it('Expect transform to throw specific error', () => {
    // error at sharp processing: Error: Input file is missing
    transform('', 200, 200);
  });
});
