import { Outlet } from 'react-router';

import PageGlobalHeader from './PageGlobalHeader';

const RootLayout = () => {
  return (
    <div className=''>
      <PageGlobalHeader />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
