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
const SAVED_KEY = "intobadminton.saved.v1";
const MAX_HISTORY = 12;
const MAX_COMPARE = 3;
/** Saved-shortlist soft cap. Beyond this we drop the oldest entry. */
const MAX_SAVED = 25;
/** 30-day TTL on saved items — keeps the list relevant; matches the plan. */
const SAVED_TTL_MS = 30 * 24 * 60 * 60 * 1000;

type HistoryEntry = {
  at: string;
  profile: UserProfile;
  topIds: string[];
};

export type SavedEntry = {
  id: string;
  /** ISO timestamp. Used for TTL pruning and ordering. */
  savedAt: string;
};

type Ctx = {
  profile: UserProfile;
  setProfile: (p: UserProfile | ((prev: UserProfile) => UserProfile)) => void;
  history: HistoryEntry[];
  pushHistory: (topIds: string[]) => void;
  compareIds: string[];
  toggleCompare: (id: string) => void;
  clearCompare: () => void;
  /**
   * Replace the current compare-tray with a curated set (e.g. from a
   * URL `?p=id1,id2,...` share link). Capped at MAX_COMPARE to match
   * the per-device tray limit; ignores empty arrays.
   */
  hydrateCompareFromIds: (ids: string[]) => void;
  /** Persistent saved-product shortlist (separate from the 3-slot compare). */
  saved: SavedEntry[];
  toggleSaved: (id: string) => void;
  isSaved: (id: string) => boolean;
  clearSaved: () => void;
  /** True after profile/compare/saved state is loaded from localStorage. */
  profileStorageHydrated: boolean;
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

function pruneExpiredSaved(entries: SavedEntry[]): SavedEntry[] {
  const cutoff = Date.now() - SAVED_TTL_MS;
  return entries.filter((e) => {
    const t = Date.parse(e.savedAt);
    return Number.isFinite(t) && t >= cutoff;
  });
}

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfileState] = useState<UserProfile>(defaultUserProfile);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [saved, setSaved] = useState<SavedEntry[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- one-time localStorage hydrate */
    setProfileState(load(STORAGE_KEY, defaultUserProfile()));
    setHistory(load(HISTORY_KEY, []));
    setCompareIds(load(COMPARE_KEY, []));
    // Prune TTL-expired saves on hydration; the persisted write below
    // re-flushes the cleaned list back to disk.
    setSaved(pruneExpiredSaved(load(SAVED_KEY, [] as SavedEntry[])));
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

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
  }, [saved, hydrated]);

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

  const hydrateCompareFromIds = useCallback((ids: string[]) => {
    if (!Array.isArray(ids) || ids.length === 0) return;
    const cleaned = ids
      .map((id) => (typeof id === "string" ? id.trim() : ""))
      .filter((id) => id.length > 0)
      .slice(0, MAX_COMPARE);
    if (cleaned.length === 0) return;
    setCompareIds(cleaned);
  }, []);

  const toggleSaved = useCallback((id: string) => {
    setSaved((s) => {
      if (s.some((e) => e.id === id)) {
        return s.filter((e) => e.id !== id);
      }
      const next: SavedEntry = { id, savedAt: new Date().toISOString() };
      // Cap at MAX_SAVED by dropping the oldest entry. New saves go to the top.
      const trimmed = s.length >= MAX_SAVED ? s.slice(0, MAX_SAVED - 1) : s;
      return [next, ...trimmed];
    });
  }, []);

  const isSaved = useCallback(
    (id: string) => saved.some((e) => e.id === id),
    [saved]
  );

  const clearSaved = useCallback(() => setSaved([]), []);

  const value = useMemo(
    () => ({
      profile,
      setProfile,
      history,
      pushHistory,
      compareIds,
      toggleCompare,
      clearCompare,
      hydrateCompareFromIds,
      saved,
      toggleSaved,
      isSaved,
      clearSaved,
      profileStorageHydrated: hydrated,
    }),
    [
      profile,
      setProfile,
      history,
      pushHistory,
      compareIds,
      toggleCompare,
      clearCompare,
      hydrateCompareFromIds,
      saved,
      toggleSaved,
      isSaved,
      clearSaved,
      hydrated,
    ]
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
