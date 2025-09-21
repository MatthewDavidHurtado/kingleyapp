import React from 'react';
import Card from '../components/Card';

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h2 className="text-2xl font-bold font-serif text-black mb-4">{children}</h2>
);

const AmbassadorCard: React.FC<{
    name: string;
    location?: string;
    proofOfValor: string;
    avatar: string;
}> = ({ name, location, proofOfValor, avatar }) => (
    <Card className="text-center">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-2 border-gray-300">
            <img src={avatar} alt={name} className="w-full h-full object-cover" />
        </div>
        <h3 className="font-bold text-black text-lg mb-1">{name}</h3>
        {location && <p className="text-sm text-gray-500 mb-3">{location}</p>}
        <p className="text-gray-700 italic text-sm">"{proofOfValor}"</p>
    </Card>
);

// Sample ambassadors data - this would eventually come from a CMS or API
const ambassadors = [
    {
        name: "Sarah J.",
        location: "Austin, TX",
        proofOfValor: "I bought a stranger's lunch. They cried, and I realized this token isn't about crypto — it's about humans.",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
        name: "Marcus K.",
        location: "Denver, CO",
        proofOfValor: "Helped an elderly neighbor with groceries every week. Now she calls me her 'crypto grandson.'",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
        name: "Luna M.",
        location: "Portland, OR",
        proofOfValor: "Started a community garden in my neighborhood. Every tomato grown is proof that kindness multiplies.",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    {
        name: "Alex R.",
        location: "Miami, FL",
        proofOfValor: "Paid for coffee for 50 people in one morning. The barista said it was the best shift of her life.",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
        name: "Jordan T.",
        proofOfValor: "Left encouraging notes in library books. Someone found one during their darkest hour and it changed everything.",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
    },
    {
        name: "Riley C.",
        location: "Seattle, WA",
        proofOfValor: "Organized surprise birthday parties for homeless shelter residents. Joy is the ultimate proof of valor.",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
    }
];

const WhoWeArePage: React.FC = () => {
    return (
        <div className="max-w-6xl mx-auto space-y-12">
            <header className="text-center">
                <h1 className="text-3xl md:text-4xl font-bold font-serif text-black mb-4">Ambassadors of Proof</h1>
                <p className="text-xl text-gray-600 mb-6">The World is Fake. These are the people building a Real One.</p>
            </header>

            <Card className="text-center">
                <p className="text-lg text-gray-700 mb-4">
                    The KINGLEY TR!BE is more than a token. It's a movement. Every act of kindness creates a ripple of value — proof stored on-chain forever.
                </p>
                <p className="text-lg text-gray-700">
                    Our Ambassadors are the ones carrying that fire into the world. They are the faces of Proof. The hands of Valor. The living reminder that human capital is the most valuable currency of all.
                </p>
            </Card>

            <div>
                <SectionTitle>The Proof Keepers</SectionTitle>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {ambassadors.map((ambassador, index) => (
                        <AmbassadorCard
                            key={index}
                            name={ambassador.name}
                            location={ambassador.location}
                            proofOfValor={ambassador.proofOfValor}
                            avatar={ambassador.avatar}
                        />
                    ))}
                </div>
            </div>

            <Card className="text-center bg-gray-50">
                <SectionTitle>Become an Ambassador</SectionTitle>
                <p className="text-gray-700 mb-6">
                    Ready to join the movement? Ambassadors are community members who consistently create proof of valor and help onboard new members to the KINGLEY TR!BE.
                </p>
                <a
                    href="https://t.me/+NkMkrC7FPFs3OGIx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-center font-bold py-3 px-8 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white bg-gray-900 text-white hover:bg-gray-700 focus:ring-gray-900"
                >
                    Join Our Community
                </a>
            </Card>
        </div>
    );
};

export default WhoWeArePage;