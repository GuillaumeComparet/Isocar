import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

export default function extractDate(date: Date) {

  const timeZone = 'Europe/Paris';
  const zonedDate = toZonedTime(date, timeZone);
  const selectedDateString = format(zonedDate, 'yyyy-MM-dd');

  return selectedDateString;
}

