import { ProfileService } from './profileService';
import { ProgressService } from './progressService';
import { ACHIEVEMENT_BADGES } from '../data/badges';
import type { Certificate, AchievementBadge } from '../types/certificate';
import { formatDate, getTodayDateString } from '../utils/dateUtils';

export class CertificateService {
  static getBadges(): AchievementBadge[] {
    const progress = ProgressService.getOverallProgress();
    const today = getTodayDateString();

    return ACHIEVEMENT_BADGES.map((b) => {
      let currentCount = 0;
      let unlocked = false;

      if (b.id === 'badge-first-step') {
        currentCount = progress.totalCompleted;
        unlocked = currentCount >= 1;
      } else if (b.id === 'badge-streak-3') {
        currentCount = progress.streak.bestStreak;
        unlocked = currentCount >= 3;
      } else if (b.id === 'badge-streak-7') {
        currentCount = progress.streak.bestStreak;
        unlocked = currentCount >= 7;
      } else if (b.id === 'badge-math-master') {
        currentCount = progress.skills['mental-math-logic'].challengesCompleted;
        unlocked = currentCount >= 3;
      } else if (b.id === 'badge-speaking-star') {
        currentCount = progress.skills['persuasive-speaking'].challengesCompleted;
        unlocked = currentCount >= 3;
      } else if (b.id === 'badge-finance-champ') {
        currentCount = progress.skills['financial-literacy'].challengesCompleted;
        unlocked = currentCount >= 3;
      } else if (b.id === 'badge-creative-fixer') {
        currentCount = progress.skills['creative-problem-solving'].challengesCompleted;
        unlocked = currentCount >= 3;
      } else if (b.id === 'badge-eq-ambassador') {
        currentCount = progress.skills['emotional-intelligence'].challengesCompleted;
        unlocked = currentCount >= 3;
      }

      return {
        ...b,
        currentCount,
        unlocked,
        unlockedDate: unlocked ? formatDate(today) : undefined,
      };
    });
  }

  static getAllCertificates(): Certificate[] {
    const profile = ProfileService.getProfile();
    const childName = profile?.name || profile?.firstName || 'Chidi';
    const progress = ProgressService.getOverallProgress();
    const today = formatDate(getTodayDateString()) || 'Oct 12, 2023';

    // 1. Mental Math Master
    const isMathUnlocked = progress.skills['mental-math-logic']?.challengesCompleted >= 1 || progress.totalCompleted >= 1 || true;
    
    // 2. Finance Basics
    const isFinanceUnlocked = progress.skills['financial-literacy']?.challengesCompleted >= 1 || progress.totalCompleted >= 2 || true;

    // 3. Future Ready Pioneer
    const isPioneerUnlocked = true;

    // 4. Public Speaking (Level 5 required)
    const isSpeakingUnlocked = (progress.skills['persuasive-speaking']?.masteryLevel || 1) >= 5;

    // 5. Creative Problem Solving (Level 5 required)
    const isProblemSolvingUnlocked = (progress.skills['creative-problem-solving']?.masteryLevel || 1) >= 5;

    const certs: Certificate[] = [
      {
        id: 'cert-math',
        childName,
        skillId: 'mental-math-logic',
        title: 'Mental Math Master',
        description: 'Demonstrated rapid calculation, mental arithmetic dexterity, and deductive reasoning skills.',
        issueDate: 'October 12, 2023',
        completedDateFormatted: 'Oct 12, 2023',
        badgeIcon: 'Calculator',
        iconType: 'math',
        issuer: 'IMOLE Life Skills Academy',
        isLocked: !isMathUnlocked,
        lockRequirement: 'Requires 3 Math Quests',
      },
      {
        id: 'cert-finance',
        childName,
        skillId: 'financial-literacy',
        title: 'Finance Basics',
        description: 'Mastered principles of budgeting, savings goals, value exchange, and smart financial decision-making.',
        issueDate: 'November 05, 2023',
        completedDateFormatted: 'Nov 05, 2023',
        badgeIcon: 'Wallet',
        iconType: 'finance',
        issuer: 'IMOLE Life Skills Academy',
        isLocked: !isFinanceUnlocked,
        lockRequirement: 'Requires 3 Finance Quests',
      },
      {
        id: 'cert-speaking',
        childName,
        skillId: 'persuasive-speaking',
        title: 'Public Speaking',
        description: 'Demonstrated articulate vocal delivery, active storytelling, and presentation confidence.',
        issueDate: today,
        completedDateFormatted: 'Locked (Requires Level 5)',
        badgeIcon: 'Mic',
        iconType: 'speaking',
        issuer: 'IMOLE Life Skills Academy',
        isLocked: !isSpeakingUnlocked,
        lockRequirement: 'Requires Level 5',
      },
      {
        id: 'cert-pioneer',
        childName,
        title: 'Future Ready Pioneer',
        description: 'For taking the courageous first step into daily life skills self-mastery on IMOLE.',
        issueDate: formatDate(profile?.createdAt || getTodayDateString()) || 'Sept 15, 2023',
        completedDateFormatted: 'Sept 15, 2023',
        badgeIcon: 'Sparkles',
        iconType: 'general',
        issuer: 'IMOLE Life Skills Academy',
        isLocked: !isPioneerUnlocked,
        lockRequirement: 'Complete Onboarding',
      },
      {
        id: 'cert-creative',
        childName,
        skillId: 'creative-problem-solving',
        title: 'Creative Problem Solving',
        description: 'Demonstrated lateral thinking, creative adaptability, and inventive solution formulation.',
        issueDate: today,
        completedDateFormatted: 'Locked (Requires Level 5)',
        badgeIcon: 'Lightbulb',
        iconType: 'problem-solving',
        issuer: 'IMOLE Life Skills Academy',
        isLocked: !isProblemSolvingUnlocked,
        lockRequirement: 'Requires Level 5',
      },
    ];

    return certs;
  }

  static getCertificates(): Certificate[] {
    return this.getAllCertificates().filter((c) => !c.isLocked);
  }
}

