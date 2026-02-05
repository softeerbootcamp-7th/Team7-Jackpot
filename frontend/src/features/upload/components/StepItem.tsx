import StepInformation from '@/features/upload/components/StepInformation';
import { STEP_DATA } from '@/features/upload/constants/constantsInUploadPage';
import { UploadPageIcons as I } from '@/features/upload/icons';

interface StepItemProps {
  step: string;
}

const StepItem = ({ step }: StepItemProps) => {
  const generateStepIcon = () => {
    if (step === '1') return <I.FirstStepIcon />;
    else if (step === '2') return <I.SecondStepIcon />;
  };

  return (
    <div className='flex flex-col justify-center items-center gap-7 select-none'>
      <div className='relative w-[30.25rem] h-[9.375rem]'>
        <div className='absolute inset-0 z-0'>{generateStepIcon()}</div>
        <div className='absolute inset-0 z-10 flex select-none'>
          {['1', '2', '3'].map((each) => {
            const currentStepData = STEP_DATA[each];
            const CurrentIconComponent = currentStepData.Icon;
            return (
              <StepInformation
                key={each}
                className={`${currentStepData.className} ${each === step ? 'text-white' : 'text-gray-300'}`}
                icon={
                  CurrentIconComponent && (
                    <CurrentIconComponent
                      color={each === step ? 'white' : 'var(--color-gray-200)'}
                    />
                  )
                }
                step={currentStepData.step}
                name={currentStepData.name}
              />
            );
          })}
        </div>
      </div>
      <div className='flex flex-col text-center gap-1'>
        <div className='font-bold text-xl text-gray-600'>
          {STEP_DATA[step].loadingTitle}
        </div>
        <div className='font-normal text-base text-gray-400'>
          {STEP_DATA[step].loadingSubTitle}
        </div>
      </div>
    </div>
  );
};

export default StepItem;
