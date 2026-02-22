import { useNavigate, useParams } from 'react-router';

import { useLabeledQnAList } from '@/features/notification/hooks/useNotification';
import LabelingResultHeader from '@/features/upload/components/LabelingResultHeader';
import LabelingResultItem from '@/features/upload/components/LabelingResultItem';
import useCoverLetterState from '@/features/upload/hooks/useCoverLetterState';

const LabelingResultSection = () => {
  const navigate = useNavigate();
  const { jobId, coverLetterIndex, qnAIndex } = useParams<{
    jobId: string;
    coverLetterIndex: string;
    qnAIndex: string;
  }>();

  // NaN || 0 -> 0 (비숫자 입력에 대한 방어 처리)
  // 인덱스 파싱 (기본값 0)
  const currentCoverLetterIdx: number = Number(coverLetterIndex) || 0;
  const currentQnAIdx: number = Number(qnAIndex) || 0;

  const { data: labeledData, isLoading } = useLabeledQnAList(jobId!);
  const { contents, updateContents } = useCoverLetterState();

  const handleNextStep = () => {
    navigate('/upload/complete', { replace: true });
  };

  const handleCoverLetterIdxChange = (newIdx: number) =>
    navigate(`/upload/labeling/${jobId}/${newIdx}/0`, { replace: true });

  const handleQnAIdxChange = (newIdx: number) =>
    navigate(`/upload/labeling/${jobId}/${currentCoverLetterIdx}/${newIdx}`, {
      replace: true,
    });

  if (isLoading) {
    return <div>라벨링 결과를 불러오는 중입니다...</div>;
  }

  if (!labeledData) {
    return <div>데이터를 찾을 수 없습니다.</div>;
  }
  const currentCoverLetter = labeledData?.coverLetters?.[currentCoverLetterIdx];
  const qnACount = currentCoverLetter?.qnAs?.length ?? 0;

  return (
    <div className='flex flex-col gap-6'>
      <LabelingResultHeader
        nextStep={handleNextStep}
        tabState={coverLetterIndex}
        data={labeledData}
        qnACount={qnACount}
        contents={contents}
      />
      <LabelingResultItem
        tabState={currentCoverLetterIdx}
        setTabState={handleCoverLetterIdxChange}
        qnAState={currentQnAIdx}
        setQnAState={handleQnAIdxChange}
        data={labeledData}
        contents={contents}
        updateContents={updateContents}
      />
    </div>
  );
};

export default LabelingResultSection;
