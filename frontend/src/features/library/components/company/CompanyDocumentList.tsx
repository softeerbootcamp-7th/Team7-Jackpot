import { useState } from 'react';

import { NavLink, useParams } from 'react-router';

import { MOCK_COVER_LETTERS } from '@/features/library/api/mockData';
import CompanyDocument from '@/features/library/components/company/CompanyDocument';
import { useCompanyListQueries } from '@/features/library/hooks/queries/useLibraryListQueries';
import { ChevronLeftIcon } from '@/features/library/icons/ChevronLeft';
import { FolderIcon } from '@/features/library/icons/Folder';

// [박소민] TODO: 폴더 클릭시 여기서 데이터를 받아옵니다. useinfiniteQuery사용하기

type Props = {
  className: string;
};

const CompanyDocumentList = ({ className }: Props) => {
  const { companyName } = useParams<{ companyName?: string }>();
  const [selectedDocumentId, setSelectedDocumentId] = useState<number | null>(
    null,
  );
  const { data } = useCompanyListQueries(companyName ?? null);
  const coverLetters =
    data?.coverLetters ??
    MOCK_COVER_LETTERS.filter((letter) => letter.companyName === companyName);

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
      {coverLetters.map((document) => (
        <CompanyDocument
          key={document.id}
          content={document}
          selectedDocumentId={selectedDocumentId}
          onSelect={() => setSelectedDocumentId(document.id)}
        />
      ))}
    </div>
  );
};

export default CompanyDocumentList;
