"use client";

import { useProfile } from "@/context/ProfileContext";
import { trackEvent } from "@/components/Analytics";

/**
 * Small heart/bookmark toggle that adds the product to the user's saved
 * shortlist. Counts toward the 30-day TTL list in ProfileContext, separate
 * from the 3-slot compare tray. Designed to sit in a product card header.
 */
export function SaveProductButton({
  id,
  label,
  size = "md",
}: {
  /** Product id (e.g. `yy-astrox-99-pro`). Must match the catalog row id. */
  id: string;
  /** Visible product label used in the aria-label for screen readers. */
  label: string;
  size?: "sm" | "md";
}) {
  const { isSaved, toggleSaved } = useProfile();
  const saved = isSaved(id);
  const sizing = size === "sm" ? "h-8 px-3 text-xs" : "h-9 px-4 text-sm";

  return (
    <button
      type="button"
      onClick={() => {
        const wasSaved = saved;
        toggleSaved(id);
        trackEvent(wasSaved ? "product_unsaved" : "product_saved", {
          product_id: id,
        });
      }}
      aria-pressed={saved}
      aria-label={
        saved ? `Remove ${label} from saved` : `Save ${label} for later`
      }
      className={`inline-flex items-center gap-1.5 rounded-full border transition-colors ${sizing} ${
        saved
          ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)] text-[var(--color-accent)]"
          : "border-[color:var(--line-strong)] text-[var(--text)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
      }`}
    >
      <span aria-hidden>{saved ? "★" : "☆"}</span>
      <span className="font-medium">{saved ? "Saved" : "Save"}</span>
    </button>
  );
}
