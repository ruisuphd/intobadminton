import Link from "next/link";

type AffiliateDisclosureProps = {
  variant?: "footer" | "inline";
};

/**
 * Renders the site-wide affiliate disclosure. Mounted in `SiteFooter` so it
 * appears on every page, satisfying the postbuild audit rule that any page
 * with sponsored links must surface the disclosure.
 */
export function AffiliateDisclosure({
  variant = "footer",
}: AffiliateDisclosureProps) {
  if (variant === "inline") {
    return (
      <p
        data-affiliate-disclosure="inline"
        className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface-muted)] p-4 text-xs leading-relaxed text-[var(--color-muted)]"
      >
        <strong className="text-[var(--text)]">Affiliate disclosure:</strong>{" "}
        Some outbound links on this page are affiliate links marked with the{" "}
        <span className="font-mono">Aff</span> chip. If you buy through them,
        IntoBadminton may earn a commission at no extra cost to you. The
        ranking order is set by our scoring methodology and never by partner
        payouts. Read the full{" "}
        <Link
          href="/terms/#affiliate"
          className="text-[var(--color-accent)] underline"
        >
          editorial and affiliate policy
        </Link>
        .
      </p>
    );
  }

  return (
    <p
      data-affiliate-disclosure="footer"
      className="mt-6 max-w-3xl text-xs leading-relaxed text-[var(--color-subtle)]"
    >
      <strong className="text-[var(--color-muted)]">
        Affiliate disclosure:
      </strong>{" "}
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
