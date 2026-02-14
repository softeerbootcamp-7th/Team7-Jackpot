import { useEffect, useMemo, useState } from 'react';

// 1. 제네릭 T 정의 (string 또는 number만 가능)
interface LabeledSelectInputProps<T extends string | number> {
  label: string;
  value: T; // value가 string이면 T는 string이 됨
  constantData?: T[]; // 드롭다운 데이터도 T 배열
  handleChange: (value: T) => void; // 핸들러도 T를 받음
  handleDropdown: (isOpen: boolean) => void;
  isOpen: boolean;
  dropdownDirection: 'top' | 'bottom';
}

const LabeledSelectInput = <T extends string | number>({
  label,
  value,
  constantData = [],
  handleChange,
  handleDropdown,
  isOpen,
  dropdownDirection = 'bottom',
}: LabeledSelectInputProps<T>) => {
  const hasDropdown = constantData.length > 0;

  // 디바운스용 상태 (초기값 타입 맞춤)
  const [debounceValue, setDebounceValue] = useState<T>(value);

  // 2. input 값 변경 시 value 업데이트
  useEffect(() => {
    // 외부에서 value가 바뀌면 내부 상태도 동기화 (디바운스 전 즉시 반영이 필요하다면)
    setDebounceValue(value);
  }, [value]);

  /* [중요] 입력창(input)은 항상 string을 반환합니다.
     만약 T가 number라면 숫자로 변환해서 부모에게 올려줘야 합니다.
  */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // 현재 value의 타입이 number라면, 입력값도 number로 변환
    if (typeof value === 'number') {
      handleChange(Number(inputValue) as T);
    } else {
      handleChange(inputValue as T);
    }

    // 디바운스 처리는 useEffect에서 value 기준 혹은 여기서 별도 처리
    // (기존 코드 로직 유지: value가 바뀌면 useEffect가 돌면서 debounceValue 업데이트)
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setDebounceValue(value);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [value]);

  // 3. 필터링 로직 (타입 안전하게 변환)
  const searchData = useMemo(
    () =>
      constantData.filter((each) =>
        String(each).includes(String(debounceValue)),
      ),
    [constantData, debounceValue],
  );

  return (
    <div className='flex flex-col gap-3'>
      <div className='text-lg font-bold'>
        {label} <span className='text-red-600'>*</span>
      </div>

      <div className='relative inline-block'>
        <input
          type='text'
          value={String(value)} // input value는 항상 string이어야 함
          onChange={handleInputChange} // 수정된 핸들러 사용
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
                  searchData.map((item, index) => (
                    <button
                      type='button'
                      // item은 이미 T 타입이므로 그대로 전달 가능
                      onClick={() => {
                        handleChange(item);
                        handleDropdown(false);
                      }}
                      key={index}
                      className='w-full cursor-pointer rounded-md px-4 py-[0.875rem] text-left text-[0.813rem] font-medium text-gray-700 hover:bg-gray-50 hover:font-bold hover:text-gray-950 focus:bg-gray-100 focus:text-gray-900 focus:outline-hidden'
                    >
                      {item}
                    </button>
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LabeledSelectInput;
