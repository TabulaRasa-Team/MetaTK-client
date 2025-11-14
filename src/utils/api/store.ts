import { apiClient } from './client';
import { StoresResponse } from '../../types/api';

export const storeApi = {
  getStores: async (): Promise<StoresResponse> => {
    const response = await apiClient.get<StoresResponse>('/api/user/store');
    return response.data;
  },
};
