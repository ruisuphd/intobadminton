"use client";

import Link from "next/link";
import { trackEvent } from "@/components/Analytics";
import { EvidenceCards } from "@/components/EvidenceCards";
import { compareLimit, useProfile } from "@/context/ProfileContext";
import { buildLocalizedPath, type SiteLocale } from "@/lib/locale";
import type { ScoredProduct } from "@/lib/types/product";

function confidence(r: ScoredProduct) {
  return r.confidence.label;
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
    return `${r.weightVariants.join("/")} · ${r.headWeight.replace("_", " ")} · ${r.shaftFlex} shaft`;
  }
  if (r.category === "string") {
    return `${r.gaugeMm.toFixed(2)} mm · ${r.feel} feel · ${r.repulsion.replace("_", " ")} repulsion · ${r.durability} durability`;
  }
  if (r.category === "shoes") {
    return `${r.fitWidth.replace("_", " ")} fit · ${r.cushioning} cushioning · ${r.stability.replace("_", " ")} stability`;
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

  return (
    <article className="card p-7">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-subtle)]">
            #{rank} · {categoryLabel(r.category)} · {r.brand}
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[var(--text)]">
            {r.name}
          </h2>
        </div>
        <div className="flex flex-col items-end">
          <p className="text-3xl font-semibold text-[var(--color-accent)]">
            {(r.fitScore * 100).toFixed(0)}
          </p>
          <p className="text-xs text-[var(--color-subtle)]">
            {"fit score"}
          </p>
        </div>
      </header>

      <p className="mt-3 text-sm text-[var(--color-muted)]">
        ${r.priceUsd} · {specLine(r)}
      </p>

      <p className="mt-4 text-xs text-[var(--color-subtle)]">
        {"Confidence"}: {confidence(r)} ·{" "}
        {"Official spec"}:{" "}
        {r.evidenceProfile.officialSpec.status.replace("_", " ")} ·{" "}
        {r.evidenceProfile.officialSpec.lastVerifiedAt}
      </p>

      <div className="mt-5 grid gap-3 text-xs sm:grid-cols-3">
        <div className="rounded-xl bg-[color:var(--surface-muted)] p-3">
          <p className="font-medium text-[var(--text)]">
            {"Official spec"}
          </p>
          <p className="mt-1 text-[var(--color-muted)]">
            {r.evidenceProfile.officialSpec.status.replace("_", " ")}
          </p>
        </div>
        <div className="rounded-xl bg-[color:var(--surface-muted)] p-3">
          <p className="font-medium text-[var(--text)]">
            {"Editor signal"}
          </p>
          <p className="mt-1 text-[var(--color-muted)]">
            {r.evidenceProfile.editorSignal.source.replace("_", " ")}
          </p>
        </div>
        <div className="rounded-xl bg-[color:var(--surface-muted)] p-3">
          <p className="font-medium text-[var(--text)]">
            {"Review evidence"}
          </p>
          <p className="mt-1 text-[var(--color-muted)]">
            {r.evidenceProfile.reviewEvidence.count}{" "}
            {"sources"}
          </p>
        </div>
      </div>

      {r.resale && (
        <div className="mt-4 rounded-xl bg-[color:var(--surface-muted)] p-4 text-xs">
          <p className="font-medium text-[var(--text)]">
            {"Estimated resale"}: $
            {r.resale.estimatedUsedUsd}
            <span className="ml-2 font-normal text-[var(--color-muted)]">
              ({r.resale.depreciationPct}%{" "}
              {"depreciation"} · {r.resale.confidence}{" "}
              {"confidence"})
            </span>
          </p>
          <p className="mt-1 text-[var(--color-muted)]">{r.resale.basis}</p>
        </div>
      )}

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

      {r.sourceChips.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {r.sourceChips.map((c) => (
            <span key={c.type + c.label} className="chip chip-secondary">
              {c.type.replace("_", " ")}: {c.label}
            </span>
          ))}
        </div>
      )}

      {r.editorNote && (
        <blockquote className="mt-5 border-l-2 border-[var(--color-accent)] pl-4 text-sm italic text-[var(--color-muted)]">
          {r.editorNote}
        </blockquote>
      )}

      <EvidenceCards productId={r.id} />

      <div className="mt-6 flex flex-wrap gap-2">
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
          className="inline-flex h-11 items-center justify-center rounded-full bg-[var(--color-accent)] px-5 text-sm font-medium text-white transition-colors enabled:hover:bg-[var(--color-accent-hover)] disabled:opacity-40"
        >
          {inCompare
            ? "Remove from compare"
            : full
              ? `Max ${compareLimit} in compare`
              : "Add to compare"}
        </button>
        <Link
          href={buildLocalizedPath(locale, "/compare/")}
          onClick={() => trackEvent("open_compare", { product_id: r.id, rank })}
          className="inline-flex h-11 items-center justify-center rounded-full border border-[color:var(--line-strong)] px-4 text-sm font-medium text-[var(--text)] transition-colors hover:border-[var(--text)]"
        >
          {"Open compare"}
        </Link>
        <Link
          href={`${buildLocalizedPath(locale, "/contact/")}?subject=Product%20data%20issue%20${encodeURIComponent(r.id)}`}
          className="inline-flex h-11 items-center justify-center rounded-full border border-[color:var(--line-strong)] px-4 text-sm font-medium text-[var(--text)] transition-colors hover:border-[var(--text)]"
        >
          {"Report issue"}
        </Link>
      </div>
    </article>
  );
}
