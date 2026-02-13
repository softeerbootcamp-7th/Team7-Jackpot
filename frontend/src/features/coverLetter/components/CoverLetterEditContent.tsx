import { useOutletContext } from 'react-router';

import CoverLetterReviewContent from '@/features/coverLetter/components/CoverLetterReviewContent';

type OutletContext = {
  id: number;
  isReviewActive: boolean;
  setIsReviewActive: (v: boolean) => void;
};

const CoverLetterEditContent = () => {
  const { isReviewActive, setIsReviewActive } =
    useOutletContext<OutletContext>();

  return (
    <CoverLetterReviewContent
      isReviewActive={isReviewActive}
      setIsReviewActive={setIsReviewActive}
    />
  );
};

export default CoverLetterEditContent;
