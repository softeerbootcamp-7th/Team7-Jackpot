let ACCESS_TOKEN: string = '';

export const getAccessToken = () => ACCESS_TOKEN;

export const setAccessToken = (token: string) => {
  ACCESS_TOKEN = token;
};

export const isAuthenticated = () => !!ACCESS_TOKEN;

// [윤종근] - TODO: 로그아웃을 위한 토큰 제거 메서드 필요
