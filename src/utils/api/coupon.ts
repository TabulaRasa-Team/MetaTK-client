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
};
