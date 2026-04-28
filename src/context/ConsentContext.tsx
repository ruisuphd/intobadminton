"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  CONSENT_STORAGE_KEY,
  consentModePayload,
  defaultConsent,
  makeConsent,
  makeConsentForMode,
  normalizeConsent,
  type ConsentDraft,
  type ConsentPreferences,
} from "@/lib/consent";
import { readJson, writeJson } from "@/lib/storage";

declare global {
  interface Navigator {
    globalPrivacyControl?: boolean;
  }

  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type ConsentContextValue = {
  consent: ConsentPreferences;
  hasChoice: boolean;
  settingsOpen: boolean;
  openSettings: () => void;
  closeSettings: () => void;
  saveConsent: (draft: ConsentDraft) => void;
  acceptAll: () => void;
  rejectNonEssential: () => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

function gpcEnabled() {
  if (typeof navigator === "undefined") return false;
  return navigator.globalPrivacyControl === true;
}

const adOperationalMode = process.env.NEXT_PUBLIC_ADSENSE_MODE || "disabled";

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [hasChoice, setHasChoice] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [consent, setConsent] = useState<ConsentPreferences>(() =>
    defaultConsent()
  );

  useEffect(() => {
    const stored = readJson<Partial<ConsentPreferences> | null>(
      CONSENT_STORAGE_KEY,
      null
    );
    /* eslint-disable react-hooks/set-state-in-effect -- one-time localStorage consent hydrate */
    setHasChoice(stored != null);
    setConsent(normalizeConsent(stored, gpcEnabled()));
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  useEffect(() => {
    if (typeof window.gtag === "function") {
      window.gtag("consent", "update", consentModePayload(consent));
    }
  }, [consent]);

  const persist = useCallback((next: ConsentPreferences) => {
    setConsent(next);
    setHasChoice(true);
    writeJson(CONSENT_STORAGE_KEY, next);
  }, []);

  const saveConsent = useCallback(
    (draft: ConsentDraft) => {
      persist(makeConsentForMode(draft, adOperationalMode));
      setSettingsOpen(false);
    },
    [persist]
  );

  const acceptAll = useCallback(() => {
    persist(
      makeConsent({
        analytics: true,
        ads: adOperationalMode === "cmp_tcf",
        personalization: adOperationalMode === "cmp_tcf",
        doNotSellShare: false,
      })
    );
  }, [persist]);

  const rejectNonEssential = useCallback(() => {
    persist(
      makeConsent({
        analytics: false,
        ads: false,
        personalization: false,
        doNotSellShare: true,
      })
    );
  }, [persist]);

  const value = useMemo(
    () => ({
      consent,
      hasChoice,
      settingsOpen,
      openSettings: () => setSettingsOpen(true),
      closeSettings: () => setSettingsOpen(false),
      saveConsent,
      acceptAll,
      rejectNonEssential,
    }),
    [consent, hasChoice, settingsOpen, saveConsent, acceptAll, rejectNonEssential]
  );

  return (
    <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>
  );
}

export function useConsent() {
  const value = useContext(ConsentContext);
  if (!value) throw new Error("useConsent outside ConsentProvider");
  return value;
}
