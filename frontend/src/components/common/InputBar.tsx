export interface InputBarProps {
  type: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  rightElement?: React.ReactNode;
}

const InputBar = ({
  type,
  placeholder,
  onChange,
  rightElement,
}: InputBarProps) => {
  return (
    <div className='relative w-full'>
      <input
        className='w-full bg-gray-50 px-5 py-[0.875rem] rounded-lg'
        type={type}
        placeholder={placeholder}
        onChange={onChange}
      />
      {rightElement && (
        <div className='absolute right-[0.75rem] top-1/2 -translate-y-1/2'>
          {rightElement}
        </div>
      )}
    </div>
  );
};

export default InputBar;
