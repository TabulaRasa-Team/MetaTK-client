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

export interface Store {
  store_id: string;
  store_name: string;
  address: string;
  store_type: 'food' | 'drink' | 'cafe';
  team?: string;
}

export type StoresResponse = Store[];

export interface OperatingHours {
  mon: string[];
  tue: string[];
  wed: string[];
  thu: string[];
  fri: string[];
  sat: string[];
  sun: string[];
}

export interface StoreRatio {
  baekjae_ratio: number;
  shinla_ratio: number;
  goguryeo_ratio: number;
}

export interface StoreDetail {
  store_name: string;
  operating_hours: OperatingHours;
  ratio: StoreRatio;
}

export interface Menu {
  image: string;
  name: string;
  price: number;
}

export interface StoreDetailedInfo {
  store_name: string;
  address: string;
  phone_number: string;
  operating_hours: OperatingHours;
  menus: Menu[];
  images: string[];
  ratio: StoreRatio;
}
