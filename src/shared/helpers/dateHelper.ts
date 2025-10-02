import { format } from 'date-fns';

export function formatDateWithTime(date: string | Date) {
  return format(date, 'MM/dd/yyyy - hh:mm a');
}
