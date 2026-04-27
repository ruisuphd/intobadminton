"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { defaultUserProfile, type UserProfile } from "@/lib/taxonomy";

const STORAGE_KEY = "intobadminton.profile.v1";
const HISTORY_KEY = "intobadminton.history.v1";
const COMPARE_KEY = "intobadminton.compare.v1";
const MAX_HISTORY = 12;
const MAX_COMPARE = 3;

type HistoryEntry = {
  at: string;
  profile: UserProfile;
  topIds: string[];
};

type Ctx = {
  profile: UserProfile;
  setProfile: (p: UserProfile | ((prev: UserProfile) => UserProfile)) => void;
  history: HistoryEntry[];
  pushHistory: (topIds: string[]) => void;
  compareIds: string[];
  toggleCompare: (id: string) => void;
  clearCompare: () => void;
};

const ProfileContext = createContext<Ctx | null>(null);

function load<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfileState] = useState<UserProfile>(defaultUserProfile);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- one-time localStorage hydrate */
    setProfileState(load(STORAGE_KEY, defaultUserProfile()));
    setHistory(load(HISTORY_KEY, []));
    setCompareIds(load(COMPARE_KEY, []));
    setHydrated(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  }, [profile, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  }, [history, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(COMPARE_KEY, JSON.stringify(compareIds));
  }, [compareIds, hydrated]);

  const setProfile = useCallback(
    (p: UserProfile | ((prev: UserProfile) => UserProfile)) => {
      setProfileState((prev) => (typeof p === "function" ? p(prev) : p));
    },
    []
  );

  const pushHistory = useCallback(
    (topIds: string[]) => {
      setHistory((h) => {
        const next: HistoryEntry = {
          at: new Date().toISOString(),
          profile: { ...profile },
          topIds,
        };
        return [next, ...h].slice(0, MAX_HISTORY);
      });
    },
    [profile]
  );

  const toggleCompare = useCallback((id: string) => {
    setCompareIds((c) => {
      if (c.includes(id)) return c.filter((x) => x !== id);
      if (c.length >= MAX_COMPARE) return [...c.slice(1), id];
      return [...c, id];
    });
  }, []);

  const clearCompare = useCallback(() => setCompareIds([]), []);

  const value = useMemo(
    () => ({
      profile,
      setProfile,
      history,
      pushHistory,
      compareIds,
      toggleCompare,
      clearCompare,
    }),
    [profile, setProfile, history, pushHistory, compareIds, toggleCompare, clearCompare]
  );

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
}

export function useProfile() {
  const c = useContext(ProfileContext);
  if (!c) throw new Error("useProfile outside ProfileProvider");
  return c;
}

export const compareLimit = MAX_COMPARE;
