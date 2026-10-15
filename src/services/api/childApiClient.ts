import type {
  CreateChildPayload,
  CreateChildResponse,
  GetChildProfileResponse,
  UpdateChildPayload,
  GetTodayChallengeResponse,
  SubmitChallengePayload,
  SubmitChallengeResponse,
  GetStreakResponse,
  GetProgressResponse,
  LinkCodeResponse,
  GetLeaderboardResponse,
} from '../../types/childApi';

const TOKEN_KEY = 'imole_v1_child_token';
const API_BASE_URL =
  (import.meta.env.VITE_API_URL as string) ||
  'https://imole-junction-backend.onrender.com/api/v1';

export class ChildApiClient {
  static getToken(): string | null {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  }

  static setToken(token: string): void {
    try {
      localStorage.setItem(TOKEN_KEY, token);
    } catch (err) {
      console.error('[ChildApiClient] Failed to save token:', err);
    }
  }

  static clearToken(): void {
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch (err) {
      console.error('[ChildApiClient] Failed to clear token:', err);
    }
  }

  static hasToken(): boolean {
    return Boolean(this.getToken());
  }

  private static async request<T>(
    endpoint: string,
    options: RequestInit = {},
    timeoutMs: number = 25000
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = this.getToken();

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(options.headers as Record<string, string> || {}),
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, {
        ...options,
        headers,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data = await response.json().catch(() => ({
        success: false,
        message: `HTTP ${response.status}: Failed to parse JSON response`,
      }));

      if (response.status === 401) {
        console.warn('[ChildApiClient] 401 Unauthorized encountered');
      }

      return data as T;
    } catch (err: unknown) {
      clearTimeout(timeoutId);
      const isAbort = (err as Error)?.name === 'AbortError';
      const message = isAbort
        ? 'Request timed out while connecting to the server. Render may be waking up.'
        : (err as Error)?.message || 'Network error occurred';

      console.error(`[ChildApiClient] Error requesting ${endpoint}:`, message);

      return {
        success: false,
        message,
      } as unknown as T;
    }
  }

  // ── Child Endpoints ──

  static async createProfile(payload: CreateChildPayload): Promise<CreateChildResponse> {
    const res = await this.request<CreateChildResponse>('/children', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    if (res.success && res.token) {
      this.setToken(res.token);
    }

    return res;
  }

  static async getProfile(): Promise<GetChildProfileResponse> {
    return this.request<GetChildProfileResponse>('/children/me', {
      method: 'GET',
    });
  }

  static async updateProfile(payload: UpdateChildPayload): Promise<GetChildProfileResponse> {
    return this.request<GetChildProfileResponse>('/children/me', {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
  }

  static async getTodayChallenge(): Promise<GetTodayChallengeResponse> {
    return this.request<GetTodayChallengeResponse>('/children/me/challenge/today', {
      method: 'GET',
    });
  }

  static async submitTodayChallenge(payload: SubmitChallengePayload): Promise<SubmitChallengeResponse> {
    return this.request<SubmitChallengeResponse>('/children/me/challenge/today/submit', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  static async swapTodayChallenge(): Promise<GetTodayChallengeResponse> {
    return this.request<GetTodayChallengeResponse>('/children/me/challenge/today/swap', {
      method: 'POST',
    });
  }

  static async getStreak(): Promise<GetStreakResponse> {
    return this.request<GetStreakResponse>('/children/me/streak', {
      method: 'GET',
    });
  }

  static async getProgress(): Promise<GetProgressResponse> {
    return this.request<GetProgressResponse>('/children/me/progress', {
      method: 'GET',
    });
  }

  static async createLinkCode(): Promise<LinkCodeResponse> {
    return this.request<LinkCodeResponse>('/children/me/link-code', {
      method: 'POST',
    });
  }

  static async getLeaderboard(period: 'weekly' | 'all_time' = 'weekly'): Promise<GetLeaderboardResponse> {
    return this.request<GetLeaderboardResponse>(`/leaderboard?period=${period}`, {
      method: 'GET',
    });
  }
}
