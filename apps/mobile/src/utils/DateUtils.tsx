import { format, parse, parseISO, isValid } from 'date-fns';

const DATE_FORMAT = 'dd MMM yyyy';

const formatDate = (
  dateStr?: string,
  dateFormat?: string,
  currentFormat?: string
): string | null => {
  if (!dateStr) {
    return null;
  }

  let date;

  if (currentFormat) {
    date = parse(dateStr, currentFormat, new Date());
  } else {
    date = parseISO(dateStr);
  }

  if (!isValid(date)) {
    return null;
  }

  return format(date, dateFormat || DATE_FORMAT);
};

const getCurrentDate = (dateFormat: string): string => {
  return format(new Date(), dateFormat);
};

const isValidDate = (dateStr: string, formatStr?: string): boolean => {
  const parsedDate = formatStr
    ? parse(dateStr, formatStr, new Date())
    : parseISO(dateStr);

  return isValid(parsedDate);
};

const getStartOfDay = (date: Date): Date => {
  return new Date(date.setHours(0, 0, 0, 0));
};

const getEndOfDay = (date: Date): Date => {
  return new Date(date.setHours(23, 59, 59, 999));
};

export default {
  formatDate,
  getCurrentDate,
  isValidDate,
  getStartOfDay,
  getEndOfDay,
};
