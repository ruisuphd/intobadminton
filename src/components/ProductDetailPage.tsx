import Link from "next/link";
import { ArticleEngagementFooter } from "@/components/ArticleEngagementFooter";
import { JsonLd } from "@/components/JsonLd";
import { ProductDetailActions } from "@/components/ProductDetailActions";
import {
  ProductImageView,
  canShowProductImage,
} from "@/components/ProductImage";
import { ReviewProductPanel } from "@/components/ReviewProductPanel";
import { companyInfo } from "@/lib/company";
import { specRowsForProduct } from "@/lib/product-spec-rows";
import { reviewPath } from "@/lib/review-pages";
import type { ProductRecord } from "@/lib/types/product";
import blogReviewMap from "@/data/blog-review-product-map.json";
import type { BlogSlug } from "@/lib/blog";

function reviewSlugForProduct(productId: string): BlogSlug | undefined {
  const entry = (Object.entries(blogReviewMap) as [BlogSlug, string][]).find(
    ([, id]) => id === productId
  );
  return entry?.[0];
}

export function ProductDetailPage({ product }: { product: ProductRecord }) {
  const path = `/product/${product.id}/`;
  const specs = specRowsForProduct(product);
  const reviewSlug = reviewSlugForProduct(product.id);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${companyInfo.siteUrl}${path}#product`,
    name: `${product.brand} ${product.name}`,
    brand: { "@type": "Brand", name: product.brand },
    category: product.category,
    offers: {
      "@type": "Offer",
      price: product.priceUsd,
      priceCurrency: "USD",
      url: product.officialSourceUrl,
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <main className="flex-1 py-12">
      <JsonLd data={productJsonLd} />
      <article className="layout-band max-w-3xl">
        <nav aria-label="Breadcrumb" className="text-sm text-[var(--color-muted)]">
          <Link href="/catalog/" className="hover:text-[var(--color-accent)]">
            Catalog
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[var(--text)]">{product.name}</span>
        </nav>

        <header className="mt-6">
          <p className="text-sm font-medium text-[var(--color-subtle)]">
            {product.brand} · {product.category}
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[var(--text)]">
            {product.name}
          </h1>
          <p className="mt-2 text-sm text-[var(--color-muted)]">
            Specs last verified {product.lastVerifiedAt} · ${product.priceUsd}{" "}
            typical retail
          </p>
        </header>

        <div className="mt-8 flex flex-col gap-8 sm:flex-row sm:items-start">
          {canShowProductImage(product.image) && (
            <ProductImageView
              image={product.image}
              size={160}
              className="shrink-0 rounded-xl border border-[color:var(--line)]"
            />
          )}
          <div className="min-w-0 flex-1 space-y-6">
            <p className="text-[var(--color-muted)]">
              Verified catalogue specs for the{" "}
              <strong className="text-[var(--text)]">
                {product.brand} {product.name}
              </strong>
              . Run the{" "}
              <Link href="/quiz/" className="text-[var(--color-accent)] underline">
                equipment finder
              </Link>{" "}
              to see how it ranks for your level and style — or read the full
              first-person review when we have one.
            </p>
            <ProductDetailActions product={product} />
            {reviewSlug && (
              <p className="text-sm">
                <Link
                  href={reviewPath(product.id)}
                  className="font-medium text-[var(--color-accent)] hover:underline"
                >
                  Read the full review →
                </Link>
              </p>
            )}
          </div>
        </div>

        <div className="mt-10">
          <ReviewProductPanel product={product} />
        </div>

        <section className="mt-10" aria-labelledby="product-specs-heading">
          <h2
            id="product-specs-heading"
            className="text-lg font-semibold text-[var(--text)]"
          >
            Specifications
          </h2>
          <dl className="mt-4 divide-y divide-[color:var(--line)] rounded-2xl border border-[color:var(--line)] bg-white">
            {specs.map((row) => (
              <div
                key={row.label}
                className="grid gap-1 px-4 py-3 sm:grid-cols-[10rem_1fr]"
              >
                <dt className="text-sm font-medium text-[var(--text)]">
                  {row.label}
                </dt>
                <dd className="text-sm text-[var(--color-muted)]">{row.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-xs text-[var(--color-subtle)]">
            Primary source:{" "}
            <a
              href={product.officialSourceUrl}
              rel="noopener noreferrer"
              className="text-[var(--color-accent)] underline"
            >
              manufacturer page
            </a>
            . See our{" "}
            <Link href="/methodology/" className="underline">
              methodology
            </Link>{" "}
            for verification tiers.
          </p>
        </section>

        <ArticleEngagementFooter
          url={path}
          title={`${product.brand} ${product.name} specs`}
          contentId={`product:${product.id}`}
        />
      </article>
    </main>
  );
}
