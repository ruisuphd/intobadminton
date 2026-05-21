import Link from "next/link";

/**
 * Renders the site-wide affiliate disclosure. Mounted in `SiteFooter` so it
 * appears on every page, satisfying the postbuild audit rule that any page
 * with sponsored links must surface the disclosure.
 */
export function AffiliateDisclosure() {
  return (
    <p
      data-affiliate-disclosure="footer"
      className="mt-6 max-w-3xl text-xs leading-relaxed text-[var(--color-subtle)]"
    >
      Outbound links labelled with an <span className="font-mono">Aff</span>{" "}
      chip are affiliate links. If you buy through them we may earn a small
      commission &mdash; at no extra cost to you, and never in a way that
      changes our fit-score order. Full details in our{" "}
      <Link
        href="/terms/#affiliate"
        className="text-[var(--color-muted)] underline"
      >
        terms
      </Link>
      .
    </p>
  );
}
