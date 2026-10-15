import React, { useState, useEffect, useCallback, useMemo } from 'react';
import type {
  BackendParentUser,
  LinkedChild,
  ParentLoginPayload,
  ParentLoginResponse,
  ParentRegisterPayload,
  ParentRegisterResponse,
  LinkChildResponse,
  GetChildProgressResponse,
  ShareCardData,
  BackendCertificateItem,
} from '../types/parentApi';
import { ParentApiClient } from '../services/api/parentApiClient';
import { ParentContext } from './ParentContextObject';

const PARENT_USER_KEY = 'imole_v1_parent_user';
const PARENT_CHILDREN_KEY = 'imole_v1_parent_children';
const SELECTED_CHILD_KEY = 'imole_v1_parent_selected_child';

export const ParentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [parent, setParent] = useState<BackendParentUser | null>(() => {
    try {
      const saved = localStorage.getItem(PARENT_USER_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [childrenList, setChildrenList] = useState<LinkedChild[]>(() => {
    try {
      const saved = localStorage.getItem(PARENT_CHILDREN_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [selectedChildId, setSelectedChildIdState] = useState<string | null>(() => {
    return localStorage.getItem(SELECTED_CHILD_KEY) || null;
  });

  const [progressData, setProgressData] = useState<GetChildProgressResponse | null>(null);
  const [shareCardData, setShareCardData] = useState<ShareCardData | null>(null);
  const [certificates, setCertificates] = useState<BackendCertificateItem[]>([]);

  const [isLoadingChildren, setIsLoadingChildren] = useState<boolean>(false);
  const [isLoadingProgress, setIsLoadingProgress] = useState<boolean>(false);
  const [isLoadingShareCard, setIsLoadingShareCard] = useState<boolean>(false);
  const [isLoadingCertificates, setIsLoadingCertificates] = useState<boolean>(false);

  const isAuthenticated = Boolean(ParentApiClient.hasToken());

  const setSelectedChildId = useCallback((id: string) => {
    setSelectedChildIdState(id);
    localStorage.setItem(SELECTED_CHILD_KEY, id);
  }, []);

  const selectedChild = useMemo(() => {
    if (!childrenList.length) return null;
    if (!selectedChildId) return childrenList[0];
    return childrenList.find((c) => c._id === selectedChildId) || childrenList[0];
  }, [childrenList, selectedChildId]);

  // Keep selectedChildId in sync with available children
  useEffect(() => {
    if (childrenList.length > 0) {
      if (!selectedChildId || !childrenList.some((c) => c._id === selectedChildId)) {
        setSelectedChildId(childrenList[0]._id);
      }
    } else {
      setSelectedChildIdState(null);
      localStorage.removeItem(SELECTED_CHILD_KEY);
    }
  }, [childrenList, selectedChildId, setSelectedChildId]);

  // Refresh linked children list from backend
  const refreshChildren = useCallback(async () => {
    if (!ParentApiClient.hasToken()) return;
    setIsLoadingChildren(true);
    try {
      const res = await ParentApiClient.getChildren();
      if (res.success && Array.isArray(res.children)) {
        setChildrenList(res.children);
        localStorage.setItem(PARENT_CHILDREN_KEY, JSON.stringify(res.children));
      }
    } catch (err) {
      console.warn('[ParentContext] Failed to fetch children:', err);
    } finally {
      setIsLoadingChildren(false);
    }
  }, []);

  // Refresh progress for child
  const refreshProgress = useCallback(async (targetChildId?: string) => {
    const activeId = targetChildId || selectedChild?._id;
    if (!ParentApiClient.hasToken() || !activeId) return;

    setIsLoadingProgress(true);
    try {
      const res = await ParentApiClient.getChildProgress(activeId);
      if (res.success) {
        setProgressData(res);
      }
    } catch (err) {
      console.warn('[ParentContext] Failed to fetch child progress:', err);
    } finally {
      setIsLoadingProgress(false);
    }
  }, [selectedChild?._id]);

  // Refresh share card for child
  const refreshShareCard = useCallback(async (targetChildId?: string) => {
    const activeId = targetChildId || selectedChild?._id;
    if (!ParentApiClient.hasToken() || !activeId) return;

    setIsLoadingShareCard(true);
    try {
      const res = await ParentApiClient.getChildShareCard(activeId);
      if (res.success && res.card) {
        setShareCardData(res.card);
      }
    } catch (err) {
      console.warn('[ParentContext] Failed to fetch share card:', err);
    } finally {
      setIsLoadingShareCard(false);
    }
  }, [selectedChild?._id]);

  // Refresh certificates for child
  const refreshCertificates = useCallback(async (targetChildId?: string) => {
    const activeId = targetChildId || selectedChild?._id;
    if (!ParentApiClient.hasToken() || !activeId) return;

    setIsLoadingCertificates(true);
    try {
      const res = await ParentApiClient.getChildCertificates(activeId);
      if (res.success && Array.isArray(res.certificates)) {
        setCertificates(res.certificates);
      }
    } catch (err) {
      console.warn('[ParentContext] Failed to fetch child certificates:', err);
    } finally {
      setIsLoadingCertificates(false);
    }
  }, [selectedChild?._id]);

  // Load children when authenticated on mount
  useEffect(() => {
    if (isAuthenticated) {
      refreshChildren();
    }
  }, [isAuthenticated, refreshChildren]);

  // Whenever selected child changes, load progress, certificates, and share card
  useEffect(() => {
    if (selectedChild?._id && isAuthenticated) {
      refreshProgress(selectedChild._id);
      refreshCertificates(selectedChild._id);
      refreshShareCard(selectedChild._id);
    }
  }, [selectedChild?._id, isAuthenticated, refreshProgress, refreshCertificates, refreshShareCard]);

  // Login handler
  const login = useCallback(
    async (payload: ParentLoginPayload): Promise<ParentLoginResponse> => {
      const res = await ParentApiClient.login(payload);
      if (res.success && res.parent) {
        setParent(res.parent);
        localStorage.setItem(PARENT_USER_KEY, JSON.stringify(res.parent));
        await refreshChildren();
      }
      return res;
    },
    [refreshChildren]
  );

  // Register handler
  const register = useCallback(
    async (payload: ParentRegisterPayload): Promise<ParentRegisterResponse> => {
      const res = await ParentApiClient.register(payload);
      if (res.success && res.parent) {
        setParent(res.parent);
        localStorage.setItem(PARENT_USER_KEY, JSON.stringify(res.parent));
        await refreshChildren();
      }
      return res;
    },
    [refreshChildren]
  );

  // Logout handler
  const logout = useCallback(() => {
    ParentApiClient.logout();
    setParent(null);
    setChildrenList([]);
    setSelectedChildIdState(null);
    setProgressData(null);
    setShareCardData(null);
    setCertificates([]);
    localStorage.removeItem(PARENT_USER_KEY);
    localStorage.removeItem(PARENT_CHILDREN_KEY);
    localStorage.removeItem(SELECTED_CHILD_KEY);
    sessionStorage.removeItem('imole_parent_unlocked');
  }, []);

  // Link child handler
  const linkChild = useCallback(
    async (linkCode: string): Promise<LinkChildResponse> => {
      const res = await ParentApiClient.linkChild(linkCode);
      if (res.success && res.child) {
        setChildrenList((prev) => {
          const exists = prev.some((c) => c._id === res.child!._id);
          const updated = exists
            ? prev.map((c) => (c._id === res.child!._id ? res.child! : c))
            : [...prev, res.child!];
          localStorage.setItem(PARENT_CHILDREN_KEY, JSON.stringify(updated));
          return updated;
        });
        setSelectedChildId(res.child._id);
        refreshProgress(res.child._id);
        refreshCertificates(res.child._id);
        refreshShareCard(res.child._id);
      }
      return res;
    },
    [setSelectedChildId, refreshProgress, refreshCertificates, refreshShareCard]
  );

  return (
    <ParentContext.Provider
      value={{
        parent,
        isAuthenticated,
        children: childrenList,
        selectedChild,
        selectedChildId,
        setSelectedChildId,
        progressData,
        shareCardData,
        certificates,
        isLoadingChildren,
        isLoadingProgress,
        isLoadingShareCard,
        isLoadingCertificates,
        login,
        register,
        logout,
        linkChild,
        refreshChildren,
        refreshProgress,
        refreshShareCard,
        refreshCertificates,
      }}
    >
      {children}
    </ParentContext.Provider>
  );
};
