import { format, parseISO } from 'date-fns';

export const formatDateTime = (dateString) => {
  try {
    return format(parseISO(dateString), 'PPp');
  } catch (error) {
    return dateString;
  }
};

export const formatDate = (dateString) => {
  try {
    return format(parseISO(dateString), 'PP');
  } catch (error) {
    return dateString;
  }
};