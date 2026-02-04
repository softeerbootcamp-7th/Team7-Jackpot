const MAX_COMMENT_LENGTH = 200;

interface CommentTabProps {
  displayText: string;
  comment: string;
  onCommentChange: (value: string) => void;
}

const CommentTab = ({
  displayText,
  comment,
  onCommentChange,
}: CommentTabProps) => {
  return (
    <>
      <div className='w-full px-5 py-4 rounded-2xl border border-gray-200 flex items-center'>
        <div className='w-full text-gray-600 text-sm font-normal leading-6 font-["Pretendard"]'>
          {displayText}
        </div>
      </div>

      <div className='w-full px-5 py-4 bg-gray-100 rounded-2xl flex flex-col items-start gap-2'>
        <textarea
          autoFocus
          value={comment}
          onChange={(e) => onCommentChange(e.target.value)}
          placeholder='첨삭하신 내용에 덧붙일 코멘트가 있다면 알려주세요'
          className='w-full min-h-11 resize-none outline-none text-sm leading-6 font-["Pretendard"] text-gray-900 placeholder-gray-400'
        />
        <div className='w-full flex justify-end items-center gap-0.5'>
          <span
            className={`text-xs leading-5 font-["Pretendard"] ${
              comment.length > MAX_COMMENT_LENGTH
                ? 'text-red-500'
                : 'text-gray-400'
            }`}
          >
            {comment.length}
          </span>
          <span className='text-gray-400 text-xs leading-5 font-["Pretendard"]'>
            /
          </span>
          <span className='text-gray-400 text-xs leading-5 font-["Pretendard"]'>
            {MAX_COMMENT_LENGTH}
          </span>
        </div>
      </div>
    </>
  );
};

export default CommentTab;
