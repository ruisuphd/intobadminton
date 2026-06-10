import { getBrand } from "@/lib/brands";
import { productDisplayName } from "@/lib/product-display-names";
import { getEvidenceForProduct } from "@/lib/review-evidence";
import type { ProductRecord } from "@/lib/types/product";
import type { ReviewEvidence } from "@/lib/types/review-evidence";

const YOUTUBE_WATCH_RE =
  /^https:\/\/(?:www\.)?youtube\.com\/watch\?v=([A-Za-z0-9_-]{11})(?:&|$)/;

const BRAND_SLUG_BY_PREFIX: Record<string, string> = {
  yy: "yonex",
  vic: "victor",
  li: "li-ning",
  mizuno: "mizuno",
  anta: "anta",
  bonny: "bonny",
  kawasaki: "kawasaki",
  kumpoo: "kumpoo",
};

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

function brandLabelForProductId(productId: string): string {
  const prefix = productId.split("-")[0] ?? "";
  const brandId = BRAND_SLUG_BY_PREFIX[prefix];
  return brandId ? (getBrand(brandId)?.name ?? prefix) : prefix;
}

function refFromParts(
  watchUrl: string,
  productId: string,
  productName: string,
  brand: string,
  evidence?: ReviewEvidence
): YoutubeEvidenceRef | null {
  const videoId = parseYoutubeWatchId(watchUrl);
  if (!videoId) return null;

  const sourceName = evidence?.sourceName ?? "YouTube creator review reference";
  const description =
    evidence?.summary ??
    `Third-party creator review cited as market evidence for ${brand} ${productName}. Official specs remain authoritative.`;

  return {
    videoId,
    watchUrl,
    embedUrl: `https://www.youtube.com/embed/${videoId}`,
    thumbnailUrl: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
    name: `${brand} ${productName} — ${sourceName}`,
    description,
    sourceName,
  };
}

function refFromUrl(
  watchUrl: string,
  product: ProductRecord,
  evidence?: ReviewEvidence
): YoutubeEvidenceRef | null {
  return refFromParts(
    watchUrl,
    product.id,
    product.name,
    product.brand,
    evidence
  );
}

/**
 * Client-safe YouTube evidence lookup using review-evidence.json and the slim
 * display-name map — avoids importing full `products.json` into ResultCard.
 */
export function youtubeEvidenceForProductId(
  productId: string
): YoutubeEvidenceRef | null {
  const fromEvidence = getEvidenceForProduct(productId).find(
    (row) => row.platform === "youtube" && parseYoutubeWatchId(row.sourceUrl)
  );
  const name = productDisplayName(productId);
  if (!fromEvidence || !name) return null;

  return refFromParts(
    fromEvidence.sourceUrl,
    productId,
    name,
    brandLabelForProductId(productId),
    fromEvidence
  );
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
