"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CookieSettingsLink } from "@/components/CookieSettings";
import { buildLocalizedPath, localeFromPath } from "@/lib/locale";
import { t } from "@/lib/i18n";

type FooterColumn = { heading: string; links: { label: string; path: string }[] };

export function SiteFooter() {
  const locale = localeFromPath(usePathname());
  const copy = t(locale);
  const localized = (path: string) => buildLocalizedPath(locale, path);
  const isZh = locale === "zh";

  const columns: FooterColumn[] = [
    {
      heading: isZh ? "推荐" : "Find gear",
      links: [
        { label: copy.nav.finder, path: "/quiz/" },
        { label: isZh ? "对比" : "Compare", path: "/compare/" },
        { label: isZh ? "覆盖品牌" : "Brands", path: "/brands/" },
        { label: isZh ? "调研" : "Research", path: "/research/" },
      ],
    },
    {
      heading: isZh ? "内容" : "Read",
      links: [
        { label: copy.nav.blog, path: "/blog/" },
        { label: isZh ? "指南" : "Guides", path: "/guides/" },
        { label: copy.footer.methodology, path: "/methodology/" },
        { label: isZh ? "信息来源" : "Sources", path: "/sources/" },
      ],
    },
    {
      heading: isZh ? "了解" : "About",
      links: [
        { label: isZh ? "关于" : "About", path: "/about/" },
        { label: isZh ? "联系" : "Contact", path: "/contact/" },
        { label: isZh ? "安全" : "Security", path: "/security/" },
      ],
    },
    {
      heading: isZh ? "法律" : "Legal",
      links: [
        { label: isZh ? "隐私" : "Privacy", path: "/privacy/" },
        { label: isZh ? "条款" : "Terms", path: "/terms/" },
        { label: isZh ? "Cookie" : "Cookies", path: "/cookies/" },
        { label: isZh ? "来源政策" : "Source policy", path: "/source-policy/" },
      ],
    },
  ];

  return (
    <footer className="mt-auto border-t border-[color:var(--line)] py-16">
      <div className="layout-band max-w-6xl">
        <div className="grid gap-10 md:grid-cols-[2fr_3fr]">
          <div>
            <p className="text-base font-semibold text-[var(--text)]">
              IntoBadminton
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-[var(--color-muted)]">
              {copy.footer.summary}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {columns.map((col) => (
              <div key={col.heading} className="text-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-subtle)]">
                  {col.heading}
                </p>
                <ul className="mt-3 space-y-2">
                  {col.links.map((l) => (
                    <li key={l.path}>
                      <Link
                        href={localized(l.path)}
                        className="text-[var(--color-muted)] transition-colors hover:text-[var(--text)]"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-[color:var(--line)] pt-6 text-xs text-[var(--color-subtle)]">
          <p>
            © {new Date().getFullYear()} IntoBadminton · {isZh ? "装备建议仅供参考" : "Equipment is personal; results are informational."}
          </p>
          <CookieSettingsLink />
        </div>
      </div>
    </footer>
  );
}
