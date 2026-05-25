import type { SiteLocale } from "@/lib/locale";
import blogArticlesData from "@/data/blog-articles.json";

export const blogSlugs = [
  "racket-balance-vs-swing-speed",
  "how-to-read-badminton-reviews",
  "beginner-racket-mistakes",
  "badminton-string-selector",
  "badminton-shoe-fit-stability",
  "badminton-bag-loadout",
  "used-racket-depreciation",
  "yonex-astrox-88d-pro-vs-88s-pro-2024",
  "yonex-nanoflare-speed-series-explained",
  "yonex-nanoflare-800-pro-and-victor-hs-plus",
  "li-ning-bladex-800-speed-tough-elastic",
  "li-ning-halbertec-8000-vs-9000-vs-9000-power",
  "li-ning-axforce-90-new-vs-axforce-80-and-yonex-88dp",
  "yuan-style-shaft-hardness-explained",
  "yonex-astrox-100zz-axelsen-va-vs-kurenai",
  "victor-drivex-12-vs-astrox-88d-pro",
  "li-ning-l69-string-review",
  "victor-p9200-iii-shoes-review",
  "li-ning-axforce-100-gen-2-vs-100zz-vs-90-new",
  "yonex-eclipsion-z3-shoes-review",
  "yonex-astrox-99-pro-2-deep-dive",
  "victor-auraspeed-99-hayabusa-review",
  "li-ning-bladesabre-max-shoes-review",
  "victor-auraspeed-hs-plus-deep-dive",
  "li-ning-halbertec-7000-ii-review",
  "li-ning-halbertec-7000-review",
  "victor-carbonsonic-max-shuttle-review",
  "bonny-leisu-800-racket-review",
  "kumpoo-shanhai-new-racket-review",
  "li-ning-axforce-80-review",
  "victor-c90nl-shoes-review",
  "yonex-65z4-shoes-review",
  "kawasaki-master-mao-20-racket-review",
  "kumpoo-shura-2-racket-review",
  "victor-yu-12-racket-review",
  "victor-auraspeed-fantome-review",
  "li-ning-thunder-100-gen-2-vs-gen-1",
  "li-ning-aerus-iii-pro-shoes-review",
  "victor-tk-f-c-ultra-review",
  "kawasaki-kace-shoes-review",
  "kawasaki-star-cross-racket-review",
  "yonex-arcsaber-7-pro-review",
  "asics-blast-ff-3-badminton-shoes-review",
  "yonex-astrox-nextage-review",
  "victor-drivex-10-review",
  "yonex-nanoflare-1000z-play-review",
  "yonex-nanoflare-800-pro-tour-review",
  "yonex-nanoflare-nextage-review",
  "yonex-power-cushion-88-dial-3-review",
  "yonex-grpht-thrttl-training-shoe-review",
  "li-ning-bladex-900-new-review",
  "victor-auraspeed-hs-plus-attack-review",
  "yonex-astrox-88-pro-2024-review",
  "victor-auraspeed-90k-ii-review",
  "victor-thruster-falcon-review",
  "yonex-nanoflare-700-review",
  "li-ning-axforce-90-new-review",
  "yonex-subaxia-gt-shoes-review",
  "yonex-astrox-99-pro-3-deep-dive",
  "how-to-choose-a-badminton-racket",
  "badminton-equipment-for-kids",
  "badminton-glossary-terms-every-player-should-know",
  "yonex-grip-sizes-explained",
  "yonex-arcsaber-10-complete-buying-guide",
  "racket-stringing-hole-patterns-explained",
  "yonex-tour-series-buying-guide",
  "kumpoo-fourth-major-badminton-brand-profile",
  "rsl-aero-u-shuttle-review",
  "li-ning-axforce-90-new-5u-deep-dive",
  "bonny-future-land-3-polaris-shoes-review",
  "li-ning-bladesabre-2-pro-shoes-review",
  "kawasaki-chocolate-88d-vs-yonex-astrox-88d-pro",
  "jujiang-mzs-66un-string-review",
  "kawasaki-twilight-shoes-review",
  "li-ning-gp100-pro-overgrip-review",
  "li-ning-l66-string-first-look",
  "bonny-wuque-flagship-088-shoes-review",
  "bonny-wind-shadow-budget-speed-shoes-review",
  "jujiang-lbtu-value-racket-review",
  "victor-fz-flash-1000-racket-review",
  "kumpoo-kh-g805-lite-pro-shoes-review",
  "bonny-phantom-100-racket-review",
  "li-ning-axforce-10-beginner-attack-review",
  "li-ning-bladex-arrow-review",
  "victor-thruster-hwql-nuke-review",
  "victor-jipo-ls-racket-review",
  "victor-thruster-sr-cherry-blossom-review",
  "victor-fz-88d-power-purple-review",
  "yonex-arcsaber-7-play-review",
  "kawasaki-glacier-800-racket-review",
  "kawasaki-h2-6u-superlight-racket-review",
  "kawasaki-star-cross-second-perspective-review",
  "bonny-snake-breath-second-tier-flagship-review",
  "li-ning-lt66-power-string-review",
  "li-ning-flagship-racket-buying-guide-2026",
  "bonny-wuque-1982-y3k-shoes-review",
  "li-ning-halbertec-9000-power-deep-dive",
  "li-ning-halbertec-9000-standalone-review",
  "li-ning-axforce-100-gen-2-vs-gen-1",
  "rsl-supreme-shuttle-review",
  "yonex-astrox-100zz-anders-antonsen-vs-va-vs-kurenai",
  "victor-drivex-12-zsw-vs-original-comparison",
  "victor-drivex-12-vs-drivex-10-and-88d-pro-2024",
  "bonny-zhangui-dao-8888ax-ultra-review",
  "bonny-carbon-armour-shoes-review",
  "victor-thruster-9900-curiosity-review",
  "yonex-astrox-99-pro-gen-1-review",
  "bonny-wuque-xuanwu-review",
  "badminton-shoe-buying-guide-and-replacement",
  "kumpoo-js-67-string-review",
  "yonex-nanoflare-700-pro-vs-nf700-800-pro-1000z",
  "victor-sonic-boom-pro-budget-attack-review",
  "goshen-leiming-69-string-review",
  "bonny-mojun-vs-arcsaber-11-pro-attack-racket-review",
  "yonex-arcsaber-7-tour-review",
  "victor-p8500-ii-shoes-review",
  "victor-a970-nitro-lite-shoes-review",
  "yonex-astrox-77-pro-review",
  "yonex-nanoray-zspeed-duora-zstrike-legacy-comparison",
  "li-ning-bladex-800-speed-vs-halbertec-9000-power",
  "li-ning-halbertec-8000-vs-yonex-arcsaber-11-pro",
  "victor-p8500-ii-vs-a970-nitro-lite",
  "fz-forza-odin-8800-review",
  "fz-forza-88d-review",
  "bonny-golden-dragon-roar-pro-racket-review",
  "mizuno-carbo-pro-823-review",
  "bonny-phantom-88-racket-review",
  "bonny-wuque-flagship-089-shoes-review",
  "li-ning-l64-string-review",
  "kumpoo-js-63-string-review",
  "rsl-aero-classic-tourney-shuttle-review",
  "li-ning-axforce-80-jr-junior-review",
  "yonex-arcsaber-11-pro-review",
  "huayu-slayer-racket-review",
  "victor-replacement-insoles-buyer-guide",
  "yonex-nanoflare-1000z-review",
  "yonex-astrox-88s-tour-curious-review",
  "rsl-at70-racket-review",
  "victor-jetspeed-12-curious-review",
  "li-ning-bladex-500-pro-curious-review",
  "kawasaki-crimson-blade-racket-review",
  "rsl-no4-plus-shuttle-review",
  "li-ning-halbertec-flagship-lineup-review",
  "yonex-nanoflare-800-pro-vs-nf700",
  "yonex-aerosensa-50-shuttle-review",
  "yonex-comfort-z3-shoes-review",
] as const;

