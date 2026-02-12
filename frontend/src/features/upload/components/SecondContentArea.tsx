import { useNavigate, useSearchParams } from 'react-router';

import SecondContentAreaHeader from '@/features/upload/components/SecondContentAreaHeader';
import SecondContentItem from '@/features/upload/components/SecondContentItem';

const SecondContentArea = () => {
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
      <SecondContentAreaHeader nextStep={hanldeNextStep} />
      <SecondContentItem
        tabState={currentId}
        setTabState={handleCoverLetterIdChange}
      />
    </div>
  );
};

export default SecondContentArea;
