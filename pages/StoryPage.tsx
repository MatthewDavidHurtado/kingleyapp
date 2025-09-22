
import React from 'react';
import Card from '../components/Card';

const Quote: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
    <blockquote className={`my-4 p-4 border-l-4 border-black bg-gray-50 text-gray-800 italic ${className}`}>
        {children}
    </blockquote>
);

const HandwrittenNote: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <p className="font-serif text-black text-lg">
        {children}
    </p>
);

const StoryPage: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-6 text-gray-800">
             <header className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold font-serif text-black mb-2">The Story of KINGLEY</h1>
                <p className="text-lg text-gray-600">Where it all began.</p>
            </header>

            <Card className="leading-relaxed">
                <p className="mb-4">
                    A few years ago, I was walking by the beach when a car full of teenagers pulled over. They didn’t know me. They could have just kept driving. But instead, they got out, walked up to me, and handed me a piece of art they had made.
                </p>

                <div className="my-6 flex justify-center">
                    <img src="https://i.imgur.com/wEABzuu.jpeg" alt="Handmade art from the story" className="rounded-lg shadow-lg max-w-sm w-full border-2 border-gray-300" />
                </div>

                <p className="mb-4">
                    It was bright and bold, hand-colored with care. Around the edges were little notes:
                </p>
                
                <div className="my-6 p-4 rounded-lg bg-gray-100 space-y-2 text-center border border-gray-200">
                    <HandwrittenNote>“444 Jeg elsker deg ♡”</HandwrittenNote>
                    <HandwrittenNote>“You’re amazing.”</HandwrittenNote>
                    <HandwrittenNote>“Peace + Love.”</HandwrittenNote>
                </div>

                <p className="mb-4">
                    The girl who handed it to me smiled and simply said:
                </p>
                <Quote>
                    “You are awesome.”
                </Quote>
                <p className="mb-4">
                    Then they left. No agenda. No strings attached. Just pure kindness.
                </p>
            </Card>

            <Card>
                <h2 className="text-2xl font-serif text-black mb-4">
                    <span className="block sm:inline">And it stayed with me.</span>
                    <span className="block sm:inline"> For years.</span>
                </h2>
                <p className="mb-4">
                    That moment became a marker in my life — proof that even the smallest act of kindness can ripple out and live in someone’s heart long after it’s given. Proof that goodness in the world is still real. Proof that we all have the power to create moments that matter.
                </p>
                <p className="text-xl font-bold text-black mt-6">
                    That memory is the seed of KINGLEY.
                </p>
            </Card>

             <Card>
                <p className="mb-4">
                    Because if a group of kids with paper, markers, and courage could change my day — even my life — then imagine what a global tribe of people armed with kindness and connection can do.
                </p>
                <p className="text-black font-serif text-2xl mt-6 text-center tracking-wider">
                    <span className="block sm:inline">This is the movement.</span>
                    <span className="block sm:inline"> This is the way.</span>
                </p>
             </Card>

        </div>
    );
};

export default StoryPage;