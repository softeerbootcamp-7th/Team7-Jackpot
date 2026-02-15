import { useCallback, useMemo } from 'react';

import { useParams } from 'react-router';

import { useDataGrid } from '@/shared/hooks/useDataGrid';
import { getMonthRange, isSameDay } from '@/shared/utils/dates';

export const useCalendar = () => {
  const { year, month, day } = useParams();

  const today = useMemo(() => new Date(), []);

  const parseNumberParam = (value?: string) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : undefined;
  };

  const yearNum = parseNumberParam(year) ?? today.getFullYear();
  const monthNum = parseNumberParam(month) ?? today.getMonth() + 1;
  const dayNum = parseNumberParam(day);

  const currentDate = useMemo(() => {
    const safeMonth = Math.min(Math.max(monthNum, 1), 12);
    const safeDay = dayNum ? Math.min(Math.max(dayNum, 1), 31) : 1;
    return new Date(yearNum, safeMonth - 1, safeDay);
  }, [yearNum, monthNum, dayNum]);

  const selectedDate = useMemo(() => {
    if (!dayNum) return null;
    const safeMonth = Math.min(Math.max(monthNum, 1), 12);
    const safeDay = Math.min(Math.max(dayNum, 1), 31);
    return new Date(yearNum, safeMonth - 1, safeDay);
  }, [yearNum, monthNum, dayNum]);

  const { startDate, endDate } = useMemo(() => {
    return getMonthRange(currentDate);
  }, [currentDate]);

  const days = useDataGrid(startDate, endDate);

  // 1. 헬퍼 함수들을 useCallback으로 개별 정의
  const isSelected = useCallback(
    (date: Date) => (selectedDate ? isSameDay(date, selectedDate) : false),
    [selectedDate],
  );

  const isCurrentMonth = useCallback(
    (date: Date) =>
      date.getFullYear() === currentDate.getFullYear() &&
      date.getMonth() === currentDate.getMonth(),
    [currentDate],
  );

  // 2. 헬퍼 객체 메모이제이션
  const helpers = useMemo(
    () => ({
      isSelected,
      isCurrentMonth,
    }),
    [isSelected, isCurrentMonth],
  );

  return {
    currentDate,
    today,
    startDate,
    endDate,
    selectedDate,
    days,
    helpers,
  };
};
