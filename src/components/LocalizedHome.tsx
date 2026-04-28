import Link from "next/link";
import Image from "next/image";
import { AdSlot } from "@/components/AdSlot";
import { ShuttleMotif } from "@/components/ShuttleMotif";
import { buildLocalizedPath, type SiteLocale } from "@/lib/locale";
import { t } from "@/lib/i18n";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function LocalizedHome({ locale }: { locale: SiteLocale }) {
  const copy = t(locale);
  const localized = (path: string) => buildLocalizedPath(locale, path);

  return (
    <main className="flex-1">
      <section className="border-b border-zinc-200/80 py-16 dark:border-zinc-700/80 lg:py-20">
        <div className="layout-band grid max-w-6xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="max-w-2xl">
            <ShuttleMotif className="mb-4 h-12 w-48" />
            <h1 className="text-4xl font-semibold tracking-tight text-[var(--text)] sm:text-5xl">
              {copy.home.title}
            </h1>
            <p className="mt-5 text-lg text-[var(--color-muted)]">
              {copy.home.subtitle}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href={localized("/quiz/")}
                className="inline-flex h-12 items-center justify-center rounded-2xl bg-[var(--color-accent)] px-8 text-sm font-medium text-white transition hover:opacity-90"
              >
                {copy.home.start}
              </Link>
              <Link
                href={localized("/guides/")}
                className="inline-flex h-12 items-center justify-center rounded-2xl border border-zinc-300 px-8 text-sm dark:border-zinc-600"
              >
                {copy.home.guides}
              </Link>
            </div>
          </div>
          <div className="overflow-hidden rounded-[1.75rem] border border-zinc-200 bg-[var(--surface)] shadow-sm dark:border-zinc-700">
            <Image
              src={`${basePath}/badminton-court.svg`}
              alt=""
              width={1200}
              height={720}
              className="aspect-[5/3] w-full object-cover"
            />
            <div className="grid grid-cols-3 border-t border-zinc-200 text-center text-xs text-[var(--color-muted)] dark:border-zinc-700">
              <span className="p-3">Specs</span>
              <span className="border-x border-zinc-200 p-3 dark:border-zinc-700">
                Evidence
              </span>
              <span className="p-3">Fit</span>
            </div>
          </div>
        </div>
      </section>
      <div className="layout-band max-w-6xl py-12">
        <div className="grid gap-5 md:grid-cols-3">
          {copy.home.proof.map((x) => (
            <div
              key={x.title}
              className="rounded-2xl border border-zinc-200/90 bg-[var(--surface)] p-6 dark:border-zinc-700/90"
            >
              <h2 className="font-semibold text-[var(--text)]">{x.title}</h2>
              <p className="mt-2 text-sm text-[var(--color-muted)]">
                {x.body}
              </p>
            </div>
          ))}
        </div>
        <AdSlot id={`${locale}-home-mid`} />
      </div>
    </main>
  );
}
