import Link from "next/link";
import products from "@/data/products.json";
import { buildLocalizedPath, type SiteLocale } from "@/lib/locale";
import type { ProductRecord } from "@/lib/types/product";

const CATALOG = products as ProductRecord[];

const QUICK_FILTERS = [
  {
    href: "/catalog/?cat=racket",
    label: "Browse rackets",
    detail: `${CATALOG.filter((p) => p.category === "racket").length} models`,
  },
  {
    href: "/catalog/?cat=shoes",
    label: "Browse shoes",
    detail: `${CATALOG.filter((p) => p.category === "shoes").length} models`,
  },
  {
    href: "/catalog/?cat=string",
    label: "Browse strings",
    detail: `${CATALOG.filter((p) => p.category === "string").length} models`,
  },
  {
    href: "/best/rackets-under-100/",
    label: "Rackets under $100",
    detail: "Budget best-of",
  },
  {
    href: "/best/rackets-under-150/",
    label: "Rackets under $150",
    detail: "Mid-budget picks",
  },
  {
    href: "/quiz/",
    label: "Run the finder",
    detail: "Scored shortlist",
  },
] as const;

/** Surfaces filter-first catalog browsing on the homepage (retailer-style discovery). */
export function HomeCatalogStrip({ locale }: { locale: SiteLocale }) {
  const localized = (path: string) => buildLocalizedPath(locale, path);

  return (
    <section className="border-t border-[color:var(--line)] py-16 lg:py-20">
      <div className="layout-band max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <h2 className="text-headline text-[var(--text)]">
              Browse the full catalogue
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)]">
              Filter {CATALOG.length} products by brand, weight, balance, and
              price — then jump into the finder for a scored shortlist.
            </p>
          </div>
          <Link
            href={localized("/catalog/")}
            className="text-sm font-medium text-[var(--color-accent)] hover:text-[var(--color-accent-hover)]"
          >
            Open catalog →
          </Link>
        </div>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {QUICK_FILTERS.map((item) => (
            <li key={item.href}>
              <Link
                href={localized(item.href)}
                className="card card-interactive block p-5"
              >
                <p className="text-sm font-semibold text-[var(--text)]">
                  {item.label}
                </p>
                <p className="mt-2 text-xs text-[var(--color-muted)]">
                  {item.detail}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
