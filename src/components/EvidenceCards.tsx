import Link from "next/link";
import { getEvidenceForProduct } from "@/lib/review-evidence";

export function EvidenceCards({ productId }: { productId: string }) {
  const rows = getEvidenceForProduct(productId).slice(0, 3);

  if (rows.length === 0) {
    return (
      <div className="mt-4 rounded-2xl border border-zinc-200 p-4 text-sm text-[var(--color-muted)]">
        No community evidence references are attached yet. Official specs and
        scoring rules are still used.
      </div>
    );
  }

  return (
    <section className="mt-5" aria-label="Recommendation evidence">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold text-[var(--text)]">
          Evidence references
        </h3>
        <Link
          href="/methodology/"
          className="text-xs text-[var(--color-accent)] hover:underline"
        >
          Methodology
        </Link>
      </div>
      <div className="mt-2 space-y-2">
        {rows.map((row) => (
          <article
            key={row.id}
            className="rounded-2xl border border-zinc-200 bg-[var(--background)] p-4"
          >
            <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--color-muted)]">
              <span>{row.sourceName}</span>
              <span>·</span>
              <span>{row.language.toUpperCase()}</span>
              <span>·</span>
              <span>confidence {(row.confidence * 100).toFixed(0)}%</span>
            </div>
            <p className="mt-2 text-sm text-[var(--text)]">{row.summary}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {row.themes.map((theme) => (
                <span
                  key={theme}
                  className="rounded-full bg-[var(--color-accent-soft)] px-2 py-1 text-xs text-[var(--text)]"
                >
                  {theme.replace("_", " ")}
                </span>
              ))}
            </div>
            <a
              href={row.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block text-xs text-[var(--color-accent)] hover:underline"
            >
              Open source reference
            </a>
          </article>
        ))}
      </div>
      <p className="mt-2 text-xs text-[var(--color-muted)]">
        We show metadata summaries and links only; no copied third-party review
        text is displayed.
      </p>
    </section>
  );
}
