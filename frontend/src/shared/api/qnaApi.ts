import type { QnA } from '@/shared/types/qna';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// TODO: 추후에 inmemory로 옮기면서 코드 수정 예정
function getToken(): string {
  return localStorage.getItem('accessToken') || '';
}

// 하나의 자기소개서의 QnA id 목록 조회
export const getQnAIdList = async ({
  coverLetterId,
}: {
  coverLetterId: number;
}): Promise<number[]> => {
  const params = new URLSearchParams();
  params.append('coverLetterId', String(coverLetterId));

  const response = await fetch(`${BASE_URL}/qna/id/all?${params.toString()}`, {
    headers: {
      Authorization: `${getToken()}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch QnA list');
  }

  return response.json();
};

// 단건 QnA 조회
export const getQnA = async (qnaId: number): Promise<QnA> => {
  const response = await fetch(`${BASE_URL}/qna/${qnaId}`, {
    headers: {
      Authorization: `${getToken()}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch QnA');
  }

  return response.json();
};

interface UpdateQnAResponse {
  qnAId: number; // 백엔드 응답과 일치
  modifiedAt: string;
}

// QnA 수정
export const updateQnA = async ({
  qnAId,
  answer,
}: {
  qnAId: number;
  answer: string;
}): Promise<UpdateQnAResponse> => {
  const response = await fetch(`${BASE_URL}/qna`, {
    method: 'PUT',
    headers: {
      Authorization: `${getToken()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ qnAId: qnAId, answer }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update QnA');
  }

  return response.json();
};
