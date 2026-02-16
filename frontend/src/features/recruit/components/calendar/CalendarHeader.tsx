import { memo } from 'react';

import { Link } from 'react-router';

import { PaginationIcon } from '@/shared/icons/PaginationIcons';
import { addMonths, formatYearMonth, subMonths } from '@/shared/utils/dates';

interface Props {
  day: Date;
}

const CalendarHeader = ({ day }: Props) => {
  // 1. 이전 달, 다음 달 날짜 객체 계산
  const prevDate = subMonths(day, 1);
  const nextDate = addMonths(day, 1);

  // 2. 화면에 표시할 텍스트
  const prevMonthText = formatYearMonth(prevDate);
  const currentMonthText = formatYearMonth(day);
  const nextMonthText = formatYearMonth(nextDate);

  // 3. URL 생성 헬퍼 함수 (YYYY/MM 형식)
  const createPath = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `/recruit/${year}/${month}`;
  };

  return (
    <div className='inline-flex items-center justify-center gap-14 self-stretch'>
      {/* 이전 달 텍스트 */}
      <div className='flex items-center justify-start gap-1'>
        <Link
          to={createPath(prevDate)}
          className='text-title-s justify-start text-center font-medium text-gray-300'
        >
          {prevMonthText}
        </Link>
      </div>

      {/* 중앙 컨트롤러 영역 */}
      <div className='flex items-center justify-start gap-5'>
        {/* 4. 이전 달 Link */}
        <Link
          to={createPath(prevDate)}
          className='flex items-center justify-center' // 스타일 유지를 위한 클래스 추가 (선택사항)
        >
          <PaginationIcon size={36} direction='left' />
        </Link>

        {/* 현재 월 표시 */}
        <div className='flex items-center justify-start gap-1'>
          <div className='text-headline-s justify-start text-center font-bold text-gray-950'>
            {currentMonthText}
          </div>
        </div>

        {/* 5. 다음 달 버튼 -> Link로 교체 */}
        <Link
          to={createPath(nextDate)}
          className='flex items-center justify-center'
        >
          <PaginationIcon size={36} direction='right' />
        </Link>
      </div>

      {/* 다음 달 텍스트 */}
      <div className='flex items-center justify-start gap-1'>
        <Link
          to={createPath(nextDate)}
          className='text-title-s justify-start text-center font-medium text-gray-300'
        >
          {nextMonthText}
        </Link>
      </div>
    </div>
  );
};

export default memo(CalendarHeader);
