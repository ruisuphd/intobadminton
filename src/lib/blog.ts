import type { SiteLocale } from "@/lib/locale";
import blogArticlesData from "@/data/blog-articles.json";

export const blogSlugs = [
  "anta-ah600w-racket-review",
  "anta-dingyin-1000-racket-review",
  "asics-blast-ff-3-badminton-shoes-review",
  "babolat-satelite-blast-racket-review",
  "badminton-bag-loadout",
  "badminton-equipment-for-kids",
  "badminton-glossary-terms-every-player-should-know",
  "badminton-shoe-buying-guide-and-replacement",
  "badminton-shoe-fit-stability",
  "badminton-string-selector",
  "beginner-racket-mistakes",
  "bonny-baidi-800lt-racket-review",
  "bonny-carbon-armour-shoes-review",
  "bonny-future-land-3-polaris-shoes-review",
  "bonny-golden-dragon-roar-pro-racket-review",
  "bonny-infinity-002-shoes-review",
  "bonny-leisu-800-lt-review",
  "bonny-leisu-800-racket-review",
  "bonny-lunar-8-racket-review",
  "bonny-mojun-vs-arcsaber-11-pro-attack-racket-review",
  "bonny-phantom-100-racket-review",
  "bonny-phantom-88-racket-review",
  "bonny-snake-breath-second-tier-flagship-review",
  "bonny-wind-shadow-budget-speed-shoes-review",
  "bonny-wuque-1982-y3k-shoes-review",
  "bonny-wuque-flagship-088-shoes-review",
  "bonny-wuque-flagship-089-shoes-review",
  "bonny-wuque-xuanwu-review",
  "bonny-zhangui-dao-8888ax-ultra-review",
  "chengong-feng-racket-review",
  "decathlon-920d-racket-review",
  "fz-forza-88d-review",
  "fz-forza-odin-8800-review",
  "gosen-kyokugen-racket-review",
  "gosen-raimei-58-string-review",
  "gosen-raimei-62-string-review",
  "gosen-ryoga-shiden-review",
  "goshen-leiming-69-string-review",
  "how-to-choose-a-badminton-racket",
  "how-to-read-badminton-reviews",
  "huayu-slayer-racket-review",
  "jujiang-lbtu-value-racket-review",
  "jujiang-mzs-66un-string-review",
  "kawasaki-chocolate-88d-vs-yonex-astrox-88d-pro",
  "kawasaki-crimson-blade-racket-review",
  "kawasaki-glacier-800-racket-review",
  "kawasaki-h2-6u-superlight-racket-review",
  "kawasaki-kace-shoes-review",
  "kawasaki-master-mao-20-racket-review",
  "kawasaki-nezer-19-ii-racket-review",
  "kawasaki-star-cross-racket-review",
  "kawasaki-star-cross-second-perspective-review",
  "kawasaki-twilight-shoes-review",
  "kumpoo-fourth-major-badminton-brand-profile",
  "kumpoo-js-63-string-review",
  "kumpoo-js-65-string-review",
  "kumpoo-js-67-string-review",
  "kumpoo-kh-g805-lite-pro-shoes-review",
  "kumpoo-kh-g815-dragon-claw-shoes-review",
  "kumpoo-shanhai-new-racket-review",
  "kumpoo-shura-2-racket-review",
  "kumpoo-silver-blade-shoes-review",
  "li-ning-aeronaut-8000d-review",
  "li-ning-aeronaut-9000c-racket-review",
  "li-ning-aerus-iii-pro-shoes-review",
  "li-ning-axforce-10-beginner-attack-review",
  "li-ning-axforce-100-gen-1-review",
  "li-ning-axforce-100-gen-2-review",
  "li-ning-axforce-100-gen-2-vs-100zz-vs-90-new",
  "li-ning-axforce-100-gen-2-vs-gen-1",
  "li-ning-axforce-70-racket-review",
  "li-ning-axforce-70-vs-80-vs-90",
  "li-ning-axforce-80-jr-junior-review",
  "li-ning-axforce-80-review",
  "li-ning-axforce-90-dragon-max-dragon-vs-tiger",
  "li-ning-axforce-90-dragon-max-review",
  "li-ning-axforce-90-dragon-max-vs-astrox-100zz",
  "li-ning-axforce-90-new-5u-deep-dive",
  "li-ning-axforce-90-new-review",
  "li-ning-axforce-90-new-vs-axforce-80-and-yonex-88dp",
  "li-ning-axforce-cannon-racket-review",
  "li-ning-bladesabre-2-pro-shoes-review",
  "li-ning-bladesabre-max-shoes-review",
  "li-ning-bladex-500-pro-curious-review",
  "li-ning-bladex-800-power-review",
  "li-ning-bladex-800-speed-review",
  "li-ning-bladex-800-speed-tough-elastic",
  "li-ning-bladex-800-speed-vs-halbertec-9000-power",
  "li-ning-bladex-880-shida-racket-review",
  "li-ning-bladex-900-new-review",
  "li-ning-bladex-900-new-vs-1000z-auraspeed-falcon-se",
  "li-ning-bladex-900-new-vs-nanoflare-1000z",
  "li-ning-bladex-arrow-review",
  "li-ning-flagship-racket-buying-guide-2026",
  "li-ning-g100s-shuttle-review",
  "li-ning-gp100-pro-overgrip-review",
  "li-ning-halbertec-5000-racket-review",
  "li-ning-halbertec-7000-ii-review",
  "li-ning-halbertec-7000-review",
  "li-ning-halbertec-8000-vs-9000-vs-9000-power",
  "li-ning-halbertec-8000-vs-yonex-arcsaber-11-pro",
  "li-ning-halbertec-9000-power-deep-dive",
  "li-ning-halbertec-9000-standalone-review",
  "li-ning-halbertec-flagship-lineup-review",
  "li-ning-invincible-ace-shoes-review",
  "li-ning-l64-string-review",
  "li-ning-l66-string-first-look",
  "li-ning-l69-string-review",
  "li-ning-lt66-power-string-review",
  "li-ning-mirage-ii-pro-shoes-review",
  "li-ning-no-1-string-review",
  "li-ning-okay-1-shuttle-review",
  "li-ning-saga-ii-se-shoes-review",
  "li-ning-thunder-100-gen-2-vs-gen-1",
  "li-ning-thunder-2-pro-shoes-review",
  "mizuno-carbo-pro-823-review",
  "mizuno-carbo-pro-825-review",
  "racket-balance-vs-swing-speed",
  "racket-stringing-hole-patterns-explained",
  "rsl-aero-classic-tourney-shuttle-review",
  "rsl-aero-u-shuttle-review",
  "rsl-at70-racket-review",
  "rsl-no4-plus-shuttle-review",
  "rsl-supreme-shuttle-review",
  "rsl-tourney-l7-shuttle-review",
  "used-racket-depreciation",
  "victor-a970-nitro-lite-shoes-review",
  "victor-auraspeed-90k-ii-review",
  "victor-auraspeed-99-hayabusa-review",
  "victor-auraspeed-fantome-review",
  "victor-auraspeed-hs-plus-attack-review",
  "victor-auraspeed-hs-plus-deep-dive",
  "victor-c90-ii-shoes-review",
  "victor-c90nl-shoes-review",
  "victor-carbonsonic-max-shuttle-review",
  "victor-drivex-10-review",
  "victor-drivex-12-vs-astrox-88d-pro",
  "victor-drivex-12-vs-drivex-10-and-88d-pro-2024",
  "victor-drivex-12-vs-zsw-vs-arc11-halbertec-8000",
  "victor-drivex-12-zsw-racket-review",
  "victor-drivex-12-zsw-vs-original-comparison",
  "victor-fz-100xx-budget-attack-review",
  "victor-fz-88d-power-purple-review",
  "victor-fz-flash-1000-racket-review",
  "victor-jetspeed-12-curious-review",
  "victor-jipo-ls-racket-review",
  "victor-p8500-ii-shoes-review",
  "victor-p8500-ii-vs-a970-nitro-lite",
  "victor-p9200-iii-shoes-review",
  "victor-replacement-insoles-buyer-guide",
  "victor-sonic-boom-pro-budget-attack-review",
  "victor-thruster-9900-curiosity-review",
  "victor-thruster-falcon-review",
  "victor-thruster-hwql-nuke-review",
  "victor-thruster-k-30-pro-racket-review",
  "victor-thruster-ryuga-ii-pro-racket-review",
  "victor-thruster-sr-cherry-blossom-review",
  "victor-tk-f-c-ultra-review",
  "victor-vbs-63-string-review",
  "victor-vbs-66n-string-review",
  "victor-vbs70-string-review",
  "victor-yinbao-a-boom-shoes-review",
  "victor-yu-12-racket-review",
  "yonex-65z4-shoes-review",
  "yonex-aerosensa-50-shuttle-review",
  "yonex-arcsaber-10-complete-buying-guide",
  "yonex-arcsaber-11-pro-review",
  "yonex-arcsaber-7-play-review",
  "yonex-arcsaber-7-pro-review",
  "yonex-arcsaber-7-tour-review",
  "yonex-astrox-100zz-anders-antonsen-vs-va-vs-kurenai",
  "yonex-astrox-100zz-axelsen-va-vs-kurenai",
  "yonex-astrox-77-pro-review",
  "yonex-astrox-88-pro-2024-review",
  "yonex-astrox-88d-pro-vs-88s-pro-2024",
  "yonex-astrox-88s-tour-curious-review",
  "yonex-astrox-99-pro-2-deep-dive",
  "yonex-astrox-99-pro-3-deep-dive",
  "yonex-astrox-99-pro-gen-1-review",
  "yonex-astrox-nextage-review",
  "yonex-bg80-string-review",
  "yonex-comfort-z3-shoes-review",
  "yonex-eclipsion-z3-shoes-review",
  "yonex-exbolt-63-string-review",
  "yonex-exbolt-68-string-review",
  "yonex-grip-sizes-explained",
  "yonex-grpht-thrttl-training-shoe-review",
  "yonex-nanoflare-1000z-play-review",
  "yonex-nanoflare-1000z-review",
  "yonex-nanoflare-700-pro-vs-nf700-800-pro-1000z",
  "yonex-nanoflare-700-review",
  "yonex-nanoflare-800-pro-and-victor-hs-plus",
  "yonex-nanoflare-800-pro-tour-review",
  "yonex-nanoflare-800-pro-vs-nf700",
  "yonex-nanoflare-nextage-review",
  "yonex-nanoflare-speed-series-explained",
  "yonex-nanoray-zspeed-duora-zstrike-legacy-comparison",
  "yonex-nanospeed-9900-ltg-green-sword-review",
  "yonex-power-cushion-88-dial-3-review",
  "yonex-subaxia-gt-shoes-review",
  "yonex-tour-series-buying-guide",
  "yonex-voltric-z-force-ltd-2012-review",
  "yuan-style-shaft-hardness-explained"
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
