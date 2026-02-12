import { useNavigate, useSearchParams } from 'react-router';

import LabelingResultHeader from '@/features/upload/components/LabelingResultHeader';
import LabelingResultItem from '@/features/upload/components/LabelingResultItem';

const LabelingResultSection = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const coverLetterParam = searchParams.get('coverLetterId');
  const currentId: number =
    coverLetterParam && ['1', '2', '3'].includes(coverLetterParam)
      ? Number(coverLetterParam)
      : 1;

  const hanldeNextStep = () => {
    navigate('/upload/complete', { replace: true });
  };
  const handleCoverLetterIdChange = (newId: number) => {
    setSearchParams({ coverLetterId: newId.toString() }, { replace: true });
  };
  return (
    <div className='flex flex-col gap-6'>
      <LabelingResultHeader nextStep={hanldeNextStep} />
      <LabelingResultItem
        tabState={currentId}
        setTabState={handleCoverLetterIdChange}
      />
    </div>
  );
};

export default LabelingResultSection;
