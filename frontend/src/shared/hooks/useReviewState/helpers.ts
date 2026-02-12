import type { Review } from '@/shared/types/review';

export const parseTaggedText = (raw: string) => {
  const openTagRegex = /<c(\d+)>/g;
  const closeTagRegex = /<\/c(\d+)>/g;

  const tags: Array<{
    id: string;
    type: 'open' | 'close';
    position: number;
    matchLength: number;
  }> = [];

  // 여는 태그 수집
  let match: RegExpExecArray | null;
  while ((match = openTagRegex.exec(raw)) !== null) {
    tags.push({
      id: match[1],
      type: 'open',
      position: match.index,
      matchLength: match[0].length,
    });
  }

  // 닫는 태그 수집
  while ((match = closeTagRegex.exec(raw)) !== null) {
    tags.push({
      id: match[1],
      type: 'close',
      position: match.index,
      matchLength: match[0].length,
    });
  }

  // 위치순 정렬
  tags.sort((a, b) => a.position - b.position);

  // 태그 제거하면서 실제 텍스트 위치 계산
  const taggedRanges: Array<{ id: string; start: number; end: number }> = [];
  const stack: Array<{ id: string; start: number }> = [];

  let cleaned = '';
  let lastIndex = 0;

  for (const tag of tags) {
    // 태그 이전의 텍스트 추가
    cleaned += raw.slice(lastIndex, tag.position);

    if (tag.type === 'open') {
      // 여는 태그: 스택에 추가
      stack.push({ id: tag.id, start: cleaned.length });
    } else {
      // 닫는 태그: 스택에서 매칭되는 여는 태그 찾기
      const openIndex = stack.findIndex((t) => t.id === tag.id);

      if (openIndex !== -1) {
        const open = stack[openIndex];
        taggedRanges.push({
          id: tag.id,
          start: open.start,
          end: cleaned.length,
        });
        stack.splice(openIndex, 1);
      } else {
        console.warn(`Closing tag </c${tag.id}> without matching opening tag`);
      }
    }

    lastIndex = tag.position + tag.matchLength;
  }

  // 남은 텍스트 추가
  cleaned += raw.slice(lastIndex);

  // 매칭되지 않은 여는 태그 경고
  if (stack.length > 0) {
    console.warn(
      'Unclosed tags:',
      stack.map((t) => t.id),
    );
  }

  return { cleaned, taggedRanges };
};

// TODO: 자신이 작성한 리뷰인지 여부도 함께 처리 필요
export const buildReviewsFromApi = (
  cleanedText: string,
  taggedRanges: Array<{ id: string; start: number; end: number }>,
  apiReviews: Array<{
    id: number;
    sender: { id: string; nickname: string };
    originText: string;
    suggest: string | null;
    comment: string;
    createdAt: string;
  }>,
) => {
  return apiReviews.map((api) => {
    const tagged = taggedRanges.find((t) => t.id === String(api.id));

    if (!tagged) {
      return {
        id: String(api.id),
        selectedText: api.originText,
        revision: api.suggest || '',
        comment: api.comment,
        range: { start: -1, end: -1 },
        sender: api.sender,
        originText: api.originText,
        suggest: api.suggest,
        createdAt: api.createdAt,
        isValid: false,
      } as Review;
    }

    const actualText = cleanedText.slice(tagged.start, tagged.end);
    const isTextMatching = actualText === api.originText;

    return {
      id: String(api.id),
      selectedText: api.originText,
      revision: api.suggest || '',
      comment: api.comment,
      range: { start: tagged.start, end: tagged.end },
      sender: api.sender,
      originText: api.originText,
      suggest: api.suggest,
      createdAt: api.createdAt,
      isValid: isTextMatching,
    } as Review;
  });
};

let internalReviewAutoId = 1000;
export const generateInternalReviewId = () => String(++internalReviewAutoId);

