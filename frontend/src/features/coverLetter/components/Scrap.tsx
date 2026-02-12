import { DeleteIcon } from '@/features/coverLetter/icons/Delete';
import type { ScrapItem } from '@/features/coverLetter/types/coverLetter';

interface ScrapProps {
  scrap: ScrapItem;
  deleteScrap: (id: number) => void;
  onClick: () => void;
}

// 길어지면 스크롤 추가 필요
const Scrap = ({ scrap, deleteScrap, onClick }: ScrapProps) => {
  return (
    <div
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onClick();
      }}
      role='button'
      tabIndex={0}
      className='flex cursor-pointer flex-col items-start justify-start gap-3 self-stretch'
    >
      <div className='flex flex-col items-start justify-start self-stretch px-3'>
        <div className='flex w-96 flex-col items-start justify-start gap-3 border-b border-gray-100 px-3 py-5'>
          <div className='inline-flex items-center justify-between self-stretch pr-1'>
            <div className='flex flex-1 items-center justify-start gap-1'>
              <div className='flex items-center justify-center gap-1 rounded-md bg-blue-50 px-3 py-1.5'>
                <div className='justify-start text-xs leading-4 font-medium text-blue-600'>
                  {scrap.companyName}
                </div>
              </div>
              <div className='flex items-center justify-center gap-1 rounded-md bg-gray-50 px-3 py-1.5'>
                <div className='justify-start text-xs leading-4 font-medium text-gray-600'>
                  {scrap.jobPosition}
                </div>
              </div>
              <div className='flex items-center justify-center gap-1 rounded-md bg-gray-50 px-3 py-1.5'>
                <div className='justify-start text-xs leading-4 font-medium text-gray-600'>
                  {scrap.applySeason}
                </div>
              </div>
            </div>
            <button
              type='button'
              className='inline-flex h-6 w-6 items-center justify-center overflow-hidden'
              onClick={(e) => {
                e.stopPropagation();
                deleteScrap(scrap.questionId);
              }}
            >
              <DeleteIcon />
            </button>
          </div>
          <div className='flex flex-col items-start justify-start gap-1 self-stretch'>
            <div className='inline-flex items-center justify-start gap-1 self-stretch'>
              <div className='line-clamp-2 max-h-12 flex-1 justify-start text-lg leading-6 font-bold text-gray-950'>
                {scrap.question}
              </div>
            </div>
            <div className='text-caption-m line-clamp-2 max-h-10 justify-start self-stretch font-medium text-gray-600'>
              {scrap.answer}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scrap;
