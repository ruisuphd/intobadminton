import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { EditorialMeta } from "@/components/EditorialMeta";
import { JsonLd } from "@/components/JsonLd";
import {
  ProductImageView,
  canShowProductImage,
} from "@/components/ProductImage";
import { SaveProductButton } from "@/components/SaveProductButton";
import { companyInfo } from "@/lib/company";
import { computeEditorialRating } from "@/lib/editorial-rating";
import { reviewPath } from "@/lib/review-pages";
import { sourceAuthorityForProduct } from "@/lib/source-authority";
import { articleJsonLd } from "@/lib/structured-data";
import { humanize } from "@/lib/text";
import type {
  BagProduct,
  GripProduct,
  ProductRecord,
  RacketProduct,
  ShoeProduct,
  ShuttleProduct,
  StringProduct,
} from "@/lib/types/product";

function isRacket(p: ProductRecord): p is RacketProduct {
  return p.category === "racket";
}
function isShoe(p: ProductRecord): p is ShoeProduct {
  return p.category === "shoes";
}
function isString_(p: ProductRecord): p is StringProduct {
  return p.category === "string";
}
function isBag(p: ProductRecord): p is BagProduct {
  return p.category === "bag";
}
function isShuttle(p: ProductRecord): p is ShuttleProduct {
  return p.category === "shuttle";
}
function isGrip(p: ProductRecord): p is GripProduct {
  return p.category === "grip";
}

function specRows(p: ProductRecord): { label: string; value: string }[] {
  const rows: { label: string; value: string }[] = [
    { label: "Brand", value: p.brand },
    { label: "Category", value: humanize(p.category) },
    { label: "Street price (USD)", value: `~$${p.priceUsd}` },
  ];

  if (isRacket(p)) {
    rows.push(
      { label: "Weight class", value: p.weightClass },
      { label: "Weight variants", value: p.weightVariants.join(" / ") },
      { label: "Grip sizes", value: p.gripSizes.join(" / ") },
      { label: "Head weight", value: humanize(p.headWeight) },
      { label: "Shaft flex", value: humanize(p.shaftFlex) },
      { label: "Balance (mm)", value: p.balanceMm ? `${p.balanceMm} mm` : "—" },
      {
        label: "Stringing advice (lbs)",
        value: `${p.commonStringTensionLbs.min}–${p.commonStringTensionLbs.max}`,
      },
      { label: "Shaft-flex source", value: humanize(p.shaftFlexSource) }
    );
  } else if (isShoe(p)) {
    rows.push(
      { label: "Fit width", value: humanize(p.fitWidth) },
      { label: "Cushioning", value: p.cushioning },
      { label: "Stability", value: humanize(p.stability) },
      { label: "Court feel", value: humanize(p.weightFeel) },
      {
        label: "Wide option",
        value: p.hasWideOption ? "Available" : "Not listed",
      }
    );
  } else if (isString_(p)) {
    rows.push(
      { label: "Gauge (mm)", value: p.gaugeMm.toFixed(2) },
      { label: "Feel", value: p.feel },
      { label: "Repulsion", value: humanize(p.repulsion) },
      { label: "Control", value: humanize(p.control) },
      { label: "Durability", value: humanize(p.durability) },
      {
        label: "Tension range (lbs)",
        value: `${p.tensionRangeLbs.min}–${p.tensionRangeLbs.max}`,
      }
    );
  } else if (isBag(p)) {
    rows.push(
      { label: "Racket capacity", value: String(p.capacityRackets) },
      { label: "Size class", value: humanize(p.sizeClass) },
      { label: "Carry style", value: humanize(p.carryStyle) },
      {
        label: "Shoe compartment",
        value: p.hasShoeCompartment ? "Yes" : "No",
      },
      {
        label: "Wet compartment",
        value: p.hasWetCompartment ? "Yes" : "No",
      }
    );
  } else if (isShuttle(p)) {
    rows.push(
      { label: "Material", value: humanize(p.material) },
      { label: "Speed code", value: p.speedCode ? String(p.speedCode) : "—" },
      { label: "Tube count", value: String(p.unitsPerTube) },
      { label: "BWF approved", value: p.bwfApproved ? "Yes" : "No" },
      { label: "Durability tier", value: humanize(p.durabilityTier) }
    );
  } else if (isGrip(p)) {
    rows.push(
      { label: "Type", value: humanize(p.gripType) },
      { label: "Feel", value: humanize(p.feel) },
      {
        label: "Thickness (mm)",
        value: p.thicknessMm ? p.thicknessMm.toFixed(2) : "—",
      },
      { label: "Sweat absorption", value: humanize(p.sweatAbsorption) },
      { label: "Pack count", value: String(p.packCount) }
    );
  }

  return rows;
}

function verificationChipClass(p: ProductRecord): string {
  if (p.verificationStatus === "official_verified") return "chip-success";
  if (p.verificationStatus === "editor_verified") return "chip";
  return "chip-warning";
}

function verificationChipLabel(p: ProductRecord): string {
  if (p.verificationStatus === "official_verified")
    return "Spec verified against manufacturer page";
  if (p.verificationStatus === "editor_verified")
    return "Editor-verified — manufacturer page not located";
  return "Needs official verification";
}

