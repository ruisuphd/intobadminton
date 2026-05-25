import type { Metadata } from "next";
import { pageAlternates } from "@/lib/metadata";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog moved — IntoBadminton",
  alternates: pageAlternates("/review/"),
  robots: { index: false, follow: true },
};

const CLIENT_REDIRECT_SCRIPT = `(function(){try{location.replace("/review/")}catch(e){location.href="/review/"}})();`;

export default function BlogsAliasPage() {
  return (
    <>
      <meta httpEquiv="refresh" content="0; url=/review/" />
      <link rel="canonical" href="/review/" />
      <script
        dangerouslySetInnerHTML={{ __html: CLIENT_REDIRECT_SCRIPT }}
      />
      <main className="flex-1 py-16">
        <noscript>
          <p>
            Reviews now live at{" "}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/review/">/review/</a>.
          </p>
        </noscript>
        <div className="layout-band max-w-2xl">
          <span className="chip chip-secondary">Moved</span>
          <h1 className="text-headline mt-5 text-[var(--text)]">Blog moved</h1>
          <p className="mt-4 leading-relaxed text-[var(--color-muted)]">
            All equipment notes are now at /review/.
          </p>
          <Link href="/review/" className="btn-primary mt-6 inline-flex">
            Go to reviews
          </Link>
        </div>
      </main>
    </>
  );
}
