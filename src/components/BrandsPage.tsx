import { brands, BRAND_TIER_LABELS, type BrandTier } from "@/lib/brands";
import { companyInfo } from "@/lib/company";
import type { SiteLocale } from "@/lib/locale";

const tierOrder: BrandTier[] = ["flagship", "tier2", "tier3", "tier4"];

const copy = {
  en: {
    hero: "Brands we cover",
    dek: "The badminton manufacturers our recommendations draw from. Tiering reflects market presence and how deeply we cover their catalogue, not quality — many tier-3 and tier-4 brands beat the flagships on specific products.",
    coverage: "Categories covered",
    founded: "Founded",
    country: "HQ",
    visit: "Official site",
    methodology:
      "Tier placement is editorial, based on global availability, breadth of catalogue, and how often the brand appears in independent reviews and BWF-tour play. We keep the list updated as catalogues change.",
    requestHeading: "Don't see a brand?",
    requestBody:
      "Email us with the brand name and a link to their official site. We add brands as we can responsibly verify product specs.",
    contact: "Contact",
  },
  zh: {
    hero: "我们覆盖的品牌",
    dek: "推荐器使用的羽毛球品牌清单。分级反映市场存在度与目录覆盖深度，不代表品质 —— 许多三、四线品牌在具体产品上优于旗舰。",
    coverage: "覆盖品类",
    founded: "创立",
    country: "总部",
    visit: "官方网站",
    methodology:
      "分级为编辑判断，依据全球供应、产品线广度，以及品牌在独立评测和 BWF 巡回赛中的出现频率。目录变化时同步更新。",
    requestHeading: "没找到某品牌？",
    requestBody:
      "把品牌名和官网链接发给我们 —— 只要能负责任地核验规格，我们就会加入。",
    contact: "联系",
  },
} as const;

const categoryLabels: Record<string, { en: string; zh: string }> = {
  racket: { en: "Rackets", zh: "球拍" },
  shoes: { en: "Shoes", zh: "球鞋" },
  string: { en: "Strings", zh: "球线" },
  bag: { en: "Bags", zh: "球包" },
  shuttle: { en: "Shuttles", zh: "羽毛球" },
  grip: { en: "Grips", zh: "手胶" },
  accessory: { en: "Accessories", zh: "配件" },
};

function categoryLabel(cat: string, locale: SiteLocale): string {
  return categoryLabels[cat]?.[locale] ?? cat;
}

export function BrandsPage({ locale }: { locale: SiteLocale }) {
  const c = copy[locale];

  const brandsJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${companyInfo.siteUrl}/${locale}/brands/#list`,
    name: c.hero,
    inLanguage: "en",
    numberOfItems: brands.length,
    itemListElement: brands.map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Brand",
        "@id": `${companyInfo.siteUrl}/${locale}/brands/#${b.id}`,
        name: b.name,
        url: b.officialUrl,
        description: b.knownFor,
      },
    })),
  };

  return (
    <main className="flex-1 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(brandsJsonLd) }}
      />
      <article className="layout-band max-w-5xl space-y-10">
        <header className="space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight text-[var(--text)]">
            {c.hero}
          </h1>
          <p className="text-lg text-[var(--color-muted)]">{c.dek}</p>
          <p className="text-sm text-[var(--color-muted)]">{c.methodology}</p>
        </header>

        {tierOrder.map((tier) => {
          const tierBrands = brands.filter((b) => b.tier === tier);
          if (tierBrands.length === 0) return null;
          return (
            <section key={tier} className="space-y-4">
              <h2 className="text-2xl font-semibold text-[var(--text)]">
                {BRAND_TIER_LABELS[tier][locale]}
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {tierBrands.map((b) => (
                  <article
                    key={b.id}
                    id={b.id}
                    className="card p-6"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="text-xl font-semibold text-[var(--text)]">
                        {b.name}
                        
                      </h3>
                      <a
                        href={b.officialUrl}
                        target="_blank"
                        rel="noreferrer noopener nofollow"
                        className="text-sm text-[var(--color-accent)] hover:underline"
                      >
                        {c.visit} →
                      </a>
                    </div>
                    <p className="mt-2 text-xs text-[var(--color-muted)]">
                      {c.founded} {b.founded} · {c.country} {b.country}
                    </p>
                    <p className="mt-3 text-sm text-[var(--color-muted)]">
                      {b.knownFor}
                    </p>
                    <div className="mt-4">
                      <p className="text-xs uppercase tracking-wide text-[var(--color-muted)]">
                        {c.coverage}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {b.categoriesCovered.map((cat) => (
                          <span
                            key={cat}
                            className="rounded-full bg-[var(--color-accent-soft)] px-2.5 py-0.5 text-xs text-[var(--text)]"
                          >
                            {categoryLabel(cat, locale)}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          );
        })}

        <section className="card p-6">
          <h2 className="text-xl font-semibold text-[var(--text)]">
            {c.requestHeading}
          </h2>
          <p className="mt-2 text-sm text-[var(--color-muted)]">
            {c.requestBody} {companyInfo.contactEmail}
          </p>
        </section>
      </article>
    </main>
  );
}
