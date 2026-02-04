interface RevisionTabProps {
  revision: string;
  onRevisionChange: (value: string) => void;
}

const RevisionTab = ({ revision, onRevisionChange }: RevisionTabProps) => {
  return (
    <div className='w-full px-5 py-4 bg-gray-100 rounded-2xl flex flex-col items-start gap-2'>
      <textarea
        autoFocus
        value={revision}
        onChange={(e) => onRevisionChange(e.target.value)}
        placeholder='첨삭하실 내용을 적어주세요'
        className='w-full min-h-20 resize-none outline-none text-sm leading-6 font-["Pretendard"] text-gray-900 placeholder-gray-400'
      />
    </div>
  );
};

export default RevisionTab;
