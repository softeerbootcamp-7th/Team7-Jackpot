import { useState } from 'react';

import loginBackground from '/images/loginBackgroundImage.png';
import { useNavigate } from 'react-router';

import TitleLogo from '@/components/common/icons/TitleLogo';
import InputBar from '@/components/common/InputBar';
import LogoAndSubTitle from '@/components/common/LogoAndSubTitle';
import SubmitButton from '@/components/common/SubmitButton';

import {
  INPUT_BAR_IN_LOGIN,
  SUB_TITLE,
} from '@/constants/constatnsInLoginPage';
import type { AuthFormData } from '@/types/auth';
import { validateId } from '@/utils/auth/validation';

import '@/index.css';

type InputIdType = (typeof INPUT_BAR_IN_LOGIN)[number]['ID'];

interface isActivedType {
  id: boolean;
  submit: boolean;
}

const LoginPage = () => {
  const [formData, setFormData] = useState<AuthFormData>({
    id: '',
    password: '',
  });

  const navigate = useNavigate();

  const isActived: isActivedType = {
    id: validateId(formData.id),
    submit: validateId(formData.id) && formData.password.length >= 8,
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: InputIdType,
  ) => {
    let value = e.target.value;

    switch (key) {
      case 'id':
        value = value.toLowerCase().replace(/[^a-z0-9]/g, '');
        break;
      case 'password':
        value = value.replace(/\s/g, '');
        break;
      default:
        break;
    }

    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
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
          subTitleColor='text-gray-600'
        />
        <div>
          <form className='flex flex-col justify-center items-center gap-6'>
            <div className='w-[24.5rem] flex flex-col justify-center items-center gap-3'>
              {INPUT_BAR_IN_LOGIN.map((each) => (
                <InputBar
                  key={each.ID}
                  type={each.TYPE}
                  placeholder={each.PLACEHOLDER}
                  maxLength={each.MAX_LENGTH}
                  value={formData[each.ID]}
                  onChange={(e) => handleInputChange(e, each.ID)}
                />
              ))}
            </div>
            <SubmitButton isActived={isActived.submit} value='로그인' />
          </form>
        </div>
        <button
          type='button'
          className='text-gray-600 font-medium text-base cursor-pointer'
          onClick={() => navigate('/signup')}
        >
          회원가입
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
