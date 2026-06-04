import Link from "next/link";

/**
 * Top-of-article affiliate disclosure (FTC + AdSense 2026 expectation).
 * Uses `data-affiliate-disclosure="article"` so export-audit can verify pages
 * that may render sponsored outbound links.
 */
export function InArticleAffiliateDisclosure() {
  return (
    <p
      className="rounded-xl border border-[color:var(--line)] bg-[color:var(--surface-muted)] px-4 py-3 text-xs leading-relaxed text-[var(--color-muted)]"
      data-affiliate-disclosure="article"
    >
      Disclosure: Some outbound retailer links may be affiliate links. They never
      change editorial order or fit scores.{" "}
      <Link href="/terms/#affiliate" className="text-[var(--color-accent)] underline">
        Affiliate policy
      </Link>
    </p>
  );
}
