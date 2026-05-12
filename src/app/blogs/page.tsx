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

export default function BlogsAliasPage() {
  return (
    <main className="flex-1 py-16">
      <meta httpEquiv="refresh" content="0; url=/blog/" />
      <div className="layout-band max-w-2xl">
        <span className="chip chip-secondary">Moved</span>
        <h1 className="text-headline mt-5 text-[var(--text)]">
          Blog moved
        </h1>
        <p className="mt-4 leading-relaxed text-[var(--color-muted)]">
          The badminton equipment blog now lives at /blog/.
        </p>
        <Link href="/blog/" className="btn-primary mt-6 inline-flex">
          Go to the blog
        </Link>
      </div>
    </main>
  );
}
