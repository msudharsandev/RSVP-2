import dayjs, { Dayjs, isDayjs } from 'dayjs';

type formatOptions = {
  withTime?: boolean;
  timeOnly?: boolean;
  dateOnly?: boolean;
  time24?: boolean;
  withWeekday?: boolean;
};

const formatType: Record<string, string> = {
  default: 'D MMM', // 29 Oct
  dateOnly: 'D MMM, YYYY', // 29 Oct, 2025
  withTime: 'h:mm A, D MMM, YYYY', // 5:00 PM, 29 Oct, 2025
  timeOnly: 'h:mm A', // 5:00 PM
  time24: 'HH:mm', // 17:00
  withWeekday: 'ddd, D MMM', // Wed, 29 Oct
};

export function formatDate(date: string | Date | Dayjs, options: formatOptions = {}): string {
  if (!date) return '';

  const d = isDayjs(date) ? date : dayjs(date);
  if (!d.isValid()) return '';

  const key =
    (options.timeOnly && 'timeOnly') ||
    (options.time24 && 'time24') ||
    (options.withTime && 'withTime') ||
    (options.dateOnly && 'dateOnly') ||
    (options.withWeekday && 'withWeekday') ||
    'default';

  const pattern = formatType[key] || formatType.default;
  return d.format(pattern);
}
