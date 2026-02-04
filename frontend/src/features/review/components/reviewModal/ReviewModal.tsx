import { useState } from 'react';

import CommentTab from '@/features/review/components/reviewModal/CommentTab';
import RevisionTab from '@/features/review/components/reviewModal/RevisionTab';
import TabSelector from '@/features/review/components/reviewModal/TabSelector';

type TabType = 'revision' | 'comment';

const MAX_COMMENT_LENGTH = 200;

interface ReviewModalProps {
  selectedText: string;
  onSubmit: (revision: string, comment: string) => void;
  onCancel: () => void;
  initialRevision?: string;
  initialComment?: string;
}

const ReviewModal = ({
  selectedText,
  onSubmit,
  onCancel,
  initialRevision = '',
  initialComment = '',
}: ReviewModalProps) => {
  const [revision, setRevision] = useState(initialRevision);
  const [comment, setComment] = useState(initialComment);
  const [tab, setTab] = useState<TabType>('revision');

  const isSubmitEnabled =
    revision.trim().length > 0 || comment.trim().length > 0;

  const handleSubmit = () => {
    if (!isSubmitEnabled) return;
    onSubmit(revision, comment);
  };

  const displayText = revision.trim().length > 0 ? revision : selectedText;

  return (
    <div className='w-96 p-5 bg-white rounded-[32px] shadow-[0px_0px_30px_0px_rgba(41,41,41,0.06)] flex flex-col items-end gap-4'>
      <div className='w-full flex flex-col items-start gap-2'>
        <TabSelector tab={tab} onTabChange={setTab} />

        {tab === 'revision' && (
          <RevisionTab revision={revision} onRevisionChange={setRevision} />
        )}

        {tab === 'comment' && (
          <CommentTab
            displayText={displayText}
            comment={comment}
            onCommentChange={setComment}
          />
        )}
      </div>

      <div className='flex items-start gap-2.5'>
        <button
          onClick={onCancel}
          className='px-4 py-2 text-gray-600 text-sm font-normal leading-6 font-["Pretendard"] rounded-xl hover:bg-gray-50'
        >
          취소
        </button>
        <button
          onClick={handleSubmit}
          disabled={!isSubmitEnabled || comment.length > MAX_COMMENT_LENGTH}
          className={`px-4 py-2 rounded-xl text-base font-bold leading-6 font-["Pretendard"] ${
            isSubmitEnabled && comment.length <= MAX_COMMENT_LENGTH
              ? 'bg-gray-950 text-white'
              : 'bg-gray-200 text-gray-400'
          }`}
        >
          등록하기
        </button>
      </div>
    </div>
  );
};

export default ReviewModal;
