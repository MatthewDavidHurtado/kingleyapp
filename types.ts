
export enum Page {
  HOME = 'home',
  WELCOME = 'welcome',
  RECRUIT = 'recruit',
  CLAIM = 'claim',
  MISSION = 'mission',
  STORY = 'story',
  HOW_TO_FILM = 'how-to-film',
  RELEASE_FORM = 'release-form',
  MISSION_ASSETS = 'mission-assets',
  RWPOV = 'rwov',
  SHARE_VIDEO = 'share-video',
}

export interface Balances {
  sol: number;
  kingley: number;
}

export interface Submission {
  id: string;
  videoUrl: string;
  thumbnailUrl: string;
  caption: string;
  recruiter: string; // pubkey truncated
}

export interface LeaderboardEntry {
  rank: number;
  recruiter: string; // pubkey truncated
  recruits: number;
}

export enum ClaimStatus {
  IDLE,
  CONNECTING,
  CLAIMING,
  SUCCESS,
  ERROR,
}

export interface ClaimResult {
    success: boolean;
    message: string;
    data?: {
        welcomeAmounts: Balances;
    };
}