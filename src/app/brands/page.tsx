import type { Metadata } from "next";
import { pageAlternates } from "@/lib/metadata";
import { BrandsPage } from "@/components/BrandsPage";

export const metadata: Metadata = {
  title: "Badminton Brands — Yonex, Victor, Li-Ning & More",
  description:
    "All the badminton brands we cover, ranked by global reach and catalogue depth — Yonex, Victor, Li-Ning, Kumpoo, Kawasaki, Mizuno, Apacs, FZ Forza, RSL.",
  alternates: pageAlternates("/brands/"),
};

export default function BrandsRoute() {
  return <BrandsPage locale="en" />;
}
