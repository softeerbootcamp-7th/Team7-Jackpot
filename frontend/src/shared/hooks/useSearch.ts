import { type ChangeEvent, useCallback, useEffect, useState } from 'react';

import { useSearchParams } from 'react-router';

import { useToastMessageContext } from '@/shared/hooks/toastMessage/useToastMessageContext';
import { validateSearchKeyword } from '@/shared/utils/validation';

interface UseSearchProps<T> {
  queryKey?: string;
  pageKey?: string;
  fetchAction?: (keyword: string, page: number) => Promise<T>;
  isEnabled?: boolean;
}

export const useSearch = <T>({
  queryKey = 'keyword',
  pageKey = 'page',
  fetchAction,
  isEnabled = true,
}: UseSearchProps<T> = {}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { showToast } = useToastMessageContext();

  const currentQueryParam = searchParams.get(queryKey) || '';
  const currentPageParam = parseInt(searchParams.get(pageKey) || '1', 10);

  const initialKeyword = isEnabled ? currentQueryParam : '';
  const [keyword, setKeyword] = useState(initialKeyword);

  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isEnabled) {
      setKeyword('');
      return;
    }
    setKeyword((prevKeyword) => {
      if (prevKeyword !== currentQueryParam) {
        return currentQueryParam;
      }
      return prevKeyword;
    });
  }, [currentQueryParam, isEnabled]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  }, []);

  const handlePageChange = useCallback(
    (newPage: number) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        next.set(pageKey, newPage.toString());
        return next;
      });
    },
    [pageKey, setSearchParams],
  );

  useEffect(() => {
    if (!isEnabled) return;

    const timer = setTimeout(() => {
      const trimmedKeyword = keyword.trim();

      // 사용자가 검색어를 다 지웠을 때 URL 파라미터 삭제 & 데이터 초기화
      if (trimmedKeyword === '') {
        if (currentQueryParam !== '') {
          setSearchParams((prev) => {
            const next = new URLSearchParams(prev);
            next.delete(queryKey);
            next.delete(pageKey);
            return next;
          });
        }
        setData(null);
        return;
      }

      const { isValid, message } = validateSearchKeyword(trimmedKeyword);
      // 토스트 메시지 띄우기
      if (!isValid && message) {
        showToast(message);
        return;
      }

      if (currentQueryParam !== trimmedKeyword) {
        setSearchParams((prev) => {
          const next = new URLSearchParams(prev);
          next.set(queryKey, trimmedKeyword);
          next.set(pageKey, '1');
          return next;
        });
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [
    keyword,
    currentQueryParam,
    isEnabled,
    pageKey,
    queryKey,
    setSearchParams,
    showToast,
  ]);

  useEffect(() => {
    if (!isEnabled || !currentQueryParam || !fetchAction) {
      setData(null);
      return;
    }

    let isMounted = true;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await fetchAction(currentQueryParam, currentPageParam);
        if (isMounted) {
          setData(result);
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [currentQueryParam, currentPageParam, fetchAction, isEnabled]);

  return {
    keyword,
    handleChange,
    data,
    isLoading,
    page: currentPageParam,
    handlePageChange,
    currentQueryParam, // 부모에서 이 값을 기준으로 검색 결과 렌더링 여부 판단 가능
  };
};

export default useSearch;
