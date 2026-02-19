import { useEffect, useRef, useState } from 'react';

import {
  requestPresignedUrl,
  uploadFileToS3,
} from '@/features/upload/api/uploadApi';
import AddFileItem from '@/features/upload/components/AddFileItem';
import { MAX_BYTES } from '@/features/upload/constants/uploadPage';
import type { FileState } from '@/features/upload/types/upload';

interface UploadFileAreaProps {
  setIsContent: (state: boolean) => void;
}

const UploadFileArea = ({ setIsContent }: UploadFileAreaProps) => {
  // 2단계: UploadFileArea 상태 관리 리팩토링
  // 2-1. State 구조 변경: FileState[] 사용
  const [files, setFiles] = useState<FileState[]>([
    { clientFileId: 1n, file: null, status: 'idle' },
    { clientFileId: 2n, file: null, status: 'idle' },
    { clientFileId: 3n, file: null, status: 'idle' },
  ]);

  // 2-3. 순차 업로드 로직: uploadInProgressRef로 중복 업로드 방지
  const uploadInProgressRef = useRef<Set<number>>(new Set());

  const validateFile = (newFile: File | null) => {
    const ALLOWED_TYPES = [
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/pdf',
      'application/msword',
    ];

    // 파일 크기 검사
    if (newFile && newFile.size > MAX_BYTES) {
      return 'error';
    }

    // 파일 확장자 검사
    if (newFile && !ALLOWED_TYPES.includes(newFile.type)) {
      return 'error';
    }
    return 'success';
  };

  // 2-2. presigned URL 요청 & S3 업로드 (순차적)
  const handlePresignedUrlAndUpload = async (index: number, file: File) => {
    // 이미 업로드 진행 중이면 return
    if (uploadInProgressRef.current.has(index)) return;

    uploadInProgressRef.current.add(index);

    setFiles((prev) => {
      const newFiles = [...prev];
      newFiles[index] = { ...newFiles[index], status: 'uploading' };
      return newFiles;
    });

    try {
      // 1. presigned URL 요청
      const presignedResponse = await requestPresignedUrl({
        clientFileId: BigInt(index + 1),
        fileName: file.name,
        contentType: file.type,
        fileSize: file.size,
      });

      // 2. S3에 파일 업로드
      await uploadFileToS3(
        presignedResponse.presignedUrl,
        file,
        presignedResponse.requiredHeaders,
      );

      // 3. 상태 업데이트 (성공)
      setFiles((prev) => {
        const newFiles = [...prev];
        newFiles[index] = {
          ...newFiles[index],
          status: 'success',
          presignedUrl: presignedResponse.presignedUrl,
          fileKey: presignedResponse.fileKey,
        };
        return newFiles;
      });
    } catch (error) {
      console.error(`File upload failed at index ${index}:`, error);
      // 상태 업데이트 (실패)
      setFiles((prev) => {
        const newFiles = [...prev];
        newFiles[index] = { ...newFiles[index], status: 'error' };
        return newFiles;
      });
    } finally {
      uploadInProgressRef.current.delete(index);
    }
  };

  // 2-2. 파일 변경 핸들러
  const handleFileChange = (index: number, newFile: File | null) => {
    // 파일 삭제 시 초기화
    if (!newFile) {
      setFiles((prev) => {
        const newFiles = [...prev];
        newFiles[index] = {
          clientFileId: BigInt(index + 1),
          file: null,
          status: 'idle',
        };
        return newFiles;
      });
      return;
    }

    // 파일 유효성 검사
    const status = validateFile(newFile);
    if (status === 'error') {
      setFiles((prev) => {
        const newFiles = [...prev];
        newFiles[index] = {
          clientFileId: BigInt(index + 1),
          file: newFile,
          status: 'error',
        };
        return newFiles;
      });
      return;
    }

    // 파일이 유효한 경우 상태 업데이트 후 업로드 시작
    setFiles((prev) => {
      const newFiles = [...prev];
      newFiles[index] = {
        clientFileId: BigInt(index + 1),
        file: newFile,
        status: 'idle',
      };
      return newFiles;
    });

    // 업로드 진행 (순차적)
    handlePresignedUrlAndUpload(index, newFile);
  };

  useEffect(() => {
    const hasContent = files.some(
      (file) => file.file !== null && file.status === 'success',
    );
    setIsContent(hasContent);
  }, [files, setIsContent]);

  return (
    <div className='flex justify-between gap-3'>
      {files.map((fileState, index) => (
        <AddFileItem
          key={index}
          index={index}
          file={fileState.file}
          uploadStatus={fileState.status}
          onFileChange={(newFile) => handleFileChange(index, newFile)}
        />
      ))}
    </div>
  );
};

export default UploadFileArea;
