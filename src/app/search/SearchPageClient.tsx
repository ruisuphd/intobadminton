"use client";

import { useSearchParams } from "next/navigation";
import { SiteSearch } from "@/components/SiteSearch";

export function SearchPageClient() {
  const params = useSearchParams();
  const initialQuery = params.get("q") ?? "";

  return <SiteSearch initialQuery={initialQuery} />;
}
