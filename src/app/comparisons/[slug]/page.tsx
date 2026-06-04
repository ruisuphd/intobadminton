import type { Metadata } from "next";
import { pageAlternates } from "@/lib/metadata";
import Link from "next/link";
import { blogSlugs } from "@/lib/blog";
import { articlePathForSlug } from "@/lib/blog-migrations";

export function generateStaticParams() {
  return blogSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const destination = articlePathForSlug(slug);
  return {
    title: "Page moved",
    alternates: pageAlternates(destination),
    robots: { index: false, follow: true },
  };
}

export default async function ComparisonsSlugRedirect({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const destination = articlePathForSlug(slug);
  const script = `(function(){try{location.replace("${destination}")}catch(e){location.href="${destination}"}})();`;

  return (
    <>
      <meta httpEquiv="refresh" content={`0; url=${destination}`} />
      <link rel="canonical" href={destination} />
      <script dangerouslySetInnerHTML={{ __html: script }} />
      <main className="flex-1 py-16">
        <noscript>
          <p>
            This page moved to{" "}
            <a href={destination}>{destination}</a>.
          </p>
        </noscript>
        <div className="layout-band max-w-2xl">
          <Link href={destination} className="text-[var(--color-accent)] underline">
            Continue to review
          </Link>
        </div>
      </main>
    </>
  );
}
