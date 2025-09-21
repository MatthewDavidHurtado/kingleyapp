
import React, { useState, useCallback, useEffect } from 'react';
import { WalletProvider } from './hooks/useWallet';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ClaimPage from './pages/ClaimPage';
import MissionPage from './pages/MissionPage';
import HowToFilmPage from './pages/HowToFilmPage';
import ReleaseFormPage from './pages/ReleaseFormPage';
import StoryPage from './pages/StoryPage';
import WelcomePage from './pages/WelcomePage';
import RecruitPage from './pages/RecruitPage';
import RwovPage from './pages/RwovPage';
import MissionAssetsPage from './pages/MissionAssetsPage';
import { Page } from './types';

const App: React.FC = () => {
  const getInitialPage = (): Page => {
    const params = new URLSearchParams(window.location.search);

    // Priority 1: Referral link (from QR code) takes precedence over everything.
    if (params.has('ref')) {
        sessionStorage.setItem('currentPage', Page.WELCOME);
        // Clean the URL param so it doesn't stick around on reloads
        const url = new URL(window.location.href);
        url.searchParams.delete('ref');
        window.history.replaceState({}, document.title, url.toString());
        return Page.WELCOME;
    }

    // Priority 2: 'return_page' from wallet redirect
    const pageFromParam = params.get('return_page') as Page;
    if (pageFromParam && Object.values(Page).includes(pageFromParam)) {
        sessionStorage.setItem('currentPage', pageFromParam);
        // This param is cleaned up inside the wallet hook, so we don't need to do it here.
        return pageFromParam;
    }

    // Priority 3: Page from session storage (handles normal reloads)
    const pageFromSession = sessionStorage.getItem('currentPage') as Page;
    if (pageFromSession && Object.values(Page).includes(pageFromSession)) {
        return pageFromSession;
    }
    
    // Priority 4: Default to home on first visit
    sessionStorage.setItem('currentPage', Page.HOME);
    return Page.HOME;
  };

  const [currentPage, setCurrentPage] = useState<Page>(getInitialPage());

  const navigateTo = useCallback((page: Page) => {
    setCurrentPage(page);
    sessionStorage.setItem('currentPage', page); // Keep session storage in sync
    window.scrollTo(0, 0);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case Page.HOME:
        return <HomePage navigateTo={navigateTo} />;
      case Page.WELCOME:
        return <WelcomePage navigateTo={navigateTo} />;
      case Page.CLAIM:
        return <ClaimPage navigateTo={navigateTo} />;
      case Page.MISSION:
        return <MissionPage navigateTo={navigateTo} />;
      case Page.STORY:
        return <StoryPage />;
      case Page.RECRUIT:
        return <RecruitPage />;
      case Page.HOW_TO_FILM:
        return <HowToFilmPage />;
      case Page.RELEASE_FORM:
        return <ReleaseFormPage />;
      case Page.MISSION_ASSETS:
        return <MissionAssetsPage />;
      case Page.RWPOV:
        return <RwovPage />;
      default:
        return <HomePage navigateTo={navigateTo} />;
    }
  };

  return (
    <WalletProvider>
      <div className="flex flex-col min-h-screen font-sans bg-white">
        <PWAInstallPrompt />
        <Header navigateTo={navigateTo} currentPage={currentPage} />
        <div className="py-3 bg-gray-50 border-b border-t border-gray-200">
            <div className="container mx-auto px-4 text-center">
                <p className="text-sm font-semibold tracking-wider text-gray-800">
                    <span className="block sm:inline">Build A Better Human Experience. </span>
                    <span className="block sm:inline text-black">Join The Movement.</span>
                </p>
            </div>
        </div>
        <main className="flex-grow container mx-auto px-4 py-8">
          {renderPage()}
        </main>
        <Footer />
      </div>
    </WalletProvider>
  );
};

export default App;