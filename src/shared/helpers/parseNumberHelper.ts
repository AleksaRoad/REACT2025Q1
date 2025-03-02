export const parseNumberHelper = (value: string) => {
  const parseValue = parseInt(value);
  return isNaN(parseValue) ? 1 : parseValue;
};
