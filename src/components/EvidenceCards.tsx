import Link from "next/link";
import { catalogProductById } from "@/lib/catalog-products";
import { getEvidenceForProduct } from "@/lib/review-evidence";
import {
  parseYoutubeWatchId,
  youtubeEvidenceForProduct,
} from "@/lib/youtube-evidence";

function YoutubeEvidenceCard({
  watchUrl,
  thumbnailUrl,
  sourceName,
  description,
}: {
  watchUrl: string;
  thumbnailUrl: string;
  sourceName: string;
  description: string;
}) {
  return (
    <article className="rounded-2xl border border-[color:var(--line)] bg-[var(--background)] p-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <a
          href={watchUrl}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="block shrink-0 overflow-hidden rounded-xl border border-[color:var(--line)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumbnailUrl}
            alt=""
            width={168}
            height={94}
            className="aspect-video w-full max-w-[168px] object-cover sm:w-[168px]"
            loading="lazy"
            decoding="async"
          />
        </a>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--color-muted)]">
            <span className="rounded-full bg-[var(--color-accent-soft)] px-2 py-0.5 font-medium text-[var(--text)]">
              Creator video
            </span>
            <span>{sourceName}</span>
          </div>
          <p className="mt-2 text-sm text-[var(--text)]">{description}</p>
          <a
            href={watchUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="mt-3 inline-block text-xs font-medium text-[var(--color-accent)] hover:underline"
          >
            Watch on YouTube
          </a>
        </div>
      </div>
    </article>
  );
}

export function EvidenceCards({ productId }: { productId: string }) {
  const product = catalogProductById(productId);
  const youtube = product ? youtubeEvidenceForProduct(product) : null;
  const youtubeWatchId = youtube ? parseYoutubeWatchId(youtube.watchUrl) : null;

  const rows = getEvidenceForProduct(productId)
    .filter((row) => {
      if (!youtubeWatchId) return true;
      const rowId = parseYoutubeWatchId(row.sourceUrl);
      return rowId !== youtubeWatchId;
    })
    .slice(0, 3);

  if (!youtube && rows.length === 0) {
    return (
      <div className="mt-4 rounded-2xl border border-[color:var(--line)] p-4 text-sm text-[var(--color-muted)]">
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
        {youtube && (
          <YoutubeEvidenceCard
            watchUrl={youtube.watchUrl}
            thumbnailUrl={youtube.thumbnailUrl}
            sourceName={youtube.sourceName}
            description={youtube.description}
          />
        )}
        {rows.map((row) => (
          <article
            key={row.id}
            className="rounded-2xl border border-[color:var(--line)] bg-[var(--background)] p-4"
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
              rel="noopener noreferrer nofollow"
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
