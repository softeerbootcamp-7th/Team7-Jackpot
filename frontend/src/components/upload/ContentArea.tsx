import ContentAreaHeader from '@/components/upload/ContentAreaHeader';
import UploadFileArea from '@/components/upload/UploadFileArea';
import UploadTextArea from '@/components/upload/UploadTextArea';

import type { ContentAreaHeaderProps } from '@/types/upload';

const ContentArea = ({ uploadTab, setUploadTab }: ContentAreaHeaderProps) => {
  return (
    <div className='flex flex-col gap-4 p-6 border border-gray-100 rounded-2xl'>
      <ContentAreaHeader uploadTab={uploadTab} setUploadTab={setUploadTab} />
      {uploadTab === 'file' ? <UploadFileArea /> : <UploadTextArea />}
    </div>
  );
};
export default ContentArea;
