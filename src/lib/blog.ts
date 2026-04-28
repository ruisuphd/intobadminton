import type { SiteLocale } from "@/lib/locale";

export type BlogSlug =
  | "racket-balance-vs-swing-speed"
  | "how-to-read-badminton-reviews"
  | "beginner-racket-mistakes"
  | "badminton-string-selector"
  | "badminton-shoe-fit-stability"
  | "badminton-bag-loadout"
  | "used-racket-depreciation";

export const blogSlugs: BlogSlug[] = [
  "racket-balance-vs-swing-speed",
  "how-to-read-badminton-reviews",
  "beginner-racket-mistakes",
  "badminton-string-selector",
  "badminton-shoe-fit-stability",
  "badminton-bag-loadout",
  "used-racket-depreciation",
];

export type BlogArticle = {
  slug: BlogSlug;
  updatedAt: string;
  title: string;
  dek: string;
  sections: { heading: string; body: string }[];
  cta: string;
};

export const blogArticles: Record<SiteLocale, BlogArticle[]> = {
  en: [
    {
      slug: "racket-balance-vs-swing-speed",
      updatedAt: "2026-04-28",
      title: "Racket balance vs swing speed: why the best smash racket may not fit you",
      dek: "A practical guide to matching head weight, timing, and doubles speed without chasing the most powerful spec on paper.",
      sections: [
        {
          heading: "The tradeoff",
          body: "Head-heavy rackets can help load a bigger smash, but they also ask more from your shoulder, timing, and recovery. If your points are won through blocks, drives, and interceptions, a faster frame may produce better match results than a heavier power frame.",
        },
        {
          heading: "How reviews can mislead",
          body: "Online reviews often come from players with different technique, string tension, shuttle speed, and playing role. Treat review themes as signals, not verdicts. A phrase like powerful is only useful when you know whether the reviewer plays singles, rear-court doubles, or front-court pressure.",
        },
        {
          heading: "What IntoBadminton does",
          body: "The finder weighs official balance and shaft information first, then adds editor interpretation and rights-safe review themes. It lowers confidence when a model needs source verification.",
        },
      ],
      cta: "Run the finder with your level, role, and comfort flags.",
    },
    {
      slug: "how-to-read-badminton-reviews",
      updatedAt: "2026-04-28",
      title: "How to read badminton equipment reviews without copying someone else’s fit",
      dek: "A review is useful only when you translate it through the reviewer’s level, setup, and style.",
      sections: [
        {
          heading: "Start with context",
          body: "Look for the reviewer’s level, event, racket weight, grip size, string, tension, and how long they tested the product. One session can reveal first feel, but it cannot prove durability or long-term comfort.",
        },
        {
          heading: "Separate fact from feel",
          body: "Weight variant, grip sizes, official flex, and listed tension range are factual specs. Words like crisp, dead, heavy, forgiving, or unstable are subjective and should be compared across multiple sources.",
        },
        {
          heading: "Respect source rights",
          body: "Community posts are valuable, but copying or translating review text without permission creates rights risk. IntoBadminton uses metadata summaries and links unless explicit rights allow more.",
        },
      ],
      cta: "Use reviews as evidence, then let your profile filter the shortlist.",
    },
    {
      slug: "beginner-racket-mistakes",
      updatedAt: "2026-04-28",
      title: "Three beginner racket mistakes that make badminton harder",
      dek: "Avoid buying a frame that fights your timing before your technique is ready.",
      sections: [
        {
          heading: "Buying too stiff too early",
          body: "Extra-stiff shafts reward clean timing. For recreational and early club players, they can make clears shorter and mishits harsher. A little more flex often helps learning.",
        },
        {
          heading: "Ignoring total setup",
          body: "A head-heavy racket, high tension, thick grip, and slow shuttles can stack into a demanding setup. Change one variable at a time so you know what helped.",
        },
        {
          heading: "Overvaluing price",
          body: "The best beginner racket is not the most expensive pro frame. It is the racket that lets you repeat length, recover in defense, and play pain-free.",
        },
      ],
      cta: "Start with a profile-based recommendation, then demo if possible.",
    },
    {
      slug: "badminton-string-selector",
      updatedAt: "2026-04-28",
      title: "BG80, EXBOLT 63, or BG65: choosing strings by outcome",
      dek: "Strings change control, repulsion, comfort, and cost per session more than many players expect.",
      sections: [
        {
          heading: "Start with what you want to fix",
          body: "If clears need help and defense feels late, a livelier thin string can add repulsion. If slices, drops, and net control are your priority, a rougher control string may be worth the extra effort. If you break strings often, durability and tension hold should outrank sound.",
        },
        {
          heading: "Match tension to level",
          body: "Higher tension can sharpen feedback, but it narrows the sweet spot and punishes late contact. Most club players get better ROI by changing two pounds at a time and logging week-one versus week-three feel.",
        },
        {
          heading: "Why we score strings separately",
          body: "A racket recommendation without string context is incomplete. IntoBadminton now treats strings as their own category because a forgiving racket with an unforgiving string can still feel wrong.",
        },
      ],
      cta: "Run the finder for string-specific recommendations.",
    },
    {
      slug: "badminton-shoe-fit-stability",
      updatedAt: "2026-04-28",
      title: "Badminton shoe fit: why width and stability beat brand loyalty",
      dek: "The best shoe is the one that locks your foot during lunges without creating pressure points.",
      sections: [
        {
          heading: "Width is not just size",
          body: "Going longer to solve a narrow toe box can create heel slip and slower recovery. A better fit keeps the heel locked while leaving enough forefoot room for lateral lunges.",
        },
        {
          heading: "Protection has a weight cost",
          body: "Protective shoes often feel more stable and cushioned, but may not feel as quick as low-profile speed shoes. For knee, ankle, or heel comfort flags, the recommendation engine gives more credit to stability and cushioning.",
        },
        {
          heading: "Try movement, not standing",
          body: "Static comfort is not enough. Test split steps, side lunges, toe drags, and braking movements with the socks you actually use.",
        },
      ],
      cta: "Use foot width and comfort flags in the shoe finder.",
    },
    {
      slug: "badminton-bag-loadout",
      updatedAt: "2026-04-28",
      title: "What your badminton bag should carry for a normal club session",
      dek: "A good bag reduces friction: shoes, wet clothes, spare racket, grip, and shuttle storage should not fight each other.",
      sections: [
        {
          heading: "Capacity is workflow",
          body: "A two-racket commute bag is fine for casual games. A regular club night often needs more: shoes, towel, clean shirt, wet kit, water bottle, grips, and a spare racket.",
        },
        {
          heading: "Compartment design matters",
          body: "Shoe and wet compartments are not luxury features if you play after work or carry clean clothes. They keep odor and moisture away from rackets and electronics.",
        },
        {
          heading: "Why bag recommendations improve retention",
          body: "Bag content is a repeat-use habit. A loadout checklist gives players a reason to revisit before sessions, and it creates natural future content around replacement grips, shuttles, and seasonal refreshes.",
        },
      ],
      cta: "Run the finder for bag recommendations by session style.",
    },
    {
      slug: "used-racket-depreciation",
      updatedAt: "2026-04-28",
      title: "Used racket depreciation: how much value does badminton gear keep?",
      dek: "Resale value depends on brand demand, authenticity, generation, region, condition, and whether the model still has hype.",
      sections: [
        {
          heading: "The big drivers",
          body: "Recognizable flagship Yonex, Victor, and Li-Ning models usually have better resale liquidity than obscure or entry-tier rackets. Cosmetic chips, clashes, missing serial confidence, and unknown stringing history reduce value quickly.",
        },
        {
          heading: "Why IntoBadminton shows estimates",
          body: "A higher purchase price can still be rational if the product keeps value and is easy to resell. The app now shows depreciation estimates as decision support, not as guaranteed market prices.",
        },
        {
          heading: "How to use the number",
          body: "Treat resale as a risk band. If two recommendations fit equally, the one with stronger resale liquidity may have better real cost of ownership.",
        },
      ],
      cta: "Compare recommendations with resale and depreciation visible.",
    },
  ],
  zh: [
    {
      slug: "racket-balance-vs-swing-speed",
      updatedAt: "2026-04-28",
      title: "平衡点 vs 挥速：为什么最强杀球拍未必适合你",
      dek: "用打法、时机和双打速度来看头重球拍，而不是只追纸面进攻性能。",
      sections: [
        {
          heading: "核心取舍",
          body: "头重球拍可能帮助杀球蓄力，但也更考验肩部、击球时机和回位。如果你的得分来自防守、平抽和网前拦截，更快的球拍可能比更重的进攻拍更有效。",
        },
        {
          heading: "评价为什么会误导",
          body: "线上评价常来自不同水平、磅数、球速和场上位置的玩家。把评价当作信号，不要当作结论。比如“很暴力”这句话，只有在知道评价者打单打、后场双打还是网前封网时才有意义。",
        },
        {
          heading: "IntoBadminton 如何处理",
          body: "推荐器优先使用官方平衡和中杆信息，再加入编辑解释和合规的评价主题。需要来源核验的型号会降低置信度。",
        },
      ],
      cta: "用你的水平、位置和舒适度标签跑一次推荐。",
    },
    {
      slug: "how-to-read-badminton-reviews",
      updatedAt: "2026-04-28",
      title: "如何读懂羽毛球装备评价，而不是照抄别人的适配",
      dek: "评价只有结合评价者水平、配置和打法后才真正有用。",
      sections: [
        {
          heading: "先看背景",
          body: "优先寻找评价者水平、项目、重量规格、手柄、球线、磅数和测试时长。一次试打能说明初始手感，但不能证明耐用性和长期舒适度。",
        },
        {
          heading: "区分事实和感受",
          body: "重量规格、手柄尺寸、官方中杆硬度和建议磅数是事实。清脆、发木、重、容错、发飘等词是主观感受，需要跨来源比较。",
        },
        {
          heading: "尊重来源版权",
          body: "社区帖子很有价值，但未经许可复制或翻译评价原文会带来版权风险。IntoBadminton 默认只使用元数据摘要和链接。",
        },
      ],
      cta: "把评价作为证据，再用你的画像过滤候选。",
    },
    {
      slug: "beginner-racket-mistakes",
      updatedAt: "2026-04-28",
      title: "新手买拍最容易犯的三个错误",
      dek: "不要在技术稳定前买一支和你击球时机对抗的球拍。",
      sections: [
        {
          heading: "太早买超硬",
          body: "超硬中杆奖励干净的击球时机。对休闲和初级俱乐部玩家来说，它可能让后场更短、失误更震手。更友好的中杆通常更利于学习。",
        },
        {
          heading: "忽视整体配置",
          body: "头重球拍、高磅、厚手胶和慢球会叠加成很难驾驭的配置。一次只改一个变量，才知道真正帮到你的是什么。",
        },
        {
          heading: "过度相信价格",
          body: "最适合新手的球拍不是最贵的职业款，而是能让你稳定打到后场、防守能回位、并且不疼的球拍。",
        },
      ],
      cta: "先用画像推荐，再尽量试打。",
    },
    {
      slug: "badminton-string-selector",
      updatedAt: "2026-04-28",
      title: "BG80、EXBOLT 63 还是 BG65：按结果选择羽毛球线",
      dek: "球线对控制、弹性、舒适度和每次打球成本的影响，比很多玩家想象更大。",
      sections: [
        {
          heading: "先判断你想解决什么",
          body: "如果后场借力不够、防守总是慢半拍，弹性更强的细线可能有帮助。如果你重视搓放、切球和网前控制，粗糙感更强的控制线可能更适合。如果经常断线，耐用和保磅应该排在声音之前。",
        },
        {
          heading: "磅数要匹配水平",
          body: "高磅能让反馈更清晰，但甜区更小，也更惩罚晚点击球。多数俱乐部玩家更适合每次只改两磅，并记录第一周和第三周手感变化。",
        },
        {
          heading: "为什么单独给球线打分",
          body: "没有球线语境的球拍推荐是不完整的。IntoBadminton 现在把球线作为独立类别，因为友好的球拍配上不友好的球线仍然可能不好打。",
        },
      ],
      cta: "用推荐器查看球线专属建议。",
    },
    {
      slug: "badminton-shoe-fit-stability",
      updatedAt: "2026-04-28",
      title: "羽毛球鞋适配：为什么脚宽和稳定性比品牌忠诚更重要",
      dek: "最好的球鞋，是能在弓步中锁住你的脚，又不会制造压迫点的鞋。",
      sections: [
        {
          heading: "脚宽不只是尺码",
          body: "用大一码解决前掌挤脚，可能带来后跟滑动和回位变慢。更好的适配是后跟锁定，同时前掌在横向弓步时有足够空间。",
        },
        {
          heading: "保护性有重量成本",
          body: "保护型球鞋通常更稳定、缓震更足，但不一定像低重心速度鞋那样轻快。若填写了膝盖、脚踝或脚跟舒适度标签，推荐器会提高稳定和缓震权重。",
        },
        {
          heading: "试鞋要试动作，不只站立",
          body: "静态舒服不够。请穿真实打球袜测试启动、侧向弓步、拖步和急停。",
        },
      ],
      cta: "在球鞋推荐中填写脚宽和舒适度标签。",
    },
    {
      slug: "badminton-bag-loadout",
      updatedAt: "2026-04-28",
      title: "一次俱乐部羽毛球局，球包里应该装什么？",
      dek: "好球包能减少麻烦：鞋、湿衣、备用拍、手胶和球筒不应该互相打架。",
      sections: [
        {
          heading: "容量就是流程",
          body: "两支拍的通勤包适合轻量休闲局。固定俱乐部训练通常需要更多：球鞋、毛巾、干净衣服、湿衣、水瓶、手胶和备用球拍。",
        },
        {
          heading: "分区设计很关键",
          body: "如果你下班后打球，或者需要带干净衣服，鞋仓和湿衣分区就不是奢侈功能。它们能把气味和水汽从球拍与电子设备旁边隔开。",
        },
        {
          heading: "为什么球包推荐能提升复访",
          body: "球包内容是重复使用习惯。赛前清单会让用户在每次打球前回来查看，也自然延伸到手胶、球和季节换装内容。",
        },
      ],
      cta: "按你的打球场景运行球包推荐。",
    },
    {
      slug: "used-racket-depreciation",
      updatedAt: "2026-04-28",
      title: "二手球拍折旧：羽毛球装备能保值多少？",
      dek: "转售价值取决于品牌需求、真伪、代际、地区、成色，以及型号热度是否仍在。",
      sections: [
        {
          heading: "主要影响因素",
          body: "知名旗舰款 Yonex、Victor、李宁通常比冷门或入门款更好出手。磕漆、撞拍、序列号可信度不足和未知穿线历史都会快速拉低价格。",
        },
        {
          heading: "为什么显示估算",
          body: "如果某件装备容易转售且保值，高购买价不一定代表真实使用成本高。应用现在显示折旧估算作为决策辅助，不承诺市场成交价。",
        },
        {
          heading: "如何使用这个数字",
          body: "把二手价格看作风险区间。两个推荐同样适配时，转售流动性更强的那一个可能拥有更好的真实持有成本。",
        },
      ],
      cta: "在对比页同时查看推荐和折旧信息。",
    },
  ],
};

export function getBlogArticle(locale: SiteLocale, slug: string) {
  return blogArticles[locale].find((article) => article.slug === slug);
}
