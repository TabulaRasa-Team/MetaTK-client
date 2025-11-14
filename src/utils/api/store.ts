import { apiClient } from './client';
import { StoresResponse, StoreDetail, StoreDetailedInfo } from '../../types/api';

export const storeApi = {
  getStores: async (): Promise<StoresResponse> => {
    const response = await apiClient.get<StoresResponse>('/api/user/store');
    return response.data;
  },

  getStoreDetail: async (storeId: string): Promise<StoreDetail> => {
    const response = await apiClient.get<StoreDetail>(`/api/user/store/${storeId}`);
    return response.data;
  },

  getStoreDetailedInfo: async (storeId: string): Promise<StoreDetailedInfo> => {
    const response = await apiClient.get<StoreDetailedInfo>(`/api/user/store/detailed/${storeId}`);
    return response.data;
  },
};
