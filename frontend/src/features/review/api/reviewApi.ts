import { apiClient } from '@/shared/api/apiClient';

export interface CreateReviewRequest {
  version: number;
  startIdx: number;
  endIdx: number;
  originText: string;
  suggest: string;
  comment: string;
}

export const createReview = async (
  qnaId: number,
  body: CreateReviewRequest,
): Promise<void> => {
  return apiClient.post<void>({
    endpoint: `/qna/${qnaId}/reviews`,
    body,
  });
};

export interface UpdateReviewRequest {
  suggest: string;
  comment: string;
}

export const updateReview = async (
  qnaId: number,
  reviewId: number,
  body: UpdateReviewRequest,
): Promise<void> => {
  return apiClient.put<void>({
    endpoint: `/qna/${qnaId}/reviews/${reviewId}`,
    body,
  });
};
