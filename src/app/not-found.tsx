import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  description:
    "The requested IntoBadminton page could not be found. Continue to the equipment finder, blog, best picks, or contact page.",
  robots: {
    index: false,
    follow: true,
  },
};

const RECOVERY_LINKS = [
  {
    href: "/quiz/",
    label: "Equipment finder",
    description: "Get racket, string, shoe, and setup suggestions.",
  },
  {
    href: "/blog/",
    label: "Equipment blog",
    description: "Read reviews, comparisons, and setup guides.",
  },
  {
    href: "/best/",
    label: "Best picks",
    description: "Browse curated badminton equipment shortlists.",
  },
  {
    href: "/contact/",
    label: "Contact",
    description: "Report a broken link or source correction.",
  },
] as const;

export default function NotFound() {
  return (
    <main className="flex-1 py-16 sm:py-20">
      <div className="layout-band max-w-6xl">
        <section className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-start">
          <div className="max-w-2xl">
            <span className="chip chip-secondary">404</span>
            <h1 className="text-headline mt-5 text-[var(--text)]">
              Page not found
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-[var(--color-muted)]">
              This address may have moved, or the link may be missing a final
              slash. Continue from the main equipment paths below.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/blog/" className="btn-primary">
                Read the blog
              </Link>
              <Link href="/" className="btn-secondary">
                Go home
              </Link>
            </div>
          </div>

          <aside className="border-t border-[color:var(--line)] pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-subtle)]">
              Useful links
            </h2>
            <ul className="mt-4 space-y-4">
              {RECOVERY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group block rounded-lg py-1 transition-colors"
                  >
                    <span className="font-medium text-[var(--text)] group-hover:text-[var(--color-accent)]">
                      {link.label}
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-[var(--color-muted)]">
                      {link.description}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </section>
      </div>
    </main>
  );
}
