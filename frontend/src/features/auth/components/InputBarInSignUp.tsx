import type { InputBarProps } from './InputBar';
import InputBar from './InputBar';

interface InputBarInSignUpProps extends InputBarProps {
  label: string;
  helpMessage?: string;
  isSuccess?: boolean;
}

const InputBarInSignUp = ({
  label,
  helpMessage,
  isSuccess = false,
  ...inputBarProps
}: InputBarInSignUpProps) => {
  const isError = helpMessage && !isSuccess;

  return (
    <div className='flex w-full flex-col gap-3'>
      <div className='flex gap-[0.125rem]'>
        <div className='text-lg font-bold text-gray-950'>{label}</div>
        <div className='text-red-600'>*</div>
      </div>

      <InputBar
        className={`border ${
          isError ? 'border-red-500' : 'border-transparent'
        }`}
        {...inputBarProps}
      />

      {helpMessage && (
        <p
          className={`mt-1 ps-1 text-xs ${
            isSuccess ? 'text-blue-500' : 'text-red-500'
          }`}
        >
          {helpMessage}
        </p>
      )}
    </div>
  );
};

export default InputBarInSignUp;
