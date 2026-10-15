import { MOCK_LEADERBOARD } from '../data/mockLeaderboard';
import { ProfileService } from './profileService';
import { ProgressService } from './progressService';
import { ChildApiClient } from './api/childApiClient';
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

  static async fetchLeaderboard(
    period: 'weekly' | 'all_time' = 'weekly',
    customProgress?: OverallProgress
  ): Promise<{ entries: LeaderboardEntry[]; currentUser?: LeaderboardEntry }> {
    const profile = ProfileService.getProfile();

    if (ChildApiClient.hasToken()) {
      try {
        const res = await ChildApiClient.getLeaderboard(period);
        if (res.success && Array.isArray(res.top) && res.top.length > 0) {
          const remoteEntries: LeaderboardEntry[] = res.top.map((item) => {
            const isMe = Boolean(
              (res.me && res.me.anonymousUsername === item.anonymousUsername) ||
              (profile && profile.anonymousNickname === item.anonymousUsername)
            );
            return {
              id: item.anonymousUsername,
              rank: item.rank,
              anonymousName: isMe ? `${item.anonymousUsername} (You)` : item.anonymousUsername,
              avatarId: isMe ? profile?.avatarId || 'avatar-eagle' : 'avatar-lion',
              points: item.points,
              streak: item.currentStreak,
              isCurrentUser: isMe,
              badge: item.currentStreak >= 3 ? 'Active Streak 🔥' : 'Explorer',
            };
          });

          let currentUser: LeaderboardEntry | undefined = remoteEntries.find((e) => e.isCurrentUser);

          if (!currentUser && res.me) {
            currentUser = {
              id: res.me.anonymousUsername,
              rank: res.me.rank,
              anonymousName: `${res.me.anonymousUsername} (You)`,
              avatarId: profile?.avatarId || 'avatar-eagle',
              points: res.me.points,
              streak: res.me.currentStreak,
              isCurrentUser: true,
              badge: res.me.currentStreak >= 3 ? 'Active Streak 🔥' : 'Explorer',
            };
            remoteEntries.push(currentUser);
          }

          return { entries: remoteEntries, currentUser };
        }
      } catch (err) {
        console.warn('[LeaderboardService] Remote leaderboard failed, using local fallback:', err);
      }
    }

    const localEntries = this.getLeaderboard(customProgress);
    const currentUser = localEntries.find((e) => e.isCurrentUser);
    return { entries: localEntries, currentUser };
  }
}
