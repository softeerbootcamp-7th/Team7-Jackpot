import type { ApiApplyHalf } from '@/shared/types/coverLetter';

// [박소민] TODO: 이거 CoverLetter랑 중복 해결
export interface CoverLetterItem {
  coverLetterId: number;
  companyName: string;
  jobPosition: string;
  applyYear: number;
  applyHalf: ApiApplyHalf;
  deadline: string;

  // [박소민] TODO: 이 부분만 포함 ts으로 하기
  questionCount: number;
}

export interface CalendarResponse {
  totalCount: number;
  coverLetters: CoverLetterItem[];
  hasNext: boolean;
}

export interface CalendarRequest {
  startDate: string;
  endDate: string;
  size?: number;
  isShared?: boolean;
}

export type CoverLetterInfo = Omit<CoverLetterItem, 'questionCount'>;
