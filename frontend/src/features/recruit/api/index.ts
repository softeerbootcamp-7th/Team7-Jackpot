import { httpClient } from '@/features/library/api/client';
import type {
  CalendarRequest,
  CalendarResponse,
  CreateCoverLetterRequest,
  CreateCoverLetterResponse,
  UpdateCoverLetterRequest,
} from '@/features/recruit/types';

// 1. 날짜별 공고 조회
export const fetchCalendarDates = (
  params: CalendarRequest,
  lastIdParam?: number, // useInfiniteQuery에서 넘겨주는 pageParam (커서)
) => {
  const queryParams = new URLSearchParams({
    startDate: params.startDate,
    endDate: params.endDate,
    size: String(params.size ?? 7), // 값이 없으면 7
    isShared: String(params.isShared ?? true), // 값이 없으면 true
  });

  // lastCoverLetterId가 존재할 때만 파라미터에 추가 (첫 요청엔 없음)
  if (lastIdParam !== undefined && lastIdParam !== null) {
    queryParams.append('lastCoverLetterId', String(lastIdParam));
  }

  return httpClient<CalendarResponse>(
    `/coverletter/all?${queryParams.toString()}`,
    {
      method: 'GET',
    },
  );
};

// 2. 자기소개서 단건 조회는 shared API로 이미 구현

// 3. 공고 등록
export const createCoverLetter = (payload: CreateCoverLetterRequest) => {
  return httpClient<CreateCoverLetterResponse>('/coverletter', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
};

// 4. 공고 수정
export const updateCoverLetter = (payload: UpdateCoverLetterRequest) => {
  return httpClient<void>('/coverletter', {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
};

// 5. 공고 삭제
export const deleteCoverLetter = (coverLetterId: number) => {
  return httpClient<void>(`/coverletter/${coverLetterId}`, {
    method: 'DELETE',
  });
};
