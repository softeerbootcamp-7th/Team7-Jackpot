import { type RefObject, useCallback } from 'react';

import { getCaretPosition } from '@/features/coverLetter/libs/caret';
import {
  computeDeleteEdit,
  type DeleteDirection,
} from '@/features/coverLetter/libs/deleteUtils';
import type { Review } from '@/shared/types/review';

interface UseCoverLetterDeleteFlowParams {
  contentRef: RefObject<HTMLDivElement | null>;
  isComposingRef: RefObject<boolean>;
  latestTextRef: RefObject<string>;
  caretOffsetRef: RefObject<number>;
  reviewsRef: RefObject<Review[]>;
  reviewRemainingCharsRef: RefObject<Record<number, number>>;
  reviewLastKnownRangesRef: RefObject<
    Record<number, { start: number; end: number }>
  >;
  syncDOMToState: () => void;
  updateText: (
    newText: string,
    options?: {
      skipSocket?: boolean;
      skipVersionIncrement?: boolean;
      reviewsForMapping?: Review[];
      removeWholeReviewIds?: number[];
    },
  ) => void;
  onDeleteReviewsByText?: (reviewIds: number[]) => void;
}

export const useCoverLetterDeleteFlow = ({
  contentRef,
  isComposingRef,
  latestTextRef,
  caretOffsetRef,
  reviewsRef,
  reviewRemainingCharsRef,
  reviewLastKnownRangesRef,
  syncDOMToState,
  updateText,
  onDeleteReviewsByText,
}: UseCoverLetterDeleteFlowParams) => {
  const applyDeleteByDirection = useCallback(
    (direction: DeleteDirection) => {
      if (!contentRef.current) return;
      if (isComposingRef.current) return;

      syncDOMToState();

      const { start, end } = getCaretPosition(contentRef.current);
      const result = computeDeleteEdit({
        direction,
        currentText: latestTextRef.current,
        caretStart: start,
        caretEnd: end,
        reviews: reviewsRef.current,
        reviewRemainingChars: reviewRemainingCharsRef.current,
        reviewLastKnownRanges: reviewLastKnownRangesRef.current,
      });

      caretOffsetRef.current = result.caretOffset;
      reviewRemainingCharsRef.current = result.nextReviewRemainingChars;
      reviewLastKnownRangesRef.current = result.nextReviewLastKnownRanges;
      reviewsRef.current = result.nextReviews;

      if (result.deletedReviewIds.length > 0) {
        onDeleteReviewsByText?.(Array.from(new Set(result.deletedReviewIds)));
      }

      updateText(result.newText, {
        reviewsForMapping: result.reviewsForMapping,
        removeWholeReviewIds: result.deletedWholeReviewIdsForPatch,
      });
    },
    [
      contentRef,
      isComposingRef,
      syncDOMToState,
      latestTextRef,
      reviewsRef,
      reviewRemainingCharsRef,
      reviewLastKnownRangesRef,
      caretOffsetRef,
      onDeleteReviewsByText,
      updateText,
    ],
  );

  return { applyDeleteByDirection };
};
