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

function categoryLabel(category: ScoredProduct["category"], locale: SiteLocale) {
  const en: Record<ScoredProduct["category"], string> = {
    racket: "Racket",
    string: "String",
    shoes: "Shoes",
    bag: "Bag",
    grip: "Grip",
    shuttle: "Shuttle",
    accessory: "Accessory",
  };
  const zh: Record<ScoredProduct["category"], string> = {
    racket: "球拍",
    string: "球线",
    shoes: "球鞋",
    bag: "球包",
    grip: "手胶",
    shuttle: "羽毛球",
    accessory: "配件",
  };
  return (locale === "zh" ? zh : en)[category];
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
    <article className="rounded-2xl border border-zinc-200/90 bg-[var(--surface)] p-6 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-[var(--color-muted)]">
            #{rank} · {categoryLabel(r.category, locale)} · {r.brand}
          </p>
          <h2 className="text-xl font-semibold tracking-tight text-[var(--text)]">
            {r.name}
          </h2>
        </div>
        <div className="text-right">
          <p className="text-2xl font-semibold text-[var(--color-accent)]">
            {(r.fitScore * 100).toFixed(0)}
          </p>
          <p className="text-xs text-[var(--color-muted)]">
            {locale === "zh" ? "匹配分（演示）" : "fit score (demo)"}
          </p>
      </div>
      </div>
      <p className="mt-1 text-sm text-[var(--color-muted)]">
        ${r.priceUsd} · {specLine(r)}
      </p>
      {r.resale && (
        <p className="mt-1 text-xs text-[var(--color-muted)]">
          {locale === "zh" ? "二手价值估计" : "Estimated resale"}: $
          {r.resale.estimatedUsedUsd} · {r.resale.depreciationPct}%{" "}
          {locale === "zh" ? "折旧" : "depreciation"} ·{" "}
          {r.resale.confidence} confidence
        </p>
      )}
      <p className="mt-1 text-xs text-[var(--color-muted)]">
        {locale === "zh" ? "置信度" : "Confidence"}: {confidence(r)} ·{" "}
        {locale === "zh" ? "官方规格" : "Official spec"}:{" "}
        {r.evidenceProfile.officialSpec.status.replace("_", " ")} · Verified:{" "}
        {r.evidenceProfile.officialSpec.lastVerifiedAt}
      </p>
      <div className="mt-4 grid gap-2 text-xs sm:grid-cols-3">
        <div className="rounded-xl border border-zinc-200 p-3">
          <p className="font-medium text-[var(--text)]">
            {locale === "zh" ? "官方规格" : "Official spec"}
          </p>
          <p className="mt-1 text-[var(--color-muted)]">
            {r.evidenceProfile.officialSpec.status.replace("_", " ")}
          </p>
        </div>
        <div className="rounded-xl border border-zinc-200 p-3">
          <p className="font-medium text-[var(--text)]">
            {locale === "zh" ? "编辑信号" : "Editor signal"}
          </p>
          <p className="mt-1 text-[var(--color-muted)]">
            {r.evidenceProfile.editorSignal.source.replace("_", " ")}
          </p>
        </div>
        <div className="rounded-xl border border-zinc-200 p-3">
          <p className="font-medium text-[var(--text)]">
            {locale === "zh" ? "评价证据" : "Review evidence"}
          </p>
          <p className="mt-1 text-[var(--color-muted)]">
            {r.evidenceProfile.reviewEvidence.count}{" "}
            {locale === "zh" ? "条元数据摘要" : "metadata summaries"}
          </p>
        </div>
      </div>
      {r.resale && (
        <div className="mt-4 rounded-xl border border-zinc-200 bg-[var(--background)] p-3 text-xs">
          <p className="font-medium text-[var(--text)]">
            {locale === "zh" ? "转售/折旧信号" : "Resale/depreciation signal"}
          </p>
          <p className="mt-1 text-[var(--color-muted)]">{r.resale.basis}</p>
        </div>
      )}
      {r.reasons.length > 0 && (
        <ul className="mt-4 space-y-2 text-sm text-[var(--text)]">
          {r.reasons.map((x) => (
            <li key={x.code} className="flex gap-2">
              <span className="text-[var(--color-accent)]">·</span>
              <span>
              <span className="font-medium">{reasonGroup(x.code)}:</span>{" "}
                {x.label}
              </span>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-4 flex flex-wrap gap-2">
        {r.sourceChips.map((c) => (
          <span
            key={c.type + c.label}
            className="rounded-full bg-[var(--color-accent-soft)] px-3 py-1 text-xs text-[var(--text)]"
          >
            {c.type.replace("_", " ")}: {c.label}
          </span>
        ))}
      </div>
      {r.editorNote && (
        <p className="mt-3 text-sm italic text-[var(--color-muted)]">
          {r.editorNote}
        </p>
      )}
      <EvidenceCards productId={r.id} />
      <div className="mt-5 flex flex-wrap gap-2">
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
          className="inline-flex h-11 items-center justify-center rounded-2xl bg-[var(--color-accent)] px-5 text-sm font-medium text-white transition enabled:hover:opacity-90 disabled:opacity-40"
        >
          {inCompare
            ? "Remove from compare"
            : full
              ? `Max ${compareLimit} in compare`
              : locale === "zh"
                ? "加入对比"
                : "Add to compare"}
        </button>
        <Link
          href={buildLocalizedPath(locale, "/compare/")}
          onClick={() =>
            trackEvent("open_compare", { product_id: r.id, rank })
          }
          className="inline-flex h-11 items-center justify-center rounded-2xl border border-zinc-300 px-4 text-sm"
        >
          {locale === "zh" ? "打开对比" : "Open compare"}
        </Link>
        <Link
          href={`${buildLocalizedPath(locale, "/contact/")}?subject=Product%20data%20issue%20${encodeURIComponent(r.id)}`}
          className="inline-flex h-11 items-center justify-center rounded-2xl border border-zinc-300 px-4 text-sm"
        >
          {locale === "zh" ? "报告数据问题" : "Report data issue"}
        </Link>
      </div>
    </article>
  );
}
