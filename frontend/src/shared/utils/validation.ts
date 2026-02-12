export const validateId = (id: string) => {
  const regex = /^[a-z0-9]{6,12}$/;
  return regex.test(id);
};

export const validatePassword = (pw: string) => {
  const regex = /^(?=.*[a-z])(?=.*[0-9])[a-z0-9]{8,}$/;
  return regex.test(pw);
};

export const validateNickname = (name: string) => {
  const regex = /^[가-힣a-zA-Z]{2,15}$/;
  return regex.test(name);
};

export const validateSearchKeyword = (keyword: string) => {
  if (keyword.length === 1) {
    return {
      isValid: false,
      message: '검색어는 2자 이상이어야 합니다.',
    };
  }
  return {
    isValid: true,
    message: null,
  };
};
