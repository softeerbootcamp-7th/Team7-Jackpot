import ScheduleOverview from '@/features/home/components/ScheduleOverview';
import SummaryOverview from '@/features/home/components/SummaryOverview';
import CoverLetterOverview from '@/shared/components/CoverLetterOverview';
import RightArrow from '@/shared/icons/RightArrow';

// 박소민 px-75를 추가하여 일관된 콘텐츠가 보여지도록 구현하였습니다.

const HomePage = () => {
  return (
    <div className='flex min-h-[1390px] w-full justify-center overflow-hidden'>
      <div className='m-auto flex h-[86.875rem] min-w-[120rem] flex-col items-center justify-center space-y-4 px-75'>
        <img
          className='h-96 w-[82.5rem] rounded-2xl'
          src='/images/banner.png'
          alt='홈 화면 배너'
        />
        <SummaryOverview />
        <ScheduleOverview />
        <CoverLetterOverview button={<RightArrow />} len={6} />
      </div>
    </div>
  );
};

export default HomePage;
