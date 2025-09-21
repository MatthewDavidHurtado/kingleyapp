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
  showIOSInstructions: boolean;
  showManualInstructions: boolean;
  platform: 'ios' | 'android' | 'desktop' | 'unknown';
  installApp: () => Promise<void>;
  dismissInstallPrompt: () => void;
  setShowIOSInstructions: (show: boolean) => void;
  setShowManualInstructions: (show: boolean) => void;
}

export const usePWA = (): PWAState => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);
  const [showManualInstructions, setShowManualInstructions] = useState(false);
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

      // Only show install prompt on mobile devices (iOS and Android)
      if (!isInstalled && (platform === 'ios' || platform === 'android')) {
        // For iOS, check if user has dismissed install prompt recently
        if (platform === 'ios') {
          const iosPromptDismissed = localStorage.getItem('ios-install-dismissed');
          const dismissedTime = iosPromptDismissed ? parseInt(iosPromptDismissed) : 0;
          const daysSinceDismissed = (Date.now() - dismissedTime) / (1000 * 60 * 60 * 24);
          
          if (daysSinceDismissed > 7) {
            setShowInstallPrompt(true);
          }
        } else {
          // For Android, check general dismissal
          const lastDismissed = localStorage.getItem('install-prompt-dismissed');
          const dismissedTime = lastDismissed ? parseInt(lastDismissed) : 0;
          const daysSinceDismissed = (Date.now() - dismissedTime) / (1000 * 60 * 60 * 24);
          
          if (daysSinceDismissed > 3) {
            setShowInstallPrompt(true);
          }
        }
      }
    };

    checkInstallation();
  }, [isStandalone, platform, isInstalled]);

  // Listen for beforeinstallprompt event (Android only now)
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      const promptEvent = e as BeforeInstallPromptEvent;
      setDeferredPrompt(promptEvent);
      
      // Only set as installable if on mobile
      if (platform === 'android') {
        setShowInstallPrompt(true);
        setIsInstallable(true);
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
  }, [platform]);

  const installApp = useCallback(async () => {
    console.log('🚀 Install app called', { 
      platform, 
      hasDeferredPrompt: !!deferredPrompt,
      isInstallable,
      showInstallPrompt 
    });
    
    if (platform === 'ios') {
      console.log('📱 iOS detected - showing instructions');
      setShowIOSInstructions(true);
      return;
    }

    if (deferredPrompt) {
      try {
        console.log('✅ Showing browser install prompt...');
        await deferredPrompt.prompt();
        const choiceResult = await deferredPrompt.userChoice;
        console.log('👤 User choice:', choiceResult.outcome);
        
        if (choiceResult.outcome === 'accepted') {
          setIsInstalled(true);
          localStorage.setItem('pwa-installed', 'true');
          console.log('🎉 App installed successfully');
        }
        
        setDeferredPrompt(null);
        setShowInstallPrompt(false);
      } catch (error) {
        console.error('❌ Error during app installation:', error);
        // Show manual instructions as fallback
        setShowManualInstructions(true);
      }
    } else {
      console.log('⚠️ No deferred prompt available - showing manual instructions');
      setShowManualInstructions(true);
    }
  }, [deferredPrompt, platform]);

  const dismissInstallPrompt = useCallback(() => {
    setShowInstallPrompt(false);
    setShowIOSInstructions(false);
    setShowManualInstructions(false);
    localStorage.setItem('install-prompt-dismissed', Date.now().toString());
    
    if (platform === 'ios') {
      localStorage.setItem('ios-install-dismissed', Date.now().toString());
    }
  }, [platform]);

  return {
    isInstallable: (isInstallable || platform === 'ios') && (platform === 'ios' || platform === 'android'),
    isInstalled,
    isStandalone,
    showInstallPrompt,
    showIOSInstructions,
    showManualInstructions,
    platform,
    installApp,
    dismissInstallPrompt,
    setShowIOSInstructions,
    setShowManualInstructions,
  };
};