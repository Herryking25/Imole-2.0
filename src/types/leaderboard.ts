export interface LeaderboardEntry {
  id: string;
  rank: number;
  anonymousName: string;
  avatarId: string;
  points: number;
  streak: number;
  isCurrentUser?: boolean;
  badge?: string;
}

