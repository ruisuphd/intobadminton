import Link from "next/link";
import { buildLocalizedPath, type SiteLocale } from "@/lib/locale";

const TOOL_LINKS = [
  {
    href: "/tools/skill-level-converter/",
    title: "Skill-level converter",
    tag: "Converter",
  },
  {
    href: "/tools/string-tension-calculator/",
    title: "String tension calculator",
    tag: "Calculator",
  },
  {
    href: "/tools/racket-balance-explainer/",
    title: "Racket balance explainer",
    tag: "Explainer",
  },
  {
    href: "/tools/court-diagram/",
    title: "Court dimensions",
    tag: "Reference",
  },
  {
    href: "/tools/authenticity-checker/",
    title: "Authenticity checker",
    tag: "Triage",
  },
] as const;

/** Surfaces high-value toolkit pages on the homepage (no signup). */
export function HomeToolkitStrip({ locale }: { locale: SiteLocale }) {
  const localized = (path: string) => buildLocalizedPath(locale, path);

  return (
    <section className="border-t border-[color:var(--line)] py-16 lg:py-20">
      <div className="layout-band max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <h2 className="text-headline text-[var(--text)]">
              Free badminton toolkit
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)]">
              Original calculators and references — no account, nothing leaves
              your device.
            </p>
          </div>
          <Link
            href={localized("/tools/")}
            className="text-sm font-medium text-[var(--color-accent)] hover:text-[var(--color-accent-hover)]"
          >
            All tools →
          </Link>
        </div>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TOOL_LINKS.map((tool) => (
            <li key={tool.href}>
              <Link
                href={localized(tool.href)}
                className="card card-interactive block p-5"
              >
                <span className="chip chip-secondary">{tool.tag}</span>
                <p className="mt-3 text-sm font-semibold text-[var(--text)]">
                  {tool.title}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
