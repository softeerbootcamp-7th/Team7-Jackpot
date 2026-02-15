import { useEffect } from 'react';

import { Outlet, useLocation, useNavigate } from 'react-router';

import StepItem from '@/features/upload/components/StepItem';
import UploadLayoutHeader from '@/features/upload/components/UploadLayoutHeader';

const UploadPage = () => {
  const location = useLocation();

  const navigate = useNavigate();

  // [브라우저 뒤로 가기] 방지
  useEffect(() => {
    // 현재 히스토리 상태를 확인하여 중복 push 방지
    // 'prevent-back'이라는 표식이 없다면 새로운 상태를 push (가짜 상태 넣기)
    if (window.history.state?.type !== 'prevent-back') {
      window.history.pushState(
        { type: 'prevent-back' },
        '',
        window.location.href,
      );
    }

    const handlePopState = () => {
      const confirmLeave = window.confirm(
        '이 페이지를 벗어나면 작성 중인 데이터가 사라집니다. 정말 이동하시겠습니까?',
      );

      if (confirmLeave) {
        // 확인 시:
        // 이미 뒤로가기 버튼을 눌러서 브라우저 포인터는 이전 페이지로 이동한 상태
        // 여기서 navigate(-1)을 하면 이전 페이지에서 한 칸 더 뒤인 원래 가려고 했던 곳으로 이동
        navigate(-1);
      } else {
        // 취소 시:
        // 다시 가짜 상태를 넣어 사용자를 현재 페이지에 머무르게 함
        window.history.pushState(
          { type: 'prevent-back' },
          '',
          window.location.href,
        );
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);

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
