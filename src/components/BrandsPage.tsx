import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { RelatedReadingShelf } from "@/components/RelatedReadingShelf";
import { brands, BRAND_TIER_LABELS, type BrandTier } from "@/lib/brands";
import { companyInfo } from "@/lib/company";
import { relatedReadingForPath } from "@/lib/related-content";
import type { SiteLocale } from "@/lib/locale";

const tierOrder: BrandTier[] = ["flagship", "tier2", "tier3", "tier4"];

const DEDICATED_BRAND_PAGES: Record<string, string> = {
  yonex: "/brands/yonex/",
  victor: "/brands/victor/",
  "li-ning": "/brands/li-ning/",
  bonny: "/brands/bonny/",
  kawasaki: "/brands/kawasaki/",
  kumpoo: "/brands/kumpoo/",
  anta: "/brands/anta/",
};

const c = {
  hero: "Badminton brands we cover",
  dek: "The manufacturers our recommendations draw from — Yonex, Victor, Li-Ning, Kumpoo, and more. Tiering reflects global market presence and catalogue depth, not quality — many tier-3 and tier-4 brands beat the flagships on specific products.",
  coverage: "Categories covered",
  founded: "Founded",
  country: "HQ",
  visit: "Official site",
  methodology:
    "Tier placement is editorial, based on global availability, breadth of catalogue, and how often the brand appears in independent reviews and BWF-tour play. We keep the list updated as catalogues change.",
  requestHeading: "Don't see a brand?",
  requestBody:
    "Email us with the brand name and a link to their official site. We add brands as we can responsibly verify product specs.",
  contact: "Contact",
} as const;

const categoryLabels: Record<string, string> = {
  racket: "Rackets",
  shoes: "Shoes",
  string: "Strings",
  bag: "Bags",
  shuttle: "Shuttles",
  grip: "Grips",
  accessory: "Accessories",
};

function categoryLabel(cat: string): string {
  return categoryLabels[cat] ?? cat;
}

export function BrandsPage({ locale: _locale }: { locale: SiteLocale }) {
  const related = relatedReadingForPath("/brands/");
  const brandsJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${companyInfo.siteUrl}/brands/#list`,
    name: c.hero,
    inLanguage: "en",
    numberOfItems: brands.length,
    itemListElement: brands.map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Brand",
        "@id": `${companyInfo.siteUrl}/brands/#${b.id}`,
        name: b.name,
        url: b.officialUrl,
        description: b.knownFor,
      },
    })),
  };

  return (
    <main className="flex-1 py-16">
      <JsonLd data={brandsJsonLd} />
      <article className="layout-band max-w-5xl space-y-10">
        <header className="space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight text-[var(--text)]">
            {c.hero}
          </h1>
          <p className="text-lg text-[var(--color-muted)]">{c.dek}</p>
          <p className="text-sm text-[var(--color-muted)]">{c.methodology}</p>
        </header>

        {tierOrder.map((tier) => {
          const tierBrands = brands.filter((b) => b.tier === tier);
          if (tierBrands.length === 0) return null;
          return (
            <section key={tier} className="space-y-4">
              <h2 className="text-2xl font-semibold text-[var(--text)]">
                {BRAND_TIER_LABELS[tier].en}
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {tierBrands.map((b) => (
                  <article
                    key={b.id}
                    id={b.id}
                    className="card p-6"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="text-xl font-semibold text-[var(--text)]">
                        {b.name}
                      </h3>
                      <a
                        href={b.officialUrl}
                        target="_blank"
                        rel="noreferrer noopener nofollow"
                        className="text-sm text-[var(--color-accent)] hover:underline"
                      >
                        {c.visit} →
                      </a>
                    </div>
                    <p className="mt-2 text-xs text-[var(--color-muted)]">
                      {c.founded} {b.founded} · {c.country} {b.country}
                    </p>
                    <p className="mt-3 text-sm text-[var(--color-muted)]">
                      {b.knownFor}
                    </p>
                    <div className="mt-4">
                      <p className="text-xs uppercase tracking-wide text-[var(--color-muted)]">
                        {c.coverage}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {b.categoriesCovered.map((cat) => (
                          <span
                            key={cat}
                            className="rounded-full bg-[var(--color-accent-soft)] px-2.5 py-0.5 text-xs text-[var(--text)]"
                          >
                            {categoryLabel(cat)}
                          </span>
                        ))}
                      </div>
                    </div>
                    {DEDICATED_BRAND_PAGES[b.id] && (
                      <Link
                        href={DEDICATED_BRAND_PAGES[b.id]}
                        className="mt-4 inline-flex text-sm font-medium text-[var(--color-accent)] hover:underline"
                      >
                        Read the {b.name} guide →
                      </Link>
                    )}
                  </article>
                ))}
              </div>
            </section>
          );
        })}

        <RelatedReadingShelf items={related} />

        <section className="card p-6">
          <h2 className="text-xl font-semibold text-[var(--text)]">
            {c.requestHeading}
          </h2>
          <p className="mt-2 text-sm text-[var(--color-muted)]">
            {c.requestBody} {companyInfo.contactEmail}
          </p>
        </section>
      </article>
    </main>
  );
}
