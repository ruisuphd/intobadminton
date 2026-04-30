import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import {
  articlesByDateDesc,
  blogArticles,
  CATEGORY_LABELS,
  readingTimeMinutes,
} from "@/lib/blog";
import { buildLocalizedPath, type SiteLocale } from "@/lib/locale";
import { t } from "@/lib/i18n";
import { companyInfo, organizationJsonLd } from "@/lib/company";

const HOME_FAQ: { q: string; a: string }[] = [
  {
    q: "How do I choose the right badminton racket?",
    a: "Match three things: skill level, playing role, and timing. Beginners and most club players do better with medium-flex 4U or 5U rackets that have even or slightly head-light balance. Smash-heavy singles and rear-court doubles players benefit from head-heavy frames once their technique is stable. The IntoBadminton finder asks for level, discipline, style, body, and budget, then ranks rackets transparently — you see exactly why each one fits.",
  },
  {
    q: "Yonex, Victor, or Li-Ning — which brand is best?",
    a: "There is no single best badminton brand. Yonex has the deepest catalogue and the strongest North American distribution. Victor leads on speed-oriented frames like the Auraspeed line and dominates Korean tour play. Li-Ning AxForce, BladeX, and Halbertec models lead on smash-power per dollar. The right brand depends on which specific model fits your role, not loyalty.",
  },
  {
    q: "What badminton string should a club player use?",
    a: "Most club players are over-strung and under-restrung. Try Yonex BG65 or Li-Ning No.1 at 22–24 lb if you want durability and forgiveness. Move to BG80, BG80 Power, or Li-Ning No.5 for crisper feel. Aerobite-style hybrids reward players with cleaner contact. Restring every 30–50 sessions of regular play, even if the string has not snapped — tension drops long before a break.",
  },
  {
    q: "Are badminton shoes really different from running shoes?",
    a: "Yes — and the difference matters more than the racket for most amateurs. Badminton shoes use gum rubber outsoles for grip on wood courts, low-profile midsoles to keep your foot close to the floor, and lateral reinforcement for split steps and side lunges. Running shoes have raised heels and softer foams that promote forward roll, which is the opposite of what badminton footwork needs.",
  },
  {
    q: "How does the IntoBadminton finder score recommendations?",
    a: "Every result breaks down into five named factors: style fit, discipline fit, level fit, budget fit, and body / comfort fit. Manufacturer specs are the strongest signal, editor interpretation translates specs into on-court feel, and community evidence (BadmintonCN, Reddit, BadmintonCentral, video reviewers) appears as cited metadata summaries with links — never copied text. Confidence labels show what is verified and what still needs cross-checking. Read the methodology page for the full weighting.",
  },
  {
    q: "Is IntoBadminton free?",
    a: "Yes. The finder, comparisons, blog, and guides are free. The site runs Google AdSense ads after you opt in via the cookie banner. There are no paywalls, no subscription, and no required account. Recommendations are not sponsored — ads are clearly labelled and never change the fit-score order.",
  },
];

export function LocalizedHome({ locale }: { locale: SiteLocale }) {
  const copy = t(locale);
  const localized = (path: string) => buildLocalizedPath(locale, path);
  // Take the 3 newest articles by updatedAt for the home "Latest deep-dives" strip.
  const featured = articlesByDateDesc(blogArticles[locale]).slice(0, 3);

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
  };

  const popularSearches: { label: string; href: string; tag: string }[] = [
    { label: "Best beginner rackets", href: "/best/beginner-rackets/", tag: "Beginner" },
    { label: "Best doubles rackets", href: "/best/doubles-rackets/", tag: "Doubles" },
    { label: "Best smash rackets", href: "/best/smash-heavy-rackets/", tag: "Singles" },
    { label: "Best intermediate rackets", href: "/best/intermediate-rackets/", tag: "Intermediate" },
    { label: "Best badminton shoes", href: "/best/shoes/", tag: "Shoes" },
    { label: "Best badminton strings", href: "/best/strings/", tag: "Strings" },
    { label: "Yonex Astrox vs Nanoflare", href: "/compare-guides/yonex-astrox-vs-nanoflare/", tag: "Compare" },
    { label: "Yonex vs Victor vs Li-Ning", href: "/compare-guides/yonex-victor-li-ning/", tag: "Compare" },
  ];

  return (
    <main className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden pt-20 pb-16 lg:pt-24 lg:pb-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-32 h-[480px] w-[480px] rounded-full bg-[var(--color-accent-soft)] blur-3xl"
        />
        <div className="layout-band relative max-w-6xl">
          <div className="max-w-3xl">
            <span className="chip">Badminton equipment finder · 2026 catalog</span>
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
              <Link href={localized("/blog/")} className="btn-secondary">
                Read 24+ deep-dive reviews
              </Link>
            </div>
            <p className="mt-6 text-xs text-[var(--color-subtle)]">
              {"Free · No account · Profiles stay on device · Updated weekly"}
            </p>
          </div>

          <div className="mt-12 grid gap-3 sm:grid-cols-3">
            {[
              { num: "60+", label: "rackets, shoes, strings & bags scored" },
              { num: "5", label: "transparent fit factors per result" },
              { num: "24", label: "original deep-dive articles" },
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
              Built by a competitive player. Explainable. Verifiable.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[var(--color-muted)]">
              {"Every recommendation breaks down into five named factors: style, discipline, level, budget, body fit. All citations link out — never copied review text."}
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
                Rackets, strings, shoes, bags, shuttles, grips — each scored against how you actually play.
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
              { title: "Rackets · 25+ models", body: "Astrox, Nanoflare, AxForce, BladeX, Auraspeed, Halbertec — by role, level, and shaft hardness." },
              { title: "Shoes · 4 models", body: "Eclipsion, BladeSabre, P9200 III, Aerus — by foot width, stability, and cushioning." },
              { title: "Strings · 3 models", body: "BG65, BG80, L69 — by feel, repulsion, and durability tradeoffs." },
              { title: "Bags · 2 models", body: "By capacity, shoe compartment, and commute-vs-tournament workflow." },
              { title: "Shuttles · 7 models", body: "By speed grade, durability, and indoor temperature suitability." },
              { title: "Grips · 6 models", body: "Overgrip vs replacement, tackiness, sweat handling — coming soon." },
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

      {featured.length > 0 && (
        <section className="border-t border-[color:var(--line)] py-20 lg:py-24">
          <div className="layout-band max-w-6xl">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-2xl">
                <h2 className="text-headline text-[var(--text)]">
                  Latest deep-dives
                </h2>
                <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)]">
                  Original badminton equipment writing — manufacturer specs, on-court testing, cited community evidence.
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
                  className="card card-interactive p-6 block"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="chip">
                      {CATEGORY_LABELS[article.category]}
                    </span>
                    <span className="text-xs text-[var(--color-subtle)]">
                      {readingTimeMinutes(article)} min read
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
                  <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
                    {article.dek}
                  </p>
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
            Short, opinionated answers from a player who has actually swung the gear. For deeper context, jump into the finder or read a full deep-dive.
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