// 두 문자열을 비교하여 변경된 위치와 길이를 계산
export const calculateTextChange = (
  oldText: string,
  newText: string,
): { changeStart: number; oldLength: number; newLength: number } => {
  // 앞에서부터 같은 부분 찾기
  let changeStart = 0;
  while (
    changeStart < oldText.length &&
    changeStart < newText.length &&
    oldText[changeStart] === newText[changeStart]
  ) {
    changeStart++;
  }

  // 뒤에서부터 같은 부분 찾기
  let oldEnd = oldText.length;
  let newEnd = newText.length;
  while (
    oldEnd > changeStart &&
    newEnd > changeStart &&
    oldText[oldEnd - 1] === newText[newEnd - 1]
  ) {
    oldEnd--;
    newEnd--;
  }

  return {
    changeStart,
    oldLength: oldEnd - changeStart,
    newLength: newEnd - changeStart,
  };
};

// 텍스트 변경에 따라 리뷰 범위를 업데이트
export const updateReviewRanges = <
  T extends { range: { start: number; end: number } },
>(
  reviews: T[],
  changeStart: number,
  oldLength: number,
  newLength: number,
): T[] => {
  const lengthDiff = newLength - oldLength;
  const changeEnd = changeStart + oldLength;

  return reviews.map((review) => {
    const { start, end } = review.range;

    // 변경 범위 이전의 리뷰: 영향 없음
    if (end <= changeStart) {
      return review;
    }

    // 변경 범위 이후의 리뷰: 전체 이동
    if (start >= changeEnd) {
      return {
        ...review,
        range: {
          start: start + lengthDiff,
          end: end + lengthDiff,
        },
      };
    }

    // 변경 범위와 겹치는 리뷰
    // 1. 리뷰가 변경 범위에 완전히 포함되고, 모든 내용이 삭제된 경우만 무효화
    if (start >= changeStart && end <= changeEnd && newLength === 0) {
      return {
        ...review,
        range: {
          start: -1,
          end: -1,
        },
        isValid: false,
      } as T;
    }

    // 2. 리뷰 시작 위치가 변경 범위 안에 있는 경우
    if (start >= changeStart && start < changeEnd) {
      // 리뷰 시작이 변경 범위 내부 → start는 변경 시작점으로, end는 길이 변화만큼 조정
      const newStart = changeStart;
      const newEnd = end + lengthDiff;
      return {
        ...review,
        range: {
          start: newStart,
          end: Math.max(newStart, newEnd), // end가 start보다 작아지지 않도록
        },
      };
    }

    // 3. 리뷰 끝 위치가 변경 범위 안에 있는 경우
    if (end > changeStart && end <= changeEnd) {
      // 리뷰 끝이 변경 범위 내부 → end는 변경 시작점으로
      return {
        ...review,
        range: {
          start,
          end: changeStart + newLength,
        },
      };
    }

    // 4. 리뷰가 변경 범위를 완전히 포함하는 경우
    if (start < changeStart && end > changeEnd) {
      // 리뷰 범위가 변경 범위보다 큼 → end만 길이 변화만큼 조정
      return {
        ...review,
        range: {
          start,
          end: end + lengthDiff,
        },
      };
    }

    return review;
  });
};

// 편집된 텍스트와 리뷰 범위 정보를 받아서 태그가 포함된 원본 형식으로 재구성
export const reconstructTaggedText = (
  cleanedText: string,
  reviews: Array<{ id: string; range: { start: number; end: number } }>,
): string => {
  // 유효한 리뷰만 필터링 (start, end가 -1이 아닌 것)
  const validReviews = reviews.filter(
    (r) => r.range.start !== -1 && r.range.end !== -1,
  );

  // 뒤에서부터 삽입하기 위해 start 위치 기준 내림차순 정렬
  const sorted = [...validReviews].sort(
    (a, b) => b.range.start - a.range.start,
  );

  let result = cleanedText;

  // 뒤에서부터 태그 삽입 (앞에서부터 하면 인덱스가 계속 변경됨)
  for (const review of sorted) {
    const before = result.slice(0, review.range.start);
    const tagged = result.slice(review.range.start, review.range.end);
    const after = result.slice(review.range.end);
    result = `${before}<c${review.id}>${tagged}</c${review.id}>${after}`;
  }

  return result;
};
