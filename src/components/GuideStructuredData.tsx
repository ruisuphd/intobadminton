import { JsonLd } from "@/components/JsonLd";
import { companyInfo } from "@/lib/company";
import { articleJsonLd } from "@/lib/structured-data";

type GuideStructuredDataProps = {
  /** Route path with trailing slash, e.g. "/guides/string-tension/". */
  path: string;
  /** Headline used in the Article JSON-LD. Should match the visible H1. */
  headline: string;
  /** Short summary used in the Article JSON-LD. Typically the metadata description. */
  description: string;
  /** Breadcrumb label for the guide page itself (the third crumb after Home / Guides). */
  breadcrumbLabel: string;
  /** Optional HowTo steps for procedural guides. */
  howToSteps?: { name: string; text: string }[];
};

/**
 * Emits Article + BreadcrumbList JSON-LD for a `/guides/[slug]/` page.
 *
 * Article authority (author + publisher) is built by `articleJsonLd()` from
 * `companyInfo` and the editorial-meta registry, so dates and bylines can never
 * drift apart from the visible page. Each guide must have an entry in
 * `editorialMetaByPath` in `src/lib/editorial-meta.ts`; `articleJsonLd` throws
 * if the registry is missing the path.
 */
export function GuideStructuredData({
  path,
  headline,
  description,
  breadcrumbLabel,
  howToSteps,
}: GuideStructuredDataProps) {
  const article = articleJsonLd({
    path,
    headline,
    description,
    section: "Guides",
  });

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${companyInfo.siteUrl}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Guides",
        item: `${companyInfo.siteUrl}/guides/`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: breadcrumbLabel,
        item: `${companyInfo.siteUrl}${path}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={article} />
      <JsonLd data={breadcrumb} />
      {howToSteps && howToSteps.length > 0 && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: headline,
            description,
            step: howToSteps.map((step, index) => ({
              "@type": "HowToStep",
              position: index + 1,
              name: step.name,
              text: step.text,
            })),
          }}
        />
      )}
    </>
  );
}
