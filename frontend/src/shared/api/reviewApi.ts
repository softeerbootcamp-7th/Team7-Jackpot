const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// TODO: 추후에 inmemory로 옮기면서 코드 수정 예정
function getToken(): string {
  return localStorage.getItem('accessToken') || '';
}

export interface ApiReview {
  id: number;
  sender: { id: string; nickname: string };
  originText: string;
  suggest: string | null;
  comment: string;
  createdAt: string;
}

interface GetReviewsResponse {
  reviews: ApiReview[];
}

// 아직 백엔드 API 개발 전입니다.
export const getReviewsByQnaId = async (
  qnaId: number,
): Promise<GetReviewsResponse> => {
  const response = await fetch(`${BASE_URL}/qna/${qnaId}/reviews/all`, {
    headers: {
      Authorization: `${getToken()}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch reviews');
  }

  return response.json();
};
