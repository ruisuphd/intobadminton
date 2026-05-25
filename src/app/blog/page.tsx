import type { Metadata } from "next";
import { pageAlternates } from "@/lib/metadata";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog moved — IntoBadminton",
  alternates: pageAlternates("/comparisons/"),
  robots: { index: false, follow: true },
};

export default function BlogPage() {
  return (
    <main className="flex-1 py-16">
      <div className="layout-band max-w-3xl">
        <p className="text-sm text-[var(--color-muted)]">
          The blog has moved. Browse{" "}
          <Link href="/comparisons/" className="text-[var(--color-accent)] underline">
            comparisons and buying guides
          </Link>{" "}
          or the{" "}
          <Link href="/review/" className="text-[var(--color-accent)] underline">
            review catalogue
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
