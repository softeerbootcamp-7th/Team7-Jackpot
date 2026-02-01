import { useEffect, useState } from 'react';

import loginBackground from '/images/loginBackgroundImage.png';

import TitleLogo from '@/components/common/icons/TitleLogo';
import LogoAndSubTitle from '@/components/common/LogoAndSubTitle';
import SubmitButton from '@/components/common/SubmitButton';
import CheckDuplicationButton from '@/components/signUp/CheckDuplicationButton';
import InputBarInSignUp from '@/components/signUp/InputBarInSignUp';

import {
  INPUT_BAR_IN_SIGNUP,
  SUB_TITLE,
} from '@/constants/constantsInSignUpPage';
import type { AuthFormData } from '@/types/auth';
import {
  validateId,
  validateNickname,
  validatePassword,
} from '@/utils/auth/validation';

import '@/index.css';

interface isActivedType {
  id: boolean;
  submit: boolean;
}

interface StatusMsgType {
  id: string;
  password: string;
  passwordCheck: string;
  nickname: string;
}

type InputIdType = (typeof INPUT_BAR_IN_SIGNUP)[number]['ID'];

const SignUpPage = () => {

  const [statusMsg, setStatusMsg] = useState<StatusMsgType>({
    id: '',
    password: '',
    passwordCheck: '',
    nickname: '',
  });

  const [isPasswordMatched, setIsPasswordMatched] = useState<boolean>(false);


  const isActived: isActivedType = {
    id: validateId(formData.id),

    submit:
      validateId(formData.id) &&
      validatePassword(formData.password) &&
      formData.password === formData.passwordCheck &&
      (formData.nickname || '').length >= 2 &&
      validateNickname(formData.nickname || ''),
  };

  return (
    <div className='flex items-center ps-[1.875rem] py-[1.875rem] gap-[8.75rem]'>
      <img
        className='w-[65.5rem] h-auto rounded-[2.5rem]'
        src={loginBackground}
        aria-label='백그라운드 이미지'
      />
      <div className='w-[24.5rem] h-[24.5rem] flex flex-col justify-center items-center gap-6'>
        <LogoAndSubTitle
          TitleLogoComponent={TitleLogo}
          subTitle={SUB_TITLE}
          subTitleColor='text-gray-950'
        />
        <form className='flex flex-col justify-center items-center gap-[3.75rem]'>
          <div className='w-[24.5rem] flex flex-col justify-center items-center gap-[1.125rem]'>
            {INPUT_BAR_IN_SIGNUP.map((each) => {
              const currentMsg = statusMsg[each.ID];

              const isPasswordMatchSuccess =
                each.ID === 'passwordCheck' && isPasswordMatched;

              return (
                <InputBarInSignUp
                  key={each.ID}
                  hintText={each.HINT_TEXT}
                  type={each.TYPE}
                  placeholder={each.PLACEHOLDER}
                  maxLength={each.MAX_LENGTH}
                  onChange={(e) => handleInputChange(e, each.ID)}
                  value={formData[each.ID]}
                  helpMessage={currentMsg}
                  isSuccess={isPasswordMatchSuccess}
                  rightElement={
                    each.ID === 'id' && (
                      <CheckDuplicationButton isActived={isActived.id} />
                    )
                  }
                />
              );
            })}
          </div>
          <SubmitButton isActived={isActived.submit} value='회원가입' />
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
