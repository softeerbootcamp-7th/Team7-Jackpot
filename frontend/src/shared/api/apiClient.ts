import {
  getAccessToken,
  setAccessToken,
} from '@/features/auth/libs/tokenStore';

// 환경 변수 속의 요청 주소 불러오기
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface MethodProps {
  endpoint: string;
  body?: unknown;
  options?: RequestInit;
  skipAuth?: boolean;
}

// 인터셉터 패턴처럼 fetch Wrapper
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

  delete: async <T>({
    endpoint,
    options,
    skipAuth,
  }: MethodProps): Promise<T> => {
    return request<T>(
      endpoint,
      {
        ...options,
        method: 'DELETE',
      },
      skipAuth,
    );
  },
};

const request = async <T>(
  endpoint: string,
  options: RequestInit,
  skipAuth: boolean = false,
): Promise<T> => {
  const headers = new Headers(options.headers || {});

  // GET, DELETE에서는 Body가 없으므로 Content-Type이 필요가 없음
  // Body가 있는 요청에서만 JSON 헤더 설정
  if (options.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  if (!skipAuth) {
    const token = getAccessToken();
    if (token) {
      headers.set('Authorization', token);
    }
  }

  try {
    let response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    // 액세스 토큰이 만료되었다면 리프레시 후 재요청하는 로직
    if (response.status === 401 && !skipAuth) {
      const refreshResponse = await fetch(`${BASE_URL}/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
      });

      if (!refreshResponse.ok) {
        throw new Error('Refresh token expired');
      }

      const refreshData = await refreshResponse.json();
      setAccessToken(refreshData.accessToken);

      headers.set('Authorization', refreshData.accessToken);

      response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers,
      });
    }

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const text = await response.text();

    if (!text) {
      return null as T;
    }

    return JSON.parse(text) as T;
  } catch (error) {
    console.error('API Request Failed:', error);
    throw error;
  }
};
