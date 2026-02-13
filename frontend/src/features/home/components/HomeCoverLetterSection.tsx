import { useRecentCoverLetters } from '@/features/home/hooks/useHomeQueries';
import CoverLetterOverview from '@/shared/components/CoverLetterOverview';
import RightArrow from '@/shared/icons/RightArrow';

const HomeCoverLetterSection = () => {
  const { data } = useRecentCoverLetters(6);

  return (
    <CoverLetterOverview
      button={<RightArrow />}
      coverLetters={data.coverLetters}
      isHome
    />
  );
};

export default HomeCoverLetterSection;
