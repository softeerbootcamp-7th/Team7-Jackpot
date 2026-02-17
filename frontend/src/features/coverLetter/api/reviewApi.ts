import { apiClient } from '@/shared/api/apiClient';

export const approveReview = async (
  qnaId: number,
  reviewId: number,
): Promise<void> => {
  return apiClient.patch<void>({
    endpoint: `/qna/${qnaId}/reviews/${reviewId}/approve`,
  });
};
