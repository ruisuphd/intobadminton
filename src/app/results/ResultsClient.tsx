"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { trackEvent } from "@/components/Analytics";
import { ResultCard } from "@/components/ResultCard";
import { useProfile } from "@/context/ProfileContext";
import { scoreProductCatalog } from "@/lib/scoring";

export function ResultsClient() {
  const { profile, pushHistory } = useProfile();
  const rows = useMemo(
    () => scoreProductCatalog(profile).slice(0, 8),
    [profile]
  );

  useEffect(() => {
    if (rows.length === 0) return;
    const ids = rows.map((r) => r.id).join(",");
    const key = `pushed-${ids}`;
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");
    pushHistory(rows.map((r) => r.id));
    trackEvent("recommendations_viewed", {
      result_count: rows.length,
      category: profile.category ?? "unknown",
      top_product_id: rows[0]?.id,
    });
  }, [rows, pushHistory, profile.category]);

  if (!profile.level || !profile.discipline) {
    return (
      <div className="card p-6">
        <h2 className="font-semibold text-[var(--text)]">
          Complete your player profile first
        </h2>
        <p className="mt-2 text-[var(--color-muted)]">
          We need at least your level and discipline to produce a responsible
          shortlist.
        </p>
        <Link
          href="/quiz/"
          className="mt-4 inline-block text-[var(--color-accent)] underline"
        >
          Start the finder
        </Link>
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <div className="card p-6">
        <h2 className="font-semibold text-[var(--text)]">
          No strong matches yet
        </h2>
        <p className="mt-2 text-[var(--color-muted)]">
          Try relaxing budget, choosing one fewer style tag, or selecting
          another equipment category.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {rows.map((r, i) => (
        <ResultCard key={r.id} r={r} rank={i + 1} />
      ))}
    </div>
  );
}
