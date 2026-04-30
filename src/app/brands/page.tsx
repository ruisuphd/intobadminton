import type { Metadata } from "next";
import { BrandsPage } from "@/components/BrandsPage";

export const metadata: Metadata = {
  title: "Brands we cover — IntoBadminton",
  description:
    "The badminton brands IntoBadminton recommends from — Yonex, Victor, Li-Ning, Kumpoo, Kawasaki, Apacs, FZ Forza, RSL, and more — with regions and categories.",
  alternates: {
    canonical: "/brands/",
  },
};

export default function BrandsRoute() {
  return <BrandsPage locale="en" />;
}
