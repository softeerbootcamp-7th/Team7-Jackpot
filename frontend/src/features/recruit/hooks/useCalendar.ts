import { useCallback, useMemo, useState } from 'react';

import { useDataGrid } from '@/shared/hooks/useDataGrid';
import {
  addMonths,
  getMonthRange,
  isSameDay,
  subMonths,
} from '@/shared/utils/dates';

export const useCalendar = () => {
  // [박소민] 이거 왜 굳이 이렇게 두번씩 new Date()를 만들어야 할까?
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { startDate, endDate } = useMemo(() => {
    return getMonthRange(currentDate);
  }, [currentDate]);

  const days = useDataGrid(startDate, endDate);

  const handleNextMonth = useCallback(() => {
    setCurrentDate((prev) => addMonths(prev, 1));
  }, []);

  const handlePrevMonth = useCallback(() => {
    setCurrentDate((prev) => subMonths(prev, 1));
  }, []);

  const handleDateClick = useCallback((date: Date) => {
    setSelectedDate(date);
    setCurrentDate(date);
  }, []);

  return {
    currentDate,
    selectedDate,
    days,
    handlers: {
      handleNextMonth,
      handlePrevMonth,
      handleDateClick,
    },
    helpers: {
      isSelected: (date: Date) => isSameDay(date, selectedDate),
      isCurrentMonth: (date: Date) =>
        date.getMonth() === currentDate.getMonth(),
    },
  };
};
