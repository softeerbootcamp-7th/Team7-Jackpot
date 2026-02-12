import { BrowserRouter, Route, Routes } from 'react-router';

import CoverLetterLandingPage from '@/pages/CoverLetterLandingPage';
import CoverLetterPage from '@/pages/CoverLetterPage';
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import ReviewPage from '@/pages/ReviewPage';
import SignUpPage from '@/pages/SignUpPage';
import UploadPage from '@/pages/UploadPage';

import DetailView from '@/features/library/components/DetailView';
import LibraryLayout from '@/features/library/components/LibraryLayout';
import LibrarySidebarLayout from '@/features/library/components/LibrarySidebarLayout';
import { emptyCaseText } from '@/features/library/constants';
import EmptyCase from '@/shared/components/EmptyCase';
import RootLayout from '@/shared/components/RootLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route element={<RootLayout />}>
          {/* <Route path="/" element={<LandingPage />}/> */}
          <Route path='/home' element={<HomePage />} />
          <Route path='/upload' element={<UploadPage />} />
          <Route path='/cover-letter' element={<CoverLetterLandingPage />} />
          <Route path='/cover-letter/new' element={<CoverLetterPage />} />
          <Route path='/library' element={<LibraryLayout />}>
            <Route element={<LibrarySidebarLayout />}>
              <Route path='company'>
                <Route
                  index
                  element={<EmptyCase {...emptyCaseText.folder} />}
                />
                <Route
                  path=':companyName'
                  element={<EmptyCase {...emptyCaseText.folder} />}
                />
                <Route
                  path=':companyName/:coverLetterId'
                  element={<DetailView />}
                />
              </Route>
              <Route path='qna'>
                <Route
                  index
                  element={<EmptyCase {...emptyCaseText.folder} />}
                />
                <Route
                  path=':qnAName'
                  element={<EmptyCase {...emptyCaseText.folder} />}
                />
                <Route path=':qnAName/:qnAId' element={<DetailView />} />
              </Route>
            </Route>
          </Route>
          <Route path='/coverLetter' element={<CoverLetterPage />} />
          <Route path='/review/:id' element={<ReviewPage />} />
          {/* <Route path="/recruit" element={<RecruitPage />}/> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
