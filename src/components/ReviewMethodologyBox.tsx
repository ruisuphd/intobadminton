import Link from "next/link";

const DEFAULT_NOTE =
  "Equipment notes on IntoBadminton combine official spec sheets (with access dates), club-play sessions, and labelled community references. Judgments call out what changed in real rallies — not just catalogue numbers.";

/**
 * Surfaces first-hand testing context at the top of review articles (2026
 * Product Reviews / E-E-A-T expectation). Custom `methodology` copy from JSON
 * overrides the default when present.
 */
export function ReviewMethodologyBox({
  note,
  updatedAt,
}: {
  note?: string;
  updatedAt: string;
}) {
  return (
    <aside
      className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface-muted)] p-5"
      aria-labelledby="what-we-tested-heading"
    >
      <h2
        id="what-we-tested-heading"
        className="text-sm font-semibold uppercase tracking-wide text-[var(--text)]"
      >
        What we tested
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
        {note?.trim() || DEFAULT_NOTE}
      </p>
      <p className="mt-3 text-xs text-[var(--color-subtle)]">
        Last updated{" "}
        <time dateTime={updatedAt}>{updatedAt}</time>
        {" · "}
        <Link href="/methodology/" className="text-[var(--color-accent)] underline">
          Scoring &amp; source methodology
        </Link>
      </p>
    </aside>
  );
}
