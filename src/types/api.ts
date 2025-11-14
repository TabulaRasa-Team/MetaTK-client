export interface OccupationRatio {
  baekjae_ratio: number;
  shinla_ratio: number;
  goguryeo_ratio: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export type CouponSortType = 'recent' | 'old' | 'expiration';

export interface Coupon {
  coupon_id: string;
  coupon_name: string;
  store_name: string;
  expiration: string;
  store_type: string;
}

export interface CouponsResponse {
  coupons: Coupon[];
}
