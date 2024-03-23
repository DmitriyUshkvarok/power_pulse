import { format } from 'date-fns';

export const formatDateString = (dateString: string) => {
  const date = new Date(dateString);
  return format(date, 'dd/MM/yyyy');
};

export const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};
