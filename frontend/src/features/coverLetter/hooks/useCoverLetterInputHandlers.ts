import {
  type ClipboardEvent,
  type KeyboardEvent as ReactKeyboardEvent,
  type RefObject,
  useCallback,
} from 'react';

import { restoreCaret } from '@/features/coverLetter/libs/caret';
import type { DeleteDirection } from '@/features/coverLetter/libs/deleteUtils';

interface UseCoverLetterInputHandlersParams {
  isComposingRef: RefObject<boolean>;
  lastCompositionEndAtRef: RefObject<number>;
  normalizeCaretAtReviewBoundary: () => boolean;
  insertPlainTextAtCaret: (text: string) => void;
  applyDeleteByDirection: (direction: DeleteDirection) => void;
  handleCompositionEnd?: () => void;
  contentRef: RefObject<HTMLDivElement | null>;
  caretOffsetRef: RefObject<number>;
}

export const useCoverLetterInputHandlers = ({
  isComposingRef,
  lastCompositionEndAtRef,
  normalizeCaretAtReviewBoundary,
  insertPlainTextAtCaret,
  applyDeleteByDirection,
  handleCompositionEnd,
  contentRef,
  caretOffsetRef,
}: UseCoverLetterInputHandlersParams) => {
  const handleKeyDown = useCallback(
    (e: ReactKeyboardEvent<HTMLDivElement>) => {
      const native = e.nativeEvent;

      const isImeProcessKey =
        e.key === 'Process' || native.keyCode === 229 || native.isComposing;

      if (isImeProcessKey || isComposingRef.current) return;

      if (e.key === 'Backspace') {
        const elapsed = Date.now() - lastCompositionEndAtRef.current;

        if (elapsed < 120) return;

        e.preventDefault();
        normalizeCaretAtReviewBoundary();
        applyDeleteByDirection('backward');
        return;
      }

      if (e.key === 'Delete') {
        e.preventDefault();
        normalizeCaretAtReviewBoundary();
        applyDeleteByDirection('forward');
        return;
      }

      if (e.key === 'Enter') {
        e.preventDefault();
        normalizeCaretAtReviewBoundary();

        // 현재 composition이 있으면 강제 종료
        if (isComposingRef.current) {
          handleCompositionEnd?.();
        }

        // 줄바꿈 삽입
        insertPlainTextAtCaret('\n');

        // DOM 반영 후 caret 복원 2단계
        window.requestAnimationFrame(() => {
          if (!contentRef.current) return;
          restoreCaret(contentRef.current, caretOffsetRef.current);

          window.requestAnimationFrame(() => {
            if (!contentRef.current) return;
            restoreCaret(contentRef.current, caretOffsetRef.current);
          });
        });

        return;
      }
    },
    [
      applyDeleteByDirection,
      insertPlainTextAtCaret,
      isComposingRef,
      lastCompositionEndAtRef,
      normalizeCaretAtReviewBoundary,
      caretOffsetRef,
      contentRef,
      handleCompositionEnd,
    ],
  );

  const handlePaste = useCallback(
    (e: ClipboardEvent<HTMLDivElement>) => {
      e.preventDefault();

      const plainText = e.clipboardData.getData('text/plain');

      if (!plainText) return;

      normalizeCaretAtReviewBoundary();

      insertPlainTextAtCaret(plainText.replace(/\r\n/g, '\n'));
    },
    [insertPlainTextAtCaret, normalizeCaretAtReviewBoundary],
  );

  return {
    handleKeyDown,
    handlePaste,
  };
};
