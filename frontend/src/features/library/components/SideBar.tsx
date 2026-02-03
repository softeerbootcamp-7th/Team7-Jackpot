// import useSearch from '../hooks/useSearch';
// 나중에 로직 안 붙였습니다.

import type { LibraryView } from '../types';
import DocumentList from './DocumentList';
import FolderList from './FolderList';
import SearchInput from './SearchInput';

interface SideBarProps {
  currentTab: LibraryView;
  folderList: string[];
  folderId: number | null;
  selectedDocumentId: number | null;
  selectedDocumentList: object[];
  handleFolderId: (id: number | null) => void;
  handleDocumentId: (id: number | null) => void;
}

const SideBar = ({
  currentTab,
  folderList,
  folderId,
  selectedDocumentId,
  selectedDocumentList,
  handleFolderId,
  handleDocumentId,
}: SideBarProps) => {
  const handleSearch = () => {};

  return (
    <div className='h-full w-107 flex-col items-center justify-center pt-7.5 pr-5'>
      {currentTab === 'QUESTIONS' && <SearchInput onSearch={handleSearch} />}
      {folderId === null ? (
        <FolderList folderList={folderList} handleFolderId={handleFolderId} />
      ) : (
        <DocumentList
          selectedDocumentId={selectedDocumentId}
          selectedDocumentList={selectedDocumentList}
          handleFolderId={handleFolderId}
          handleDocumentId={handleDocumentId}
        />
      )}
    </div>
  );
};

export default SideBar;
