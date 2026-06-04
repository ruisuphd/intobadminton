import type { Metadata } from "next";
import { pageAlternates } from "@/lib/metadata";
import type { BestPicksConfig, Pick } from "@/components/BestPicksPage";
import { racketsUnderPrice } from "@/lib/product-filters";
import { humanize } from "@/lib/text";
import type { RacketProduct } from "@/lib/types/product";

export function buildPriceBandRacketsConfig(
  slug: string,
  maxUsd: number,
  meta: { title: string; description: string; breadcrumbLabel: string; pageTitle: string; dek: string }
): { metadata: Metadata; config: BestPicksConfig } {
  const rackets = racketsUnderPrice(maxUsd).slice(0, 12);

  const picks: Pick[] = rackets.map((r, i) => ({
    rank: i + 1,
    name: r.name,
    brand: r.brand,
    priceUsd: r.priceUsd,
    bestFor: r.bestFor.slice(0, 2).map(humanize).join(" · ") || "Club play",
    specs: racketSpecs(r),
    why:
      r.editorNote ??
      `${r.brand} ${r.name} at $${r.priceUsd} — ${humanize(r.balanceCategory)} balance, ${r.weightClass} weight class.`,
    tradeoff:
      r.verificationStatus === "needs_review"
        ? "Specs still need a full verification pass — confirm with your retailer before buying."
        : `At this price point, expect trade-offs versus flagship ${r.brand} frames — usually in shaft stiffness or resale value.`,
    productId: r.id,
    image: r.image,
    evidenceLevel:
      r.verificationStatus === "official_verified" ? "specs" : "specs",
  }));

  const config: BestPicksConfig = {
    slug,
    breadcrumbLabel: meta.breadcrumbLabel,
    title: meta.pageTitle,
    dek: meta.dek,
    productSchemaCategory: "BadmintonRacket",
    intro: {
      heading: `How we picked rackets under $${maxUsd}`,
      body: `Every row below is pulled from our verified catalogue at <strong>$${maxUsd} or less</strong> (MSRP / typical retail). We rank by price ascending, then name — not by marketing tier. Specs come from manufacturer pages where available; run the <a href="/quiz/">finder</a> to see which of these actually fit your level and playing style.`,
    },
    picks,
    faqs: [
      {
        q: `Are rackets under $${maxUsd} good enough for club play?`,
        a: `Yes — several frames in this band use medium or hi-flex shafts and 4U/5U weights that suit recreational and club players. The main trade-off versus $200+ frames is usually resale value and top-end smash mass, not basic durability.`,
      },
      {
        q: "Why is the list sorted by price?",
        a: "This is a budget-discovery page, not an editor-ranked best-of. For curated picks with trade-off notes, see our beginner and intermediate best-of guides.",
      },
    ],
    ctaHeading: "Want a scored shortlist instead?",
    ctaBody:
      "The finder ranks every catalogue row against your level, discipline, style tags, and budget — with named reason codes for each match.",
  };

  return {
    metadata: {
      title: meta.title,
      description: meta.description,
      alternates: pageAlternates(`/best/${slug}/`),
    },
    config,
  };
}

function racketSpecs(r: RacketProduct): { label: string; value: string }[] {
  return [
    { label: "Weight", value: r.weightClass },
    { label: "Balance", value: humanize(r.balanceCategory) },
    { label: "Shaft flex", value: humanize(r.shaftFlex) },
  ];
}
