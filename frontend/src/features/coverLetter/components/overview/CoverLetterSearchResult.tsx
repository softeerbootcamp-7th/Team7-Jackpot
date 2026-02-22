import CoverLetterOverviewSkeleton from '@/features/home/components/CoverLetterOverviewSkeleton';
import type { CoverLetterSearchResponse } from '@/shared/api/coverLetterApi';
import CoverLetterOverview from '@/shared/components/CoverLetterOverview';

interface CoverLetterSearchResultProps {
  keyword: string;
  data: CoverLetterSearchResponse | null;
  isLoading: boolean;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const CoverLetterSearchResult = ({
  keyword,
  data,
  isLoading,
  currentPage,
  onPageChange,
}: CoverLetterSearchResultProps) => {
  // 로딩 처리
  if (isLoading) {
    return <CoverLetterOverviewSkeleton len={9} />;
  }

  // 초기 상태
  if (!data) {
    return null;
  }

  // [박소민] TODO: 결과가 없을 때 페이지 만들기
  if (data.coverLetters.length === 0) {
    return (
      <div className='flex h-full w-full flex-col items-center justify-center text-gray-500'>
        <p>{keyword}에 대한 검색 결과가 없습니다.</p>
      </div>
    );
  }

  // 결과가 있을 때 (확장된 페이지네이션 적용)
  return (
    <div className='h-full w-full'>
      <CoverLetterOverview
        coverLetters={data.coverLetters}
        isCoverLetter={true}
        currentPage={currentPage}
        totalPage={data.page.totalPage}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default CoverLetterSearchResult;
