import Link from "next/link";
import { buildLocalizedPath, type SiteLocale } from "@/lib/locale";
import { researchSummary } from "@/lib/market-research";

const copy = {
  en: {
    title: "Market research and recommendation roadmap",
    intro:
      "These are rights-safe research signals from community reviews, creator reviews, official specs, and resale listings. They guide scoring, but they do not copy review text or treat subjective comments as official facts.",
    signal: "Signal",
    strength: "Confidence",
    cta: "Run the finder with these signals",
    roadmapTitle: "Commercial UX improvements now supported",
    roadmap: [
      "Category-aware recommendations across rackets, strings, shoes, and bags.",
      "Depreciation estimates for total cost of ownership and second-hand resale planning.",
      "Review evidence separated from official specs so forum sentiment can explain fit without overstating certainty.",
      "Return loops through blog guides, recent shortlists, comparison, and gear refresh content.",
    ],
  },
  zh: {
    title: "市场调研与推荐路线图",
    intro:
      "这些是来自社区评价、创作者测评、官方规格和二手挂牌的合规摘要信号。它们会影响评分解释，但不会复制评价原文，也不会把主观评价当成官方事实。",
    signal: "信号",
    strength: "置信度",
    cta: "用这些信号运行推荐",
    roadmapTitle: "当前已支持的商业 UX 改进",
    roadmap: [
      "球拍、球线、球鞋和球包的分类推荐。",
      "显示折旧估算，帮助判断真实持有成本和二手出手风险。",
      "评价证据与官方规格分离，论坛情绪只用于解释适配，不夸大确定性。",
      "通过博客指南、近期清单、对比页和装备换新内容提升复访。",
    ],
  },
};

export function MarketResearchPage({ locale = "en" }: { locale?: SiteLocale }) {
  const text = copy[locale];
  return (
    <main className="flex-1 py-16">
      <div className="layout-band max-w-5xl">
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--text)]">
          {text.title}
        </h1>
        <p className="mt-3 max-w-3xl text-[var(--color-muted)]">
          {text.intro}
        </p>

        <div className="mt-8 grid gap-4">
          {researchSummary(locale).map((row) => (
            <article
              key={row.source + row.category}
              className="card p-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-semibold text-[var(--text)]">
                  {row.source} · {row.category}
                </p>
                <span className="rounded-full bg-[var(--color-accent-soft)] px-3 py-1 text-xs text-[var(--text)]">
                  {text.strength}: {row.strength}
                </span>
              </div>
              <p className="mt-2 text-sm text-[var(--color-muted)]">
                {row.summary}
              </p>
              <a
                href={row.href}
                className="mt-3 inline-block text-sm text-[var(--color-accent)] underline"
              >
                {text.signal}
              </a>
            </article>
          ))}
        </div>

        <section className="mt-10 card p-6">
          <h2 className="text-xl font-semibold text-[var(--text)]">
            {text.roadmapTitle}
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-[var(--color-muted)]">
            {text.roadmap.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-[var(--color-accent)]">·</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <Link
            href={buildLocalizedPath(locale, "/quiz/")}
            className="mt-6 inline-flex h-11 items-center rounded-2xl bg-[var(--color-accent)] px-5 text-sm font-medium text-white"
          >
            {text.cta}
          </Link>
        </section>
      </div>
    </main>
  );
}
