"use client";

import Link from "next/link";
import { useMemo } from "react";
import { FitScoreBadge } from "@/components/FitScoreBadge";
import { ProductFitScoreRadar } from "@/components/FitScoreRadar";
import { ProductBuyLink } from "@/components/ProductBuyLink";
import { SaveProductButton } from "@/components/SaveProductButton";
import { useProfile } from "@/context/ProfileContext";
import { profileToResultsPath } from "@/lib/profile-url";
import {
  isFinderProfileReady,
  profileForProductCategory,
} from "@/lib/profile-ready";
import { referenceClubDoublesProfile } from "@/lib/reference-profile";
import { scoreOneProduct } from "@/lib/scoring";
import type { ProductRecord } from "@/lib/types/product";

/**
 * Catalog actions on a review article or PDP when the slug maps to a product row.
 */
export function ReviewProductPanel({
  product,
  quizPath = "/quiz/",
}: {
  product: ProductRecord;
  quizPath?: string;
}) {
  const { profile, storageReady } = useProfile();
  const label = `${product.brand} ${product.name}`;

  const { scored, usingPersonalProfile } = useMemo(() => {
    const ready = storageReady && isFinderProfileReady(profile);
    if (ready) {
      const personal = scoreOneProduct(
        product,
        profileForProductCategory(profile, product.category)
      );
      if (personal) {
        return { scored: personal, usingPersonalProfile: true };
      }
    }
    const referenceProfile = referenceClubDoublesProfile(product.category);
    const reference = scoreOneProduct(product, referenceProfile);
    return {
      scored: reference,
      usingPersonalProfile: false,
    };
  }, [product, profile, storageReady]);

  const shortlistPath = useMemo(() => {
    if (usingPersonalProfile) {
      return profileToResultsPath(
        profileForProductCategory(profile, product.category),
        8
      );
    }
    const referenceProfile = referenceClubDoublesProfile(product.category);
    return profileToResultsPath(referenceProfile, 8);
  }, [product.category, profile, usingPersonalProfile]);

  if (!scored) return null;

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
            {usingPersonalProfile ? (
              <>
                Fit for your saved profile —{" "}
                <Link
                  href={quizPath}
                  className="text-[var(--color-accent)] hover:underline"
                >
                  retake the quiz
                </Link>{" "}
                to update.
              </>
            ) : (
              <>
                Illustrative fit for a club doubles player —{" "}
                <Link
                  href={quizPath}
                  className="text-[var(--color-accent)] hover:underline"
                >
                  take the quiz
                </Link>{" "}
                for your shortlist.
              </>
            )}
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
          href={shortlistPath}
          className="font-medium text-[var(--color-accent)] hover:underline"
        >
          {usingPersonalProfile
            ? "See your shortlist →"
            : "See club doubles shortlist →"}
        </Link>
      </p>
    </aside>
  );
}
