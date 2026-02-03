import { ChevronLeftIcon } from '../icons/ChevronLeft';
import { FolderIcon } from '../icons/Folder';
import Document from './Document';

type DocumentListProps = {
  selectedDocumentId: number | null;
  selectedDocumentList: object[];
  handleFolderId: (id: number | null) => void;
  handleDocumentId: (id: number | null) => void;
};

const DocumentList = ({
  selectedDocumentId,
  selectedDocumentList,
  handleFolderId,
  handleDocumentId,
}: DocumentListProps) => {
  return (
    <div className='w-full'>
      <div className='inline-flex items-center justify-start gap-1 self-stretch px-3'>
        <button onClick={() => handleFolderId(null)}>
          <ChevronLeftIcon />
        </button>
        <div className='flex flex-1 items-center justify-start gap-2'>
          <div className='h-7 w-7'>
            <FolderIcon />
          </div>
          <div className='text-title-m line-clamp-1 flex-1 justify-start font-bold text-gray-950'>
            현대자동차
          </div>
        </div>
      </div>
      {selectedDocumentList.map((doc, idx) => (
        <Document
          key={idx}
          handleDocumentId={handleDocumentId}
          content={doc}
          selectedDocumentId={selectedDocumentId}
        />
      ))}
    </div>
  );
};

export default DocumentList;
