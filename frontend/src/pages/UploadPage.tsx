import { Outlet, useLocation } from 'react-router';

import StepItem from '@/features/upload/components/StepItem';
import UploadPageHeader from '@/features/upload/components/UploadPageHeader';

const UploadPage = () => {
  const location = useLocation();

  const getCurrentStep = () => {
    if (location.pathname.includes('labeling')) return 2;
    if (location.pathname.includes('complete')) return 3;
    return 1;
  };

  const currentStep = getCurrentStep();
  return (
    <div>
      <div className='mb-12 px-75'>
        <div className='mb-12'>
          <UploadPageHeader />
          <StepItem step={currentStep.toString()} />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default UploadPage;
