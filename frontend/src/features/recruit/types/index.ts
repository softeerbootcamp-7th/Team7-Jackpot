import type { ApiApplyHalf } from '@/shared/types/coverLetter';

// 1. 날짜별 공고 조회 API 관련 타입
// 개별 자소서 아이템 타입
export interface CoverLetterItem {
  coverLetterId: number;
  companyName: string;
  jobPosition: string;
  applyYear: number;
  applyHalf: ApiApplyHalf;
  deadline: string;
  questionCount: number;
}

// API 응답 전체 타입
export interface CalendarResponse {
  totalCount: number;
  coverLetters: CoverLetterItem[]; // 위에서 정의한 아이템의 배열
  hasNext: boolean;
}

export interface CalendarRequest {
  startDate: string;
  endDate: string;
  size?: number; // 기본값 7
  isShared?: boolean; // 기본값 true
}

// 2. 자기소개서 단건 조회
export interface CoverLetterInfo {
  coverLetterId: number;
  companyName: string;
  applyYear: number;
  applyHalf: ApiApplyHalf;
  jobPosition: string;
  deadline: string; // "YYYY-MM-DD" 형식의 문자열
}

// 공통 에러 메시지 타입
export interface ErrorResponse {
  message: string;
}

// 3. 자기소개서 등록하기

// 질문 아이템 타입
export interface CoverLetterQuestion {
  question: string;
  category: string;
}

// 요청 데이터 타입
export interface CreateCoverLetterRequest {
  companyName: string;
  applyYear: number;
  applyHalf: ApiApplyHalf;
  jobPosition: string;
  deadline: string; // "YYYY-MM-DD"
  questions?: CoverLetterQuestion[];
}

// 응답 데이터 타입
export interface CreateCoverLetterResponse {
  coverletterId: number;
}

// 4. 자기소개서 수정하기
export interface UpdateCoverLetterRequest {
  coverLetterId: number;
  companyName: string;
  applyYear: number;
  applyHalf: ApiApplyHalf;
  jobPosition: string;
  deadline: string; // YYYY-MM-DD
}

// 5. 자기소개서 삭제하기
export interface DeleteCoverLetterRequest {
  coverLetterId: number;
}
