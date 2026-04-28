import { AdSlot } from "@/components/AdSlot";
import { RecentHistory } from "@/components/RecentHistory";
import { ResultsClient } from "./ResultsClient";
import { t } from "@/lib/i18n";

export function ResultsShell({ locale = "en" }: { locale?: "en" | "zh" }) {
  const copy = t(locale).results;
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
          <ResultsClient locale={locale} />
        </div>
        <RecentHistory />
        <AdSlot id="results-bottom" />
      </div>
    </main>
  );
}

export default function ResultsPage() {
  return <ResultsShell locale="en" />;
}
