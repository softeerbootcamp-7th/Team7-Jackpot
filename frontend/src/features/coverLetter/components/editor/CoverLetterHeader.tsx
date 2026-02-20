import { useEffect, useMemo, useState } from 'react';

import type { CoverLetterType } from '@/shared/types/coverLetter';
import { mapApplyHalf } from '@/shared/utils/recruitSeason';

interface CoverLetterHeaderProps {
  coverLetter: CoverLetterType;
  totalPages: number;
  modifiedAt?: string;
  isSaving?: boolean;
  textUpdatedAt?: string;
  isReviewActive?: boolean;
}

const CoverLetterHeader = ({
  coverLetter,
  totalPages,
  modifiedAt,
  isSaving = false,
  textUpdatedAt,
  isReviewActive = false,
}: CoverLetterHeaderProps) => {
  const [lastKnownModifiedAt, setLastKnownModifiedAt] = useState<string | null>(
    () => (modifiedAt ? modifiedAt : null),
  );
  const [savingStartedAt, setSavingStartedAt] = useState<Date | null>(null);

  useEffect(() => {
    if (!modifiedAt) return;
    setLastKnownModifiedAt(modifiedAt);
  }, [modifiedAt]);

  useEffect(() => {
    if (isSaving) {
      setSavingStartedAt(new Date());
      return;
    }
    setSavingStartedAt(null);
  }, [isSaving]);

  useEffect(() => {
    if (!isReviewActive) return;
    if (modifiedAt || textUpdatedAt || lastKnownModifiedAt) return;
    setLastKnownModifiedAt(new Date().toISOString());
  }, [isReviewActive, modifiedAt, textUpdatedAt, lastKnownModifiedAt]);

  const modifiedDisplay = useMemo(() => {
    const sourceRaw = modifiedAt ?? textUpdatedAt ?? lastKnownModifiedAt;
    const source = sourceRaw ? new Date(sourceRaw) : savingStartedAt;
    if (!source || Number.isNaN(source.getTime())) return null;

    return source.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  }, [modifiedAt, textUpdatedAt, lastKnownModifiedAt, savingStartedAt]);

  return (
    <div className='flex flex-shrink-0 flex-col gap-0.5 pb-2 pl-2'>
      <div className='line-clamp-1 text-xl leading-9 font-bold'>
        {coverLetter.applyYear}년 {mapApplyHalf(coverLetter.applyHalf)}
      </div>
      <div className='flex gap-1 text-sm text-gray-400'>
        <span>총 {totalPages}문항</span>
        <span>·</span>
        <span>
          {new Date(coverLetter.deadline).toLocaleDateString('ko-KR')}
        </span>
        {modifiedDisplay && (
          <>
            <span>·</span>
            <span>최종수정 {modifiedDisplay}</span>
          </>
        )}
      </div>
    </div>
  );
};

export default CoverLetterHeader;
