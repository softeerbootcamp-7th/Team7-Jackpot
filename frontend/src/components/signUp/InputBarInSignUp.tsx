interface InputBarInSignUpProps {
  hintText: string;
  type: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputBarInSignUp = ({
  hintText,
  type,
  placeholder,
  onChange,
}: InputBarInSignUpProps) => {
  return (
    <div className='flex flex-col w-full gap-3'>
      <div className='flex gap-[2px]'>
        <div className='text-gray-950 font-bold text-lg'>{hintText}</div>
        <div className='text-red-600'>*</div>
      </div>
      <input
        className='w-full bg-gray-50 px-5 py-[14px] rounded-lg'
        type={type}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default InputBarInSignUp;
