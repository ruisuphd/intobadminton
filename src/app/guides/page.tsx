import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";

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

export default function GuidesIndex() {
  return (
    <main className="flex-1 py-16">
      <div className="layout-band max-w-6xl">
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--text)]">
          Guides
        </h1>
        <p className="mt-3 max-w-2xl text-[var(--color-muted)]">
          Short, practical notes to support the finder. Always cross-check
          product specs on official sites before buying.
        </p>
        <ul className="mt-10 space-y-4">
          {guides.map((g) => (
            <li key={g.href}>
              <Link
                href={g.href}
                className="block rounded-2xl border border-zinc-200/90 bg-[var(--surface)] p-5 transition hover:border-[var(--color-accent)] dark:border-zinc-700/90"
              >
                <h2 className="font-semibold text-[var(--text)]">{g.title}</h2>
                <p className="mt-1 text-sm text-[var(--color-muted)]">{g.desc}</p>
              </Link>
            </li>
          ))}
        </ul>
        <AdSlot id="guides-end" className="mt-12" />
      </div>
    </main>
  );
}
