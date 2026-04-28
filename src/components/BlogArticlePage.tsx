import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { getBlogArticle } from "@/lib/blog";
import { buildLocalizedPath, type SiteLocale } from "@/lib/locale";

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
            {locale === "zh" ? "文章未找到" : "Article not found"}
          </h1>
          <Link
            href={buildLocalizedPath(locale, "/blog/")}
            className="mt-4 inline-block text-[var(--color-accent)] underline"
          >
            {locale === "zh" ? "返回博客" : "Back to blog"}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 py-16">
      <article className="layout-band max-w-3xl space-y-6">
        <Link
          href={buildLocalizedPath(locale, "/blog/")}
          className="text-sm text-[var(--color-accent)] hover:underline"
        >
          ← {locale === "zh" ? "博客" : "Blog"}
        </Link>
        <p className="text-sm text-[var(--color-muted)]">
          {locale === "zh" ? "更新" : "Updated"} {article.updatedAt}
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--text)]">
          {article.title}
        </h1>
        <p className="text-lg text-[var(--color-muted)]">{article.dek}</p>
        {article.sections.map((section, index) => (
          <section key={section.heading} className="space-y-3">
            <h2 className="text-xl font-semibold text-[var(--text)]">
              {section.heading}
            </h2>
            <p className="leading-relaxed text-[var(--color-muted)]">
              {section.body}
            </p>
            {index === 1 && <AdSlot id={`${locale}-blog-${article.slug}-mid`} />}
          </section>
        ))}
        <div className="rounded-2xl border border-zinc-200 bg-[var(--surface)] p-5 dark:border-zinc-700">
          <p className="font-medium text-[var(--text)]">{article.cta}</p>
          <Link
            href={buildLocalizedPath(locale, "/quiz/")}
            className="mt-3 inline-block text-sm text-[var(--color-accent)] underline"
          >
            {locale === "zh" ? "开始推荐" : "Start the finder"}
          </Link>
        </div>
      </article>
    </main>
  );
}

