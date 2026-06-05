"use client";

import { usePathname } from "next/navigation";
import { ArticleEngagementFooter } from "@/components/ArticleEngagementFooter";
import { companyInfo } from "@/lib/company";

const TOOL_META: Record<string, { title: string; contentId: string }> = {
  "/tools/": {
    title: "IntoBadminton toolkit",
    contentId: "tool:hub",
  },
  "/tools/skill-level-converter/": {
    title: "Skill-level converter",
    contentId: "tool:skill-level-converter",
  },
  "/tools/string-tension-calculator/": {
    title: "String tension calculator",
    contentId: "tool:string-tension-calculator",
  },
  "/tools/racket-balance-explainer/": {
    title: "Racket balance explainer",
    contentId: "tool:racket-balance-explainer",
  },
  "/tools/court-diagram/": {
    title: "Court dimensions diagram",
    contentId: "tool:court-diagram",
  },
  "/tools/authenticity-checker/": {
    title: "Authenticity checker",
    contentId: "tool:authenticity-checker",
  },
};

/** Share + helpful-reaction footer for `/tools/*` routes. */
export function ToolEngagement() {
  const pathname = usePathname() ?? "";
  const meta = TOOL_META[pathname];
  if (!meta) return null;

  return (
    <ArticleEngagementFooter
      url={`${companyInfo.siteUrl}${pathname}`}
      title={meta.title}
      contentId={meta.contentId}
    />
  );
}
