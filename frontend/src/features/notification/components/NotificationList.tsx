import NotificationItem from '@/features/notification/components/NotificationItem';
import {
  useGetAllNotification,
  useReadEachNotification,
} from '@/features/notification/hooks/useNotification';
import { useScrollTouchEndObserver } from '@/features/notification/hooks/useScrollTouchEndObserver';
import type { NotificationType } from '@/features/notification/types/notification';

interface NotificationListProps {
  handleDropdown: (isOpen: boolean) => void;
}

const NotificationList = ({ handleDropdown }: NotificationListProps) => {
  const {
    data: notificationListData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetAllNotification();
  const { mutateAsync: readEachNotification } = useReadEachNotification();
  const { targetRef } = useScrollTouchEndObserver({
    enabled: !!hasNextPage && !isFetchingNextPage,
    onIntersect: () => fetchNextPage(),
  });

  if (!notificationListData) return null;

  return (
    <>
      {notificationListData.pages.map((page, pageIndex) => (
        <div key={pageIndex}>
          {page.notifications.map((each: NotificationType) => (
            <button
              type='button'
              onClick={() => {
                readEachNotification(Number(each.id));
                handleDropdown(false);
              }}
              key={each.id}
              className='w-full cursor-pointer rounded-md py-[0.875rem] text-left text-[0.813rem] font-medium text-gray-700 hover:bg-gray-50'
            >
              <NotificationItem data={each} />
            </button>
          ))}
        </div>
      ))}
      <div ref={targetRef} className='flex h-4 items-center justify-center'>
        {isFetchingNextPage && <span>로딩 중...</span>}
      </div>
    </>
  );
};

export default NotificationList;
