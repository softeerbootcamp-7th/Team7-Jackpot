import { NavLink, useParams } from 'react-router';

import CompanyDocument from '@/features/library/components/company/CompanyDocument';
import { useCompanyListQueries } from '@/features/library/hooks/queries/useLibraryListQueries';
import { ChevronLeftIcon } from '@/features/library/icons/ChevronLeft';
import { FolderIcon } from '@/features/library/icons/Folder';

// [박소민] TODO: 폴더 클릭시 여기서 데이터를 받아옵니다. useinfiniteQuery사용하기

type Props = {
  className: string;
};

// [박소민] TODO: isLoading, isError 처리하기
const CompanyDocumentList = ({ className }: Props) => {
  const { companyName } = useParams<{ companyName?: string }>();

  const { data, isLoading, isError } = useCompanyListQueries(
    companyName ?? null,
  );

  const coverLetters = data?.pages.flatMap((page) => page.coverLetters);

  return (
    <div className={`w-full ${className}`}>
      <div className='inline-flex items-center justify-start gap-1 self-stretch px-3'>
        <NavLink to={`/library/company`}>
          <ChevronLeftIcon />
        </NavLink>
        <div className='flex flex-1 items-center justify-start gap-2'>
          <div className='h-7 w-7'>
            <FolderIcon />
          </div>
          <div className='text-title-m line-clamp-1 flex-1 justify-start font-bold text-gray-950'>
            {companyName}
          </div>
        </div>
      </div>
      {isLoading && (
        <div className='p-4 text-center text-gray-500'>로딩 중...</div>
      )}
      {isError && (
        <div className='p-4 text-center text-red-500'>
          데이터를 불러오는 중 오류가 발생했습니다.
        </div>
      )}
      {!isLoading && !isError && !coverLetters && (
        <div className='p-4 text-center text-gray-400'>
          등록된 자기소개서가 없습니다.
        </div>
      )}
      {coverLetters &&
        coverLetters.map((document) => (
          <CompanyDocument key={document.id} content={document} />
        ))}
    </div>
  );
};

export default CompanyDocumentList;
