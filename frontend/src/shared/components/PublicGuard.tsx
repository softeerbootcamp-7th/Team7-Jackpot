import { Navigate, Outlet } from 'react-router';

import { useAuth } from '@/features/auth/hooks/useAuth';

const PublicGuard = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null;

  if (isAuthenticated) {
    return <Navigate to='/home' replace />;
  }
  return <Outlet />;
};

export default PublicGuard;
