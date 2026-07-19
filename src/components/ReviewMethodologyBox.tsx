import Link from "next/link";

/**
 * Standard "what I tested" callout for review articles. Surfaces the
 * editorial spine (hands-on sessions, string setup, verification dates)
 * without requiring per-article JSON fields yet.
 */
export function ReviewMethodologyBox({
  updatedAt,
}: {
  /** ISO date from the article record. */
  updatedAt: string;
}) {
  return (
    <aside
      aria-label="How this review was produced"
      className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface-muted)] p-5"
    >
      <p className="text-sm font-semibold text-[var(--text)]">
        What I tested
      </p>
      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[var(--color-muted)]">
        <li>
          My own club sessions (Div 4, Irish league) with named string
          setups and shuttle speeds where relevant.
        </li>
        <li>
          Manufacturer specs cross-checked against my claims registry; stale
          numbers are flagged inline.
        </li>
        <li>
          Judgments blend objective analysis with first-person outcome moments
          — not spec recitation alone.
        </li>
      </ul>
      <p className="mt-4 text-xs text-[var(--color-subtle)]">
        Last updated{" "}
        <time dateTime={updatedAt}>{updatedAt}</time>. See the{" "}
        <Link href="/methodology/" className="text-[var(--color-accent)] underline">
          methodology page
        </Link>{" "}
        for scoring weights and source-authority labels.
      </p>
    </aside>
  );
}
