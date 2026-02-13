import { useEffect } from 'react';

import type { RefObject } from 'react';

interface InfiniteScrollProps {
  sentinelRef: RefObject<HTMLElement | null>;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

const useInfiniteScroll = ({
  sentinelRef,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: InfiniteScrollProps) => {
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [sentinelRef, fetchNextPage, hasNextPage, isFetchingNextPage]);
};

export default useInfiniteScroll;
