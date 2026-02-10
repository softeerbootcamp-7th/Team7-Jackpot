import MyApplicationCalendarDay from '@/features/home/components/MyApplicationCalendarDay';
import { useMyApplicationCalendar } from '@/features/home/hooks/useMyApplicationCalendar';
import CalendarIcon from '@/features/home/icons/CalendarIcon';
import { weekList } from '@/shared/constants/dates';
import RightArrow from '@/shared/icons/RightArrow';
import type { Day } from '@/shared/types/date';

const dayColorMap: Partial<Record<Day, string>> = {
  일: 'text-rose-400',
  토: 'text-blue-500',
};

const MyApplicationCalendar = () => {
  const { days, isPastDay, hasApplication } = useMyApplicationCalendar();

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
      <div className='flex flex-col items-start justify-start gap-1 self-stretch'>
        <div className='inline-flex items-center justify-between self-stretch'>
          {weekList.map((d) => (
            <div
              key={d}
              className='inline-flex h-12 w-12 flex-col items-center justify-center rounded-[125px] px-4 py-1'
            >
              <div
                className={`h-5 w-6 justify-center text-center text-xl leading-4 font-normal ${dayColorMap[d] || 'text-gray-950'}`}
              >
                {d}
              </div>
            </div>
          ))}
        </div>
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
    </div>
  );
};

export default MyApplicationCalendar;
