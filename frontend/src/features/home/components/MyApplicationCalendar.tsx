import { useMemo } from 'react';

import { useCalendarDates } from '@/features/home/hooks/useHomeQueries';
import CalendarIcon from '@/features/home/icons/CalendarIcon';
import { weekList } from '@/shared/constants/dates';
import RightArrow from '@/shared/icons/RightArrow';
import { getISODate } from '@/shared/utils/dates';

const MyApplicationCalendar = () => {
  const { startDate, endDate } = useMemo(() => {
    const now = new Date();
    const currentDayOfWeek = now.getDay();

    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - currentDayOfWeek);

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 20);

    return {
      startDate: getISODate(weekStart),
      endDate: getISODate(weekEnd),
    };
  }, []);

  const { data } = useCalendarDates(startDate, endDate);

  const calendarDays = useMemo(() => {
    const now = new Date();
    const today = getISODate(now);

    const currentDayOfWeek = now.getDay();
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - currentDayOfWeek);

    const days = [];

    for (let i = 0; i < 21; i++) {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + i);
      const dateString = getISODate(date);

      days.push({
        day: date.getDate(),
        isToday: dateString === today,
        isPast: dateString < today,
        date: dateString,
        dayOfWeek: date.getDay(),
      });
    }

    return days;
  }, []);

  const hasSchedule = (date: string) => {
    if (!data?.coverLetterDates || data.coverLetterDates.length === 0) {
      return false;
    }
    return data.coverLetterDates.includes(date);
  };

  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
  const weekDayColors = [
    'text-rose-400',
    'text-gray-950',
    'text-gray-950',
    'text-gray-950',
    'text-gray-950',
    'text-gray-950',
    'text-blue-500',
  ];

  const weeks = [];
  for (let i = 0; i < calendarDays.length; i += 7) {
    weeks.push(calendarDays.slice(i, i + 7));
  }

  return (
    <div className='inline-flex w-96 flex-col items-start justify-start gap-6'>
      <div className='inline-flex items-center justify-between self-stretch'>
        <div className='flex items-center justify-start gap-2.5'>
          <div className='h-7 w-7'>
            <CalendarIcon />
          </div>
          <div className='justify-start text-xl leading-9 font-bold text-gray-950'>
            나의 지원 캘린더
          </div>
        </div>
        <button type='button' aria-label='지원 캘린더 더보기'>
          <RightArrow size='lg' aria-hidden='true' />
        </button>
      </div>
      <button
        type='button'
        className='flex w-full flex-col items-start justify-start gap-1 self-stretch'
      >
        <div className='inline-flex items-center justify-between self-stretch'>
<<<<<<< HEAD
          {weekList.map((d) => (
            <div
              key={d}
              className='inline-flex h-12 w-12 flex-col items-center justify-center rounded-[125px] px-4 py-1'
            >
              <div
                className={`h-5 w-6 justify-center text-center text-xl leading-4 font-normal ${dayColorMap[d] || 'text-gray-950'}`}
              >
                {d}
=======
          {weekDays.map((day, index) => (
            <div
              key={day}
              className='inline-flex h-12 w-12 flex-col items-center justify-center rounded-[125px] px-4 py-1'
            >
              <div
                className={`h-5 w-6 justify-center text-center text-xl leading-4 font-normal ${weekDayColors[index]}`}
              >
                {day}
>>>>>>> fe
              </div>
            </div>
          ))}
        </div>
<<<<<<< HEAD
        {/* [박소민] TODO: 현재 전 날짜이면 회색, 현재 날짜이면 날짜가 동그라미, 마감일이 있다면 아래에 점표시 */}
        <div className='grid grid-cols-7 items-center justify-between self-stretch'>
          {days.map((d, idx) => (
            <MyApplicationCalendarDay
              key={idx}
              date={d}
              isPastDate={isPastDay(d)}
              hasApplication={hasApplication()}
            />
          ))}

          <div className='inline-flex h-12 w-12 flex-col items-center justify-end gap-1.5 rounded-2xl px-4 py-1 opacity-40'>
            <div className='h-5 w-6 justify-center text-center text-xl leading-4 font-normal text-gray-950 opacity-40'>
              2
            </div>
            <div className='h-[5px] w-[5px] rounded-full opacity-40' />
          </div>
          <div className='inline-flex h-12 w-12 flex-col items-center justify-end gap-1.5 rounded-2xl px-4 py-1 opacity-40'>
            <div className='h-5 w-6 justify-center text-center text-xl leading-4 font-normal text-gray-950 opacity-40'>
              3
            </div>
            <div className='h-[5px] w-[5px] rounded-full bg-gray-950 opacity-40' />
          </div>
          <div className='inline-flex h-12 w-12 flex-col items-center justify-end gap-1.5 rounded-2xl bg-purple-50 px-4 py-1'>
            <div className='h-5 w-6 justify-center text-center text-xl leading-4 font-semibold text-purple-500'>
              4
            </div>
            <div className='h-[5px] w-[5px] rounded-full' />
          </div>
          <div className='inline-flex h-12 w-12 flex-col items-center justify-end gap-1.5 rounded-2xl px-4 py-1'>
            <div className='h-5 w-6 justify-center text-center text-xl leading-4 font-normal text-gray-950'>
              5
            </div>
            <div className='h-[5px] w-[5px] rounded-full' />
          </div>
          <div className='inline-flex h-12 w-12 flex-col items-center justify-end gap-1.5 rounded-2xl px-4 py-1'>
            <div className='h-5 w-6 justify-center text-center text-xl leading-4 font-normal text-gray-950'>
              6
            </div>
            <div className='h-[5px] w-[5px] rounded-full' />
          </div>
        </div>
      </div>
=======

        {weeks.map((week, weekIndex) => (
          <div
            key={weekIndex}
            className='inline-flex items-center justify-between self-stretch'
          >
            {week.map((dayInfo, dayIndex) => {
              const isWeekend =
                dayInfo.dayOfWeek === 0 || dayInfo.dayOfWeek === 6;
              const dayColor = isWeekend
                ? dayInfo.dayOfWeek === 0
                  ? 'text-rose-400'
                  : 'text-blue-500'
                : 'text-gray-950';

              const schedule = hasSchedule(dayInfo.date);

              return (
                <div
                  key={`${weekIndex}-${dayIndex}`}
                  className={`inline-flex h-12 w-12 flex-col items-center justify-end gap-1.5 rounded-2xl px-4 py-1 ${
                    dayInfo.isToday ? 'bg-purple-50' : ''
                  }`}
                >
                  <div
                    className={`h-5 w-6 justify-center text-center text-xl leading-4 ${
                      dayInfo.isToday
                        ? 'font-semibold text-purple-500'
                        : `font-normal ${dayColor}`
                    } ${dayInfo.isPast ? 'opacity-40' : ''}`}
                  >
                    {dayInfo.day}
                  </div>
                  <div
                    className={`h-[5px] w-[5px] rounded-full ${
                      schedule
                        ? dayInfo.isPast
                          ? 'bg-gray-950 opacity-40'
                          : 'bg-purple-500'
                        : ''
                    }`}
                  />
                </div>
              );
            })}
          </div>
        ))}
      </button>
>>>>>>> fe
    </div>
  );
};

export default MyApplicationCalendar;
