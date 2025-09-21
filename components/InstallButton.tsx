import React from 'react';
import { usePWA } from '../hooks/usePWA';
import { DownloadIcon } from './icons';

interface InstallButtonProps {
  className?: string;
  variant?: 'primary' | 'secondary';
}

const InstallButton: React.FC<InstallButtonProps> = ({ 
  className = '', 
  variant = 'secondary' 
}) => {
  const { isInstallable, isInstalled, isStandalone, installApp, platform } = usePWA();

  // Don't show if already installed or not installable
  if (isInstalled || isStandalone || !isInstallable) {
    return null;
  }

  const baseClasses = "inline-flex items-center justify-center font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variantClasses = {
    primary: 'bg-gray-900 text-white hover:bg-gray-700 focus:ring-gray-900',
    secondary: 'bg-white border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white focus:ring-gray-900',
  };

  const getButtonText = () => {
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

  return (
    <button
      onClick={installApp}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      onMouseDown={() => console.log('🖱️ Install button mouse down')}
    >
      <DownloadIcon className="w-4 h-4 mr-2" />
      {getButtonText()}
    </button>
  );
};

export default InstallButton;