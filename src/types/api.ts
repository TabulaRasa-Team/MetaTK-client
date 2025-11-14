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
