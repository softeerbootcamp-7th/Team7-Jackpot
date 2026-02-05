import { RECRUIT_SEASON_LIST } from '@/features/upload/constants/constantsInUploadPage';

interface RecruitPeriodSelectInputProps {
  label: string;
  yearValue: number;
  seasonValue: string;
  constantData?: number[];
  handleYearChange: (value: number) => void;
  handleSeasonChange: (value: string) => void;
  handleDropdown?: (isOpen: boolean) => void;
  isOpen?: boolean;
  dropdownDirection?: 'top' | 'bottom';
  icon?: React.ReactNode;
}

const RecruitPeriodSelectInput = ({
  label,
  yearValue,
  seasonValue,
  constantData = [],
  handleYearChange,
  handleSeasonChange,
  handleDropdown,
  isOpen,
  dropdownDirection = 'bottom',
  icon,
}: RecruitPeriodSelectInputProps) => {
  const hasDropdown = constantData.length > 0;

  return (
    <div className='flex flex-col gap-3'>
      <div className='font-bold text-lg'>
        {label} <span className='text-red-600'>*</span>
      </div>
      <div className='flex gap-2 items-center'>
        <div className='relative inline-block'>
          <button
            type='button'
            className={`flex-1 flex items-center justify-between gap-6 bg-gray-50 px-5 py-[0.875rem] relative ${isOpen ? 'z-20' : 'z-0'} rounded-lg cursor-pointer`}
            onClick={() => handleDropdown?.(!isOpen)}
          >
            <div className='font-medium'>{yearValue}</div>
            {icon}
          </button>

          {hasDropdown && isOpen && (
            <>
              <div
                className='fixed inset-0 z-10 cursor-default'
                onClick={() => handleDropdown?.(false)}
              />
              <div
                className={`absolute z-20 w-56 max-h-40 mt-2 rounded-lg bg-white shadow-lg overflow-y-scroll select-none ${dropdownDirection === 'top' ? 'bottom-full mb-2' : 'mt-2'}`}
              >
                <div className='flex flex-col p-1 gap-1'>
                  {constantData &&
                    constantData.map((year) => (
                      <button
                        type='button'
                        onClick={() => {
                          handleYearChange(year);
                          handleDropdown?.(false);
                        }}
                        key={year}
                        className='w-full text-left px-4 py-[0.875rem] text-[0.813rem] rounded-md text-gray-700 cursor-pointer font-medium hover:bg-gray-50 hover:text-gray-950 hover:font-bold focus:bg-gray-100 focus:text-gray-900 focus:outline-hidden'
                      >
                        {year}
                      </button>
                    ))}
                </div>
              </div>
            </>
          )}
        </div>
        <div className='flex-3 flex justify-between px-1 py-1 bg-gray-50 rounded-lg'>
          {RECRUIT_SEASON_LIST.map((each) => (
            <div key={each.season} className='flex-grow'>
              <label className='items-center cursor-pointer select-none'>
                <input
                  type='radio'
                  className='sr-only peer'
                  checked={seasonValue === each.season}
                  onChange={() => handleSeasonChange(each.season)}
                />
                <div
                  className={`flex justify-center rounded-md ${seasonValue === each.season ? 'bg-white' : ''} px-8 py-[0.625rem]`}
                >
                  <span
                    className={`${seasonValue === each.season ? 'font-bold text-gray-950' : 'text-gray-400'}`}
                  >
                    {each.label}
                  </span>
                </div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecruitPeriodSelectInput;
