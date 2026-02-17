import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  createReview,
  type CreateReviewRequest,
  updateReview,
  type UpdateReviewRequest,
} from '@/features/review/api/reviewApi';

export const useCreateReview = (qnaId: number | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: CreateReviewRequest) => createReview(qnaId!, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', { qnaId }] });
    },
  });
};

export const useUpdateReview = (qnaId: number | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      reviewId,
      body,
    }: {
      reviewId: number;
      body: UpdateReviewRequest;
    }) => updateReview(qnaId!, reviewId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', { qnaId }] });
    },
  });
};
