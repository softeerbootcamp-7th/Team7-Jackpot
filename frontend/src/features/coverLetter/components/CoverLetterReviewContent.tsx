import { Suspense, useCallback, useEffect, useState } from 'react';

import { useParams } from 'react-router';

import CoverLetterSection from '@/features/coverLetter/components/CoverLetterSection';
import {
  useSharedLink,
  useSharedLinkToggle,
} from '@/features/coverLetter/hooks/useCoverLetterQueries';
import ErrorBoundary from '@/shared/components/ErrorBoundary';
import SectionError from '@/shared/components/SectionError';

const CoverLetterReviewContent = ({
  isReviewActive,
  setIsReviewActive,
}: {
  isReviewActive: boolean;
  setIsReviewActive: (v: boolean) => void;
}) => {
  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null);
  const { coverLetterId } = useParams();
  const id = !coverLetterId ? 0 : Number(coverLetterId);

  const { data: sharedLink } = useSharedLink(id);
  const { mutate: toggleLink } = useSharedLinkToggle();

  useEffect(() => {
    if (sharedLink) setIsReviewActive(sharedLink.active);
  }, [sharedLink, setIsReviewActive]);

  const handleToggleReview = useCallback(
    (value: boolean) => {
      setIsReviewActive(value);
      toggleLink({ coverLetterId: id, active: value });
    },
    [setIsReviewActive, toggleLink, id],
  );

  const handleReviewClick = useCallback((reviewId: string | null) => {
    setSelectedReviewId(reviewId);
  }, []);

  return (
    <ErrorBoundary
      fallback={(reset) => (
        <SectionError onRetry={reset} text='QnA를 표시할 수 없습니다' />
      )}
    >
      <Suspense fallback={<div>로딩 중...</div>}>
        <CoverLetterSection
          id={id}
          isReviewActive={isReviewActive}
          setIsReviewActive={handleToggleReview}
          selectedReviewId={selectedReviewId}
          onReviewClick={handleReviewClick}
        />
      </Suspense>
    </ErrorBoundary>
  );
};

export default CoverLetterReviewContent;
