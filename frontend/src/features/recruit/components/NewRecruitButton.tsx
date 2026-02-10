import { PlusIcon } from '@/shared/icons/Plus';

const NewRecruitButton = () => {
  return (
    <div className='inline-flex cursor-pointer items-center justify-start gap-6'>
      <div className='flex items-center justify-center gap-1.5 rounded-lg bg-gray-900 py-3 pr-5 pl-4'>
        <div className='h-6 w-6'>
          <PlusIcon className='text-white' />
        </div>
        <div className='text-title-s justify-start text-center font-bold text-white'>
          새 공고 등록하기
        </div>
      </div>
    </div>
  );
};

export default NewRecruitButton;
