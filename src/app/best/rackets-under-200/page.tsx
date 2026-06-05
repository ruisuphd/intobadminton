import { buildPriceBandRacketsConfig } from "@/lib/price-band-best";
import { BestPicksPage } from "@/components/BestPicksPage";

const { metadata, config } = buildPriceBandRacketsConfig(
  "rackets-under-200",
  200,
  {
    title: "Best badminton rackets under $200 (2026)",
    description:
      "Mid-range racket discovery — verified frames at $200 or below from Yonex, Victor, and Li-Ning with specs and comparison table.",
    breadcrumbLabel: "Rackets under $200",
    pageTitle: "Badminton rackets under $200 (2026)",
    dek: "Club-to-competitive budget band — every verified frame at $200 or less, sorted by price with comparison table and finder CTA.",
  }
);

export { metadata };

export default function RacketsUnder200Page() {
  return <BestPicksPage config={config} />;
}
