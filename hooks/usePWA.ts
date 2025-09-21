import { useState, useEffect, useCallback } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface PWAState {
  isInstallable: boolean;
  isInstalled: boolean;
  isStandalone: boolean;
  showInstallPrompt: boolean;
  platform: 'ios' | 'android' | 'desktop' | 'unknown';
  installApp: () => Promise<void>;
  dismissInstallPrompt: () => void;
}

export const usePWA = (): PWAState => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [platform, setPlatform] = useState<'ios' | 'android' | 'desktop' | 'unknown'>('unknown');

  // Detect platform
  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(userAgent);
    const isAndroid = /android/.test(userAgent);
    const isDesktop = !isIOS && !isAndroid;

    if (isIOS) setPlatform('ios');
    else if (isAndroid) setPlatform('android');
    else if (isDesktop) setPlatform('desktop');
    else setPlatform('unknown');
  }, []);

  // Check if app is running in standalone mode (installed)
  const isStandalone = useState(() => {
    return window.matchMedia('(display-mode: standalone)').matches ||
           (window.navigator as any).standalone === true ||
           document.referrer.includes('android-app://');
  })[0];

  // Detect if app is installed
  useEffect(() => {
    const checkInstallation = () => {
      // Check if running in standalone mode
      if (isStandalone) {
        setIsInstalled(true);
        return;
      }

      // Check localStorage for previous installation
      const wasInstalled = localStorage.getItem('pwa-installed') === 'true';
      if (wasInstalled) {
        setIsInstalled(true);
        return;
      }

      // For iOS, check if user has dismissed install prompt recently
      const iosPromptDismissed = localStorage.getItem('ios-install-dismissed');
      const dismissedTime = iosPromptDismissed ? parseInt(iosPromptDismissed) : 0;
      const daysSinceDismissed = (Date.now() - dismissedTime) / (1000 * 60 * 60 * 24);

      // Show install prompt if not installed and not recently dismissed
      if (!isInstalled && (platform !== 'ios' || daysSinceDismissed > 7)) {
        setShowInstallPrompt(true);
      }
    };

    checkInstallation();
  }, [isStandalone, platform, isInstalled]);

  // Listen for beforeinstallprompt event (Android/Desktop)
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      const promptEvent = e as BeforeInstallPromptEvent;
      setDeferredPrompt(promptEvent);
      setIsInstallable(true);
      
      // Only show prompt if not recently dismissed
      const lastDismissed = localStorage.getItem('install-prompt-dismissed');
      const dismissedTime = lastDismissed ? parseInt(lastDismissed) : 0;
      const daysSinceDismissed = (Date.now() - dismissedTime) / (1000 * 60 * 60 * 24);
      
      if (daysSinceDismissed > 3) {
        setShowInstallPrompt(true);
      }
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowInstallPrompt(false);
      setDeferredPrompt(null);
      localStorage.setItem('pwa-installed', 'true');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const installApp = useCallback(async () => {
    console.log('Install app called', { platform, deferredPrompt: !!deferredPrompt });
    
    if (platform === 'ios') {
      // For iOS, we can't programmatically install, so we show instructions
      return;
    }

    if (deferredPrompt) {
      try {
        console.log('Showing install prompt...');
        await deferredPrompt.prompt();
        const choiceResult = await deferredPrompt.userChoice;
        console.log('User choice:', choiceResult.outcome);
        
        if (choiceResult.outcome === 'accepted') {
          setIsInstalled(true);
          localStorage.setItem('pwa-installed', 'true');
          console.log('App installed successfully');
        }
        
        setDeferredPrompt(null);
        setShowInstallPrompt(false);
      } catch (error) {
        console.error('Error during app installation:', error);
      }
    } else {
      console.log('No deferred prompt available, trying manual installation');
      // Fallback for browsers that don't support beforeinstallprompt
      if (platform === 'desktop') {
        alert('To install KINGLEY:\n\n1. Click the install icon in your browser\'s address bar\n2. Or go to browser menu → "Install KINGLEY"');
      } else if (platform === 'android') {
        alert('To install KINGLEY:\n\n1. Tap the menu (⋮) in your browser\n2. Select "Add to Home Screen" or "Install App"');
      }
    }
  }, [deferredPrompt, platform]);

  const dismissInstallPrompt = useCallback(() => {
    setShowInstallPrompt(false);
    localStorage.setItem('install-prompt-dismissed', Date.now().toString());
    
    if (platform === 'ios') {
      localStorage.setItem('ios-install-dismissed', Date.now().toString());
    }
  }, [platform]);

  return {
    isInstallable: isInstallable || platform === 'ios',
    isInstalled,
    isStandalone,
    showInstallPrompt,
    platform,
    installApp,
    dismissInstallPrompt,
  };
};