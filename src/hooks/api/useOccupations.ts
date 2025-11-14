import { useQuery } from '@tanstack/react-query';
import { occupationApi } from '../../utils/api';

export const useOccupations = () => {
  return useQuery({
    queryKey: ['occupations'],
    queryFn: occupationApi.getOccupations,
  });
};
