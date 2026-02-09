import Calendar from '@/features/recruit/components/Calendar';
import NewRecruitButton from '@/features/recruit/components/NewRecruitButton';
import { recruitHeaderText } from '@/features/recruit/constants';
import ContentHeader from '@/shared/components/ContentHeader';

const RecruitPage = () => {
  return (
    <div className='flex h-[calc(100vh-5.625rem)] w-full max-w-screen min-w-[1700px] flex-col px-75 pb-30'>
      <div className='flex flex-row items-center justify-between'>
        <ContentHeader {...recruitHeaderText} />
        <NewRecruitButton />
      </div>
      <div className='flex flex-row items-center justify-between'>
        <Calendar />
      </div>
    </div>
  );
};

export default RecruitPage;
