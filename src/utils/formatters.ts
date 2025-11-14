/**
 * 전화번호 포맷팅 (010-1234-5678)
 */
export const formatPhoneNumber = (value: string): string => {
  // 숫자만 추출
  const numbers = value.replace(/[^\d]/g, '');

  // 길이에 따라 포맷팅
  if (numbers.length <= 3) {
    return numbers;
  } else if (numbers.length <= 7) {
    return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
  } else if (numbers.length <= 11) {
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7)}`;
  }

  // 11자리 초과 시 자르기
  return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
};

/**
 * 시간 포맷팅 (09:00 형식)
 */
export const formatTime = (value: string): string => {
  // 숫자만 추출
  const numbers = value.replace(/[^\d]/g, '');

  if (numbers.length === 0) {
    return '';
  } else if (numbers.length <= 2) {
    return numbers;
  } else if (numbers.length <= 4) {
    return `${numbers.slice(0, 2)}:${numbers.slice(2)}`;
  }

  // 4자리 초과 시 자르기
  return `${numbers.slice(0, 2)}:${numbers.slice(2, 4)}`;
};

/**
 * 시간 범위 포맷팅 (09:00 ~ 18:00 형식)
 */
export const formatTimeRange = (start: string, end: string): string => {
  if (!start && !end) return '';
  if (!end) return start;
  return `${start} ~ ${end}`;
};

/**
 * 전화번호 유효성 검사
 */
export const isValidPhoneNumber = (value: string): boolean => {
  const numbers = value.replace(/[^\d]/g, '');
  return numbers.length === 10 || numbers.length === 11;
};

/**
 * 시간 유효성 검사 (00:00 ~ 23:59)
 */
export const isValidTime = (value: string): boolean => {
  const timeRegex = /^([0-1]\d|2[0-3]):([0-5]\d)$/;
  return timeRegex.test(value);
};
