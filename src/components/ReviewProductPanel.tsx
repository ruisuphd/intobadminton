"use client";

import Link from "next/link";
import { FitScoreBadge } from "@/components/FitScoreBadge";
import { ProductFitScoreRadar } from "@/components/FitScoreRadar";
import { ProductBuyLink } from "@/components/ProductBuyLink";
import { SaveProductButton } from "@/components/SaveProductButton";
import { profileToSearchParams } from "@/lib/profile-url";
import type { ScoredProduct } from "@/lib/types/product";
import { referenceClubDoublesProfile } from "@/lib/reference-profile";

/**
 * Catalog actions on a review article when the slug maps to a product row.
 */
export function ReviewProductPanel({
  scored,
  quizPath = "/quiz/",
}: {
  scored: ScoredProduct;
  quizPath?: string;
}) {
  const label = `${scored.brand} ${scored.name}`;
  const referenceProfile = referenceClubDoublesProfile(scored.category);
  const resultsParams = profileToSearchParams(referenceProfile);
  resultsParams.set("n", "8");
  const personalizedUrl = `/results/?${resultsParams.toString()}`;

  return (
    <aside
      aria-label="Equipment finder"
      className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface-muted)] p-5"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-subtle)]">
            In the finder
          </p>
          <p className="text-base font-semibold text-[var(--text)]">{label}</p>
          <FitScoreBadge fitScore={scored.fitScore} size={56} />
          <p className="text-xs text-[var(--color-muted)]">
            Illustrative fit for a club doubles player —{" "}
            <Link href={quizPath} className="text-[var(--color-accent)] hover:underline">
              take the quiz
            </Link>{" "}
            for your shortlist.
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <SaveProductButton id={scored.id} label={label} />
          <ProductBuyLink
            id={scored.id}
            brand={scored.brand}
            name={scored.name}
            officialSourceUrl={scored.officialSourceUrl}
          />
        </div>
      </div>

      <details className="mt-4">
        <summary className="cursor-pointer text-sm font-medium text-[var(--color-accent)]">
          How this scores on five factors
        </summary>
        <div className="mt-3 flex justify-center">
          <ProductFitScoreRadar product={scored} size={200} />
        </div>
      </details>

      <p className="mt-4 text-sm">
        <Link
          href={personalizedUrl}
          className="font-medium text-[var(--color-accent)] hover:underline"
        >
          See club doubles shortlist →
        </Link>
      </p>
    </aside>
  );
}
