"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { SiteSearch } from "@/components/SiteSearch";
import { searchSubmitHref } from "@/lib/search-submit-route";

export function SearchPageClient() {
  const router = useRouter();
  const params = useSearchParams();
  const initialQuery = params.get("q") ?? "";
  const redirected = useRef(false);

  useEffect(() => {
    if (redirected.current || !initialQuery.trim()) return;
    const target = searchSubmitHref(initialQuery);
    if (target.startsWith("/catalog/")) {
      redirected.current = true;
      router.replace(target);
    }
  }, [initialQuery, router]);

  return <SiteSearch initialQuery={initialQuery} />;
}
