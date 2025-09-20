import React, { useState } from 'react';
import Card from '../components/Card';
import { TribeLogo, PlayIcon, XIcon, ChartPieIcon } from '../components/icons';

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h2 className="text-2xl font-bold font-serif text-black mb-4">{children}</h2>
);

const ListItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <li className="list-disc ml-6 mb-2 text-gray-700">{children}</li>
);

// Helper components for the Tokenomics modal for clean, consistent formatting
const ModalSectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h3 className="text-xl font-bold font-serif text-black mb-3 mt-6 first:mt-0">{children}</h3>
);
const ModalSubTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h4 className="font-semibold text-black mt-4 mb-2">{children}</h4>
);
const ModalListItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <li className="list-disc ml-6 mb-2">{children}</li>
);


const RwovPage: React.FC = () => {
    const [isVideoOpen, setIsVideoOpen] = useState(false);
    const [isTokenomicsOpen, setIsTokenomicsOpen] = useState(false);

    return (
        <div className="max-w-3xl mx-auto space-y-8">
             <header className="text-center">
                <TribeLogo className="w-24 h-24 mx-auto mb-4" />
                <h1 className="text-3xl md:text-4xl font-bold font-serif text-black mb-2">KINGLEY & $RWPOV</h1>
                <p className="text-lg text-gray-600">The Parallel Universe and its Meme Coin.</p>
                <div className="mt-8 flex flex-col items-center space-y-4">
                    <button
                        onClick={() => setIsVideoOpen(true)}
                        className="inline-flex items-center justify-center text-center font-bold py-3 px-8 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white bg-white border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white focus:ring-gray-900 w-full max-w-xs"
                    >
                        <PlayIcon className="w-5 h-5 mr-2" />
                        Watch: A Meme Coin with Meaning
                    </button>
                    <button
                        onClick={() => setIsTokenomicsOpen(true)}
                        className="inline-flex items-center justify-center text-center font-bold py-3 px-8 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white bg-white border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white focus:ring-gray-900 w-full max-w-xs"
                    >
                        <ChartPieIcon className="w-5 h-5 mr-2" />
                        TOKENOMICS
                    </button>
                </div>
            </header>
            
            <Card>
                <SectionTitle>What is KINGLEY?</SectionTitle>
                <p className="text-gray-700 mb-4 italic">
                    KINGLEY is not a government, not a political movement — it is a parallel universe.
                    <br />
                    It is a cultural movement, a story, and a community of belonging.
                </p>
                <p className="text-gray-800 font-semibold mb-3">KINGLEY is the Who and the Why:</p>
                <ul className="space-y-2 mb-4">
                    <ListItem>A culture that refuses to live in the fake simulation.</ListItem>
                    <ListItem>A flag, an identity, and a code of honor called #ProofOfValor.</ListItem>
                    <ListItem>A new way of belonging — not through division or politics, but through acts of real-world value.</ListItem>
                </ul>
                <p className="text-gray-700 mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <span className="font-bold">In simple terms:</span> KINGLEY is the story we live in together.
                    <br />
                    It is the movement to build a better human experience.
                </p>
            </Card>

            <Card>
                <SectionTitle>What is $RWPOV?</SectionTitle>
                <p className="text-gray-700 mb-4 italic">
                    $RWPOV is the meme coin of KINGLEY.
                    <br />
                    It stands for Real World Proof of Value.
                </p>
                <p className="text-gray-800 font-semibold mb-3">$RWPOV is the What and the How:</p>
                 <ul className="space-y-2 mb-4">
                    <ListItem>A digital token you can buy and hold.</ListItem>
                    <ListItem>A memetic unit of value tied to the story of KINGLEY.</ListItem>
                    <ListItem>A record of alignment — backed not by speculation alone, but by the meaning we create together.</ListItem>
                </ul>
                <p className="text-gray-700 mb-4">
                    Every bag of $RWPOV is a bet on humanity.
                    Every token is a stake in the parallel universe we are building.
                    And when you share your #ProofOfValor — an act of real-world kindness — you amplify the story, infuse the meme with energy, and strengthen the community.
                </p>
                <p className="text-gray-700 mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <span className="font-bold">In simple terms:</span> KINGLEY is the parallel universe. $RWPOV is its meme coin.
                </p>
            </Card>

            <Card className="border-yellow-300 bg-yellow-50 text-yellow-900 text-sm">
                <p>
                    $RWPOV is a meme coin launched on pump.fun.
                    It is not legal tender, not an investment contract, not financial advice, and not a promise of profit.
                    It is a digital collectible token tied to a cultural movement.
                </p>
            </Card>

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
                    src="https://healvideos.s3.us-east-2.amazonaws.com/Meme+Coin+with+Meaning-VEED.mp4"
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

            {isTokenomicsOpen && (
                <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 animate-fade-in">
                    <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full flex flex-col max-h-[90vh]">
                        <div className="flex justify-between items-center p-4 border-b border-gray-200 sticky top-0 bg-white rounded-t-xl z-10">
                            <h2 className="text-xl font-bold font-serif text-black">Tokenomics & Roadmap</h2>
                            <button
                                onClick={() => setIsTokenomicsOpen(false)}
                                className="p-1 text-gray-500 hover:text-black transition-colors rounded-full hover:bg-gray-100"
                                aria-label="Close"
                            >
                                <XIcon className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto text-left text-sm text-gray-800">
                            <img src="https://i.imgur.com/1kfLyAv.png" alt="Tokenomics Chart" className="rounded-lg mb-6 w-full shadow-md border border-gray-200" />
                            
                            <ModalSectionTitle>Explanation of Allocations</ModalSectionTitle>
                            
                            <ModalSubTitle>Liquid & Circulating Supply (85%):</ModalSubTitle>
                            <p>This represents the majority of tokens that will be in the hands of the community. It includes:</p>
                            <ul className="mt-2">
                                <ModalListItem>Tokens sold during the Pump.fun bonding curve phase.</ModalListItem>
                                <ModalListItem>Tokens provided as initial liquidity on Raydium (which are locked forever because the LP is burned).</ModalListItem>
                                <ModalListItem>Tokens sold on the open market after launch.</ModalListItem>
                            </ul>
                            <p className="mt-2">This is the community's share. Its value is determined by the open market.</p>

                            <ModalSubTitle>Transparent Founder Treasury (15%):</ModalSubTitle>
                            <p>This is the portion retained by the founders. Its purpose is exclusively for funding the project's growth and compensating the team for their full-time work. This treasury will be held in a public multi-signature wallet requiring 2/3 signatures for any transaction, ensuring transparency and community trust.</p>

                            <ModalSectionTitle>The Official Kingley Protocol Roadmap (v1.0)</ModalSectionTitle>
                            
                            <ModalSubTitle>Phase 0: The Genesis (Complete)</ModalSubTitle>
                            <ul>
                                <ModalListItem>Finalize Brand & Manifesto</ModalListItem>
                                <ModalListItem>Secure Social Media Handles (@KingleyProtocol)</ModalListItem>
                                <ModalListItem>Develop Recruit "Mission Kit" (Pitch Deck, Consent Forms, Kingley Cards)</ModalListItem>
                                <ModalListItem>Establish Legal Framework for Operations</ModalListItem>
                            </ul>

                            <ModalSubTitle>Phase 1: The Fair Launch (Target: [Date])</ModalSubTitle>
                             <ul>
                                <ModalListItem>Mint $RWPOV on Pump.fun</ModalListItem>
                                <ModalListItem>Community pushes the bonding curve to $69k MCap</ModalListItem>
                                <ModalListItem>Automatic launch on Raydium</ModalListItem>
                                <ModalListItem>IMMEDIATELY BURN 100% of Liquidity Pool (LP) Tokens</ModalListItem>
                                <ModalListItem>Pin the LP Burn transaction hash on Twitter as proof of trust</ModalListItem>
                                <ModalListItem>Deploy multi-sig treasury wallet (e.g., Squads)</ModalListItem>
                                <ModalListItem>Transfer 15% of total supply to the public multi-sig treasury</ModalListItem>
                            </ul>

                            <ModalSubTitle>Phase 2: The First Mission (Target: 1-2 Weeks Post-Launch)</ModalSubTitle>
                             <ul>
                                <ModalListItem>Onboard first 10 "Recruits"</ModalListItem>
                                <ModalListItem>Execute the first official Valor Drop at a local business</ModalListItem>
                                <ModalListItem>Launch the 24/7 Kingley Live Stream featuring Valor Drop footage</ModalListItem>
                                <ModalListItem>Initiate community governance for treasury proposals</ModalListItem>
                            </ul>
                            
                            <ModalSubTitle>Phase 3: Scaling Value (Target: Q1 2025)</ModalSubTitle>
                             <ul>
                                <ModalListItem>Onboard 100+ active Recruits</ModalListItem>
                                <ModalListItem>Partner with 10+ businesses for official Valor Drops</ModalListItem>
                                <ModalListItem>Launch marketplace for Kingley Mission Kits & branded merchandise</ModalListItem>
                                <ModalListItem>Implement Founder Salary Protocol from treasury, based on milestone achievements</ModalListItem>
                            </ul>

                            <ModalSubTitle>Phase 4: The Protocol (Target: 2025 and Beyond)</ModalSubTitle>
                             <ul>
                                <ModalListItem>Develop and release the Kingley Protocol App for managing Missions and rewards</ModalListItem>
                                <ModalListItem>Expand to new verticals (Taco Drops, Smoothie Drops, etc.)</ModalListItem>
                                <ModalListItem>Formalize the DAO structure for full community governance</ModalListItem>
                                <ModalListItem><strong className="text-black">[ Continuous Imperative: ]</strong> Never deviate from the core mission: Creating Real World Proof of Value.</ModalListItem>
                            </ul>
                            
                            <ModalSectionTitle>The Kingley Covenant: Our Pledge of Trust</ModalSectionTitle>
                            <p>We believe in radical transparency. Our binding covenant with you, the community, is simple:</p>
                             <ul className="mt-2">
                                <ModalListItem><strong className="text-black">The LP is Burned.</strong> We cannot rug pull. The liquidity is forever locked.</ModalListItem>
                                <ModalListItem><strong className="text-black">The Treasury is Public.</strong> Every transaction from the multi-sig wallet is visible for all to see.</ModalListItem>
                                <ModalListItem><strong className="text-black">Salaries are Performance-Based.</strong> Founder compensation is tied to achieving public growth milestones, not empty promises.</ModalListItem>
                                <ModalListItem><strong className="text-black">We Measure What Matters.</strong> Our primary metrics are Acts of Valor completed, businesses partnered, and lives touched—not just price charts.</ModalListItem>
                            </ul>
                            <p className="mt-4 font-semibold text-black">This is our blueprint. This is how we build something real.</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RwovPage;