import { buildPriceBandRacketsConfig } from "@/lib/price-band-best";
import { BestPicksPage } from "@/components/BestPicksPage";

const { metadata, config } = buildPriceBandRacketsConfig(
  "rackets-under-200",
  200,
  {
    title: "Best badminton rackets under $200 (2026)",
    description:
      "Mid-tier rackets at $200 or less from the IntoBadminton catalogue — specs, prices, and links to editorial reviews.",
    breadcrumbLabel: "Rackets under $200",
    pageTitle: "Badminton rackets under $200 (2026)",
    dek: "Upper club-budget racket discovery — every verified frame at $200 or below, with comparison table and finder CTA.",
  }
);

export { metadata };

export default function RacketsUnder200Page() {
  return <BestPicksPage config={config} />;
}
