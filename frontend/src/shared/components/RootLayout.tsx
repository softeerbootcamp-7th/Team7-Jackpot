import { Outlet } from 'react-router';

import PageGlobalHeader from '@/shared/components/PageGlobalHeader';

const RootLayout = () => {
  return (
    <div>
      <PageGlobalHeader />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
