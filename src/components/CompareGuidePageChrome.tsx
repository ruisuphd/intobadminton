"use client";

import { usePathname } from "next/navigation";
import { ArticleEngagementFooter } from "@/components/ArticleEngagementFooter";
import { InArticleAffiliateDisclosure } from "@/components/InArticleAffiliateDisclosure";
import { ReadingProgress } from "@/components/ReadingProgress";
import { compareGuideByPath } from "@/lib/compare-guides";
import { companyInfo } from "@/lib/company";

export function CompareGuideReadingChrome() {
  const pathname = usePathname();
  if (!pathname || pathname === "/compare-guides/" || pathname === "/compare-guides") {
    return null;
  }
  return <ReadingProgress />;
}

export function CompareGuideEngagementFooter() {
  const pathname = usePathname();
  if (!pathname || pathname === "/compare-guides/" || pathname === "/compare-guides") {
    return null;
  }

  const path = pathname.endsWith("/") ? pathname : `${pathname}/`;
  const guide = compareGuideByPath(path);
  const title =
    guide?.title ??
    (typeof document !== "undefined"
      ? document.title.replace(/\s*\|\s*IntoBadminton\s*$/i, "").trim()
      : "Comparison guide");
  const canonicalUrl = `${companyInfo.siteUrl}${path}`;
  const slug = path.replace(/^\/compare-guides\//, "").replace(/\/$/, "");

  return (
    <div className="layout-band max-w-3xl pb-16">
      <InArticleAffiliateDisclosure />
      <ArticleEngagementFooter
        url={canonicalUrl}
        title={title}
        contentId={`compare:${slug}`}
      />
    </div>
  );
}
