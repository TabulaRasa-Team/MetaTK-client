import { useQuery } from '@tanstack/react-query';
import { storeApi } from '../../utils/api';

export const useStores = () => {
  return useQuery({
    queryKey: ['stores'],
    queryFn: storeApi.getStores,
  });
};
