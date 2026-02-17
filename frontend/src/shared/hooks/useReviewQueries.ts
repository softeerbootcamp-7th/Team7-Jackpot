import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { deleteReview, getReviewsByQnaId } from '@/shared/api/reviewApi';

export const useReviewsByQnaId = (qnaId: number | undefined) => {
  return useQuery({
    queryKey: ['reviews', { qnaId }],
    queryFn: () => getReviewsByQnaId(qnaId!),
    enabled: qnaId != null,
    staleTime: 5 * 60 * 1000,
  });
};

export const useDeleteReview = (qnaId: number | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reviewId: number) => deleteReview(qnaId!, reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', { qnaId }] });
    },
  });
};
