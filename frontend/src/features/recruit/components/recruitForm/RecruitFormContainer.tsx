import { useEffect } from 'react';

import RecruitFormView from '@/features/recruit/components/recruitForm/RecruitFormView';
import {
  useCreateCoverLetter,
  useUpdateCoverLetter,
} from '@/features/recruit/hooks/queries/useCoverLetterMutation';
import { mapServerDataToFormData } from '@/features/recruit/utils';
import { DEFAULT_DATA } from '@/shared/constants/createCoverLetter';
import { useToastMessageContext } from '@/shared/hooks/toastMessage/useToastMessageContext';
import { useCoverLetter } from '@/shared/hooks/useCoverLetterQueries';
import { useRecruitForm } from '@/shared/hooks/useRecruitForm';

interface Props {
  recruitId?: number | null; // RecruitPage의 state(number | null)와 타입 일치
  onClose: () => void;
}

const RecruitFormContainer = ({ recruitId, onClose }: Props) => {
  // 1. 상세 데이터 조회 (recruitId가 있을 때만 enabled)
  const { data, isLoading } = useCoverLetter(recruitId || 0);
  const { showToast } = useToastMessageContext();

  // 2. 뮤테이션 훅
  const { mutateAsync: createCoverLetter, isPending: isCreating } =
    useCreateCoverLetter();
  const { mutateAsync: updateCoverLetter, isPending: isUpdating } =
    useUpdateCoverLetter();

  // 3. 폼 훅 초기화
  const { formData, handleChange, setFormData } = useRecruitForm(DEFAULT_DATA);

  // 4. 서버 데이터가 로드되면 폼 상태 동기화
  useEffect(() => {
    if (recruitId && data && data.coverLetterId === recruitId) {
      const mappedData = mapServerDataToFormData(data);
      setFormData(mappedData);
    } else if (!recruitId) {
      // 신규 등록 모드라면 초기값으로 리셋
      setFormData(DEFAULT_DATA);
    }
  }, [recruitId, data, setFormData]);

  // 5. 로딩 처리 (데이터 패칭 중일 때 깜빡임 방지용 로더)
  if (recruitId && isLoading) {
    return (
      <div className='flex h-full items-center justify-center text-gray-400'>
        불러오는 중...
      </div>
    );
  }

  // 6. 제출 핸들러
  const handleSubmit = async () => {
    try {
      if (recruitId) {
        // 수정 모드
        await updateCoverLetter({ coverLetterId: recruitId, ...formData });
        showToast('성공적으로 수정되었습니다.', true);
      } else {
        // 생성 모드
        await createCoverLetter(formData);
        showToast('새 공고가 등록되었습니다.', true);
      }

      onClose();
    } catch (error) {
      console.error('작업 실패:', error);
      showToast('저장에 실패했습니다. 다시 시도해주세요.', false);
    }
  };

  return (
    <RecruitFormView
      mode={recruitId ? 'EDIT' : 'CREATE'}
      formData={formData}
      isSubmitting={isCreating || isUpdating}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onClose={onClose}
    />
  );
};

export default RecruitFormContainer;
