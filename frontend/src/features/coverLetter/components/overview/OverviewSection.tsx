import { emptyCaseText } from '@/features/coverLetter/constants';
import { useCoverLetterSearch } from '@/features/coverLetter/hooks/useCoverLetterQueries';
import CoverLetterOverview from '@/shared/components/CoverLetterOverview';
import EmptyCase from '@/shared/components/EmptyCase';

interface OverviewSectionProps {
  searchWord: string; // URL에서 동기화된 검색어
  isFilterActive?: boolean; // 필요에 따라 사용
  page: number; // URL에서 동기화된 페이지 (무조건 1부터 시작!)
  onPageChange: (page: number) => void;
}

const OverviewSection = ({
  searchWord,
  isFilterActive,
  page,
  onPageChange,
}: OverviewSectionProps) => {
  // 1-based 페이지 값
  const { data } = useCoverLetterSearch(
    isFilterActive ? '' : searchWord,
    9,
    page,
  );

  const overviewEmptyText = emptyCaseText['overview'];

  // 검색 결과가 없을 때의 예외 처리
  if (!data || data.coverLetters.length === 0) {
    return <EmptyCase {...overviewEmptyText} />;
  }

  // 데이터가 있을 때 렌더링
  return (
    <div className='h-full w-full'>
      <CoverLetterOverview
        coverLetters={data.coverLetters}
        isCoverLetter={true}
        // UI 컴포넌트(Pagination)는 0-based 페이지 번호
        currentPage={page - 1}
        totalPage={data.page.totalPage}
        // URL 상태를 업데이트하는 함수(onPageChange)에는 1-based 페이지 번호
        onPageChange={(zeroBasedPage) => onPageChange(zeroBasedPage + 1)}
      />
    </div>
  );
};

export default OverviewSection;
