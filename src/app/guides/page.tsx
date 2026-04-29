import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { buildLocalizedPath, type SiteLocale } from "@/lib/locale";
import { t } from "@/lib/i18n";

const guides = [
  {
    href: "/guides/string-tension/",
    title: "String tension basics",
    desc: "How tension affects feel and flight — without the mysticism.",
  },
  {
    href: "/guides/shoes-footwork/",
    title: "Shoes and footwork",
    desc: "Cushioning, fit width, and what matters on court.",
  },
  {
    href: "/guides/racket-balance/",
    title: "Racket balance and flex",
    desc: "Head weight, shaft stiffness, and how they show up in play.",
  },
  {
    href: "/guides/season-refresh/",
    title: "When to refresh gear",
    desc: "Strings, grips, and honest signs it’s time to recheck your setup.",
  },
  {
    href: "/guides/doubles-roles/",
    title: "Doubles court roles (basics)",
    desc: "How front vs back can influence what you optimize for in doubles.",
  },
  {
    href: "/guides/wide-feet-badminton-shoes/",
    title: "Badminton shoes for wide feet",
    desc: "How to think about fit, stability, and future shoe recommendations.",
  },
] as const;

export function GuidesShell({ locale = "en" }: { locale?: SiteLocale }) {
  const copy = t(locale).guides;
  const localized = (path: string) => buildLocalizedPath(locale, path);

  return (
    <main className="flex-1 py-16">
      <div className="layout-band max-w-6xl">
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--text)]">
          {copy.title}
        </h1>
        <p className="mt-3 max-w-2xl text-[var(--color-muted)]">
          {copy.subtitle}
        </p>
        <div className="mt-8 card p-5 text-sm text-[var(--color-muted)]">
          {locale === "zh"
            ? "指南优先使用原创解释和官方规格链接。第三方论坛或社区内容只作为主题摘要和链接，不复制原文。"
            : "Guides prioritize original analysis and official spec links. Third-party community sources are used only as theme summaries and links, not copied review text."}
        </div>
        <ul className="mt-10 space-y-4">
          {guides.map((g) => (
            <li key={g.href}>
              <Link
                href={localized(g.href)}
                className="block card card-interactive p-5"
              >
                <h2 className="font-semibold text-[var(--text)]">{g.title}</h2>
                <p className="mt-1 text-sm text-[var(--color-muted)]">{g.desc}</p>
              </Link>
            </li>
          ))}
        </ul>
        <AdSlot id={`${locale}-guides-end`} className="mt-12" />
      </div>
    </main>
  );
}

export default function GuidesIndex() {
  return <GuidesShell locale="en" />;
}
