import { useQuery } from '@tanstack/react-query';
import { storeApi } from '../../utils/api';

export const useStoreDetail = (storeId: string | null) => {
  return useQuery({
    queryKey: ['storeDetail', storeId],
    queryFn: () => storeApi.getStoreDetail(storeId!),
    enabled: !!storeId,
  });
};
