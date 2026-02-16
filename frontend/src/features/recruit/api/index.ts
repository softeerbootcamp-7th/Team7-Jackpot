import { fetchCalendarDatesMock } from '@/features/recruit/api/mockData';
import type {
  CalendarRequest,
  CalendarResponse,
  CreateCoverLetterRequest,
  CreateCoverLetterResponse,
  UpdateCoverLetterRequest,
} from '@/features/recruit/types';
import { apiClient } from '@/shared/api/apiClient'; // 경로가 맞는지 확인해주세요

const isDev = import.meta.env.DEV;

// 1. 날짜별 공고 조회
export const fetchCalendarDates = async (
  params: CalendarRequest,
  lastIdParam?: number, // useInfiniteQuery에서 넘겨주는 pageParam (커서)
): Promise<CalendarResponse> => {
  if (isDev) {
    return fetchCalendarDatesMock(params, lastIdParam);
  }

  const queryParams = new URLSearchParams({
    startDate: params.startDate,
    endDate: params.endDate,
    size: String(params.size ?? 7), // 값이 없으면 7
    isShared: String(params.isShared ?? true), // 값이 없으면 true
  });

  // lastCoverLetterId가 존재할 때만 파라미터에 추가 (첫 요청엔 없음)
  if (lastIdParam !== undefined) {
    queryParams.append('lastCoverLetterId', String(lastIdParam));
  }

  // apiClient.get은 내부적으로 JSON 파싱된 결과를 반환합니다.
  const response = await apiClient.get({
    endpoint: `/coverletter/all?${queryParams.toString()}`,
  });

  return response as CalendarResponse;
};

// 2. 자기소개서 단건 조회는 shared API로 이미 구현

// 3. 공고 등록
export const createCoverLetter = async (
  payload: CreateCoverLetterRequest,
): Promise<CreateCoverLetterResponse> => {
  const response = await apiClient.post({
    endpoint: '/coverletter',
    body: payload, // apiClient 내부에서 JSON.stringify 처리됨
  });

  return response as CreateCoverLetterResponse;
};

// 4. 공고 수정
export const updateCoverLetter = async (
  payload: UpdateCoverLetterRequest,
): Promise<void> => {
  await apiClient.put({
    endpoint: '/coverletter',
    body: payload, // apiClient 내부에서 JSON.stringify 처리됨
  });
};

// 5. 공고 삭제
export const deleteCoverLetter = async (
  coverLetterId: number,
): Promise<void> => {
  await apiClient.delete({
    endpoint: `/coverletter/${coverLetterId}`,
  });
};
