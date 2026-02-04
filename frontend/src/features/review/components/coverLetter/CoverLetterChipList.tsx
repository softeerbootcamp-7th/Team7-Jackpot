interface CoverLetterChipListProps {
  company: string;
  job: string;
}

const CoverLetterChipList = ({ company, job }: CoverLetterChipListProps) => {
  return (
    <div className='shrink-0 h-[2.5rem] flex items-center'>
      <div className='flex items-start gap-[0.25rem]'>
        <div
          data-속성-1='comp chip'
          className='px-[0.75rem] py-[0.375rem] bg-blue-50 rounded-xl flex items-center gap-0.25'
        >
          <div className='text-blue-600 text-xs font-medium leading-4'>
            {company}
          </div>
        </div>
        <div
          data-속성-1='job chip'
          className='px-[0.75rem] py-[0.375rem] bg-gray-50 rounded-xl flex items-center gap-0.25'
        >
          <div className='text-gray-600 text-xs font-medium leading-4'>
            {job}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverLetterChipList;
