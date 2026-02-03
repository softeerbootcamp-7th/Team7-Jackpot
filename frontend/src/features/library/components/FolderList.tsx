import Folder from './Folder';

interface FolderListProps {
  folderList: string[];
  handleFolderId?: (folderId: number | null) => void;
}

const FolderList = ({ folderList, handleFolderId }: FolderListProps) => {
  return (
    <div className='inline-flex w-96 flex-col items-start justify-start gap-6'>
      <div className='flex w-96 flex-col items-start justify-start gap-3'>
        <div className='flex flex-col items-start justify-start self-stretch pb-3'>
          <div className='grid grid-cols-3 gap-2.5 px-3'>
            {folderList.map((name, idx) => {
              return (
                <Folder
                  name={name}
                  key={idx}
                  onClick={() => handleFolderId?.(idx)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FolderList;
