import { apiClient } from '@/shared/api/apiClient';
import type { QnA } from '@/shared/types/qna';

// 하나의 자기소개서의 QnA id 목록 조회
export const getQnAIdList = async ({
  coverLetterId,
}: {
  coverLetterId: number;
}): Promise<number[]> => {
  const params = new URLSearchParams();
  params.append('coverLetterId', String(coverLetterId));

  return apiClient.get({
    endpoint: `/qna/id/all?${params.toString()}`,
  }) as Promise<number[]>;
};

// 단건 QnA 조회
export const getQnA = async (qnaId: number): Promise<QnA> => {
  return apiClient.get({
    endpoint: `/qna/${qnaId}`,
  }) as Promise<QnA>;
};

interface UpdateQnAResponse {
  qnAId: number;
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
  return apiClient.put({
    endpoint: `/qna`,
    body: { qnAId, answer },
  }) as Promise<UpdateQnAResponse>;
};
