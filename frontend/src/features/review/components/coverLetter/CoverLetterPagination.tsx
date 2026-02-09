import Pagination from '@/shared/components/Pagination';

interface CoverLetterPaginationProps {
  current: number;
  total: number;
  onChange: (index: number) => void;
}

const CoverLetterPagination = (props: CoverLetterPaginationProps) => {
  return (
    <div className='flex justify-center'>
      <Pagination {...props} ariaLabel='자기소개서' />
    </div>
  );
};

export default CoverLetterPagination;
