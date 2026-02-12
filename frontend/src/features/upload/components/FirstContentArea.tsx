import { useState } from 'react';

import { useNavigate, useSearchParams } from 'react-router';

import FirstContentAreaHeader from '@/features/upload/components/FirstContentAreaHeader';
import UploadFileArea from '@/features/upload/components/UploadFileArea';
import UploadTextArea from '@/features/upload/components/UploadTextArea';

const FirstContentArea = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  const coverLetterParam = searchParams.get('coverLetterId');
  const currentTab: 'file' | 'text' = tabParam === 'text' ? 'text' : 'file';
  const currentId: number =
    coverLetterParam && ['1', '2', '3'].includes(coverLetterParam)
      ? Number(coverLetterParam)
      : 1;

  const handleTabChange = (newTab: string) => {
    setSearchParams({ tab: newTab }, { replace: true });
  };

  const hanldeNextStep = () => {
    navigate('/upload/labeling', { replace: true });
  };

  const handleCoverLetterIdChange = (newId: number) => {
    setSearchParams(
      { tab: 'text', coverLetterId: newId.toString() },
      { replace: true },
    );
  };

  const [isContent, setIsContent] = useState<boolean>(false);
  const [totalSize, setTotalSize] = useState<number>(0);
  return (
    <div className='flex flex-col gap-6'>
      <FirstContentAreaHeader
        isContent={isContent}
        totalSize={totalSize}
        setIsContent={setIsContent}
        uploadTab={currentTab}
        setUploadTab={handleTabChange}
        nextStep={hanldeNextStep}
      />
      {currentTab === 'file' ? (
        <UploadFileArea
          setIsContent={setIsContent}
          setTotalSize={setTotalSize}
        />
      ) : (
        <UploadTextArea
          setIsContent={setIsContent}
          currentId={currentId}
          handleIdChange={handleCoverLetterIdChange}
        />
      )}
    </div>
  );
};

export default FirstContentArea;
