import { MOCK_LEADERBOARD } from '../data/mockLeaderboard';
import { ProfileService } from './profileService';
import { ProgressService } from './progressService';
import type { LeaderboardEntry } from '../types/leaderboard';
import type { OverallProgress } from '../types/progress';

export class LeaderboardService {
  static getLeaderboard(customProgress?: OverallProgress): LeaderboardEntry[] {
    const profile = ProfileService.getProfile();
    const progress = customProgress || ProgressService.getOverallProgress();

    const entries: LeaderboardEntry[] = MOCK_LEADERBOARD.map((item) => ({ ...item }));

    if (profile) {
      const userEntry: LeaderboardEntry = {
        id: profile.id,
        rank: 0,
        anonymousName: `${profile.anonymousNickname} (You)`,
        avatarId: profile.avatarId,
        points: progress.totalPoints,
        streak: progress.streak.currentStreak,
        isCurrentUser: true,
        badge: progress.streak.currentStreak >= 3 ? 'Active Streak 🔥' : 'Explorer',
      };
      entries.push(userEntry);
    }

    // Sort by points descending, then by streak descending
    entries.sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      return b.streak - a.streak;
    });

    // Reassign ranks
    return entries.map((entry, idx) => ({
      ...entry,
      rank: idx + 1,
    }));
  }
}

