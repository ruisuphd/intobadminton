import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { FinderQuickFilters } from "@/components/FinderQuickFilters";
import { HomeContinueReading } from "@/components/HomeContinueReading";
import { HomeRecentShortlists } from "@/components/HomeRecentShortlists";
import { HomeToolkitStrip } from "@/components/HomeToolkitStrip";
import { SiteSearchFormStatic } from "@/components/SiteSearchFormStatic";
import { JsonLd } from "@/components/JsonLd";
import catalogStats from "@/data/catalog-stats.json";
import { homeFeaturedReviewPath, homeFeaturedReviews, reviewArticleCount } from "@/lib/home-featured";
import { buildLocalizedPath, type SiteLocale } from "@/lib/locale";
import { t } from "@/lib/i18n";
import { companyInfo, organizationJsonLd } from "@/lib/company";

const categoryCount = (category: keyof typeof catalogStats) =>
  catalogStats[category] ?? 0;

const HOME_FAQ: { q: string; a: string }[] = [
  {
    q: "How do I choose the right badminton racket?",
    a: "Start with level, discipline, and comfort. A racket that fits your timing and shoulder is more useful than a flagship frame that you cannot load consistently. IntoBadminton asks for level, discipline, style, body, and budget, then shows the score factors and source authority for each result.",
  },
  {
    q: "Yonex, Victor, or Li-Ning — which brand is best?",
    a: "There is no single best badminton brand for every player. Compare the exact model, weight and grip variant, shaft flex, balance, warranty channel, and local availability. The finder treats brand as context, not as proof that a racket fits you.",
  },
  {
    q: "What badminton string should a club player use?",
    a: "Match string gauge and tension to your contact quality, durability needs, and arm comfort. Treat any tension suggestion as a starting point, then ask a qualified stringer to account for your racket frame, string, shuttle speed, and injury history.",
  },
  {
    q: "Are badminton shoes really different from running shoes?",
    a: "Badminton footwork includes split steps, lunges, braking, and side-to-side movement. Choose court shoes designed for lateral stability and indoor grip, and try them with badminton socks before relying on them in match play.",
  },
  {
    q: "How does the IntoBadminton finder score recommendations?",
    a: "Every result breaks down into five named factors: style fit, discipline fit, level fit, budget fit, and body / comfort fit. Source labels distinguish official product pages from third-party or still-unverified references. Read the methodology page for the full weighting.",
  },
];

