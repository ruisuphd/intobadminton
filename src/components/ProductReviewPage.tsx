import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { JsonLd } from "@/components/JsonLd";
import {
  ProductImageView,
  canShowProductImage,
} from "@/components/ProductImage";
import { ReviewProseSections } from "@/components/ReviewProseSections";
import { SaveProductButton } from "@/components/SaveProductButton";
import { companyInfo } from "@/lib/company";
import {
  blogArticlesForReview,
  editorialComparisonsForReview,
  reviewDescriptionFromArticles,
} from "@/lib/content-links";
import { computeEditorialRating } from "@/lib/editorial-rating";
import { reviewPath } from "@/lib/review-pages";
import { articleJsonLd, productReviewJsonLd } from "@/lib/structured-data";
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

export function ProductReviewPage({ product }: { product: ProductRecord }) {
  const path = reviewPath(product.id);
  const url = `${companyInfo.siteUrl}${path}`;
  const title = `${product.brand} ${product.name} review`;
  const reviewArticles = blogArticlesForReview(product.id);
  const editorialComparisons = editorialComparisonsForReview(product.id);
  const description =
    reviewDescriptionFromArticles(product.editorNote, reviewArticles) ||
    `Hands-on review and specifications for the ${product.brand} ${product.name}.`;

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

  const reviewBody =
    product.editorNote ??
    reviewArticles[0]?.sections[0]?.body ??
    `${product.brand} ${product.name} review.`;

  const editorialRating = computeEditorialRating(product);

  const article = articleJsonLd({
    path,
    headline: title,
    description,
    section: "Reviews",
    datePublished: product.lastVerifiedAt,
    dateModified: product.lastVerifiedAt,
    aboutId: `${url}#product`,
  });

  const productSchema = productReviewJsonLd({
    product,
    path,
    description,
    reviewBody,
    rating: editorialRating,
  });

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

        {reviewArticles.length > 0 && (
          <div className="card p-6">
            <ReviewProseSections
              articles={reviewArticles}
              adSlotId={`review-${product.id}-mid`}
            />
          </div>
        )}

        {editorialComparisons.length > 0 && (
          <section className="card p-6">
            <h2 className="text-lg font-semibold text-[var(--text)]">
              Related comparisons
            </h2>
            <ul className="mt-3 space-y-2 text-sm">
              {editorialComparisons.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[color:var(--color-accent)] hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {reviewArticles.length === 0 && (
          <AdSlot id={`review-${product.id}-mid`} />
        )}

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
            The finder weighs official specs first, then hands-on review notes.
            To see the {product.brand} {product.name} scored against your level,
            role, body, and budget, run the finder.
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