export function ProductReviewPage({ product }: { product: ProductRecord }) {
  const path = reviewPath(product.id);
  const url = `${companyInfo.siteUrl}${path}`;
  const title = `${product.brand} ${product.name} review`;
  const description =
    product.editorNote ??
    `Specs, source authority, and on-court behaviour for the ${product.brand} ${product.name}.`;

  const sourceAuthority = sourceAuthorityForProduct(product);
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${companyInfo.siteUrl}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Reviews",
        item: `${companyInfo.siteUrl}/review/`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${product.brand} ${product.name}`,
        item: url,
      },
    ],
  };

  const article = articleJsonLd({
    path,
    headline: title,
    description,
    section: "Reviews",
    datePublished: product.lastVerifiedAt,
    dateModified: product.lastVerifiedAt,
  });

  const reviewBody =
    product.editorNote ??
    `${product.brand} ${product.name} — verified against ${humanize(product.verificationStatus)} source on ${product.lastVerifiedAt}.`;

  // `computeEditorialRating` is conservative: rating value comes from verified
  // signals we already store (source authority, founder firsthand testing,
  // high-confidence market signals, raw reviewCount). We never invent stars.
  // The `meetsAggregateThreshold` flag gates AggregateRating emission so we
  // only claim an aggregate when at least 2 distinct review sources back it —
  // matching Google's structured-data policy that ratings must be visible on
  // the page and substantiated.
  const editorialRating = computeEditorialRating(product);

  const reviewNode = {
    "@type": "Review" as const,
    author: {
      "@type": "Person" as const,
      name: companyInfo.founderName,
      url: companyInfo.founderWebsite,
    },
    publisher: {
      "@type": "Organization" as const,
      name: companyInfo.siteName,
      url: companyInfo.siteUrl,
    },
    datePublished: product.lastVerifiedAt,
    reviewBody,
    ...(editorialRating
      ? {
          reviewRating: {
            "@type": "Rating" as const,
            ratingValue: editorialRating.ratingValue,
            bestRating: editorialRating.bestRating,
            worstRating: editorialRating.worstRating,
          },
        }
      : {}),
  };

  const productSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url}#product`,
    name: `${product.brand} ${product.name}`,
    brand: { "@type": "Brand", name: product.brand },
    category: humanize(product.category),
    description,
    url,
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: product.priceUsd,
      availability: "https://schema.org/InStock",
      url: product.officialSourceUrl,
    },
    review: reviewNode,
    ...(editorialRating && editorialRating.meetsAggregateThreshold
      ? {
          aggregateRating: {
            "@type": "AggregateRating" as const,
            ratingValue: editorialRating.ratingValue,
            reviewCount: editorialRating.reviewCount,
            bestRating: editorialRating.bestRating,
            worstRating: editorialRating.worstRating,
          },
        }
      : {}),
  };
  if (product.image?.url) {
    productSchema.image = product.image.url;
  }

  const showImage = canShowProductImage(product.image);

  return (
    <main className="flex-1 py-16">
      <JsonLd data={breadcrumb} />
      <JsonLd data={article} />
      <JsonLd data={productSchema} />

      <article className="layout-band max-w-3xl space-y-8">
        <nav
          className="text-xs text-[var(--color-subtle)]"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-[var(--text)]">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/review/" className="hover:text-[var(--text)]">
            Reviews
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[var(--text)]">
            {product.brand} {product.name}
          </span>
        </nav>

        <header className="space-y-3">
          <p className="text-xs uppercase tracking-wide text-[var(--color-subtle)]">
            {humanize(product.category)} review · {product.brand}
          </p>
          <h1 className="text-display text-[var(--text)]">
            {product.brand} {product.name} review
          </h1>
          <p className="text-lg leading-relaxed text-[var(--color-muted)]">
            {description}
          </p>
          <EditorialMeta path={path} />
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className={verificationChipClass(product)}>
              {verificationChipLabel(product)}
            </span>
            <span className="chip chip-secondary">
              {sourceAuthority.label}
            </span>
            <span className="chip chip-secondary">
              ~${product.priceUsd}
            </span>
            {editorialRating && (
              <span
                className="chip chip-success"
                aria-label={`Editorial rating ${editorialRating.ratingValue} out of ${editorialRating.bestRating} from ${editorialRating.reviewCount} review ${editorialRating.reviewCount === 1 ? "source" : "sources"}`}
              >
                ★ {editorialRating.ratingValue.toFixed(1)} / {editorialRating.bestRating}
                {editorialRating.meetsAggregateThreshold && (
                  <span className="ml-1 opacity-75">
                    · {editorialRating.reviewCount} sources
                  </span>
                )}
              </span>
            )}
          </div>
          {/* Save-for-later button — feeds the 30-day shortlist surfaced at
              /saved/ and in the header pill. */}
          <div className="pt-3">
            <SaveProductButton
              id={product.id}
              label={`${product.brand} ${product.name}`}
            />
          </div>
        </header>

        {showImage && (
          <div className="card p-6">
            <ProductImageView image={product.image} size={320} />
          </div>
        )}

        <section className="card p-6">
          <h2 className="text-lg font-semibold text-[var(--text)]">
            Specifications
          </h2>
          <p className="mt-1 text-xs text-[var(--color-subtle)]">
            Sourced from {sourceAuthority.label.toLowerCase()} · last verified{" "}
            {product.lastVerifiedAt}
          </p>
          <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
            {specRows(product).map((row) => (
              <div
                key={row.label}
                className="rounded-xl bg-[color:var(--surface-muted)] p-3"
              >
                <dt className="text-xs uppercase tracking-wide text-[var(--color-subtle)]">
                  {row.label}
                </dt>
                <dd className="mt-1 text-[var(--text)]">{row.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {product.editorNote && (
          <section className="card p-6">
            <h2 className="text-lg font-semibold text-[var(--text)]">
              Editor&apos;s take
            </h2>
            <blockquote className="mt-3 border-l-2 border-[var(--color-accent)] pl-4 text-base italic leading-relaxed text-[var(--color-muted)]">
              {product.editorNote}
            </blockquote>
            <p className="mt-3 text-xs text-[var(--color-subtle)]">
              — {companyInfo.authorByline}.
            </p>
          </section>
        )}

        <AdSlot id={`review-${product.id}-mid`} />

        {product.marketSignals && product.marketSignals.length > 0 && (
          <section className="card p-6">
            <h2 className="text-lg font-semibold text-[var(--text)]">
              Independent measurements & community signals
            </h2>
            <p className="mt-1 text-xs text-[var(--color-subtle)]">
              These are third-party reviews and measurements summarised with
              source attribution. Treat them as supplementary evidence — they
              are not manufacturer specifications.
            </p>
            <ul className="mt-4 space-y-4 text-sm">
              {product.marketSignals.map((signal, idx) => (
                <li
                  key={`${signal.source}-${idx}`}
                  className="border-l-2 border-[color:var(--line-strong)] pl-4"
                >
                  <p className="text-xs uppercase tracking-wide text-[var(--color-subtle)]">
                    {humanize(signal.source)} · {signal.confidence} confidence
                  </p>
                  <p className="mt-1 font-medium text-[var(--text)]">
                    {signal.label}
                  </p>
                  <p className="mt-2 leading-relaxed text-[var(--color-muted)]">
                    {signal.summary}
                  </p>
                  {signal.href && (
                    <a
                      href={signal.href}
                      target="_blank"
                      rel="noreferrer noopener nofollow"
                      className="mt-2 inline-block text-xs text-[var(--color-accent)] hover:underline"
                    >
                      View source →
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="card p-6">
          <h2 className="text-lg font-semibold text-[var(--text)]">
            Source &amp; verification
          </h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="text-xs uppercase tracking-wide text-[var(--color-subtle)]">
                Verification status
              </dt>
              <dd className="mt-1 text-[var(--text)]">
                {humanize(product.verificationStatus)}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-[var(--color-subtle)]">
                Last verified
              </dt>
              <dd className="mt-1 text-[var(--text)]">
                {product.lastVerifiedAt}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-[var(--color-subtle)]">
                Cited official source
              </dt>
              <dd className="mt-1 break-all text-[var(--text)]">
                <a
                  href={product.officialSourceUrl}
                  target="_blank"
                  rel="noreferrer noopener nofollow"
                  className="text-[var(--color-accent)] hover:underline"
                >
                  {product.officialSourceUrl}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-[var(--color-subtle)]">
                Source authority tier
              </dt>
              <dd className="mt-1 text-[var(--text)]">
                {sourceAuthority.label} —{" "}
                {sourceAuthority.canVerifySpecs
                  ? "specs treated as manufacturer-verified."
                  : "specs marked as needing manufacturer product-page verification."}
              </dd>
            </div>
          </dl>
        </section>

        {product.resale && (
          <section className="card p-6">
            <h2 className="text-lg font-semibold text-[var(--text)]">
              Resale &amp; depreciation
            </h2>
            <p className="mt-3 text-sm text-[var(--color-muted)]">
              Estimated used price: ${product.resale.estimatedUsedUsd} —{" "}
              {product.resale.depreciationPct}% depreciation ·{" "}
              {product.resale.confidence} confidence (
              {product.resale.basis}). Resale is a range, not a quote.
            </p>
          </section>
        )}

        <section className="card p-6">
          <h2 className="text-lg font-semibold text-[var(--text)]">
            How IntoBadminton uses this
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
            The finder weighs official specs first, then editor interpretation,
            then community evidence. To see the {product.brand} {product.name}{" "}
            scored against your level, role, body, and budget, run the finder.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/quiz/" className="btn-primary">
              Run the finder
            </Link>
            <Link
              href="/guides/equipment-authenticity/"
              className="inline-flex h-11 items-center justify-center rounded-full border border-[color:var(--line-strong)] px-5 text-sm font-medium text-[var(--text)] transition-colors hover:border-[var(--text)]"
            >
              Authenticity check →
            </Link>
          </div>
        </section>
      </article>
    </main>
  );
}
