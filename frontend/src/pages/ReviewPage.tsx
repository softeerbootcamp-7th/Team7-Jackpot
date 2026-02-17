import { Suspense, useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router';

import { useAuth } from '@/features/auth/hooks/useAuth';
import ReviewLayout from '@/features/review/components/ReviewLayout';
import { reviewHeaderText } from '@/features/review/constants';
import ContentHeader from '@/shared/components/ContentHeader';
import ErrorBoundary from '@/shared/components/ErrorBoundary';
import SectionError from '@/shared/components/SectionError';
import { useToastMessageContext } from '@/shared/hooks/toastMessage/useToastMessageContext';

const ReviewPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToastMessageContext();

  useEffect(() => {
    if (!isAuthenticated) {
      showToast('로그인이 필요한 페이지입니다.', false);
      navigate(
        `/login?redirect=${encodeURIComponent(
          location.pathname + location.search,
        )}`,
        { replace: true },
      );
    }
  }, [
    isAuthenticated,
    navigate,
    location.pathname,
    location.search,
    showToast,
  ]);

  if (!isAuthenticated) return null;

  return (
    <div className='flex h-[calc(100vh-6.25rem)] w-full min-w-[1700px] flex-col px-75'>
      <ContentHeader {...reviewHeaderText} />

      <ErrorBoundary
        fallback={(resetErrorBoundary) => (
          <SectionError
            text='데이터를 불러오는 중 오류가 발생했습니다.'
            onRetry={resetErrorBoundary}
          />
        )}
      >
        <Suspense
          fallback={
            <div className='flex flex-1 items-center justify-center'>
              <span className='text-gray-400'>데이터를 불러오는 중...</span>
            </div>
          }
        >
          <ReviewLayout />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default ReviewPage;
