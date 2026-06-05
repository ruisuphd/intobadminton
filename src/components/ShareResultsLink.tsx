"use client";

import { useMemo, useState } from "react";
import { trackEvent } from "@/components/Analytics";
import { profileToResultsPath } from "@/lib/profile-url";
import type { UserProfile } from "@/lib/taxonomy";

type Props = {
  profile: UserProfile;
  topN: number;
};

/**
 * Copy a deep-linked `/results/` URL so players can share a shortlist with
 * coaches or doubles partners without an account.
 */
export function ShareResultsLink({ profile, topN }: Props) {
  const [copied, setCopied] = useState(false);

  const shareUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    const path = profileToResultsPath(profile, topN);
    return `${window.location.origin}${path}`;
  }, [profile, topN]);

  const copy = async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      trackEvent("results_share_copy", { category: profile.category ?? "unknown" });
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      trackEvent("results_share_copy_failed", {
        category: profile.category ?? "unknown",
      });
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex h-9 items-center gap-2 rounded-full border border-[color:var(--line-strong)] px-4 text-sm text-[var(--text)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
    >
      {copied ? "Link copied" : "Copy share link"}
    </button>
  );
}
