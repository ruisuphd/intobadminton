import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";
import { ArticleToc, type TocItem } from "@/components/ArticleToc";
import { HelpfulReaction } from "@/components/HelpfulReaction";
import { JsonLd } from "@/components/JsonLd";
import { ReadingProgress } from "@/components/ReadingProgress";
import { SocialShare } from "@/components/SocialShare";
import {
  CATEGORY_LABELS,
  blogArticles,
  getBlogArticle,
  readingTimeMinutes,
  relatedArticles,
  type BlogFactCheck,
  type BlogReviewSummary,
  type BlogStoryBlock,
} from "@/lib/blog";
import { buildLocalizedPath, type SiteLocale } from "@/lib/locale";
import { companyInfo, organizationJsonLd } from "@/lib/company";

function ReviewSummaryPanel({ summary }: { summary: BlogReviewSummary }) {
  return (
    <div className="mt-8 rounded-2xl border border-[color:var(--line-strong)] bg-white/80 p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-subtle)]">
        Bottom line
      </p>
      <p className="mt-2 text-lg font-semibold leading-snug text-[var(--text)]">
        {summary.verdict}
      </p>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-subtle)]">
            Best for
          </p>
          <ul className="mt-2 list-disc space-y-2 pl-4 text-sm leading-relaxed text-[var(--text-secondary)]">
            {summary.bestFor.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-subtle)]">
            Avoid if
          </p>
          <ul className="mt-2 list-disc space-y-2 pl-4 text-sm leading-relaxed text-[var(--text-secondary)]">
            {summary.avoidIf.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {summary.setupNotes && summary.setupNotes.length > 0 && (
        <div className="mt-5 rounded-xl bg-[color:var(--surface-muted)] p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-subtle)]">
            Setup notes
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-4 text-sm leading-relaxed text-[var(--color-muted)]">
            {summary.setupNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>
      )}

      <p className="mt-5 border-t border-[color:var(--line)] pt-4 text-sm leading-relaxed text-[var(--color-muted)]">
        <span className="font-medium text-[var(--text)]">
          Why this source mattered:
        </span>{" "}
        {summary.sourceHook}
      </p>
    </div>
  );
}

