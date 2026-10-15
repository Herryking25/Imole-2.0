import type {
  ParentRegisterPayload,
  ParentRegisterResponse,
  ParentLoginPayload,
  ParentLoginResponse,
  LinkChildResponse,
  GetParentChildrenResponse,
  GetChildProgressResponse,
  GetChildShareCardResponse,
  GetChildCertificatesResponse,
} from '../../types/parentApi';

const TOKEN_KEY = 'imole_v1_parent_token';
const API_BASE_URL =
  (import.meta.env.VITE_API_URL as string) ||
  'https://imole-junction-backend.onrender.com/api/v1';

export class ParentApiClient {
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
      console.error('[ParentApiClient] Failed to save token:', err);
    }
  }

  static clearToken(): void {
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch (err) {
      console.error('[ParentApiClient] Failed to clear token:', err);
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
      ...((options.headers as Record<string, string>) || {}),
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
        console.warn('[ParentApiClient] 401 Unauthorized encountered');
      }

      return data as T;
    } catch (err: unknown) {
      clearTimeout(timeoutId);
      const isAbort = (err as Error)?.name === 'AbortError';
      const message = isAbort
        ? 'Request timed out while connecting to server. The backend server may be waking up, please retry.'
        : (err as Error)?.message || 'Network error occurred';

      console.error(`[ParentApiClient] Error requesting ${endpoint}:`, message);

      return {
        success: false,
        message,
      } as unknown as T;
    }
  }

  // ── Parent Auth Endpoints ──

  static async register(payload: ParentRegisterPayload): Promise<ParentRegisterResponse> {
    const res = await this.request<ParentRegisterResponse>('/parents/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    if (res.success && res.token) {
      this.setToken(res.token);
    }

    return res;
  }

  static async login(payload: ParentLoginPayload): Promise<ParentLoginResponse> {
    const res = await this.request<ParentLoginResponse>('/parents/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    if (res.success && res.token) {
      this.setToken(res.token);
    }

    return res;
  }

  static logout(): void {
    this.clearToken();
  }

  // ── Parent Child Management & Progress Endpoints ──

  static async linkChild(linkCode: string): Promise<LinkChildResponse> {
    return this.request<LinkChildResponse>('/parents/link-child', {
      method: 'POST',
      body: JSON.stringify({ linkCode: linkCode.trim().toUpperCase() }),
    });
  }

  static async getChildren(): Promise<GetParentChildrenResponse> {
    return this.request<GetParentChildrenResponse>('/parents/children', {
      method: 'GET',
    });
  }

  static async getChildProgress(childId: string): Promise<GetChildProgressResponse> {
    return this.request<GetChildProgressResponse>(`/parents/children/${childId}/progress`, {
      method: 'GET',
    });
  }

  static async getChildShareCard(childId: string): Promise<GetChildShareCardResponse> {
    return this.request<GetChildShareCardResponse>(`/parents/children/${childId}/share-card`, {
      method: 'GET',
    });
  }

  static async getChildCertificates(childId: string): Promise<GetChildCertificatesResponse> {
    return this.request<GetChildCertificatesResponse>(`/parents/children/${childId}/certificates`, {
      method: 'GET',
    });
  }
}
