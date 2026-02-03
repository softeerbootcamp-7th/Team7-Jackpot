import CoverLetterItem from '@/components/upload/CoverLetterItem';

import type { CoverLetterListProps } from '@/types/upload';

interface TabDataType {
  tabName: string;
  tabNumber: 1 | 2 | 3;
}

const CoverLetterList = ({ tabState, setTabState }: CoverLetterListProps) => {
  const tabData: TabDataType[] = [
    { tabName: '자기소개서 01', tabNumber: 1 },
    { tabName: '자기소개서 02', tabNumber: 2 },
    { tabName: '자기소개서 03', tabNumber: 3 },
  ];

  return (
    <div className='text-[1.125rem]'>
      {tabData.map((data) => (
        <CoverLetterItem
          key={data.tabNumber}
          targetTab={tabState}
          tabName={data.tabName}
          tabNumber={data.tabNumber}
          onClick={() => setTabState(data.tabNumber)}
        />
      ))}
    </div>
  );
};

export default CoverLetterList;
