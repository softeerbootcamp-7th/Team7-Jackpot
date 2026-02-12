// import useSearch from '../hooks/useSearch';
// 나중에 placeholder 문구 다시 확인
import { useParams } from 'react-router';

import CompanyDocumentList from '@/features/library/components/company/CompanyDocumentList';
import FolderList from '@/features/library/components/FolderList';
import QnADocumentList from '@/features/library/components/qna/QnADocumentList';
import { useLibraryTabs } from '@/features/library/hooks/useLibraryTabs';
import SearchInput from '@/shared/components/SearchInput';

interface LibrarySideBarProps {
  folderList: string[];
}

const LibrarySideBar = ({ folderList }: LibrarySideBarProps) => {
  const handleSearch = () => {};
  const { currentTab } = useLibraryTabs();
  const { companyName, qnAName } = useParams<{
    companyName?: string;
    qnAName?: string;
  }>();
  const folderName = currentTab === 'COMPANY' ? companyName : qnAName;

  return (
    <div className='flex h-full w-107 flex-col overflow-hidden pr-5'>
      {currentTab === 'QUESTION' && (
        <div className='flex-none shrink-0'>
          <SearchInput
            onSearch={handleSearch}
            placeholder='문항 유형을 입력해주세요'
          />
        </div>
      )}
      {folderName === undefined ? (
        <FolderList
          className='flex-1 overflow-y-auto'
          folderList={folderList}
        />
      ) : currentTab === 'QUESTION' ? (
        <QnADocumentList className='flex-1 overflow-y-auto' />
      ) : (
        <CompanyDocumentList className='flex-1 overflow-y-auto' />
      )}
    </div>
  );
};

export default LibrarySideBar;
