"use client";

import Link from "next/link";
import { trackEvent } from "@/components/Analytics";
import { EvidenceCards } from "@/components/EvidenceCards";
import { FitScoreBadge } from "@/components/FitScoreBadge";
import { FitScoreRadar } from "@/components/FitScoreRadar";
import { ProductBuyLink } from "@/components/ProductBuyLink";
import { SaveProductButton } from "@/components/SaveProductButton";
import { ProductCardImage } from "@/components/ProductCardImage";
import { canShowProductImage } from "@/components/ProductImage";
import { compareLimit, useProfile } from "@/context/ProfileContext";
import { buildLocalizedPath, type SiteLocale } from "@/lib/locale";
import { humanize } from "@/lib/text";
import type { ScoredProduct } from "@/lib/types/product";

function confidence(r: ScoredProduct) {
  return r.confidence.label;
}

function specSourceLabel(r: ScoredProduct) {
  return r.evidenceProfile.officialSpec.sourceAuthority.label;
}

function fitScoreBand(fitScore: number): {
  label: string;
  tone: string;
  chipClass: string;
} {
  const score = fitScore * 100;
  if (score >= 80)
    return {
      label: "Strong match",
      tone: "text-emerald-700",
      chipClass: "chip-success",
    };
  if (score >= 65)
    return {
      label: "Solid match",
      tone: "text-[var(--color-accent)]",
      chipClass: "chip",
    };
  if (score >= 50)
    return {
      label: "Moderate match",
      tone: "text-amber-700",
      chipClass: "chip-warning",
    };
  return {
    label: "Weak match",
    tone: "text-[var(--color-subtle)]",
    chipClass: "chip-neutral",
  };
}

function reasonGroup(code: string) {
  if (code.includes("STYLE") || code.includes("DISCIPLINE")) return "Style fit";
  if (code.includes("LEVEL")) return "Level fit";
  if (code.includes("BUDGET")) return "Budget fit";
  if (code.includes("INJURY") || code.includes("WEIGHT")) return "Comfort caution";
  if (code.includes("STRING")) return "String fit";
  if (code.includes("SHOE")) return "Shoe fit";
  if (code.includes("BAG")) return "Bag fit";
  return "Evidence";
}

const CATEGORY_LABEL: Record<ScoredProduct["category"], string> = {
  racket: "Racket",
  string: "String",
  shoes: "Shoes",
  bag: "Bag",
  grip: "Grip",
  shuttle: "Shuttle",
  accessory: "Accessory",
};

function categoryLabel(category: ScoredProduct["category"]) {
  return CATEGORY_LABEL[category];
}

function specLine(r: ScoredProduct) {
  if (r.category === "racket") {
    return `${r.weightVariants.join("/")} · ${humanize(r.headWeight)} · ${humanize(r.shaftFlex)} shaft`;
  }
  if (r.category === "string") {
    return `${r.gaugeMm.toFixed(2)} mm · ${r.feel} feel · ${humanize(r.repulsion)} repulsion · ${r.durability} durability`;
  }
  if (r.category === "shoes") {
    return `${humanize(r.fitWidth)} fit · ${r.cushioning} cushioning · ${humanize(r.stability)} stability`;
  }
  if (r.category === "bag") {
    return `${r.capacityRackets} rackets · ${r.sizeClass} size · ${r.hasShoeCompartment ? "shoe compartment" : "no shoe compartment"}`;
  }
  return "";
}

