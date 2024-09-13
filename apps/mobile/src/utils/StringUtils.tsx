const convertToTitleCase = (str: string, delimeter = '_') => {
  return str
    .toLowerCase()
    .split(delimeter)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
};

export default {
  convertToTitleCase,
};
