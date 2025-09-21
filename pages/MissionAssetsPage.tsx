import React, { useState } from 'react';
import Card from '../components/Card';
import { DownloadIcon, PlayIcon, XIcon } from '../components/icons';

const assets = [
  {
    title: 'Business Pitch One-Pager',
    blurb: 'This one-page overview explains the KINGLEY / $RWPOV movement in simple, business-friendly terms. It is designed to introduce local business owners to the concept of Real World Proof of Value and how partnering in a Surprise and Delight Mission benefits their brand. Use this when pitching a business for the first time.',
    link: 'https://drive.google.com/file/d/1RObgGQI4Lxw1mbPM6-lm9MF6lJHQXMba/view?usp=sharing',
    showOnlineApp: false
  },
  {
    title: 'Business Agreement',
    blurb: 'A simple, one-page consent form that establishes clear expectations with participating businesses. It ensures brand safety, sets caps on free offers, and provides mutual protection. Use this to formalize a business partnership before running a mission.',
    link: 'https://drive.google.com/file/d/1lNLhOhmZLl20RpsKCyf4dmkfJ_poLukV/view?usp=sharing',
    showOnlineApp: true
  }
];

const AssetCard: React.FC<{ title: string; blurb: string; link: string; showOnlineApp: boolean }> = ({ title, blurb, link, showOnlineApp }) => (
    <Card className="flex flex-col h-full">
        <h3 className="text-xl font-bold font-serif text-black mb-3">{title}</h3>
        <p className="text-gray-600 mb-6 flex-grow">{blurb}</p>
        <div className="space-y-3 mt-auto">
            <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full text-center font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white bg-gray-900 text-white hover:bg-gray-700 focus:ring-gray-900"
            >
                <DownloadIcon className="w-5 h-5 mr-2" />
                Download PDF
            </a>
            {showOnlineApp && (
                <a
                    href="https://interactive-business-agreement-form-779946580524.us-west1.run.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full text-center font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white bg-white border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white focus:ring-gray-900"
                >
                    Online Agreement App
                </a>
            )}
        </div>
    </Card>
);


const MissionAssetsPage: React.FC = () => {
    const [isVideoOpen, setIsVideoOpen] = useState(false);

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <header className="text-center">
                <h1 className="text-3xl md:text-4xl font-bold font-serif text-black mb-2">Mission Assets</h1>
                <p className="text-lg text-gray-600">Downloadable resources to help you build the movement.</p>
                <div className="mt-8">
                    <button
                        onClick={() => setIsVideoOpen(true)}
                        className="inline-flex items-center justify-center text-center font-bold py-3 px-8 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white bg-white border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white focus:ring-gray-900"
                    >
                        <PlayIcon className="w-5 h-5 mr-2" />
                        Watch: How to Pitch a Business
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {assets.map(asset => (
                    <AssetCard key={asset.title} title={asset.title} blurb={asset.blurb} link={asset.link} showOnlineApp={asset.showOnlineApp} />
                ))}
            </div>
            
            {isVideoOpen && (
              <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4 animate-fade-in">
                <div className="relative bg-black rounded-lg shadow-xl h-[85vh] aspect-[9/16] max-w-[90vw]">
                  <button
                    onClick={() => setIsVideoOpen(false)}
                    className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 bg-white rounded-full p-1.5 text-gray-800 hover:bg-gray-200 z-10 shadow-lg"
                    aria-label="Close video player"
                  >
                    <XIcon className="w-7 h-7" />
                  </button>
                  <video
                    src="https://healvideos.s3.us-east-2.amazonaws.com/Creating+Unforgettable+Experiences-VEED.mp4"
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full rounded-lg"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            )}
        </div>
    );
};

export default MissionAssetsPage;