import { format, parseISO } from 'date-fns';

export const formatDate = (date, formatStr = 'dd/MM/yyyy', options = {}) => {
  if (!date) return '';
  return format(date, formatStr, options);
};

export const createTZDate = (date, timeZone) => {
  if (!date) return null;
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return parsedDate;
};

export const getLocalTimeZone = () => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}; 