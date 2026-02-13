interface CoverLetterItemProps {
  targetTab: number;
  tabName: string;
  tabNumber: number;
  onClick: () => void;
}

const CoverLetterItem = ({
  targetTab,
  tabName,
  tabNumber,
  onClick,
}: CoverLetterItemProps) => {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer rounded-lg px-4 py-2 ${tabNumber === targetTab ? 'bg-gray-50 font-bold text-gray-600' : 'text-gray-400'}`}
    >
      {tabName}
    </button>
  );
};

export default CoverLetterItem;
