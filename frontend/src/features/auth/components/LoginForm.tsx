import { useNavigate } from 'react-router';

import InputBar from './InputBar';
import SubmitButton from './SubmitButton';

import { INPUT_BAR_IN_LOGIN } from '@/features/auth/constants/constantsInLoginPage';
import useAuthForm from '@/features/auth/hooks/useAuthForm';
import { validateId } from '@/shared/utils/validation';

const LoginForm = () => {
  const navigate = useNavigate();
  const { formData, handleInputChange } = useAuthForm({ id: '', password: '' });

  const isActived = validateId(formData.id) && formData.password.length >= 8;

  return (
    <>
      <form className='flex flex-col items-center justify-center gap-6'>
        <div className='flex w-[24.5rem] flex-col items-center justify-center gap-3'>
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
        <SubmitButton isActived={isActived} value='로그인' />
      </form>
      <button
        type='button'
        onClick={() => navigate('/signup')}
        className='cursor-pointer text-base font-medium text-gray-600'
      >
        회원가입
      </button>
    </>
  );
};

export default LoginForm;
