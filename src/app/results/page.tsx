import { AdSlot } from "@/components/AdSlot";
import { RecentHistory } from "@/components/RecentHistory";
import { ResultsClient } from "./ResultsClient";

export default function ResultsPage() {
  return (
    <main className="flex-1 py-16">
      <div className="layout-band max-w-6xl">
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--text)]">
          Your shortlist
        </h1>
        <p className="mt-2 max-w-2xl text-[var(--color-muted)]">
          Ranked by a demo scoring model — verify specs on the manufacturer site
          before you buy. Not medical advice for injuries.
        </p>
        <div className="mt-8">
          <ResultsClient />
        </div>
        <RecentHistory />
        <AdSlot id="results-bottom" />
      </div>
    </main>
  );
}
