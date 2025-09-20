
import { GoogleGenAI } from "@google/genai";
import { LeaderboardEntry, Submission, ClaimResult } from '../types';
import { GAS_STIPEND_SOL, WELCOME_KINGLEY_AMOUNT } from '../constants';

let ai: GoogleGenAI | null = null;

// Safely initialize the AI client to prevent crashing the app in a browser environment
// where process.env is not defined.
try {
  if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  } else {
    console.info("Gemini AI client not initialized: API_KEY not found in environment.");
  }
} catch (error) {
    console.error("Could not initialize Gemini AI client:", error);
}


// --- SIMULATED API FUNCTIONS ---

// This function simulates an airdrop faucet for new users.
export const claimWelcomePack = (publicKey: string): Promise<ClaimResult> => {
    console.log(`Simulating claim for ${publicKey}`);
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                success: true,
                message: "Welcome to the Movement!",
                data: {
                    welcomeAmounts: {
                        sol: GAS_STIPEND_SOL,
                        kingley: WELCOME_KINGLEY_AMOUNT,
                    }
                }
            });
        }, 1500); // Simulate network delay for claim
    });
};


export const generateAddressQR = (publicKey: string): Promise<{ qrDataUrl: string }> => {
    return new Promise(resolve => {
        const qrDataUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(publicKey)}`;
        setTimeout(() => {
            resolve({ qrDataUrl });
        }, 300); // Simulate network delay
    });
};


export const getLiveFeed = (): Promise<Submission[]> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
                { id: '1', videoUrl: '#', thumbnailUrl: 'https://picsum.photos/400/700?random=1', caption: 'Helped a neighbor with their garden!', recruiter: '4aB...cde' },
                { id: '2', videoUrl: '#', thumbnailUrl: 'https://picsum.photos/400/700?random=2', caption: 'Paid for coffee for the person behind me.', recruiter: 'GfH...iJk' },
                { id: '3', videoUrl: '#', thumbnailUrl: 'https://picsum.photos/400/700?random=3', caption: 'Cleaned up trash at a local park.', recruiter: 'LmN...oPq' },
                { id: '4', videoUrl: '#', thumbnailUrl: 'https://picsum.photos/400/700?random=4', caption: 'Donated books to a little free library.', recruiter: 'RsT...uVw' },
            ]);
        }, 800);
    });
};

export const getLeaderboard = (): Promise<LeaderboardEntry[]> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
                { rank: 1, recruiter: '4aB...cde', recruits: 42 },
                { rank: 2, recruiter: 'GfH...iJk', recruits: 35 },
                { rank: 3, recruiter: 'LmN...oPq', recruits: 28 },
                { rank: 4, recruiter: 'RsT...uVw', recruits: 19 },
                { rank: 5, recruiter: 'XyZ...123', recruits: 15 },
            ]);
        }, 1200);
    });
};

export const generateRecruitQR = (publicKey: string): Promise<{ qrDataUrl: string; recruitUrl: string }> => {
    return new Promise(resolve => {
        const recruitUrl = `${window.location.origin}/?ref=${publicKey.slice(0, 8)}`;
        const qrDataUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(recruitUrl)}`;
        setTimeout(() => {
            resolve({ qrDataUrl, recruitUrl });
        }, 500);
    });
};