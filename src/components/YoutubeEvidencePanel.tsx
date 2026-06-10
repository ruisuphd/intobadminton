import type { ProductRecord } from "@/lib/types/product";
import { youtubeEvidenceForProduct } from "@/lib/youtube-evidence";

/**
 * Surfaces cited third-party YouTube creator evidence on catalogue PDPs.
 * Pairs with VideoObject JSON-LD from `buildPdpProductJsonLd`.
 */
export function YoutubeEvidencePanel({ product }: { product: ProductRecord }) {
  const evidence = youtubeEvidenceForProduct(product);
  if (!evidence) return null;

  return (
    <section
      className="mt-10"
      aria-labelledby="creator-video-evidence-heading"
    >
      <h2
        id="creator-video-evidence-heading"
        className="text-lg font-semibold text-[var(--text)]"
      >
        Creator review reference
      </h2>
      <p className="mt-1 text-sm text-[var(--color-muted)]">
        Third-party on-court testing cited as market evidence. Official specs
        remain authoritative — see our{" "}
        <a href="/methodology/" className="text-[var(--color-accent)] underline">
          methodology
        </a>
        .
      </p>
      <article className="mt-4 overflow-hidden rounded-2xl border border-[color:var(--line)] bg-white">
        <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-start">
          <a
            href={evidence.watchUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="relative block aspect-video w-full shrink-0 overflow-hidden rounded-xl bg-[var(--surface-muted)] sm:max-w-[220px]"
            aria-label={`Watch ${evidence.sourceName} on YouTube`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={evidence.thumbnailUrl}
              alt=""
              width={220}
              height={124}
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </a>
          <div className="min-w-0 flex-1 space-y-2">
            <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-subtle)]">
              {evidence.sourceName}
            </p>
            <p className="text-sm text-[var(--text)]">{evidence.description}</p>
            <a
              href={evidence.watchUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="inline-flex text-sm font-medium text-[var(--color-accent)] hover:underline"
            >
              Watch on YouTube →
            </a>
          </div>
        </div>
      </article>
    </section>
  );
}
