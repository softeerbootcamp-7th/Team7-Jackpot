import { useNavigate, useSearchParams } from 'react-router';

import LabelingResultHeader from '@/features/upload/components/LabelingResultHeader';
import LabelingResultItem from '@/features/upload/components/LabelingResultItem';

const LabelingResultSection = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const coverLetterParam = searchParams.get('coverLetterId');
  const qnAParam = searchParams.get('qnAId');
  const currentCoverLetterId: number =
    coverLetterParam && ['1', '2', '3'].includes(coverLetterParam)
      ? Number(coverLetterParam)
      : 1;
  const currentQnAId: number = qnAParam ? Number(qnAParam) : 0;

  const hanldeNextStep = () => {
    navigate('/upload/complete', { replace: true });
  };
  const handleCoverLetterIdChange = (newId: number) => {
    setSearchParams(
      { coverLetterId: newId.toString(), qnAId: '0' },
      { replace: true },
    );
  };

  const handleQnAIdChange = (newId: number) => {
    setSearchParams({ qnAId: newId.toString() }, { replace: true });
  };

  return (
    <div className='flex flex-col gap-6'>
      <LabelingResultHeader nextStep={hanldeNextStep} />
      <LabelingResultItem
        tabState={currentCoverLetterId}
        setTabState={handleCoverLetterIdChange}
        qnAState={currentQnAId}
        setQnAState={handleQnAIdChange}
      />
    </div>
  );
};

export default LabelingResultSection;
