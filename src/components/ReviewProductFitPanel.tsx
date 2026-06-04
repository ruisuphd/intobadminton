import Link from "next/link";
import { ProductFitScoreBadge } from "@/components/FitScoreBadge";
import { ProductFitScoreRadar } from "@/components/FitScoreRadar";
import type { ScoredProduct } from "@/lib/types/product";

/**
 * Neutral-profile fit breakdown for a mapped product on `/review/[slug]/`.
 * Uses the default finder profile so the chart is illustrative, not personalised.
 */
export function ReviewProductFitPanel({
  scored,
  quizHref = "/quiz/",
}: {
  scored: ScoredProduct;
  quizHref?: string;
}) {
  return (
    <aside
      aria-label="Fit score preview"
      className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface-muted)] p-5"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-subtle)]">
            Finder fit preview
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
            Scored against a neutral club-player profile. Run the{" "}
            <Link href={quizHref} className="text-[var(--color-accent)] underline">
              equipment finder
            </Link>{" "}
            to see how this frame ranks for your level, style, and budget.
          </p>
        </div>
        <ProductFitScoreBadge product={scored} size={64} />
      </div>
      <div className="mt-6 flex justify-center">
        <ProductFitScoreRadar product={scored} size={220} />
      </div>
    </aside>
  );
}
