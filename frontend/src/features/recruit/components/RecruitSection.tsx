import { useState } from 'react';

import LabeledSelectInput from '@/shared/components/LabeledSelectInput';
import RecruitPeriodSelectInput from '@/shared/components/RecruitPeriodSelectInput';

export interface DropdownStateType {
  companyNameDropdown: boolean;
  jobPositionDropdown: boolean;
  yearDropdown: boolean;
  questionTypeDropdown: boolean;
}

const RecruitSection = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<DropdownStateType>({
    companyNameDropdown: false,
    jobPositionDropdown: false,
    yearDropdown: false,
    questionTypeDropdown: false,
  });
  const { contents, updateContents } = useCoverLetterState();

  return (
    <div>
      <LabeledSelectInput
        label='기업명'
        value={currentData.companyName}
        constantData={COMPANY_NAME_LIST}
        handleChange={(value) => updateContents(tabState, 'companyName', value)}
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
        constantData={JOB_POSITION_LIST}
        handleChange={(value) => updateContents(tabState, 'jobPosition', value)}
        handleDropdown={(isOpen) =>
          setIsDropdownOpen((prev) => ({
            ...prev,
            jobPositionDropdown: isOpen,
          }))
        }
        isOpen={isDropdownOpen.jobPositionDropdown}
        dropdownDirection='bottom'
      />
      <RecruitPeriodSelectInput
        label='채용 시기'
        yearValue={currentData.recruitPeriod.year}
        seasonValue={currentData.recruitPeriod.season}
        constantData={yearList}
        handleYearChange={(value) => updateContents(tabState, 'year', value)}
        handleSeasonChange={(value) =>
          updateContents(tabState, 'season', value)
        }
        handleDropdown={(isOpen) => {
          setIsDropdownOpen((prev) => ({
            ...prev,
            yearDropdown: isOpen,
          }));
        }}
        icon={<I.DropdownArrow isOpen={isDropdownOpen.yearDropdown} />}
        isOpen={isDropdownOpen.yearDropdown}
        dropdownDirection='bottom'
      />

      <LabeledSelectInput
        label='문항 유형'
        value={currentData.questionType}
        constantData={QUESTION_TYPE_LIST}
        handleChange={(value) =>
          updateContents(tabState, 'questionType', value)
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
  );
};

export default RecruitSection;
