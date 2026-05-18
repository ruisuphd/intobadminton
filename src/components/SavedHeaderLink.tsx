"use client";

import Link from "next/link";
import { useProfile } from "@/context/ProfileContext";

/**
 * Header pill that surfaces the user's saved-products count and links to
 * /saved/. Renders nothing when the count is zero — the homepage promise of
 * "no signup, no email gate" extends here: a header pill for an empty
 * shortlist is noise.
 */
export function SavedHeaderLink({
  variant = "desktop",
  onNavigate,
}: {
  variant?: "desktop" | "mobile";
  /** Optional callback fired when the link is followed (e.g. to close a
   *  mobile menu). */
  onNavigate?: () => void;
}) {
  const { saved } = useProfile();
  if (saved.length === 0) return null;

  if (variant === "mobile") {
    return (
      <Link
        href="/saved/"
        onClick={onNavigate}
        className="block py-3 text-base font-medium text-[var(--text)]"
      >
        Saved ({saved.length})
      </Link>
    );
  }

  return (
    <Link
      href="/saved/"
      className="inline-flex h-9 items-center justify-center gap-1 rounded-full border border-[color:var(--line-strong)] px-3 text-sm font-medium text-[var(--text)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
    >
      <span aria-hidden>★</span>
      <span>Saved</span>
      <span className="rounded-full bg-[var(--color-accent-soft)] px-1.5 text-xs text-[var(--color-accent)]">
        {saved.length}
      </span>
    </Link>
  );
}