export type BlogSlug = (typeof blogSlugs)[number];

export type BlogComparison = {
  caption?: string;
  columns: string[];
  rows: { label: string; values: string[] }[];
};

export type BlogFactCheck = {
  claim: string;
  source: string;
};

export type BlogArticle = {
  slug: BlogSlug;
  updatedAt: string;
  title: string;
  dek: string;
  verdict: string;
  sections: {
    heading: string;
    body: string;
    glossaryLinks?: { term: string; id: string }[];
  }[];
  cta: string;
  methodology?: string;
  factChecks?: BlogFactCheck[];
  comparison?: BlogComparison;
  relatedReviewProductId?: string;
};

export const blogArticles: Record<SiteLocale, BlogArticle[]> = {
  en: blogArticlesData as BlogArticle[],
};

export function readingTimeMinutes(article: BlogArticle): number {
  const words = article.sections
    .flatMap((s) => `${s.heading} ${s.body}`.split(/\s+/))
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 225));
}

/** Chip label for editorial URLs on /comparisons/ (not per-product /review/). */
export function editorialContentLabel(slug: string): "Guide" | "Comparison" {
  if (
    /guide|how-to|explained|glossary|loadout|mistakes|selector|fit-stability|depreciation|kids|terms|insoles|methodology|profile|overview/.test(
      slug
    )
  ) {
    return "Guide";
  }
  return "Comparison";
}

export function articlesByDateDesc(articles: BlogArticle[]): BlogArticle[] {
  return [...articles].sort((a, b) =>
    a.updatedAt < b.updatedAt ? 1 : a.updatedAt > b.updatedAt ? -1 : 0
  );
}

function affinityKey(slug: string): { family: string; brand: string } {
  const parts = slug.split("-");
  if (parts.length < 2) return { family: slug, brand: slug };
  const brand =
    parts[0] === "li" && parts[1] === "ning" ? "li-ning" : parts[0];
  const tail = brand === "li-ning" ? parts[2] : parts[1];
  const family = tail ? `${brand}-${tail}` : brand;
  return { family, brand };
}

export function relatedArticles(
  articles: BlogArticle[],
  current: BlogArticle,
  n = 3
): BlogArticle[] {
  const currentKey = affinityKey(current.slug);
  const scored = articles
    .filter((a) => a.slug !== current.slug)
    .map((a) => {
      const k = affinityKey(a.slug);
      let score = 0;
      if (k.family === currentKey.family) score = 3;
      else if (k.brand === currentKey.brand) score = 1;
      return { a, score };
    })
    .filter((row) => row.score > 0)
    .sort((x, y) => {
      if (y.score !== x.score) return y.score - x.score;
      return x.a.updatedAt < y.a.updatedAt ? 1 : -1;
    })
    .map((row) => row.a);
  return scored.slice(0, n);
}

export function getBlogArticle(locale: SiteLocale, slug: string) {
  return blogArticles[locale].find((article) => article.slug === slug);
}

export function sectionAnchorId(
  heading: string,
  index: number,
  seen: Map<string, number>
): string {
  const base =
    heading
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/^-+|-+$/g, "") || "section";
  const count = seen.get(base) ?? 0;
  seen.set(base, count + 1);
  return count === 0 ? base : `${base}-${count + 1}`;
}
