import { getEvidenceForProduct } from "@/lib/review-evidence";
import type { ProductRecord } from "@/lib/types/product";
import type { ReviewEvidence } from "@/lib/types/review-evidence";

const YOUTUBE_WATCH_RE =
  /^https:\/\/(?:www\.)?youtube\.com\/watch\?v=([A-Za-z0-9_-]{11})(?:&|$)/;

export function parseYoutubeWatchId(url: string): string | null {
  const match = url.match(YOUTUBE_WATCH_RE);
  return match?.[1] ?? null;
}

export type YoutubeEvidenceRef = {
  videoId: string;
  watchUrl: string;
  embedUrl: string;
  thumbnailUrl: string;
  name: string;
  description: string;
  sourceName: string;
};

function refFromUrl(
  watchUrl: string,
  product: ProductRecord,
  evidence?: ReviewEvidence
): YoutubeEvidenceRef | null {
  const videoId = parseYoutubeWatchId(watchUrl);
  if (!videoId) return null;

  const sourceName = evidence?.sourceName ?? "YouTube creator review reference";
  const description =
    evidence?.summary ??
    `Third-party creator review cited as market evidence for ${product.brand} ${product.name}. Official specs remain authoritative.`;

  return {
    videoId,
    watchUrl,
    embedUrl: `https://www.youtube.com/embed/${videoId}`,
    thumbnailUrl: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
    name: `${product.brand} ${product.name} — ${sourceName}`,
    description,
    sourceName,
  };
}

/**
 * Returns the highest-confidence YouTube evidence row for a product, preferring
 * review-evidence.json over raw sourceUrls on the catalogue row.
 */
export function youtubeEvidenceForProduct(
  product: ProductRecord
): YoutubeEvidenceRef | null {
  const fromEvidence = getEvidenceForProduct(product.id).find(
    (row) => row.platform === "youtube" && parseYoutubeWatchId(row.sourceUrl)
  );
  if (fromEvidence) {
    return refFromUrl(fromEvidence.sourceUrl, product, fromEvidence);
  }

  for (const url of product.sourceUrls ?? []) {
    const ref = refFromUrl(url, product);
    if (ref) return ref;
  }

  return null;
}
