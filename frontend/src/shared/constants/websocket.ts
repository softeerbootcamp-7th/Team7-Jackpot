/**
 * STOMP 및 소켓 연결 관련 설정 상수
 */
export const STOMP_CONFIG = {
  CONNECT_ENDPOINT: '/ws/connect',
  
  RECONNECT_DELAY: 5000,
  
  HEARTBEAT: {
    INCOMING: 4000,
    OUTGOING: 4000,
  },
} as const;

/**
 * 소켓 서버 에러 코드 정의
 */
export const SOCKET_ERROR_CODE = {
  EXPIRED_OR_FULL: '410',
} as const;

/**
 * 에러 판단을 위한 키워드 및 메시지
 */
export const SOCKET_ERROR_MESSAGE = {
  AUTH_KEYWORDS: ['auth', 'unauthorized'],
  EXPIRED_KEYWORD: '만료',
  FULL_KEYWORD: '초과',
  
  TOAST: {
    EXPIRED: '첨삭 링크가 만료되었습니다.',
    FULL: '접근 가능한 인원 수가 초과되었습니다.',
  },
} as const;

/**
 * 이동할 경로 (Navigation)
 */
export const SOCKET_REDIRECT_PATH = '/home';

/**
 * 소켓 구독 경로 템플릿 생성 함수
 */
export const SOCKET_PATH_TEMPLATE = {
  REVIEW: (shareId: string, qnaId: string) => `/sub/share/${shareId}/qna/${qnaId}/review`,
} as const;

export const SOCKET_EVENT_TYPE = {
  TEXT_REPLACE_ALL: 'TEXT_REPLACE_ALL',
  TEXT_UPDATE: 'TEXT_UPDATE',
  REVIEW_CREATED: 'REVIEW_CREATED',
  REVIEW_UPDATED: 'REVIEW_UPDATED',
  REVIEW_DELETED: 'REVIEW_DELETED',
  SHARE_LINK_DEACTIVATED: 'SHARE_LINK_DEACTIVATED',
} as const;