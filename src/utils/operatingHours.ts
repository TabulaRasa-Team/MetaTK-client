import { OperatingHours } from '../types/api';

type DayKey = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

export const getTodayOperatingHours = (operatingHours: OperatingHours): string => {
  const today = new Date().getDay();

  const dayMap: Record<number, DayKey> = {
    0: 'sun',
    1: 'mon',
    2: 'tue',
    3: 'wed',
    4: 'thu',
    5: 'fri',
    6: 'sat',
  };

  const dayKey = dayMap[today];
  const hours = operatingHours[dayKey];

  if (!hours || hours.length === 0) {
    return '영업시간 정보 없음';
  }

  if (hours.length === 1 && (hours[0] === '휴무' || hours[0].toLowerCase() === 'closed')) {
    return '휴무';
  }

  if (hours.length === 2) {
    return `${hours[0]} - ${hours[1]}`;
  }

  return hours.join(' ');
};
