import { useEffect } from 'react';

import { useNavigate } from 'react-router';

import AuthLayout from '@/features/auth/components/AuthLayout';
import LoginForm from '@/features/auth/components/LoginForm';
import { SUB_TITLE } from '@/features/auth/constants/constantsInLoginPage';
import { useAuth } from '@/features/auth/hooks/useAuth';

const LoginPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home', { replace: true });
    }
  }, [isAuthenticated, navigate]);
  return (
    <AuthLayout subTitle={SUB_TITLE} subTitleColor='text-gray-600'>
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;
