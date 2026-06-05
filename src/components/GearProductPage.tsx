import Link from "next/link";
import { CatalogProductActions } from "@/components/CatalogProductActions";
import { JsonLd } from "@/components/JsonLd";
import {
  ProductImageView,
  canShowProductImage,
} from "@/components/ProductImage";
import { ReviewProductPanel } from "@/components/ReviewProductPanel";
import { blogReviewHrefForProduct } from "@/lib/review-pages";
import { referenceClubDoublesProfile } from "@/lib/reference-profile";
import { scoreOneProduct } from "@/lib/scoring";
import { productCatalogJsonLd } from "@/lib/structured-data";
import { humanize } from "@/lib/text";
import type { ProductRecord } from "@/lib/types/product";

function specLine(p: ProductRecord): string {
  if (p.category === "racket") {
    return `${p.weightClass} · ${humanize(p.balanceCategory)} · ${humanize(p.shaftFlex)} shaft`;
  }
  if (p.category === "shoes") {
    return `${humanize(p.cushioning)} cushion · ${humanize(p.stability)} stability`;
  }
  if (p.category === "string") {
    return `${p.gaugeMm} mm · ${humanize(p.feel)} feel`;
  }
  return humanize(p.category);
}

function gearDescription(p: ProductRecord): string {
  return `${p.brand} ${p.name} — ${specLine(p)}. See specs, illustrative fit score, and compare with other ${humanize(p.category)}s in the IntoBadminton finder.`;
}

export function GearProductPage({ product }: { product: ProductRecord }) {
  const path = `/gear/${product.id}/`;
  const editorialHref = blogReviewHrefForProduct(product.id);
  const referenceProfile = referenceClubDoublesProfile(product.category);
  const scored = scoreOneProduct(product, referenceProfile);
  const label = `${product.brand} ${product.name}`;

  return (
    <main className="flex-1 py-12">
      <JsonLd
        data={productCatalogJsonLd({
          product,
          path,
          description: gearDescription(product),
        })}
      />
      <div className="layout-band max-w-3xl">
        <nav aria-label="Breadcrumb" className="text-sm text-[var(--color-muted)]">
          <Link href="/catalog/" className="hover:text-[var(--text)]">
            Catalog
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[var(--text)]">{label}</span>
        </nav>

        <header className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-start">
          {canShowProductImage(product.image) ? (
            <ProductImageView
              image={product.image}
              size={160}
              className="shrink-0"
            />
          ) : (
            <div
              className="flex h-40 w-40 shrink-0 items-center justify-center rounded-2xl bg-[color:var(--surface-muted)] text-lg font-semibold text-[var(--color-subtle)]"
              aria-hidden
            >
              {product.brand.slice(0, 2).toUpperCase()}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-subtle)]">
              {humanize(product.category)}
            </p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight text-[var(--text)]">
              {label}
            </h1>
            <p className="mt-2 text-[var(--color-muted)]">{specLine(product)}</p>
            <p className="mt-1 text-sm text-[var(--color-muted)]">
              Reference price ~${product.priceUsd} USD
              {product.lastVerifiedAt
                ? ` · verified ${product.lastVerifiedAt}`
                : ""}
            </p>
          </div>
        </header>

        {editorialHref && (
          <p className="mt-6 rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface-muted)] px-4 py-3 text-sm text-[var(--color-muted)]">
            Full first-person review:{" "}
            <Link
              href={editorialHref}
              className="font-medium text-[var(--color-accent)] hover:underline"
            >
              read the editorial article →
            </Link>
          </p>
        )}

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <CatalogProductActions product={product} />
          <Link
            href="/quiz/"
            className="btn-primary text-sm"
          >
            Score for my profile
          </Link>
          <Link
            href="/catalog/"
            className="text-sm font-medium text-[var(--color-accent)] hover:underline"
          >
            Back to catalog
          </Link>
        </div>

        {scored && (
          <div className="mt-10">
            <ReviewProductPanel scored={scored} />
          </div>
        )}
      </div>
    </main>
  );
}
