import { useState } from 'react';

import CoverLetterList from '@/components/upload/CoverLetterList';
import { UploadPageIcons as I } from '@/components/upload/icons';
import LabeledSelectInput from '@/components/upload/LabeledSelectInput';

import { RECRUIT_SEASON_LIST } from '@/constants/constantsInUploadPage';
import type {
  ContentItemType,
  ContentStateType,
  CoverLetterListProps,
  DropdownStateType,
} from '@/types/upload';
import { yearList } from '@/utils/upload/generateYearList';

// [윤종근] - 추후에 지울 예정인 UI 테스트만을 위한 임시 데이터라서 constants에 옮기지 않았습니다.
const COMPANY_NAME_LIST: string[] = ['현대자동차', '현대오토에버', '현대카드'];

// [윤종근] - 추후에 지울 예정인 UI 테스트만을 위한 임시 데이터라서 constants에 옮기지 않았습니다.
const QUESTION_TYPE_LIST: string[] = [
  '성장과정',
  '성장경험',
  '성장과정 및 갈등 해결 경험',
];

const SecondContentItem = ({ tabState, setTabState }: CoverLetterListProps) => {
  const [contents, setContents] = useState<ContentStateType>(
    [1, 2, 3].reduce(
      (acc, key) => ({
        ...acc,
        [key]: {
          companyName: '',
          jobPosition: '',
          recruitPeriod: {
            year: 2026,
            season: 'first',
          },
          questionType: '',
        },
      }),
      {},
    ),
  );

  const [isDropdownOpen, setIsDropdownOpen] = useState<DropdownStateType>({
    companyNameDropdown: false,
    yearDropdown: false,
    questionTypeDropdown: false,
  });

  const handleContentsCompanyName = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: number,
  ) => {
    const newValue = e.target.value;

    setContents((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        companyName: newValue,
      },
    }));
  };
  const handleContentsJobPosition = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: number,
  ) => {
    const newValue = e.target.value;

    setContents((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        jobPosition: newValue,
      },
    }));
  };
  const handleContentsQuestionType = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: number,
  ) => {
    const newValue = e.target.value;

    setContents((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        jobPosition: newValue,
      },
    }));
  };

  const handleContentChange = (
    key: number,
    field: keyof ContentItemType | 'year' | 'season',
    value: string | number,
  ) => {
    setContents((prev) => {
      const currentItem = prev[key];

      if (field === 'year' || field === 'season') {
        return {
          ...prev,
          [key]: {
            ...currentItem,
            recruitPeriod: {
              ...currentItem.recruitPeriod,
              [field]: value,
            },
          },
        };
      }
      return {
        ...prev,
        [key]: {
          ...currentItem,
          [field]: value,
        },
      };
    });
  };

  const currentData = contents[tabState];

  return (
    <div className='flex flex-col gap-6'>
      <CoverLetterList tabState={tabState} setTabState={setTabState} />
      <div className='flex gap-6'>
        <div className='flex-1'>
          <div className='flex flex-col gap-5 '>
            <div className='flex flex-col gap-3'>
              <div className='font-bold text-lg'>
                채용 시기 <span className='text-red-600'>*</span>
              </div>
              <div className='flex gap-2 items-center'>
                <div className='relative inline-block'>
                  <button
                    type='button'
                    className={`flex-1 flex items-center justify-between gap-6 bg-gray-50 px-5 py-[14px] relative ${isDropdownOpen.yearDropdown ? 'z-20' : 'z-0'} rounded-lg cursor-pointer`}
                    onClick={() =>
                      setIsDropdownOpen((prev) => ({
                        ...prev,
                        yearDropdown: !prev.yearDropdown,
                      }))
                    }
                  >
                    <div className='font-medium'>
                      {currentData.recruitPeriod.year}
                    </div>
                    <I.DropdownArrow isOpen={isDropdownOpen.yearDropdown} />
                  </button>

                  {isDropdownOpen.yearDropdown && (
                    <>
                      <div
                        className='fixed inset-0 z-10 cursor-default'
                        onClick={() =>
                          setIsDropdownOpen((prev) => ({
                            ...prev,
                            yearDropdown: false,
                          }))
                        }
                      />
                      <div className='absolute z-20 w-56 max-h-32 mt-2 rounded-lg bg-white shadow-lg overflow-y-scroll select-none'>
                        <div className='flex flex-col p-1 gap-1'>
                          {yearList.map((year) => (
                            <button
                              type='button'
                              onClick={() => {
                                handleContentChange(tabState, 'year', year);
                                setIsDropdownOpen((prev) => ({
                                  ...prev,
                                  yearDropdown: false,
                                }));
                              }}
                              key={year}
                              className='w-full text-left px-4 py-[14px] text-[13px] rounded-md text-gray-700 cursor-pointer font-medium hover:bg-gray-50 hover:text-gray-950 hover:font-bold focus:bg-gray-100 focus:text-gray-900 focus:outline-hidden'
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
                          checked={
                            currentData.recruitPeriod.season === each.season
                          }
                          onChange={() =>
                            handleContentChange(tabState, 'season', each.season)
                          }
                        />
                        <div
                          className={`flex justify-center rounded-md ${currentData.recruitPeriod.season === each.season ? 'bg-white' : ''} px-8 py-[10px]`}
                        >
                          <span
                            className={`${currentData.recruitPeriod.season === each.season ? 'font-bold text-gray-950' : 'text-gray-400'}`}
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
            <LabeledSelectInput
              label='기업명'
              value={currentData.companyName}
              constantData={COMPANY_NAME_LIST}
              handleChange={(value) =>
                handleContentChange(tabState, 'companyName', value)
              }
              handleDropdown={(isOpen) =>
                setIsDropdownOpen((prev) => ({
                  ...prev,
                  companyNameDropdown: isOpen,
                }))
              }
              isOpen={isDropdownOpen.companyNameDropdown}
              dropdownDirection='bottom'
            />
            <LabeledSelectInput
              label='직무명'
              value={currentData.jobPosition}
              handleChange={(value) =>
                handleContentChange(tabState, 'jobPosition', value)
              }
            />
            <LabeledSelectInput
              label='문항 유형'
              value={currentData.questionType}
              constantData={QUESTION_TYPE_LIST}
              handleChange={(value) =>
                handleContentChange(tabState, 'questionType', value)
              }
              handleDropdown={(isOpen) =>
                setIsDropdownOpen((prev) => ({
                  ...prev,
                  questionTypeDropdown: isOpen,
                }))
              }
              isOpen={isDropdownOpen.questionTypeDropdown}
              dropdownDirection='top'
            />
          </div>
        </div>
        <div className='flex-2'>
          <div>
            <div className='flex gap-3 items-center'>
              <div className='px-4 py-2 bg-gray-50 rounded-md text-gray-600 font-bold text-[15px] select-none'>
                1
              </div>
              <div className='font-bold text-lg text-gray-950'>
                인생에서 가장 누워서 자고 싶었던 경험은 무엇이고 어떻게
                극복하셨나요?
              </div>
            </div>
            <div className='flex flex-col gap-3 pl-13'>
              <div className='text-sm text-gray-400'>총 1,038자</div>
              <div className='text-sm text-gray-600'>대학 시절 ...</div>
            </div>
          </div>
          <div className='flex gap-5 justify-self-center'>
            <button className='rounded-[7px] bg-gray-50 p-2 cursor-pointer'>
              <I.LeftPaginationButtonIcon color='#D9D9D9' />
            </button>
            <div className='flex gap-[10px] font-bold text-lg select-none'>
              <div className='text-purple-500'>1</div>
              <div className='text-gray-400'>/</div>
              <div className='text-gray-400'>3</div>
            </div>
            <button className='rounded-[7px] bg-purple-50 p-2 cursor-pointer'>
              <I.RightPaginationButtonIcon color='var(--color-purple-200)' />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondContentItem;
