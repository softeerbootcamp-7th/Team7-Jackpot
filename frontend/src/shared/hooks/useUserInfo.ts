import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/shared/api/apiClient';

export const useGetNickname = (enabled: boolean) => {
  return useQuery({
    queryKey: ['userInfo', 'nickname'],
    queryFn: () => apiClient.get({ endpoint: '/user/nickname' }),
    staleTime: Infinity,
    gcTime: Infinity,
    enabled: enabled,
    retry: false,
  });
};
