import Link from "next/link";
import {
  catalogCtaLabelFromGuideSlug,
  catalogHrefFromGuideSlug,
} from "@/lib/catalog-url";

type GuideCatalogCtaProps = {
  slug: string;
  heading?: string;
  body?: string;
};

export function GuideCatalogCta({
  slug,
  heading = "Ready to browse the catalogue?",
  body = "Filter by brand, weight, balance, and price — or run the finder for a personalised shortlist.",
}: GuideCatalogCtaProps) {
  return (
    <section className="mt-12 rounded-2xl bg-[color:var(--color-accent-soft)] p-7 text-center">
      <h2 className="text-xl font-semibold text-[var(--text)]">{heading}</h2>
      <p className="mt-3 text-sm text-[var(--color-muted)]">{body}</p>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
        <Link href="/quiz/" className="btn-primary">
          Start the finder
        </Link>
        <Link
          href={catalogHrefFromGuideSlug(slug)}
          className="btn-secondary"
        >
          {catalogCtaLabelFromGuideSlug(slug)}
        </Link>
      </div>
    </section>
  );
}