function StoryBlock({ block }: { block: BlogStoryBlock }) {
  if (block.kind === "facts") {
    return (
      <section className="rounded-2xl border border-[color:var(--line)] bg-white p-5">
        <h2 className="text-xl font-semibold tracking-tight text-[var(--text)]">
          {block.heading}
        </h2>
        <dl className="mt-4 grid gap-4 sm:grid-cols-3">
          {block.items.map((item) => (
            <div key={item.label}>
              <dt className="text-xs font-semibold uppercase tracking-wide text-[var(--color-subtle)]">
                {item.label}
              </dt>
              <dd className="mt-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    );
  }

  if (block.kind === "callout") {
    // "The hook" is the editorial pull point — give it a subtle accent so it
    // does not visually blend into adjacent informational callouts.
    const isHook = block.label.toLowerCase() === "the hook";
    const containerCls = isHook
      ? "rounded-2xl border border-[color:var(--color-accent)]/30 bg-[color:var(--color-accent)]/5 p-5 border-l-4 border-l-[color:var(--color-accent)]"
      : "rounded-2xl border border-[color:var(--line-strong)] bg-[color:var(--surface-muted)] p-5";
    const labelCls = isHook
      ? "text-xs font-semibold uppercase tracking-wide text-[var(--color-accent)]"
      : "text-xs font-semibold uppercase tracking-wide text-[var(--color-subtle)]";
    return (
      <aside className={containerCls}>
        <p className={labelCls}>
          {block.label}
        </p>
        <h2 className="mt-2 text-xl font-semibold tracking-tight text-[var(--text)] text-balance">
          {block.title}
        </h2>
        <p className="mt-3 text-base leading-[1.7] text-[var(--text-secondary)]">
          {block.body}
        </p>
      </aside>
    );
  }

  if (block.kind === "comparison") {
    return (
      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-[var(--text)]">
          {block.heading}
        </h2>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-[color:var(--line)]">
          <table className="min-w-full border-collapse bg-white text-left text-sm">
            <thead className="bg-[color:var(--surface-muted)] text-[var(--text)]">
              <tr>
                <th className="w-36 px-4 py-3 font-semibold">Decision point</th>
                {block.columns.map((column) => (
                  <th key={column} className="px-4 py-3 font-semibold">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[color:var(--line)] text-[var(--text-secondary)]">
              {block.rows.map((row) => (
                <tr key={row.label}>
                  <th className="px-4 py-3 align-top font-semibold text-[var(--text)]">
                    {row.label}
                  </th>
                  {row.values.map((value, index) => (
                    <td key={`${row.label}-${index}`} className="px-4 py-3 align-top">
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    );
  }

  if (block.kind === "firstPerson") {
    // Visually distinct accent-bordered card. The presence of these blocks is
    // the on-page signal Google's 2026 Product Reviews update rewards: lived
    // experience anchored to specific judgments.
    const setupLine = block.setup
      ? [
          block.setup.sessions != null
            ? `${block.setup.sessions} session${block.setup.sessions === 1 ? "" : "s"}`
            : null,
          block.setup.strings ?? null,
          block.setup.tensionLbs != null ? `${block.setup.tensionLbs} lb` : null,
          block.setup.opponentLevel
            ? `vs ${block.setup.opponentLevel}`
            : null,
        ]
          .filter(Boolean)
          .join(" · ")
      : null;
    return (
      <aside
        className="rounded-2xl border-l-4 border-[var(--color-accent)] bg-[var(--color-accent-soft)] p-5"
        data-block="first-person"
      >
        <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-accent)]">
          On court · {block.context}
        </p>
        <p className="mt-2 text-base leading-[1.7] text-[var(--text-secondary)]">
          {block.body}
        </p>
        {setupLine && (
          <p className="mt-3 text-xs text-[var(--color-muted)]">
            <span className="font-medium text-[var(--text)]">Setup:</span>{" "}
            {setupLine}
          </p>
        )}
      </aside>
    );
  }

  return (
    <section className="rounded-2xl border border-[color:var(--line-strong)] bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-semibold tracking-tight text-[var(--text)]">
        {block.heading}
      </h2>
      <p className="mt-3 text-base leading-[1.7] text-[var(--text-secondary)]">
        {block.body}
      </p>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[var(--text-secondary)]">
        {block.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    </section>
  );
}

function FactCheckNotes({ notes }: { notes: BlogFactCheck[] }) {
  if (notes.length === 0) return null;

  return (
    <section className="mt-10 rounded-2xl border border-[color:var(--line)] bg-white p-5">
      <h2 className="text-xl font-semibold tracking-tight text-[var(--text)]">
        Fact-check notes
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
        Manufacturer facts are separated from source-review impressions. When a
        claim could not be verified from an official public source, the article
        treats it as an impression rather than a specification.
      </p>
      <ul className="mt-5 space-y-4">
        {notes.map((note) => (
          <li
            key={`${note.sourceName}-${note.title}-${note.section}`}
            className="border-t border-[color:var(--line)] pt-4 first:border-t-0 first:pt-0"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-subtle)]">
              {note.sourceName} · {note.section} · checked {note.checkedAt}
            </p>
            <a
              href={note.href}
              target="_blank"
              rel="noreferrer noopener nofollow"
              className="mt-1 inline-block text-sm font-semibold text-[var(--color-accent)] hover:underline"
            >
              {note.title}
            </a>
            {note.quote && (
              <p className="mt-2 text-sm italic leading-relaxed text-[var(--text-secondary)]">
                &ldquo;{note.quote}&rdquo;
              </p>
            )}
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
              {note.note}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function BlogArticlePage({
  locale,
  slug,
}: {
  locale: SiteLocale;
  slug: string;
}) {
  const article = getBlogArticle(locale, slug);

  if (!article) {
    return (
      <main className="flex-1 py-16">
        <div className="layout-band max-w-3xl">
          <h1 className="text-3xl font-semibold text-[var(--text)]">
            Article not found
          </h1>
          <Link
            href={buildLocalizedPath(locale, "/blog/")}
            className="mt-4 inline-block text-[var(--color-accent)] underline"
          >
            Back to blog
          </Link>
        </div>
      </main>
    );
  }

  const canonicalUrl = `${companyInfo.siteUrl}/blog/${article.slug}/`;
  const byline = companyInfo.authorByline;
  const minutes = readingTimeMinutes(article);
  // Table-of-contents items derived from the article's <h2> headings. The
  // anchor IDs must match the id="…" we render below, so they share a single
  // slugifier inline. Skip the ToC entirely if there are 2 or fewer sections
  // — a 2-item ToC is just noise.
  const tocItems: TocItem[] = article.sections.map((section) => ({
    id: section.heading.toLowerCase().replace(/\s+/g, "-"),
    label: section.heading,
  }));
  const showToc = tocItems.length >= 3;
  const storyWords = article.story
    ? article.story.intro.split(/\s+/).filter((word) => word.length > 0).length
    : 0;
  const sectionWords = article.sections.reduce(
    (sum, section) =>
      sum + section.body.split(/\s+/).filter((word) => word.length > 0).length,
    0
  );
  const articleWordCount = storyWords + sectionWords;
  const canShowArticleAd = articleWordCount >= 600;
  const related = relatedArticles(blogArticles[locale], article, 3);

  const blogPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${canonicalUrl}#article`,
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
    headline: article.title,
    description: article.dek,
    inLanguage: "en",
    datePublished: article.updatedAt,
    dateModified: article.updatedAt,
    timeRequired: `PT${minutes}M`,
    author: {
      "@type": "Person",
      name: companyInfo.founderName,
      url: companyInfo.founderWebsite,
      description: companyInfo.founderDescription,
    },
    publisher: organizationJsonLd,
    articleSection: CATEGORY_LABELS[article.category],
  };

  // Emit a Review entity ONLY when the article is explicitly a review and
  // has a reviewSummary verdict. The itemReviewed is the article topic
  // (Thing), not a Product, because the review may cover multiple
  // products (head-to-heads) and we do not want to overclaim.
  const reviewJsonLd =
    article.category === "reviews" && article.reviewSummary
      ? {
          "@context": "https://schema.org",
          "@type": "Review",
          "@id": `${canonicalUrl}#review`,
          name: `${article.title} — IntoBadminton review`,
          itemReviewed: {
            "@type": "Thing",
            name: article.title.replace(/[—:]\s.+$/, "").trim(),
            description: article.dek,
          },
          author: {
            "@type": "Person",
            name: companyInfo.founderName,
            url: companyInfo.founderWebsite,
          },
          publisher: organizationJsonLd,
          datePublished: article.updatedAt,
          dateModified: article.updatedAt,
          reviewBody: article.reviewSummary.verdict,
          inLanguage: "en",
        }
      : null;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: companyInfo.siteName,
        item: `${companyInfo.siteUrl}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${companyInfo.siteUrl}/blog/`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <main className="flex-1">
      <ReadingProgress />
      <JsonLd data={blogPostingJsonLd} />
      {reviewJsonLd && <JsonLd data={reviewJsonLd} />}
      <JsonLd data={breadcrumbJsonLd} />

      {/* Hero band — slightly tinted */}
      <section className="border-b border-[color:var(--line)] bg-[color:var(--surface-muted)] py-12 lg:py-16">
        <div className="layout-band max-w-3xl">
          <Link
            href={buildLocalizedPath(locale, "/blog/")}
            className="text-sm text-[var(--color-accent)] hover:underline"
          >
            ← Blog
          </Link>
          <div className="mt-4 flex items-center gap-2">
            <span className="chip">{CATEGORY_LABELS[article.category]}</span>
            <span className="text-xs text-[var(--color-subtle)]">
              {minutes} min read
            </span>
            <span className="text-xs text-[var(--color-subtle)]">·</span>
            <time
              className="text-xs text-[var(--color-subtle)]"
              dateTime={article.updatedAt}
            >
              Updated {article.updatedAt}
            </time>
          </div>
          <h1 className="text-headline mt-5 text-[var(--text)]">
            {article.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-[var(--color-muted)] text-balance">
            {article.dek}
          </p>
          <p className="mt-6 text-sm font-medium text-[var(--text)]">
            {byline}
          </p>
          {article.reviewSummary && (
            <ReviewSummaryPanel summary={article.reviewSummary} />
          )}
        </div>
      </section>

      {/* Body */}
      <div className="layout-band max-w-6xl py-12 lg:py-16">
        <div className={showToc ? "lg:grid lg:grid-cols-[1fr_220px] lg:gap-12" : ""}>
          <article className="max-w-3xl">
            <p className="mb-6 border-l-2 border-[color:var(--line-strong)] pl-4 text-xs leading-relaxed text-[var(--color-muted)]">
              Findings drawn from product-page specs, community sources
              (BadmintonCN, Reddit r/badminton, BadmintonCentral, video
              reviewers), and on-court testing. See our{" "}
              <Link
                href="/sources/"
                className="text-[var(--color-accent)] hover:underline"
              >
                editorial process
              </Link>{" "}
              for the full citation model.
            </p>

            {/*
             * Inline affiliate disclosure. Surfaced on every blog article
             * whose outbound links may include affiliate URLs (reviews,
             * comparisons). Guides are excluded by default — they rarely
             * contain product links — but the footer disclosure still
             * applies site-wide.
             */}
            {article.category !== "guides" && (
              <div className="mb-8">
                <AffiliateDisclosure variant="inline" />
              </div>
            )}

            <div className="space-y-8">
              {article.story && (
                <section className="space-y-8">
                  <p className="text-lg leading-[1.75] text-[var(--text-secondary)]">
                    {article.story.intro}
                  </p>
                  {article.story.blocks.map((block, index) => (
                    <StoryBlock key={`${block.kind}-${index}`} block={block} />
                  ))}
                </section>
              )}

              {article.sections.map((section, index) => {
                const anchorId = section.heading
                  .toLowerCase()
                  .replace(/[^a-z0-9\s-]/g, "")
                  .replace(/\s+/g, "-");
                return (
                  <section
                    key={section.heading}
                    className="space-y-3 scroll-mt-24"
                    id={anchorId}
                  >
                    <h2 className="group text-2xl font-semibold tracking-tight text-[var(--text)] text-balance">
                      <a
                        href={`#${anchorId}`}
                        className="relative inline-block focus-visible:outline-none"
                        aria-label={`Permalink to: ${section.heading}`}
                      >
                        {section.heading}
                        <span
                          aria-hidden="true"
                          className="ml-2 text-[color:var(--color-subtle)] opacity-0 transition-opacity group-hover:opacity-100"
                        >
                          #
                        </span>
                      </a>
                    </h2>
                    <p className="text-base leading-[1.75] text-[var(--text-secondary)]">
                      {section.body}
                    </p>
                    {canShowArticleAd &&
                      index === Math.floor(article.sections.length / 2) && (
                        <AdSlot id={`blog-${article.slug}-mid`} />
                      )}
                  </section>
                );
              })}
            </div>

            <div className="mt-12 card p-7">
              <p className="text-lg font-semibold text-[var(--text)]">
                {article.cta}
              </p>
              <Link
                href={buildLocalizedPath(locale, "/quiz/")}
                className="btn-primary mt-5"
              >
                Start the finder
              </Link>
            </div>

            <FactCheckNotes notes={article.factChecks ?? []} />

            <SocialShare url={canonicalUrl} title={article.title} />

            <HelpfulReaction contentId={`blog:${article.slug}`} />
          </article>

          {showToc && (
            <aside className="hidden lg:block">
              <ArticleToc items={tocItems} />
            </aside>
          )}
        </div>
      </div>

      {/* Mobile-only ToC sits above the body for narrow viewports. The
          ArticleToc component itself decides which surface to render on. */}
      {showToc && (
        <div className="layout-band max-w-3xl lg:hidden -mt-8">
          <ArticleToc items={tocItems} />
        </div>
      )}

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-[color:var(--line)] py-12 lg:py-16">
          <div className="layout-band max-w-6xl">
            <h2 className="text-headline text-[var(--text)]">
              More {CATEGORY_LABELS[article.category].toLowerCase()}
            </h2>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={buildLocalizedPath(locale, `/blog/${r.slug}/`)}
                  className="card card-interactive p-6 block"
                >
                  <span className="chip">{CATEGORY_LABELS[r.category]}</span>
                  <h3 className="mt-3 text-lg font-semibold text-[var(--text)]">
                    {r.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                    {r.dek}
                  </p>
                  <p className="mt-3 text-xs text-[var(--color-subtle)]">
                    {readingTimeMinutes(r)} min · {r.updatedAt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
