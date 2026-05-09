import { companyInfo } from "@/lib/company";
import type { SiteLocale } from "@/lib/locale";

const pages = {
  methodology: {
    en: {
      title: "Recommendation methodology",
      body: [
        "IntoBadminton uses a transparent heuristic rather than a black-box model. We score style, discipline, level, budget, body comfort, foot width, tension, and category-specific specs separately, then show the most important reasons on each result.",
        "Product-specific official pages are treated as the strongest source for specs. Editor interpretation explains how those specs may feel on court. Community evidence is displayed only as metadata summaries and links when rights are limited.",
      ],
    },
    zh: {
      title: "推荐方法",
      body: [
        "IntoBadminton 使用透明的启发式评分，而不是黑箱模型。系统会分别评估打法、项目、水平、预算、身体舒适度、脚宽、磅数和分类规格，再在结果中展示主要原因。",
        "品牌官网规格是最强证据。编辑判断用于解释这些规格在场上的常见手感。社区评价在授权有限时只展示元数据摘要和链接。",
      ],
    },
  },
  sourcePolicy: {
    en: {
      title: "Source and copyright policy",
      body: [
        "Official product pages are the primary source for specifications. Third-party reviews, forums, Reddit, BadmintonCN, retailers, and blogs are permission-gated evidence, not content to bulk copy.",
        "The safe v1 policy stores source names, links, language, themes, confidence, and human-readable summaries. It does not display copied third-party excerpts unless rights allow it.",
      ],
    },
    zh: {
      title: "来源和版权政策",
      body: [
        "产品规格优先来自品牌官网。第三方评价、论坛、Reddit、BadmintonCN、零售商和博客都属于需要权限约束的证据，而不是可以批量复制的内容。",
        "v1 的安全做法是保存来源名称、链接、语言、主题、置信度和人工摘要；未经许可不展示第三方原文摘录。",
      ],
    },
  },
  security: {
    en: {
      title: "Security",
      body: [
        "IntoBadminton v1 is a static site with no production database, account system, or payment flow. Profiles, compare lists, history, and review drafts are stored locally in the browser.",
        "AdSense remains deployment-disabled until a compliant consent mode is configured. Security headers must be enforced at the host or CDN layer.",
      ],
    },
    zh: {
      title: "安全",
      body: [
        "IntoBadminton v1 是静态站点，没有生产数据库、账户系统或支付流程。推荐画像、对比列表、历史和评价草稿保存在浏览器本地。",
        "AdSense 在部署层默认关闭，直到配置合规的同意模式。安全响应头需要在托管平台或 CDN 层配置。",
      ],
    },
  },
  privacy: {
    en: {
      title: "Privacy",
      body: [
        "The static v1 app stores finder profile, comparison choices, history, consent, theme, and local review drafts in your browser. No account is required.",
        "Analytics and advertising are off by default until you choose otherwise. Global Privacy Control disables advertising and personalization preferences.",
      ],
    },
    zh: {
      title: "隐私",
      body: [
        "静态 v1 会把推荐画像、对比选择、历史、同意记录、主题和本地评价草稿保存在你的浏览器中，不需要账户。",
        "分析和广告默认关闭，只有在你同意后才会启用。Global Privacy Control 会关闭广告和个性化选项。",
      ],
    },
  },
  cookies: {
    en: {
      title: "Cookies and local storage",
      body: [
        "Necessary local storage keeps the finder, comparison list, theme, consent choices, and local review drafts working.",
        "GA4 and AdSense load only after the relevant consent choice and environment configuration are present.",
      ],
    },
    zh: {
      title: "Cookie 和本地存储",
      body: [
        "必要的本地存储用于保存推荐问卷、对比列表、主题、同意选择和本地评价草稿。",
        "GA4 和 AdSense 只有在你同意并且站点配置了对应环境变量后才会加载。",
      ],
    },
  },
  terms: {
    en: {
      title: "Terms",
      body: [
        "IntoBadminton provides informational equipment recommendations. Specs, prices, and availability can change by region and should be verified before purchase.",
        "Comfort and injury-related notes are not medical advice. Try equipment in person when possible.",
      ],
    },
    zh: {
      title: "条款",
      body: [
        "IntoBadminton 提供信息型装备推荐。规格、价格和地区供货可能变化，购买前请自行核实。",
        "舒适度和伤病相关提示不构成医疗建议。有条件时请尽量试打。",
      ],
    },
  },
  contact: {
    en: {
      title: "Contact",
      body: [
        `IntoBadminton is operated by ${companyInfo.operatorLegalName}, a Singapore-registered company. Contact ${companyInfo.contactEmail} for support, product data issues, rights concerns, privacy questions, or recommendation problems.`,
        "For product corrections, include the brand, model, region, official source link, and the field that needs review.",
      ],
    },
    zh: {
      title: "联系",
      body: [
        `IntoBadminton 由 ${companyInfo.operatorLegalName} 运营，公司注册地为新加坡。支持、产品数据、版权/来源、隐私或推荐问题可联系 ${companyInfo.contactEmail}。`,
        "提交产品修正时，请包含品牌、型号、地区、官方来源链接和需要检查的字段。",
      ],
    },
  },
} as const;

export type SimplePageKey = keyof typeof pages;

export function LocalizedSimplePage({
  locale,
  page,
}: {
  locale: SiteLocale;
  page: SimplePageKey;
}) {
  const copy = pages[page][locale];

  return (
    <main className="flex-1 py-16">
      <article className="layout-band max-w-3xl space-y-5 text-[var(--color-muted)]">
        <h1 className="text-3xl font-semibold text-[var(--text)]">
          {copy.title}
        </h1>
        {copy.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </article>
    </main>
  );
}
