
import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { LIVE_EMBED_URL, COPY } from '../constants';
import { getLiveFeed, getLeaderboard } from '../services/geminiService';
import { Submission, LeaderboardEntry } from '../types';

const LivePage: React.FC = () => {
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const [feed, board] = await Promise.all([getLiveFeed(), getLeaderboard()]);
                setSubmissions(feed);
                setLeaderboard(board);
            } catch (error) {
                console.error("Failed to fetch live data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="space-y-12">
            <div>
                <h2 className="text-3xl font-bold font-serif text-black mb-4 text-center">KINGLEY - Proof of Valor</h2>
                <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden border-2 border-gray-300 shadow-lg">
                    <iframe
                        width="100%"
                        height="100%"
                        src={LIVE_EMBED_URL}
                        title="Tribe Livestream"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-bold font-serif text-black mb-4 text-center">#ProofOfValor</h2>
                {isLoading ? (
                     <div className="text-center text-gray-500">Loading submissions...</div>
                ) : submissions.length === 0 ? (
                    <p className="text-center text-gray-500">{COPY.EMPTY_STATE}</p>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {submissions.map(sub => (
                            <div key={sub.id} className="group relative aspect-[9/16] rounded-lg overflow-hidden shadow-lg border-2 border-gray-200">
                                <img src={sub.thumbnailUrl} alt={sub.caption} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                <div className="absolute bottom-0 left-0 p-3 text-white">
                                    <p className="text-xs font-bold">{sub.caption}</p>
                                    <p className="text-xs text-gray-300 font-mono">by {sub.recruiter}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            
            <div>
                <h2 className="text-2xl font-bold font-serif text-black mb-4 text-center">{COPY.LEADERBOARD_TITLE}</h2>
                <Card>
                    {isLoading ? (
                        <div className="text-center text-gray-500">Loading leaderboard...</div>
                    ) : (
                        <ul className="space-y-3">
                            {leaderboard.map(entry => (
                                <li key={entry.rank} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                                    <div className="flex items-center space-x-4">
                                        <span className="font-bold text-lg text-black w-6 text-center">{entry.rank}</span>
                                        <span className="font-mono text-sm text-gray-800">{entry.recruiter}</span>
                                    </div>
                                    <span className="font-bold text-black">{entry.recruits.toLocaleString()} Recruits</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default LivePage;