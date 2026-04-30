import Link from "next/link";
import { CookieSettingsLink } from "@/components/CookieSettings";

type FooterColumn = {
  heading: string;
  links: { label: string; path: string }[];
};

const COLUMNS: FooterColumn[] = [
  {
    heading: "Find gear",
    links: [
      { label: "Finder", path: "/quiz/" },
      { label: "Compare", path: "/compare/" },
      { label: "Brands", path: "/brands/" },
      { label: "Research", path: "/research/" },
    ],
  },
  {
    heading: "Read",
    links: [
      { label: "Blog", path: "/blog/" },
      { label: "Guides", path: "/guides/" },
      { label: "Methodology", path: "/methodology/" },
      { label: "Sources", path: "/sources/" },
    ],
  },
  {
    heading: "About",
    links: [
      { label: "About", path: "/about/" },
      { label: "Contact", path: "/contact/" },
      { label: "Security", path: "/security/" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy", path: "/privacy/" },
      { label: "Terms", path: "/terms/" },
      { label: "Cookies", path: "/cookies/" },
      { label: "Source policy", path: "/source-policy/" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[color:var(--line)] py-16">
      <div className="layout-band max-w-6xl">
        <div className="grid gap-10 md:grid-cols-[2fr_3fr]">
          <div>
            <p className="text-base font-semibold text-[var(--text)]">
              IntoBadminton
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-[var(--color-muted)]">
              Curated equipment suggestions for badminton players. Not medical
              advice; always try before you buy when possible.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {COLUMNS.map((col) => (
              <div key={col.heading} className="text-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-subtle)]">
                  {col.heading}
                </p>
                <ul className="mt-3 space-y-2">
                  {col.links.map((l) => (
                    <li key={l.path}>
                      <Link
                        href={l.path}
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
            © {new Date().getFullYear()} IntoBadminton · Equipment is personal;
            results are informational.
          </p>
          <CookieSettingsLink />
        </div>
      </div>
    </footer>
  );
}
