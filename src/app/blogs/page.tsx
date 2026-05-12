import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Badminton equipment blog",
  description:
    "Original badminton equipment reviews, comparisons, and buying guides from IntoBadminton.",
  alternates: {
    canonical: "/blog/",
  },
  robots: {
    index: false,
    follow: true,
  },
};

const CLIENT_REDIRECT_SCRIPT = `(function(){try{location.replace("/blog/")}catch(e){location.href="/blog/"}})();`;

export default function BlogsAliasPage() {
  return (
    <>
      {/*
        React 19 hoists these tags into the document <head> in the static
        export (verified in the built /blogs/index.html: meta-refresh and
        canonical land before </head>). The inline script is a JS fallback
        for user agents that don't honour meta-refresh, and <noscript>
        ensures crawlers without JS still see the redirect signal.
      */}
      <meta httpEquiv="refresh" content="0; url=/blog/" />
      <link rel="canonical" href="/blog/" />
      <script
        dangerouslySetInnerHTML={{ __html: CLIENT_REDIRECT_SCRIPT }}
      />
      <main className="flex-1 py-16">
        <noscript>
          <p>
            The badminton equipment blog now lives at{" "}
            {/* Plain <a> on purpose: a no-JS user agent cannot run the
                next/link runtime, so a normal anchor is the correct fallback. */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/blog/">/blog/</a>.
          </p>
        </noscript>
        <div className="layout-band max-w-2xl">
          <span className="chip chip-secondary">Moved</span>
          <h1 className="text-headline mt-5 text-[var(--text)]">Blog moved</h1>
          <p className="mt-4 leading-relaxed text-[var(--color-muted)]">
            The badminton equipment blog now lives at /blog/.
          </p>
          <Link href="/blog/" className="btn-primary mt-6 inline-flex">
            Go to the blog
          </Link>
        </div>
      </main>
    </>
  );
}
