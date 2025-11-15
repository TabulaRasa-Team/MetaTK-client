import { OperatingHours } from '../types/api';

type DayKey = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

// "6:00:00" -> "6:00" 형식으로 변환
const formatTimeWithoutSeconds = (time: string): string => {
  if (!time) return time;

  // HH:MM:SS 형식인 경우 초 제거
  const parts = time.split(':');
  if (parts.length === 3) {
    return `${parts[0]}:${parts[1]}`;
  }

  return time;
};

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
    const startTime = formatTimeWithoutSeconds(hours[0]);
    const endTime = formatTimeWithoutSeconds(hours[1]);
    return `${startTime} - ${endTime}`;
  }

  return hours.map(formatTimeWithoutSeconds).join(' ');
};
