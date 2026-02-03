import FirstContentAreaHeader from '@/components/upload/FirstContentAreaHeader';
import UploadFileArea from '@/components/upload/UploadFileArea';
import UploadTextArea from '@/components/upload/UploadTextArea';

import type { FirstContentAreaHeaderProps } from '@/types/upload';

import SecondContentAreaHeader from './SecondContentAreaHeader';

const ContentArea = ({
  uploadTab,
  setUploadTab,
  step,
  nextStep,
}: FirstContentAreaHeaderProps) => {
  return (
    <div className='flex flex-col gap-4 p-6 border border-gray-100 rounded-2xl'>
      <ContentAreaHeader uploadTab={uploadTab} setUploadTab={setUploadTab} />
      {uploadTab === 'file' ? <UploadFileArea /> : <UploadTextArea />}
    </div>
  );
};
export default ContentArea;
