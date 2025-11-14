import { apiClient } from './client';
import { StoresResponse, StoreDetail } from '../../types/api';

export const storeApi = {
  getStores: async (): Promise<StoresResponse> => {
    const response = await apiClient.get<StoresResponse>('/api/user/store');
    return response.data;
  },

  getStoreDetail: async (storeId: string): Promise<StoreDetail> => {
    const response = await apiClient.get<StoreDetail>(`/api/user/store/${storeId}`);
    return response.data;
  },
};
