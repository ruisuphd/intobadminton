import Link from "next/link";
import { companyInfo } from "@/lib/company";
import { buildLocalizedPath, type SiteLocale } from "@/lib/locale";

type SourceEntry = {
  name: string;
  url: string;
  region: string;
  use: string;
};

const officialSources: SourceEntry[] = [
  { name: "Yonex official", url: "https://www.yonex.com/badminton/", region: "Global", use: "Specs, balance, weight variants, string tension range" },
  { name: "Victor Sport", url: "https://www.victorsport.com/", region: "Global", use: "Specs, racket frame data, shoes" },
  { name: "Li-Ning badminton", url: "https://lining.com/", region: "Global", use: "Specs, shoe lasts, racket lines" },
  { name: "Kawasaki", url: "https://kawasaki-sport.com/", region: "Asia", use: "Entry-level rackets and strings" },
  { name: "Mizuno badminton", url: "https://www.mizuno.com/", region: "Global", use: "Shoes, fit data" },
];

const communitySources: SourceEntry[] = [
  { name: "BadmintonCentral forum", url: "https://www.badmintoncentral.com/forums/", region: "Global EN", use: "Long-term review threads, restring feedback, regional availability" },
  { name: "Reddit r/badminton", url: "https://www.reddit.com/r/badminton/", region: "Global EN", use: "Recent first-impression posts, community sentiment, beginner questions" },
  { name: "BadmintonCN (中羽在线)", url: "https://badmintoncn.com/", region: "China ZH", use: "Chinese-language reviews, racket-by-racket discussions, 中羽 ladder context" },
  { name: "Tieba 羽毛球吧", url: "https://tieba.baidu.com/", region: "China ZH", use: "Player-to-player discussions, equipment trades, regional preferences" },
  { name: "Badminton Bites (Reddit-adjacent)", url: "https://www.badmintonbites.com/", region: "EN reviews", use: "Long-form written reviews and comparisons" },
];

const videoSources: SourceEntry[] = [
  { name: "Badminton Insight", url: "https://www.youtube.com/@BadmintonInsight", region: "Global EN", use: "Detailed racket and shoe reviews with on-court testing" },
  { name: "Coaching Badminton", url: "https://www.youtube.com/@coachingbadminton", region: "Global EN", use: "Technique context that affects gear choice" },
  { name: "Badminton Famly", url: "https://www.youtube.com/@badmintonfamly", region: "Global EN", use: "Pro-level analysis, BWF event context" },
  { name: "Spinrider", url: "https://www.youtube.com/@spinrider", region: "Asia EN/ZH", use: "Racket testing in serious club play" },
];

const eventSources: SourceEntry[] = [
  { name: "BWF World Tour", url: "https://bwfworldtour.bwfbadminton.com/", region: "Global", use: "Event calendar, player results, equipment used in pro play" },
  { name: "Badminton World Federation", url: "https://corporate.bwfbadminton.com/", region: "Global", use: "Equipment regulations, shuttle and racket standards" },
];

type Copy = {
  hero: string;
  dek: string;
  philosophyHeading: string;
  philosophyBody: string[];
  triangulationHeading: string;
  triangulationBody: string;
  triangulationSteps: { title: string; body: string }[];
  rightsHeading: string;
  rightsBody: string[];
  sectionHeadings: {
    official: string;
    community: string;
    video: string;
    event: string;
  };
  columns: { source: string; region: string; use: string };
  reportHeading: string;
  reportBody: string;
  cta: string;
  ctaLink: string;
};

