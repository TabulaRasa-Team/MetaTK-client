import { apiClient } from './client';
import { OccupationRatio } from '../../types/api';

export const occupationApi = {
  getOccupations: async (): Promise<OccupationRatio> => {
    const response = await apiClient.get<OccupationRatio>('/api/user/occupations');
    return response.data;
  },
};
