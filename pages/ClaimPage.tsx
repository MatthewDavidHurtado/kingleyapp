
import React, { useState, useEffect } from 'react';
import { useWallet } from '../hooks/useWallet';
import { Page } from '../types';
import { generateAddressQR } from '../services/geminiService';
import Button from '../components/Button';
import Card from '../components/Card';
import { TribeLogo, LoadingIcon, ClipboardIcon, CheckIcon } from '../components/icons';

interface ClaimPageProps {
  navigateTo: (page: Page) => void;
}

const ClaimPage: React.FC<ClaimPageProps> = ({ navigateTo }) => {
  const { publicKey, isConnected, isPhantomInstalled, connect, status, error } = useWallet();
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [isLoadingQR, setIsLoadingQR] = useState<boolean>(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (publicKey) {
      setIsLoadingQR(true);
      generateAddressQR(publicKey)
        .then(data => setQrCodeUrl(data.qrDataUrl))
        .finally(() => setIsLoadingQR(false));
    }
  }, [publicKey]);

  const handleCopy = () => {
    if (publicKey) {
      navigator.clipboard.writeText(publicKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const renderContent = () => {
    if (status === 'connecting') {
      return (
        <Card>
          <div className="text-center p-8">
            <LoadingIcon className="w-12 h-12 text-gray-800 mx-auto mb-4 animate-spin" />
            <h2 className="text-xl font-bold font-serif text-black">Connecting Wallet...</h2>
            <p className="text-gray-500 mt-2">Please approve the connection in Phantom.</p>
          </div>
        </Card>
      );
    }
    
    if (!isConnected) {
      return (
        <Card>
          <div className="text-center">
            <TribeLogo className="w-20 h-20 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-black">KINGLEY TR!BE</h2>
            <p className="text-2xl font-semibold text-gray-800 mt-1 mb-3">$RWPOV</p>
            <p className="text-gray-600 mb-6">Join The Movement.</p>
            {isPhantomInstalled ? (
              <Button onClick={connect}>Connect Phantom</Button>
            ) : (
              <>
                <p className="text-sm text-gray-800 font-medium mb-4">Phantom Wallet not found.</p>
                <Button onClick={() => window.open('https://phantom.app/', '_blank')}>Install Phantom</Button>
              </>
            )}
             {status === 'error' && (
              <div className="mt-4 text-left p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm font-bold text-red-700">Connection Failed</p>
                <p className="text-xs text-red-600 mt-1">{error}</p>
                <Button onClick={connect} className="mt-3 text-sm py-2">Try Again</Button>
              </div>
            )}
            <div className="mt-6 text-center">
              <a
                href="https://pump.fun/coin/D94ivVYw36R7H3J3unkVhTCZHDiXEWh91WyNUWyBmghD"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-600 hover:text-black underline transition-colors"
              >
                I have a SOL wallet. Take me to the token buy page.
              </a>
            </div>
          </div>
        </Card>
      );
    }

    return (
        <Card>
            <div className="text-center">
                <h2 className="text-2xl font-bold font-serif text-black mb-2">Receive Your Welcome Pack</h2>
                <p className="text-gray-600 mb-6">Show this to your recruiter. They will scan it to send your first SOL + $RWPOV.</p>

                <div className="p-2 bg-white rounded-md inline-block w-48 h-48 sm:w-52 sm:h-52 flex items-center justify-center">
                    {isLoadingQR ? (
                        <LoadingIcon className="h-12 w-12 text-gray-800" />
                    ) : (
                        <img src={qrCodeUrl} alt="Your Solana Address QR Code" className="w-44 h-44 sm:w-48 sm:h-48" />
                    )}
                </div>

                <div className="mt-6 text-left">
                    <p className="text-xs text-gray-500 mb-1">Your Solana Address</p>
                    <div className="flex items-center justify-between bg-gray-100 p-2 rounded-md">
                        <span className="font-mono text-sm text-gray-900 truncate mr-2">{publicKey}</span>
                        <button onClick={handleCopy} className="p-1 text-gray-500 hover:text-black focus:outline-none flex-shrink-0">
                            {copied ? <CheckIcon className="w-5 h-5 text-green-500" /> : <ClipboardIcon className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                <div className="mt-8">
                    <Button onClick={() => navigateTo(Page.MISSION)}>Start Your First Mission</Button>
                </div>
            </div>
        </Card>
    );
  };

  return <div className="max-w-md mx-auto">{renderContent()}</div>;
};

export default ClaimPage;