export function LocalizedHome({ locale }: { locale: SiteLocale }) {
  const copy = t(locale);
  const localized = (path: string) => buildLocalizedPath(locale, path);
  const featuredReviews = homeFeaturedReviews;
  const reviewCount = reviewArticleCount;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${companyInfo.siteUrl}/#faq`,
    mainEntity: HOME_FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${companyInfo.siteUrl}/#collection`,
    name: "IntoBadminton — badminton equipment finder",
    url: `${companyInfo.siteUrl}/`,
    inLanguage: "en",
    publisher: organizationJsonLd,
    about: {
      "@type": "Thing",
      name: "Badminton equipment",
      description:
        "Badminton rackets, strings, shoes, bags, shuttles, and grips, with player-fit recommendations.",
    },
    mainEntity: {
      "@type": "ItemList",
      name: "Badminton brands covered",
      itemListElement: [
        { "@type": "Brand", name: "Yonex", url: `${companyInfo.siteUrl}/brands/yonex/` },
        { "@type": "Brand", name: "Victor", url: `${companyInfo.siteUrl}/brands/victor/` },
        { "@type": "Brand", name: "Li-Ning", url: `${companyInfo.siteUrl}/brands/li-ning/` },
      ],
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${companyInfo.siteUrl}/#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${companyInfo.siteUrl}/`,
      },
    ],
  };

  const popularSearches: { label: string; href: string; tag: string }[] = [
    { label: "Best rackets under $100", href: "/best/rackets-under-100/", tag: "Budget" },
    { label: "Best lightweight 5U rackets", href: "/best/lightweight-rackets-5u/", tag: "5U" },
    { label: "Best rackets for shoulder comfort", href: "/best/rackets-for-shoulder-comfort/", tag: "Comfort" },
    { label: "Browse equipment catalog", href: "/catalog/", tag: "Catalog" },
    { label: "Best beginner rackets", href: "/best/beginner-rackets/", tag: "Beginner" },
    { label: "Best doubles rackets", href: "/best/doubles-rackets/", tag: "Doubles" },
    { label: "Best smash rackets", href: "/best/smash-heavy-rackets/", tag: "Singles" },
    { label: "Best intermediate rackets", href: "/best/intermediate-rackets/", tag: "Intermediate" },
    { label: "Best badminton shoes", href: "/best/shoes/", tag: "Shoes" },
    {
      label: "Badminton shoes vs running shoes",
      href: "/guides/badminton-shoes-vs-running-shoes/",
      tag: "Shoes",
    },
    { label: "Best badminton strings", href: "/best/strings/", tag: "Strings" },
    { label: "Yonex rackets decoded", href: "/brands/yonex/", tag: "Yonex" },
    { label: "Victor rackets decoded", href: "/brands/victor/", tag: "Victor" },
    { label: "Li-Ning rackets decoded", href: "/brands/li-ning/", tag: "Li-Ning" },
    { label: "Yonex Astrox vs Nanoflare", href: "/compare-guides/yonex-astrox-vs-nanoflare/", tag: "Compare" },
    { label: "Yonex vs Victor vs Li-Ning", href: "/compare-guides/yonex-victor-li-ning/", tag: "Compare" },
    { label: "Spot fake rackets — authenticity check", href: "/guides/equipment-authenticity/", tag: "Authenticity" },
    { label: "Glossary — 4U, head-heavy, T-throat explained", href: "/guides/glossary/", tag: "Glossary" },
    { label: "68 / 72 / 76 / 78 / 80 hole rackets explained", href: "/review/racket-stringing-hole-patterns-explained/", tag: "Stringing" },
    { label: "Reviews hub", href: "/review/", tag: "Reviews" },
    { label: "Nanoflare 1000 Z review", href: "/review/yonex-nanoflare-1000z-review/", tag: "Reviews" },
    { label: "Yonex Tour vs Pro: which Tour is worth buying", href: "/review/yonex-tour-series-buying-guide/", tag: "Value" },
    { label: "Kumpoo — the fourth major badminton brand", href: "/review/kumpoo-fourth-major-badminton-brand-profile/", tag: "Brand" },
  ];

  return (
    <main className="flex-1">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={collectionJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      {/* Hero */}
      <section className="hero-decoration relative overflow-hidden pt-20 pb-16 lg:pt-24 lg:pb-20">
        <div className="layout-band relative max-w-6xl">
          <div className="max-w-3xl">
            <span className="chip">Badminton equipment finder · 2026 catalogue</span>
            <h1 className="text-display mt-5 text-[var(--text)]">
              {copy.home.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--color-muted)]">
              {copy.home.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={localized("/quiz/")} className="btn-primary">
                {copy.home.start}
              </Link>
              <Link href={localized("/review/")} className="btn-secondary">
                Read {reviewCount} reviews
              </Link>
            </div>
            <p className="mt-6 text-xs text-[var(--color-subtle)]">
              {"No signup · No email gate · Profiles stay on device"}
            </p>
            <div className="mt-8 max-w-xl">
              <p className="text-sm font-medium text-[var(--text)]">
                Search reviews, guides, and tools
              </p>
              <div className="mt-3">
                <SiteSearchFormStatic />
              </div>
            </div>
          </div>

          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { num: `${catalogStats.total}`, label: "items in the finder" },
              { num: String(reviewCount), label: "review notes" },
              { num: "5", label: "transparent fit factors per result" },
              { num: "3", label: "major brand families covered" },
            ].map((s) => (
              <div
                key={s.label}
                className="card p-5"
              >
                <p className="text-3xl font-semibold tracking-tight text-[var(--color-accent)]">
                  {s.num}
                </p>
                <p className="mt-2 text-sm text-[var(--color-muted)]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HomeContinueReading locale={locale} />
      <HomeRecentShortlists locale={locale} />

      <section className="border-t border-[color:var(--line)] py-12 lg:py-16">
        <div className="layout-band max-w-6xl">
          <FinderQuickFilters />
        </div>
      </section>

      {/* Popular searches */}
      <section className="border-t border-[color:var(--line)] py-16 lg:py-20">
        <div className="layout-band max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <h2 className="text-headline text-[var(--text)]">
                What badminton lovers search most
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)]">
                Popular landing pages, hand-picked by player intent.
              </p>
            </div>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {popularSearches.map((p) => (
              <Link
                key={p.href}
                href={localized(p.href)}
                className="card card-interactive p-5"
              >
                <span className="chip chip-secondary">{p.tag}</span>
                <p className="mt-3 text-sm font-medium text-[var(--text)]">
                  {p.label}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="border-t border-[color:var(--line)] py-20 lg:py-24">
        <div className="layout-band max-w-6xl">
          <div className="max-w-3xl">
            <h2 className="text-headline text-[var(--text)]">
              Explainable recommendations with source labels
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[var(--color-muted)]">
              {"Every recommendation breaks down into five named factors: style, discipline, level, budget, and body fit. Product-page sources, editor notes, and community references are labelled separately."}
            </p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {copy.home.proof.map((x) => (
              <div key={x.title} className="card p-7">
                <h3 className="text-lg font-semibold text-[var(--text)]">
                  {x.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
                  {x.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories covered */}
      <section className="border-t border-[color:var(--line)] py-20 lg:py-24">
        <div className="layout-band max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <h2 className="text-headline text-[var(--text)]">
                The full badminton gear stack
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)]">
                Rackets, strings, shoes, bags, shuttles, and grips, each scored against how you actually play.
              </p>
            </div>
            <Link
              href={localized("/brands/")}
              className="text-sm font-medium text-[var(--color-accent)] hover:text-[var(--color-accent-hover)]"
            >
              {"View brands →"}
            </Link>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: `Rackets · ${categoryCount("racket")} rows`, body: "Role, level, weight class, shaft flex, balance, and source authority are shown before purchase advice." },
              { title: `Shoes · ${categoryCount("shoes")} rows`, body: "Foot width, stability, cushioning, and comfort cautions are separated from brand preference." },
              { title: `Strings · ${categoryCount("string")} rows`, body: "Gauge, feel, repulsion, durability, and tension fit are treated as tradeoffs, not universal upgrades." },
              { title: `Bags · ${categoryCount("bag")} rows`, body: "Capacity, shoe compartment, and commute-vs-tournament workflow." },
              { title: `Shuttles · ${categoryCount("shuttle")} rows`, body: "Speed code, material, approval status, and durability tier." },
              { title: `Grips · ${categoryCount("grip")} rows`, body: "Overgrip vs replacement, tackiness, and sweat handling." },
            ].map((item) => (
              <div
                key={item.title}
                className="card p-5"
              >
                <p className="text-sm font-semibold text-[var(--text)]">
                  {item.title}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-[var(--color-muted)]">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HomeToolkitStrip locale={locale} />

      {featuredReviews.length > 0 && (
        <section className="border-t border-[color:var(--line)] py-20 lg:py-24">
          <div className="layout-band max-w-6xl">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-2xl">
                <h2 className="text-headline text-[var(--text)]">
                  Latest reviews
                </h2>
                <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)]">
                  Recent equipment notes from club play.
                </p>
              </div>
              <Link
                href={localized("/review/")}
                className="text-sm font-medium text-[var(--color-accent)] hover:text-[var(--color-accent-hover)]"
              >
                {"View all →"}
              </Link>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {featuredReviews.map((article) => (
                <Link
                  key={article.slug}
                  href={localized(homeFeaturedReviewPath(article.slug))}
                  className="card card-interactive p-6 block"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs text-[var(--color-subtle)]">
                      {article.readingMinutes} min read
                    </span>
                    <span className="text-xs text-[var(--color-subtle)]">·</span>
                    <time
                      className="text-xs text-[var(--color-subtle)]"
                      dateTime={article.updatedAt}
                    >
                      {article.updatedAt}
                    </time>
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-[var(--text)]">
                    {article.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="layout-band max-w-6xl py-12">
        <AdSlot id={`${locale}-home-mid`} />
      </div>

      {/* FAQ */}
      <section className="border-t border-[color:var(--line)] py-20 lg:py-24">
        <div className="layout-band max-w-3xl">
          <h2 className="text-headline text-[var(--text)]">
            Badminton equipment questions, answered
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)]">
            Short practical answers with clear limits. For deeper context, jump into the finder or read a full deep-dive.
          </p>
          <div className="mt-10 divide-y divide-[color:var(--line)]">
            {HOME_FAQ.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="cursor-pointer list-none text-base font-semibold text-[var(--text)]">
                  <span className="inline-flex w-full items-center justify-between gap-4">
                    {f.q}
                    <span className="text-[var(--color-accent)] transition-transform group-open:rotate-45">
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[color:var(--line)] py-20 lg:py-24">
        <div className="layout-band max-w-3xl text-center">
          <h2 className="text-headline text-[var(--text)]">
            Find the badminton gear that fits your game
          </h2>
          <p className="mt-5 text-base leading-relaxed text-[var(--color-muted)]">
            Answer a few questions. We rank gear with a transparent score — no email, no account, no signup wall.
          </p>
          <Link href={localized("/quiz/")} className="btn-primary mt-10">
            {copy.home.start}
          </Link>
        </div>
      </section>
    </main>
  );
}
