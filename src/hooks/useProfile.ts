import { useApp } from './useApp';
import { ProfileService } from '../services/profileService';
import type { ProfileSetupPayload, ChildProfile } from '../types/profile';

export function useProfile() {
  const { profile, isOnboarded, refreshState, resetChildProfile } = useApp();

  const createProfile = (payload: ProfileSetupPayload): ChildProfile => {
    const created = ProfileService.createProfile(payload);
    refreshState();
    return created;
  };

  const updateProfile = (partial: Partial<ChildProfile>): ChildProfile | null => {
    const updated = ProfileService.updateProfile(partial);
    refreshState();
    return updated;
  };

  return {
    profile,
    isOnboarded,
    createProfile,
    updateProfile,
    resetChildProfile,
  };
}

