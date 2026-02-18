import { Navigate, Outlet } from 'react-router';

import { useAuth } from '@/features/auth/hooks/useAuth';

const PrivateGuard = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null;

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }
  return <Outlet />;
};

export default PrivateGuard;
