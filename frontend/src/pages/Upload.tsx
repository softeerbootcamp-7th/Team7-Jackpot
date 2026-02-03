import { useState } from 'react';

import ContentArea from '@/components/upload/ContentArea';
import StepItem from '@/components/upload/StepItem';
import UploadPageHeader from '@/components/upload/UploadPageHeader';

const UploadPage = () => {
  const [uploadTab, setUploadTab] = useState<'file' | 'text'>('file');

  return (
    <div>
      <div className='w-full h-[5rem]'>헤더</div>
      <div className='px-[13.125rem] mb-12'>
        <div className='mb-12'>
          <UploadPageHeader />
          <StepItem />
        </div>
        <ContentArea uploadTab={uploadTab} setUploadTab={setUploadTab} />
      </div>
    </div>
  );
};

export default UploadPage;
