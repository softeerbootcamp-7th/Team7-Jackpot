import { useEffect, useMemo, useState } from 'react';

interface LabeledSelectInputProps {
  label: string;
  value: string | number;
  constantData?: Record<string, string>[] | string[];
  handleChange: (value: string | number) => void;
  handleDropdown: (isOpen: boolean) => void;
  isOpen: boolean;
  dropdownDirection: 'top' | 'bottom';
}

const LabeledSelectInput = ({
  label,
  value,
  constantData = [],
  handleChange,
  handleDropdown,
  isOpen,
  dropdownDirection = 'bottom',
}: LabeledSelectInputProps) => {
  const hasDropdown = constantData.length > 0;
  const [debounceValue, setDebounceValue] = useState<string | number>(value);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setDebounceValue(value);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [value]);

  // 데이터가 커졌을 때를 대비하여 useMemo 적용
  const searchData = useMemo(() => {
    return constantData.filter((each) => {
      // 타입 내로잉
      const targetValue = typeof each === 'string' ? each : each.label;

      // boolean 값을 return 해야 filter가 동작
      return targetValue.includes(debounceValue.toString());
    });
  }, [constantData, debounceValue]);

  return (
    <div className='flex flex-col gap-3'>
      <div className='text-lg font-bold'>
        {label} <span className='text-red-600'>*</span>
      </div>

      <div className='relative inline-block'>
        <input
          type='text'
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          className={`relative w-full rounded-lg bg-gray-50 px-5 py-[0.875rem] focus:outline-none ${isOpen ? 'z-20' : 'z-0'}`}
          onClick={() => handleDropdown?.(!isOpen)}
        />
        {hasDropdown && isOpen && (
          <>
            <div
              className='fixed inset-0 z-10 cursor-default'
              onClick={() => handleDropdown(false)}
            />
            <div
              className={`absolute z-20 max-h-48 w-full overflow-y-scroll rounded-lg bg-white shadow-lg select-none ${dropdownDirection === 'top' ? 'bottom-full mb-2' : 'mt-2'}`}
            >
              <div className='flex flex-col gap-1 p-1'>
                {searchData &&
                  searchData.map((each, index) => {
                    const displayValue =
                      typeof each === 'string' ? each : each.label;
                    return (
                      <button
                        type='button'
                        onClick={() => {
                          handleChange(displayValue);
                          handleDropdown(false);
                        }}
                        key={index}
                        className='w-full cursor-pointer rounded-md px-4 py-[0.875rem] text-left text-[0.813rem] font-medium text-gray-700 hover:bg-gray-50 hover:font-bold hover:text-gray-950 focus:bg-gray-100 focus:text-gray-900 focus:outline-hidden'
                      >
                        {displayValue}
                      </button>
                    );
                  })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LabeledSelectInput;
