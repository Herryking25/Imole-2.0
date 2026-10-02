import { useApp } from './useApp';

export function useProgress() {
  const { progress } = useApp();
  return {
    totalPoints: progress.totalPoints,
    totalCompleted: progress.totalCompleted,
    skills: progress.skills,
    history: progress.history,
  };
}

