
import React, { useState } from 'react';

interface QRCardProps {
  qrDataUrl: string;
  recruitUrl: string;
}

const QRCard: React.FC<QRCardProps> = ({ qrDataUrl, recruitUrl }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(recruitUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Join the KINGLEY Movement',
        text: 'Join me and earn your crown! Claim your welcome pack here:',
        url: recruitUrl,
      }).catch(console.error);
    } else {
      handleCopy();
    }
  };

  return (
    <div className="bg-brand-brown p-4 rounded-lg text-center border border-brand-gold/30">
      <h3 className="font-bold mb-2 text-brand-sand">Your Recruit QR</h3>
      <p className="text-xs text-gray-400 mb-4">Have new recruits scan this to join.</p>
      <div className="p-2 bg-white rounded-md inline-block">
        <img src={qrDataUrl} alt="Recruit QR Code" className="w-48 h-48" />
      </div>
      <div className="mt-4 flex space-x-2">
        <button onClick={handleShare} className="flex-1 bg-brand-sand text-brand-black text-sm font-bold py-2 px-4 rounded-md">Share</button>
        <button onClick={handleCopy} className="flex-1 bg-brand-gold/20 text-brand-gold text-sm font-bold py-2 px-4 rounded-md">
          {copied ? 'Copied!' : 'Copy Link'}
        </button>
      </div>
    </div>
  );
};

export default QRCard;