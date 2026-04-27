"use client";

import Link from "next/link";
import { compareLimit, useProfile } from "@/context/ProfileContext";
import type { ScoredRacket } from "@/lib/types/product";

export function ResultCard({
  r,
  rank,
}: {
  r: ScoredRacket;
  rank: number;
}) {
  const { compareIds, toggleCompare } = useProfile();
  const inCompare = compareIds.includes(r.id);
  const full = compareIds.length >= compareLimit && !inCompare;

  return (
    <article className="rounded-2xl border border-zinc-200/90 bg-[var(--surface)] p-6 shadow-sm dark:border-zinc-700/90">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-[var(--color-muted)]">
            #{rank} · {r.brand}
          </p>
          <h2 className="text-xl font-semibold tracking-tight text-[var(--text)]">
            {r.name}
          </h2>
        </div>
        <div className="text-right">
          <p className="text-2xl font-semibold text-[var(--color-accent)]">
            {(r.fitScore * 100).toFixed(0)}
          </p>
          <p className="text-xs text-[var(--color-muted)]">fit score (demo)</p>
        </div>
      </div>
      <p className="mt-1 text-sm text-[var(--color-muted)]">
        ${r.priceUsd} · {r.weightClass} · {r.headWeight.replace("_", " ")} ·{" "}
        {r.shaftFlex} shaft
      </p>
      {r.reasons.length > 0 && (
        <ul className="mt-4 space-y-1 text-sm text-[var(--text)]">
          {r.reasons.map((x) => (
            <li key={x.code} className="flex gap-2">
              <span className="text-[var(--color-accent)]">·</span>
              <span>{x.label}</span>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-4 flex flex-wrap gap-2">
        {r.sourceChips.map((c) => (
          <span
            key={c.type + c.label}
            className="rounded-full bg-[var(--color-accent-soft)] px-3 py-1 text-xs text-[var(--text)]"
          >
            {c.type.replace("_", " ")}: {c.label}
          </span>
        ))}
      </div>
      {r.editorNote && (
        <p className="mt-3 text-sm italic text-[var(--color-muted)]">
          {r.editorNote}
        </p>
      )}
      <div className="mt-5 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => {
            if (!full || inCompare) toggleCompare(r.id);
          }}
          disabled={full && !inCompare}
          className="inline-flex h-11 items-center justify-center rounded-2xl bg-[var(--color-accent)] px-5 text-sm font-medium text-white transition enabled:hover:opacity-90 disabled:opacity-40"
        >
          {inCompare
            ? "Remove from compare"
            : full
              ? `Max ${compareLimit} in compare`
              : "Add to compare"}
        </button>
        <Link
          href="/compare/"
          className="inline-flex h-11 items-center justify-center rounded-2xl border border-zinc-300 px-4 text-sm dark:border-zinc-600"
        >
          Open compare
        </Link>
      </div>
    </article>
  );
}
