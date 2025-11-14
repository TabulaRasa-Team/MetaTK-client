import axios from 'axios';
import { apiClient } from './client';
import { StoresResponse, StoreDetail, StoreDetailedInfo, StoreCreateRequest, StoreCreateResponse } from '../../types/api';
import * as FileSystem from 'expo-file-system';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://192.168.219.102:8000';

interface StoreRegisterResponse {
  success: boolean;
  message?: string;
}

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

  create: async (data: StoreCreateRequest): Promise<StoreCreateResponse> => {
    try {
      console.log('가게 생성 API 요청:', data);

      const response = await apiClient.post<StoreCreateResponse>(
        '/api/owner/store',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 30000,
        }
      );

      console.log('가게 생성 API 응답:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('가게 생성 API 에러:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      throw error;
    }
  },

  register: async (storeId: string, description: string): Promise<StoreRegisterResponse> => {
    try {
      const response = await axios.post<StoreRegisterResponse>(
        `${API_URL}/store/register`,
        {
          store_id: storeId,
          description: description,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 10000,
        }
      );

      console.log('가게 등록 API 응답:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('가게 등록 API 에러:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      throw error;
    }
  },
};
