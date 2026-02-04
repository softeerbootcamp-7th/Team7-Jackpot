import type { ReactNode } from 'react';

interface SidebarLayoutProps {
  headerSlot: ReactNode;
  sidebarSlot: ReactNode | boolean;
  children: ReactNode;
}

const SidebarLayout = ({
  headerSlot,
  sidebarSlot,
  children,
}: SidebarLayoutProps) => {
  return (
    <div className='flex h-screen w-full max-w-screen min-w-[1700px] flex-col overflow-hidden px-75'>
      <div className='flex-none'>{headerSlot}</div>
      <div className='flex min-h-0 w-full flex-1 flex-row'>
        {typeof sidebarSlot !== typeof false && (
          <aside className='h-full w-[427px] flex-none'>{sidebarSlot}</aside>
        )}
        <main className='h-full flex-1'>{children}</main>
      </div>
    </div>
  );
};

export default SidebarLayout;
