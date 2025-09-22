
import React, { useState, useEffect, useRef } from 'react';
import { Page } from '../types';
import { TribeLogo, MenuIcon, XIcon, ChevronDownIcon } from './icons';

interface HeaderProps {
  navigateTo: (page: Page) => void;
  currentPage: Page;
}

const NavLink: React.FC<{
  onClick: () => void;
  isActive: boolean;
  children: React.ReactNode;
}> = ({ onClick, isActive, children }) => (
  <button
    onClick={onClick}
    className={`px-2 py-2 text-sm font-semibold rounded-md transition-colors duration-200 whitespace-nowrap ${
      isActive
        ? 'text-black'
        : 'text-gray-600 hover:text-black'
    }`}
  >
    {children}
  </button>
);

const MobileNavLink: React.FC<{
  onClick: () => void;
  isActive: boolean;
  children: React.ReactNode;
}> = ({ onClick, isActive, children }) => (
  <button
    onClick={onClick}
    className={`w-full text-left text-2xl font-semibold py-4 border-b border-gray-200/80 ${
      isActive ? 'text-black' : 'text-gray-800'
    }`}
  >
    {children}
  </button>
);

const ResourcesDropdown: React.FC<{ navigateTo: (page: Page) => void; currentPage: Page; closeMenu: () => void }> = ({ navigateTo, currentPage, closeMenu }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleNavigate = (page: Page) => {
    navigateTo(page);
    setIsOpen(false);
    closeMenu();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  const isResourceActive = [Page.STORY, Page.HOW_TO_FILM, Page.RELEASE_FORM, Page.SHARE_VIDEO].includes(currentPage);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center px-3 py-2 text-sm md:text-base font-semibold rounded-md transition-colors duration-200 ${
          isResourceActive ? 'text-black' : 'text-gray-600 hover:text-black'
        }`}
      >
        Go Live
        <ChevronDownIcon className={`w-4 h-4 ml-1 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="absolute top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-2">
          <div className="flex flex-col">
            <button
              onClick={() => handleNavigate(Page.STORY)}
              className={`w-full text-left px-4 py-2 text-sm font-semibold hover:bg-gray-50 transition-colors ${
                currentPage === Page.STORY ? 'text-black' : 'text-gray-600 hover:text-black'
              }`}
            >
              The Story
            </button>
            <button
              onClick={() => handleNavigate(Page.HOW_TO_FILM)}
              className={`w-full text-left px-4 py-2 text-sm font-semibold hover:bg-gray-50 transition-colors ${
                currentPage === Page.HOW_TO_FILM ? 'text-black' : 'text-gray-600 hover:text-black'
              }`}
            >
              How to Film
            </button>
            <button
              onClick={() => handleNavigate(Page.RELEASE_FORM)}
              className={`w-full text-left px-4 py-2 text-sm font-semibold hover:bg-gray-50 transition-colors ${
                currentPage === Page.RELEASE_FORM ? 'text-black' : 'text-gray-600 hover:text-black'
              }`}
            >
              Release Form
            </button>
            <button
              onClick={() => handleNavigate(Page.SHARE_VIDEO)}
              className={`w-full text-left px-4 py-2 text-sm font-semibold hover:bg-gray-50 transition-colors ${
                currentPage === Page.SHARE_VIDEO ? 'text-black' : 'text-gray-600 hover:text-black'
              }`}
            >
              Share Your Video
            </button>
            <button
              onClick={() => handleNavigate(Page.SIX_STEPS)}
              className={`w-full text-left px-4 py-2 text-sm font-semibold hover:bg-gray-50 transition-colors ${
                currentPage === Page.SIX_STEPS ? 'text-black' : 'text-gray-600 hover:text-black'
              }`}
            >
              6 Steps, Do THIS!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};


const Header: React.FC<HeaderProps> = ({ navigateTo, currentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigate = (page: Page) => {
    navigateTo(page);
    setIsMenuOpen(false); // Close menu on navigation
  };

  return (
    <>
      <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-200">
        <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-4 cursor-pointer" onClick={() => handleNavigate(Page.HOME)}>
            <TribeLogo className="w-10 h-10" />
            <h1 className="text-xl md:text-2xl font-bold font-serif tracking-wide text-black">
              KINGLEY
            </h1>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-3 xl:space-x-4">
            <NavLink onClick={() => handleNavigate(Page.HOME)} isActive={currentPage === Page.HOME}>Home</NavLink>
            <NavLink onClick={() => handleNavigate(Page.RECRUIT)} isActive={currentPage === Page.RECRUIT}>Recruit</NavLink>
            <NavLink onClick={() => handleNavigate(Page.MISSION)} isActive={currentPage === Page.MISSION}>Mission</NavLink>
            <NavLink onClick={() => handleNavigate(Page.MISSION_ASSETS)} isActive={currentPage === Page.MISSION_ASSETS}>Mission Assets</NavLink>
            <ResourcesDropdown navigateTo={navigateTo} currentPage={currentPage} closeMenu={() => {}} />
            <NavLink onClick={() => handleNavigate(Page.RWPOV)} isActive={currentPage === Page.RWPOV}>$RWPOV (the token)</NavLink>
          </div>

          {/* Mobile/Tablet Nav Button */}
          <div className="lg:hidden">
            <button onClick={() => setIsMenuOpen(true)} className="text-black p-1">
              <MenuIcon className="w-7 h-7" />
            </button>
          </div>
        </nav>
      </header>
      
      <div className={`fixed inset-0 bg-white z-[100] flex-col p-4 lg:hidden transition-opacity duration-300 ease-in-out ${isMenuOpen ? 'opacity-100 pointer-events-auto flex' : 'opacity-0 pointer-events-none'}`}>
          <div className="flex justify-between items-center mb-8">
             <div className="flex items-center space-x-3" onClick={() => handleNavigate(Page.HOME)}>
                <TribeLogo className="w-10 h-10" />
               <h1 className="text-xl md:text-2xl font-bold font-serif tracking-wide text-black">
                    <span className="block sm:inline font-bold">Build A Better Human Experience. </span>
                    KINGLEY
                </h1>
            </div>
            <button onClick={() => setIsMenuOpen(false)} className="text-black p-1">
              <XIcon className="w-7 h-7" />
            </button>
          </div>
          <div className="flex flex-col overflow-y-auto flex-1">
            <MobileNavLink onClick={() => handleNavigate(Page.HOME)} isActive={currentPage === Page.HOME}>Home</MobileNavLink>
            <MobileNavLink onClick={() => handleNavigate(Page.RECRUIT)} isActive={currentPage === Page.RECRUIT}>Recruit</MobileNavLink>
            <MobileNavLink onClick={() => handleNavigate(Page.MISSION)} isActive={currentPage === Page.MISSION}>Mission</MobileNavLink>
            <MobileNavLink onClick={() => handleNavigate(Page.MISSION_ASSETS)} isActive={currentPage === Page.MISSION_ASSETS}>Mission Assets</MobileNavLink>
            <MobileNavLink onClick={() => handleNavigate(Page.STORY)} isActive={currentPage === Page.STORY}>The Story</MobileNavLink>
            <MobileNavLink onClick={() => handleNavigate(Page.HOW_TO_FILM)} isActive={currentPage === Page.HOW_TO_FILM}>How to Film</MobileNavLink>
            <MobileNavLink onClick={() => handleNavigate(Page.RELEASE_FORM)} isActive={currentPage === Page.RELEASE_FORM}>Release Form</MobileNavLink>
            <MobileNavLink onClick={() => handleNavigate(Page.SHARE_VIDEO)} isActive={currentPage === Page.SHARE_VIDEO}>Share Your Video</MobileNavLink>
            <MobileNavLink onClick={() => handleNavigate(Page.SIX_STEPS)} isActive={currentPage === Page.SIX_STEPS}>6 Steps, Do THIS!</MobileNavLink>
            <MobileNavLink onClick={() => handleNavigate(Page.RWPOV)} isActive={currentPage === Page.RWPOV}>$RWPOV (the token)</MobileNavLink>
          </div>
        </div>
      </>
  );
};

export default Header;