import { buildPriceBandRacketsConfig } from "@/lib/price-band-best";
import { BestPicksPage } from "@/components/BestPicksPage";

const { metadata, config } = buildPriceBandRacketsConfig(
  "rackets-under-150",
  150,
  {
    title: "Best badminton rackets under $150 (2026)",
    description:
      "Club-budget rackets at $150 or less from the IntoBadminton catalogue — specs, prices, and links to editorial reviews.",
    breadcrumbLabel: "Rackets under $150",
    pageTitle: "Badminton rackets under $150 (2026)",
    dek: "Mid-budget racket discovery — every verified frame at $150 or below, with comparison table and finder CTA.",
  }
);

export { metadata };

export default function RacketsUnder150Page() {
  return <BestPicksPage config={config} />;
}
