import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security — IntoBadminton",
  description:
    "Security posture, reporting, and static-hosting controls for IntoBadminton.",
  alternates: { canonical: "/security/" },
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
      </article>
    </main>
  );
}
