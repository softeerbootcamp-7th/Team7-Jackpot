import { useState } from 'react';

import ContentArea from '@/components/upload/ContentArea';
import DocumentBoxIcon from '@/components/upload/icons/DocumentBoxIcon';
import StepItem from '@/components/upload/StepItem';

const UploadPage = () => {
  const [uploadTab, setUploadTab] = useState<'file' | 'text'>('file');

  return (
    <div>
      <div className='w-full h-[5rem]'>헤더</div>
      <div className='px-[13.125rem] mb-12'>
        <div className='mb-12'>
          <div className='mb-12 select-none'>
            <div className='flex w-full items-center gap-[0.625rem]'>
              <DocumentBoxIcon />
              <div className='font-bold text-gray-950 text-[1.75rem]'>
                자료 업로드
              </div>
            </div>
            <div className='font-normal text-gray-600 px-[2.875rem] text-lg'>
              회사별, 문항별로 나만의 자기소개서를 작성하고 관리할 수 있어요
            </div>
          </div>
          <StepItem />
        </div>
        <ContentArea uploadTab={uploadTab} setUploadTab={setUploadTab} />
      </div>
    </div>
  );
};

export default UploadPage;
