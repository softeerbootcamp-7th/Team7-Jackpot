import MyApplicationCalendar from './MyApplicationCalendar';
import UpcomingSchedules from './UpcomingSchedules';

const ScheduleOverview = () => {
  return (
    <div className='inline-flex w-[82.5rem] items-center justify-start gap-16'>
      <MyApplicationCalendar />
      <UpcomingSchedules />
    </div>
  );
};

export default ScheduleOverview;