const copyEn: Copy = {
  hero: "Sources & editorial process",
  dek: "Where we get our data, how we triangulate it, and the rights model that keeps us off the line that AdSense calls 'thin or copied content'.",
  philosophyHeading: "What we believe",
  philosophyBody: [
    "Equipment recommendations are only as good as the evidence behind them. A single review — even from a player you trust — only describes one body, one technique, one string tension, and one shuttle speed. The job of a recommender site is to compress many such accounts into something that fits the user in front of it.",
    "That means our job is reading widely, not republishing. Below are the sources we read most, and the rules we follow when citing them.",
  ],
  triangulationHeading: "How we triangulate",
  triangulationBody:
    "For each product, we cross-check at least three classes of evidence before publishing a confidence label.",
  triangulationSteps: [
    {
      title: "1. Manufacturer official spec",
      body: "Weight variant, balance point, shaft flex, string tension range, foot last, sole compound. We link the official product page on every result that needs verification.",
    },
    {
      title: "2. Independent video and written reviews",
      body: "BadmintonCentral, BadmintonCN, Reddit, and YouTube reviewers (see list below). We paraphrase findings with attribution and a link out — never copied prose.",
    },
    {
      title: "3. Player-side context",
      body: "How does this product behave for a Div 4 doubles player? An advanced singles player on 28 lb tension? Where the founder's playing context applies, we add it as 'editor signal' alongside the cited reviews.",
    },
  ],
  rightsHeading: "Rights and copyright",
  rightsBody: [
    "We do not copy review text, even with translation. Forum and review content remains the property of the authors and platforms; we use metadata summaries and links.",
    "If you are an author or platform and want a citation removed or amended, email " +
      companyInfo.contactEmail +
      " with the page URL and the change requested. We respond within five business days.",
  ],
  sectionHeadings: {
    official: "Manufacturer official sources",
    community: "Community / forum sources",
    video: "Video reviewers",
    event: "Events and governing body",
  },
  columns: { source: "Source", region: "Region", use: "What we use it for" },
  reportHeading: "Spot a bad citation?",
  reportBody:
    "Tell us. Include the page URL, the source link, and what's wrong (broken, mis-attributed, or out of date).",
  cta: "Send a correction",
  ctaLink: "/contact/",
};

const copyZh: Copy = {
  hero: "信息来源与编辑流程",
  dek: "我们从哪里获取数据、如何交叉验证、以及让我们远离 AdSense 所谓“低质或抄袭内容”的版权模型。",
  philosophyHeading: "我们的立场",
  philosophyBody: [
    "装备推荐的好坏只取决于背后的证据。一条评测——即使出自你信任的球友——也只描述了某一种身体条件、某一种技术、某一种线磅和某一种球速。推荐站要做的，是把许多条这样的描述压缩成你可以信任的结论。",
    "因此我们的工作是“广泛阅读”而不是“批量复制”。下面是我们读得最多的几类来源，以及引用它们时遵循的规则。",
  ],
  triangulationHeading: "我们如何交叉验证",
  triangulationBody: "对每一款产品，我们至少要交叉至少三类证据，才会给出置信度标签。",
  triangulationSteps: [
    {
      title: "1. 厂商官方规格",
      body: "重量等级、平衡点、中杆硬度、线磅范围、鞋楦、外底材质。需要校验的产品卡都会附上厂商官网链接。",
    },
    {
      title: "2. 独立视频与文字评测",
      body: "BadmintonCentral、中羽、Reddit 与 YouTube 测评者（见下表）。我们以注明来源 + 转写 + 外链方式引用，绝不复制原文。",
    },
    {
      title: "3. 球员视角的语境",
      body: "对一名 Div 4 双打球员、对一名拉到 28 磅的进阶单打球员，这件装备表现如何？凡是创始人能以自身打法语境补充的，都会作为“编辑信号”附在引用之外。",
    },
  ],
  rightsHeading: "版权与来源",
  rightsBody: [
    "我们不复制评测原文，即便经过翻译。论坛与评测内容的版权属于原作者与平台；我们只保存元数据摘要 + 外链。",
    "如果你是作者或平台，希望某条引用被删除或修正，请将页面 URL 与修正内容发送至 " +
      companyInfo.contactEmail +
      "，我们会在 5 个工作日内回复。",
  ],
  sectionHeadings: {
    official: "厂商官方资料",
    community: "社区 / 论坛资料",
    video: "视频测评频道",
    event: "赛事与管理机构",
  },
  columns: { source: "来源", region: "区域", use: "我们用来做什么" },
  reportHeading: "发现错误引用？",
  reportBody: "请告诉我们。提交时请附上页面 URL、来源链接，以及问题描述（链接失效、归属错误、过期等）。",
  cta: "发送修正",
  ctaLink: "/contact/",
};

