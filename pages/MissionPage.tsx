
import React, { useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import { COPY } from '../constants';
import { useWallet } from '../hooks/useWallet';
import { CheckCircleIcon, XIcon } from '../components/icons';
import ConnectWalletPrompt from '../components/ConnectWalletPrompt';
import { Page } from '../types';

interface MissionPageProps {
    navigateTo: (page: Page) => void;
}

const MissionItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="flex items-start space-x-3">
        <CheckCircleIcon className="w-6 h-6 text-black flex-shrink-0 mt-1" />
        <p className="text-gray-700">{children}</p>
    </div>
);

const ModalStep: React.FC<{ num: number; title: string; children: React.ReactNode }> = ({ num, title, children }) => (
    <div>
        <h4 className="font-bold text-black text-base">Step {num}: {title}</h4>
        <p className="mt-1 text-gray-700">{children}</p>
    </div>
);


const MissionPage: React.FC<MissionPageProps> = ({ navigateTo }) => {
    const { isConnected } = useWallet();
    const [isInstructionsOpen, setIsInstructionsOpen] = useState(false);

    if (!isConnected) {
        return <ConnectWalletPrompt />;
    }

    return (
        <>
            <div className="max-w-2xl mx-auto space-y-8">
                <Card>
                    <h2 className="text-2xl font-bold font-serif text-black mb-4 text-center">KINGLEY Mission Statement</h2>
                    <p className="text-gray-700 mb-4 italic text-center">We are building a better human experience.</p>
                    <p className="text-gray-700 mb-4">Every random act of kindness is proof of goodness in the world — a living receipt that says we are still human.</p>
                    <p className="text-gray-700 mb-4">Today, the world is deficient in kindness. Most people wait for it, but few create it.</p>
                    <p className="text-gray-700 mb-4"><span className="font-bold text-black">KINGLEY changes that.</span> With every small act, you leave behind two things:</p>
                    <ul className="list-disc pl-6 my-4 space-y-2 text-gray-900">
                        <li>A <span className="font-semibold">smile</span> in the real world.</li>
                        <li>A <span className="font-semibold">token</span> in the digital world.</li>
                    </ul>
                    <p className="text-gray-700 mb-4">Both are proof. Both live on. Both spread.</p>
                    <p className="text-gray-700 mb-4 font-semibold">Be the source. Change the world, one random act of kindness at a time.</p>
                    <p className="text-black font-serif text-lg mt-6 text-center">This is the way.</p>
                </Card>

                <Card>
                    <h2 className="text-2xl font-bold font-serif text-black mb-4">{COPY.MISSION_CARD_TITLE}</h2>
                    <div className="space-y-4">
                        <MissionItem>{COPY.MISSION_CHECKLIST.split('→')[0].trim()}</MissionItem>
                        <MissionItem>{COPY.MISSION_CHECKLIST.split('→')[1].trim()}</MissionItem>
                        <MissionItem>{COPY.MISSION_CHECKLIST.split('→')[2].trim()}</MissionItem>
                        <MissionItem>{COPY.MISSION_CHECKLIST.split('→')[3].trim()}</MissionItem>
                    </div>
                </Card>

                <Card>
                    <h3 className="font-bold text-lg text-black mb-4">Share Your Missions (Video Footage) With Everyone!</h3>
                    <div className="space-y-4">
                         <Button onClick={() => navigateTo(Page.RECRUIT)}>
                            Build The Movement
                         </Button>
                         <Button variant="secondary" onClick={() => setIsInstructionsOpen(true)}>
                             Submit to Telegram Missions Group
                         </Button>
                    </div>
                </Card>
            </div>

            {isInstructionsOpen && (
                 <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 animate-fade-in">
                    <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full flex flex-col max-h-[90vh]">
                        <div className="flex justify-between items-center p-4 border-b border-gray-200 sticky top-0 bg-white rounded-t-xl z-10">
                            <h2 className="text-xl font-bold font-serif text-black">How to Submit Your Mission Video</h2>
                            <button
                                onClick={() => setIsInstructionsOpen(false)}
                                className="p-1 text-gray-500 hover:text-black transition-colors rounded-full hover:bg-gray-100"
                                aria-label="Close"
                            >
                                <XIcon className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto text-left text-sm space-y-4">
                           <p className="text-gray-800">Follow these steps to share your #ProofOfValor with the community.</p>
                           
                            <div className="text-center my-4">
                                <a 
                                    href="https://t.me/+aRriCx1u3kJjM2Ix"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block w-full max-w-xs text-center font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white bg-gray-900 text-white hover:bg-gray-700 focus:ring-gray-900"
                                >
                                    Open Telegram Group
                                </a>
                            </div>

                           <ModalStep num={1} title="Join the Group">
                                The button above will take you to the official KINGLEY / $RWPOV Missions group on Telegram. Tap "Join Group."
                           </ModalStep>
                           <ModalStep num={2} title="Read the Rules">
                               At the top of the group, you’ll see a pinned message. Read it carefully — it explains the mission guidelines, video format, and permissions.
                           </ModalStep>
                           <ModalStep num={3} title="Go to the Submissions Group">
                               In the pinned message or group description, there’s a link to the Mission Submissions group. Tap the link and join that group — this is where you upload your videos.
                           </ModalStep>
                           <ModalStep num={4} title="Record Your Mission Video">
                                <ul className="list-disc pl-5 mt-2 space-y-1">
                                    <li>Keep it short (under 20 seconds).</li>
                                    <li>Film vertically (portrait mode) so it works well on TikTok/Instagram.</li>
                                    <li>Make it positive, uplifting, and authentic.</li>
                                    <li>Always ask permission before filming other people.</li>
                                </ul>
                           </ModalStep>
                           <ModalStep num={5} title="Upload Your Video">
                               In the Mission Submissions group, tap the paperclip icon (attachment). Select your video. Choose "Send as File" instead of just “Video” — this keeps the quality high. Hit Send.
                           </ModalStep>
                           <ModalStep num={6} title="Agreement">
                               By submitting, you agree that KINGLEY / $RWPOV can repost your video across its official channels and that your video may be shared publicly as part of the Proof of Valor movement.
                           </ModalStep>
                           <ModalStep num={7} title="Confirmation">
                               Admins will review your video. If approved, it will appear in the main feed or be shared during livestreams.
                           </ModalStep>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default MissionPage;