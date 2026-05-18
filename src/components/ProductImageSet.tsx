/**
 * Responsive product-image renderer paired with
 * `scripts/generate-product-images.mjs`.
 *
 * Expects, for a given product slug + image name, the build script to have
 * emitted `public/products/<slug>/<name>-{400,800,1200}.webp` plus a
 * `<name>-fallback.jpg`. The component picks the smallest variant that
 * comfortably covers the rendered width via `srcSet`, with the JPEG fallback
 * for non-WebP clients (extremely rare in 2026 but cheap to include).
 *
 * `next/image` optimization is disabled by `output: "export"`; this component
 * is the project's static-export-friendly substitute.
 */

type Props = {
  /** Per-product directory, e.g. `yy-astrox-99-pro`. */
  slug: string;
  /** Image kind. Convention: `hero` | `scale` | `context` | custom. */
  name?: string;
  /** Required alt text. Pass "" only for purely decorative imagery. */
  alt: string;
  /**
   * Sizes attribute (CSS sizes spec). Default targets typical card width —
   * pass a more specific value when the image fills more or less of the
   * viewport.
   */
  sizes?: string;
  /** Rendered width hint used for the fallback `<img width>`. */
  width?: number;
  /** Rendered height hint used for the fallback `<img height>`. */
  height?: number;
  /** Eager load for above-the-fold heroes; defaults to lazy. */
  priority?: boolean;
  className?: string;
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

function variantUrl(slug: string, name: string, suffix: string): string {
  return `${basePath}/products/${slug}/${name}-${suffix}`;
}

export function ProductImageSet({
  slug,
  name = "hero",
  alt,
  sizes = "(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw",
  width = 1200,
  height = 1200,
  priority = false,
  className,
}: Props) {
  const srcSet = [400, 800, 1200]
    .map((w) => `${variantUrl(slug, name, `${w}.webp`)} ${w}w`)
    .join(", ");
  const fallback = variantUrl(slug, name, "fallback.jpg");

  return (
    <picture>
      <source type="image/webp" srcSet={srcSet} sizes={sizes} />
      {/* next/image is disabled by output: "export"; <picture>/srcSet does
          the responsive work and width/height keep CLS at zero. */}
      <img
        src={fallback}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        className={className}
      />
    </picture>
  );
}
