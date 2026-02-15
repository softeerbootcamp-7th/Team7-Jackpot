import {
  getAccessToken,
  setAccessToken,
} from '@/features/auth/libs/tokenStore';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface MethodProps {
  endpoint: string;
  body?: unknown;
  options?: RequestInit;
  skipAuth?: boolean;
}

export const apiClient = {
  get: async <T>({ endpoint, options, skipAuth }: MethodProps): Promise<T> => {
    return request<T>(endpoint, { ...options, method: 'GET' }, skipAuth);
  },

  post: async <T>({
    endpoint,
    body,
    options,
    skipAuth,
  }: MethodProps): Promise<T> => {
    return request<T>(
      endpoint,
      {
        ...options,
        method: 'POST',
        body: body ? JSON.stringify(body) : undefined,
      },
      skipAuth,
    );
  },

  put: async <T>({
    endpoint,
    body,
    options,
    skipAuth,
  }: MethodProps): Promise<T> => {
    return request<T>(
      endpoint,
      {
        ...options,
        method: 'PUT',
        body: body ? JSON.stringify(body) : undefined,
      },
      skipAuth,
    );
  },

  patch: async <T>({
    endpoint,
    body,
    options,
    skipAuth,
  }: MethodProps): Promise<T> => {
    return request<T>(
      endpoint,
      {
        ...options,
        method: 'PATCH',
        body: body ? JSON.stringify(body) : undefined,
      },
      skipAuth,
    );
  },

  delete: async <T = void>({
    endpoint,
    options,
    skipAuth,
  }: MethodProps): Promise<T> => {
    return request<T>(endpoint, { ...options, method: 'DELETE' }, skipAuth);
  },
};

const request = async <T>(
  endpoint: string,
  options: RequestInit,
  skipAuth: boolean = false,
): Promise<T> => {
  const headers = new Headers(options.headers || {});

  // Body가 있는 요청에만 JSON Content-Type 설정
  if (options.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  // 인증 토큰 설정
  if (!skipAuth) {
    const token = getAccessToken();
    if (token) headers.set('Authorization', token);
  }

  try {
    let response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    // 액세스 토큰 만료 시 리프레시 후 재요청
    if (response.status === 401 && !skipAuth) {
      const refreshResponse = await fetch(`${BASE_URL}/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
      });

      if (!refreshResponse.ok) {
        throw new Error('Refresh token expired');
      }

      const refreshData = await refreshResponse.json();

      // accessToken 유효성 검증
      if (!refreshData.accessToken) {
        throw new Error('Invalid refresh response: missing accessToken');
      }

      setAccessToken(refreshData.accessToken);
      headers.set('Authorization', refreshData.accessToken);

      response = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });
    }

    // API 에러 처리 (본문 포함)
    if (!response.ok) {
      const errorBody = await response.text().catch(() => '');
      throw new Error(`API Error: ${response.status} ${errorBody}`);
    }

    const text = await response.text();

    // 빈 본문 처리: DELETE 등 예상되는 경우만 null 반환, 나머지는 에러 가능
    if (!text) {
      return null as unknown as T;
    }

    return JSON.parse(text) as T;
  } catch (error) {
    console.error('API Request Failed:', error);
    throw error;
  }
};
