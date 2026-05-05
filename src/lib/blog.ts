import type { SiteLocale } from "@/lib/locale";

export type BlogSlug =
  | "racket-balance-vs-swing-speed"
  | "how-to-read-badminton-reviews"
  | "beginner-racket-mistakes"
  | "badminton-string-selector"
  | "badminton-shoe-fit-stability"
  | "badminton-bag-loadout"
  | "used-racket-depreciation"
  | "yonex-astrox-88d-pro-vs-88s-pro-2024"
  | "yonex-nanoflare-speed-series-explained"
  | "yonex-nanoflare-800-pro-and-victor-hs-plus"
  | "li-ning-bladex-800-speed-tough-elastic"
  | "li-ning-halbertec-8000-vs-9000-vs-9000-power"
  | "li-ning-axforce-90-new-vs-axforce-80-and-yonex-88dp"
  | "yuan-style-shaft-hardness-explained"
  | "yonex-astrox-100zz-axelsen-va-vs-kurenai"
  | "victor-drivex-12-vs-astrox-88d-pro"
  | "li-ning-l69-string-review"
  | "victor-p9200-iii-shoes-review"
  | "li-ning-axforce-100-gen-2-vs-100zz-vs-90-new"
  | "yonex-eclipsion-z3-shoes-review"
  | "yonex-astrox-99-pro-2-deep-dive"
  | "victor-auraspeed-99-hayabusa-review"
  | "li-ning-bladesabre-max-shoes-review"
  | "victor-auraspeed-hs-plus-deep-dive"
  | "li-ning-halbertec-7000-ii-review"
  | "victor-carbonsonic-max-shuttle-review"
  | "bonny-leisu-800-racket-review"
  | "kumpoo-shanhai-new-racket-review"
  | "li-ning-axforce-80-review"
  | "how-to-choose-a-badminton-racket"
  | "badminton-equipment-for-kids"
  | "badminton-glossary-terms-every-player-should-know"
  | "yonex-grip-sizes-explained";

export const blogSlugs: BlogSlug[] = [
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
  "victor-carbonsonic-max-shuttle-review",
  "bonny-leisu-800-racket-review",
  "kumpoo-shanhai-new-racket-review",
  "li-ning-axforce-80-review",
  "how-to-choose-a-badminton-racket",
  "badminton-equipment-for-kids",
  "badminton-glossary-terms-every-player-should-know",
  "yonex-grip-sizes-explained",
];

export type BlogCategory = "reviews" | "comparisons" | "guides";

export type BlogArticle = {
  slug: BlogSlug;
  /** First-published / last-revised date in ISO format (YYYY-MM-DD). */
  updatedAt: string;
  category: BlogCategory;
  title: string;
  dek: string;
  sections: { heading: string; body: string }[];
  cta: string;
};

export const CATEGORY_LABELS: Record<BlogCategory, string> = {
  reviews: "Reviews",
  comparisons: "Comparisons",
  guides: "Guides",
};

/**
 * Rough reading-time estimate (minutes), based on ~225 words/min for non-fiction
 * online prose. Returns at least 1.
 */
export function readingTimeMinutes(article: BlogArticle): number {
  const words = article.sections
    .map((s) => s.body.split(/\s+/).length)
    .reduce((a, b) => a + b, 0);
  return Math.max(1, Math.round(words / 225));
}

/** Articles sorted newest-first by updatedAt. */
export function articlesByDateDesc(articles: BlogArticle[]): BlogArticle[] {
  return [...articles].sort((a, b) =>
    a.updatedAt < b.updatedAt ? 1 : a.updatedAt > b.updatedAt ? -1 : 0
  );
}

/** Group articles by category, each group sorted newest-first. */
export function articlesGroupedByCategory(
  articles: BlogArticle[]
): { category: BlogCategory; articles: BlogArticle[] }[] {
  const order: BlogCategory[] = ["reviews", "comparisons", "guides"];
  return order
    .map((category) => ({
      category,
      articles: articlesByDateDesc(
        articles.filter((a) => a.category === category)
      ),
    }))
    .filter((group) => group.articles.length > 0);
}

/** Find up to `n` related articles in the same category (newest-first), excluding the current. */
export function relatedArticles(
  articles: BlogArticle[],
  current: BlogArticle,
  n = 3
): BlogArticle[] {
  return articlesByDateDesc(
    articles.filter(
      (a) => a.category === current.category && a.slug !== current.slug
    )
  ).slice(0, n);
}

