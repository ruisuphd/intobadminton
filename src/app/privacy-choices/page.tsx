"use client";

import Link from "next/link";
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
            className="rounded-2xl border border-[color:var(--line-strong)] px-5 py-3 text-sm"
          >
            Do not sell/share or use non-essential tracking
          </button>
        </div>

        <section className="mt-16 rounded-2xl bg-[color:var(--color-accent-soft)] p-7 text-center">
          <h2 className="text-xl font-semibold text-[var(--text)]">
            Looking for equipment instead?
          </h2>
          <p className="mt-3 text-sm text-[var(--color-muted)]">
            Browse the full catalog with filters for brand, weight, balance, and
            price — or run the finder for a personalised shortlist.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <Link href="/catalog/" className="btn-primary">
              Browse full catalog
            </Link>
            <Link href="/quiz/" className="btn-secondary">
              Start the finder
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
