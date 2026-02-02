import AddFileItem from '@/components/upload/AddFileItem';
import AILabelingIcon from '@/components/upload/icons/AILabelingIcon';
import CompleteSavedIcon from '@/components/upload/icons/CompleteSavedIcon';
import DocumentBoxIcon from '@/components/upload/icons/DocumentBoxIcon';
import FileUploadIcon from '@/components/upload/icons/FileUploadIcon';
import FirstStepIcon from '@/components/upload/icons/FirstStepIcon';
import TextUploadIcon from '@/components/upload/icons/TextUploadIcon';
import UploadIcon from '@/components/upload/icons/UploadIcon';

const UploadPage = () => {
  return (
    <div>
      <div className='w-full h-[5rem]'>헤더</div>
      <div className='px-[13.125rem]'>
        <div>
          <div className='mb-12'>
            <div className='flex w-full items-center gap-[0.625rem]'>
              <DocumentBoxIcon />
              <div className='font-bold text-gray-950 text-[1.75rem]'>
                자료 업로드
              </div>
            </div>
            <div className='font-normal text-gray-600 px-[2.875remx] text-lg'>
              회사별, 문항별로 나만의 자기소개서를 작성하고 관리할 수 있어요
            </div>
          </div>
          <div className='flex flex-col justify-center items-center gap-7'>
            <div className='relative w-[30.25rem] h-[9.375rem]'>
              <div className='absolute inset-0 z-0'>
                <FirstStepIcon />
              </div>
              <div className='absolute inset-0 z-10 flex select-none'>
                <div className='absolute flex flex-col items-center text-white top-1/2 left-[4.6875rem] -translate-x-1/2 -translate-y-1/2'>
                  <UploadIcon color='white' />
                  <div className='font-bold text-xs mt-1'>step 01</div>
                  <div className='font-bold text-base'>자료 업로드</div>
                </div>
                <div className='absolute flex flex-col items-center top-1/2 left-[242px] -translate-x-1/2 -translate-y-1/2 text-gray-300'>
                  <AILabelingIcon color='var(--color-gray-200)' />
                  <div className='font-bold text-xs mt-1'>step 02</div>
                  <div className='font-bold text-base'>AI 라벨링</div>
                </div>
                <div className='absolute flex flex-col items-center top-1/2 left-[408px] -translate-x-1/2 -translate-y-1/2 text-gray-300'>
                  <CompleteSavedIcon color='var(--color-gray-200)' />
                  <div className='font-bold text-xs mt-1'>step 03</div>
                  <div className='font-bold text-base'>저장 완료</div>
                </div>
              </div>
            </div>
            <div className='flex flex-col text-center gap-1'>
              <div className='font-bold text-xl text-gray-600'>
                질문과 답변으로 구성된 자기소개서 파일 혹은 텍스트를
                입력해주세요!
              </div>
              <div className='font-normal text-base text-gray-400'>
                AI 라벨링을 거쳐 라이브러리에 저장되며, 언제든 다시 꺼내볼 수
                있어요.
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-4 p-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <button className='flex items-center gap-[0.375rem] px-[1.125rem] py-3 bg-purple-50 rounded-lg cursor-pointer'>
                <FileUploadIcon />
                <div className='text-purple-600 font-bold'>파일 업로드하기</div>
              </button>
              <button className='flex items-center gap-[0.375rem] px-[1.125rem] py-3 rounded-lg cursor-pointer'>
                <TextUploadIcon />
                <div className='text-gray-600 font-normal'>텍스트 붙여넣기</div>
              </button>
            </div>
            <div className='flex items-center gap-6'>
              <div className='flex items-center text-gray-400 gap-1 select-none'>
                <div>0</div>
                <div>/</div>
                <div>10MB</div>
              </div>
              <button className='bg-gray-50 px-[1.125rem] py-3 gap-[0.375rem] rounded-lg cursor-pointer'>
                <div className='text-lg text-gray-400'>AI 라벨링 시작</div>
              </button>
            </div>
          </div>
          <div className='flex justify-between'>
            {[0, 1, 2].map((i) => (
              <AddFileItem key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
