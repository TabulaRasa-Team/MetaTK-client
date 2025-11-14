import { useQuery } from '@tanstack/react-query';
import { couponApi } from '../../utils/api';
import { CouponSortType } from '../../types/api';

export const useCoupons = (sort: CouponSortType) => {
  return useQuery({
    queryKey: ['coupons', sort],
    queryFn: () => couponApi.getMyCoupons(sort),
  });
};
