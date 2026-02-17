import { useMutation, useQueryClient } from '@tanstack/react-query';

import { approveReview } from '@/features/coverLetter/api/reviewApi';

export const useApproveReview = (qnaId: number | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reviewId: number) => approveReview(qnaId!, reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', { qnaId }] });
    },
  });
};
