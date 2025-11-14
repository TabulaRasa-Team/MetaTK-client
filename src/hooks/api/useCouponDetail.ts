import { useQuery } from '@tanstack/react-query';
import { couponApi } from '../../utils/api';

export const useCouponDetail = (couponId: string | undefined) => {
  return useQuery({
    queryKey: ['couponDetail', couponId],
    queryFn: () => couponApi.getCouponDetail(couponId!),
    enabled: !!couponId,
  });
};
