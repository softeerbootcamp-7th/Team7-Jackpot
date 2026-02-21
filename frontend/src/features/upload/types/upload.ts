import type { ApiApplyHalf } from '@/shared/types/coverLetter';

export interface PaginationButtonIconProps {
  color: string;
}

export interface StepDataType {
  className: string;
  Icon: React.ComponentType<{ color: string }>;
  step: string;
  name: string;
  loadingTitle: string;
  loadingSubTitle: string;
}

// [박소민] TODO: year 유효성 검사
export interface ContentItemType {
  companyName: string;
  jobPosition: string;
  recruitPeriod: {
    year: number;
    season: ApiApplyHalf;
  };
  questionType: string;
}

export interface ContentStateType {
  [key: number]: ContentItemType;
}

export interface TabDataType {
  tabName: string;
  tabNumber: number;
}

export interface UploadTabDataType {
  label: string;
  icon: React.ReactNode;
}

export type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

// 1단계: 타입 정의 & API 함수 구성
// 1-1. 타입 정의

export interface PresignedUrlRequest {
  clientFileId: bigint;
  fileName: string;
  contentType: string;
  fileSize: number;
}

export interface PresignedUrlResponse {
  clientFileId: bigint;
  fileName: string;
  presignedUrl: string;
  fileKey: string;
  requiredHeaders: Record<string, string>;
}

export interface FileState {
  clientFileId: bigint;
  file: File | null;
  status: UploadStatus;
  presignedUrl?: string;
  fileKey?: string;
}

export interface StartLabelingRequest {
  files: Array<{
    presignedUrl: string;
    fileKey: string;
  }>;
}
