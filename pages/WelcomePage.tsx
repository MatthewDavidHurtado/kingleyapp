
import React, { useState, useEffect, useCallback } from 'react';
import ReactConfetti from 'react-confetti';
import { useWallet } from '../hooks/useWallet';
import { Page, ClaimStatus } from '../types';
import { claimWelcomePack } from '../services/geminiService';
import { COPY, ONBOARDING_VIDEO_URL } from '../constants';
import Button from '../components/Button';
import Card from '../components/Card';
import { TribeLogo, CheckCircleIcon } from '../components/icons';

interface WelcomePageProps {
  navigateTo: (page: Page) => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ navigateTo }) => {
  const { publicKey, isConnected, connect, updateBalances } = useWallet();
  const [status, setStatus] = useState<ClaimStatus>(ClaimStatus.IDLE);
  const [error, setError] = useState<string>('');

  const handleClaim = useCallback(async () => {
    if (!publicKey) return;

    setStatus(ClaimStatus.CLAIMING);
    try {
      const result = await claimWelcomePack(publicKey);
      if (result.success && result.data) {
        updateBalances(result.data.welcomeAmounts);
        setStatus(ClaimStatus.SUCCESS);
      } else {
        setError(result.message);
        setStatus(ClaimStatus.ERROR);
      }
    } catch (e) {
      setError('An unexpected error occurred.');
      setStatus(ClaimStatus.ERROR);
    }
  }, [publicKey, updateBalances]);

  useEffect(() => {
    // Automatically trigger the claim process once the wallet is connected.
    if (isConnected && status === ClaimStatus.IDLE) {
      handleClaim();
    }
  }, [isConnected, status, handleClaim]);

  // View 1: User is not connected yet.
  if (!isConnected) {
    return (
        <div className="max-w-md mx-auto">
            <Card>
                <div className="text-center">
                    <TribeLogo className="w-20 h-20 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold font-serif text-black mb-3">A Gift For You</h2>
                    <p className="text-gray-600 mb-6">{COPY.WELCOME_MESSAGE}</p>
                    <Button onClick={() => navigateTo(Page.CLAIM)}>
                        Claim Your Gift
                    </Button>
                </div>
            </Card>
        </div>
    );
  }

  // If connected, render based on the claim status.
  switch (status) {
    // This state is shown immediately after connection and during the claim process.
    case ClaimStatus.IDLE:
    case ClaimStatus.CLAIMING:
      return (
        <div className="max-w-md mx-auto text-center">
          <Card>
            <TribeLogo className="w-20 h-20 mx-auto mb-4 animate-pulse" />
            <h2 className="text-2xl font-bold font-serif text-black">Claiming Your Gift...</h2>
            <p className="text-gray-500 mt-2">The movement is welcoming you...</p>
          </Card>
        </div>
      );

    // View 2: Claim was successful.
    case ClaimStatus.SUCCESS:
      return (
        <div className="max-w-2xl mx-auto text-center">
            <ReactConfetti recycle={false} numberOfPieces={500} />
            <Card>
                 <CheckCircleIcon className="w-20 h-20 text-green-500 mx-auto mb-4" />
                <h2 className="text-3xl font-bold font-serif text-black mb-3">Welcome to the Movement!</h2>
                <p className="text-gray-600 mb-6">Your wallet is ready and your welcome pack has been claimed.</p>
                
                <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden border-2 border-gray-300 shadow-lg my-6">
                    <iframe
                        width="100%"
                        height="100%"
                        src={ONBOARDING_VIDEO_URL}
                        title="This is The Way"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>

                <p className="text-lg text-black font-semibold my-6">{COPY.ONBOARDING_PROMPT}</p>

                <Button onClick={() => navigateTo(Page.MISSION)} className="text-lg">
                    Start Your First Mission
                </Button>
            </Card>
        </div>
      );
    
    // View 3: An error occurred.
    case ClaimStatus.ERROR:
      return (
        <div className="max-w-md mx-auto">
            <Card>
                <h2 className="text-2xl font-bold font-serif text-red-600">Claim Failed</h2>
                <p className="text-gray-700 mt-2">{error}</p>
                <Button onClick={() => setStatus(ClaimStatus.IDLE)} className="mt-4">
                Try Again
                </Button>
            </Card>
        </div>
      );
    
    default:
        return null;
  }
};

export default WelcomePage;