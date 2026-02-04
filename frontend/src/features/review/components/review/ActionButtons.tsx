const ActionButtons = ({
  reviewId,
  handleEditReview,
}: {
  reviewId: string;
  handleEditReview: (index: string) => void;
}) => (
  <div className='flex items-center gap-2'>
    <button className='px-3 py-1.5 rounded-xl'>
      <span className='text-sm font-medium leading-5 text-red-500'>
        삭제하기
      </span>
    </button>
    <button
      className='px-3 py-1.5 bg-gray-950 rounded-xl'
      onClick={() => handleEditReview(reviewId)}
    >
      <span className='text-sm font-bold leading-5 text-white'>수정하기</span>
    </button>
  </div>
);

export default ActionButtons;
