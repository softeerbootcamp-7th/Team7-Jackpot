import { Outlet, useLocation } from 'react-router';

import StepItem from '@/features/upload/components/StepItem';
import UploadLayoutHeader from '@/features/upload/components/UploadLayoutHeader';

const UploadPage = () => {
  const location = useLocation();

  // [윤종근] - 팀원들과 라우팅 설정 방식 변경 상의 필요
  // useBlocker를 사용하려면 최신에 추가된 createBrowserRouter & RouterProvider 방식(Data Router)으로 마이그레이션 필요
  // const blocker = useBlocker(
  //   ({ currentLocation, nextLocation }) =>
  //     currentLocation.pathname !== nextLocation.pathname &&
  //     !nextLocation.pathname.startsWith('/upload'),
  // );

  // useEffect(() => {
  //   if (blocker.state === 'blocked') {
  //     const confirmLeave = window.confirm(
  //       '이 페이지를 벗어나면 작성 중인 데이터가 사라집니다. 정말 이동하시겠습니까?',
  //     );
  //     if (confirmLeave) {
  //       blocker.proceed();
  //     } else {
  //       blocker.reset();
  //     }
  //   }
  // }, [blocker]);

  const getCurrentStep = () => {
    if (location.pathname.includes('labeling')) return 2;
    if (location.pathname.includes('complete')) return 3;
    return 1;
  };

  const currentStep = getCurrentStep();
  return (
    <div>
      <div className='mb-12 h-screen px-75 select-none'>
        <div className='mb-12'>
          <UploadLayoutHeader />
          <StepItem step={currentStep.toString()} />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default UploadPage;
