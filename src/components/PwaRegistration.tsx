"use client";

import { useEffect, useState } from "react";

const SECOND_VISIT_KEY = "intobadminton.visit-count.v1";

// BeforeInstallPromptEvent isn't in lib.dom yet (still a draft). Cast minimally.
type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

/**
 * Service-worker registration and "install IntoBadminton" prompt handler.
 *
 * The install prompt is suppressed on the first visit — per the
 * IMPROVEMENT_PLAN, we only surface it on visit 2+ so we don't ask before
 * the user has any reason to install us. Counts are stored locally; the
 * prompt is suppressed once dismissed.
 *
 * Service worker is registered in production only. In dev mode, an active
 * SW can mask hot-reload changes.
 */
export function PwaRegistration() {
  const [installEvent, setInstallEvent] = useState<InstallPromptEvent | null>(
    null
  );
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (typeof navigator === "undefined" || !("serviceWorker" in navigator))
      return;

    const register = () => {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        /* registration failures are non-fatal; site still works without offline */
      });
    };

    if (typeof requestIdleCallback === "function") {
      const id = requestIdleCallback(register, { timeout: 4000 });
      return () => cancelIdleCallback(id);
    }

    const timer = setTimeout(register, 1);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Bump visit count on every full page load.
    try {
      const raw = localStorage.getItem(SECOND_VISIT_KEY);
      const next = (raw ? Number(raw) : 0) + 1;
      localStorage.setItem(SECOND_VISIT_KEY, String(next));
    } catch {
      /* ignore */
    }

    const handler = (e: Event) => {
      e.preventDefault();
      const evt = e as InstallPromptEvent;
      setInstallEvent(evt);
      // Only show the toast on visit 2+ AND if the user hasn't dismissed it.
      let visits = 1;
      let dismissed = false;
      try {
        visits = Number(localStorage.getItem(SECOND_VISIT_KEY) ?? "1");
        dismissed = localStorage.getItem("intobadminton.install.dismissed") === "1";
      } catch {
        /* ignore */
      }
      if (visits >= 2 && !dismissed) setShowPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const onInstall = async () => {
    if (!installEvent) return;
    await installEvent.prompt();
    await installEvent.userChoice;
    setShowPrompt(false);
    setInstallEvent(null);
  };

  const onDismiss = () => {
    try {
      localStorage.setItem("intobadminton.install.dismissed", "1");
    } catch {
      /* ignore */
    }
    setShowPrompt(false);
  };

  if (!showPrompt || !installEvent) return null;

  return (
    <div
      role="dialog"
      aria-label="Install IntoBadminton"
      className="fixed inset-x-4 bottom-4 z-40 mx-auto max-w-md rounded-2xl border border-[color:var(--line-strong)] bg-white p-4 shadow-lg"
    >
      <p className="text-sm font-medium text-[var(--text)]">
        Install IntoBadminton
      </p>
      <p className="mt-1 text-xs text-[var(--color-muted)]">
        Faster opens, works offline for the finder + last-viewed pages, and
        no app store. Free.
      </p>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={onInstall}
          className="inline-flex h-9 items-center justify-center rounded-full bg-[var(--color-accent)] px-4 text-sm font-medium text-white hover:bg-[var(--color-accent-hover)]"
        >
          Install
        </button>
        <button
          type="button"
          onClick={onDismiss}
          className="inline-flex h-9 items-center justify-center rounded-full border border-[color:var(--line-strong)] px-4 text-sm text-[var(--text)] hover:border-[var(--text)]"
        >
          Not now
        </button>
      </div>
    </div>
  );
}