export function ResultCard({
  r,
  rank,
  locale = "en",
}: {
  r: ScoredProduct;
  rank: number;
  locale?: SiteLocale;
}) {
  const { compareIds, toggleCompare } = useProfile();
  const inCompare = compareIds.includes(r.id);
  const full = compareIds.length >= compareLimit && !inCompare;

  const showImage = canShowProductImage(r.image);

  return (
    <article className="card p-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          {showImage && <ProductCardImage image={r.image} size={112} />}
          <div>
            <p className="eyebrow">
              #{rank} · {categoryLabel(r.category)} · {r.brand}
            </p>
            <h2 className="mt-1.5 text-xl font-semibold text-[var(--text)]">
              {r.name}
            </h2>
            <p className="mt-2 text-sm text-[var(--color-muted)]">
              ~${r.priceUsd} street-price · {specLine(r)}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end">
          {/* Visual fit-score ring. Same score data as before; the ring makes
              the magnitude scannable without reading the numeral. */}
          <FitScoreBadge fitScore={r.fitScore} size={64} showLabel={false} />
          <span
            className={`mt-2 ${fitScoreBand(r.fitScore).chipClass}`}
            aria-label={`${fitScoreBand(r.fitScore).label} for your profile`}
          >
            {fitScoreBand(r.fitScore).label}
          </span>
        </div>
      </header>

      {r.reasons.length > 0 && (
        <ul className="mt-5 space-y-2 text-sm text-[var(--text)]">
          {r.reasons.map((x) => (
            <li key={x.code} className="flex gap-3">
              <span className="text-[var(--color-accent)]">·</span>
              <span>
                <span className="font-medium">{reasonGroup(x.code)}:</span>{" "}
                <span className="text-[var(--color-muted)]">{x.label}</span>
              </span>
            </li>
          ))}
        </ul>
      )}

      {r.editorNote && (
        <blockquote className="mt-4 border-l-2 border-[var(--color-accent)] pl-4 text-sm italic text-[var(--color-muted)]">
          {r.editorNote}
        </blockquote>
      )}

      {!r.evidenceProfile.officialSpec.sourceAuthority.canVerifySpecs && (
        <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs leading-relaxed text-amber-900">
          This product row still needs an official product-page source before
          its listed specs should be treated as manufacturer-verified.
        </div>
      )}

      {/* Everything evidence-y folds into one disclosure so the default card
          stays scannable. Nothing is removed — the radar, confidence, spec
          provenance, resale, source chips, and community references all live
          here, one tap away. */}
      <details className="group mt-4 border-t border-[color:var(--line)] pt-4">
        <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-[var(--text)]">
          <span>Fit breakdown &amp; evidence</span>
          <span className="text-[var(--color-subtle)] transition-transform group-open:rotate-45">
            +
          </span>
        </summary>

        <div className="mt-4 flex justify-center">
          <FitScoreRadar subscores={r.subscores} size={200} />
        </div>

        <dl className="mt-4 grid gap-x-6 gap-y-2 text-xs sm:grid-cols-2">
          <div className="flex justify-between gap-3 border-b border-[color:var(--line)] py-1.5">
            <dt className="text-[var(--color-muted)]">Fit confidence</dt>
            <dd className="text-right font-medium text-[var(--text)]">
              {confidence(r)}
            </dd>
          </div>
          <div className="flex justify-between gap-3 border-b border-[color:var(--line)] py-1.5">
            <dt className="text-[var(--color-muted)]">Spec source</dt>
            <dd className="text-right font-medium text-[var(--text)]">
              {specSourceLabel(r)}
            </dd>
          </div>
          <div className="flex justify-between gap-3 border-b border-[color:var(--line)] py-1.5">
            <dt className="text-[var(--color-muted)]">Editor signal</dt>
            <dd className="text-right font-medium text-[var(--text)]">
              {humanize(r.evidenceProfile.editorSignal.source)}
            </dd>
          </div>
          <div className="flex justify-between gap-3 border-b border-[color:var(--line)] py-1.5">
            <dt className="text-[var(--color-muted)]">Review evidence</dt>
            <dd className="text-right font-medium text-[var(--text)]">
              {r.evidenceProfile.reviewEvidence.count} sources
            </dd>
          </div>
        </dl>
        <p className="mt-2 text-xs text-[var(--color-subtle)]">
          Last verified {r.evidenceProfile.officialSpec.lastVerifiedAt}
        </p>

        {r.resale && (
          <div className="mt-4 rounded-xl bg-[color:var(--surface-muted)] p-4 text-xs">
            <p className="font-medium text-[var(--text)]">
              {"Estimated resale"}: ${r.resale.estimatedUsedUsd}
              <span className="ml-2 font-normal text-[var(--color-muted)]">
                ({r.resale.depreciationPct}% {"depreciation"} ·{" "}
                {r.resale.confidence} {"confidence"})
              </span>
            </p>
            <p className="mt-1 text-[var(--color-muted)]">{r.resale.basis}</p>
          </div>
        )}

        {r.sourceChips.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {r.sourceChips.map((c) =>
              c.href ? (
                <a
                  key={c.type + c.label}
                  href={c.href}
                  target="_blank"
                  rel="noreferrer noopener nofollow"
                  className="chip chip-neutral hover:underline"
                >
                  {humanize(c.type)}: {c.label}
                </a>
              ) : (
                <span key={c.type + c.label} className="chip chip-neutral">
                  {humanize(c.type)}: {c.label}
                </span>
              )
            )}
          </div>
        )}

        <EvidenceCards productId={r.id} />
      </details>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        {/* Primary action: the decisive (and monetizable) buy/view click,
            previously buried as an outline among five equal buttons. */}
        <ProductBuyLink
          id={r.id}
          brand={r.brand}
          name={r.name}
          officialSourceUrl={r.officialSourceUrl}
          className="inline-flex h-10 items-center justify-center rounded-full bg-[var(--color-accent)] px-5 text-sm font-medium text-white transition-colors hover:bg-[var(--color-accent-hover)]"
        />
        <button
          type="button"
          onClick={() => {
            if (!full || inCompare) {
              toggleCompare(r.id);
              trackEvent(inCompare ? "compare_remove" : "compare_add", {
                product_id: r.id,
                product_brand: r.brand,
                rank,
              });
            }
          }}
          disabled={full && !inCompare}
          className="inline-flex h-10 items-center justify-center rounded-full border border-[color:var(--line-strong)] px-4 text-sm font-medium text-[var(--text)] transition-colors enabled:hover:border-[var(--text)] disabled:opacity-40"
        >
          {inCompare
            ? "Remove from compare"
            : full
              ? `Max ${compareLimit} in compare`
              : "Add to compare"}
        </button>
        {/*
         * Save for later — separate from the compare tray. Compare is a
         * narrow per-session decision tool (max 3). Saved is a persistent
         * shortlist (30-day TTL) so the reader can come back and revisit
         * picks without re-running the finder.
         */}
        <SaveProductButton id={r.id} label={`${r.brand} ${r.name}`} />
        <Link
          href={buildLocalizedPath(locale, "/compare/")}
          onClick={() => trackEvent("open_compare", { product_id: r.id, rank })}
          className="text-sm font-medium text-[var(--color-muted)] underline-offset-4 transition-colors hover:text-[var(--text)] hover:underline"
        >
          {"Open compare"}
        </Link>
        <Link
          href={`${buildLocalizedPath(locale, "/contact/")}?subject=Product%20data%20issue%20${encodeURIComponent(r.id)}`}
          className="ml-auto text-xs text-[var(--color-subtle)] underline-offset-4 transition-colors hover:text-[var(--text)] hover:underline"
        >
          {"Report issue"}
        </Link>
      </div>
    </article>
  );
}
