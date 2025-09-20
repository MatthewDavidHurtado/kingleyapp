
import React from 'react';
import { useWallet } from '../hooks/useWallet';
import Card from '../components/Card';
import Button from '../components/Button';
import BalancesWidget from '../components/BalancesWidget';
import ConnectWalletPrompt from '../components/ConnectWalletPrompt';

const WalletPage: React.FC = () => {
    const { isConnected, balances, publicKey, disconnect } = useWallet();

    if (!isConnected) {
        return <ConnectWalletPrompt />;
    }

    return (
        <div className="max-w-md mx-auto space-y-6">
            <Card>
                <h2 className="text-xl font-bold font-serif text-black mb-1">Your Wallet</h2>
                <p className="text-xs text-gray-500 font-mono truncate mb-6">{publicKey}</p>
                <BalancesWidget balances={balances} />
            </Card>
            
            <Card>
                <h3 className="font-bold text-lg text-black mb-4">Actions</h3>
                <div className="space-y-3">
                    <Button onClick={() => alert("On-ramp integration (Stripe/Coinbase) would open here.")}>
                        Top up SOL
                    </Button>
                    <Button variant="secondary" onClick={() => alert("Send KINGLEY modal would open here.")}>
                        Send KINGLEY
                    </Button>
                </div>
            </Card>

            <div className="text-center">
                <button onClick={disconnect} className="text-sm text-gray-500 hover:text-black transition-colors">
                    Disconnect Wallet
                </button>
            </div>
        </div>
    );
};

export default WalletPage;