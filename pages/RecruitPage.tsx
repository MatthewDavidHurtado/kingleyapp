
import React, { useState, useEffect } from 'react';
import { useWallet } from '../hooks/useWallet';
import { generateRecruitQR } from '../services/geminiService';
import Card from '../components/Card';
import ConnectWalletPrompt from '../components/ConnectWalletPrompt';
import { LoadingIcon, TribeLogo, ClipboardIcon, CheckIcon } from '../components/icons';

const RecruitPage: React.FC = () => {
  const { publicKey, isConnected } = useWallet();
  const [qrData, setQrData] = useState<{ qrDataUrl: string; recruitUrl: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (publicKey) {
      setIsLoading(true);
      generateRecruitQR(publicKey)
        .then(setQrData)
        .finally(() => setIsLoading(false));
    }
  }, [publicKey]);

  const handleCopy = () => {
    if (qrData) {
      navigator.clipboard.writeText(qrData.recruitUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isConnected) {
    return <ConnectWalletPrompt />;
  }

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <div className="text-center p-4">
          <TribeLogo className="w-20 h-20 mx-auto mb-4" />
          <h2 className="text-2xl font-bold font-serif text-black mb-2">Build The Movement</h2>
          <p className="text-gray-600 mb-6">Have new recruits scan this QR code<br />to join the KINGLEY TR!BE.</p>

          <div className="p-4 bg-white rounded-lg inline-block w-64 h-64 flex items-center justify-center shadow-lg">
            {isLoading || !qrData ? (
              <LoadingIcon className="h-16 w-16 text-gray-900 animate-spin" />
            ) : (
              <img src={qrData.qrDataUrl} alt="Recruitment QR Code" className="w-full h-full" />
            )}
          </div>

          <div className="mt-6 text-left">
            <p className="text-xs text-gray-500 mb-1">Your Unique Recruitment Link</p>
            <div className="flex items-center justify-between bg-gray-100 p-2 rounded-md">
              <span className="font-mono text-sm text-gray-800 truncate mr-2">
                {qrData ? qrData.recruitUrl : 'Loading...'}
              </span>
              <button 
                onClick={handleCopy} 
                className="p-1 text-gray-500 hover:text-black focus:outline-none flex-shrink-0"
                disabled={!qrData}
              >
                {copied ? <CheckIcon className="w-5 h-5 text-green-500" /> : <ClipboardIcon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default RecruitPage;