import { useCallback, useMemo, useState } from 'react';

import { useReviewsByQnaId } from '@/shared/hooks/useReviewQueries';
import {
  buildReviewsFromApi,
  calculateTextChange,
  generateInternalReviewId,
  parseTaggedText,
  updateReviewRanges,
} from '@/shared/hooks/useReviewState/helpers';
import type { CoverLetter } from '@/shared/types/coverLetter';
import type { QnA } from '@/shared/types/qna';
import type { Review, ReviewBase } from '@/shared/types/review';

export const useReviewState = (coverLetter: CoverLetter, qnas: QnA[]) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const currentQna = qnas[currentPageIndex];
  const currentQnaId = currentQna?.qnAId;

  const { data: reviewData } = useReviewsByQnaId(currentQnaId);

  // QnA별 리뷰 상태 관리
  const [reviewsByQnaId, setReviewsByQnaId] = useState<
    Record<number, Review[]>
  >({});

  // QnA별 편집 텍스트 관리
  const [editedAnswers, setEditedAnswers] = useState<Record<number, string>>(
    {},
  );

  // 원본 텍스트 (memoized)
  const answer = currentQna ? currentQna.answer : '';

  const parsed = useMemo(() => {
    if (!answer) {
      return { cleaned: '', taggedRanges: [] };
    }

    return parseTaggedText(answer);
  }, [answer]);

  const originalText = parsed.cleaned;

  const currentText =
    currentQnaId && editedAnswers[currentQnaId] !== undefined
      ? editedAnswers[currentQnaId]
      : originalText;

  // 서버 데이터 → 로컬 리뷰 초기화
  const currentReviews = useMemo(() => {
    if (!currentQnaId) return [];

    // 로컬에 이미 있으면 그걸 사용
    if (reviewsByQnaId[currentQnaId]) {
      return reviewsByQnaId[currentQnaId];
    }

    // 없으면 서버 기반으로 계산
    if (!reviewData) return [];

    const parsed = parseTaggedText(currentQna?.answer ?? '');

    return buildReviewsFromApi(
      parsed.cleaned,
      parsed.taggedRanges,
      reviewData.reviews,
    );
  }, [currentQnaId, reviewData, currentQna?.answer, reviewsByQnaId]);

  //  Editing 상태
  const [editingId, setEditingId] = useState<string | null>(null);

  const editingReview =
    editingId != null
      ? (currentReviews.find((r) => r.id === editingId) ?? null)
      : null;

  const hasActiveEdit = editingId !== null;

  // 페이지 이동
  const handlePageChange = useCallback((index: number) => {
    setCurrentPageIndex(index);
    setEditingId(null);
  }, []);

  // 리뷰 추가
  const handleAddReview = useCallback(
    (review: ReviewBase) => {
      if (!currentQnaId) return;

      setReviewsByQnaId((prev) => ({
        ...prev,
        [currentQnaId]: [
          ...(prev[currentQnaId] ?? []),
          {
            ...review,
            id: generateInternalReviewId(),
            sender: { id: 'me', nickname: '나' },
            createdAt: new Date().toISOString(),
          },
        ],
      }));
    },
    [currentQnaId],
  );

  //  리뷰 수정
  const handleUpdateReview = useCallback(
    (reviewId: string, revision: string, comment: string) => {
      if (!currentQnaId) return;

      setReviewsByQnaId((prev) => ({
        ...prev,
        [currentQnaId]:
          prev[currentQnaId]?.map((r) =>
            r.id === reviewId ? { ...r, revision, comment } : r,
          ) ?? [],
      }));

      setEditingId(null);
    },
    [currentQnaId],
  );

  //  리뷰 삭제
  const handleDeleteReview = useCallback(
    (id: string) => {
      if (!currentQnaId) return;

      setReviewsByQnaId((prev) => ({
        ...prev,
        [currentQnaId]: prev[currentQnaId]?.filter((r) => r.id !== id) ?? [],
      }));
    },
    [currentQnaId],
  );

  // 리뷰 편집 모드
  const handleEditReview = useCallback((id: string) => {
    setEditingId(id);
  }, []);

  const handleCancelEdit = useCallback(() => {
    setEditingId(null);
  }, []);

  // 텍스트 변경 + 리뷰 범위 보정
  const handleTextChange = useCallback(
    (newText: string) => {
      if (!currentQnaId) return;

      setEditedAnswers((prevAnswers) => {
        const oldText = prevAnswers[currentQnaId] ?? originalText;

        const change = calculateTextChange(oldText, newText);

        setReviewsByQnaId((prevReviews) => ({
          ...prevReviews,
          [currentQnaId]: updateReviewRanges(
            prevReviews[currentQnaId] ?? [],
            change.changeStart,
            change.oldLength,
            change.newLength,
          ),
        }));

        return {
          ...prevAnswers,
          [currentQnaId]: newText,
        };
      });
    },
    [currentQnaId, originalText],
  );

  // 페이지 데이터
  const pages = useMemo(
    () =>
      qnas.map((qna) => ({
        chipData: {
          company: coverLetter.companyName,
          job: coverLetter.jobPosition,
        },
        question: qna.question,
      })),
    [qnas, coverLetter.companyName, coverLetter.jobPosition],
  );

  return {
    coverLetter,
    qnas,
    pages,

    currentPageIndex,
    currentQna,
    currentText,
    currentReviews,

    editingId,
    editingReview,
    hasActiveEdit,

    editedAnswers,

    handlePageChange,
    handleAddReview,
    handleUpdateReview,
    handleDeleteReview,
    handleEditReview,
    handleCancelEdit,
    handleTextChange,
  };
};

export default useReviewState;
