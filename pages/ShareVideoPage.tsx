import React from 'react';
import Card from '../components/Card';

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h3 className="text-xl font-bold font-serif text-black mb-3 mt-6 first:mt-0">{children}</h3>
);

const StepNumber: React.FC<{ num: number; title: string; children: React.ReactNode }> = ({ num, title, children }) => (
    <div className="mb-6">
        <h4 className="font-bold text-black text-lg mb-2">{num}. {title}</h4>
        <div className="text-gray-700 space-y-2">{children}</div>
    </div>
);

const ShareVideoPage: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-8 text-gray-800">
            <header className="text-center">
                <h1 className="text-3xl md:text-4xl font-bold font-serif text-black mb-2">How to Submit Your Mission Video</h1>
            </header>

            <Card className="leading-relaxed">
                <StepNumber num={1} title="Do the Act of Kindness">
                    <p>Choose a small but meaningful action — buy someone's coffee, give away a freebie, help a stranger. The key is creating a real human moment of value.</p>
                </StepNumber>

                <StepNumber num={2} title="Capture the Reaction">
                    <p>Film the person's smile, surprise, or gratitude. Keep it short (under 20 seconds), vertical format, and always ask permission if they are identifiable. The video should focus on the proof of the reaction, not the transaction.</p>
                </StepNumber>

                <StepNumber num={3} title="Upload to Telegram">
                    <p>Join our official $RWPOV Missions channel.</p>
                    <div className="my-4 text-center">
                        <a 
                            href="https://t.me/+aRriCx1u3kJjM2Ix"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block text-center font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white bg-gray-900 text-white hover:bg-gray-700 focus:ring-gray-900"
                        >
                            Join $RWPOV Missions Channel
                        </a>
                    </div>
                    <p>Drop your video directly in the chat.</p>
                    <p className="mt-2 italic">By posting, you agree your video can be reshared across KINGLEY TR!BE platforms.</p>
                </StepNumber>

                <StepNumber num={4} title="What Happens Next">
                    <p>Your video becomes part of the KINGLEY TR!BE archive — a proof-of-valor entry stored on-chain. Every act adds human capital into the $RWPOV network. The more proof-of-value moments you create, the more $RWPOV flows into circulation and the more your bags gain gravity.</p>
                </StepNumber>

                <StepNumber num={5} title="Why This Matters">
                    <p>In the fake digital world, attention is bought and sold. In the KINGLEY TR!BE, authentic human experiences are the currency. When you upload a video, you're literally putting human value on-chain. This isn't hype — it's building a parallel network powered by kindness, loyalty, and proof.</p>
                </StepNumber>

                <StepNumber num={6} title="Build A Better Human Experience">
                    <p>Every video strengthens your standing in the KINGLEY TR!BE, grows the cultural movement, and builds a better human experience — while you pump the value of your own human experience. Giving is receiving.</p>
                </StepNumber>
            </Card>
        </div>
    );
};

export default ShareVideoPage;