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
}: {
  image: ProductImageData | undefined;
  size?: number;
  className?: string;
}) {
  if (!canShowProductImage(image) || !image) return null;

  return (
    <figure className={`product-image ${className}`}>
      {/* Plain <img> rather than next/image — the site uses output:"export"
          with images.unoptimized, so next/image gives no benefit and adds
          opaque request behaviour. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image.url}
        alt={image.alt}
        width={image.width ?? size}
        height={image.height ?? size}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        className="rounded-xl bg-[color:var(--surface-muted)] object-contain"
      />
      <figcaption className="mt-1 text-[10px] uppercase tracking-wide text-[var(--color-subtle)]">
        {image.credit}
      </figcaption>
    </figure>
  );
}
