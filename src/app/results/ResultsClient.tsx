"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
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
  }, [rows, pushHistory]);

  if (!profile.level || !profile.discipline) {
    return (
      <p className="text-[var(--color-muted)]">
        Complete the{" "}
        <Link href="/quiz/" className="text-[var(--color-accent)] underline">
          finder
        </Link>{" "}
        first.
      </p>
    );
  }

  if (profile.category !== "racket") {
    return (
      <p className="text-[var(--color-muted)]">
        Rackets are live first — switch category in the finder when available.
      </p>
    );
  }

  if (rows.length === 0) {
    return (
      <p className="text-[var(--color-muted)]">
        No strong matches for this profile yet — try relaxing budget or
        style inputs.
      </p>
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
