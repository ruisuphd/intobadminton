import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { buildLocalizedPath, isSupportedLocale, type SiteLocale } from "@/lib/locale";

const guideSlugs = [
  "string-tension",
  "shoes-footwork",
  "racket-balance",
  "season-refresh",
  "doubles-roles",
  "wide-feet-badminton-shoes",
] as const;

type GuideSlug = (typeof guideSlugs)[number];

function isGuideSlug(value: string): value is GuideSlug {
  return (guideSlugs as readonly string[]).includes(value);
}

const guideCopy: Record<
  GuideSlug,
  Record<SiteLocale, { title: string; intro: string; points: string[] }>
> = {
  "string-tension": {
    en: {
      title: "String tension by level and style",
      intro:
        "String tension changes launch angle, timing window, and comfort. The best number is the one you can repeat under match pressure.",
      points: [
        "Lower tension usually gives a larger timing window and friendlier clears.",
        "Higher tension can sharpen control, but punishes late contact and tired technique.",
        "Pair stiff rackets with conservative tension if you are managing elbow, shoulder, or wrist comfort.",
      ],
    },
    zh: {
      title: "按水平和打法选择磅数",
      intro:
        "球线磅数会改变出球角度、发力窗口和舒适度。真正适合的磅数，是比赛压力下仍能稳定打出来的磅数。",
      points: [
        "较低磅数通常容错更大，更容易借力打后场。",
        "较高磅数控制更直接，但会惩罚慢半拍的击球和疲劳时的动作。",
        "如果球拍很硬，且手肘、肩或手腕需要照顾，建议先保守选择磅数。",
      ],
    },
  },
  "shoes-footwork": {
    en: {
      title: "Shoes and footwork",
      intro:
        "Badminton shoes should be judged by lateral stability, fit security, and court feel before fashion or cushion height.",
      points: [
        "Wide feet need enough forefoot room without heel slip.",
        "A stable outsole matters for split steps, lunges, and recovery hops.",
        "Replace shoes when the outsole loses grip or the upper no longer locks your foot.",
      ],
    },
    zh: {
      title: "羽毛球鞋和步法",
      intro:
        "羽毛球鞋应先看侧向稳定、包裹和场地反馈，再看外观或缓震厚度。",
      points: [
        "宽脚需要前掌空间，但后跟不能滑。",
        "稳定的大底会影响启动、跨步和回动。",
        "当外底抓地下降或鞋面包裹变松，就该考虑更换。",
      ],
    },
  },
  "racket-balance": {
    en: {
      title: "Racket balance and flex",
      intro:
        "Head weight and shaft flex decide how quickly a racket starts, how hard it loads, and how demanding it feels when timing is late.",
      points: [
        "Head-heavy frames help rear-court power but slow defensive recovery.",
        "Head-light frames favor drives, blocks, and fast doubles exchanges.",
        "Extra-stiff shafts are useful only when your contact timing is clean and repeatable.",
      ],
    },
    zh: {
      title: "球拍平衡点和中杆硬度",
      intro:
        "拍头重量和中杆硬度会影响启动速度、蓄力方式，以及击球慢半拍时的难度。",
      points: [
        "头重球拍更利于后场进攻，但防守回位会更慢。",
        "头轻球拍更适合平抽、挡网和快速双打交换。",
        "超硬中杆只有在击球点稳定、发力干净时才值得选择。",
      ],
    },
  },
  "season-refresh": {
    en: {
      title: "When to refresh gear",
      intro:
        "Refreshing equipment should solve a real performance or comfort problem, not just chase a new launch.",
      points: [
        "Replace grips when they slip or force excess hand tension.",
        "Restring when the bed feels dead, launches unpredictably, or has visible notching.",
        "Re-check racket fit after your level, discipline, or injury status changes.",
      ],
    },
    zh: {
      title: "什么时候该更新装备",
      intro: "更新装备应解决真实的表现或舒适度问题，而不是单纯追新。",
      points: [
        "手胶打滑或让手过度紧张时就该更换。",
        "线床发木、出球不稳定或有明显磨损时应重新穿线。",
        "水平、项目或伤病状态变化后，应重新检查球拍是否合适。",
      ],
    },
  },
  "doubles-roles": {
    en: {
      title: "Doubles roles and racket choice",
      intro:
        "Doubles equipment choices depend on whether you win points by interception speed, rear-court pressure, or balanced rotation.",
      points: [
        "Front-court players usually benefit from faster heads and shorter recovery.",
        "Back-court attackers may accept more swing weight for heavier smashes.",
        "Rotating pairs often do best with even or mildly head-heavy frames.",
      ],
    },
    zh: {
      title: "双打位置和球拍选择",
      intro:
        "双打装备取决于你主要靠网前拦截、后场压制，还是轮转均衡来赢分。",
      points: [
        "网前球员通常更需要快速拍头和短回收时间。",
        "后场进攻手可以接受更高挥重来换取杀球重量。",
        "经常轮转的搭档通常更适合均衡或轻微头重的球拍。",
      ],
    },
  },
  "wide-feet-badminton-shoes": {
    en: {
      title: "Badminton shoes for wide feet",
      intro:
        "Wide-foot comfort is not just more size. The shoe must hold the heel while giving the forefoot enough room during lunges.",
      points: [
        "Try shoes with badminton socks and lateral movement, not just standing still.",
        "Avoid sizing up so far that the heel lifts during recovery steps.",
        "Track pressure points after the first sessions before trusting a fit.",
      ],
    },
    zh: {
      title: "宽脚如何选羽毛球鞋",
      intro:
        "宽脚舒适不是单纯买大半码。鞋子需要在跨步时给前掌空间，同时稳住后跟。",
      points: [
        "试鞋时穿羽毛球袜，并做侧向移动，不要只站着试。",
        "不要为了前掌空间买到后跟明显滑动。",
        "前几次上场后记录压迫点，再判断是否真的合脚。",
      ],
    },
  },
};

export function generateStaticParams() {
  return guideSlugs.flatMap((slug) => [
    { locale: "en", slug },
    { locale: "zh", slug },
  ]);
}

export default async function LocalizedGuideArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const safeLocale = isSupportedLocale(locale) ? locale : "en";
  const safeSlug = isGuideSlug(slug) ? slug : "racket-balance";
  const copy = guideCopy[safeSlug][safeLocale];

  return (
    <main className="flex-1 py-16">
      <article className="layout-band max-w-3xl space-y-5">
        <Link
          href={buildLocalizedPath(safeLocale, "/guides/")}
          className="text-sm text-[var(--color-accent)] hover:underline"
        >
          ← {safeLocale === "zh" ? "装备指南" : "Guides"}
        </Link>
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--text)]">
          {copy.title}
        </h1>
        <p className="text-[var(--color-muted)] leading-relaxed">
          {copy.intro}
        </p>
        <ul className="space-y-3 text-[var(--color-muted)]">
          {copy.points.map((point) => (
            <li key={point} className="rounded-2xl border border-zinc-200 bg-[var(--surface)] p-4 dark:border-zinc-700">
              {point}
            </li>
          ))}
        </ul>
        <AdSlot id={`${safeLocale}-${slug}-mid`} />
      </article>
    </main>
  );
}
