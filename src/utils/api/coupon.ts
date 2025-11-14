import { apiClient } from './client';
import { CouponsResponse, CouponSortType } from '../../types/api';

export const couponApi = {
  getMyCoupons: async (sort: CouponSortType): Promise<CouponsResponse> => {
    const response = await apiClient.get<CouponsResponse>('/api/user/my/coupon', {
      params: { sort },
    });
    return response.data;
  },
};
