import { isValidPhoneNumber, isValidTime } from './formatters';

type WeeklyHours = {
  [key: string]: { start: string; end: string };
};

const DAYS = ['월', '화', '수', '목', '금', '토', '일'];

/**
 * 가게 정보 폼 검증
 */
export const validateStoreInfo = (
  address: string,
  phone: string,
  weeklyHours: WeeklyHours
): string | null => {
  // 주소 검증
  if (!address.trim()) {
    return '주소를 입력해주세요.';
  }

  // 전화번호 검증
  if (!phone.trim()) {
    return '전화번호를 입력해주세요.';
  }
  if (!isValidPhoneNumber(phone)) {
    return '올바른 전화번호 형식이 아닙니다.\n(예: 010-1234-5678)';
  }

  // 영업시간 검증 - 모든 요일 입력 필수
  for (const day of DAYS) {
    const { start, end } = weeklyHours[day];

    // 시작 시간이나 종료 시간이 비어있는 경우
    if (!start || !end) {
      return `${day}요일의 영업시간을 입력해주세요.`;
    }

    // 시간 형식 검증
    if (!isValidTime(start)) {
      return `${day}요일의 시작 시간이 올바르지 않습니다.\n(00:00 ~ 23:59)`;
    }
    if (!isValidTime(end)) {
      return `${day}요일의 종료 시간이 올바르지 않습니다.\n(00:00 ~ 23:59)`;
    }

    // 시작 시간이 종료 시간보다 늦은지 검증
    const startMinutes = parseInt(start.split(':')[0]) * 60 + parseInt(start.split(':')[1]);
    const endMinutes = parseInt(end.split(':')[0]) * 60 + parseInt(end.split(':')[1]);

    if (startMinutes >= endMinutes) {
      return `${day}요일의 시작 시간이 종료 시간보다 빠르거나 같습니다.`;
    }
  }

  return null;
};

/**
 * 사업자등록증 정보 검증
 */
export const validateBusinessInfo = (
  openingDate: string,
  businessNumber: string,
  ceoName: string
): string | null => {
  if (!openingDate.trim()) {
    return '개업 날짜를 입력해주세요.';
  }

  if (!businessNumber.trim()) {
    return '사업자등록번호를 입력해주세요.';
  }

  if (!ceoName.trim()) {
    return '대표자명을 입력해주세요.';
  }

  return null;
};
