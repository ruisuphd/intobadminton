import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { FinderQuickFilters } from "@/components/FinderQuickFilters";
import { HomeContinueReading } from "@/components/HomeContinueReading";
import { HomeRecentShortlists } from "@/components/HomeRecentShortlists";
import { HomeToolkitStrip } from "@/components/HomeToolkitStrip";
import { SiteSearchFormStatic } from "@/components/SiteSearchFormStatic";
import { JsonLd } from "@/components/JsonLd";
import catalogStats from "@/data/catalog-stats.json";
import { listEditorialUpdates } from "@/lib/editorial-updates";
import { homeFeaturedReviewPath, homeFeaturedReviews, reviewArticleCount } from "@/lib/home-featured";
import { homePopularSearches } from "@/lib/home-popular-searches";
import { buildLocalizedPath, type SiteLocale } from "@/lib/locale";
import { t } from "@/lib/i18n";
import { companyInfo, organizationJsonLd } from "@/lib/company";

const UPDATE_KIND_LABEL: Record<string, string> = {
  best: "Best of",
  guide: "Guide",
  tool: "Tool",
  compare: "Compare",
  brand: "Brand",
  review: "Review",
  page: "Page",
};

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
  const popularSearches = homePopularSearches;
  const recentUpdates = listEditorialUpdates(5);

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

  const heroStats = [
    { num: `${catalogStats.total}`, label: "items ranked" },
    { num: String(reviewCount), label: "review notes" },
    { num: "5", label: "fit factors per result" },
    { num: "3", label: "major brand families" },
  ];

  return (
    <main className="flex-1">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={collectionJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      {/* Hero */}
      <section className="hero-decoration relative overflow-hidden pt-16 pb-12 lg:pt-24 lg:pb-16">
        <div className="layout-band relative max-w-6xl">
          <div className="max-w-2xl">
            <span className="eyebrow">Badminton equipment finder · 2026</span>
            <h1 className="text-display mt-4 text-[var(--text)]">
              {copy.home.title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-[var(--color-muted)]">
              {copy.home.subtitle}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link href={localized("/quiz/")} className="btn-primary">
                {copy.home.start}
              </Link>
              <Link href={localized("/review/")} className="btn-secondary">
                Read {reviewCount} reviews
              </Link>
              <span className="text-xs text-[var(--color-subtle)]">
                No signup · stays on your device
              </span>
            </div>

            <div className="mt-7 max-w-xl">
              <SiteSearchFormStatic />
            </div>

            <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[var(--color-muted)]">
              {heroStats.map((s) => (
                <li key={s.label} className="flex items-baseline gap-1.5">
                  <span className="text-base font-semibold text-[var(--text)]">
                    {s.num}
                  </span>
                  <span>{s.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Quick finder — high-intent shortcut, kept close to the hero. */}
      <section className="section-tight">
        <div className="layout-band max-w-6xl">
          <FinderQuickFilters />
        </div>
      </section>

      {/* Personalized — render only for return visitors. */}
      <HomeContinueReading locale={locale} />
      <HomeRecentShortlists locale={locale} />

      {/* Explore — merged popular searches + category entry points. Keeps every
          curated deep link in one calm index instead of three card grids. */}
      <section className="section border-t border-[color:var(--line)]">
        <div className="layout-band max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <span className="eyebrow">Explore</span>
              <h2 className="text-headline mt-2 text-[var(--text)]">
                Popular with badminton players
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[var(--color-muted)]">
                Hand-picked shortlists and guides across rackets, shoes, strings,
                bags, shuttles, and grips.
              </p>
            </div>
            <Link
              href={localized("/brands/")}
              className="text-sm font-medium text-[var(--color-accent)] hover:text-[var(--color-accent-hover)]"
            >
              {"View all brands →"}
            </Link>
          </div>
          <ul className="mt-8 grid gap-x-10 gap-y-1 sm:grid-cols-2 lg:grid-cols-3">
            {popularSearches.map((p) => (
              <li key={p.href}>
                <Link
                  href={localized(p.href)}
                  className="group flex items-baseline justify-between gap-3 border-b border-[color:var(--line)] py-2.5 text-sm text-[var(--text)] transition-colors hover:text-[var(--color-accent)]"
                >
                  <span className="group-hover:underline">{p.label}</span>
                  <span className="shrink-0 text-xs text-[var(--color-subtle)]">
                    {p.tag}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why */}
      <section className="section border-t border-[color:var(--line)]">
        <div className="layout-band max-w-6xl">
          <div className="max-w-2xl">
            <span className="eyebrow">{"Why it's different"}</span>
            <h2 className="text-headline mt-2 text-[var(--text)]">
              Explainable recommendations with source labels
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[var(--color-muted)]">
              {"Every recommendation breaks down into five named factors: style, discipline, level, budget, and body fit. Product-page sources, editor notes, and community references are labelled separately."}
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {copy.home.proof.map((x) => (
              <div key={x.title} className="card p-6">
                <h3 className="text-base font-semibold text-[var(--text)]">
                  {x.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                  {x.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HomeToolkitStrip locale={locale} />

      {/* Fresh from the site — merged latest reviews + recently updated. */}
      <section className="section border-t border-[color:var(--line)]">
        <div className="layout-band max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <span className="eyebrow">Fresh from the site</span>
              <h2 className="text-headline mt-2 text-[var(--text)]">
                Latest reviews
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[var(--color-muted)]">
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

          {featuredReviews.length > 0 && (
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {featuredReviews.map((article) => (
                <Link
                  key={article.slug}
                  href={localized(homeFeaturedReviewPath(article.slug))}
                  className="card card-interactive block p-5"
                >
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--color-subtle)]">
                    <span>{article.readingMinutes} min read</span>
                    <span>·</span>
                    <time dateTime={article.updatedAt}>{article.updatedAt}</time>
                  </div>
                  <h3 className="mt-3 text-base font-semibold leading-snug text-[var(--text)]">
                    {article.title}
                  </h3>
                </Link>
              ))}
            </div>
          )}

          {recentUpdates.length > 0 && (
            <div className="mt-10">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <h3 className="text-sm font-semibold text-[var(--text)]">
                  Recently updated
                </h3>
                <Link
                  href={localized("/updates/")}
                  className="text-sm font-medium text-[var(--color-accent)] hover:text-[var(--color-accent-hover)]"
                >
                  {"All updates →"}
                </Link>
              </div>
              <ul className="mt-3 divide-y divide-[color:var(--line)] border-t border-[color:var(--line)]">
                {recentUpdates.map((row) => (
                  <li key={row.path}>
                    <Link
                      href={localized(row.path)}
                      className="flex flex-wrap items-baseline justify-between gap-2 py-3 transition-colors hover:text-[var(--color-accent)]"
                    >
                      <span className="text-sm text-[var(--text)]">
                        {row.title}
                      </span>
                      <span className="flex shrink-0 items-center gap-3 text-xs text-[var(--color-subtle)]">
                        <span>{UPDATE_KIND_LABEL[row.kind] ?? row.kind}</span>
                        <time dateTime={row.lastReviewedAt}>
                          {row.lastReviewedAt}
                        </time>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      <div className="layout-band max-w-6xl section-tight">
        <AdSlot id={`${locale}-home-mid`} />
      </div>

      {/* FAQ */}
      <section className="section border-t border-[color:var(--line)]">
        <div className="layout-band max-w-3xl">
          <span className="eyebrow">FAQ</span>
          <h2 className="text-headline mt-2 text-[var(--text)]">
            Badminton equipment questions, answered
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[var(--color-muted)]">
            Short practical answers with clear limits. For deeper context, jump into the finder or read a full deep-dive.
          </p>
          <div className="mt-8 divide-y divide-[color:var(--line)]">
            {HOME_FAQ.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="cursor-pointer list-none text-base font-medium text-[var(--text)]">
                  <span className="inline-flex w-full items-center justify-between gap-4">
                    {f.q}
                    <span className="text-[var(--color-subtle)] transition-transform group-open:rotate-45">
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

      {/* Closing CTA */}
      <section className="section border-t border-[color:var(--line)]">
        <div className="layout-band max-w-3xl text-center">
          <h2 className="text-headline text-[var(--text)]">
            Find the badminton gear that fits your game
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)]">
            Answer a few questions. We rank gear with a transparent score — no email, no account, no signup wall.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href={localized("/quiz/")} className="btn-primary">
              {copy.home.start}
            </Link>
            <Link href={localized("/catalog/")} className="btn-secondary">
              Browse full catalog
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
