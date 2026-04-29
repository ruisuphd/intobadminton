import Link from "next/link";
import { companyInfo } from "@/lib/company";
import { buildLocalizedPath, type SiteLocale } from "@/lib/locale";

type Copy = {
  hero: string;
  dek: string;
  founderHeading: string;
  founderBody: string[];
  editorialHeading: string;
  editorialBody: string[];
  editorialPrinciples: { title: string; body: string }[];
  monetizationHeading: string;
  monetizationBody: string[];
  contactHeading: string;
  contactBody: string;
  cta: string;
  ctaLink: string;
};

const copyEn: Copy = {
  hero: "About IntoBadminton",
  dek: "An equipment recommender written by a competitive player who got tired of guessing which racket would actually fit.",
  founderHeading: "Who's behind this",
  founderBody: [
    "I'm Rui Su. I started badminton as a kid in China, then continued through the Maynooth University team and across multiple Dublin clubs after I moved to Ireland. I've trained under a former Malaysian national-team player and a former Chinese provincial-team player, and currently compete in Division 4 of the Irish Badminton league.",
    "Outside the courts I run Intonation Labs (Singapore), where my day job is building production machine-learning systems. IntoBadminton is the equipment-recommender I always wanted as a player: structured data, transparent reasons, and citations to the people who actually tested the gear.",
  ],
  editorialHeading: "How recommendations are made",
  editorialBody: [
    "Every score the finder produces breaks down into five named factors: style fit, discipline fit, level fit, budget fit, and body / comfort fit. You can read the exact weighting on the methodology page.",
    "We treat sources in three tiers. Manufacturer official spec pages are the strongest signal. Editor interpretation translates those specs into how a frame usually feels on court. Community evidence — BadmintonCentral threads, Reddit, BadmintonCN, YouTube reviews — appears as cited metadata summaries with links, never as copied text.",
  ],
  editorialPrinciples: [
    {
      title: "We do not scrape.",
      body: "Third-party reviews are linked and paraphrased with attribution. Copying review text — even with translation — is a copyright issue and an AdSense policy violation, and it is also how recommender sites become noise.",
    },
    {
      title: "Confidence is visible.",
      body: "Every product card shows whether the official spec is verified, whether editor signal is from manufacturer materials or independent testing, and how many cited reviews back the result. Low-confidence items still appear, but they are labelled.",
    },
    {
      title: "Editorial separation from monetization.",
      body: "Display ads and any future affiliate links must be labelled and cannot silently override the fit score. The score is the score; sponsorship is sponsorship.",
    },
  ],
  monetizationHeading: "How this site is funded",
  monetizationBody: [
    "IntoBadminton runs Google AdSense ads after you grant consent. Ads are off by default and only load when you allow non-essential cookies. We may add affiliate retailer links in the future; those will be clearly labelled and will not change the recommendation order.",
    "If you want to support the project without ads, the best thing you can do is share the finder with a teammate, send corrections to product data, or contribute a review with explicit usage rights.",
  ],
  contactHeading: "Contact",
  contactBody: `Email ${companyInfo.contactEmail} for product data corrections, rights or copyright concerns, privacy questions, or recommendation issues. Include the product brand, model, region, and source link when you can — it speeds up the fix.`,
  cta: "Try the finder",
  ctaLink: "/quiz/",
};

