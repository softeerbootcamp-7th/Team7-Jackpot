import type {
  AuthResponse,
  CheckIdRequest,
  JoinRequest,
  LoginRequest,
} from '@/features/auth/types/authApi';
import { apiClient } from '@/shared/api/apiClient';

// 액세스 토큰의 인메모리 저장 방식 채택
let ACCESS_TOKEN = '';

export const authClient = {
  // 아이디 중복확인을 위한 메서드
  checkId: async (userData: CheckIdRequest): Promise<AuthResponse> => {
    return await apiClient.post('/auth/checkid', userData);
  },

  // 회원가입을 위한 메서드
  signUp: async (userData: JoinRequest): Promise<AuthResponse> => {
    return await apiClient.post('/auth/join', userData);
  },

  // 로그인을 위한 메서드
  login: async (userData: LoginRequest): Promise<AuthResponse> => {
    const data: AuthResponse = await apiClient.post('/auth/login', userData, {
      credentials: 'include',
    });
    if (data.accessToken) {
      ACCESS_TOKEN = data.accessToken;
    }

    return data;
  },

  // 토큰 조회 메서드
  getToken: () => ACCESS_TOKEN,

  // 액세스 토큰 리프레시를 위한 메서드
  refresh: async (): Promise<AuthResponse> => {
    const data: AuthResponse = await apiClient.post('/auth/refresh', {
      credential: 'include',
    });
    if (data.accessToken) {
      ACCESS_TOKEN = data.accessToken;
    }

    return data;
  },

  // [윤종근] - TODO: 추후에 로그아웃 구현 시 엑세스 토큰 비우는 메서드 추가 필요
};
