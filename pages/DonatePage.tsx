import React from 'react';
import Card from '../components/Card';

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h2 className="text-2xl font-bold font-serif text-black mb-4">{children}</h2>
);

const CryptoCard: React.FC<{ 
    symbol: string; 
    name: string; 
    address?: string;
}> = ({ symbol, name, address }) => (
    <Card className="text-center">
        <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-gray-200">
            <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-xs text-gray-500">QR Code</span>
            </div>
        </div>
        <h3 className="font-bold text-black text-lg mb-1">{symbol}</h3>
        <p className="text-sm text-gray-600 mb-3">{name}</p>
        {address && (
            <div className="text-xs text-gray-500 font-mono bg-gray-50 p-2 rounded border break-all">
                {address}
            </div>
        )}
        {!address && (
            <div className="text-xs text-gray-400 italic">
                Address coming soon
            </div>
        )}
    </Card>
);

const DonatePage: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <header className="text-center">
                <h1 className="text-3xl md:text-4xl font-bold font-serif text-black mb-4">Donate to KINGLEY FOUNDATION</h1>
                <div className="max-w-2xl mx-auto">
                    <p className="text-lg text-gray-700 mb-4">
                        KINGLEY FOUNDATION is a registered 508(c)(1)(a) faith-based nonprofit in the State of Washington.
                    </p>
                    <p className="text-lg text-gray-700">
                        Your donations support the expansion of the Foundation's mission: building a better human experience through kindness, culture, and community.
                    </p>
                </div>
            </header>

            <Card>
                <SectionTitle>Make a Donation</SectionTitle>
                <p className="text-gray-600 mb-6 text-center">
                    Support us with cryptocurrency donations through our secure payment widget.
                </p>
                <div className="flex justify-center">
                    <iframe 
                        src="https://nowpayments.io/embeds/donation-widget?api_key=6ca50e54-ecb9-41fb-b1b1-288cdb71cbb4" 
                        width="346" 
                        height="623" 
                        frameBorder="0" 
                        scrolling="no" 
                        style={{overflowY: 'hidden'}}
                        title="Cryptocurrency Donation Widget"
                    >
                        Can't load widget
                    </iframe>
                </div>
            </Card>

            <Card className="text-center bg-gray-50">
                <h3 className="text-xl font-bold font-serif text-black mb-3">Thank You</h3>
                <p className="text-gray-700">
                    Every donation, no matter the size, helps us build a better human experience. 
                    Your generosity fuels acts of kindness around the world and strengthens our community.
                </p>
            </Card>
        </div>
    );
};

export default DonatePage;