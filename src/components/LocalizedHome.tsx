import Link from "next/link";
import Image from "next/image";
import { AdSlot } from "@/components/AdSlot";
import {
  articlesByDateDesc,
  blogArticles,
  CATEGORY_LABELS,
  readingTimeMinutes,
} from "@/lib/blog";
import { buildLocalizedPath, type SiteLocale } from "@/lib/locale";
import { t } from "@/lib/i18n";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function LocalizedHome({ locale }: { locale: SiteLocale }) {
  const copy = t(locale);
  const localized = (path: string) => buildLocalizedPath(locale, path);
  // Take the 3 newest articles by updatedAt for the home "Latest reviews" strip.
  const latest = articlesByDateDesc(blogArticles[locale]).slice(0, 3);

  return (
    <main className="flex-1">
      <section className="pt-20 pb-16 lg:pt-24 lg:pb-20">
        <div className="layout-band max-w-6xl">
          <div className="max-w-3xl">
            <span className="chip">
              {"Badminton equipment finder"}
            </span>
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
                {"Read reviews"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[color:var(--line)] py-20 lg:py-24">
        <div className="layout-band max-w-6xl">
          <div className="max-w-3xl">
            <h2 className="text-headline text-[var(--text)]">
              {"Built by a competitive player. Explainable. Verifiable."}
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

      <section className="border-t border-[color:var(--line)] py-20 lg:py-24">
        <div className="layout-band max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <h2 className="text-headline text-[var(--text)]">
                {"Covers the full gear stack"}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)]">
                {"Rackets, strings, shoes, bags, shuttles, grips — each matched to how you actually play."}
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
              "Rackets · 25 models",
              "Shuttles · 7 models",
              "Grips · 6 models",
              "Strings · 3 models",
              "Shoes · 4 models",
              "Bags · 2 models",
            ].map((item) => (
              <div
                key={item}
                className="card p-5 text-sm font-medium text-[var(--text)]"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {latest.length > 0 && (
        <section className="border-t border-[color:var(--line)] py-20 lg:py-24">
          <div className="layout-band max-w-6xl">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-2xl">
                <h2 className="text-headline text-[var(--text)]">
                  {"Latest reviews"}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)]">
                  {"Original, verifiable, with player-fit context."}
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
              {latest.map((article) => (
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

      <section className="border-t border-[color:var(--line)] py-20 lg:py-24">
        <div className="layout-band max-w-3xl text-center">
          <h2 className="text-headline text-[var(--text)]">
            {"Find the racket that fits your game"}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-[var(--color-muted)]">
            {"Answer a few questions. We rank gear with a transparent score."}
          </p>
          <Link href={localized("/quiz/")} className="btn-primary mt-10">
            {copy.home.start}
          </Link>
        </div>
      </section>

      {/* Hidden image preserved for OG/social sharing usage if needed */}
      <Image
        src={`${basePath}/badminton-court.svg`}
        alt=""
        width={1}
        height={1}
        className="hidden"
      />
    </main>
  );
}
