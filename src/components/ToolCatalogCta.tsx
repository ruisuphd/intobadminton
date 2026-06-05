import Link from "next/link";
import {
  catalogCtaLabelFromToolSlug,
  catalogHrefFromToolSlug,
} from "@/lib/catalog-url";

type ToolCatalogCtaProps = {
  slug: string;
  heading?: string;
  body?: string;
};

export function ToolCatalogCta({
  slug,
  heading = "Ready to browse the catalogue?",
  body = "Filter by brand, weight, balance, and price — or run the finder for a personalised shortlist.",
}: ToolCatalogCtaProps) {
  return (
    <section className="mt-12 rounded-2xl bg-[color:var(--color-accent-soft)] p-7 text-center">
      <h2 className="text-xl font-semibold text-[var(--text)]">{heading}</h2>
      <p className="mt-3 text-sm text-[var(--color-muted)]">{body}</p>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
        <Link href="/quiz/" className="btn-primary">
          Start the finder
        </Link>
        <Link
          href={catalogHrefFromToolSlug(slug)}
          className="btn-secondary"
        >
          {catalogCtaLabelFromToolSlug(slug)}
        </Link>
      </div>
    </section>
  );
}
