import { useRef, useState } from 'react';

import Card from '@/features/coverLetter/components/Card';
import CardDetail from '@/features/coverLetter/components/CardDetail';
import {
  useInfiniteCoverLetterSearch,
  useScrapCoverLetters,
} from '@/features/coverLetter/hooks/useCoverLetterQueries';
import type { ScrapItem } from '@/features/coverLetter/types/coverLetter';
import { SidebarSkeleton } from '@/shared/components/SidebarSkeleton';
import useInfiniteScroll from '@/shared/hooks/useInfiniteScroll';
import type { RecentCoverLetter } from '@/shared/types/coverLetter';

const CardSection = ({
  searchWord,
  isScrap,
  deleteScrap,
}: {
  searchWord: string;
  isScrap: boolean;
  deleteScrap: (id: number) => void;
}) => {
  const [selectedItem, setSelectedItem] = useState<ScrapItem | null>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // 1. 쿼리 호출
  const scrapQuery = useScrapCoverLetters(searchWord);
  const libraryQuery = useInfiniteCoverLetterSearch(searchWord);

  const activeQuery = isScrap ? scrapQuery : libraryQuery;
  const { fetchNextPage, hasNextPage, isFetchingNextPage, data } = activeQuery;

  useInfiniteScroll({
    sentinelRef,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  // 2. 데이터 리스트 추출
  const items = isScrap
    ? (data?.pages?.flatMap((page) => ('scraps' in page ? page.scraps : [])) ??
      [])
    : (data?.pages?.flatMap((page) =>
        'coverLetters' in page ? page.coverLetters : [],
      ) ?? []);

  // 3. 상세 보기로 보낼 데이터 변환 (라이브러리용)
  const handleLibraryClick = (letter: RecentCoverLetter) => {
    // TODO: 원래는 여기서 letter.coverLetterId로 문항 상세 정보를 fetch해와야 합니다.
    // 임시로 CardDetail 규격에 맞춰 데이터를 생성합니다.
    const mappedData: ScrapItem = {
      questionId: letter.coverLetterId,
      companyName: letter.companyName,
      jobPosition: letter.jobPosition,
      applySeason: `${letter.applyYear} ${letter.applyHalf === 'FIRST_HALF' ? '상반기' : '하반기'}`,
      question:
        '문항 목록을 불러오는 중이거나, 전체 자기소개서 보기 모드입니다.',
      answer: `이 자기소개서는 총 ${letter.questionCount}개의 문항으로 구성되어 있습니다.`,
    };
    setSelectedItem(mappedData);
  };

  // 상세 내용이 선택되었다면 CardDetail 렌더링
  if (selectedItem) {
    return (
      <CardDetail scrap={selectedItem} onBack={() => setSelectedItem(null)} />
    );
  }

  if (items.length === 0) {
    return (
      <div className='flex w-full items-center justify-center py-10 text-gray-400'>
        {isScrap ? '스크랩된 문항이 없어요.' : '자기소개서 검색 결과가 없어요.'}
      </div>
    );
  }

  return (
    <>
      {items.map((item) => {
        const isScrapItem = 'questionId' in item;
        return (
          <Card
            key={
              isScrapItem
                ? `scrap-${item.questionId}`
                : `lib-${item.coverLetterId}`
            }
            item={item}
            isScrap={isScrap}
            deleteScrap={deleteScrap}
            onClick={() => {
              if (isScrapItem) {
                setSelectedItem(item);
              } else {
                handleLibraryClick(item);
              }
            }}
          />
        );
      })}
      {isFetchingNextPage && <SidebarSkeleton len={3} />}
      {hasNextPage && <div ref={sentinelRef} className='h-1' />}
    </>
  );
};

export default CardSection;
