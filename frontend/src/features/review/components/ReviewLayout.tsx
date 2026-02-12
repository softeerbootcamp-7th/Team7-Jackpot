import { useSuspenseQueries } from '@tanstack/react-query';
import { useParams } from 'react-router';

import CoverLetterSection from '@/features/review/components/coverLetter/CoverLetterSection';
import ReviewListSection from '@/features/review/components/review/ReviewListSection';
import { getCoverLetter } from '@/shared/api/coverLetterApi';
import { getQnAIdList } from '@/shared/api/qnaApi';
import { useQnAList } from '@/shared/hooks/useQnAQueries';
import useReviewState from '@/shared/hooks/useReviewState';

const ReviewLayout = () => {
  const { id } = useParams();
  const coverLetterId = Number(id);

  if (Number.isNaN(coverLetterId)) {
    throw new Error('유효하지 않은 자기소개서 ID입니다.');
  }

  const [{ data: coverLetter }, { data: qnaIds }] = useSuspenseQueries({
    queries: [
      {
        queryKey: ['coverletter', { coverLetterId }],
        queryFn: () => getCoverLetter(coverLetterId),
        staleTime: 5 * 60 * 1000,
      },
      {
        queryKey: ['qna', 'idList', { coverLetterId }],
        queryFn: () => getQnAIdList({ coverLetterId }),
        staleTime: 5 * 60 * 1000,
      },
    ],
  });

  const { data: qnas } = useQnAList(qnaIds);

  const {
    currentPageIndex,
    currentQna,
    currentText,
    currentReviews,
    pages,
    editingReview,
    handleAddReview,
    handleUpdateReview,
    handlePageChange,
    handleEditReview,
    handleCancelEdit,
    handleDeleteReview,
  } = useReviewState(coverLetter, qnas);

  if (!currentQna)
    return (
      <div className='p-8 text-center text-gray-500'>
        등록된 질문이 없습니다.
      </div>
    );

  return (
    <>
      <main className='h-full'>
        <CoverLetterSection
          company={coverLetter.companyName}
          job={coverLetter.jobPosition}
          questionIndex={currentPageIndex + 1}
          question={currentQna.question}
          text={currentText}
          reviews={currentReviews}
          currentPage={currentPageIndex}
          totalPages={pages.length}
          editingReview={editingReview}
          onAddReview={handleAddReview}
          onUpdateReview={handleUpdateReview}
          onCancelEdit={handleCancelEdit}
          onPageChange={handlePageChange}
        />
      </main>
      <aside className='h-full w-[426px] flex-none'>
        <ReviewListSection
          reviews={currentReviews}
          editingReview={editingReview}
          onEditReview={handleEditReview}
          onDeleteReview={handleDeleteReview}
        />
      </aside>
    </>
  );
};

export default ReviewLayout;
