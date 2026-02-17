import { useCallback, useRef } from 'react';

import CoverLetterChipList from '@/features/review/components/coverLetter/CoverLetterChipList';
import CoverLetterContent from '@/features/review/components/coverLetter/CoverLetterContent';
import CoverLetterPagination from '@/features/review/components/coverLetter/CoverLetterPagination';
import CoverLetterQuestion from '@/features/review/components/coverLetter/CoverLetterQuestion';
import ReviewModal from '@/features/review/components/reviewModal/ReviewModal';
import { useToastMessageContext } from '@/shared/hooks/toastMessage/useToastMessageContext';
import useOutsideClick from '@/shared/hooks/useOutsideClick';
import {
  useCreateReview,
  useUpdateReview,
} from '@/shared/hooks/useReviewQueries';
import type { Review, ReviewBase } from '@/shared/types/review';
import type { SelectionInfo } from '@/shared/types/selectionInfo';

const SPACER_HEIGHT = 10;

interface CoverLetterSectionProps {
  company: string;
  job: string;
  questionIndex: number;
  question: string;
  text: string;
  reviews: Review[];
  currentPage: number;
  totalPages: number;
  editingReview: Review | null;
  selection: SelectionInfo | null;
  onSelectionChange: (selection: SelectionInfo | null) => void;
  qnaId: number;
  onAddReview: (review: ReviewBase) => void;
  onUpdateReview: (id: number, revision: string, comment: string) => void;
  onCancelEdit: () => void;
  onPageChange: (index: number) => void;
}

const CoverLetterSection = ({
  company,
  job,
  questionIndex,
  question,
  text,
  reviews,
  currentPage,
  totalPages,
  editingReview,
  selection,
  onSelectionChange,
  qnaId,
  onAddReview,
  onUpdateReview,
  onCancelEdit,
  onPageChange,
}: CoverLetterSectionProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { showToast } = useToastMessageContext();

  // TODO: websocket 연결 시 API 호출 후 서버에서 websocket으로 확정 데이터를 전달하므로,
  // onSuccess 콜백에서의 로컬 상태 업데이트(onAddReview, clearLocalReviews 등)를
  // websocket 메시지 핸들러로 이동해야 함
  const { mutate: createReview } = useCreateReview(qnaId);
  const { mutate: updateReviewMutation } = useUpdateReview(qnaId);

  const handleOutsideClick = useCallback(() => {
    onSelectionChange(null);
    if (editingReview) onCancelEdit();
  }, [editingReview, onCancelEdit, onSelectionChange]);

  useOutsideClick(modalRef, handleOutsideClick, !!selection);

  const handleSubmit = (revision: string, comment: string) => {
    if (!selection) return;

    const resetSelection = () => onSelectionChange(null);

    if (editingReview) {
      updateReviewMutation(
        {
          reviewId: editingReview.id,
          body: { suggest: revision, comment },
        },
        {
          onSuccess: () => {
            onUpdateReview(editingReview.id, revision, comment);
          },
          onError: () => {
            showToast('리뷰 업데이트에 실패했습니다. 다시 시도해주세요.');
          },
          onSettled: resetSelection,
        },
      );
    } else {
      createReview(
        {
          version: 0,
          startIdx: selection.range.start,
          endIdx: selection.range.end,
          originText: selection.selectedText,
          suggest: revision,
          comment,
        },
        {
          onSuccess: () => {
            onAddReview({
              selectedText: selection.selectedText,
              revision,
              comment,
              range: selection.range,
            });
          },
          onError: () => {
            showToast('리뷰 생성에 실패했습니다. 다시 시도해주세요.');
          },
          onSettled: resetSelection,
        },
      );
    }
    onSelectionChange(null);
  };

  const handleCancel = () => {
    onSelectionChange(null);
    window.getSelection()?.removeAllRanges();
    if (editingReview) onCancelEdit();
  };

  return (
    <div className='flex h-full flex-1 flex-col gap-[20px] overflow-hidden border-r border-gray-100 px-[2rem] py-[0.875rem]'>
      <CoverLetterChipList company={company} job={job} />
      <div className='flex min-h-0 flex-1 flex-col gap-[14px]'>
        <CoverLetterQuestion index={questionIndex} question={question} />
        <CoverLetterContent
          text={text}
          reviews={reviews}
          editingReview={editingReview}
          selection={selection}
          onSelectionChange={onSelectionChange}
        />
      </div>
      <CoverLetterPagination
        current={currentPage}
        total={totalPages}
        onChange={onPageChange}
      />

      {selection && (
        <div
          ref={modalRef}
          className='fixed z-50'
          role='presentation'
          style={{
            top: selection.modalTop + SPACER_HEIGHT,
            left: selection.modalLeft,
          }}
        >
          <ReviewModal
            selectedText={selection.selectedText}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            initialRevision={editingReview?.revision}
            initialComment={editingReview?.comment}
          />
        </div>
      )}
    </div>
  );
};

export default CoverLetterSection;
