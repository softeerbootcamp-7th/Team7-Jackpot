import { formatDate } from '@/shared/utils/dates';

interface CalendarDayProps {
  date: Date;
  isSelected: boolean;
  isCurrentMonth: boolean;
  onClick: (date: Date) => void;
}

const CalendarDay = ({
  date,
  isSelected,
  isCurrentMonth,
  onClick,
}: CalendarDayProps) => {
  const getTextColor = () => {
    if (isSelected) return 'text-blue-600';
    if (isCurrentMonth) return 'text-gray-950';
    return 'text-gray-300';
  };

  return (
    <button
      type='button'
      onClick={() => onClick(date)}
      className={`inline-flex h-32 w-32 flex-col items-start justify-start gap-3.5 rounded-lg p-[5px]`}
    >
      <div className='inline-flex items-center justify-start self-stretch'>
        <div className='flex flex-1 items-center justify-start gap-2.5'>
          <div
            className={`${isSelected ? 'bg-blue-50' : ''} inline-flex h-10 w-10 flex-col items-center justify-center gap-2.5 rounded-md px-2 py-1.5`}
          >
            <div
              className={`${getTextColor()} text-title-s h-7 w-6 justify-start text-center font-bold`}
            >
              {formatDate(date)}
            </div>
          </div>
        </div>
      </div>
      {/*[박소민] TODO: API 연결 후 공고가 있다면 여기에 넣기*/}
      <div className='flex flex-col items-start justify-start gap-1 self-stretch'>
        {}
      </div>
    </button>
  );
};

export default CalendarDay;
