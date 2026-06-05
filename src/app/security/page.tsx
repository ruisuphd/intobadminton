import type { Metadata } from "next";
import Link from "next/link";
import { pageAlternates } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Security",
  description:
    "Security posture, reporting, and static-hosting controls for IntoBadminton.",
  alternates: pageAlternates("/security/"),
};

export default function SecurityPage() {
  return (
    <main className="flex-1 py-16">
      <article className="layout-band max-w-3xl space-y-5 text-[var(--color-muted)]">
        <h1 className="text-3xl font-semibold text-[var(--text)]">
          Security
        </h1>
        <p>
          IntoBadminton v1 is a static Next.js export with no production
          database, no server-side account system, and no payment flow. That
          reduces attack surface, but it does not remove security obligations.
        </p>
        <h2 className="text-xl font-semibold text-[var(--text)]">
          Current controls
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Non-essential analytics and ads are off by default.</li>
          <li>AdSense is disabled unless a compliant deployment mode is set.</li>
          <li>Review drafts stay local until a moderated backend exists.</li>
          <li>Source evidence avoids copied third-party review text.</li>
        </ul>
        <h2 className="text-xl font-semibold text-[var(--text)]">
          Hosting requirements
        </h2>
        <p>
          Configure security headers at the host or CDN layer: Content Security
          Policy, Referrer-Policy, X-Content-Type-Options, Permissions-Policy,
          and HTTPS/HSTS where supported. GitHub Pages alone has limited header
          control, so use Cloudflare or Firebase Hosting when enforcing headers.
        </p>
        <h2 className="text-xl font-semibold text-[var(--text)]">
          Report a vulnerability
        </h2>
        <p>
          Replace the placeholder contact in <code>/.well-known/security.txt</code>{" "}
          before launch. Do not submit real user data in vulnerability reports.
        </p>

        <section className="mt-16 rounded-2xl bg-[color:var(--color-accent-soft)] p-7 text-center">
          <h2 className="text-xl font-semibold text-[var(--text)]">
            Looking for equipment instead?
          </h2>
          <p className="mt-3 text-sm text-[var(--color-muted)]">
            Browse the full catalog with filters for brand, weight, balance, and
            price — or run the finder for a personalised shortlist.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <Link href="/catalog/" className="btn-primary">
              Browse full catalog
            </Link>
            <Link href="/quiz/" className="btn-secondary">
              Start the finder
            </Link>
          </div>
        </section>
      </article>
    </main>
  );
}
