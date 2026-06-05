"use client";

import { usePathname } from "next/navigation";
import { GuideInPageToc } from "@/components/GuideInPageToc";
import { HelpfulReaction } from "@/components/HelpfulReaction";
import { ReadingProgress } from "@/components/ReadingProgress";
import { SocialShare } from "@/components/SocialShare";
import { companyInfo } from "@/lib/company";

const GUIDE_HEADLINES: Record<string, string> = {
  "/guides/string-tension/": "Badminton string tension guide",
  "/guides/racket-balance/": "Racket balance and swing weight",
  "/guides/shoes-footwork/": "Badminton shoes and footwork",
  "/guides/wide-feet-badminton-shoes/": "Wide feet badminton shoes",
  "/guides/doubles-roles/": "Doubles roles and positioning",
  "/guides/equipment-authenticity/": "Equipment authenticity guide",
  "/guides/glossary/": "Badminton equipment glossary",
  "/guides/season-refresh/": "Season equipment refresh",
  "/guides/badminton-shoes-vs-running-shoes/": "Badminton shoes vs running shoes",
  "/guides/doubles-positioning-and-rackets/": "Doubles positioning and rackets",
};

export function GuideReadingChrome() {
  const pathname = usePathname();
  if (pathname === "/guides/" || pathname === "/guides") return null;
  return <ReadingProgress />;
}

export function GuideInPageNavigation() {
  const pathname = usePathname();
  if (pathname === "/guides/" || pathname === "/guides") return null;
  return <GuideInPageToc />;
}

export function GuideEngagementFooter() {
  const pathname = usePathname();
  if (!pathname || pathname === "/guides/" || pathname === "/guides") {
    return null;
  }

  const path = pathname.endsWith("/") ? pathname : `${pathname}/`;
  const title =
    GUIDE_HEADLINES[path] ??
    (typeof document !== "undefined"
      ? document.title.replace(/\s*\|\s*IntoBadminton\s*$/i, "").trim()
      : "Guide");
  const canonicalUrl = `${companyInfo.siteUrl}${path}`;
  const contentId = `guide:${path.replace(/^\/guides\//, "").replace(/\/$/, "")}`;

  return (
    <div className="layout-band max-w-3xl min-h-[8rem] pb-16">
      <SocialShare url={canonicalUrl} title={title} />
      <HelpfulReaction contentId={contentId} />
    </div>
  );
}
