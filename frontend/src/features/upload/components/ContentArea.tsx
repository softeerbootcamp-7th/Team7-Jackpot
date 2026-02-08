import FirstContentAreaHeader from '@/features/upload/components/FirstContentAreaHeader';
import SecondContentArea from '@/features/upload/components/SecondContentArea';
import ThirdContentArea from '@/features/upload/components/ThirdContentArea';
import UploadFileArea from '@/features/upload/components/UploadFileArea';
import UploadTextArea from '@/features/upload/components/UploadTextArea';
import type { FirstContentAreaHeaderProps } from '@/features/upload/types/upload';

const ContentArea = ({
  uploadTab,
  setUploadTab,
  step,
  nextStep,
}: FirstContentAreaHeaderProps) => {
  return (
    <div className='flex flex-col gap-4 rounded-2xl border border-gray-100 p-6'>
      {step === '1' && (
        <>
          <FirstContentAreaHeader
            uploadTab={uploadTab}
            setUploadTab={setUploadTab}
            nextStep={nextStep}
          />
          {uploadTab === 'file' ? <UploadFileArea /> : <UploadTextArea />}
        </>
      )}
      {step === '2' && (
        <>
          <SecondContentArea />
        </>
      )}
      {step === '3' && (
        <>
          <ThirdContentArea />
        </>
      )}
    </div>
  );
};
export default ContentArea;
