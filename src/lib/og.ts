import type { Metadata } from "next";
import { companyInfo } from "@/lib/company";

/**
 * Shared Open Graph image set.
 *
 * Next.js Metadata's `openGraph` is NOT shallow-merged with the parent: a page
 * that sets ANY `openGraph` field loses inheritance of the layout's `images`.
 * To prevent og:image gaps on pages that override openGraph (brand pages,
 * blog index, FAQ, /best/), call this helper and spread the result into the
 * page's `openGraph.images`.
 */
export const defaultOgImages = [
  {
    url: "/intobadminton-og.jpg",
    width: 512,
    height: 512,
    alt: "IntoBadminton — badminton equipment recommendations",
  },
] as const;

/** Dynamic OG image emitted by `opengraph-image.tsx` on blog/review routes. */
export function routeOgImages(routePath: string) {
  const base = routePath.endsWith("/") ? routePath : `${routePath}/`;
  return [
    {
      url: `${base}opengraph-image`,
      width: 1200,
      height: 630,
      alt: "IntoBadminton — badminton equipment recommendations",
    },
  ] as const;
}

type ArticleSocialMetaInput = {
  path: string;
  title: string;
  description: string;
  type?: "article" | "website";
};

/**
 * Open Graph + Twitter cards for long-form editorial routes (/best/*, /guides/*).
 * Keeps image inheritance consistent and avoids partial openGraph overrides.
 */
export function articleSocialMetadata(
  input: ArticleSocialMetaInput
): Pick<Metadata, "openGraph" | "twitter"> {
  const path = input.path.endsWith("/") ? input.path : `${input.path}/`;
  const ogTitle = input.title;
  const ogDescription = input.description;

  return {
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: path,
      type: input.type ?? "article",
      siteName: companyInfo.siteName,
      locale: "en_US",
      images: [...defaultOgImages],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: [defaultOgImages[0].url],
    },
  };
}
