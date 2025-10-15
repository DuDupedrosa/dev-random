import { format } from 'date-fns';

export function formatDateWithTime(date: string | Date) {
  try {
    return format(date, 'MM/dd/yyyy - hh:mm a');
  } catch (error) {
    void error;
    return 'Invalid date';
  }
}
