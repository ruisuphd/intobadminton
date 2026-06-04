"use client";

import { ArticleEngagementFooter } from "@/components/ArticleEngagementFooter";
import { ReadingProgress } from "@/components/ReadingProgress";
import { companyInfo } from "@/lib/company";

/**
 * Reading progress + engagement footer for `/guides/[slug]/` pages.
 */
export function GuideEngagement({
  path,
  title,
}: {
  path: string;
  title: string;
}) {
  const slug = path.replace(/^\/guides\//, "").replace(/\/$/, "");
  const url = `${companyInfo.siteUrl}${path}`;

  return (
    <>
      <ReadingProgress />
      <ArticleEngagementFooter
        url={url}
        title={title}
        contentId={`guide:${slug}`}
      />
    </>
  );
}
