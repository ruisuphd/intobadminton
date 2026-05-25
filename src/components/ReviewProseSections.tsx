import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { sectionAnchorId, type BlogArticle } from "@/lib/blog";
import { buildLocalizedPath, type SiteLocale } from "@/lib/locale";

function bodyOverlapRatio(a: string, b: string): number {
  const norm = (text: string) => text.trim().toLowerCase();
  const left = norm(a);
  const right = norm(b);
  if (!left || !right) return 0;
  if (left === right) return 1;
  const shorter = left.length <= right.length ? left : right;
  const longer = left.length > right.length ? left : right;
  return longer.includes(shorter) ? shorter.length / longer.length : 0;
}

function ComparisonTable({
  article,
}: {
  article: BlogArticle;
}) {
  if (!article.comparison || article.comparison.rows.length === 0) return null;

  return (
    <div className="mb-8 overflow-x-auto rounded-2xl border border-[color:var(--line)]">
      {article.comparison.caption && (
        <p className="border-b border-[color:var(--line)] bg-[color:var(--surface-muted)] px-4 py-3 text-sm font-medium text-[var(--text)]">
          {article.comparison.caption}
        </p>
      )}
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b border-[color:var(--line)] bg-[color:var(--surface-muted)]">
            {article.comparison.columns.map((col) => (
              <th
                key={col}
                scope="col"
                className="px-4 py-3 text-left font-semibold text-[var(--text)]"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {article.comparison.rows.map((row, rowIndex) => (
            <tr
              key={`${row.label}-${rowIndex}`}
              className="border-b border-[color:var(--line)] last:border-0"
            >
              <th
                scope="row"
                className="px-4 py-3 font-medium text-[var(--text)]"
              >
                {row.label}
              </th>
              {row.values.map((value, colIndex) => (
                <td
                  key={`${rowIndex}-${colIndex}`}
                  className="px-4 py-3 text-[var(--color-muted)]"
                >
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ReviewProseSections({
  articles,
  locale = "en",
  adSlotId,
}: {
  articles: BlogArticle[];
  locale?: SiteLocale;
  adSlotId?: string;
}) {
  if (articles.length === 0) return null;

  const seenBodies = new Set<string>();
  const anchorSeen = new Map<string, number>();
  let globalSectionIndex = 0;
  const renderedArticles = articles.map((article, articleIndex) => {
    const sections = article.sections.flatMap((section) => {
      const bodyKey = section.body.trim().toLowerCase();
      const isDuplicate = Array.from(seenBodies).some(
        (seen) => bodyOverlapRatio(seen, bodyKey) >= 0.8
      );
      if (isDuplicate) return [];
      seenBodies.add(bodyKey);

      const currentIndex = globalSectionIndex++;
      const anchorId = sectionAnchorId(
        section.heading,
        currentIndex,
        anchorSeen
      );

      return [{ section, currentIndex, anchorId }];
    });

    return { article, articleIndex, sections };
  });

  const renderedSectionCount = globalSectionIndex;

  const totalWords = articles.reduce(
    (sum, article) =>
      sum +
      article.sections.reduce(
        (inner, section) =>
          inner +
          section.body.split(/\s+/).filter((word) => word.length > 0).length,
        0
      ),
    0
  );
  const canShowAd = totalWords >= 600;
  const adIndex = Math.max(0, renderedSectionCount - 1);

  return (
    <section className="space-y-10">
      {renderedArticles.map(({ article, articleIndex, sections }) => (
        <div key={article.slug} className="space-y-8">
          {articles.length > 1 && (
            <h2 className="text-xl font-semibold text-[var(--text)]">
              {article.title}
            </h2>
          )}
          {articleIndex === 0 && <ComparisonTable article={article} />}
          {sections.map(({ section, currentIndex, anchorId }) => {
            return (
              <section
                key={`${article.slug}-${section.heading}-${currentIndex}`}
                id={anchorId}
                className="scroll-mt-24 space-y-3"
              >
                <h3 className="text-2xl font-semibold tracking-tight text-[var(--text)] text-balance">
                  {section.heading}
                </h3>
                <p className="whitespace-pre-line text-base leading-[1.75] text-[var(--text-secondary)]">
                  {section.body}
                </p>
                {section.glossaryLinks && section.glossaryLinks.length > 0 && (
                  <p className="mt-4 flex flex-wrap items-center gap-2 text-xs text-[var(--color-subtle)]">
                    <span className="font-semibold uppercase tracking-wide">
                      See in glossary:
                    </span>
                    {section.glossaryLinks.map((g, i) => (
                      <Link
                        key={`${g.id}-${i}`}
                        href={buildLocalizedPath(
                          locale,
                          `/guides/glossary/#${g.id}`
                        )}
                        className="rounded-full border border-[color:var(--line)] px-2.5 py-0.5 text-[color:var(--color-accent)] hover:bg-[var(--color-accent-soft)]"
                      >
                        {g.term}
                      </Link>
                    ))}
                  </p>
                )}
                {canShowAd &&
                  adSlotId &&
                  currentIndex === Math.floor(adIndex / 2) && (
                    <AdSlot id={adSlotId} />
                  )}
              </section>
            );
          })}
          {articleIndex > 0 && <ComparisonTable article={article} />}
        </div>
      ))}
    </section>
  );
}