function SourceTable({
  title,
  rows,
  columns,
}: {
  title: string;
  rows: SourceEntry[];
  columns: { source: string; region: string; use: string };
}) {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-[var(--text)]">{title}</h3>
      <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-700">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-zinc-200 bg-[var(--surface)] text-xs uppercase tracking-wide text-[var(--color-muted)] dark:border-zinc-700">
              <th className="px-4 py-3">{columns.source}</th>
              <th className="px-4 py-3">{columns.region}</th>
              <th className="px-4 py-3">{columns.use}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.url}
                className="border-b border-zinc-100 last:border-b-0 dark:border-zinc-800"
              >
                <td className="px-4 py-3">
                  <a
                    href={row.url}
                    target="_blank"
                    rel="noreferrer noopener nofollow"
                    className="text-[var(--color-accent)] hover:underline"
                  >
                    {row.name}
                  </a>
                </td>
                <td className="px-4 py-3 text-[var(--color-muted)]">
                  {row.region}
                </td>
                <td className="px-4 py-3 text-[var(--color-muted)]">{row.use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function SourcesPage({ locale }: { locale: SiteLocale }) {
  const c = locale === "zh" ? copyZh : copyEn;

  return (
    <main className="flex-1 py-16">
      <article className="layout-band max-w-3xl space-y-10">
        <header className="space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight text-[var(--text)]">
            {c.hero}
          </h1>
          <p className="text-lg text-[var(--color-muted)]">{c.dek}</p>
        </header>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-[var(--text)]">
            {c.philosophyHeading}
          </h2>
          {c.philosophyBody.map((paragraph) => (
            <p key={paragraph} className="leading-relaxed text-[var(--color-muted)]">
              {paragraph}
            </p>
          ))}
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-[var(--text)]">
            {c.triangulationHeading}
          </h2>
          <p className="leading-relaxed text-[var(--color-muted)]">
            {c.triangulationBody}
          </p>
          <ul className="space-y-3">
            {c.triangulationSteps.map((s) => (
              <li
                key={s.title}
                className="rounded-2xl border border-zinc-200 bg-[var(--surface)] p-5 dark:border-zinc-700"
              >
                <p className="font-semibold text-[var(--text)]">{s.title}</p>
                <p className="mt-1 text-sm text-[var(--color-muted)]">{s.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-[var(--text)]">
            {c.rightsHeading}
          </h2>
          {c.rightsBody.map((paragraph) => (
            <p key={paragraph} className="leading-relaxed text-[var(--color-muted)]">
              {paragraph}
            </p>
          ))}
        </section>

        <section className="space-y-8">
          <SourceTable
            title={c.sectionHeadings.official}
            rows={officialSources}
            columns={c.columns}
          />
          <SourceTable
            title={c.sectionHeadings.community}
            rows={communitySources}
            columns={c.columns}
          />
          <SourceTable
            title={c.sectionHeadings.video}
            rows={videoSources}
            columns={c.columns}
          />
          <SourceTable
            title={c.sectionHeadings.event}
            rows={eventSources}
            columns={c.columns}
          />
        </section>

        <section className="space-y-3 rounded-2xl border border-zinc-200 bg-[var(--surface)] p-5 dark:border-zinc-700">
          <h2 className="text-xl font-semibold text-[var(--text)]">
            {c.reportHeading}
          </h2>
          <p className="text-sm text-[var(--color-muted)]">{c.reportBody}</p>
          <Link
            href={buildLocalizedPath(locale, c.ctaLink)}
            className="inline-flex h-10 items-center rounded-2xl bg-[var(--color-accent)] px-4 text-sm font-medium text-white"
          >
            {c.cta}
          </Link>
        </section>
      </article>
    </main>
  );
}
