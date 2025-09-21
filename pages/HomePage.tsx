import React, { useState, useRef, useEffect } from 'react';
import { Page } from '../types';
import Button from '../components/Button';
import InstallButton from '../components/InstallButton';
import { TribeLogo, VolumeUpIcon, VolumeOffIcon, PlayIcon, PauseIcon } from '../components/icons';

interface HomePageProps {
  navigateTo: (page: Page) => void;
}

const DESKTOP_VIDEO_URL = "https://healvideos.s3.us-east-2.amazonaws.com/Kindness+Creates+Real+Value-VEED.mp4";
const MOBILE_VIDEO_URL = "https://healvideos.s3.us-east-2.amazonaws.com/Kindness+Creates+Real+Value-VEED+(1).mp4";

const HomePage: React.FC<HomePageProps> = ({ navigateTo }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const videoSrc = isMobile ? MOBILE_VIDEO_URL : DESKTOP_VIDEO_URL;

  const toggleMute = () => {
    if (videoRef.current) {
        const currentlyMuted = !videoRef.current.muted;
        videoRef.current.muted = currentlyMuted;
        setIsMuted(currentlyMuted);
    }
  };

  const togglePlay = () => {
      if (videoRef.current) {
          if (videoRef.current.paused) {
              videoRef.current.play();
          } else {
              videoRef.current.pause();
          }
      }
  };

  return (
    <div className="w-full">
      {/* Video Hero Section */}
      <div className="relative flex items-center justify-center text-center overflow-hidden h-[75vh] md:h-[80vh]">
        <video
          ref={videoRef}
          key={videoSrc} // Force re-render when src changes
          autoPlay
          loop
          muted={isMuted}
          playsInline
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          src={videoSrc}
        >
          Your browser does not support the video tag.
        </video>
        
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
        
        {!isPlaying && (
          <div className="relative z-20 max-w-3xl mx-auto px-4">
              <TribeLogo className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-8 animate-pulse" />
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-serif text-white mb-6 leading-tight drop-shadow-2xl">
                Real World Proof of Value
              </h1>
              <p className="text-xl sm:text-2xl md:text-3xl font-light italic text-white/95 leading-relaxed drop-shadow-lg">
                Every act of kindness becomes currency.<br />
                Every person matters.
              </p>
          </div>
        )}
        
        {/* Video Controls */}
        <div className="absolute bottom-4 flex justify-center items-center w-full z-30 px-4 space-x-4">
            <button
              onClick={togglePlay}
              className="p-2 bg-black/40 rounded-full text-white hover:bg-black/60 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
              {isPlaying ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5" />}
            </button>
            <button
              onClick={toggleMute}
              className="p-2 bg-black/40 rounded-full text-white hover:bg-black/60 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
              aria-label={isMuted ? "Unmute video" : "Mute video"}
            >
              {isMuted ? <VolumeOffIcon className="w-5 h-5" /> : <VolumeUpIcon className="w-5 h-5" />}
            </button>
        </div>
      </div>
      
      {/* Button Section below the video */}
      <div className="max-w-sm mx-auto py-12 px-4">
          <div className="mb-4">
              <InstallButton className="w-full text-sm" />
          </div>
          <Button onClick={() => navigateTo(Page.CLAIM)} className="text-lg flex items-center justify-center space-x-2">
              <TribeLogo className="w-6 h-6" />
              <span>GET $RWPOV TOKENS</span>
          </Button>
      </div>
    </div>
  );
};

export default HomePage;