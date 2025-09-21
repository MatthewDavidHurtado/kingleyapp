import React, { useState } from 'react';
import { usePWA } from '../hooks/usePWA';
import { XIcon, DownloadIcon, TribeLogo } from './icons';

const PWAInstallPrompt: React.FC = () => {
  const { 
    showInstallPrompt, 
    platform, 
    installApp, 
    dismissInstallPrompt,
    isInstalled,
    isStandalone 
  } = usePWA();
  
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);
  const [showManualInstructions, setShowManualInstructions] = useState(false);

  // Don't show if already installed or running as standalone app
  if (isInstalled || isStandalone || !showInstallPrompt) {
    return null;
  }

  const handleInstall = async () => {
    console.log('PWA Install button clicked');
    if (platform === 'ios') {
      setShowIOSInstructions(true);
    } else {
      try {
        await installApp();
      } catch (error) {
        console.error('Install failed:', error);
        // If automatic install fails, show manual instructions
        setShowManualInstructions(true);
      }
    }
  };

  const getInstallText = () => {
    switch (platform) {
      case 'ios':
        return 'Add to Home Screen';
      case 'android':
        return 'Install App';
      case 'desktop':
        return 'Install KINGLEY';
      default:
        return 'Install App';
    }
  };

  const getDescription = () => {
    switch (platform) {
      case 'ios':
        return 'Get the full KINGLEY experience with offline access and native app features.';
      case 'android':
        return 'Install KINGLEY for faster access, offline support, and push notifications.';
      case 'desktop':
        return 'Install KINGLEY as a desktop app for quick access and better performance.';
      default:
        return 'Install KINGLEY for the best experience.';
    }
  };

  if (showManualInstructions) {
    return (
      <div className="fixed inset-0 bg-black/60 z-[200] flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full">
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <h3 className="text-lg font-bold font-serif text-black">Install KINGLEY</h3>
            <button
              onClick={() => {
                setShowManualInstructions(false);
                dismissInstallPrompt();
              }}
              className="p-1 text-gray-500 hover:text-black transition-colors rounded-full hover:bg-gray-100"
            >
              <XIcon className="w-5 h-5" />
            </button>
          </div>
          <div className="p-6 text-center">
            <TribeLogo className="w-16 h-16 mx-auto mb-4" />
            <div className="space-y-4 text-left">
              {platform === 'desktop' ? (
                <>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">1</div>
                    <p className="text-sm text-gray-700">Look for an <strong>install icon</strong> in your browser's address bar</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">2</div>
                    <p className="text-sm text-gray-700">Or go to your browser menu and select <strong>"Install KINGLEY"</strong></p>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">1</div>
                    <p className="text-sm text-gray-700">Tap the <strong>menu (⋮)</strong> in your browser</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">2</div>
                    <p className="text-sm text-gray-700">Select <strong>"Add to Home Screen"</strong> or <strong>"Install App"</strong></p>
                  </div>
                </>
              )}
            </div>
            <button
              onClick={() => {
                setShowManualInstructions(false);
                dismissInstallPrompt();
              }}
              className="w-full mt-6 bg-gray-900 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Got it!
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showIOSInstructions) {
    return (
      <div className="fixed inset-0 bg-black/60 z-[200] flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full">
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <h3 className="text-lg font-bold font-serif text-black">Install KINGLEY</h3>
            <button
              onClick={() => {
                setShowIOSInstructions(false);
                dismissInstallPrompt();
              }}
              className="p-1 text-gray-500 hover:text-black transition-colors rounded-full hover:bg-gray-100"
            >
              <XIcon className="w-5 h-5" />
            </button>
          </div>
          <div className="p-6 text-center">
            <TribeLogo className="w-16 h-16 mx-auto mb-4" />
            <div className="space-y-4 text-left">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">1</div>
                <p className="text-sm text-gray-700">Tap the <strong>Share</strong> button at the bottom of your screen</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">2</div>
                <p className="text-sm text-gray-700">Scroll down and tap <strong>"Add to Home Screen"</strong></p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">3</div>
                <p className="text-sm text-gray-700">Tap <strong>"Add"</strong> to install KINGLEY on your home screen</p>
              </div>
            </div>
            <button
              onClick={() => {
                setShowIOSInstructions(false);
                dismissInstallPrompt();
              }}
              className="w-full mt-6 bg-gray-900 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Got it!
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[100] max-w-sm mx-auto">
      <div className="bg-white border-2 border-gray-900 rounded-xl shadow-2xl p-4 animate-fade-in">
        <div className="flex items-start space-x-3">
          <TribeLogo className="w-12 h-12 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-black text-sm mb-1">Install KINGLEY</h3>
            <p className="text-xs text-gray-600 mb-3">{getDescription()}</p>
            <div className="flex space-x-2">
              <button
                onClick={handleInstall}
                className="flex-1 bg-gray-900 text-white text-xs font-bold py-2 px-3 rounded-md hover:bg-gray-700 transition-colors flex items-center justify-center space-x-1"
              >
                <DownloadIcon className="w-3 h-3" />
                <span>{getInstallText()}</span>
              </button>
              <button
                onClick={dismissInstallPrompt}
                className="text-xs text-gray-500 hover:text-gray-700 px-2 transition-colors"
              >
                Later
              </button>
            </div>
          </div>
          <button
            onClick={dismissInstallPrompt}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
          >
            <XIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PWAInstallPrompt;