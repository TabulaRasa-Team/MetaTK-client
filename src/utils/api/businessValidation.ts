import axios from 'axios';

const API_URL = 'http://api.odcloud.kr/api/nts-businessman/v1/validate';
const SERVICE_KEY = process.env.EXPO_PUBLIC_BUSINESS_VALIDATION_API_KEY;

interface BusinessValidationRequest {
  b_no: string; // 사업자등록번호
  start_dt: string; // 개업일자 (YYYYMMDD)
  p_nm: string; // 대표자명
}

interface BusinessValidationResponse {
  request_cnt: number;
  valid_cnt: number;
  status_code: string;
  data: Array<{
    b_no: string;
    valid: string; // "01": 유효, 그 외: 유효하지 않음
    request_param: {
      b_no: string;
      start_dt: string;
      p_nm: string;
      p_nm2: string;
      b_nm: string;
      corp_no: string;
      b_type: string;
      b_sector: string;
      b_adr: string;
    };
    status: {
      b_no: string;
      b_stt: string;
      b_stt_cd: string;
      tax_type: string;
      tax_type_cd: string;
      end_dt: string;
      utcc_yn: string;
      tax_type_change_dt: string;
      invoice_apply_dt: string;
      rbf_tax_type: string;
      rbf_tax_type_cd: string;
    };
  }>;
}

export const businessValidationApi = {
  validate: async (
    businessNumber: string,
    openingDate: string,
    representativeName: string
  ): Promise<{ isValid: boolean; message?: string }> => {
    try {
      const requestData = {
        businesses: [
          {
            b_no: businessNumber.replace(/-/g, ''), // 하이픈 제거
            start_dt: openingDate,
            p_nm: representativeName,
            p_nm2: '',
            b_nm: '',
            corp_no: '',
            b_sector: '',
            b_type: '',
            b_adr: '',
          },
        ],
      };

      console.log('사업자등록증 검증 요청:', requestData);

      const response = await axios.post<BusinessValidationResponse>(
        `${API_URL}?serviceKey=${SERVICE_KEY}`,
        requestData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 10000,
        }
      );

      console.log('사업자등록증 검증 응답:', response.data);

      if (response.data.status_code === 'OK' && response.data.data.length > 0) {
        const result = response.data.data[0];

        if (result.valid === '01') {
          return { isValid: true };
        } else {
          return {
            isValid: false,
            message: '사업자등록증 정보가 일치하지 않습니다.',
          };
        }
      }

      return {
        isValid: false,
        message: '사업자등록증 검증에 실패했습니다.',
      };
    } catch (error: any) {
      console.error('사업자등록증 검증 에러:', error);

      if (error.response?.status === 400) {
        return {
          isValid: false,
          message: '입력 정보가 올바르지 않습니다.',
        };
      }

      return {
        isValid: false,
        message: '사업자등록증 검증 중 오류가 발생했습니다.',
      };
    }
  },
};
