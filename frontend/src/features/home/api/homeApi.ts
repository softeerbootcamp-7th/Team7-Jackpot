import type {
  CalendarDatesResponse,
  HomeCountResponse,
  UpcomingDeadlinesResponse,
} from '@/features/home/types/home';
import { apiClient } from '@/shared/api/apiClient';

export const fetchHomeCount = async (
  date: string,
): Promise<HomeCountResponse> => {
  const params = new URLSearchParams({ date });

  return apiClient.get({
    endpoint: `/coverletter/count?${params.toString()}`,
  }) as Promise<HomeCountResponse>;
};

interface FetchUpcomingDeadlinesParams {
  date: string;
  maxDeadLineSize?: number;
  maxCoverLetterSizePerDeadLine?: number;
}

export const fetchUpcomingDeadlines = async ({
  date,
  maxDeadLineSize = 3,
  maxCoverLetterSizePerDeadLine = 2,
}: FetchUpcomingDeadlinesParams): Promise<UpcomingDeadlinesResponse> => {
  const params = new URLSearchParams({
    date,
    maxDeadLineSize: maxDeadLineSize.toString(),
    maxCoverLetterSizePerDeadLine: maxCoverLetterSizePerDeadLine.toString(),
  });

  return apiClient.get({
    endpoint: `/coverletter/upcoming?${params.toString()}`,
  }) as Promise<UpcomingDeadlinesResponse>;
};

interface FetchCalendarDatesParams {
  startDate: string;
  endDate: string;
}

export const fetchCalendarDates = async ({
  startDate,
  endDate,
}: FetchCalendarDatesParams): Promise<CalendarDatesResponse> => {
  const params = new URLSearchParams({
    startDate,
    endDate,
  });

  return apiClient.get({
    endpoint: `/coverletter/calendar?${params.toString()}`,
  }) as Promise<CalendarDatesResponse>;
};