const copyZh: Copy = {
  hero: "关于 IntoBadminton",
  dek: "由一名仍在打比赛的球员搭建的装备推荐站。我们厌倦了在球拍前靠猜，于是把推荐逻辑公开化。",
  founderHeading: "幕后是谁",
  founderBody: [
    "我是 Rui Su。童年在中国开始打球，移居爱尔兰后继续在 Maynooth 大学校队和都柏林多家俱乐部训练。曾接受前马来西亚国家队球员与前中国省队球员的指导，目前在爱尔兰联赛 Division 4 出战。",
    "球场之外，我经营注册于新加坡的 Intonation Labs，主业是搭建落地的机器学习系统。IntoBadminton 是我一直想要的那种装备推荐工具：结构化的数据、可看见的推荐理由，以及对真正测试过装备的人的引用。",
  ],
  editorialHeading: "推荐是如何产生的",
  editorialBody: [
    "推荐分数会拆成五个具名因子：打法匹配、单/双打匹配、水平匹配、预算匹配以及身体舒适度匹配。详细权重写在方法页。",
    "证据分三档。品牌官网规格是最强信号；编辑判断把规格翻译成实际手感；社区证据（BadmintonCentral、Reddit、中羽、YouTube 测评等）以注明来源的元数据摘要 + 链接形式呈现，绝不复制原文。",
  ],
  editorialPrinciples: [
    {
      title: "我们不抓取。",
      body: "第三方评测以转写 + 链接 + 出处的方式引用。即便是翻译复制评测原文，也属于版权问题、违反 AdSense 政策，并会让推荐结果变成噪音。",
    },
    {
      title: "置信度对你可见。",
      body: "每张产品卡都会显示官方规格是否经过校验、编辑信号来自厂商材料还是独立测试，以及背后有多少条社区证据。低置信度的产品依然展示，但会标明。",
    },
    {
      title: "推荐与商业分离。",
      body: "展示广告以及未来的零售联盟链接都必须明示，不会悄悄改变匹配分。分数就是分数，赞助就是赞助。",
    },
  ],
  monetizationHeading: "网站的资金来源",
  monetizationBody: [
    "在你同意非必要 Cookie 之后，IntoBadminton 会显示 Google AdSense 广告；默认关闭。我们将来可能加入零售联盟链接，会清楚标注，不会改变推荐顺序。",
    "如果你想支持这个项目而不是看广告：把推荐工具分享给队友、提交产品数据修正，或者带着授权一同贡献一段你的真实评测。",
  ],
  contactHeading: "联系",
  contactBody: `产品数据更正、版权与来源相关问题、隐私问题、推荐结果反馈，请联系 ${companyInfo.contactEmail}。提交时请尽量附上品牌、型号、地区和官方来源链接，可以加速处理。`,
  cta: "开始使用推荐",
  ctaLink: "/quiz/",
};

export function AboutPage({ locale }: { locale: SiteLocale }) {
  const c = locale === "zh" ? copyZh : copyEn;

  const aboutJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${companyInfo.siteUrl}/${locale}/about/#about`,
    name: c.hero,
    inLanguage: locale === "zh" ? "zh-Hans" : "en",
    mainEntity: {
      "@type": "Person",
      name: companyInfo.founderName,
      url: companyInfo.founderWebsite,
      jobTitle: "Founder",
      description: companyInfo.founderDescription,
      worksFor: {
        "@type": "Organization",
        name: companyInfo.operatorLegalName,
        url: companyInfo.operatorWebsite,
      },
    },
  };

  return (
    <main className="flex-1 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      <article className="layout-band max-w-3xl space-y-10">
        <header className="space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight text-[var(--text)]">
            {c.hero}
          </h1>
          <p className="text-lg text-[var(--color-muted)]">{c.dek}</p>
        </header>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-[var(--text)]">
            {c.founderHeading}
          </h2>
          {c.founderBody.map((paragraph) => (
            <p key={paragraph} className="leading-relaxed text-[var(--color-muted)]">
              {paragraph}
            </p>
          ))}
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-[var(--text)]">
            {c.editorialHeading}
          </h2>
          {c.editorialBody.map((paragraph) => (
            <p key={paragraph} className="leading-relaxed text-[var(--color-muted)]">
              {paragraph}
            </p>
          ))}
          <ul className="space-y-3">
            {c.editorialPrinciples.map((p) => (
              <li
                key={p.title}
                className="card p-6"
              >
                <p className="font-semibold text-[var(--text)]">{p.title}</p>
                <p className="mt-1 text-sm text-[var(--color-muted)]">{p.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-[var(--text)]">
            {c.monetizationHeading}
          </h2>
          {c.monetizationBody.map((paragraph) => (
            <p key={paragraph} className="leading-relaxed text-[var(--color-muted)]">
              {paragraph}
            </p>
          ))}
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-[var(--text)]">
            {c.contactHeading}
          </h2>
          <p className="leading-relaxed text-[var(--color-muted)]">
            {c.contactBody}
          </p>
        </section>

        <div className="card p-6">
          <Link
            href={buildLocalizedPath(locale, c.ctaLink)}
            className="inline-flex h-11 items-center rounded-2xl bg-[var(--color-accent)] px-5 text-sm font-medium text-white"
          >
            {c.cta}
          </Link>
        </div>
      </article>
    </main>
  );
}
