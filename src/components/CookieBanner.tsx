"use client";

import { useConsent } from "@/context/ConsentContext";

export function CookieBanner() {
  const { hasChoice, acceptAll, rejectNonEssential, openSettings } =
    useConsent();
  const adsMode = process.env.NEXT_PUBLIC_ADSENSE_MODE || "disabled";

  if (hasChoice) return null;

  return (
    <section
      aria-label="Cookie notice"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-zinc-200 bg-[var(--surface)] p-4 shadow-2xl dark:border-zinc-700"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="max-w-3xl">
          <h2 className="font-semibold text-[var(--text)]">
            Privacy-first cookie choices
          </h2>
          <p className="mt-1 text-sm text-[var(--color-muted)]">
            We use necessary local storage for the finder. Analytics and ads are
            optional and are off by default under our strict global baseline.
            {adsMode !== "cmp_tcf"
              ? " Ads remain operationally disabled until a compliant consent platform is configured."
              : ""}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={rejectNonEssential}
            className="rounded-2xl bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-white"
          >
            Reject non-essential
          </button>
          <button
            type="button"
            onClick={openSettings}
            className="rounded-2xl border border-zinc-300 px-4 py-2 text-sm dark:border-zinc-600"
          >
            Customize
          </button>
          <button
            type="button"
            onClick={acceptAll}
            className="rounded-2xl border border-zinc-300 px-4 py-2 text-sm dark:border-zinc-600"
          >
            Accept all
          </button>
        </div>
      </div>
    </section>
  );
}
