import {
  addDays,
  format,
  isValid,
  parse,
  parseISO,
  startOfWeek,
} from 'date-fns';

const DATE_FORMAT = 'dd MMM yyyy';

type DayWithDate = {
  date: string;
  dayOfWeek: string;
};

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

const getDayOfWeek = (date: string): string => {
  return format(parseISO(date), 'EEEE');
};

const getWeek = (date: string | Date): DayWithDate[] => {
  const inputDate = typeof date === 'string' ? parseISO(date) : date;

  const monday = startOfWeek(inputDate, { weekStartsOn: 1 });

  const week: DayWithDate[] = [];
  for (let i = 0; i < 7; i++) {
    const currentDate = addDays(monday, i);

    week.push({
      date: currentDate.toISOString(),
      dayOfWeek: format(currentDate, 'EEE'),
    });
  }

  return week;
};

const getSurroundingWeek = (
  date: string | Date,
  days: number
): DayWithDate[] => {
  if (!date) {
    return [];
  }

  const result: DayWithDate[] = [];

  const inputDate = typeof date === 'string' ? parseISO(date) : date;

  // Loop to get 3 days before, the current day, and 3 days after
  for (let i = -days; i <= days; i++) {
    const currentDate = addDays(inputDate, i);

    result.push({
      date: currentDate.toISOString(),
      dayOfWeek: format(currentDate, 'EEE'),
    });
  }

  return result;
};

const isSameDay = (date1: string, date2: string): boolean => {
  return (
    format(parseISO(date1), 'yyyy-MM-dd') ===
    format(parseISO(date2), 'yyyy-MM-dd')
  );
};

export default {
  formatDate,
  getCurrentDate,
  isValidDate,
  getStartOfDay,
  getEndOfDay,
  getDayOfWeek,
  getWeek,
  getSurroundingWeek,
  isSameDay,
};
