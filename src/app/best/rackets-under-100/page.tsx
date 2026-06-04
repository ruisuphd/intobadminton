import { buildPriceBandRacketsConfig } from "@/lib/price-band-best";
import { BestPicksPage } from "@/components/BestPicksPage";

const { metadata, config } = buildPriceBandRacketsConfig(
  "rackets-under-100",
  100,
  {
    title: "Best badminton rackets under $100 (2026)",
    description:
      "Every verified racket in the IntoBadminton catalogue at $100 or less — filter by spec, then run the finder for a scored shortlist.",
    breadcrumbLabel: "Rackets under $100",
    pageTitle: "Badminton rackets under $100 (2026)",
    dek: "Budget racket discovery from our verified catalogue — sorted by price, with spec tables and links to full reviews where they exist.",
  }
);

export { metadata };

export default function RacketsUnder100Page() {
  return <BestPicksPage config={config} />;
}
