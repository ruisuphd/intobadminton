/**
 * Renders a product image with attribution.
 *
 * Image sourcing posture:
 *   - "own" / "amazon" sources are licensed (we own them or use Amazon
 *     Product Advertising API under the Associates agreement) and render
 *     unconditionally.
 *   - Manufacturer hot-links ("yonex", "victor", "lining", "mizuno",
 *     "kawasaki", "kumpoo") rely on nominative fair use for review context.
 *     They are gated behind NEXT_PUBLIC_ALLOW_MANUFACTURER_IMAGES so we
 *     can disable them globally if a brand objects.
 *   - referrerPolicy="no-referrer" prevents leaking our visitors' click
 *     trails to the manufacturer.
 *
 * Attribution caption is rendered below the image to comply with the
 * informal ask from major manufacturers: identify the source of the image.
 */

import type { ProductImage as ProductImageData } from "@/lib/types/product";

const MANUFACTURER_SOURCES: ReadonlySet<ProductImageData["source"]> = new Set([
  "yonex",
  "victor",
  "lining",
  "kawasaki",
  "mizuno",
  "kumpoo",
]);

function isManufacturerSource(s: ProductImageData["source"]): boolean {
  return MANUFACTURER_SOURCES.has(s);
}

function manufacturerImagesEnabled(): boolean {
  // Default to enabled. Set NEXT_PUBLIC_ALLOW_MANUFACTURER_IMAGES=false to
  // kill manufacturer hot-links sitewide without redeploying business logic.
  return process.env.NEXT_PUBLIC_ALLOW_MANUFACTURER_IMAGES !== "false";
}

export function canShowProductImage(image: ProductImageData | undefined): boolean {
  if (!image) return false;
  if (!image.verified) return false;
  if (isManufacturerSource(image.source) && !manufacturerImagesEnabled()) {
    return false;
  }
  return true;
}

export function ProductImageView({
  image,
  size = 240,
  className = "",
  /** Omit credit line — use on dense list rows (catalog) to avoid CLS. */
  hideCaption = false,
}: {
  image: ProductImageData | undefined;
  size?: number;
  className?: string;
  hideCaption?: boolean;
}) {
  if (!canShowProductImage(image) || !image) return null;

  // `size` is the display box (square). The intrinsic width/height only inform
  // the HTML attributes for aspect-ratio / CLS — they must NOT drive the
  // rendered size, otherwise every thumbnail balloons to the source image's
  // native width (often 480–600px) and cards stop scanning as cards.
  const intrinsicW = image.width ?? size;
  const intrinsicH = image.height ?? size;

  return (
    <figure
      className={`product-image ${className}`}
      style={{ width: size, minHeight: size }}
    >
      {/* Plain <img> rather than next/image — the site uses output:"export"
          with images.unoptimized, so next/image gives no benefit and adds
          opaque request behaviour. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image.url}
        alt={image.alt}
        width={intrinsicW}
        height={intrinsicH}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        className="rounded-xl bg-[color:var(--surface-muted)] object-contain"
        style={{ width: size, height: size }}
      />
      {!hideCaption && (
        <figcaption className="mt-1 text-[10px] uppercase tracking-wide text-[var(--color-subtle)]">
          {image.credit}
        </figcaption>
      )}
    </figure>
  );
}
