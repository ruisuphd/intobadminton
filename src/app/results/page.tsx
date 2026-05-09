import type { Metadata } from "next";
import { RecentHistory } from "@/components/RecentHistory";
import { ResultsClient } from "./ResultsClient";
import { t } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Your badminton equipment shortlist — IntoBadminton",
  description: "Personalised badminton equipment recommendations from your finder profile.",
  alternates: { canonical: "/results/" },
  robots: { index: false, follow: true },
};

export function ResultsShell() {
  const copy = t("en").results;
  return (
    <main className="flex-1 py-16">
      <div className="layout-band max-w-6xl">
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--text)]">
          {copy.title}
        </h1>
        <p className="mt-2 max-w-2xl text-[var(--color-muted)]">
          {copy.subtitle}
        </p>
        <div className="mt-8">
          <ResultsClient />
        </div>
        <RecentHistory />
      </div>
    </main>
  );
}

export default function ResultsPage() {
  return <ResultsShell />;
}
