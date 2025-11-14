import { useQuery } from '@tanstack/react-query';
import { storeApi } from '../../utils/api';

export const useStoreDetailedInfo = (storeId: string | undefined) => {
  return useQuery({
    queryKey: ['storeDetailedInfo', storeId],
    queryFn: () => storeApi.getStoreDetailedInfo(storeId!),
    enabled: !!storeId,
  });
};
