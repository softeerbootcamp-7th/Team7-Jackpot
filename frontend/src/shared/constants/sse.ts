/**
 * SSE 연결 관련 설정
 */
export const SSE_CONFIG = {
  ENDPOINT: '/sse/connect',
  HEADERS: {
    ACCEPT: 'text/event-stream',
    CACHE_CONTROL: 'no-cache',
  },
} as const;

/**
 * Worker와 메인 스레드 간 통신 메시지 타입
 */
export const SSE_MESSAGE_TYPE = {
  // 메인 -> 워커
  START: 'START',
  STOP: 'STOP',
  // 워커 -> 메인
  NOTIFICATION: 'NOTIFICATION',
} as const;

/**
 * 지수 백오프(Exponential Backoff) 설정
 */
export const SSE_RECONNECT_CONFIG = {
  BASE_DELAY: 1000,
  INITIAL_BACKOFF_EXPONENT: 2,
  MAX_BACKOFF_EXPONENT: 4,
  JITTER_RATIO: 0.5,
} as const;