export const blogArticles: Record<SiteLocale, BlogArticle[]> = {
  en: [
    {
      slug: "racket-balance-vs-swing-speed",
      updatedAt: "2026-04-28",
      category: "guides",
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
      category: "guides",
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
      category: "guides",
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
      category: "guides",
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
      category: "guides",
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
      category: "guides",
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
      category: "guides",
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
    {
      slug: "yonex-astrox-88d-pro-vs-88s-pro-2024",
      updatedAt: "2026-04-29",
      category: "comparisons",
      title: "Yonex Astrox 88D Pro vs 88S Pro 2024: which 88 Pro fits your role",
      dek: "The 2024 third-generation 88 Pro twins share Namd Flex Force shafts but pull in opposite directions: 88D Pro for rear-court power, 88S Pro for front-court control. Here is how to pick.",
      sections: [
        {
          heading: "What changed in the 2024 reset",
          body: "Yonex retired the camel-gold 88D Pro after three years and replaced both 88 Pros with new colors that share the second-generation Namd Flex Force shaft, a Power Assist Bumper at the top of the frame, and the longer 10mm built-in T-joint. The new shaft snaps back faster than the camel-gold predecessor, the bumper redistributes mass for cleaner contact, and the joint adds a small amount of torsional stability. Both rackets retain the head-heavy attack heritage of the 88 Pro line, but they keep distinct personalities: the D is the back-court hammer, the S is the balanced control frame Yonex aims at front-court doubles and mixed.",
        },
        {
          heading: "Frame: narrower D, larger S",
          body: "The two frames are no longer identical. The 88D Pro 2024 has a slightly narrower frame than the original camel-gold version — strung at the same tension, you get higher net pressure and a stronger pocketing sensation. The 88S Pro frame is a step larger again, with a slightly shorter handle and overall length. Multiple BadmintonCN measurements (BadmintonCN reviewers, April 2024) put 4U 88D Pro samples around 84g unstrung with strung weights between 89.5g and 91.1g and balance points 305-308mm. A 4U 88S Pro sample measured 84.3g unstrung, 89.5g strung at 80 string and 26-28 lb, balance 301mm.",
        },
        {
          heading: "Shaft hardness: the 88D is stiffer",
          body: "Both shafts are stiffer than the older 77 Pro, but the D and S sit at different tiers. On shaft-deflection measurements published by the Chinese creator YuanShi (源式) — widely cited on BadmintonCN, lower = stiffer — the 88D Pro 2024 sits around 7.59, close to Yonex's hardest production shafts. The 88S Pro is in the same range (mid-7s on the same rig) but feels noticeably less crisp because of the thicker frame and the slightly longer dwell time it produces on contact. The result: a 88D player is rewarded for short, concentrated power strokes; a 88S player benefits from longer, controlled swings that load the shaft into the bigger frame.",
        },
        {
          heading: "Smash vs control: pick by role, not by ego",
          body: "If you are a rear-court doubles player or a singles player whose match-winning shot is the smash, the 88D Pro 2024 is the more direct upgrade. Compared with the camel-gold version, smash power is similar in absolute terms but continuity is better — you fatigue less across long rallies because the new shaft loads and unloads faster. If you play front-court doubles or mixed and your job is to organize the rally with drops, hairpins, pushes, and precise placement, the 88S Pro 2024 is genuinely the best control-balance racket on the market right now (BadmintonCN, January 2026 roundup), beating Halbertec 8000 / 9000 / 9000 Power and Arcsaber 11 Pro on combined control and smash quality.",
        },
        {
          heading: "Founder firsthand notes",
          body: "I (Rui Su, Division 4 Ireland) currently play the 88S Pro 2024 as my main racket for front-court doubles. It feels close to the Astrox 77 Pro I used previously but with a stiffer shaft — better when you have the timing to load it, more demanding when you do not. I have also held the 88D Pro 2024 and tested it against the 77 Pro: the 88D is harder to drive on continuous attack, and for most amateur players I would still recommend the 77 Pro over the 88D unless they specifically need rear-court power. The 88S Pro is the more universally enjoyable of the two new colors.",
        },
        {
          heading: "Who should buy which",
          body: "Buy the 88D Pro 2024 if: you compete in men's doubles back court, you smash often as a primary attack pattern, your shoulder and core are conditioned for stiff-shaft frames, and you have time on court to adapt. Buy the 88S Pro 2024 if: you play mixed doubles or front-court doubles, you organize rallies through placement rather than raw smash, you valued the control feel of the 77 Pro and want a stiffer shaft tier above it, or you need one frame that can do both singles and doubles competently. Either way, plan to spend a few sessions adjusting your timing — both are pro-tier shafts.",
        },
      ],
      cta: "Run the finder if you are choosing your next 88 Pro — we score it against your level, role, and budget.",
    },
    {
      slug: "yonex-nanoflare-speed-series-explained",
      updatedAt: "2026-04-29",
      category: "comparisons",
      title: "Yonex Nanoflare 700, 700 Pro, and 1000Z: the speed series decoded",
      dek: "Three speed rackets, three different jobs. Here is who each one is for, and why the lighter sample sometimes smashes harder.",
      sections: [
        {
          heading: "Why the Nanoflare line is hard to shop",
          body: "Yonex has packed the Nanoflare line with so many SKUs that buyers commonly mix up the entry-level 700, the 700 Pro, the 800 Pro, and the flagship 1000Z. They share head-light balance and aerodynamic frame design, but the shaft hardness, frame edge profile, and bend-point location differ enough that one of these rackets will feel completely different from the next on court. This piece walks through the three you are most likely to consider — 700, 700 Pro, and 1000Z — and frames each in terms of who it actually serves.",
        },
        {
          heading: "Nanoflare 700: the sugar-water front-court racket",
          body: "The non-Pro Nanoflare 700 is a defining example of what Chinese reviewers call a sugar-water (糖水) racket: easy to drive, broad audience, soft-medium shaft, head-light feel. BadmintonCN reviewers describes it as the racket his wife switched to from a Yonex NS9000s and stuck with — and the NS9000s is no joke. It rewards a fast swing without demanding a powerful one, and the 5U variant is particularly approachable for beginners and players moving up from entry frames. The trade-off: shaft feedback is less clear, and the bend point sits closer to the handle, which makes downward pressure on smashes harder to apply.",
        },
        {
          heading: "Nanoflare 700 Pro: the Pro upgrade that does not punish you",
          body: "The 2024 Nanoflare 700 Pro is technically only marginally stiffer than the regular 700 — BadmintonCN reviewers describe the shaft difference as one tier at most — but Yonex moved the bend point higher and added the SF Filter and enhanced Sonic Flare frame system. The result: clearer feedback, faster snapback, easier high clears, and noticeably better smash confidence than the regular 700. Founder firsthand (Rui, Div 4 IE): the 700 Pro is genuinely fast — pair it with thinner strings like Aerobite or BG66 Ultimax to maximize the speed advantage rather than thicker durability strings.",
        },
        {
          heading: "Sample variance is real",
          body: "If you are picking a Nanoflare 700 Pro from a stack at a stringer, weigh it. the BadmintonCN reviewer's weighed three 4U/G5 samples and got 83.6g, 84.8g, and 85.8g unstrung — over 2g of variance from the same SKU. He kept the lightest sample. Even more interesting: he reports that lighter sample with a lower balance point still smashes harder than a heavier non-Pro Nanoflare 700, suggesting that in this line, shaft hardness matters more than gram-level mass for attack quality. This is also a reminder that aggregate review-based recommendations cannot tell you exactly how the racket in your hand will feel.",
        },
        {
          heading: "Nanoflare 1000Z: the hexagonal warrior",
          body: "The 1000Z is the flagship and a different kind of racket. Small frame, hard shaft (around two tiers stiffer than the 700 Pro shaft), DR carbon for a touch of pocketing feel, and the best end-speed and pointing accuracy of the Nanoflare line. BadmintonCN reviewers call it the most balanced of all speed rackets — no clear weakness, T0-tier alongside the Victor Auraspeed 100X SE. Founder firsthand (Rui, Div 4 IE): I currently play the 1000Z as my men's doubles racket. It is extremely fast on drives and defense, but power is harder to generate than from a comparable head-heavy frame. With good timing and strength, it is the doubles weapon. Without those, it can feel lifeless.",
        },
        {
          heading: "Which one is for you",
          body: "Pick the Nanoflare 700 if you are upgrading from an entry-level frame, you are a player whose main need is a relaxed front-court doubles or mixed racket, or you want a forgiving frame to share with someone less experienced. Pick the Nanoflare 700 Pro if you are an intermediate player who wants the Nanoflare feel with sharper feedback and more attack. Pick the 1000Z if you are a competitive doubles player with the technique to load a stiff shaft, who prizes drive speed and counter-attack over raw rear-court smash. If raw smash is your thing, leave this whole line and look at the Astrox 88D Pro 2024 instead.",
        },
      ],
      cta: "Use the finder to compare any two of these rackets head-to-head against your level, role, and budget.",
    },
    {
      slug: "yonex-nanoflare-800-pro-and-victor-hs-plus",
      updatedAt: "2026-04-29",
      category: "comparisons",
      title: "Yonex Nanoflare 800 Pro vs Victor Auraspeed HS Plus: two takes on extreme speed",
      dek: "Both have hard shafts and small frames. Both want fast doubles. They feel completely different on contact — here is why.",
      sections: [
        {
          heading: "Two flagships, two philosophies",
          body: "The 2024 Yonex Nanoflare 800 Pro and the Victor Auraspeed HS Plus are both built for fast-pace men's doubles. They sit close on paper: head-light or even balance, hard shafts, compact frames, similar weights. They are also both used by world-tour players. But step on court with both and the contact feel diverges immediately — one is crisp-elastic with an audible metallic ring, the other is a denser hardened-shaft profile that asks for more active force. Picking the wrong one wastes a serious chunk of money.",
        },
        {
          heading: "Nanoflare 800 Pro: crisp-elastic by design",
          body: "Yonex went to extremes on the 800 Pro. The frame uses a wing-shape break-line with sharp edges, a 78-hole stringbed (vs the usual 76), and a copper foil at the frame base for additional rigidity. Per BadmintonCN measurements, a 4U/G5 sample weighs 85.2g unstrung, 89.7g with the underbase removed, balance 301mm. The signature is what reviewers call 脆弹 — crisp-elastic — meaning the shuttle is fired off the strings almost instantly, with barely any dwell time. Off-string speed is faster than both the 100XSE (Victor) and 1000Z. Frame anti-torsion is excellent. The Pro variant ships with a metallic ringing tone on contact that some players love and some find too sharp.",
        },
        {
          heading: "Where the 800 Pro wins and loses",
          body: "Strengths: drives, flat exchanges, reflex defense, sharp smash placement. The fast snapback turns short power strokes into fast shuttles. Best for fast-pace men's doubles and back-court attack from a speed profile. Weaknesses: control on net play is not its strength — the lack of pocketing means drops can fly slightly higher than intended, and cross-court drops are easier to send long. Rear-court control is also weaker than the 1000Z because the 800 Pro skips the DR carbon used in the flagship. Higher entry threshold than the Nanoflare 700 Pro.",
        },
        {
          heading: "Auraspeed HS Plus: a hardened Hayabusa",
          body: "Victor's Auraspeed HS Plus uses WES 3.0 shaft tech and Victor's hardest production shaft tier. BadmintonCN reviewers describe it as a hardened version of the Hayabusa SE Black Gold: harder shaft, faster off-string, more rigid feedback. Used by Hendra Setiawan and H.S. Prannoy. A 4U sample measures 88.9g with the underbase removed, balance 304mm — almost identical mass and balance to a 4U Nanoflare 1000Z. But the contact feel is different: more transparent and force-driven where the 1000Z has a slight pocketing pause. Sweet spot is small. Off-sweet-spot defense is weaker than the 100XSE.",
        },
        {
          heading: "Pick by what you actually do",
          body: "Pick the 800 Pro if: you want maximum drive speed, you play a lot of fast doubles, you do not depend on net-play touch, and you accept some give on rear-court control in exchange for that speed. Pick the HS Plus if: you have the active force to drive a very stiff shaft, you want a back-court smash profile inside a speed-racket form factor, and you find Yonex frames generally too crisp and prefer Victor's denser feel. If you find yourself unsure, the 1000Z (Yonex) and 100X SE (Victor) are both more forgiving and either will likely serve you better than these two extremes.",
        },
        {
          heading: "What about price and entry threshold",
          body: "Both rackets sit in the 240-280 USD range new in most markets, with the 800 Pro typically slightly more expensive. Neither is a sugar-water frame: BadmintonCN reviewers, who plays 100X SE, 1000Z, and similar speed rackets daily, calls the HS Plus harder to drive than any of his usual rotation. If you are a Division 5/6 Irish-tier or 中羽 4-ish (BadmintonCN) player, you will likely benefit more from a 700 Pro or Halbertec 8000 first, and graduate to one of these only when your timing is reliable. There is no shame in waiting.",
        },
      ],
      cta: "Compare these two side by side in our compare tool with your full profile.",
    },
    {
      slug: "li-ning-bladex-800-speed-tough-elastic",
      updatedAt: "2026-04-29",
      category: "reviews",
      title: "Li-Ning Bladex 800 Speed: the tough-elastic answer to Yonex and Victor",
      dek: "Most speed rackets fire crisp-elastic. Bladex 800 Speed deliberately does not — and that may be exactly the racket you are missing.",
      sections: [
        {
          heading: "What 'tough-elastic' actually means",
          body: "Speed rackets in 2024-2026 have largely converged on a crisp-elastic design philosophy: hard shaft, low dwell time, near-instant ejection. The Yonex Nanoflare 800 Pro, Victor Auraspeed Hayabusa, and Yonex 100X SE all live there. The Li-Ning Bladex 800 Speed (锋影 800 Speed), launched 2026, deliberately steers in the opposite direction. Reviewers describe its feel as 韧弹 — tough-elastic — meaning the shuttle has a brief loading and dwell phase before release, and the frame stores and returns energy more like a controlled spring than a snapping whip. The result is a speed racket that feels closer to a balance racket on touch shots, while still moving fast enough to compete on drives.",
        },
        {
          heading: "Specs and stiffness",
          body: "BadmintonCN reviewers measured a 4U/G6 Bladex 800 Speed at 85.2g unstrung, 90.8g with grip and string (underbase still on), balance 299mm. A 3U/G5 came in at 89g unstrung, 91.4g with the underbase removed, balance 302mm. On YuanShi's (源式) shaft-deflection rig (lower = stiffer; YuanShi is a Chinese badminton creator who tests rackets on a professional measurement machine), the 800 Speed measures around 7.83 — much stiffer than the previous Bladex 800 New (around 8.58). Frame torsion measures 18.72 — the best of any speed racket tested in BadmintonCN reviewers' roundup, even better than the 99 Pro 2 at 19.87. The frame uses M46X carbon to balance stiffness with elasticity.",
        },
        {
          heading: "Where the dwell time pays off",
          body: "The longer dwell of the 800 Speed gives you something the crisp-elastic alternatives cannot: an extra fraction of a second to redirect, slow, or place a shuttle. Drops sit closer to the net. Cross-court hairpins are easier to control. Sliced clears land more reliably. Smashes fire more on placement than on raw speed, but the placement is sharp. For control players who want speed, this is genuinely interesting territory. For pure speed-attack players who already know they want a Nanoflare 800 Pro or 100X SE, this is the wrong racket.",
        },
        {
          heading: "What the 800 Speed asks of you",
          body: "Tough-elastic loading rewards fast and concentrated swing technique. If your swing is slow or your force is diffuse, the 800 Speed will feel mushy — you give it force and the shuttle returns soft. BadmintonCN reviewers explicitly warns players who already own and like the Bladex 800 New (which is much softer at 8.58) not to switch on impulse: the 800 Speed will likely feel demanding. The closest comparison from another brand is the Astrox 88S Pro 2024, which has a similar shaft hardness but lives in the balance-racket space and has more pocketing depth.",
        },
        {
          heading: "Buying guidance",
          body: "Buy the Bladex 800 Speed if: you play organized control rallies and have the swing speed to load a stiff shaft, you want a Li-Ning frame with M46X carbon (which is genuinely a step up in feel), and you are explicitly tired of the crisp-elastic pattern. Skip it if: you want maximum off-string speed (the Yonex 800 Pro is faster), you want pure rear-court attack (the Astrox 88D Pro 2024 is better), or you are not yet driving stiff shafts reliably (the Bladex 800 New is the friendlier sibling). It is genuinely cheaper than the Yonex flagship speed rackets, around 200-240 USD depending on region, which is also a real reason to consider it.",
        },
      ],
      cta: "Add the Bladex 800 Speed to compare against your current racket — we surface the trade-offs explicitly.",
    },
    {
      slug: "li-ning-halbertec-8000-vs-9000-vs-9000-power",
      updatedAt: "2026-04-29",
      category: "comparisons",
      title: "Li-Ning Halbertec 8000 vs 9000 vs 9000 Power: which Halberd is yours",
      dek: "Three rackets in the same family, three completely different jobs. The 8000 is the amateur favorite. The 9000 is misunderstood. The 9000 Power is a speed racket in disguise.",
      sections: [
        {
          heading: "The Halbertec line is not a smooth upgrade path",
          body: "Many buyers assume the Halbertec 9000 is a strict upgrade over the 8000, and the 9000 Power is another tier above that. This is wrong. The 8000 is a control-leaning balance racket with a soft-medium shaft and a large fluid-box frame. The 9000 is a speed-leaning racket with a thinner frame and stiffer shaft. The 9000 Power, despite the name, is not a Halbertec 8000 successor — it is a refined version of the 9000 with even more shaft stiffness, marginally more head weight, and more crisp/snap. Picking by name alone leads to disappointment.",
        },
        {
          heading: "Halbertec 8000: the amateur all-rounder",
          body: "BadmintonCN reviewers has called the Halbertec 8000 the racket he has recommended more than any other on the forum, and he still owns two. It is around 400-500 USD cheaper than the Yonex Astrox 88S Pro 2024 and 600-700 USD cheaper than the Arcsaber 11 Pro, and yet it competes on smash quality (especially with the underbase removed) and on rear-court solidity. The 6.8mm hard-flex shaft is moderate enough that most amateur players can drive it — around 8.33 on YuanShi's deflection rig (a Chinese badminton creator's measurements widely cited on BadmintonCN). If you do not yet know your style or are buying your first serious racket above the entry tier, this is the safe pick.",
        },
        {
          heading: "Halbertec 9000: thinner frame, faster swing, weaker rear",
          body: "The 9000 was marketed as a control king, but reviewers disagree with that positioning. The 9000 has a thinner frame than the 8000 (lower wind resistance, faster swing) and a stiffer shaft (around 7.92 on YuanShi's deflection rig, vs the 8000's 8.33), but on hard smashes the combination produces what BadmintonCN reviewers call 卸力 — a loss of power compared with other hard-shaft rackets. He attributes this to the relatively soft frame paired with the harder shaft: the frame absorbs energy that should travel to the shuttle. The 9000 is faster and more accurate at front court than the 8000. It is also less solid at the rear court. If you are choosing between 8000 and 9000 by hype alone, you may end up with the wrong one.",
        },
        {
          heading: "Halbertec 9000 Power: a speed racket disguised as a balance racket",
          body: "The 9000 Power (战戟 9000P) launched 2025 takes the 9000 thinner frame and makes the shaft even stiffer. Around 7.65 on YuanShi's deflection rig — same range as the Astrox 88D Pro 2024 (around 7.59) and 88S Pro 2024 on the same rig. Frame is nearly identical to the 9000, with a minor wind-cutting tweak at the head. Slightly more head weight than the 9000. The 卸力 problem is mostly fixed. But BadmintonCN reviewers' verdict is direct: the 9000 Power is functionally a speed racket. It can be substituted by his other speed rackets (Yonex 1000Z, Yonex 800 Pro, Victor 100X SE) without much loss. The 8000 cannot — its pocketing and balance character are unique within Li-Ning's lineup.",
        },
        {
          heading: "Sample variance: weigh before you buy",
          body: "If you order a 9000 Power online, weigh it on arrival. the BadmintonCN reviewer's weighed 10 brand-new 4U samples and got: 5 around 82.5g unstrung, 3 around 83.5g, 1 at 84g, 1 at 84.5g. Half the samples weigh in at the very low end — meaningfully lighter than the average attack racket and noticeably different in swing feel. Buyer beware. This kind of variance is one of the strongest arguments for buying from a stringer or shop that lets you handle the racket before commitment.",
        },
        {
          heading: "Final pick guide",
          body: "Buy the Halbertec 8000 if: you are an amateur or club-league player, you want a single racket that does not punish wrong choices, and you want best-in-budget smash and rear-court performance. Buy the Halbertec 9000 if: you specifically prioritize front-court speed and accept weaker rear-court attack — but honestly consider whether a Bladex 800 Speed or Yonex 700 Pro might serve the same need better. Buy the Halbertec 9000 Power only if: you are an advanced doubles player who already drives stiff shafts comfortably, and you specifically want a Li-Ning speed racket inside the Halbertec brand language.",
        },
      ],
      cta: "Compare any two Halberds in our compare tool — fit-score and rationale render side by side.",
    },
    {
      slug: "li-ning-axforce-90-new-vs-axforce-80-and-yonex-88dp",
      updatedAt: "2026-04-29",
      category: "comparisons",
      title: "Li-Ning AxForce 90 New vs AxForce 80 and Yonex Astrox 88D Pro: head-heavy attack rackets compared",
      dek: "Three rackets aimed at the same job — back-court power. They reward different swings and different player styles. Here is how to pick.",
      sections: [
        {
          heading: "Why this comparison matters",
          body: "The Li-Ning AxForce series (formerly known by its Chinese name 雷霆 / Thunder, now consistently labeled AxForce in English markets) and the Yonex Astrox 88D Pro 2024 are the two strongest head-heavy attack racket lines on the market right now. Both lines compete head-to-head for tournament players who want a smash-focused weapon. The AxForce 90 New is the current flagship of the Li-Ning line and uses Li-Ning's Thunder Tech platform with M46 and T1100 carbon. The AxForce 80 is the easier-driving sibling. The Astrox 88D Pro 2024 is the cross-brand benchmark for many serious smash-focused players.",
        },
        {
          heading: "AxForce 90 New: Li-Ning's strongest shaft to date",
          body: "BadmintonCN reviewers calls the AxForce 90 New shaft Li-Ning's strongest to date. The shaft is 6.4mm thick — thicker than the 6.2mm of the AxForce 90 Dragon-Tiger predecessor — but the construction balances permeability, full elasticity, and balanced hardness. Surprisingly forgiving sweet spot for a small frame. Anti-torsion is excellent even with the thin shaft. A 4U sample measures 89.5g with the underbase removed, balance 304mm. The Thunder Technology platform is supposed to help players transition from defense to attack quickly, and on court the rapid recovery does seem to support continuous attack.",
        },
        {
          heading: "AxForce 80: the sugar-water sibling",
          body: "The AxForce 80 lives below the 90 New as the easier-driving sugar-water option in the line. A 4U measures 89.2g with the underbase removed, balance 304mm — same balance as the 90 New, but heavier swing weight, softer shaft, and less crisp feel. Stronger one-shot smash for players who already lean on head weight to generate power; weaker on continuous attack and on barely-defended balls. BadmintonCN reviewers plan to retire his AxForce 80 in favor of the 90 New across the board, but says the 80 stays as the more entry-friendly option for amateurs who specifically want pure head-heavy feel without the demands of the 90 New shaft.",
        },
        {
          heading: "Yonex Astrox 88D Pro 2024: the cross-brand benchmark",
          body: "The Yonex Astrox 88D Pro 2024 is the cross-brand reference. Around 7.59 on YuanShi's shaft-deflection rig (Chinese creator measurements widely cited on BadmintonCN; lower = stiffer) — slightly stiffer than the AxForce 90 New on the same rig. BadmintonCN reviewers rank it as the strongest 2024 attack racket in his collection on overall package: top-tier shaft, transparent power transmission, lower swing weight than peers, and ranked above the original 88DP camel-gold and even the Astrox 100ZZ. Versus the AxForce 90 New: the 88D Pro 2024 edges it on raw rear-court attack, off-string speed, feedback clarity, and pointing accuracy. The AxForce 90 New responds with better frame pocketing for delicate net shots and drops.",
        },
        {
          heading: "Pick by hand profile, not just by smash power",
          body: "If you want pure rear-court speed and clarity, the 88D Pro 2024 wins on most measures. If you want a more rounded attack racket that handles drops and net play with more pocketing, the AxForce 90 New is the better fit. If you have not yet developed the shaft-loading technique for either, start with the AxForce 80 — it is more forgiving and still meaningfully head-heavy. None of these are good choices for pure speed-attack: if you want fast-pace doubles drives, look at the Yonex 1000Z, Victor 100X SE, or Halbertec 9000 Power instead.",
        },
        {
          heading: "Founder firsthand notes",
          body: "I (Rui Su, Division 4 Ireland) have not personally played the AxForce line, so the editorial weight on this article comes from BadmintonCN reviewers' measurements plus my own framing of what the comparisons mean for amateur and competitive players. I have played the Astrox 100ZZ and 88D Pro and found both demanding; if you find the 100ZZ punishing, the AxForce 90 New is likely a more comfortable home than the 88D Pro 2024 even though the Yonex has slightly stronger absolute attack. Try in person before you commit to either flagship.",
        },
      ],
      cta: "Use the finder with smash-heavy or singles-attack preferences and we score these three for your level and budget.",
    },
    {
      slug: "yuan-style-shaft-hardness-explained",
      updatedAt: "2026-05-05",
      category: "guides",
      title: "YuanShi shaft hardness: what one Chinese badminton creator's testing rig actually tells you",
      dek: "YuanShi (源式) is not a scientific protocol — it's the handle of a Chinese badminton creator who measures rackets on a professional shaft-deflection machine and posts the numbers. Here is what they mean, what they don't, and how to use them when shopping.",
      sections: [
        {
          heading: "What YuanShi actually is",
          body: "YuanShi (源式) is the handle of a Chinese badminton creator who posts racket measurements on Douyin (the Chinese TikTok) and BadmintonCN. They are not a brand, a lab, or a standards body. They use a commercially available shaft-deflection machine — clamp the shaft, apply a standardized force, read the deflection in millimeters — and publish the numbers along with weight, balance, and torsion measurements for popular rackets. The numbers got cited so often on BadmintonCN that 'Yuan number' or 'YuanShi number' became forum shorthand for 'the deflection figure published by that creator.' We previously described this as 'Yuan-style protocol' on this page, which made it sound like an industry standard. It is not — it's one creator's measurement rig. Calling it that was a mistake on our part, and we have corrected it.",
        },
        {
          heading: "Why brand spec sheets aren't enough",
          body: "Yonex labels shafts Stiff or Extra Stiff. Victor uses similar text labels. Li-Ning uses Hard or Hi-Flex. None of these scales line up between brands — a Yonex Stiff is not the same as a Victor Stiff. This makes cross-brand racket comparison genuinely difficult unless you have all the rackets in your hands at once. So when forum reviewers want to compare, say, a Yonex Astrox 88D Pro 2024 against a Li-Ning Halbertec 9000 Power, they reach for one of the few independent measurement sources that covers both brands. YuanShi's numbers are popular precisely because they are consistent within their own dataset — same machine, same operator, same procedure — even if they are not authoritative.",
        },
        {
          heading: "How to read the numbers",
          body: "YuanShi's deflection numbers typically run between 6 and 9. Lower means the shaft deflected less under the standard force, i.e. it's stiffer. Higher means more deflection, i.e. softer. So a shaft published at 6.71 (e.g. an early Yonex Astrox 100ZZ sample) is harder than one at 8.33 (e.g. a Li-Ning Halbertec 8000 sample). Within YuanShi's own measurements, the ordering is generally consistent and useful. Across labs, it is not — another rig with a different clamp, force, or measurement point will give different absolute numbers, even if the relative ordering of rackets is similar.",
        },
        {
          heading: "Commonly cited numbers (creator-published, not official)",
          body: "Numbers seen on BadmintonCN attributed to YuanShi's rig, ordered stiffest to softest: Yonex Astrox 100ZZ around 6.71, Yonex Astrox 99 Pro 2 around 7.43, Yonex Astrox 88DP New Color around 7.59, Li-Ning Halbertec 9000 Power around 7.65, Li-Ning Bladex 800 Speed around 7.83, Yonex Arcsaber 11 Pro around 7.86, Li-Ning Halbertec 9000 around 7.92, Yonex Astrox 88SP New Color in the 7.5-7.6 range, Yonex Astrox 100ZZ Axelsen (VA) edition around 8.23, Li-Ning Halbertec 8000 around 8.33, Li-Ning Bladex 800 New around 8.58. These are creator-published numbers, not manufacturer specs. We cite them because they are widely referenced, not because they are authoritative.",
        },
        {
          heading: "What the number does and does not tell you",
          body: "What it tells you: roughly how much active force you need to flex the shaft. Shafts under 7.5 require concentrated, fast power strokes — they reward technique and punish soft swings. Shafts above 8.0 are forgiving for amateur players and recover well from imprecise force. Shafts at 8.5 or higher are sugar-water by design. What the number does NOT tell you: how the frame transmits that energy, where the bend point sits, whether the racket is head-heavy or head-light, what the swing weight is, how the sweet spot feels. A stiff shaft in a soft frame can lose power on smash (the 卸力 problem reviewers discuss with the Halbertec 9000). A medium shaft in a thick frame can feel quicker than a stiffer shaft in a thin frame. The number is one input among many, not a verdict.",
        },
        {
          heading: "How to use it when shopping",
          body: "First, locate yourself on the scale. If you are a recreational or club-tier player, target shafts measured at 8.0 or higher (Halbertec 8000, Astrox 77 Pro, Nanoflare 700 Pro, Bladex 800 New). If you are competitive (Division 4-2 Irish league, BadmintonCN 5-7, USAB Class B-A), 7.5-8.0 is your sweet spot (Astrox 88S Pro 2024, AxForce 90 New, Halbertec 9000 Power, Bladex 800 Speed). If you are pro-track, sub-7.5 is on the table (Astrox 100ZZ, 88D Pro 2024, Auraspeed HS Plus). Then refine by frame profile, head weight, and play style. The hardness number rules out most rackets that won't match your force profile, but only if you remember it's one creator's measurement, not gospel.",
        },
        {
          heading: "Caveats and limits",
          body: "YuanShi's numbers come from one independent creator's testing rig and are not Yonex, Victor, or Li-Ning official data. The same shaft may register a different number on a different rig — a 7.6 here may be a 7.4 elsewhere. Per-batch shaft variance is also real: a BadmintonCN reviewer weighed 10 Halbertec 9000 Power samples and got swing-weight variance well outside the published spec, and shaft hardness varies similarly. Treat YuanShi's numbers as a useful guide for comparing within their own dataset, not as precise truth. Always cross-check against your own demo if possible, and remember that frame, balance, swing weight, sweet-spot size, and string setup matter as much as raw shaft hardness.",
        },
      ],
      cta: "When you run the finder, hardness is one of several signals — pick your level and we balance it against frame, balance, and play style.",
    },
    {
      slug: "yonex-astrox-100zz-axelsen-va-vs-kurenai",
      updatedAt: "2026-05-05",
      title: "Yonex Astrox 100ZZ Kurenai vs Axelsen (VA): same DNA, different demands",
      dek: "Yonex's Viktor Axelsen edition (called 安塞龙 on Chinese forums) isn't a recolor — Volume Cut Resin replaces Black Micro Core in the frame, and the on-court behavior shifts more than the marketing implies.",
      sections: [
        {
          heading: "Naming note before we start",
          body: "On Chinese badminton forums the Viktor Axelsen 100ZZ edition is referred to as 100ZZ 安塞龙 — 安塞龙 is the standard Chinese transliteration of Viktor Axelsen, NOT Anders Antonsen. Antonsen is sponsored by Victor (his signature racket is the Auraspeed 99). So when you see Chinese reviewers compare 100ZZ 安塞龙 vs 100ZZ 古红色 (Kurenai), they are comparing the Viktor Axelsen (VA) edition to the original red Kurenai. We previously got this wrong on this page and have corrected it.",
        },
        {
          heading: "What actually changed in the VA edition",
          body: "Yonex's Viktor Axelsen (VA) edition of the Astrox 100ZZ is sometimes pitched as a colorway, but the technical sheet shows otherwise. The frame swaps Black Micro Core (used in the Kurenai red and Navy blue editions) for Volume Cut Resin — a resin-system change that lowers frame mass and slightly softens the shaft response. Frame footprint, line-hole pattern, shaft diameter, and shaft length are otherwise identical. Yonex's hand on the dial here is subtle but real, and the on-court reading from BadmintonCN reviewers backs that up.",
        },
        {
          heading: "The numbers",
          body: "Reviewers' measured 4U samples: VA edition 88.7g with underbase removed at balance 309mm; Kurenai 89.7g with underbase removed at balance 309mm. Both with 26-28 lb AB string. Unstrung weight ranges 84.6-85.7g across both editions — under-84g samples are rare. Shaft hardness numbers come from the YuanShi (源式) creator's racket testing rig — a Chinese badminton creator who measures rackets with a professional shaft-deflection machine and posts the results, lower number means stiffer: VA edition 8.23, Kurenai 8.09. The VA edition is softer by about 0.14 on YuanShi's scale. That's a small absolute number but a noticeable real-world tier difference. Combined with the slightly lower swing weight, the VA edition is meaningfully easier to drive. These are independent creator measurements, not Yonex official data, so treat them as a useful guide rather than a precise truth.",
        },
        {
          heading: "What this means in singles",
          body: "Founder firsthand (Rui Su, Division 4 Ireland): I have played the regular 100ZZ Kurenai and found it fast but very demanding — repulsive on contact and tiring across long matches. The VA specs read like the version I would actually play. Lighter swing, slightly more flex, same head-heavy + extra-stiff DNA. For singles where you need consistent rear-court attack across a 21-21 game, the VA edition should reduce fatigue without giving up the marquee 100ZZ feel. The Kurenai remains the right pick if you have time to condition for the stiffer shaft and want maximum power transmission on every swing.",
        },
        {
          heading: "What this means in doubles",
          body: "BadmintonCN reviewers note that even the VA edition, with its lighter swing and easier shaft loading, is still a marginal pick for fast men's doubles. The 100ZZ family was built for singles back court and won't beat the Nanoflare 1000Z, Nanoflare 800 Pro, or Auraspeed 100X SE on swing speed and front-court reactivity. If you want a 100ZZ-style frame for doubles, the VA edition is a more honest fit than the Kurenai because it shaves the swing weight that worked against you in fast exchanges. But your main racket should still be a speed-leaning frame.",
        },
        {
          heading: "Buying guidance",
          body: "Buy the VA (Viktor Axelsen) edition if: you like the 100ZZ profile but find the Kurenai tiring across full matches, you compete in singles or back-court doubles, and you want the lightest-swinging 100ZZ. Buy the Kurenai if: you have the technique and conditioning to load a very stiff shaft, you prize maximum power transmission and pointing accuracy, and you want the no-compromise marquee 100ZZ feel. Skip the entire 100ZZ family if: you play fast doubles primarily — start with the Astrox 88D Pro 2024 (head-heavy with lower swing weight) or a speed racket like the Nanoflare 1000Z.",
        },
      ],
      cta: "Run the finder with singles or back-court attack and we'll score the 100ZZ variants against your level and budget.",
      category: "comparisons",
    },
    {
      slug: "victor-drivex-12-vs-astrox-88d-pro",
      updatedAt: "2026-04-30",
      title: "Victor DriveX 12: a credible Astrox 88D Pro alternative for 2/3 the money",
      dek: "Nano-aerogel frame fill, WES 3.0 shaft, Power Ring Pro junction. The DriveX 12 fixes the DriveX 10's well-known shaft-rotation issue and pulls within striking distance of the Yonex flagship attack racket.",
      sections: [
        {
          heading: "Why DriveX 10 owners should pay attention",
          body: "Early DriveX 10 buyers documented a shaft-rotation problem at the cone-cap junction — the shaft would rotate in the handle under sustained big-swing load. Victor's warranty replaced affected frames, but the issue lingered as a hesitation point for serious attack-racket buyers. The DriveX 12 introduces Power Ring Pro: a mechanical clip-style junction that adds a rigid physical connection between the shaft and the suspension grip system. BadmintonCN reviewers report the rotation issue is fully resolved on the new generation, and the additional rigidity also produces measurably better anti-torsion when the frame is loaded off-axis.",
        },
        {
          heading: "What's new under the paint",
          body: "Three frame-level upgrades define the DriveX 12. First, nano-aerogel frame fill (the same low-density solid filler Victor uses in the Bladex / Auraspeed Hayabusa siblings) reduces frame mass without sacrificing wall thickness. Second, the Resilience Shield (glass carbon fiber, also seen in the 100X / 90K II) adds frame elasticity that translates to crisper off-string response. Third, 46T Bayer carbon raises the modulus tier, which Victor pairs with WES 3.0 — the in-shaft inflection-point system that adds bend points along the shaft's length and produces a sharper downward-pressure angle when you swing through.",
        },
        {
          heading: "On court vs the DriveX 10",
          body: "BadmintonCN measurements put both rackets in the same class — same frame footprint, similar weight and balance. But the DriveX 12 swings faster than the DriveX 10 at equal mass thanks to the aerogel fill, and reviewers report better continuity in fast doubles where the DriveX 10's heavier swing dragged. Defense and front-court reflexes are notably improved. Smashes feel comparable in raw power but the 12 has crisper feedback, so you know when you've hit the sweet spot. If you bought a DriveX 10 and felt like the swing was holding you back, the 12 is the upgrade — assuming you can absorb the cost of replacing rather than reselling.",
        },
        {
          heading: "On court vs the Astrox 88D Pro 2024",
          body: "The closer comparison for DriveX 12 buyers, since both are head-heavy stiff-shaft attack rackets in the same price tier. Reviewers' measured 4U DriveX 12: 89.2g unstrung at balance 311mm. 4U Astrox 88D Pro 2024: 89.2g unstrung at balance 308mm. The 88D Pro's shaft is slightly stiffer and crisper off-string, with the Yonex 2nd-gen Namd shaft producing snappier counter-attack on defense; the 88D Pro feels more 'connected' on the contact moment. The DriveX 12 has slightly better pocketing for net play and drops, where the 88D Pro can feel quick-firing. Smashes go to the 88D Pro by a small margin in absolute power; the DriveX 12 is sharper on placement.",
        },
        {
          heading: "The price argument",
          body: "Where the DriveX 12 wins decisively is the price per unit of performance. Depending on region, DriveX 12 sits at roughly 60-70% the cost of the Astrox 88D Pro 2024 with arguably 90% of the on-court performance. For a buyer who will not own multiple flagship attack rackets, the DriveX 12 is a smart hedge — you get tournament-tier performance without the Yonex tax. For a buyer who already owns multiple Yonex frames or whose teammates string for them, the brand alignment may still steer toward the 88D Pro 2024.",
        },
        {
          heading: "Who should buy it",
          body: "Buy the DriveX 12 if: you want a tournament head-heavy attack racket but can't justify Yonex flagship pricing, you play singles or back-court doubles, and you're willing to drive a stiff-shaft attack frame. Skip it if: you primarily play fast doubles (the swing weight is still high — look at the Auraspeed 100X SE or Nanoflare 1000Z instead), or your kit standardizes on Yonex shafts and you're willing to pay for that consistency.",
        },
      ],
      cta: "Compare the DriveX 12 against the Astrox 88D Pro 2024 in our compare tool — both score against your profile.",
      category: "reviews",
    },
    {
      slug: "li-ning-l69-string-review",
      updatedAt: "2026-04-30",
      title: "Li-Ning L69 string review: marketed as durable balanced, plays like a smash string",
      dek: "Li-Ning's new generalist string surprises in a way the package doesn't predict — paired with a stiff attack frame at 27 lb, the smash audio alone is reason to demo it.",
      sections: [
        {
          heading: "What L69 actually is",
          body: "Li-Ning's L69 is a 0.69mm gauge multi-filament string positioned as durable balanced — Li-Ning's marketing frames it as a daily-use option for players who restring less often and want consistent performance across the gauge's life. On paper that sounds unexciting next to the high-repulsion specialty strings most attack-racket players reach for (Yonex BG80, BG66 Ultimax, Ashaway ZyMax, Li-Ning No.5). But specs only tell part of the story — string feel depends heavily on tension, pattern, knot count, and the racket frame.",
        },
        {
          heading: "Test setup",
          body: "BadmintonCN reviewers tested the L69 in a Yonex Astrox 99 Pro 2 (Bluebird edition) at 27 lb tension, four-knot pattern, equal tension on mains and crosses. The 99 Pro 2 is a head-heavy attack racket with one of Yonex's stiffest shafts — typically paired with high-repulsion strings like BG80 or BG66 to milk every joule of smash power. The reviewers' expectation going in was that L69 would feel restrained on a frame this aggressive. The real-world result was the opposite.",
        },
        {
          heading: "How it plays",
          body: "The first surprise was crispness. L69 fires the shuttle with little dwell time — closer to a stiff specialty string than the slightly mushier feel typical of 'balanced' strings. The second was the smash audio. At 27 lb in a small attack frame, smashes produced strong, sharp audio and visible drop-angle steepness. Reviewers compared the smash performance favorably to the Yonex 66N (BG66 Ultimax variant) at similar tension, with reviewers reporting L69 came out ahead on hard smash. Drop placement was tight to the net. Hairpins and net-play touch were notably good — comparable to ABBT (Aerobite Boost) at similar setups.",
        },
        {
          heading: "Where L69 will struggle",
          body: "L69's crispness is the upside if you can deliver active force. If you can't, the same crispness becomes a downside: soft swings won't load the string, drops will fly long, and the harder feel will fatigue your forearm faster than a softer string would. Reviewers explicitly note that the L69 is force-hungry — it rewards strong, concentrated swings and punishes diffuse ones. That makes it a poor pairing for 5U speed rackets, sugar-water frames like the Nanoflare 700, or beginners still developing swing technique.",
        },
        {
          heading: "Tension recommendations",
          body: "The 27 lb test point hit a sweet spot, but the L69 spec range supports up to 30 lb on stiff frames. Founder editorial estimate: club players (BUI Div 5-7 / 中羽 4-5 / USAB C) should test at 24-26 lb on mid-stiff frames before pushing higher. Competitive players with concentrated swing technique can step into 27-29 lb on attack rackets like the Astrox 88D Pro 2024, AxForce 90 New, DriveX 12. Above 29 lb, the durability advantage diminishes because frames flex less and the string sees more concentrated impact stress per unit time.",
        },
        {
          heading: "Buying guidance",
          body: "Buy L69 if: you string an attack frame at 26+ lb, you're willing to swing through the shuttle on every shot, and you want a daily-use string that won't make you re-string every two weeks. Skip it if: you play with soft-feel strings deliberately (Yonex BG65 etc.), you string under 24 lb, or you play with sugar-water rackets where the L69's load curve will work against you. Per market price L69 sits around the same tier as Yonex BG80 and Li-Ning No.5 — it's a credible alternative, not a budget compromise.",
        },
      ],
      cta: "Run the finder with smash-heavy preferences enabled — we score L69 alongside the strings that fit your frame and tension target.",
      category: "reviews",
    },
    {
      slug: "victor-p9200-iii-shoes-review",
      updatedAt: "2026-04-30",
      title: "Victor P9200 III review: the modular-midsole experiment that finally works",
      dek: "Built-in modular midsole, three-arch support, dual-density Hyper EVA. The P9200 III is the version of the modular concept that earns its keep on court.",
      sections: [
        {
          heading: "Why modular midsoles were a tough sell before this generation",
          body: "Victor has experimented with built-in / modular midsole architecture across the VG-10, VG-1, VG-11, and the original P9200 II. The pitch was always the same: separate midsole module that can be swapped or upgraded as it compresses, distinct module-to-shoe coupling that allows custom fit per player. In practice the early generations had problems — the modules felt detached, the materials were too dense, the cushioning ran out before the wear pattern said it should. Victor kept iterating. The P9200 III is the version where the modular concept earns its keep.",
        },
        {
          heading: "Build and weight",
          body: "BadmintonCN reviewer measurements on a 41 size: 265mm internal length, 336g per shoe. The midsole module alone weighs 61g — meaningfully lighter than the older VG-1 at 80g, thanks to Victor's switch to Hyper EVA + Solid EVA dual density (lighter, more responsive than the older Hyper EVA + Neo EVA combination). Upper is microfiber PU + reinforcement at the toe + dual-layer breathable mesh. Outsole is Victor's VSR rubber. Last is U-SHAPE 2.5 — a Victor mid-wide forefoot last that fits comfortably for normal-to-wide feet.",
        },
        {
          heading: "On-court feel: firm, not soft",
          body: "The most distinctive characteristic is the contact firmness. Where Yonex Comfort Z3 and similar shoes feel soft and bouncy on landings, the P9200 III is firm — closer to a 'solid rubber' density. Some players love this; some find it harsh. The advantage is stability under landings: the foot doesn't sink, the shoe responds instantly. The disadvantage is fatigue accumulation across long matches, especially for lighter players who don't generate enough mass to compress the midsole. Heavier players (75 kg+) will benefit; 65 kg-ish players may find the firmness adds joint stress over a 90-minute session.",
        },
        {
          heading: "Arch support and lateral stability",
          body: "Two engineering details stand out. The midsole has a 'three-arch support' design — three pressure-redirection ridges along the medial arch that actively support the foot under sideways cuts. Reviewers report this materially reduces arch fatigue across long matches and helps prevent plantar-fascia flare-ups for players prone to them. Second, the L-shape lateral stability structure — a hard ABS-style shell extending from heel up the medial side — handles aggressive cuts. Comparable to Yonex's stability frame; not as aggressive as Victor's own P8500 II 'eagle claw' system but reliable.",
        },
        {
          heading: "Initiation feel and the 'forward lean' caveat",
          body: "P9200 III has a distinctive forward-lean angle in the midsole — there's a noticeable heel-to-toe drop, more than typical badminton shoes. This produces fast initiation: a half-step quicker than equivalent flat-midsole shoes. But it also pushes load onto the front of the foot. Reviewers with Greek foot shape (long second toe) report some discomfort at the front-second-toe pressure point. If you have Egyptian foot shape (descending toe length) or square foot, the lean is mostly an advantage. If you have Greek foot, demo before buying.",
        },
        {
          heading: "Who this shoe is for",
          body: "Buy the P9200 III if: you are a heavier player (75 kg+) who needs maximum cushioning durability across long matches, you have wide-to-very-wide forefoot, you compete in formats where you log 90+ minutes per session, or you specifically want Victor's modular-midsole architecture for replaceable cushioning. Skip it if: you are under 65 kg and value soft-bouncy cushioning (look at Yonex Comfort Z3 instead), you have Greek foot shape, or you prioritize ultra-light tournament feel (look at Yonex Aerus Z2 or Victor Auraspeed-line shoes).",
        },
      ],
      cta: "Run the finder with foot-width and joint comfort flags set — we score the P9200 III alongside Yonex / Mizuno alternatives.",
      category: "reviews",
    },
    {
      slug: "li-ning-axforce-100-gen-2-vs-100zz-vs-90-new",
      updatedAt: "2026-04-30",
      title: "Li-Ning AxForce 100 Gen 2 review: a sugar-water 100ZZ for advanced amateurs",
      dek: "AxForce 100 Gen 2 (雷霆 100 二代) lands as Li-Ning's most direct stylistic answer to the Yonex Astrox 100ZZ. Same tough-elastic feel, same small-frame attack profile, slightly easier shaft.",
      sections: [
        {
          heading: "Where the AxForce 100 Gen 2 sits in the Li-Ning lineup",
          body: "Li-Ning's AxForce line (formerly published in Chinese markets as 雷霆 / Thunder) has an identifiable progression: AxForce 80 (sugar-water entry attack), AxForce 90 New (Li-Ning's strongest shaft to date, balanced attack), AxForce 100 Gen 2 (small-frame singles attack). They are not a strict ladder — each lives in a different style. The 100 Gen 2 is the most stylistically distinct: a small fluid box-frame square head with a thin 6.2mm shaft, designed for players who want pure tough-elastic attack feel rather than the AxForce 90 New's more crisp profile.",
        },
        {
          heading: "Specs and sample variance",
          body: "BadmintonCN reviewers measured a 4U AxForce 100 Gen 2 sample at 88.6g with the underbase removed, balance 308mm. Significant per-unit variance: across 4 brand-new 4U samples, unstrung weights came in at 83.0g, 83.9g, 84.7g, and 85.1g — a 2g range that materially affects swing feel. Buyer caution: weigh before purchase if at all possible. Frame is slightly slimmer than AxForce 90 New, with a noticeably tighter sweet spot (reviewers report 10+ sessions to fully adapt). 6.2mm shaft is the same diameter as the Yonex Astrox 100ZZ.",
        },
        {
          heading: "On court vs the Astrox 100ZZ Kurenai",
          body: "The AxForce 100 Gen 2 is the cleanest Li-Ning answer to the Yonex 100ZZ in feel. Both are tough-elastic, small-frame, head-heavy attack rackets. The 100 Gen 2 has a measurably softer shaft (~1 tier) and lighter swing weight than the Kurenai 100ZZ — meaningfully easier to drive while keeping the same on-contact character. Pocketing is comparable. Smash power: the 100ZZ Kurenai still wins on absolute force, but the 100 Gen 2's smash placement is sharper at the same effort level. Defense and counter-attack are easier on the 100 Gen 2 because shaft loading happens at lower force inputs.",
        },
        {
          heading: "On court vs the AxForce 90 New",
          body: "Different style entirely. AxForce 90 New is crisp-elastic — fast off-string, snappy feedback, big frame, forgiving sweet spot. AxForce 100 Gen 2 is tough-elastic — slight dwell on contact, more pocketing, smaller frame, less forgiving. Best for control players who win rallies through placement, drops, and tight rear-court attack. The 90 New is the better choice for fast doubles and amateurs; the 100 Gen 2 is the better choice for advanced singles players who want a singles-first attack frame with control characteristics.",
        },
        {
          heading: "On court vs the Astrox 88D Pro 2024",
          body: "Both are stiff-shaft attack rackets but they pull in opposite directions. 88D Pro 2024 is crisp-elastic, transparent power transmission, fastest off-string of any 2024 attack racket. 100 Gen 2 is tough-elastic, more pocketing on contact, sharper drops. 88D Pro 2024 wins on smash power and front-court reactivity. 100 Gen 2 wins on net-play touch and singles control rallies. If you have to pick one, choose the 88D Pro 2024 for doubles back court, the 100 Gen 2 for singles where placement matters more than raw smash speed.",
        },
        {
          heading: "Who should buy it",
          body: "Buy the AxForce 100 Gen 2 if: you play singles primarily, you like the Astrox 100ZZ profile but find the Kurenai punishing, you want Li-Ning's small-frame attack identity rather than the Yonex feel, and you're willing to invest 10+ sessions to dial in the sweet spot. Skip it if: you play fast doubles primarily (look at the AxForce 90 New or Halbertec 9000 Power instead), or you are an amateur still developing swing technique (the small sweet spot will frustrate). Sample variance is real — try in-person if possible.",
        },
      ],
      cta: "Compare the AxForce 100 Gen 2 against the Astrox 100ZZ variants in our compare tool.",
      category: "comparisons",
    },
    {
      slug: "yonex-eclipsion-z3-shoes-review",
      updatedAt: "2026-04-30",
      category: "reviews",
      title: "Yonex Power Cushion Eclipsion Z3: the firm flagship shoe most buyers overlook",
      dek: "Eclipsion Z3 sits next to the marquee 65 Z3 and Aerus Z2 in Yonex's lineup but feels like neither. Here is who it is actually for.",
      sections: [
        {
          heading: "Where it sits in the Yonex shoe lineup",
          body: "Yonex's competition shoe lineup is busier than it looks. The 65 Z3 is the marquee performance shoe with the broadest fit and friendliest cushioning. The Aerus Z2 is the lightweight tournament shoe — fast and minimal. The Comfort Z3 leans into protection. Eclipsion Z3 sits in a different zone again: integrated outsole-to-sidewall TPU, dynamic Power Carbon midfoot bridge, and a noticeably firmer ground contact than any of the other three.",
        },
        {
          heading: "Build and what makes Eclipsion distinct",
          body: "Eclipsion Z3 uses Power Cushion+ in the midsole, but the heart of the shoe is structural. A dynamic carbon connector runs through the midfoot, the outsole and sidewall are integrated as one molded unit, and reinforced TPU sits at the medial side to prevent collapse on cuts. The 42-size measures 270mm internal length at roughly 351g per shoe — about 30g heavier than the Aerus Z2 in the same size. The 3E wide last is forgiving for most foot shapes; a narrower JP version is also available.",
        },
        {
          heading: "On-court feel: firm, not soft",
          body: "First impression is the firmness. Eclipsion Z3 contacts the ground harder than 65 Z3 or Comfort Z3. For flat-foot players the arch reinforcement stands out — supportive but borderline pushy at first. For neutral or higher-arched feet it reads as confidence. Stability under cuts is excellent; the integrated TPU sidewall plus midfoot carbon plate means the foot stays aligned through 180-degree pivots. Initiation is fast despite the weight — the firmer midsole returns energy more directly than soft-bouncy alternatives.",
        },
        {
          heading: "Who benefits and who should skip",
          body: "Buy Eclipsion Z3 if: you are a heavier player (75+ kg) who needs cushioning that does not bottom out across long matches, you compete in formats where 90+ minute sessions are common, you have wide-to-very-wide forefoot, and you want a shoe that feels stable enough to commit to extreme retrievals. Skip it if: you are under 65 kg and prefer soft-bouncy feel (look at Comfort Z3 instead), you prioritize ultra-light tournament weight (Aerus Z2), or you have very high arches that may find the supportive arch design intrusive.",
        },
        {
          heading: "Quirks worth knowing",
          body: "Two notes from extended use. First, the cross-vane outsole pattern is more sensitive to dust and sweat than traditional honeycomb hex patterns. On clean wood or fresh court tape you have full grip; on dusty rec center floors you may slip on aggressive cuts. Second, the stock insole is unimpressive for a flagship shoe — many serious players replace it with a supercritical aftermarket insole, which materially changes the cushioning ceiling and ground-feel balance.",
        },
        {
          heading: "Founder firsthand",
          body: "I have not personally rotated Eclipsion Z3 — my current shoe is the Comfort Z3, which I switched to from Aerus Z2 for joint comfort. From spec and community read, Eclipsion Z3 is a serious option for heavier players who find Comfort Z3's soft cushioning inconsistent under hard landings. If you fall in that gap, demo before buying — the firm contact feel is polarizing.",
        },
      ],
      cta: "Run the finder with foot width and joint comfort flags set — we score Eclipsion Z3 alongside Comfort Z3, Aerus Z2, and the Mizuno Wave Claw line.",
    },
    {
      slug: "yonex-astrox-99-pro-2-deep-dive",
      updatedAt: "2026-04-30",
      category: "reviews",
      title: "Yonex Astrox 99 Pro: brutal precision for the player who can pay the cost",
      dek: "The 99 Pro is unforgiving by design. Its 68-hole stringbed, NAMD shaft, and weighted handle add up to a racket that punishes everything except clean mechanics — and rewards them like nothing else.",
      sections: [
        {
          heading: "Pedigree and design intent",
          body: "Astrox 99 Pro is built for one thing: rear-court attack at the highest level. Kento Momota played its predecessor (Astrox 99) for years and his feedback shaped multiple shaft and grommet revisions; Lee Zii Jia used the Yonex 100ZZ and 99 Pro during his Yonex era before switching to Victor in 2022 (he now plays the Thruster Ryuga / Ryuga II). Yonex did not engineer this frame as a do-everything pro racket — they engineered it as a head-heavy, extra-stiff statement, with no compromises toward forgiveness or front-court speed. The 100ZZ is its sibling in spirit but with a softer overall profile; the 99 Pro doubles down on demand.",
        },
        {
          heading: "Specs that matter",
          body: "Reviewers measured a 4U/G5 sample at 96g strung w/ heat-shrink and grip, balance 299mm. NAMD shaft, 210mm length. Hardness rates as 'extra stiff' on Yonex's scale — the highest tier they ship. Box-frame with e.cap. The unusual feature is the 68-hole stringbed (not the standard 76). Counter-intuitively, the 68-hole layout is engineered with tighter spacing in the sweet-spot zone, which raises perceived hardness rather than lowering it as denser stringbeds usually do.",
        },
        {
          heading: "What you feel on court",
          body: "Even at 4U the head-weight feels heavier than the published 299mm balance suggests — Yonex weighted the handle, so removing the underbase shifts the balance into the 315mm range where the racket really lives. Sweet-spot tolerance is poor for the first dozen sessions. Expect mishits on flat exchanges and front-court reflex shots. Rear-court attack is the reward: when a smash lands in the sweet spot, the directional precision and shuttle speed are top-of-class — sharper than the Astrox 88D Pro 2024 by a notable margin.",
        },
        {
          heading: "Doubles vs singles",
          body: "Reviewers consistently report that Astrox 99 Pro is not a fast-doubles racket. The combined head weight and air resistance slow drives and make front-court reflex slower than even the Astrox 88D Pro 2024. For singles or back-court mixed where rallies are longer and retrieval pace is lower, the 99 Pro shines. If you primarily play men's doubles, look at the 88D Pro 2024 or Auraspeed 100X SE instead.",
        },
        {
          heading: "Who should buy it",
          body: "Buy Astrox 99 Pro if: you play singles seriously, you have the conditioning to drive an extra-stiff shaft for full matches, your match-winning shot is the smash, and you are willing to commit 10+ sessions to dial in the small sweet spot. Skip it if: you have any shoulder or elbow injury history, you primarily play fast men's doubles, you have not yet outgrown the Astrox 88D Pro 2024 (which is the more pragmatic head-heavy choice for advanced amateurs).",
        },
      ],
      cta: "Use the finder with smash-heavy or singles-attack preferences and we score the 99 Pro against the AxForce 100 Gen 2 and Auraspeed 99.",
    },
    {
      slug: "victor-auraspeed-99-hayabusa-review",
      updatedAt: "2026-04-30",
      category: "reviews",
      title: "Victor Auraspeed 99 (Hayabusa): the Antonsen flagship that earns its difficulty",
      dek: "Alloy carbon, WES 3.0, nano-aerogel, 46T fibers. The 99 stacks every Victor flagship technology in one frame. The reward profile is unusual.",
      sections: [
        {
          heading: "What's actually different about the Hayabusa 99",
          body: "Anders Antonsen's signature Victor — the 99 — is the most engineering-heavy frame Victor ships under the Hayabusa branch. Alloy carbon fiber in the frame, 46T high-modulus carbon, WES 3.0 in the shaft, Resilience Shield, and nano-aerogel filler all combine. The trick: despite the spec sheet, swing weight stays close to the Auraspeed 90KM thanks to the aerogel offsetting the additional carbon mass. The difficulty is not in carrying the racket; it is in driving the shaft.",
        },
        {
          heading: "Specs reviewers measured",
          body: "A 4U/G5 sample weighs 93.54g strung w/ underbase, balance 295mm, 6.8mm shaft at 210mm. Hard. 76-hole stringbed (standard for Victor), 9-3 line slot, max tension 31 lb. Strung at 25-27 lb VBS66N for the linked review. Frame uses a wing-shape break-line. Sweet spot is surprisingly large for an aggressive attack frame — the alloy carbon redistributes mass without shrinking the contact zone. This makes the 99 forgiving of contact placement while still being unforgiving of shaft loading.",
        },
        {
          heading: "On-court character",
          body: "First sessions are humbling. Without short, concentrated power strokes, the shaft does not flex, the racket feels lifeless on rear-court clears, and even retrieval pops feel under-loaded. Once you commit to short sharp swings, the WES 3.0 inflection system rewards you with a snap-and-recover that does not exist on simpler shafts. Smashes get a downward bite that the 90KM does not produce; flat-exchange drives are crisp but deep — a rare combination for an attack racket.",
        },
        {
          heading: "Vs Auraspeed 90KM and 100X SE",
          body: "Auraspeed 90KM is the easier sibling — softer-feeling shaft, more forgiving for amateur drivers, but fewer flex events per swing. The 100X SE is the speed-doubles benchmark — much faster swing, weaker rear-court bite. The 99 Hayabusa sits as the demanding singles or mixed-doubles back-court racket. If you can drive it, it is the closest thing Victor makes to a Yonex Astrox 99 Pro in feel — minus some of the punishment.",
        },
        {
          heading: "Buying advice",
          body: "Buy Auraspeed 99 if: you compete in singles or back-court mixed, you have established short-power swing technique, you have outgrown the 90KM and want more shaft event per stroke, and you are loyal to the Victor frame language. Skip it if: you primarily play fast men's doubles (the 100X SE will serve you better), you are still an intermediate-level driver, or your current racket is the Astrox 88D Pro 2024 and you are looking to switch ecosystems for a real reason — the 88D Pro is comparable.",
        },
      ],
      cta: "Compare the Auraspeed 99 head-to-head with the Astrox 99 Pro and AxForce 100 Gen 2.",
    },
    {
      slug: "li-ning-bladesabre-max-shoes-review",
      updatedAt: "2026-04-30",
      category: "reviews",
      title: "Li-Ning Bladesabre MAX: the under-radar competition shoe to demo before your next 65 Z3",
      dek: "BOUNSE+, 䨻, carbon plate. Li-Ning's Bladesabre MAX gets the shoe-stack right for serious doubles play — and at a price that keeps you honest.",
      sections: [
        {
          heading: "Why this shoe matters",
          body: "Yonex Comfort Z3 and Power Cushion 65 Z3 dominate amateur shoe conversations. Li-Ning's competition shoes get less airtime, partly because the 65 Z3 is genuinely good and partly because Li-Ning's English-language marketing lags Yonex's. The Bladesabre MAX is the shoe most likely to make Li-Ning's case to a serious amateur player — engineered cushioning, carbon-plate stability, and a fit that locks the foot without relying on a bulky upper.",
        },
        {
          heading: "Build",
          body: "Cushioning stack is dual-density: BOUNSE+ in the forefoot for direct ground contact and crisp net-step feedback, 䨻 (Li-Ning's bounce foam) in the heel for impact absorption on landings. A carbon-fiber + TPU torsion plate runs through the midfoot — distinct from the integrated outsole-sidewall TPU on Yonex Eclipsion Z3 and closer to a traditional plate. Upper is low-stretch microfiber with TPU heel reinforcement. Last fits a true normal-to-narrow foot well; wider feet should size up or look elsewhere.",
        },
        {
          heading: "On-court feel",
          body: "Snug from the moment you lace up. The microfiber upper does not give as you warm up, which means you can be confident about tracking without re-tying. Forefoot crispness is the standout: BOUNSE+ gives clean ground feedback for the small adjusting steps that matter at the net. Heel landings on smashes feel cushioned without feeling soft — the 䨻 foam absorbs without bottoming out. Carbon plate genuinely works under torsion: 180-degree pivots and aggressive cuts stay aligned.",
        },
        {
          heading: "Where it falls short",
          body: "Two limits worth knowing. First, initiation is good but not class-leading. The forefoot stack is slightly thicker than ultra-light tournament shoes like the Aerus Z2, so the absolute first-step is a half-tick slower. For most amateurs this is invisible; for fast-doubles specialists it might matter. Second, factory outsole grip is excellent on clean wood floors but slips on dusty or older rec-center courts. Reviewers recommend scrubbing the new sole on concrete to remove the factory oxide before competition use — typical Li-Ning behavior.",
        },
        {
          heading: "Pick it if",
          body: "Buy Bladesabre MAX if: you have a normal-to-narrow forefoot, you compete in doubles or singles where landing cushioning matters across long sessions, you want a Li-Ning competition shoe and don't want to pay 65 Z3 / Comfort Z3 pricing, and you have access to a clean-floor practice court for initial sole break-in. Skip it if: you have wide forefoot (look at Comfort Z3 wide or Mizuno Wave Claw wide), you specifically want ultra-light tournament weight, or you primarily play on dusty rec-center floors where the factory outsole will fight you.",
        },
      ],
      cta: "Compare Bladesabre MAX against Comfort Z3 and Eclipsion Z3 in our finder — we score by foot width and weight class.",
    },
    {
      slug: "victor-auraspeed-hs-plus-deep-dive",
      updatedAt: "2026-04-30",
      category: "reviews",
      title: "Victor Auraspeed HS Plus: the speed racket that turned into a smash weapon",
      dek: "HS Plus arrived as a successor to the popular Hayabusa SE but ended up reshaping what a speed racket can do under load. Here is what changes — and what does not.",
      sections: [
        {
          heading: "From Hayabusa to HS Plus — what's new",
          body: "Victor's Hayabusa lineup has long been the speed-attack hybrid for players who want frame-feedback closer to a head-heavy frame than a pure speed racket. The HS Plus inherits the visual identity of the line but commits harder. Power Ring junction (also seen on the 90KM) replaces the standard cone-cap interface for stiffer power transmission. WES 3.0 is added to the shaft. The frame moves to a smaller head than the previous HS — closer to the Auraspeed 100X SE size — with a more aggressive break-line.",
        },
        {
          heading: "What you measure",
          body: "Reviewers report a 4U/G5 with underbase removed at 88.21g, balance 305mm, 6.8mm shaft at 218mm. Hard. 76-hole stringbed, 9-3 line slot, max tension 28 lb. Strung at 26-28 lb VBS66N. The frame is noticeably thin. Sweet spot is small — reviewers explicitly call out frequent miss-frame hits during the first few sessions of acclimatization. The Antitorsion shaft system is shared with the Auraspeed 90K flagship — distinct from the simpler shaft of the original Hayabusa.",
        },
        {
          heading: "On court — the speed surprise",
          body: "Despite the higher swing weight, HS Plus feels faster than the previous HS through the air. The frame is narrow enough that air resistance drops sharply, and the additional shaft stiffness plus Power Ring junction make energy transfer crisp. Flat exchanges in mid-court reach a level reviewers describe as 'racket-led' — the racket arrives at contact ahead of the brain, and you find yourself with extra time per shot in transition.",
        },
        {
          heading: "On court — the smash surprise",
          body: "WES 3.0 does for HS Plus what it does for the Auraspeed 99: it allows short, concentrated power strokes to translate into deep, fast smashes that simpler shafts cannot produce at the same swing weight. Reviewers describe the smash bite as comparable to the Auraspeed 90K — unusual for a speed racket. The penalty: when fatigue sets in and you start swinging long instead of short, the same shaft loses its bite, and downward angle suffers. HS Plus rewards crisp form, punishes muddled mechanics.",
        },
        {
          heading: "Who should buy it",
          body: "Buy HS Plus if: you play men's doubles at a level where front-court speed is decisive, you have established short-stroke power technique, you are willing to spend 10+ sessions adapting to the smaller sweet spot, and you want a single racket that handles speed and back-court smash in the same frame. Skip it if: you are a comfortable sugar-water (NF700 / NF700 Pro) player and trying to upgrade — the gap is too large; the Auraspeed 100X SE is a better intermediate step. Also skip if you have pre-existing shoulder issues — the racket asks for force concentration that less-experienced shoulders may not deliver safely.",
        },
      ],
      cta: "Run the finder for fast-doubles or speed-attack profile and we score HS Plus against 100X SE and 1000Z.",
    },
    {
      slug: "li-ning-halbertec-7000-ii-review",
      updatedAt: "2026-05-05",
      category: "reviews",
      title: "Li-Ning Halbertec 7000 II review: the smarter buy before Halbertec 8000",
      dek: "The second-generation Halbertec 7000 borrows enough of Li-Ning's control-platform language to make the 8000 feel less automatic for many club players.",
      sections: [
        {
          heading: "Why this model matters",
          body: "Halbertec 8000, 9000, and 9000 Power attract the high-end attention, but the Halbertec 7000 II is the more interesting value test. The source review frames it as a second-tier racket with high-end behavior: softer pricing, upgraded paint, a more composed vibration profile, and enough shared Halbertec DNA that shoppers considering the 8000 should pause before paying flagship money.",
        },
        {
          heading: "Design and construction",
          body: "The review highlights a calmer version of the Halbertec visual language: asymmetric aurora-style purple and ice-green panels, matte black and ivory shaft blocking, and metallic particles in both main frame colors rather than only one side. Under the paint, the talking points are Stabilized Layout frame reinforcement, SW Balance weight distribution, ACC-RIF composite control, and a 6.8mm medium-flex shaft with high-density vibration damping. The important buyer translation is simple: Li-Ning has tuned this as a balanced control racket first, not as a rear-court hammer.",
        },
        {
          heading: "On-court feel",
          body: "The 7000 II plays with the familiar Halbertec control identity, but the review calls out a harder, cleaner impact feel than expected from this series. Clears are easy enough because the 6.8mm shaft stores and returns energy without asking for pro-level force. Directional stability is the stronger note: the shuttle leaves predictably on high clears, pushes, and guided transitions, which is exactly what a control-first racket must do to justify itself.",
        },
        {
          heading: "Attack and continuity",
          body: "Do not buy this expecting 9000 Power smash behavior. The reviewer still gives the 8000 more weight and pressure on full-power smashes, while the 7000 II wins on comfort and short-stroke response. That makes the 7000 II more useful in ordinary doubles rallies than its spec sheet suggests: point smashes, quick follow-up attacks, and half-court pressure feel crisp, while full rear-court bombing is merely good rather than elite.",
        },
        {
          heading: "Net and defense",
          body: "The strongest part of the review is control. Net shots, cross-court touches, and guided placements benefit from a stable face and reduced unwanted vibration. On defense, the moderate balance keeps recovery manageable, and the shaft has enough elasticity to lift or redirect without a large swing. This is the profile many club players actually need: a racket that lets them survive speed, organize the rally, and still finish when the chance is obvious.",
        },
        {
          heading: "Who should buy it",
          body: "Buy the Halbertec 7000 II if you wanted the 8000 for control but worried about price, dull feedback, or long-term comfort. It suits intermediate club players, mixed doubles players, and all-round singles players who win through placement and patience. Skip it if your main need is maximum rear-court smash weight, or if you already know you want the sharper, more demanding flagship feel of the 9000 Power.",
        },
      ],
      cta: "Use the finder with control-first or all-round profiles to compare Halbertec 7000 II against 8000 and 9000 Power.",
    },
    {
      slug: "victor-carbonsonic-max-shuttle-review",
      updatedAt: "2026-05-05",
      category: "reviews",
      title: "Victor Carbonsonic MAX shuttle review: when synthetic stops feeling like compromise",
      dek: "Carbonsonic MAX is not just a cheaper practice shuttle. The latest version makes a serious case through consistency, durability, and predictable flight.",
      sections: [
        {
          heading: "The problem it solves",
          body: "Feather shuttle prices have climbed hard enough that many clubs now treat every tube as a budget decision. The source review reads Carbonsonic MAX as the mature version of Victor's synthetic-shuttle experiment: not a novelty, not a desperation choice, but a controlled product line aimed at reducing the variance and cost pain that come with natural feathers.",
        },
        {
          heading: "What changed in MAX",
          body: "Compared with earlier Carbonsonic / NCS models, MAX focuses on vane toughness, cleaner inner coating, tighter vane spacing, stronger stems, and a more secure cork-to-skirt connection. Those changes matter because synthetic shuttles often fail in ugly ways: the skirt deforms, the flight path wobbles after a hard smash, or the head connection gives up while the skirt still looks usable. MAX is designed to keep its structure intact longer, so the shuttle dies more gradually and more predictably.",
        },
        {
          heading: "Weight consistency",
          body: "The most persuasive part of the source review is the weighing comparison. A 12-shuttle Carbonsonic MAX tube measured almost exactly around 5.0g with a very narrow spread, while several premium feather tubes showed wider shuttle-to-shuttle variance. Weight alone does not prove flight quality, but it explains why the reviewer keeps returning to consistency: players are less likely to open a tube and discover one shuttle that flies fast, another that floats, and another that feels dead.",
        },
        {
          heading: "On-court flight",
          body: "The review's practical claim is that MAX now flies close enough to high-grade feather shuttles to be useful for serious training. Clears follow a stable arc, the shuttle holds shape after harder contacts better than previous generations, and speed changes are less erratic as the rally extends. The feel is still not identical to feather, especially for players who live on slice, deception, and tight net tumble, but the gap is narrow enough that the cost argument finally becomes serious.",
        },
        {
          heading: "Durability and use case",
          body: "Carbonsonic MAX makes most sense where repeatability matters more than prestige: coaching baskets, club nights, school programs, intermediate training groups, and players who want one tube to survive hard practice without turning every session into a feather-budget debate. High-level match play may still prefer premium feather shuttles for touch and tradition, but the synthetic option is no longer only for casual games.",
        },
        {
          heading: "Who should buy it",
          body: "Buy Carbonsonic MAX if you run regular group sessions, you are tired of inconsistent budget feather tubes, or your club wants stable practice quality without premium feather cost. Skip it if your main benchmark is tournament touch at the net, or if your group refuses any synthetic feel regardless of practical performance. For most cost-sensitive clubs, MAX belongs on the shortlist.",
        },
      ],
      cta: "Use the finder when shuttle recommendations launch; for now, treat Carbonsonic MAX as the serious synthetic benchmark.",
    },
    {
      slug: "bonny-leisu-800-racket-review",
      updatedAt: "2026-05-05",
      category: "reviews",
      title: "Bonny LeiSu 800 review: a fast attack racket with real bite",
      dek: "NF800-style frame speed, foam-filled stability, and a 6.5mm solid shaft make the LeiSu 800 a sharper racket than its price tier suggests.",
      sections: [
        {
          heading: "What it is",
          body: "Bonny's LeiSu 800 sits in the speed-attack lane. The source review describes a 4U/G5 racket with a narrow NF800-style low-drag frame, 76-hole pattern, foam-filled frame construction, 40T carbon plus nickel-titanium shaft material, a 6.5mm solid shaft, and a 30 lb warranty tension. In plain terms: this is built to swing quickly, stay stable at contact, and reward players who can actually load a stiffer shaft.",
        },
        {
          heading: "First feel",
          body: "The reviewer removed the base grip and played with an overgrip, which increases the visible head-weight sensation. Even then, the swing weight is described as manageable. The sweet spot is not huge, but the frame gathers power cleanly when contact is centered. The hit is direct rather than sticky, with little unwanted vibration, which is exactly what you want from a fast attack frame: no dramatic dwell, no vague feedback, no soft delay.",
        },
        {
          heading: "Power and control",
          body: "The standout is power transmission. With JS63 at 28 lb, the source review describes both full smashes and stick smashes as heavy, fast, and easy to repeat for players with good force concentration. The racket's anti-torsion behavior also matters: it does not twist around the shuttle on off-center pressure as much as cheaper speed frames often do. That stability turns into better placement on drives, punch clears, and smash follow-ups.",
        },
        {
          heading: "Speed play",
          body: "Flat exchanges are where the LeiSu 800's frame shape pays off. The ultra-thin box profile keeps response quick, and the direct stringbed feel makes blocks and counters leave the racket fast. This is not a soft defensive helper for beginners. It is a racket that expects the player to meet the shuttle early and use the frame speed to steal time.",
        },
        {
          heading: "Limits",
          body: "The same traits that make LeiSu 800 exciting create the buying risk. The sweet spot is moderate, the shaft leans stiff, and the racket wants clean mechanics. Beginners or players with slow preparation may find it harsh or unforgiving. Players who already like Nanoflare 800-style frames but want a lower-cost, more solid-feeling alternative will understand it much faster.",
        },
        {
          heading: "Who should buy it",
          body: "Buy the LeiSu 800 if you are an intermediate-to-advanced player who wants one racket for singles control, doubles rear-court pressure, and fast mid-court countering. Skip it if you need sugar-water forgiveness, a large sweet spot, or a very low entry threshold. This is one of the better arguments for looking beyond the major three brands, but it is still a performance racket, not a shortcut.",
        },
      ],
      cta: "Use the finder with speed-attack preferences to compare LeiSu 800 against Nanoflare 800 Pro and Victor HS Plus.",
    },
    {
      slug: "kumpoo-shanhai-new-racket-review",
      updatedAt: "2026-05-05",
      category: "reviews",
      title: "Kumpoo Shanhai NEW review: stable, heavy, and more patient than flashy",
      dek: "Shanhai NEW looks like an Arcsaber 11 Pro reference point, but on court it trades whip for steadiness and a heavier finishing ball.",
      sections: [
        {
          heading: "The reference point",
          body: "The source review immediately compares Kumpoo Shanhai NEW with the Yonex Arcsaber 11 Pro because the frame language is similar: full fluid box frame, balanced-control intent, and a big enough face to invite all-round play. But the on-court behavior is not a clone. The 11 Pro has a clearer whip sensation through the second half of the swing. Shanhai NEW feels more even through the whole motion: steadier, heavier, and less springy.",
        },
        {
          heading: "Measured setup",
          body: "The review sample was 4U/G5, strung and overgripped without the base grip at 88.23g, with a 308mm balance point, 35 lb warranty tension, 205mm handle, and 215mm shaft. String was Yonex EXBOLT 65 at 25-27 lb with prestretch. That setup matters because it explains the reviewer's main theme: this is not a featherweight speed frame. It has enough mass and balance to feel composed, especially in singles patterns and patient build-up rallies.",
        },
        {
          heading: "Hit feel",
          body: "Shanhai NEW hits firm and stable. The 6.8mm shaft and rigid frame resist twisting, so the face stays honest through guided clears, pushes, and controlled transition shots. The tradeoff is that the racket gives less free launch than an elastic control racket. If you want deep clears, you still need to add active force. If you do, the payoff is accurate, low-noise response with very little frame wobble.",
        },
        {
          heading: "Where it wins",
          body: "Control is the clean win. The source review specifically likes tight net exchanges, short placements, and patient back-court control. Heavy smashes are also better than the Arcsaber comparison might imply: the shuttle may not leave at extreme speed, but it carries enough weight that opponents struggle to lift cleanly. This makes Shanhai NEW useful for singles players who build rallies through length, pressure, and one decisive finish rather than constant early attack.",
        },
        {
          heading: "Where it loses",
          body: "Flat drives and first-step racket speed are the concern. The reviewer's long-term use of lighter 5U and low-swing-weight rackets made Shanhai NEW feel slower in quick exchanges. The frame is stiff enough that the shuttle leaves cleanly once contact happens, but getting the racket to the contact point takes more work than with pure speed frames. Fast doubles specialists should take that seriously.",
        },
        {
          heading: "Stringing and buyer fit",
          body: "The source review recommends harder elastic or attack strings rather than thick 0.70mm durability strings, which can make the setup feel too meaty. Buy Shanhai NEW if you want a balanced racket with high stability, controlled singles behavior, and a heavier ball than the Arcsaber-style comparison suggests. Skip it if your main priority is fast doubles interception or ultra-easy lift assistance.",
        },
      ],
      cta: "Run the finder with singles control or all-round profiles to compare Shanhai NEW against Arcsaber 11 Pro and Halbertec 7000 II.",
    },
    {
      slug: "li-ning-axforce-80-review",
      updatedAt: "2026-05-05",
      category: "reviews",
      title: "Li-Ning AxForce 80 review: the attack racket that doubles players should not ignore",
      dek: "AxForce 80 carries a singles-attack reputation, but the 4U version has enough speed and directional confidence to work in ordinary doubles.",
      sections: [
        {
          heading: "Why it aged well",
          body: "AxForce 80 arrived with athlete-signature energy and the usual premium-racket hype, but the source review strips that away and lands on a more useful conclusion: it is a credible first-tier Li-Ning attack racket with a friendlier doubles profile than many expected. That matters because many players now compare it against newer AxForce and Astrox frames rather than buying it in a vacuum.",
        },
        {
          heading: "Measured setup",
          body: "The reviewed sample was 4U/G5 with base grip and heat-shrink still on, strung and overgripped at 95.8g total, 290mm balance, 6.6mm shaft, medium-stiff tuning, box frame, 76-hole stringbed, 9-3 line groove, and BG66 Ultimax at 26 lb. Because the base grip and wrap remained, the visible balance point understates the racket's attack identity. The more important practical note is that the 4U does not swing like a slow hammer.",
        },
        {
          heading: "Getting used to it",
          body: "The reviewer needed time to read the stringbed. The early feel with BG66U was slightly muted, which made the sweet spot less obvious during warm-up. Once adjusted, the better traits appeared: strong shaft elasticity, clean length on clears, and confident direction. The shaft is described as one of Li-Ning's better-feeling medium-stiff attack shafts, closer in perceived quality to the leading Yonex and Victor stiff ranges than older Li-Ning stereotypes suggest.",
        },
        {
          heading: "Doubles behavior",
          body: "The surprise is doubles. AxForce 80 is not as light or instantly reactive as a pure speed racket, but the 4U version recovers quickly enough for ordinary club doubles. Blocks, side lifts, flat counters, and push variations benefit from a crisp response and clear pointing. In rallies where the pace is fast but not professional-fast, the racket lets a player mix attack and control without feeling trapped in a singles-only frame.",
        },
        {
          heading: "Attack ceiling",
          body: "The review is honest about the ceiling: compared with Li-Ning's Dragonfang-style heavy attack feel, AxForce 80 gives up some raw finishing brutality. The reviewer also felt the BG66U setup softened the heavy smash, making the sound better than the absolute weight of shot. A harder or thicker attack string would likely suit the frame better for players buying it mainly to smash.",
        },
        {
          heading: "Who should buy it",
          body: "Buy AxForce 80 if you want a Li-Ning flagship attack profile that can still handle doubles, especially in 4U. It fits intermediate-to-advanced players who want head-heavy confidence without the full punishment of the most demanding pro frames. Skip it if you need maximum rear-court smash mass above all else, or if your doubles game is built on constant front-court interception where a pure speed frame will recover faster.",
        },
      ],
      cta: "Use the finder to compare AxForce 80 against AxForce 90 New, AxForce 100 Gen 2, and Astrox 88D Pro.",
    },
    {
      slug: "how-to-choose-a-badminton-racket",
      updatedAt: "2026-04-30",
      category: "guides",
      title: "How to choose a badminton racket: a buyer's guide for beginners and intermediates",
      dek: "Five decisions that matter — weight class, balance, shaft flex, string tension, grip size — and three that do not. The honest guide that pro shops will not give you.",
      sections: [
        {
          heading: "Stop reading marketing language. Start with five questions.",
          body: "Brand catalogues are written to make every racket sound special. Yours is not. The five decisions that actually determine whether a racket fits you are: (1) Weight class — 3U, 4U, or 5U. (2) Balance — head-light, even, or head-heavy. (3) Shaft flex — flexible, medium, stiff, or extra-stiff. (4) Common string tension range. (5) Grip size — G4, G5, G6. Every other spec on the box (frame width, grommet count, branded carbon names) is downstream of these five.",
        },
        {
          heading: "1. Weight class — start with 4U if unsure",
          body: "3U rackets weigh 85-89 grams unstrung, 4U is 80-84g, 5U is 75-79g, 6U is around 70g. The difference between 3U and 5U is dramatic in your hand — about 10% of the racket's mass. As a rough rule: 5U for new players, casual recreational players, and most women's doubles. 4U for the great majority of intermediate-and-up club players. 3U only if you specifically want a head-heavy attack feel and your shoulder is conditioned for it. Skip 6U entirely as an adult — they are toys.",
        },
        {
          heading: "2. Balance — match it to your role, not your idol",
          body: "Balance is where the racket's mass concentrates. Head-light frames (around 285-292mm balance point) recover quickly, defend better, and reward fast hands at the cost of smash mass. Head-heavy frames (around 295-310mm) load more weight into the smash but are slower to recover. Even-balance sits in the middle. The right answer depends on what kind of points you actually win — if you are not sure, watch a video of yourself. If your match-winners are smashes from the back court, head-heavy. If they are flat drives and net taps, head-light. If they are mostly errors against you, even.",
        },
        {
          heading: "3. Shaft flex — go softer than you think",
          body: "A flexible shaft bends more on contact and is much more forgiving of late timing — clears go further on imperfect contact, and the racket is gentler on your shoulder. A stiff or extra-stiff shaft transmits force directly with no buffer — when your timing is clean it produces faster smashes; when it is not, it produces shoulder pain and short clears. Most amateurs are over-stiffened: they buy pro-tier extra-stiff frames because their favourite player uses one, then lose smash power because their swing speed is not high enough to load the shaft cleanly. Default to medium or medium-stiff until your contact point is consistent.",
        },
        {
          heading: "4. String tension — under-string, then go up slowly",
          body: "Tension is independent of the racket — but it changes the racket's feel more than most spec swaps. Higher tension narrows the sweet spot and sharpens feedback, lower tension forgives mishits and adds repulsion on imperfect contact. As a starting band: 22-24 lb for new players, 24-26 lb for club players, 26-28 lb for league players, 28-30 lb only for tournament-tier players. Going above 30 lb on amateur swing speed reduces real-game power because too few hits land in the shrunken sweet spot. Restring every 30-50 sessions or every 3-4 months even if the string has not snapped — tension drops well before a break.",
        },
        {
          heading: "5. Grip size — measure, do not guess",
          body: "Yonex G4 is the largest commonly available size, G5 is medium, G6 is small. Most adult men with average hands fit G5; smaller hands and most adult women fit G6. The wrong grip size shows up as forearm fatigue (grip too small — you over-grip to compensate) or wrist soreness (grip too large — you cannot rotate cleanly on backhand). You can always add an overgrip to make a smaller grip slightly larger; you cannot easily make a large grip smaller. When in doubt, buy one size down and add an overgrip.",
        },
        {
          heading: "What does NOT matter (much)",
          body: "Frame colour. Whether the racket is named after a current pro. Carbon-marketing names that change every two years (Namd, Aero+Box, Power Boost Cap — these do real things, but the difference between racket A and racket B with the same balance and flex is small in your hand). Weight in grams down to single-digit precision. Whether the racket is 'singles' or 'doubles' specific in marketing — those tags are loose mappings of the five core specs above. Spend your attention on the five things that move performance, not the marketing language wrapped around them.",
        },
        {
          heading: "Three honest first-racket recommendations",
          body: "If you have $80-120 to spend: Yonex Nanoray Light 70i (5U, even-balance, flexible — friendliest possible first racket). If you have $120-180 and play 2+ times per week: Victor DriveX 8S or Yonex Astrox 7 (4U, even-to-slight-head-heavy, medium — handles attack and defense). If you have $180-250 and you are committed to staying with badminton for years: Yonex Astrox 77 Pro or Astrox 7 Pro (4U, slightly head-heavy, medium-stiff — the friendliest pro-tier upgrade Yonex makes). Avoid 100ZZ, 99 Pro, 88D Pro 2024, and 1000Z as a first racket — they are pro flagships that will actively make you worse before you learn to drive them.",
        },
      ],
      cta: "Run the IntoBadminton finder — five quick questions, ranked picks with reasons.",
    },
    {
      slug: "badminton-equipment-for-kids",
      updatedAt: "2026-04-30",
      category: "guides",
      title: "Badminton equipment for kids: rackets, shoes, and shuttles for ages 6-14",
      dek: "How to equip a young player without burning hundreds of dollars or stunting their technique. Honest picks from a coach-trained parent's perspective.",
      sections: [
        {
          heading: "Why kid-specific equipment matters more than adult equipment",
          body: "Kids learn motor patterns from the equipment that fits their body. A racket too heavy for a 9-year-old produces a permanent over-reliance on shoulder rather than wrist and core — the wrong technique gets locked in before the child has the strength to swing properly. The same is not true for adults, who can usually correct technique on whatever equipment fits their pocket. With kids, fit comes first.",
        },
        {
          heading: "Rackets by age and height",
          body: "Ages 6-8 / under 130cm: aluminium-shaft junior racket, 22-26 inches long, 80-90 grams. Yonex B-350Jr, Victor AL-2200JR, or any club-issued junior racket. Ages 8-11 / 130-150cm: Yonex Muscle Power 2 Junior, Astrox 01 Clear, or 5U adult lightweight rackets like the Nanoray Light 70i (the latter is fine for taller pre-teens). Ages 12-14 / 150cm+: most kids are ready for proper 5U adult rackets — Astrox 1, Nanoray 7, or Arcsaber 7 Junior. Avoid head-heavy or extra-stiff frames at every junior tier.",
        },
        {
          heading: "Shoes — buy fitted, replace as feet grow",
          body: "Junior badminton shoes exist (Yonex Power Cushion 65 Z Junior, Victor SH-A170JR) and they are worth the spend if your child plays more than once a week. Avoid hand-me-down running shoes — the raised heel is a real ankle-roll risk on lateral movement. Plan to replace every 6-12 months because feet grow faster than the shoe wears. Buy half a size up from current foot length and check fit every 3 months.",
        },
        {
          heading: "Shuttles — plastic at home, feathers at training",
          body: "Yonex Mavis 200/300/350 plastic shuttles cost more upfront but last 20-50 hours of play. Use plastic for backyard practice, family rallies, and beginner classes. Switch to inexpensive feathered shuttles (Yonex Aerosensa 10 / 20, Victor Champion No.1) once the child plays in club drills — feathered flight teaches proper timing in a way plastic cannot. Avoid premium tournament shuttles (AS-50, AS-40) until the child plays competitively; they break too fast on imperfect contact.",
        },
        {
          heading: "Strings and tension — keep it low, replace it often",
          body: "String junior rackets at 16-20 lb. Yonex BG65 is the right string for almost every kid — durable, forgiving, cheap. Restring every 3-4 months even if the string has not broken. The lower-tension stringbed gives a softer trampoline feel that helps young arms generate clears without needing adult swing speed.",
        },
        {
          heading: "What to skip",
          body: "Grip-size sizing — junior rackets come in one grip size, and adding a kid overgrip is enough fine-tuning. Vibration dampeners — the kid does not need them and they get lost. Branded racket bags — a backpack with a racket-shaped pocket is plenty until the player is in tournament-level training. Pro-shop level coaching gear — a bag of plastic shuttles and a court is far more valuable than $300 of equipment for a 10-year-old.",
        },
        {
          heading: "Total reasonable budget by age",
          body: "Ages 6-8: $60-100 covers everything — junior racket, shoes if needed, plastic shuttles, basic bag. Ages 8-11: $100-180 — better racket, dedicated junior badminton shoes, mix of plastic and feathered shuttles. Ages 12-14 once committed to the sport: $200-300 covers an adult-tier 5U racket, proper court shoes, restringing twice a year, and feathered shuttles for competition. Spending more than $300 on a junior is almost never justified by performance — keep the money for coaching and court time instead.",
        },
      ],
      cta: "When the kid graduates to adult-tier rackets, start with the IntoBadminton finder — it weights light frames first.",
    },
    {
      slug: "badminton-glossary-terms-every-player-should-know",
      updatedAt: "2026-04-30",
      category: "guides",
      title: "Badminton glossary: 40+ terms every club player should understand",
      dek: "From sweet spot to U-class to BWF tour — the working vocabulary you need to read reviews, talk to your stringer, and follow professional matches.",
      sections: [
        {
          heading: "Equipment terms",
          body: "U-class: weight class for unstrung rackets — lower number means heavier. 3U is ~85-89g, 4U is 80-84g, 5U is 75-79g. F: flyweight, lighter than 6U, almost always junior-only. Head-heavy / head-light / even-balance: where mass concentrates in the racket; measured as the balance point in millimetres from the butt cap (around 280-310mm in normal frames). Shaft flex: how much the shaft bends under load — flexible, medium, stiff, extra-stiff. Sweet spot: the area on the stringbed where contact produces maximum repulsion and minimum vibration. Frame: the head ring of the racket. T-joint: where the shaft meets the frame; modern rackets often use built-in T-joints for stiffness. Grommets: the plastic eyelets through which strings thread — replaceable when worn.",
        },
        {
          heading: "String and tension terms",
          body: "Gauge: string thickness in millimetres (0.61-0.72mm common). Thinner strings are more elastic, thicker strings are more durable. Tension: how tightly the string is pulled, measured in pounds (lb). Pre-stretch: a stringer technique to reduce post-stringing tension drop. Stencil: applied logo on the string after stringing for tournament identification. BG65, BG80, BG80 Power, EXBOLT 63, Aerobite, L69: common Yonex and Li-Ning strings, ranked by feel from soft / forgiving (BG65) to crisp / tour-tier (EXBOLT 63). Hybrid stringing: using different strings on the mains and crosses, like Aerobite. Restring trampoline: the soft repulsion feel of a fresh stringbed; degrades over weeks even if the string has not broken.",
        },
        {
          heading: "Shoe terms",
          body: "Power Cushion / Power Cushion+: Yonex's branded EVA midsole compound, designed to absorb landing impact. Toe drag protection: reinforced toe area on shoes for players whose front foot drags during lunges. Gum rubber: the soft outsole compound used on indoor court shoes for grip on wood. Last: the foot mould used to shape the shoe; Asian lasts (Victor, Mizuno) tend to be narrower than European/US lasts. Wide fit / Wide Last: shoes designed with extra forefoot width — note that 'wide' is measured against a brand's own regular fit, not absolutely.",
        },
        {
          heading: "Stroke and tactical terms",
          body: "Clear: an overhead shot sent deep to the opponent's back court. Drop: a soft shot from the back court that lands just over the net. Smash: an attacking overhead hit downward at speed. Drive: a flat, fast shot at body height. Net shot / hairpin: a soft shot from the net, just over the tape. Push: a fast, flat net shot that travels to the opponent's mid-court. Block: a defensive return that absorbs smash power and lands short. Lift: a defensive shot that sends the shuttle high and deep. Slice: a cut stroke that adds spin and changes shuttle trajectory.",
        },
        {
          heading: "Court and rule terms",
          body: "Service court / receiving court: the rectangles where the serve must land. Front court / mid court / back court: the three depth zones on each side of the net. Singles tramline / doubles tramline: the side lines that change between formats — singles uses the inner, doubles the outer. Rally point scoring: the modern format where every rally scores a point regardless of who served. Service judge: the official watching for service-height violations. Let: a replay of the rally with no point awarded.",
        },
        {
          heading: "BWF and competition terms",
          body: "BWF: Badminton World Federation, the global governing body. World Tour: BWF's professional ranking circuit (Super 1000, Super 750, Super 500, etc.). Super Series Finals: end-of-season top-8 event (renamed BWF World Tour Finals). Olympic qualification race: the 12-month points-based ranking that determines Olympic spots. World Championships: BWF's annual non-Olympic top event. Thomas Cup / Uber Cup / Sudirman Cup: men's, women's, and mixed-gender team championships.",
        },
        {
          heading: "Player and tactical jargon",
          body: "Sugar-water: forum slang for an extra-easy, forgiving racket — derives from Chinese badminton community usage. T0 / T1 / S-tier: forum tier rankings used on BadmintonCN to compare racket classes. Kurenai / Camel-gold / 安塞龙 (Axelsen): colourway names that distinguish racket generations (e.g. Astrox 100ZZ Kurenai is the original red Black-Micro-Core edition; 100ZZ 安塞龙 is the Viktor Axelsen / VA edition that uses Volume Cut Resin instead). Note: 安塞龙 is the Chinese transliteration of Viktor Axelsen, not Anders Antonsen — Antonsen is sponsored by Victor, not Yonex. YuanShi (源式) shaft hardness: shaft-deflection numbers measured and published by a Chinese badminton creator using a professional racket testing rig (lower number = stiffer); widely cited on BadmintonCN but not an official manufacturer spec. SE / VA / Tour: subvariants of pro frames signed off by specific players (e.g. Mohammad Ahsan SE, Viktor Axelsen VA, Tour, Game).",
        },
      ],
      cta: "Now you can read deep-dives without the language barrier — start with our racket-balance guide.",
    },
    {
      slug: "yonex-grip-sizes-explained",
      updatedAt: "2026-04-30",
      category: "guides",
      title: "Yonex grip sizes (G4, G5, G6) explained — and how to pick yours",
      dek: "How Yonex grip sizes compare to Victor and Li-Ning, why most adults pick G5 or G6, and what an overgrip actually changes about size.",
      sections: [
        {
          heading: "What the G-numbers mean",
          body: "Yonex grip sizes use G3, G4, G5, and G6 nomenclature, where the higher number is a thinner grip. G3 is the largest commonly produced (rarely sold outside Asia). G4 is large — about 3.5 inches in circumference. G5 is medium — about 3.25 inches. G6 is small — about 3 inches. The same numbering is used on most Yonex rackets globally, though some regional retailers re-tag them with different conventions; always verify the circumference if you are unsure.",
        },
        {
          heading: "Most adult men fit G5; most adult women fit G6",
          body: "These are guidelines, not laws. Tall men with large hands sometimes prefer G4. Junior players, women with smaller hands, and adults with shorter palms generally prefer G6. The wrong grip size produces predictable symptoms: too small means you over-grip the racket to keep it stable, which fatigues your forearm. Too large means you cannot rotate the racket cleanly for backhand strokes, which fatigues your wrist. If you experience either symptom after a session, your grip is the wrong size.",
        },
        {
          heading: "Victor and Li-Ning grip sizes — not directly comparable",
          body: "Victor uses G2 / G4 / G5 / G6 nomenclature with different absolute measurements. A Victor G5 is roughly equivalent to a Yonex G5, but a Victor G4 is closer to a Yonex G4 / G3 mid-point. Li-Ning grip sizes use S1 / S2 / S3 conventions on some models and S0-S5 on others. The honest answer: do not assume cross-brand sizing translates directly. If you are switching brands, measure the grip circumference with a thread and ruler, then compare to your current racket.",
        },
        {
          heading: "How an overgrip changes size",
          body: "A standard overgrip adds approximately 0.6mm of thickness, which translates to about half a grip size. A Yonex Super Grap on a G5 racket effectively makes it close to G4. Two overgrips push it past G4 into G3 territory. Towel grips add slightly more thickness — about 0.8mm. Use this as a fine-tuning lever: buy one size smaller than ideal and adjust with overgrips, rather than buying one size larger and trying to make a too-thick handle smaller (which involves removing the underbase grip — risky on most rackets).",
        },
        {
          heading: "Replacing the underbase vs adding overgrip",
          body: "Most rackets ship with a synthetic underbase grip (Yonex Super Grap, Victor Wave, etc.). Players choose to either keep the underbase and add overgrips on top, or strip the underbase entirely and replace with a different replacement grip. Stripping the underbase is reversible but tedious; new players should start with the factory underbase plus one overgrip and only swap to a replacement grip if they find the underbase texture wrong. Towel grips replace the underbase entirely and add 1-2mm — often used by sweaty-handed players in tropical climates.",
        },
        {
          heading: "How often to replace grips",
          body: "Replace overgrips every 4-12 sessions of regular play, or whenever they feel slick. Replace underbase grips every 6-12 months — they degrade slowly and are easy to ignore, but a degraded underbase changes the racket's feel meaningfully. Good rule of thumb: if your grip is darker than the day you put it on, it is probably ready for replacement.",
        },
      ],
      cta: "Get the racket recommendation right first, then dial in the grip size with one or two overgrips.",
    },
  ],
};

export function getBlogArticle(locale: SiteLocale, slug: string) {
  return blogArticles[locale].find((article) => article.slug === slug);
}
