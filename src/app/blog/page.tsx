import type { Metadata } from "next";
import { pageAlternates } from "@/lib/metadata";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog moved",
  alternates: pageAlternates("/review/"),
  robots: { index: false, follow: true },
};

const CLIENT_REDIRECT_SCRIPT = `(function(){try{location.replace("/review/")}catch(e){location.href="/review/"}})();`;

export default function BlogPage() {
  return (
    <>
      <meta httpEquiv="refresh" content="0; url=/review/" />
      <link rel="canonical" href="/review/" />
      <script dangerouslySetInnerHTML={{ __html: CLIENT_REDIRECT_SCRIPT }} />
      <main className="flex-1 py-16">
        <noscript>
          <p>
            Reviews now live at{" "}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/review/">/review/</a>.
          </p>
        </noscript>
        <div className="layout-band max-w-3xl">
          <p className="text-sm text-[var(--color-muted)]">
            The blog has moved to{" "}
            <Link href="/review/" className="text-[var(--color-accent)] underline">
              /review/
            </Link>
            .
          </p>
        </div>
      </main>
    </>
  );
}
