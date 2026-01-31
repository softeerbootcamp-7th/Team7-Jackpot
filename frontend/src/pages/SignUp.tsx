import { useState } from 'react';

import loginBackground from '/images/loginBackgroundImage.png';
import titleLogo from '/images/titleLogo.svg';

import '@/index.css';

const SignUpPage = () => {
  const inputHintTextStyle = 'text-gray-950 font-bold text-lg';
  const [idData, setIdData] = useState<string>('');
  const [passwordData, setPasswordData] = useState<string>('');
  const [passwordCheckData, setPasswordCheckData] = useState<string>('');
  const [nicknameData, setNicknameData] = useState<string>('');
  const isActived: boolean =
    idData !== '' &&
    passwordData !== '' &&
    passwordCheckData !== '' &&
    nicknameData !== '';
  const buttonActiveStyle: string = isActived
    ? 'bg-gray-900 text-white cursor-pointer'
    : 'bg-gray-50 text-gray-400';

  const saveUserId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdData(e.target.value);
  };

  const saveUserPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData(e.target.value);
  };

  const saveUserPasswordCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordCheckData(e.target.value);
  };

  const saveUserNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNicknameData(e.target.value);
  };

  return (
    <div className='flex items-center ps-[30px] py-[30px] gap-[140px]'>
      <img
        className='w-[1048px] h-auto rounded-[40px]'
        src={loginBackground}
        aria-label='백그라운드 이미지'
      />
      <div className='w-[392px] h-[392px] flex flex-col justify-center items-center gap-6'>
        <div className='flex flex-col items-center gap-3'>
          <img src={titleLogo} aria-label='타이틀 로고' />
          <div className='text-center justify-start text-gray-950 text-lg font-bold line-clamp-1 select-none'>
            회원가입
          </div>
        </div>
        <form className='flex flex-col justify-center items-center gap-[60px]'>
          <div className='w-[392px] flex flex-col justify-center items-center gap-[18px]'>
            <div className='flex flex-col w-full gap-3'>
              <div className='flex gap-[2px]'>
                <div className={`${inputHintTextStyle}`}>아이디</div>
                <div className='text-red-600'>*</div>
              </div>
              <input
                className='w-full bg-gray-50 px-5 py-[14px] rounded-lg'
                type='text'
                placeholder='아이디를 입력해주세요 (6자 이상 영문 소문자, 숫자)'
                onChange={saveUserId}
              />
            </div>
            <div className='flex flex-col w-full gap-3'>
              <div className='flex gap-[2px]'>
                <div className={`${inputHintTextStyle}`}>비밀번호</div>
                <div className='text-red-600'>*</div>
              </div>
              <input
                className='w-full bg-gray-50 px-5 py-[14px] rounded-lg'
                type='password'
                placeholder='영문 숫자 조합 8자 이상으로 설정해주세요'
                onChange={saveUserPassword}
              />
            </div>
            <div className='flex flex-col w-full gap-3'>
              <div className='flex gap-[2px]'>
                <div className={`${inputHintTextStyle}`}>비밀번호 확인</div>
                <div className='text-red-600'>*</div>
              </div>
              <input
                className='w-full bg-gray-50 px-5 py-[14px] rounded-lg'
                type='password'
                placeholder='설정하신 비밀번호를 입력해주세요'
                onChange={saveUserPasswordCheck}
              />
            </div>
            <div className='flex flex-col w-full gap-3'>
              <div className='flex gap-[2px]'>
                <div className={`${inputHintTextStyle}`}>사용자 이름</div>
                <div className='text-red-600'>*</div>
              </div>
              <input
                className='w-full bg-gray-50 px-5 py-[14px] rounded-lg'
                type='password'
                placeholder='네러틱스에서 사용하고 싶은 이름을 설정해주세요'
                onChange={saveUserNickname}
              />
            </div>
          </div>
          <input
            className={`w-full ${buttonActiveStyle} px-5 py-[12px] rounded-lg`}
            type='submit'
            value='회원가입'
          />
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
