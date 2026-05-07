import type { Metadata } from "next";
import { BrandsPage } from "@/components/BrandsPage";

export const metadata: Metadata = {
  title:
    "Badminton Brands: Yonex, Victor, Li-Ning, Kumpoo, Kawasaki & More | IntoBadminton",
  description:
    "All the badminton brands we recommend from, ranked by global reach and catalogue depth — Yonex, Victor, Li-Ning, Kumpoo, Kawasaki, Mizuno, Apacs, FZ Forza, RSL, and more. With racket lines, regions, and categories covered.",
  keywords: [
    "badminton brands",
    "Yonex badminton",
    "Victor badminton",
    "Li-Ning badminton",
    "Kumpoo badminton",
    "Kawasaki badminton",
    "best badminton brand",
    "badminton racket brands",
  ],
  alternates: {
    canonical: "/brands/",
  },
};

export default function BrandsRoute() {
  return <BrandsPage locale="en" />;
}
