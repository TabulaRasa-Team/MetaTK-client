import { apiClient } from './client';
import { CouponsResponse, CouponSortType, CouponDetail } from '../../types/api';

export const couponApi = {
  getMyCoupons: async (sort: CouponSortType): Promise<CouponsResponse> => {
    const response = await apiClient.get<CouponsResponse>('/api/user/my/coupon', {
      params: { sort },
    });
    return response.data;
  },

  getCouponDetail: async (couponId: string): Promise<CouponDetail> => {
    const response = await apiClient.get<CouponDetail>(`/api/user/my/coupon/${couponId}`);
    return response.data;
  },

  useCoupon: async (couponId: string): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await apiClient.patch(`/api/user/my/coupon`, {
        coupon_id: couponId,
      });
      console.log('쿠폰 사용 API 응답:', response.data);
      return { success: true };
    } catch (error: any) {
      console.error('쿠폰 사용 API 에러:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      throw error;
    }
  },
};
