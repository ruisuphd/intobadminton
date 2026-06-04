"use client";

import { HelpfulReaction } from "@/components/HelpfulReaction";
import { SocialShare } from "@/components/SocialShare";

/**
 * Shared foot-of-article engagement stripe for long-form commercial pages
 * (/best/*, /guides/*, /compare-guides/*) that don't use EditorialArticlePage.
 */
export function ArticleEngagementFooter({
  url,
  title,
  contentId,
}: {
  url: string;
  title: string;
  /** Stable id for HelpfulReaction localStorage + analytics, e.g. `guide:racket-balance`. */
  contentId: string;
}) {
  return (
    <footer className="mt-12 space-y-0 border-t border-[color:var(--line)] pt-10">
      <SocialShare url={url} title={title} />
      <HelpfulReaction contentId={contentId} />
    </footer>
  );
}
