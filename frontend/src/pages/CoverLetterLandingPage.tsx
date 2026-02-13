import { Suspense, useState } from 'react';

import CoverLetterOverviewSection from '@/features/coverLetter/components/CoverLetterOverviewSection';
import NewCoverLetterButton from '@/features/coverLetter/components/NewCoverLetterButton';
import CoverLetterOverviewSkeleton from '@/features/home/components/CoverLetterOverviewSkeleton';
import ErrorBoundary from '@/shared/components/ErrorBoundary';
import SearchInput from '@/shared/components/SearchInput';
import SectionError from '@/shared/components/SectionError';
import { useToastMessageContext } from '@/shared/hooks/toastMessage/useToastMessageContext';
import { validateSearchKeyword } from '@/shared/utils/validation';

const CoverLetterLandingPage = () => {
  const [searchWord, setSearchWord] = useState('');
  const [page, setPage] = useState(0);
  const { showToast } = useToastMessageContext();

  const handleSearch = (word: string) => {
    const { isValid, message } = validateSearchKeyword(word);
    if (!isValid && message) {
      showToast(message);
      return;
    }
    setSearchWord(word);
    setPage(0);
  };

  return (
    <>
      <div className='flex flex-row items-center justify-between pb-[30px]'>
        <SearchInput
          onSearch={handleSearch}
          placeholder='문항 유형을 입력해주세요'
        />
        <NewCoverLetterButton />
      </div>
      <div className='flex flex-1 items-center'>
        <ErrorBoundary
          key={searchWord}
          fallback={(reset) => (
            <SectionError
              onRetry={reset}
              text='작성중인 자기소개서 목록을 표시할 수 없습니다'
            />
          )}
        >
          <Suspense fallback={<CoverLetterOverviewSkeleton len={9} />}>
            <div className='flex h-full flex-1'>
              <CoverLetterOverviewSection
                searchWord={searchWord}
                page={page}
                onPageChange={setPage}
              />
            </div>
          </Suspense>
        </ErrorBoundary>
      </div>
    </>
  );
};

export default CoverLetterLandingPage;
