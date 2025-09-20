
import React from 'react';
import { useWallet } from '../hooks/useWallet';
import Card from './Card';
import Button from './Button';
import { WalletIcon, LoadingIcon } from './icons';

const ConnectWalletPrompt: React.FC = () => {
  const { isPhantomInstalled, connect, status, error } = useWallet();

  if (status === 'connecting') {
    return (
      <div className="max-w-md mx-auto">
        <Card>
          <div className="text-center p-8">
            <LoadingIcon className="w-12 h-12 text-gray-800 mx-auto mb-4 animate-spin" />
            <h2 className="text-xl font-bold font-serif text-black">Connecting Wallet...</h2>
            <p className="text-gray-500 mt-2">Please approve the connection in Phantom.</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <div className="text-center">
          <WalletIcon className="w-16 h-16 text-black mx-auto mb-4" />
          <h2 className="text-2xl font-bold font-serif text-black mb-2">Connect Your Wallet</h2>
          <p className="text-gray-600 mb-6">Please connect your Phantom wallet to access this page.</p>
          {isPhantomInstalled ? (
            <Button onClick={connect}>Connect Phantom</Button>
          ) : (
            <>
              <p className="text-sm text-gray-800 mb-4">Phantom Wallet not found.</p>
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
        </div>
      </Card>
    </div>
  );
};

export default ConnectWalletPrompt;
