import CalendarDay from '@/features/recruit/components/CalendarDay';
import { useCalendar } from '@/features/recruit/hooks/useCalendar';
import { weekList } from '@/shared/constants/dates';
import { PaginationIcon } from '@/shared/icons/PaginationIcons';
import { addMonths, formatYearMonth, subMonths } from '@/shared/utils/dates';

const Calendar = () => {
  // [박소민] TODO: 공고 연결 후에 selectedDate 붙이기
  // [박소민] TODO: 전체 리렌더링 되는 문제는?
  const { days, handlers, helpers } = useCalendar();

  const prevMonthText = formatYearMonth(subMonths(days[10]));
  const currentMonthText = formatYearMonth(days[10]);
  const nextMonthText = formatYearMonth(addMonths(days[10]));

  return (
    <div className='inline-flex flex-col items-center justify-center gap-6 self-stretch py-6'>
      <div className='inline-flex items-center justify-center gap-14 self-stretch'>
        <div className='flex items-center justify-start gap-1'>
          <div className='text-title-s justify-start text-center font-medium text-gray-300'>
            {prevMonthText}
          </div>
        </div>
        <div className='flex items-center justify-start gap-5'>
          <button type='button' onClick={handlers.handlePrevMonth}>
            <PaginationIcon size={36} direction='left' />
          </button>
          <div className='flex items-center justify-start gap-1'>
            <div className='text-headline-s justify-start text-center font-bold text-gray-950'>
              {currentMonthText}
            </div>
          </div>
          <button type='button' onClick={handlers.handleNextMonth}>
            <PaginationIcon size={36} direction='right' />
          </button>
        </div>
        <div className='flex items-center justify-start gap-1'>
          <div className='text-title-s justify-start text-center font-medium text-gray-300'>
            {nextMonthText}
          </div>
        </div>
      </div>
      <div className='flex flex-col items-start justify-start gap-3 self-stretch'>
        {/* 캘린더 영역 */}
        <div className='grid grid-cols-7'>
          {weekList.map((d) => (
            <div
              key={d}
              className='flex flex-1 items-end justify-center gap-2.5 px-3 py-1.5'
            >
              <div
                className={`text-title-s justify-center text-center font-medium ${d === '일' ? 'text-red-600' : 'text-gray-600'} `}
              >
                {d}
              </div>
            </div>
          ))}

          {days.map((date) => {
            return (
              <CalendarDay
                key={date.toString()}
                date={date}
                isSelected={helpers.isSelected(date)}
                isCurrentMonth={helpers.isCurrentMonth(date)}
                onClick={handlers.handleDateClick}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
