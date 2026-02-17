export interface WriterMessageType {
  // 현재 보고 있었던 버전
  version: number;
  // 변경이 시작된 인덱스
  startIdx: number;
  // 변경이 끝난 인덱스 (기존 텍스트 기준)
  endIdx: number;
  // 해당 범위가 이 텍스트로 대체됨
  replacedText: string;
}

export interface TextUpdateResponseType {
  eventType: 'TEXT_UPDATE';
  qnAId: number;
  data: {
    // content의 버전
    version: number;
    // 자기소개서 전체 글
    content: string;
  };
}

export interface ReviewUpdatedResponseType {
  eventType: 'REVIEW_UPDATED';
  qnAId: number;
  data: {
    reviewId: number;
    originText: string;
    suggest: string;
    content: string;
    modifiedAt: string;
  };
}

export interface ReviewDeletedResponseType {
  eventType: 'REVIEW_DELETED';
  qnAId: number;
  data: {
    reviewId: number;
  };
}

export interface ReviewCreatedResponseType {
  eventType: 'REVIEW_CREATED';
  qnAId: number;
  data: {
    sender: {
      id: string;
      nickname: string;
    };
    reviewId: number;
    originText: string;
    suggest: string;
    comment: string;
    createdAt: string;
  };
}

export interface TextReplaceAllResponseType {
  eventType: 'TEXT_UPDATE';
  qnAId: number;
  data: {
    // 이 변경의 버전
    version: number;
    // 변경이 시작된 인덱스
    startIdx: number;
    // 변경이 끝난 인덱스 (기존 텍스트 기준)
    endIdx: number;
    // 해당 범위가 이 텍스트로 대체됨
    replacedText: string;
  };
}

export type WebSocketResponse =
  | TextUpdateResponseType
  | ReviewUpdatedResponseType
  | ReviewDeletedResponseType
  | ReviewCreatedResponseType
  | TextReplaceAllResponseType;