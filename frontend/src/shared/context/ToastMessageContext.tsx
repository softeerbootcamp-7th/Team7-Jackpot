import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import ToastMessage from '@/shared/components/ToastMessage';
import { useToastMessage } from '@/shared/hooks/toastMessage/useToastMessage';
import { useToastTimer } from '@/shared/hooks/toastMessage/useToastTimer';

interface ToastMessageContextType {
  showToast: (message: string, status?: boolean) => void;
  closeToast: () => void;
}

interface ToastMessageProviderProps {
  children: React.ReactNode;
}

interface ToastStateType {
  message: string;
  status: boolean;
  isVisible: boolean;
}

// 빈 전역 상태 정의
const ToastMessageContext = createContext<ToastMessageContextType | null>(null);

// Provider 정의
export const ToastMessageProvider = ({
  children,
}: ToastMessageProviderProps) => {
  const [toastState, setToastState] = useState<ToastStateType>({
    message: '',
    status: false,
    isVisible: false,
  });

  const showToast = useCallback((message: string, status: boolean = false) => {
    setToastState({
      message: message,
      status: status,
      isVisible: true,
    });
  }, []);

  const closeToast = useCallback(() => {
    setToastState((prev) => ({ ...prev, isVisible: false }));
  }, []);


  useToastMessage({ showToast: showToast });

  // 토스트 메시지가 켜진 후 3초 뒤에 꺼지도록 타이머 시작
  useToastTimer({
    isVisible: toastState.isVisible,
    closeToast: closeToast,
    duration: 3000,
  });

  return (
    <ToastMessageContext.Provider
      value={{
        showToast,
        closeToast,
      }}
    >
      {children}
      {toastState.isVisible && (
        <ToastMessage message={toastState.message} status={toastState.status} />
      )}
    </ToastMessageContext.Provider>
  );
};

// 외부에서 전역 상태를 꺼내쓸 수 있도록 커스텀 훅 제공
export const useToastMessageContext = () => {
  const context = useContext(ToastMessageContext);
  if (!context) throw new Error('토스트 메시지 전역 상태 문제 발생');
  return context;
};
