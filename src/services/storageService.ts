const PREFIX = 'imole_v1_';

export const StorageKeys = {
  PROFILE: `${PREFIX}child_profile`,
  PARENT_PROFILE: `${PREFIX}parent_profile`,
  SUBMISSIONS: `${PREFIX}submissions`,
  STREAK: `${PREFIX}streak_data`,
  CUSTOM_CHALLENGES: `${PREFIX}custom_challenges`,
  LANGUAGE: `${PREFIX}preferred_language`,
  ADMIN_SETTINGS: `${PREFIX}admin_settings`,
} as const;

export class StorageService {
  static get<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(key);
      if (item === null) return defaultValue;
      return JSON.parse(item) as T;
    } catch (error) {
      console.warn(`[StorageService] Error reading key "${key}":`, error);
      return defaultValue;
    }
  }

  static set<T>(key: string, value: T): boolean {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`[StorageService] Error writing key "${key}":`, error);
      return false;
    }
  }

  static remove(key: string): boolean {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`[StorageService] Error removing key "${key}":`, error);
      return false;
    }
  }

  static clearAllImoleData(): void {
    Object.values(StorageKeys).forEach((key) => {
      localStorage.removeItem(key);
    });
  }
}

