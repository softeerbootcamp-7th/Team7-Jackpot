import { apiClient } from '@/shared/api/apiClient';

export interface ApiReview {
  id: number;
  sender: { id: string; nickname: string };
  originText: string;
  suggest: string | null;
  comment: string;
  createdAt: string;
  isApproved: boolean;
}

interface GetReviewsResponse {
  reviews: ApiReview[];
}

export const getReviewsByQnaId = async (
  qnaId: number,
): Promise<GetReviewsResponse> => {
  return apiClient.get<GetReviewsResponse>({
    endpoint: `/qna/${qnaId}/reviews/all`,
  });
};

export const deleteReview = async (
  qnaId: number,
  reviewId: number,
): Promise<void> => {
  return apiClient.delete<void>({
    endpoint: `/qna/${qnaId}/reviews/${reviewId}`,
  });
};
