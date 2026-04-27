"use client";

import { useConsent } from "@/context/ConsentContext";

export default function PrivacyChoicesPage() {
  const { consent, openSettings, rejectNonEssential } = useConsent();

  return (
    <main className="flex-1 py-16">
      <div className="layout-band max-w-3xl space-y-5 text-[var(--color-muted)]">
        <h1 className="text-3xl font-semibold text-[var(--text)]">
          Privacy choices
        </h1>
        <p>
          Manage analytics, advertising, personalization, and Do Not Sell or
          Share choices. Your current advertising opt-out is{" "}
          <strong className="text-[var(--text)]">
            {consent.doNotSellShare ? "on" : "off"}
          </strong>
          .
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={openSettings}
            className="rounded-2xl bg-[var(--color-accent)] px-5 py-3 text-sm font-medium text-white"
          >
            Open cookie settings
          </button>
          <button
            type="button"
            onClick={rejectNonEssential}
            className="rounded-2xl border border-zinc-300 px-5 py-3 text-sm dark:border-zinc-600"
          >
            Do not sell/share or use non-essential tracking
          </button>
        </div>
      </div>
    </main>
  );
}
