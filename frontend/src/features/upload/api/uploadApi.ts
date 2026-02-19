import type {
  PresignedUrlRequest,
  PresignedUrlResponse,
} from '@/features/upload/types/upload';
import { apiClient } from '@/shared/api/apiClient';

/**
 * 1-2. API 함수
 * presigned URL 요청
 * S3에 파일을 업로드하기 위한 presigned URL을 받음
 */
export const requestPresignedUrl = async (
  request: PresignedUrlRequest,
): Promise<PresignedUrlResponse> => {
  return apiClient.post({
    endpoint: '/upload/presignedurl',
    body: {
      clientFileId: request.clientFileId.toString(),
      fileName: request.fileName,
      contentType: request.contentType,
      fileSize: request.fileSize,
    },
  });
};

/**
 * S3에 파일 직접 업로드
 * presigned URL과 필요한 헤더를 이용해 S3에 파일을 업로드
 */
export const uploadFileToS3 = async (
  presignedUrl: string,
  file: File,
  requiredHeaders: Record<string, string>,
): Promise<void> => {
  const headers = new Headers(requiredHeaders);

  const response = await fetch(presignedUrl, {
    method: 'PUT',
    body: file,
    headers,
  });

  if (!response.ok) {
    throw new Error(
      `S3 upload failed: ${response.status} ${response.statusText}`,
    );
  }
};
