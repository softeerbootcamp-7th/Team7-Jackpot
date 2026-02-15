import { useEffect, useMemo, useRef, useState } from 'react';

import { useTextSelection } from '@/shared/hooks/useTextSelection';
import type { TextChunk } from '@/shared/hooks/useTextSelection/helpers';
import type { Review } from '@/shared/types/review';
import type { SelectionInfo } from '@/shared/types/selectionInfo';

const saveCaret = (el: HTMLElement): number => {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return 0;
  const range = sel.getRangeAt(0);
  const preRange = range.cloneRange();
  preRange.selectNodeContents(el);
  preRange.setEnd(range.startContainer, range.startOffset);
  return preRange.toString().length;
};

const restoreCaret = (el: HTMLElement, offset: number) => {
  const sel = window.getSelection();
  if (!sel) return;

  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  let remaining = offset;

  while (walker.nextNode()) {
    const node = walker.currentNode as Text;
    if (remaining <= node.length) {
      const range = document.createRange();
      range.setStart(node, remaining);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
      return;
    }
    remaining -= node.length;
  }
};

const buildHTML = (
  before: TextChunk[],
  after: TextChunk[],
  chunkPositions: number[],
  reviews: Review[],
  selectedReviewId: number | null,
  isReviewOpen: boolean,
  selection: SelectionInfo | null,
): string => {
  const beforeHTML = before
    .map((chunk, i) => {
      if (!chunk.isHighlighted) return chunk.text;

      const chunkStart = chunkPositions[i];
      const chunkEnd = chunkStart + chunk.text.length;

      const matchingReview = reviews.find(
        (review) =>
          review.isValid &&
          review.range.start <= chunkStart &&
          review.range.end >= chunkEnd,
      );

      if (!matchingReview) return chunk.text;

      const isSelected = selectedReviewId === matchingReview.id;
      const className = `${isReviewOpen ? 'cursor-pointer font-bold' : ''} ${
        isSelected ? 'bg-red-100' : ''
      }`;

      return `<span class="${className}" data-review-id="${matchingReview.id}">${chunk.text}</span>`;
    })
    .join('');

  if (!selection || after.length === 0) return beforeHTML;

  const afterHTML = after
    .map(
      (chunk) =>
        `<span class="${chunk.isHighlighted ? 'font-bold' : ''}">${chunk.text}</span>`,
    )
    .join('');

  return `${beforeHTML}<div class="h-2.5"></div><span class="opacity-30">${afterHTML}</span>`;
};

interface CoverLetterContentProps {
  text: string;
  reviews: Review[];
  editingReview: Review | null;
  selection: SelectionInfo | null;
  isReviewOpen: boolean;
  selectedReviewId: number | null;
  onSelectionChange: (selection: SelectionInfo | null) => void;
  onReviewClick: (reviewId: number) => void;
  onTextChange?: (newText: string) => void;
}

const CoverLetterContent = ({
  text,
  reviews,
  editingReview,
  selection,
  isReviewOpen,
  selectedReviewId,
  onSelectionChange,
  onReviewClick,
  onTextChange,
}: CoverLetterContentProps) => {
  const [spacerHeight, setSpacerHeight] = useState(0);

  const { containerRef, before, after } = useTextSelection({
    text,
    reviews,
    editingReview,
    selection,
    onSelectionChange,
  });

  const contentRef = useRef<HTMLDivElement>(null);
  const isInputtingRef = useRef(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const containerHeight = containerRef.current.clientHeight;
    const lineHeight = 28;
    setSpacerHeight(Math.max(0, containerHeight - lineHeight));
  }, [containerRef]);

  const chunkPositions = useMemo(
    () =>
      before.reduce<number[]>((acc, _, i) => {
        if (i === 0) {
          acc.push(0);
        } else {
          acc.push(acc[i - 1] + before[i - 1].text.length);
        }
        return acc;
      }, []),
    [before],
  );

  const html = useMemo(
    () =>
      buildHTML(
        before,
        after,
        chunkPositions,
        reviews,
        selectedReviewId,
        isReviewOpen,
        selection,
      ),
    [
      before,
      after,
      chunkPositions,
      reviews,
      selectedReviewId,
      isReviewOpen,
      selection,
    ],
  );

  useEffect(() => {
    if (!contentRef.current) return;

    if (isInputtingRef.current) {
      isInputtingRef.current = false;
      return;
    }

    const caretOffset = saveCaret(contentRef.current);
    contentRef.current.innerHTML = html;
    restoreCaret(contentRef.current, caretOffset);
  }, [html]);

  // 편집 이벤트 처리
  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const newText = e.currentTarget.textContent || '';
    if (onTextChange) {
      isInputtingRef.current = true;
      onTextChange(newText);
    }
  };

  // 리뷰 클릭 이벤트 처리
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const reviewIdStr = target.getAttribute('data-review-id');
    if (reviewIdStr && isReviewOpen) {
      const reviewId = Number(reviewIdStr);
      if (!isNaN(reviewId)) {
        onReviewClick(reviewId);
      }
    }
  };

  return (
    <div className='relative ml-12 min-h-0 flex-1'>
      <div
        ref={containerRef}
        className='absolute inset-0 overflow-y-auto rounded-xl border border-gray-200 bg-white px-4 transition-colors focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-100 hover:border-gray-300'
        style={{
          whiteSpace: 'pre-wrap',
          overflowY: selection ? 'hidden' : 'auto',
        }}
      >
        <div
          ref={contentRef}
          contentEditable={true}
          suppressContentEditableWarning={true}
          onInput={handleInput}
          onClick={handleClick}
          className='w-full cursor-text py-3 text-base leading-7 font-normal text-gray-800 outline-none'
          style={{ paddingBottom: spacerHeight }}
        />
      </div>
    </div>
  );
};

export default CoverLetterContent;
