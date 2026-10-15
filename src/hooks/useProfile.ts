import { useApp } from './useApp';
import { ProfileService } from '../services/profileService';
import type { ProfileSetupPayload, ChildProfile } from '../types/profile';

export function useProfile() {
  const { profile, isOnboarded, refreshState, resetChildProfile } = useApp();

  const createProfile = async (payload: ProfileSetupPayload): Promise<ChildProfile> => {
    const created = await ProfileService.createProfile(payload);
    refreshState();
    return created;
  };

  const updateProfile = async (partial: Partial<ChildProfile>): Promise<ChildProfile | null> => {
    const updated = await ProfileService.updateProfile(partial);
    refreshState();
    return updated;
  };

  const generateLinkCode = async (): Promise<{ linkCode: string; expiresInSeconds: number }> => {
    return ProfileService.generateLinkCode();
  };

  return {
    profile,
    isOnboarded,
    createProfile,
    updateProfile,
    generateLinkCode,
    resetChildProfile,
  };
}
