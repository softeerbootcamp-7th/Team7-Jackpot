import CoverLetterWriteSidebar from '@/features/coverLetter/components/CoverLetterWriteSidebar';
import NewCoverLetter from '@/features/coverLetter/components/newCoverLetter/NewCoverLetter';
import {
  coverLetterContent,
  coverLetterHeaderText,
  emptyCaseText,
} from '@/features/coverLetter/constants';
import ContentHeader from '@/shared/components/ContentHeader';
import DataGuard from '@/shared/components/DataGuard';
import EmptyCase from '@/shared/components/EmptyCase';
import SidebarLayout from '@/shared/components/SidebarLayout';
import TabBar from '@/shared/components/TabBar';

const CoverLetterPage = () => {
  const hasData = true;

  const tabProps = {
    content: coverLetterContent,
    handleTabChange: actions.handleTabChange,
    currentTab: state.currentTab,
  };

  // [박소민] TODO: 페이지 분기처리 리팩토링
  // isLanding으로 랜딩 페이지, 자기소개서 등록/수정 페이지 분기
  // 자기소개서 등록/수정 페이지는 사이드바가 아닌 메인 콘텐츠로 분기

  return (
    <SidebarLayout
      headerSlot={
        <>
          <ContentHeader {...coverLetterHeaderText} />
          <TabBar {...tabProps} />
        </>
      }
      sidebarSlot={<CoverLetterWriteSidebar />}
    >
      <DataGuard
        data={hasData}
        fallback={<EmptyCase {...emptyCaseText.overview} />}
      >
        <NewCoverLetter />
      </DataGuard>
    </SidebarLayout>
  );
};

export default CoverLetterPage;
