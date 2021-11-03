const numericPositiveIntegerString = (string: string) => {
  const number = Math.floor(Number(string));
  return number !== Infinity && String(number) === string && number > 0;
};

export { numericPositiveIntegerString };
