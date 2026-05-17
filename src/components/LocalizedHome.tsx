import Link from "next/link";
import Image from "next/image";
import { AdSlot } from "@/components/AdSlot";
import { JsonLd } from "@/components/JsonLd";
import products from "@/data/products.json";
import {
  articlesByDateDesc,
  blogArticles,
  CATEGORY_LABELS,
  readingTimeMinutes,
} from "@/lib/blog";
import { buildLocalizedPath, type SiteLocale } from "@/lib/locale";
import { t } from "@/lib/i18n";
import { companyInfo, organizationJsonLd } from "@/lib/company";
import type { ProductRecord } from "@/lib/types/product";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const PRODUCT_CATALOGUE = products as ProductRecord[];
const categoryCount = (category: ProductRecord["category"]) =>
  PRODUCT_CATALOGUE.filter((product) => product.category === category).length;

const HOME_FAQ_FULL: { q: string; a: string }[] = [
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

// Show only the first 3 on the homepage; the full FAQ lives at /faq/.
const HOME_FAQ = HOME_FAQ_FULL.slice(0, 3);

export function LocalizedHome({ locale }: { locale: SiteLocale }) {
  const copy = t(locale);
  const localized = (path: string) => buildLocalizedPath(locale, path);
  // Take the 3 newest articles by updatedAt for the home "Featured" strip.
  const featured = articlesByDateDesc(blogArticles[locale]).slice(0, 3);
  const articleCount = blogArticles[locale].length;

  // Full 5-question FAQ schema remains, so search engines see the full set
  // even though only 3 are visible above-the-fold on the homepage.
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${companyInfo.siteUrl}/#faq`,
    mainEntity: HOME_FAQ_FULL.map((f) => ({
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

  // Six anchor entries — the highest-intent landing pages, surfaced as the
  // canonical "where do I go" map for visitors who skip the Finder.
  const popularAnchors: {
    label: string;
    href: string;
    tag: string;
    blurb: string;
  }[] = [
    {
      label: "Best beginner rackets",
      href: "/best/beginner-rackets/",
      tag: "Beginner",
      blurb: "Friendly weight and forgiving flex for new players.",
    },
    {
      label: "Best smash-heavy rackets",
      href: "/best/smash-heavy-rackets/",
      tag: "Singles",
      blurb: "Head-heavy attack frames for rear-court finishers.",
    },
    {
      label: "Best doubles rackets",
      href: "/best/doubles-rackets/",
      tag: "Doubles",
      blurb: "Fast-handling speed and balance frames for level pairs.",
    },
    {
      label: "Best badminton shoes",
      href: "/best/shoes/",
      tag: "Shoes",
      blurb: "Court grip and lateral stability scored by foot width.",
    },
    {
      label: "Best badminton strings",
      href: "/best/strings/",
      tag: "Strings",
      blurb: "Gauge, repulsion, durability matched to your tension.",
    },
    {
      label: "Brand decoded — Yonex · Victor · Li-Ning",
      href: "/brands/",
      tag: "Brands",
      blurb: "Family-by-family buying maps for the three flagship brands.",
    },
  ];

  // Inline category strip — replaces the older 6-card grid. Counts come from
  // the live product catalogue so the numbers stay honest.
  const categoryStrip: { label: string; count: number; href: string }[] = [
    { label: "Rackets", count: categoryCount("racket"), href: "/best/" },
    { label: "Shoes", count: categoryCount("shoes"), href: "/best/shoes/" },
    { label: "Strings", count: categoryCount("string"), href: "/best/strings/" },
    { label: "Bags", count: categoryCount("bag"), href: "/best/" },
    { label: "Shuttles", count: categoryCount("shuttle"), href: "/best/" },
    { label: "Grips", count: categoryCount("grip"), href: "/best/" },
  ];

  return (
    <main className="flex-1">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={collectionJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      {/*
        HERO — image-led, with a Finder CTA card pinned to the right.
        Mobile: text stacks above the Finder card; the card holds the court
        illustration so visitors get a visual anchor without scrolling.
      */}
      <section className="hero-decoration relative overflow-hidden pt-16 pb-12 lg:pt-20 lg:pb-16">
        <div className="layout-band relative max-w-6xl">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
            {/* Left: headline + dek + trust line + 3 mini stats */}
            <div>
              <span className="chip">Badminton equipment finder · 2026 catalogue</span>
              <h1 className="text-display mt-5 text-[var(--text)]">
                {copy.home.title}
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-[var(--color-muted)]">
                {copy.home.subtitle}
              </p>
              <p className="mt-5 text-xs text-[var(--color-subtle)]">
                {"No signup · No email gate · Profiles stay on device · Source authority shown"}
              </p>

              <dl className="mt-8 grid max-w-md grid-cols-3 gap-3">
                {[
                  {
                    num: `${PRODUCT_CATALOGUE.length}`,
                    label: "catalogue rows",
                  },
                  { num: "5", label: "transparent fit factors" },
                  {
                    num: String(articleCount),
                    label: "deep-dive articles",
                  },
                ].map((s) => (
                  <div key={s.label}>
                    <dt className="text-2xl font-semibold tracking-tight text-[var(--color-accent)]">
                      {s.num}
                    </dt>
                    <dd className="mt-1 text-xs leading-snug text-[var(--color-muted)]">
                      {s.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Right: Finder CTA card with court illustration as the visual */}
            <div className="relative">
              <div className="card relative overflow-hidden p-6 lg:p-7">
                <div className="relative aspect-[5/3] overflow-hidden rounded-[calc(var(--radius-card)-0.25rem)] bg-[var(--surface-muted)]">
                  <Image
                    src={`${basePath}/badminton-court.svg`}
                    alt=""
                    width={1200}
                    height={720}
                    priority
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="mt-6">
                  <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-accent)]">
                    {"Five questions · No signup"}
                  </p>
                  <h2 className="mt-2 text-xl font-semibold leading-snug text-[var(--text)]">
                    Find a racket, shoe, or string that fits how you actually play
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
                    Level, discipline, swing style, body, and budget. Ranked picks with reasons in under two minutes.
                  </p>
                  <Link
                    href={localized("/quiz/")}
                    className="btn-primary mt-5 w-full"
                  >
                    {copy.home.start}
                  </Link>
                  <div className="mt-3 flex items-center justify-between text-xs text-[var(--color-subtle)]">
                    <span>{`${articleCount} deep-dive articles`}</span>
                    <Link
                      href={localized("/blog/")}
                      className="font-medium text-[var(--color-accent)] hover:text-[var(--color-accent-hover)]"
                    >
                      {"Browse the blog →"}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*
        FEATURED DEEP-DIVES — promoted above the popular-anchors strip so
        return visitors see fresh editorial content first.
      */}
      {featured.length > 0 && (
        <section className="bg-[var(--surface-muted)] py-16 lg:py-20">
          <div className="layout-band max-w-6xl">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-2xl">
                <h2 className="text-headline text-[var(--text)]">
                  Latest deep-dives
                </h2>
                <p className="mt-3 text-base leading-relaxed text-[var(--color-muted)]">
                  Original badminton equipment writing with source labels, editor notes, and explicit confidence limits.
                </p>
              </div>
              <Link
                href={localized("/blog/")}
                className="text-sm font-medium text-[var(--color-accent)] hover:text-[var(--color-accent-hover)]"
              >
                {"View all →"}
              </Link>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {featured.map((article) => (
                <Link
                  key={article.slug}
                  href={localized(`/blog/${article.slug}/`)}
                  className="card card-interactive block p-6"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="chip">
                      {CATEGORY_LABELS[article.category]}
                    </span>
                    <span className="text-xs text-[var(--color-subtle)]">
                      {readingTimeMinutes(article)} min read
                    </span>
                    <span className="text-xs text-[var(--color-subtle)]">
                      ·
                    </span>
                    <time
                      className="text-xs text-[var(--color-subtle)]"
                      dateTime={article.updatedAt}
                    >
                      {article.updatedAt}
                    </time>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold leading-snug text-[var(--text)]">
                    {article.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
                    {article.dek}
                  </p>
                  <p className="mt-5 text-sm font-medium text-[var(--color-accent)]">
                    {"Read the deep-dive →"}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/*
        POPULAR ANCHORS — 6 high-intent landing pages, replacing the older
        13-tile dense grid. Each card is now wider and includes a one-line
        blurb so first-time visitors can self-route without overwhelm.
      */}
      <section className="py-16 lg:py-20">
        <div className="layout-band max-w-6xl">
          <div className="max-w-2xl">
            <h2 className="text-headline text-[var(--text)]">
              Where most players start
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[var(--color-muted)]">
              Six anchor pages, hand-picked by player intent. Each is a curated landing with our scoring applied.
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {popularAnchors.map((p) => (
              <Link
                key={p.href}
                href={localized(p.href)}
                className="card card-interactive flex h-full flex-col p-6"
              >
                <span className="chip chip-secondary self-start">{p.tag}</span>
                <p className="mt-3 text-base font-semibold text-[var(--text)]">
                  {p.label}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                  {p.blurb}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/*
        CATEGORY STRIP — compact inline strip with live catalogue counts.
        Replaces the older 6-card "Categories covered" grid; same information,
        much lower visual weight.
      */}
      <section className="border-t border-[color:var(--line)] py-10 lg:py-12">
        <div className="layout-band max-w-6xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-base font-semibold tracking-tight text-[var(--text)]">
              The full badminton gear stack
            </h2>
            <Link
              href={localized("/brands/")}
              className="text-sm font-medium text-[var(--color-accent)] hover:text-[var(--color-accent-hover)]"
            >
              {"View brands →"}
            </Link>
          </div>
          <ul className="mt-5 flex flex-wrap gap-2">
            {categoryStrip.map((c) => (
              <li key={c.label}>
                <Link
                  href={localized(c.href)}
                  className="inline-flex items-center gap-2 rounded-full border border-[color:var(--line-strong)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--text)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                >
                  <span>{c.label}</span>
                  <span className="text-xs text-[var(--color-subtle)]">
                    {c.count}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/*
        WHY — the editorial trust section. Unchanged copy; lighter visual
        treatment to fit the calmer hybrid rhythm.
      */}
      <section className="bg-[var(--surface-muted)] py-16 lg:py-20">
        <div className="layout-band max-w-6xl">
          <div className="max-w-3xl">
            <h2 className="text-headline text-[var(--text)]">
              Explainable recommendations with source labels
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)]">
              {"Every recommendation breaks down into five named factors: style, discipline, level, budget, and body fit. Product-page sources, editor notes, and community references are labelled separately."}
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {copy.home.proof.map((x) => (
              <div key={x.title} className="card p-6">
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

      {/* Mid-article ad slot — kept between content sections, not between hero and content. */}
      <div className="layout-band max-w-6xl py-10">
        <AdSlot id={`${locale}-home-mid`} />
      </div>

      {/*
        FAQ — trimmed to the 3 most-asked questions on the homepage. Schema
        still includes all 5 via HOME_FAQ_FULL; the rest live at /faq/.
      */}
      <section className="py-16 lg:py-20">
        <div className="layout-band max-w-3xl">
          <h2 className="text-headline text-[var(--text)]">
            Badminton equipment questions, answered
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[var(--color-muted)]">
            Short practical answers with clear limits. More questions on our full FAQ page.
          </p>
          <div className="mt-8 divide-y divide-[color:var(--line)]">
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
          <div className="mt-6">
            <Link
              href={localized("/faq/")}
              className="text-sm font-medium text-[var(--color-accent)] hover:text-[var(--color-accent-hover)]"
            >
              {"Read the full FAQ →"}
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA — soft-background tile keeps the closing rhythm calm. */}
      <section className="bg-[var(--surface-muted)] py-16 lg:py-20">
        <div className="layout-band max-w-3xl text-center">
          <h2 className="text-headline text-[var(--text)]">
            Find the badminton gear that fits your game
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)]">
            Answer a few questions. We rank gear with a transparent score — no email, no account, no signup wall.
          </p>
          <Link href={localized("/quiz/")} className="btn-primary mt-8">
            {copy.home.start}
          </Link>
        </div>
      </section>
    </main>
  );
}
