import { useNavigate } from 'react-router';

import FolderIconInUpload from '@/assets/icons/FolderIconInUpload.png';
import { UploadPageIcons as I } from '@/features/upload/icons';

const UploadCompleteSection = () => {
  // [윤종근] - TODO: 추후 useNavigate -> Link로 변경 시 수정
  const navigate = useNavigate();

  return (
    <div className='relative flex w-full items-center justify-center'>
      <div className='absolute top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2'>
        <I.UploadCompleteBackground />
      </div>
      <div className='z-10 mt-24 flex flex-col items-center gap-12'>
        <img src={FolderIconInUpload} />

        <div className='text-title-s flex gap-3'>
          <button
            onClick={() => navigate('/upload')}
            className='flex cursor-pointer gap-2 rounded-lg bg-gray-50 px-5 py-3'
          >
            <I.UploadIconInButton />
            <span className='text-gray-600'>새로운 자료 업로드하기</span>
          </button>
          <button
            onClick={() => navigate('/library')}
            className='flex cursor-pointer gap-2 rounded-lg bg-gray-900 px-5 py-3'
          >
            <I.FolderIconInButton />
            <span className='text-white'>라이브러리에서 보기</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadCompleteSection;
