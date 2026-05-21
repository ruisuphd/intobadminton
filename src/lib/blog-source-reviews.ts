import type {
  BlogArticle,
  BlogFactCheck,
  BlogStoryBlock,
} from "@/lib/blog";

type MethodologyBlock = Extract<BlogStoryBlock, { kind: "methodology" }>;
type FirstPersonBlock = Extract<BlogStoryBlock, { kind: "firstPerson" }>;

type ReviewInput = {
  slug: BlogArticle["slug"];
  title: string;
  dek: string;
  verdict: string;
  bestFor: string[];
  avoidIf: string[];
  setupNotes: string[];
  sourceHook: string;
  facts: { label: string; value: string }[];
  calloutTitle: string;
  calloutBody: string;
  comparison: {
    heading: string;
    columns: string[];
    rows: { label: string; values: string[] }[];
  };
  sections: { heading: string; body: string }[];
  cta: string;
  factChecks: BlogFactCheck[];
  /**
   * Required "what was tested and how" disclosure for the 2026 Google
   * Product Reviews update. founder-firsthand context is only valid for
   * products on Rui Su's firsthand list (Astrox 77 Pro, 88D Pro, 88D
   * Tour, 100ZZ + variants, 99 Pro 2, Arcsaber 11 Pro, Arcsaber 7 Pro,
   * Nanoflare 1000Z, NF 700 Pro, NF 700 Play 5U, Aerus Z2, Comfort Z3);
   * everything else uses observer context. Optional so existing reviews
   * compile, but every new Sprint 6B/6C review should provide one.
   */
  methodology?: MethodologyBlock;
  /**
   * Optional first-person evidence moments — anchored court observations
   * that the 2026 Product Reviews update explicitly rewards. Only use
   * for products on the founder-firsthand list. 3–5 per article max.
   */
  firstPerson?: FirstPersonBlock[];
  /**
   * Optional first-published / last-revised date in ISO YYYY-MM-DD form.
   * Defaults to "2026-05-13" for the original batch; Sprint 6B/6C reviews
   * pass the current date so updatedAt reflects when each article actually
   * shipped rather than the helper's launch date.
   */
  updatedAt?: string;
};

const sourcePolicyNote: BlogFactCheck = {
  sourceName: "IntoBadminton source-rights registry",
  title: "Source rights registry",
  section: "Platform posture",
  checkedAt: "2026-05-13",
  href: "https://intobadminton.com/source-policy/",
  quote:
    "use only for source discovery/manual summaries until terms or partnership is clear",
  note:
    "The local Chinese markdown source is used as research input only; this article is original buyer guidance, not a translation.",
};

function review(input: ReviewInput): BlogArticle {
  // Compose story blocks. methodology (if provided) sits between fact-check
  // snapshot and the source-to-buyer bridge so the reader sees "what was
  // tested and how" before any subjective framing. firstPerson blocks (if
  // provided) follow the comparison table so each anchored moment lands
  // next to a buyer-decision angle rather than near the demo-script outro.
  const blocks: BlogStoryBlock[] = [
    {
      kind: "facts",
      heading: "Fact-check snapshot",
      items: input.facts,
    },
  ];

  if (input.methodology) {
    blocks.push(input.methodology);
  }

  blocks.push(
    {
      kind: "callout",
      label: "Source-to-buyer bridge",
      title: "Why the original source is not the final answer",
      body:
        "The local source gives useful court colour: what felt quick, what felt dull, what started to annoy the reviewer after repeat rallies. The buyer still needs a stricter filter. We keep manufacturer specifications separate, then translate the on-court impression into practical purchase risk: who gets helped, who gets exposed, what needs a demo, and which claims should stay provisional until an official source or repeated first-party testing confirms them.",
    },
    {
      kind: "callout",
      label: "The hook",
      title: input.calloutTitle,
      body: input.calloutBody,
    },
    {
      kind: "comparison",
      heading: input.comparison.heading,
      columns: input.comparison.columns,
      rows: input.comparison.rows,
    }
  );

  if (input.firstPerson && input.firstPerson.length > 0) {
    blocks.push(...input.firstPerson);
  }

  blocks.push(
    {
      kind: "verdict",
      heading: "Buyer-first verdict",
      body: input.verdict,
      bullets: [
        `Best for: ${input.bestFor.join(", ")}.`,
        `Avoid if: ${input.avoidIf.join(", ")}.`,
        "Where official confirmation is missing, the article labels the point as a source-review impression.",
      ],
    },
    {
      kind: "callout",
      label: "Demo script",
      title: "How to test this before trusting the article",
      body:
        "Do not judge the product from five warm-up clears or a shop-floor walk. Recreate the mistake that normally costs you points: a late backhand lift, a rushed drive exchange, a heavy lunge after a jump, or a third-game rally when your timing is no longer clean. If the product still helps in that bad moment, the review's praise is relevant. If it only feels impressive when you are fresh, treat the praise as entertainment rather than buying evidence. Then switch back to your current setup and repeat the same sequence. The contrast matters more than novelty, because new gear always gets a short grace period in your hands.",
    },
    {
      kind: "callout",
      label: "Style alignment",
      title: "The story should pull you in, then make you harder to fool",
      body:
        "The writing is deliberately more narrative than a spec table, but every article still ends in a buying filter. Picture the strongest rally the product promises, then picture the weakest rally you actually play. If those two scenes do not overlap, the product belongs to someone else's dream. That is the rhythm we want: tempting enough to keep reading, strict enough to stop an expensive mismatch.",
    }
  );

  return {
    slug: input.slug,
    updatedAt: input.updatedAt ?? "2026-05-13",
    category: "reviews",
    title: input.title,
    dek: input.dek,
    reviewSummary: {
      verdict: input.verdict,
      bestFor: input.bestFor,
      avoidIf: input.avoidIf,
      setupNotes: input.setupNotes,
      sourceHook: input.sourceHook,
    },
    story: {
      intro:
        "A good equipment review should make you feel the first rally before it asks you to buy. These notes start from the local source review, then rebuild the argument around the moment that matters: you are tired, the score is close, and the next shot exposes whether the product is helping or merely looking expensive.",
      blocks,
    },
    factChecks: [...input.factChecks, sourcePolicyNote],
    sections: input.sections,
    cta: input.cta,
  };
}

export const sourceReviewArticles = [
  review({
    slug: "yonex-arcsaber-7-pro-review",
    title: "Yonex Arcsaber 7 Pro review: the control racket that makes you earn the point",
    dek: "A calmer alternative to smash-first rackets, the Arcsaber 7 Pro rewards patience, clean placement, and players who would rather build a trap than force a winner.",
    verdict:
      "A refined control frame for players who can create their own power and want the shuttle to stay on script.",
    bestFor: [
      "All-round singles players",
      "Placement-first doubles players",
      "Players upgrading from flexible control frames",
    ],
    avoidIf: [
      "You need free smash power",
      "You want a very stiff response",
      "You mainly win through flat-drive speed",
    ],
    setupNotes: [
      "Yonex official page lists medium flex and 4U weight.",
      "Local source impressions are treated as court-feel notes, not official specification.",
    ],
    sourceHook:
      "The source review is useful because it reads the 7 Pro as a rhythm racket, not a cheaper 11 Pro.",
    facts: [
      {
        label: "Official flex",
        value: "Yonex lists ARCSABER 7 PRO as medium flex.",
      },
      {
        label: "Official weight",
        value: "Yonex lists 4U average 83g, G5/G6.",
      },
      {
        label: "Buyer lens",
        value: "Control and dwell matter more here than a headline smash.",
      },
    ],
    calloutTitle: "It does not win the point for you; it keeps the point alive long enough for you to win it",
    calloutBody:
      "The addictive part of this frame is not a single thunderous shot. It is the feeling that your block, lift, and re-drop keep landing inside the same invisible corridor until the opponent finally gives you the loose shuttle.",
    comparison: {
      heading: "Where the 7 Pro sits",
      columns: ["Arcsaber 7 Pro", "Arcsaber 11 Pro", "Astrox 88S Pro"],
      rows: [
        {
          label: "Identity",
          values: ["Accessible control", "Denser control", "Doubles attack-control"],
        },
        {
          label: "Main reward",
          values: ["Predictable placement", "Heavier, cleaner hold", "Faster pressure"],
        },
        {
          label: "Main risk",
          values: ["Can feel underpowered", "More demanding", "Less patient feel"],
        },
      ],
    },
    sections: [
      {
        heading: "The opening rally tells the truth",
        body: "With the Arcsaber 7 Pro, the first warm-up clears can feel almost too civilised. There is no dramatic head weight pulling your shoulder forward and no blade-like speed frame shouting through the air. Then the rally gets longer and the purpose appears. The shuttle leaves the strings cleanly, the face stays calm on blocks, and a half-good defensive lift still lands with enough height to reset the point. This is not a racket for players who want one swing to rewrite their level. It is for players who already know where the shuttle should go and want the racket to stop arguing.",
      },
      {
        heading: "Why medium flex is not beginner-only",
        body: "Yonex lists the 7 Pro as medium flex, and that matters. Medium flex here should not be read as soft or low-end. It means the shaft gives you a little more time to load and release the shuttle, which is exactly what a control frame should do for club and competitive players who still play long sessions. Extra-stiff rackets can feel cleaner on perfect contact, but they also punish rushed preparation. The 7 Pro is more honest: it rewards clean mechanics, but it does not turn every late backhand into a confession.",
      },
      {
        heading: "The buyer trap",
        body: "The obvious mistake is comparing this only against the Arcsaber 11 Pro and asking which is more premium. The better question is whether your matches actually need the 11 Pro's denser feel. If you win by pulling opponents forward, holding the shuttle, and changing direction late, the 7 Pro gives you enough of the Arcsaber identity with a friendlier rhythm. If you hit through people from the rear court and need the racket to add pace for you, expect it to feel too polite. The racket is not weak; it simply refuses to pretend it is an Astrox.",
      },
      {
        heading: "Doubles and singles fit",
        body: "In doubles, the 7 Pro suits the player who blocks, guides, and places rather than the player who tries to end every exchange from shoulder height. It is good at keeping the shuttle low and honest. In singles, it becomes more interesting because rallies have space to breathe. You can lift, clear, slice, and recover without feeling that the frame is dragging you into a smash-heavy identity. That is why intermediate singles players may enjoy it more than fast men's doubles attackers.",
      },
      {
        heading: "The final decision",
        body: "Buy the Arcsaber 7 Pro if you have outgrown entry-level flexible rackets and want a frame that makes your shot selection feel calmer. Skip it if you need help creating pace, if your shoulder expects head-heavy mass, or if you mostly play exchanges where the racket has to be ready again instantly. The 7 Pro is not the dramatic purchase. It is the one you understand after the third session, when your errors are smaller and the opponent has started lifting exactly where you wanted them to.",
      },
    ],
    cta: "Run the finder with balanced or control-first preferences to compare Arcsaber 7 Pro against 11 Pro and 88S Pro.",
    factChecks: [
      {
        sourceName: "Yonex",
        title: "ARCSABER 7 PRO",
        section: "Specs",
        checkedAt: "2026-05-13",
        href: "https://www.yonex.com/arc7-p",
        quote: "Flex Medium",
        note:
          "Official page confirms the medium-flex positioning used in this review.",
      },
    ],
  }),
  review({
    slug: "asics-blast-ff-3-badminton-shoes-review",
    title: "ASICS Blast FF 3 review: the indoor-court shoe badminton players keep borrowing",
    dek: "Not a badminton-branded shoe, but a serious indoor-court platform for players who want support, flexibility, and a stable ankle hold.",
    verdict:
      "A strong non-badminton option if you prioritise indoor-court stability over featherweight badminton-specific speed.",
    bestFor: [
      "Players who want lateral support",
      "Heavier indoor-court movers",
      "Badminton players who dislike narrow badminton lasts",
    ],
    avoidIf: [
      "You want a badminton-only outsole feel",
      "You need the lightest possible shoe",
      "Your league requires sport-specific footwear checks",
    ],
    setupNotes: [
      "ASICS positions Blast FF 3 as an indoor court shoe, not a badminton-specific model.",
      "Official wording emphasises stability and multi-directional movement.",
    ],
    sourceHook:
      "The source review is valuable because it treats the Blast FF 3 as a practical match shoe, not a brand-loyalty decision.",
    facts: [
      {
        label: "Official category",
        value: "ASICS lists it under indoor-court/volleyball contexts.",
      },
      {
        label: "Official purpose",
        value: "ASICS highlights stability for dynamic movements.",
      },
      {
        label: "Buyer caution",
        value: "Badminton outsole feel and court grip should be tested locally.",
      },
    ],
    calloutTitle: "The question is not whether it says badminton on the box",
    calloutBody:
      "If the shoe lets you brake, turn, and land without your foot swimming inside the upper, it deserves a trial. The Blast FF 3's pitch is simple: enough structure to trust your next step.",
    comparison: {
      heading: "How to frame the choice",
      columns: ["Blast FF 3", "Yonex 65 Z4", "Victor P9200 III"],
      rows: [
        {
          label: "Identity",
          values: ["Indoor-court stability", "Badminton all-rounder", "Protection-first badminton"],
        },
        {
          label: "Likely feel",
          values: ["Structured and secure", "Quicker and more familiar", "Cushioned and supportive"],
        },
        {
          label: "Best trial",
          values: ["Lateral lunges", "All-court drills", "Landing comfort"],
        },
      ],
    },
    sections: [
      {
        heading: "Why badminton players look outside badminton",
        body: "Badminton shoes are often narrow, low, and extremely specific. That is good until your foot shape or movement style disagrees with the category. The ASICS Blast FF 3 enters the conversation because badminton is still an indoor-court sport built on braking, loading, and redirecting. A shoe designed for dynamic indoor movement can make sense when it gives you the hold your usual badminton options do not. The risk is equally clear: if the outsole, ride height, or flex pattern feels wrong on your court, the brand story does not matter.",
      },
      {
        heading: "The hold is the first reason to care",
        body: "The official ASICS copy points to stability and a MONO-SOCK construction for ankle hold. On a badminton court, that translates into the one thing casual shoe reviews often underplay: whether the foot stays connected to the shoe during a stop. If you have ever lunged forward and felt your toes hit the front wall of the shoe, you know why this matters. A supportive indoor-court shoe can reduce that sliding feeling, especially for players who move with more force than finesse.",
      },
      {
        heading: "Where it can lose to badminton specialists",
        body: "The Blast FF 3 is not automatically better because it is stable. Badminton-specific shoes usually have outsole compounds and flex zones tuned for split steps, toe drags, and small recovery hops. The Blast FF 3 may feel more substantial underfoot, which some players will read as security and others as drag. That is why this is a try-before-you-trust recommendation. Do not judge it by standing in the shop. Do three lunges, two sidesteps, a jump landing, and one hard recovery. The answer will arrive quickly.",
      },
      {
        heading: "Who should try it",
        body: "Try the Blast FF 3 if you are a heavier player, if narrow badminton shoes pinch you, or if your current shoe twists under your outside edge when you push back to base. It can also suit players coming from volleyball, handball, or squash who already like a more structured indoor platform. The shoe is less convincing for light front-court doubles players who want very fast ground contact and barely-there uppers.",
      },
      {
        heading: "The final decision",
        body: "The buyer-first answer is measured. The Blast FF 3 is not a secret badminton flagship, and this article should not pretend it is. It is a credible indoor-court alternative with an official stability story and enough source-review interest to justify a test. Buy only after confirming grip on your local surface and checking that the higher-support feel does not slow your first step. If it passes those two tests, the lack of a badminton label becomes much less important.",
      },
    ],
    cta: "Use the shoe finder with wide-foot or stability flags, then compare the badminton-specific options before trying the Blast FF 3.",
    factChecks: [
      {
        sourceName: "ASICS",
        title: "BLAST FF 3",
        section: "Product description",
        checkedAt: "2026-05-13",
        href: "https://www.asics.com/us/en-us/blast-ff-3/p/ANA_20041038054.html",
        quote: "advanced stability",
        note:
          "ASICS officially frames the shoe around stability for dynamic indoor movement.",
      },
    ],
  }),
  review({
    slug: "yonex-astrox-nextage-review",
    title: "Yonex Astrox Nextage review: power for players who are not ready for a 99 Pro",
    dek: "The Astrox Nextage keeps the Astrox idea but softens the punishment: medium flex, head-heavy balance, and a more forgiving route into rear-court attack.",
    verdict:
      "A sensible first serious power racket for intermediate players who want Astrox flavour without flagship violence.",
    bestFor: [
      "Intermediate rear-court attackers",
      "Club players moving from even balance",
      "Singles players building power mechanics",
    ],
    avoidIf: [
      "You need pro-level stiffness",
      "You play only fast front-court doubles",
      "You already drive 99 Pro cleanly",
    ],
    setupNotes: [
      "Yonex USA lists Astrox Nextage as head heavy and medium shaft flex.",
      "Official player type is intermediate / advanced.",
    ],
    sourceHook:
      "The local review is interesting because it reads Nextage as a new Astrox branch, not merely a cheaper model.",
    facts: [
      {
        label: "Official balance",
        value: "Yonex USA lists the racket as head heavy.",
      },
      {
        label: "Official flex",
        value: "Yonex USA lists medium shaft flex.",
      },
      {
        label: "Buyer lens",
        value: "The question is whether you want easier power, not maximum demand.",
      },
    ],
    calloutTitle: "The racket feels like an invitation, not an exam",
    calloutBody:
      "The best Astrox frames can feel like they are checking your homework. Nextage is different. It still leans into power, but it gives ordinary players more time to load the shot.",
    comparison: {
      heading: "Astrox power ladder",
      columns: ["Astrox Nextage", "Astrox 77 Pro", "Astrox 99 Pro"],
      rows: [
        {
          label: "Power access",
          values: ["Friendly", "Balanced", "Demanding"],
        },
        {
          label: "Main use",
          values: ["Learning attack", "All-round attack", "Elite rear-court pressure"],
        },
        {
          label: "Main risk",
          values: ["Ceiling below Pro frames", "Less dramatic identity", "High fatigue cost"],
        },
      ],
    },
    sections: [
      {
        heading: "A power racket for the player in transition",
        body: "The Astrox Nextage is easiest to understand if you imagine a player who knows they want more weight behind the shuttle but is not ready for the harsh end of the Astrox line. That player can clear. They can smash. But they still have late contact, long sessions, and occasional tired-arm rallies. For them, a flagship extra-stiff frame can turn ambition into frustration. Nextage offers a more forgiving way into the same broad idea: load the frame, use the head weight, and learn to attack without making every mistake expensive.",
      },
      {
        heading: "Official specs support the story",
        body: "Yonex USA lists the Astrox Nextage as head heavy with medium shaft flex. That combination explains the whole buyer proposition. Head-heavy balance gives the shuttle mass and direction. Medium flex adds time and comfort. It will not feel as surgical as a 99 Pro or 100ZZ when a very strong player hits perfectly, but that is not the point. The point is that a wider group of intermediate players can make the racket work in real matches.",
      },
      {
        heading: "Where it becomes addictive",
        body: "The addictive part is the first session where your rear-court clear stops feeling like work. You find length without swinging harder, then the next short lift looks tempting. The racket gives you permission to attack. That can be dangerous if it makes you overhit, but it is also exactly why this model exists. It turns power from a specialist tool into a repeatable club-player habit.",
      },
      {
        heading: "Where it cannot fake a flagship",
        body: "There is still a ceiling. Very advanced players may feel the medium shaft holding the shuttle too long or blunting the most explosive snap. Fast doubles players may also decide the head-heavy identity costs too much in drive exchanges. If your matches are won in the first three shots and at the tape, a Nanoflare or Auraspeed still makes more sense. Nextage is not a speed racket hiding in black and green paint.",
      },
      {
        heading: "The final decision",
        body: "Buy the Astrox Nextage if your current even-balanced racket is too polite from the back court and you want to learn a stronger attacking rhythm. Skip it if you already play stiff Pro frames comfortably or if you mostly play fast level doubles. It is not the most glamorous Astrox, but it may be the one that teaches the widest group of players what the Astrox line is supposed to feel like.",
      },
    ],
    cta: "Run the finder with smash-heavy style and club/intermediate level to compare Astrox Nextage against 77 Pro and 88D Pro.",
    factChecks: [
      {
        sourceName: "Yonex USA",
        title: "ASTROX NEXTAGE",
        section: "Tech specs",
        checkedAt: "2026-05-13",
        href: "https://us.yonex.com/products/astrox-nextage",
        quote: "Head Heavy",
        note:
          "Official product page confirms the head-heavy framing used in this article.",
      },
    ],
  }),
  review({
    slug: "victor-drivex-10-review",
    title: "Victor DriveX 10 Metallic review: the control racket that learned to punch",
    dek: "DriveX 10 Metallic looks like a control platform, but Victor's material list and source impressions point to a firmer, more attacking all-rounder.",
    verdict:
      "A firmer DriveX for players who want control first, then a real finishing shot when the rally opens.",
    bestFor: [
      "All-round attacking players",
      "Singles players who like Victor feel",
      "DriveX fans wanting a firmer response",
    ],
    avoidIf: [
      "You need head-light doubles speed",
      "You want a soft easy shaft",
      "You dislike metallic, crisp feedback",
    ],
    setupNotes: [
      "Victor official page lists 3U/G5 and 4U/G5 options.",
      "Official page lists 6.6 Shaft Metallic Carbon Shaft.",
    ],
    sourceHook:
      "The source review helps because it reads the racket as a control frame with bite, not a neutral all-rounder.",
    facts: [
      {
        label: "Official variants",
        value: "Victor lists 3U/G5 and 4U/G5.",
      },
      {
        label: "Official shaft",
        value: "Victor lists 6.6 Shaft Metallic Carbon Shaft.",
      },
      {
        label: "Buyer lens",
        value: "Expect a crisp control-attack feel rather than soft forgiveness.",
      },
    ],
    calloutTitle: "The surprise is not control; the surprise is how quickly control becomes pressure",
    calloutBody:
      "A good DriveX should let you organise the point. This one also tempts you to end it, because the face feels firm enough to turn a half-court lift into a committed shot.",
    comparison: {
      heading: "DriveX family read",
      columns: ["DriveX 10 Metallic", "DriveX 12", "Auraspeed 90K II"],
      rows: [
        {
          label: "Identity",
          values: ["Firm control-attack", "Head-heavy attack-control", "Speed counterattack"],
        },
        {
          label: "Best rally",
          values: ["Build then hit", "Rear-court pressure", "Fast exchanges"],
        },
        {
          label: "Main caution",
          values: ["Not a soft frame", "Demanding weight feel", "Less patient hold"],
        },
      ],
    },
    sections: [
      {
        heading: "A control racket with a sharper edge",
        body: "DriveX rackets often attract players who want certainty: stable face, clear feedback, and enough mass to keep the shuttle honest. The DriveX 10 Metallic keeps that foundation but adds a firmer voice. In the local source review, the important mood is not luxury or novelty. It is the way the racket asks you to shape the rally, then gives you a punch when the opponent finally lifts short. That is a useful identity because many club players do not need a pure smash racket. They need a racket that can stay calm until the chance arrives.",
      },
      {
        heading: "Official specs and what they do not prove",
        body: "Victor's official page confirms the available 3U/G5 and 4U/G5 options, frame material language, and the 6.6 Shaft Metallic Carbon Shaft. Those facts establish the platform, but they do not prove how the racket feels for every player. The metallic feel, attack bite, and timing demand remain source-review impressions. The article keeps that separation deliberately: official specs tell you what is built; court impressions tell you what a reviewer felt.",
      },
      {
        heading: "On court, patience matters",
        body: "The DriveX 10 Metallic is most interesting in the rallies that do not end quickly. Push, block, lift, reset, then suddenly a sharper half-smash appears. The racket's appeal is the transition. It does not feel like a heavy hammer that you must swing around for the sake of one finishing shot. Nor does it feel like a speed frame that disappears from the rear court. It gives you a middle lane: stable enough to organise, crisp enough to punish.",
      },
      {
        heading: "Who may find it too severe",
        body: "Players moving from very flexible or entry-level rackets may find the firmer response less forgiving than expected. If you habitually contact late, or if you rely on the shaft to throw the shuttle deep when your preparation is weak, this may not be the friendly control racket you imagined. Fast front-court doubles players may also prefer Auraspeed handling because the DriveX identity is more about command than instant reload.",
      },
      {
        heading: "The final decision",
        body: "Buy the DriveX 10 Metallic if you like Victor's controlled, solid feel and want more threat than a soft all-rounder gives you. Skip it if you are chasing pure doubles speed or if comfort matters more than feedback. The racket is best read as a disciplined all-round weapon: it will not create your attack from nothing, but it gives organised players a very satisfying way to turn control into pressure.",
      },
    ],
    cta: "Use the finder with all-round attack or singles control to compare DriveX 10 Metallic against DriveX 12 and 90K II.",
    factChecks: [
      {
        sourceName: "Victor",
        title: "DriveX 10METALLIC B",
        section: "Spec & Tech",
        checkedAt: "2026-05-13",
        href: "https://www.victorsport.com/product/drivex-10metallic",
        quote: "Weight / Grip Size 3U / G5",
        note:
          "Official Victor page confirms the model and listed weight/grip options.",
      },
    ],
  }),
  review({
    slug: "yonex-nanoflare-1000z-play-review",
    title: "Yonex Nanoflare 1000Z vs 1000 Play: same colour, very different promise",
    dek: "The yellow paint invites comparison, but the Pro-tier 1000Z and beginner-facing 1000 Play should not be bought for the same reason.",
    verdict:
      "Buy 1000Z for advanced head-light speed and precision; buy 1000 Play only if you want the family shape at a beginner price.",
    bestFor: [
      "1000Z: advanced doubles speed",
      "1000 Play: recreational speed entry",
      "Players comparing tiers before buying",
    ],
    avoidIf: [
      "You expect Play to feel like Z",
      "You need head-heavy smash help",
      "You dislike stiff speed rackets",
    ],
    setupNotes: [
      "Yonex lists 1000Z as extra stiff.",
      "Yonex USA lists 1000 Play as beginner player type and medium flex.",
    ],
    sourceHook:
      "The source review is useful because it separates family branding from actual buyer fit.",
    facts: [
      {
        label: "1000Z official flex",
        value: "Yonex lists extra stiff.",
      },
      {
        label: "1000 Play official tier",
        value: "Yonex USA lists beginner player type and Play tier.",
      },
      {
        label: "Buyer lens",
        value: "Same visual family does not mean same performance contract.",
      },
    ],
    calloutTitle: "The paint tries to make them relatives; your timing will tell you they are not twins",
    calloutBody:
      "The 1000Z asks for clean preparation and rewards it with brutal speed. The 1000 Play borrows the story and lowers the threshold. Confusing those roles is how buyers overspend or underbuy.",
    comparison: {
      heading: "1000 family decision",
      columns: ["1000Z", "1000 Play", "Nanoflare 700 Pro"],
      rows: [
        {
          label: "Official tier",
          values: ["Z / Pro-level", "Play", "Pro"],
        },
        {
          label: "Best fit",
          values: ["Advanced doubles", "Recreational speed", "Friendlier speed-control"],
        },
        {
          label: "Main risk",
          values: ["Harsh timing demand", "Lower ceiling", "Less extreme identity"],
        },
      ],
    },
    sections: [
      {
        heading: "Do not buy by colour",
        body: "The Nanoflare 1000 family is visually loud enough that the paint can become the product. That is risky. The 1000Z and 1000 Play may share the Lightning Yellow identity, but they are built for different players. One is a demanding head-light weapon for serious speed and counterattack. The other is a lower-tier entry into the same family story. If you buy the Play expecting a cheap 1000Z, you will be disappointed. If you buy the Z because it looks fast, you may discover that speed costs timing.",
      },
      {
        heading: "What official pages confirm",
        body: "Yonex lists the 1000Z with extra-stiff flex, high-end frame materials, and 3U/4U options. Yonex USA lists the Nanoflare 1000 Play as a beginner player-type racket with medium shaft flex. Those official facts support the practical split. The Z is not merely the same racket with better materials; it is a different level of demand. The Play is not fake, but it is honest only when you buy it as a recreational or early-club speed frame.",
      },
      {
        heading: "Why the Z feels addictive",
        body: "The 1000Z becomes compelling when the exchange accelerates. A block turns into a push, a push into a drive, and suddenly the racket feels like it has already recovered before the opponent has finished their swing. That is the thrill. The caution is that the same speed can make rear-court attack feel thin if you do not create force yourself. Players coming from head-heavy frames may miss the easy weight behind a smash.",
      },
      {
        heading: "Why the Play exists",
        body: "The 1000 Play gives beginners and recreational players a safer way to enjoy the Nanoflare idea. Medium flex makes length easier. The price is easier. The ceiling is lower. That trade is not embarrassing; it is the whole reason the tier exists. A beginner who buys the Play and learns fast preparation may make a better long-term decision than a beginner who buys the Z and spends months fighting stiffness.",
      },
      {
        heading: "The final decision",
        body: "Buy the 1000Z if you are already comfortable with stiff speed frames and want a racket for fast doubles, front-court pressure, or elite defensive transitions. Buy the 1000 Play if you are still building timing and want a speed-oriented first serious racket. Skip both if your main need is rear-court smash help. The Nanoflare 1000 line is about taking time away from opponents, not giving free mass to your own attack.",
      },
    ],
    cta: "Use the finder with defensive/front-court tags to see whether 1000Z, 700 Pro, or a softer Play-tier option fits first.",
    factChecks: [
      {
        sourceName: "Yonex",
        title: "NANOFLARE 1000 Z",
        section: "Specs",
        checkedAt: "2026-05-13",
        href: "https://www.yonex.com/nf-1000z",
        quote: "Flex Extra Stiff",
        note:
          "Official page confirms the 1000Z stiffness claim used in the buyer split.",
      },
      {
        sourceName: "Yonex USA",
        title: "NANOFLARE 1000 PLAY",
        section: "Product details",
        checkedAt: "2026-05-13",
        href: "https://us.yonex.com/products/nanoflare-1000-play",
        quote: "Beginner",
        note:
          "Official USA product page supports positioning Play as the entry-tier option.",
      },
    ],
  }),
  review({
    slug: "yonex-nanoflare-800-pro-tour-review",
    title: "Yonex Nanoflare 800 Pro vs Tour: the counter-drive idea, with two levels of demand",
    dek: "Both chase fast drive pressure, but the Pro carries the premium material story while the Tour asks whether you need all of it.",
    verdict:
      "Choose 800 Pro for maximum counter-drive sharpness; choose 800 Tour if you want the idea with a softer financial landing.",
    bestFor: [
      "Fast doubles players",
      "Drive-heavy counterattackers",
      "Players choosing between Pro and Tour tiers",
    ],
    avoidIf: [
      "You need easy rear-court power",
      "You prefer high shuttle hold",
      "You dislike head-light timing",
    ],
    setupNotes: [
      "Yonex global page lists Nanoflare 800 Pro as stiff.",
      "Yonex global page lists Nanoflare 800 Tour as stiff with 3U/4U options.",
    ],
    sourceHook:
      "The source review matters because it reads the 800 line through drive pressure, not generic speed.",
    facts: [
      {
        label: "Official Pro flex",
        value: "Yonex lists NANOFLARE 800 PRO as stiff.",
      },
      {
        label: "Official Tour flex",
        value: "Yonex lists NANOFLARE 800 TOUR as stiff.",
      },
      {
        label: "Buyer lens",
        value: "The real question is how much sharpness you need in flat exchanges.",
      },
    ],
    calloutTitle: "The best shot is not the smash; it is the drive your opponent never had time to lift",
    calloutBody:
      "The 800 family becomes addictive when the rally goes flat. You stop waiting for a high shuttle and start creating pressure at shoulder height.",
    comparison: {
      heading: "800 tier split",
      columns: ["800 Pro", "800 Tour", "800 Play"],
      rows: [
        {
          label: "Official tier",
          values: ["Pro", "Tour", "Play"],
        },
        {
          label: "Best buyer",
          values: ["Advanced speed player", "Intermediate/advanced value seeker", "Recreational speed learner"],
        },
        {
          label: "Main caution",
          values: ["Demand and price", "Lower premium feel", "Lower ceiling"],
        },
      ],
    },
    sections: [
      {
        heading: "The Nanoflare 800 idea",
        body: "The Nanoflare 800 line is not built around a cinematic rear-court smash. It is built around the uglier, more common doubles rally where both sides refuse to lift. In that situation, a racket wins by being ready, sharp, and stable at speed. The source review's most useful thread is this: the 800 family should be judged by counter-drive pressure. If you judge it only by smash weight, you are asking the wrong question.",
      },
      {
        heading: "What official specs confirm",
        body: "Yonex lists both the Nanoflare 800 Pro and 800 Tour as stiff, with 3U and 4U options and 10 mm longer length. The Pro carries the premium material listing, including M40X, SUPER HMG, Copper, and Ultra PE Fiber in the shaft. The Tour keeps the same broad shape and intent with a lower-tier material package. This confirms the buyer split: similar concept, different refinement and price.",
      },
      {
        heading: "Why Pro feels worth it to the right player",
        body: "The 800 Pro is most seductive when you take the shuttle early. Punch a return through the middle, recover, and the next shot arrives with the racket already in position. The frame makes you want to keep the rally flat because flat rallies are where it feels most alive. That is not the same as being easy. Players with loose timing may find the face too honest and the rear-court power too modest.",
      },
      {
        heading: "Why Tour should not be dismissed",
        body: "The Tour tier exists for players who want the style before they need the absolute finish. If you are intermediate to advanced and still discovering whether head-light drive pressure is your identity, the Tour may be the smarter buy. It will not give every last bit of Pro-tier crispness, but it lets you test the right question: do your points improve when you choose speed, blocks, and early drive pressure over heavier attack?",
      },
      {
        heading: "The final decision",
        body: "Buy the 800 Pro if your doubles rallies are fast enough that a half-second matters and you already know you like stiff speed frames. Buy the 800 Tour if you want the 800 idea but would rather spend the difference on strings, shoes, or court time. Skip both if you are a singles attacker or a rear-court doubles player who wins primarily through steep power. The 800 family is a scalpel for the flat game, not a mallet for the back line.",
      },
    ],
    cta: "Run the finder with front-court or defensive tags to compare Nanoflare 800 Pro, 800 Tour, and 1000Z.",
    factChecks: [
      {
        sourceName: "Yonex",
        title: "NANOFLARE 800 PRO",
        section: "Specs",
        checkedAt: "2026-05-13",
        href: "https://www.yonex.com/badminton/racquets/nf-800pr",
        quote: "Flex STIFF",
        note:
          "Official page confirms the Pro flex used in the comparison.",
      },
      {
        sourceName: "Yonex",
        title: "NANOFLARE 800 TOUR",
        section: "Specs",
        checkedAt: "2026-05-13",
        href: "https://www.yonex.com/nf-800t",
        quote: "Flex STIFF",
        note:
          "Official page confirms the Tour flex used in the comparison.",
      },
    ],
  }),
  review({
    slug: "yonex-nanoflare-nextage-review",
    title: "Yonex Nanoflare Nextage review: the softer speed racket for front-court control",
    dek: "Nanoflare Nextage is not a budget 1000Z. It is a head-light, medium-flex speed-control racket for players who want quick hands without harsh timing.",
    verdict:
      "A friendly speed-control frame for intermediate doubles players who want fast handling and softer contact.",
    bestFor: [
      "Front-court doubles players",
      "Intermediate speed-control players",
      "Players who find 1000Z too harsh",
    ],
    avoidIf: [
      "You need heavy rear-court power",
      "You want a crisp stiff shaft",
      "You dislike soft shuttle hold",
    ],
    setupNotes: [
      "Yonex USA lists Nanoflare Nextage as head light.",
      "Yonex USA lists medium shaft flex and 4U average 83g.",
    ],
    sourceHook:
      "The source review is useful because it shows where a soft Nanoflare works and where it runs out of punch.",
    facts: [
      {
        label: "Official balance",
        value: "Yonex USA lists head-light balance.",
      },
      {
        label: "Official flex",
        value: "Yonex USA lists medium shaft flex.",
      },
      {
        label: "Buyer lens",
        value: "Do not buy it as a cheaper 1000Z; buy it as a softer speed-control tool.",
      },
    ],
    calloutTitle: "It wins small moments rather than one huge moment",
    calloutBody:
      "This racket is at its best when you take the shuttle early, change the direction gently, and make the opponent hit one more awkward lift.",
    comparison: {
      heading: "Nanoflare speed options",
      columns: ["Nextage", "700 Pro", "1000Z"],
      rows: [
        {
          label: "Feel",
          values: ["Softer", "Fast and cleaner", "Stiff and extreme"],
        },
        {
          label: "Best format",
          values: ["Mixed/front court", "Fast doubles", "Advanced doubles"],
        },
        {
          label: "Main caution",
          values: ["Rear-court power", "Can still lack smash mass", "Demanding timing"],
        },
      ],
    },
    sections: [
      {
        heading: "The white-speed fantasy",
        body: "The Nanoflare Nextage source review makes the racket sound almost too easy: fast hands, light head, soft contact, quick front-court changes. That is the fantasy, and there is truth inside it. The racket is designed for the moments where badminton is not about maximum force. It is about who arrives first, who keeps the shuttle lower, and who can change direction without winding up. If those are your points, the Nextage starts to make sense very quickly.",
      },
      {
        heading: "Official specs explain the feel",
        body: "Yonex USA lists the Nanoflare Nextage as head light with medium shaft flex, 4U average 83g, and intermediate/advanced player type. That combination explains why the local review reads it as more forgiving than the sharper Nanoflare flagships. The head-light balance helps the racket return to position. The medium flex softens the feel. The result is not maximum speed at all costs; it is speed with comfort.",
      },
      {
        heading: "Front court is the natural home",
        body: "The racket becomes compelling at the tape. Blocks feel easy to hold. Pushes can be sent into space without a large swing. Defensive changes feel less panicked because the head is already back in front of you. Mixed doubles front-court players and level-doubles players who defend first will understand it sooner than rear-court attackers. It lets you play the rally like a series of small thefts.",
      },
      {
        heading: "Why rear court can disappoint",
        body: "The same traits that help the front court can make the back court feel thin. If the shuttle is deep and you need to create threat from behind your body, the racket does not give much free mass. It asks you to place, slice, and rotate rather than blast through. That is not a defect if you bought it for speed-control. It is a serious defect if you secretly wanted a head-heavy attack frame in Nanoflare clothing.",
      },
      {
        heading: "The final decision",
        body: "Buy the Nanoflare Nextage if your best rallies come from early contact, front-court control, and defensive redirection. Skip it if you play singles attack or rear-court doubles. It is not trying to be a cheaper 1000Z. It is trying to make the Nanoflare idea more comfortable for players who value touch as much as speed. That quieter promise may be exactly why it works.",
      },
    ],
    cta: "Run the finder with front-court and defensive tags to compare Nanoflare Nextage against 700 Pro and 800 Tour.",
    factChecks: [
      {
        sourceName: "Yonex USA",
        title: "NANOFLARE NEXTAGE",
        section: "Product details",
        checkedAt: "2026-05-13",
        href: "https://us.yonex.com/products/nanoflare-nextage",
        quote: "Head Light",
        note:
          "Official page confirms the head-light positioning used in this article.",
      },
    ],
  }),
  review({
    slug: "yonex-power-cushion-88-dial-3-review",
    title: "Yonex Power Cushion 88 Dial 3 review: the BOA shoe that makes fit feel tactical",
    dek: "The 88 Dial 3 is not only about convenience. The dial system changes how quickly you can tune lockdown before, during, and after a match.",
    verdict:
      "A useful fit-first badminton shoe for players who want quick lockdown and stable comfort, with a caution for forefoot impact feel.",
    bestFor: [
      "Players who adjust fit often",
      "High-instep feet needing dial control",
      "Club doubles players wanting secure lockdown",
    ],
    avoidIf: [
      "You prefer traditional laces",
      "You need maximum forefoot cushion",
      "You want the lightest Yonex shoe",
    ],
    setupNotes: [
      "Yonex USA lists Fit as Standard.",
      "Yonex USA lists Power Cushion+ and Power Graphite Lite in feature copy.",
    ],
    sourceHook:
      "The source review is useful because it focuses on fit behaviour, not just the novelty of the dial.",
    facts: [
      {
        label: "Official fit",
        value: "Yonex USA lists the regular version as Standard fit.",
      },
      {
        label: "Official feature",
        value: "Yonex USA lists Power Graphite Lite for stability.",
      },
      {
        label: "Buyer lens",
        value: "Fit adjustment is the headline; forefoot cushion still needs a court test.",
      },
    ],
    calloutTitle: "The dial is not a party trick if you actually use it between games",
    calloutBody:
      "A quick quarter-turn before a tight third game can matter. The shoe invites small fit decisions instead of forcing you to retie laces with cold hands.",
    comparison: {
      heading: "Yonex shoe context",
      columns: ["88 Dial 3", "65 Z4", "Aerus Z2"],
      rows: [
        {
          label: "Identity",
          values: ["Fit control", "All-rounder", "Light speed"],
        },
        {
          label: "Main reward",
          values: ["Fast lockdown tuning", "Balanced performance", "Low weight"],
        },
        {
          label: "Main caution",
          values: ["Dial layout and forefoot feel", "Less specialised", "Less cushion"],
        },
      ],
    },
    sections: [
      {
        heading: "Fit becomes part of the match",
        body: "Most shoe reviews treat fit as something that happens once in the shop. The 88 Dial 3 turns it into something you can adjust during the session. That is the real story. A dial closure is convenient, but convenience alone does not win points. The more interesting benefit is repeatability: you can tighten before high-speed drills, release after a long game, and return to the same lockdown without guessing how hard you pulled a lace.",
      },
      {
        heading: "What the official page confirms",
        body: "Yonex USA lists the regular 88 Dial 3 as Standard fit and highlights a lace-free lockdown story, Power Cushion+, Durable Skin Light, Power Graphite Lite, Toe Assist Shape, and Inner Bootie Construction. Those official claims establish the feature set. The article's more detailed statements about forefoot firmness and local-court traction remain source-review impressions, because those depend heavily on surface, body weight, and movement style.",
      },
      {
        heading: "Why the dial feels addictive",
        body: "The first few sessions can make ordinary laces feel slow. You step in, press down, twist, and the shoe tightens in a way that feels almost mechanical. That feeling is satisfying, but the buyer question is whether the system holds during lateral work. The source review's useful point is that the upper and dial work together to create a connected feel, especially around the midfoot and instep.",
      },
      {
        heading: "The caution under the forefoot",
        body: "Speed-oriented shoes often pay for fast take-off with firmer forefoot feedback. The 88 Dial 3 is no exception in the source review. Players who jump repeatedly, land heavily on the forefoot, or have knee and heel comfort concerns should test this carefully. A shoe can lock the foot well and still be the wrong cushioning choice. Fit is only one half of the contract.",
      },
      {
        heading: "The final decision",
        body: "Buy the 88 Dial 3 if you value fit adjustability, clean lockdown, and a more technical shoe experience than traditional laces provide. Skip it if you want maximum plush landing, the lightest Yonex shoe, or the simple repairability of laces. The shoe is compelling because it makes fit feel tactical. That is enough reason to try it, but not enough reason to buy without a real movement test.",
      },
    ],
    cta: "Run the shoe finder with foot-width and comfort flags, then compare 88 Dial 3 with 65 Z4 and Aerus Z2.",
    factChecks: [
      {
        sourceName: "Yonex USA",
        title: "POWER CUSHION 88 DIAL (3RD GEN)",
        section: "Product details",
        checkedAt: "2026-05-13",
        href: "https://us.yonex.com/products/power-cushion-88-dial-3rd-gen",
        quote: "Standard",
        note:
          "Official page confirms the listed fit category for the regular-width model.",
      },
    ],
  }),
  review({
    slug: "yonex-grpht-thrttl-training-shoe-review",
    title: "Yonex GRPHT THRTTL review: concept-shoe comfort, not a daily match shoe",
    dek: "GRPHT THRTTL is the most interesting Yonex shoe story in years, but the official positioning matters: training days, drills, and light court time, not daily match play.",
    verdict:
      "A fascinating comfort-first training shoe, but not the first choice for hard badminton match play.",
    bestFor: [
      "Conditioning and light court drills",
      "Players curious about Yonex future tech",
      "Casual players wanting court-to-city comfort",
    ],
    avoidIf: [
      "You need a daily match shoe",
      "You play high-intensity lateral rallies",
      "You want low, sharp ground feel",
    ],
    setupNotes: [
      "Yonex USA explicitly positions the shoe as not for match play.",
      "Yonex states GRPHT THRTTL technology is planned for future competitive models.",
    ],
    sourceHook:
      "The source review is valuable because it enjoys the concept while still warning against overusing it in serious matches.",
    facts: [
      {
        label: "Official use case",
        value: "Yonex USA says it is designed for training days and light court time.",
      },
      {
        label: "Official caution",
        value: "Yonex USA says it is not match play.",
      },
      {
        label: "Buyer lens",
        value: "Treat it as a concept trainer, not a 65 Z or Eclipsion replacement.",
      },
    ],
    calloutTitle: "The future is comfortable, but the future is not always match-ready",
    calloutBody:
      "The shoe makes you want to walk, warm up, and keep moving. That does not mean you should trust it for the hardest lateral points of your week.",
    comparison: {
      heading: "Training vs match shoe",
      columns: ["GRPHT THRTTL", "65 Z4", "Eclipsion Z3"],
      rows: [
        {
          label: "Primary job",
          values: ["Training / concept comfort", "All-round badminton", "Protection"],
        },
        {
          label: "Best use",
          values: ["Drills and light court time", "Regular club matches", "High-support matches"],
        },
        {
          label: "Main caution",
          values: ["Not daily match play", "Not maximum cushion", "Heavier feel"],
        },
      ],
    },
    sections: [
      {
        heading: "The official caution changes the whole review",
        body: "GRPHT THRTTL could easily be oversold. It looks like a statement shoe, carries a new technology story, and feels like Yonex trying to pull badminton footwear into a broader training world. But the official Yonex USA page is unusually clear: this is for training days, conditioning, lateral drills, and life between sessions, not daily on-court wear. That sentence is the fact-check anchor. Any review that calls it a pure badminton match shoe is stretching beyond the source.",
      },
      {
        heading: "Why it still matters",
        body: "The reason to care is not that you should replace your 65 Z or Eclipsion tomorrow. The reason to care is that Yonex appears to be testing a new comfort and propulsion language. The GRPHT THRTTL page says the technology will be implemented in upcoming badminton and tennis competitive models. That makes this shoe a preview. It is interesting because it hints at future match footwear, even if this exact model is more training companion than tournament tool.",
      },
      {
        heading: "Where the source review gets tempting",
        body: "The local source review describes the plush, energetic underfoot feeling in a way that is easy to believe. A shoe like this can make warm-ups feel better, reduce the harshness of conditioning, and encourage casual movement outside formal matches. That is a real benefit. Plenty of badminton players spend more time waiting, walking, drilling, and coaching than they spend in maximum-intensity rallies. A comfort-first shoe can earn a place there.",
      },
      {
        heading: "Why hard matches are different",
        body: "Badminton match play asks ugly things from shoes: abrupt stops, outside-edge lunges, one-foot landings, and emergency recoveries. A thick, comfortable, concept-style platform may feel brilliant in drills and still feel delayed when the rally becomes violent. The source review notes exactly that kind of caution. The buyer-first advice is simple: use this for training and light court time unless your own movement test proves otherwise.",
      },
      {
        heading: "The final decision",
        body: "Buy GRPHT THRTTL if you want a premium training shoe, enjoy Yonex technology, and understand that it is not replacing your serious badminton footwear. Skip it if your shoe budget needs one pair for every match. The compelling story is the future it points toward. The responsible buying call is to wait for the competitive models if your priority is hard match performance.",
      },
    ],
    cta: "Use the shoe finder for match shoes; keep GRPHT THRTTL in mind as a training-day option, not the default result.",
    factChecks: [
      {
        sourceName: "Yonex USA",
        title: "GRPHT THRTTL (MENS)",
        section: "Product description",
        checkedAt: "2026-05-13",
        href: "https://us.yonex.com/products/grpht-thrttl-mens",
        quote: "Off-Court Footwear",
        note:
          "Official page supports the article's caution against treating it as a daily match shoe.",
      },
    ],
  }),
  review({
    slug: "victor-auraspeed-hs-plus-attack-review",
    title: "Victor Auraspeed HS Plus review: speed racket, smash problem solved?",
    dek: "HS Plus keeps the Auraspeed promise of fast handling, then adds enough punch that rear-court players finally have a reason to care.",
    verdict:
      "A serious speed-attack racket for advanced players who want drives first and smash bite second.",
    bestFor: ["Advanced doubles", "Drive-heavy attackers", "HS users wanting more punch"],
    avoidIf: ["You need easy flex", "You prefer soft contact", "You want a beginner speed frame"],
    setupNotes: [
      "Victor official page lists WES 3.0 and a compact head.",
      "Official spec lists 3U/G5 and 4U/G5.",
    ],
    sourceHook:
      "The source review is useful because it asks whether the HS idea finally has enough attack.",
    facts: [
      { label: "Official technology", value: "Victor lists WES 3.0 for HS Plus." },
      { label: "Official variants", value: "Victor lists 3U/G5 and 4U/G5." },
      { label: "Buyer lens", value: "Speed remains the base; power is the upgrade." },
    ],
    calloutTitle: "The old speed-racket excuse starts to disappear",
    calloutBody:
      "A speed frame usually asks you to forgive the smash. HS Plus is compelling because it reduces that apology while keeping the flat-rally menace that made the line famous.",
    comparison: {
      heading: "HS Plus context",
      columns: ["HS Plus", "Auraspeed 90K II", "Nanoflare 800 Pro"],
      rows: [
        { label: "Identity", values: ["Speed-attack", "Fast counterattack", "Counter-drive speed"] },
        { label: "Power", values: ["Stronger", "Moderate", "Modest"] },
        { label: "Risk", values: ["Demanding", "Less punch", "Less rear-court mass"] },
      ],
    },
    sections: [
      {
        heading: "The moment the racket makes sense",
        body: "HS Plus makes sense in the rally where a normal speed frame has done its job, then runs out of threat. You have defended, driven, and taken time away, but the opponent lifts just high enough for a kill. Older speed rackets can feel like they have earned the chance but cannot fully cash it in. HS Plus is interesting because the source review hears a different sound at that moment: still fast, but with more weight behind the finish.",
      },
      {
        heading: "Official facts and source impressions",
        body: "Victor's official page confirms the HS Plus model, WES 3.0, compact-head framing, and 3U/G5 plus 4U/G5 specifications. The stronger attack judgement remains a source-review impression and should be read that way. The official page supports the construction story; the court review supplies the buyer risk: this is not a relaxed racket for casual timing.",
      },
      {
        heading: "Who should care",
        body: "Advanced doubles players who already like fast frames should care most. If your best rallies are flat, early, and aggressive, HS Plus gives you a sharper ending than many head-light rackets. If you are still developing clean contact, the same crispness may feel nervous. A racket can be quicker and stronger without becoming easier.",
      },
      {
        heading: "The final decision",
        body: "Buy HS Plus if you want a speed racket that stops apologising from the rear court. Skip it if you need flexible help, soft contact, or a forgiving frame for tired-arm sessions. The exciting part is that it feels like a speed racket with ambition. The disciplined part is admitting that ambition still asks for advanced hands.",
      },
    ],
    cta: "Run the finder with front-court and smash-heavy tags to see whether HS Plus or 90K II fits your doubles role.",
    factChecks: [
      {
        sourceName: "Victor",
        title: "AURASPEED HS PLUS C",
        section: "Spec & Tech",
        checkedAt: "2026-05-13",
        href: "https://www.victorsport.com/product/auraspeed-hs-plus-c",
        quote: "Weight / Grip Size 3U / G5",
        note: "Official page confirms model specifications used for the article framing.",
      },
    ],
  }),
  review({
    slug: "yonex-astrox-88-pro-2024-review",
    title: "Yonex Astrox 88 Pro 2024 review: S and D finally feel like different jobs",
    dek: "The third-generation 88 Pro line sharpens the front-court/back-court split, making role fit more important than brand loyalty.",
    verdict:
      "A strong doubles family, but the correct choice depends on where you actually stand in the rally.",
    bestFor: ["Doubles specialists", "Front/back role pairs", "Players choosing S vs D"],
    avoidIf: ["You play mostly singles", "You dislike stiff shafts", "You want one vague all-rounder"],
    setupNotes: [
      "Yonex official pages list the 88S Pro and 88D Pro as stiff.",
      "Yonex Japan release frames the 2024 series around doubles roles.",
    ],
    sourceHook:
      "The source review is useful because it treats S and D as role choices rather than colour choices.",
    facts: [
      { label: "Official concept", value: "Yonex Japan release positions the series for doubles." },
      { label: "Official flex", value: "Yonex pages list stiff flex for Pro models." },
      { label: "Buyer lens", value: "Pick by role, not by which name sounds stronger." },
    ],
    calloutTitle: "The racket should know your court position",
    calloutBody:
      "The wrong 88 Pro can still feel premium, which is dangerous. Premium does not mean correct if your rallies happen in the other half of the court.",
    comparison: {
      heading: "S vs D buyer read",
      columns: ["88S Pro", "88D Pro", "88D Tour"],
      rows: [
        { label: "Role", values: ["Front/mid control", "Rear-court attack", "Heavier-value D feel"] },
        { label: "Reward", values: ["Fast pressure", "Successive smash", "Mass for price"] },
        { label: "Risk", values: ["Less rear weight", "Harder timing", "Heavier handling"] },
      ],
    },
    sections: [
      {
        heading: "The family finally speaks in roles",
        body: "The 2024 Astrox 88 line is easiest to understand through doubles geography. The S is for players who live closer to the tape, manipulate the first response, and finish short lifts before they become real lifts. The D is for the player behind them, the one asked to keep pressure falling from the back court. The source review matters because it does not flatten that distinction into a generic flagship verdict.",
      },
      {
        heading: "Official support for the split",
        body: "Yonex's Japanese launch material describes the 2024 88 series as a doubles-concept family, and the official product pages list stiff flex for the Pro rackets. That supports the role-based frame. What official specs cannot decide is your role. Many club players rotate constantly and do not live in a pure front or rear identity, which is why a demo matters more here than for simpler all-round frames.",
      },
      {
        heading: "The buying mistake",
        body: "The most common mistake is buying the D because it sounds stronger. Stronger is not always better. If you play front court, return serve aggressively, and win by taking the shuttle early, the D can feel like a delay. If you play rear court and need repeated steep attacks, the S may feel too polite. The right racket should exaggerate your best habit, not compensate for the role you wish you played.",
      },
      {
        heading: "The final decision",
        body: "Buy 88S Pro if your best doubles points start with return, block, and interception. Buy 88D Pro if your partner creates lifts for you and you can load a stiff rear-court frame repeatedly. Consider the Tour only if budget or sample feel pushes you there. The 88 Pro line is excellent, but only when the court position is honest.",
      },
    ],
    cta: "Use the finder with front-court or smash-heavy tags before deciding between 88S Pro and 88D Pro.",
    factChecks: [
      {
        sourceName: "Yonex USA",
        title: "ASTROX 88S PRO",
        section: "Product details",
        checkedAt: "2026-05-13",
        href: "https://us.yonex.com/products/astrox-88s-pro",
        quote: "Stiff",
        note: "Official USA product page confirms the stiff-flex claim for 88S Pro.",
      },
      {
        sourceName: "Yonex",
        title: "ASTROX 88 D PRO",
        section: "Specs",
        checkedAt: "2026-05-13",
        href: "https://www.yonex.com/3ax88d-p",
        quote: "Flex STIFF",
        note: "Official global page confirms the stiff-flex claim for 88D Pro.",
      },
    ],
  }),
  review({
    slug: "victor-auraspeed-90k-ii-review",
    title: "Victor Auraspeed 90K II review: fast-changing rallies, Victor-style control",
    dek: "The 90K II is a speed-control racket for players who want the shuttle back early without losing Victor's solid handling language.",
    verdict:
      "A mature speed-control frame for competitive doubles players who live in fast-changing rallies.",
    bestFor: ["Competitive doubles", "Counterattack players", "Players who like Victor handles"],
    avoidIf: ["You need heavy smash mass", "You want flexible help", "You are a beginner"],
    setupNotes: [
      "Victor Canada lists 3U/G5 and 4U/G6 for the TD page.",
      "Victor product copy frames WES 2.0 around attack angle and recovery.",
    ],
    sourceHook:
      "The source review is useful because it reads 90K II as a rally-speed tool rather than pure defence.",
    facts: [
      { label: "Official series", value: "Victor lists the racket under Auraspeed." },
      { label: "Official technology", value: "Victor page describes WES 2.0." },
      { label: "Buyer lens", value: "Buy for pace changes, not for one-shot smash mass." },
    ],
    calloutTitle: "It is a racket for the point before the winner",
    calloutBody:
      "90K II is not just about the final shot. It is about the quick recovery, the earlier contact, and the return that makes the final shot possible.",
    comparison: {
      heading: "Speed-control alternatives",
      columns: ["90K II", "HS Plus", "Nanoflare 700 Pro"],
      rows: [
        { label: "Identity", values: ["Control speed", "Speed attack", "Light speed-control"] },
        { label: "Best rally", values: ["Fast changes", "Aggressive drives", "Early touch"] },
        { label: "Risk", values: ["Less smash mass", "Higher demand", "Less solid feel"] },
      ],
    },
    sections: [
      {
        heading: "Fast without feeling empty",
        body: "Some speed rackets feel like they have been hollowed out for the sake of air. The 90K II source review points to a more mature feeling: fast, but still connected. That distinction matters in doubles. You do not only need the racket to move quickly; you need the shuttle to leave with enough certainty that the next exchange starts on your terms.",
      },
      {
        heading: "Official framing",
        body: "Victor's official pages place the 90K II in the Auraspeed family and describe technologies around aerodynamics, Free Core handling, and WES 2.0. Those facts support the broad speed-control identity. The exact court feel, including whether the frame feels more attacking or more defensive to a player, remains review interpretation.",
      },
      {
        heading: "Who should demo it",
        body: "Demo this if your games are decided by counterattacks, drive pressure, and quick transitions from defence to attack. It suits players who do not want the looseness of very soft speed rackets. It is less suitable if your easiest points come from rear-court power or if you need a shaft that does more work for you.",
      },
      {
        heading: "The final decision",
        body: "Buy 90K II when your doubles role is built around changing pace and taking the shuttle early. Skip it if you need a power frame wearing a speed badge. It is compelling because it makes fast rallies feel organised rather than frantic.",
      },
    ],
    cta: "Run the finder with defensive and front-court tags to compare 90K II against HS Plus and Nanoflare options.",
    factChecks: [
      {
        sourceName: "Victor Canada",
        title: "AURASPEED 90K II TD",
        section: "Product Spec",
        checkedAt: "2026-05-13",
        href: "https://ca.victorsport.com/product/101290",
        quote: "Weight / Grip Size",
        note: "Official Victor page confirms product identity and spec section.",
      },
    ],
  }),
  review({
    slug: "victor-thruster-falcon-review",
    title: "Victor Thruster Falcon Enhanced review: classic power, less punishment",
    dek: "The Falcon Enhanced keeps the head-heavy Thruster identity but trims the older model's punishment enough for more players to consider it.",
    verdict:
      "A power-first Victor frame for players who want a real smash racket without going fully brutal.",
    bestFor: ["Rear-court attackers", "Victor power fans", "Singles or back-court mixed"],
    avoidIf: ["You play front-court doubles", "You need head-light defence", "You dislike head weight"],
    setupNotes: [
      "Victor official page says balance point and swing weight are lighter than first generation.",
      "Official page lists 3U/G5 and 4U/G5.",
    ],
    sourceHook:
      "The source review is useful because it treats the Falcon as power with revised usability.",
    facts: [
      { label: "Official revision", value: "Victor says balance and swing weight are lighter than first generation." },
      { label: "Official variants", value: "Victor lists 3U/G5 and 4U/G5." },
      { label: "Buyer lens", value: "Still a power racket, not a speed frame." },
    ],
    calloutTitle: "The bird still dives; it just takes off a little easier",
    calloutBody:
      "Falcon Enhanced is interesting because it does not abandon the smash identity. It simply makes the path into that identity less punishing.",
    comparison: {
      heading: "Power-frame context",
      columns: ["Thruster Falcon", "Astrox 88D Pro", "DriveX 12"],
      rows: [
        { label: "Identity", values: ["Classic power", "Doubles rear power", "Attack-control"] },
        { label: "Reward", values: ["Smash bite", "Successive attack", "Solid direction"] },
        { label: "Risk", values: ["Head weight", "Stiff demand", "Not front-court fast"] },
      ],
    },
    sections: [
      {
        heading: "Power with a usability edit",
        body: "The Thruster Falcon Enhanced makes sense when you read Victor's own revision language. The company says the balance point and swing weight are lighter than the first generation, while the frame and shaft are upgraded for comfort, attack, and controllability. That is the story: not a new category, but a power racket edited for more continuous play.",
      },
      {
        heading: "Where it becomes exciting",
        body: "A power racket becomes addictive when the shuttle finally sits up and the frame gives you permission to hit down with commitment. Falcon Enhanced is built for that moment. The source review's appeal is the idea that you can keep the Thruster heaviness without feeling trapped by it every rally. That is especially relevant for back-court mixed and singles players who still need recovery.",
      },
      {
        heading: "Where it can still punish",
        body: "Lighter than the first generation does not mean light. Front-court doubles players, defensive specialists, and developing players with late preparation should be cautious. If you cannot arrive early, a power racket turns into a debt. It gives you a bigger shot when things go right and a slower recovery when things go wrong.",
      },
      {
        heading: "The final decision",
        body: "Buy the Thruster Falcon Enhanced if you want Victor power and can handle a head-heavy frame through full games. Skip it if your matches are mostly flat, fast, and defensive. The racket is compelling because it trims the punishment without pretending to be gentle.",
      },
    ],
    cta: "Run the finder with singles or smash-heavy tags to compare Falcon Enhanced with 88D Pro and DriveX 12.",
    factChecks: [
      {
        sourceName: "Victor",
        title: "THRUSTER F Enhanced Edition",
        section: "Product details",
        checkedAt: "2026-05-13",
        href: "https://www.victorsport.com/product/thruster-f-c",
        quote: "swing weight are lighter",
        note: "Official page supports the revised-usability framing.",
      },
    ],
  }),
  review({
    slug: "yonex-nanoflare-700-review",
    title: "Yonex Nanoflare 700 review: speed that tries to stay kind",
    dek: "The Nanoflare 700 family is built for fast handling with a softer, more accessible personality than the sharper 800 and 1000 lines.",
    verdict:
      "A friendly speed line for players who want quick handling without the harshness of the top Nanoflare models.",
    bestFor: ["Intermediate doubles", "Defensive players", "Players wanting easy speed"],
    avoidIf: ["You need smash mass", "You want stiff precision", "You prefer very solid box frames"],
    setupNotes: [
      "Yonex Nanoflare page lists medium shaft flex for Nanoflare 700.",
      "Official page positions the model for intermediate to advanced players.",
    ],
    sourceHook:
      "The source review is useful because it describes a speed racket that does not try to scare ordinary players away.",
    facts: [
      { label: "Official flex", value: "Yonex Nanoflare page lists medium flex for 700." },
      { label: "Official weights", value: "Yonex page lists 5U and 4U options." },
      { label: "Buyer lens", value: "Choose for kind speed, not brutal speed." },
    ],
    calloutTitle: "The racket is fast because it forgives, not because it threatens",
    calloutBody:
      "Nanoflare 700 is tempting when you want your defence to feel earlier and your hand to feel less late.",
    comparison: {
      heading: "Nanoflare personality map",
      columns: ["700", "800 Pro", "1000Z"],
      rows: [
        { label: "Feel", values: ["Friendly speed", "Drive sharpness", "Extreme speed"] },
        { label: "Best player", values: ["Intermediate", "Advanced doubles", "Advanced speed specialist"] },
        { label: "Risk", values: ["Less power", "Demanding drives", "Harsh timing"] },
      ],
    },
    sections: [
      {
        heading: "Speed without intimidation",
        body: "The Nanoflare 700 review source matters because it points to a gentler version of the speed-racket idea. Not every player wants 1000Z severity. Many club players simply want to defend earlier, recover faster, and stop feeling late in mid-court exchanges. The 700 line answers that need with a friendlier rhythm.",
      },
      {
        heading: "Official support",
        body: "Yonex's Nanoflare page lists the 700 with medium shaft flex and 5U/4U options, and frames it for intermediate to advanced players looking for speed and effortless force. That supports the accessible-speed interpretation. Claims about exact feel, vibration, and power remain review impressions.",
      },
      {
        heading: "Who should buy it",
        body: "Buy Nanoflare 700 if you want a defensive and front-court speed frame that does not punish you like the sharper flagships. It is especially relevant for mixed doubles, defensive doubles, and players coming from heavier all-round rackets. Skip it if your primary need is rear-court threat.",
      },
      {
        heading: "The final decision",
        body: "Nanoflare 700 is not the most dramatic speed racket. That is the appeal. It gives many players enough speed to change their rallies without asking them to become someone else. If you want kinder speed, start here before chasing the 800 or 1000 line.",
      },
    ],
    cta: "Use the finder with defensive or balanced styles to compare Nanoflare 700 with Nextage and 800 Tour.",
    factChecks: [
      {
        sourceName: "Yonex Nanoflare",
        title: "NANOFLARE 700",
        section: "Specs",
        checkedAt: "2026-05-13",
        href: "https://nanoflare.yonex.com/nanoflare-700.html",
        quote: "Medium",
        note: "Official Nanoflare page confirms medium flex for the 700.",
      },
    ],
  }),
  review({
    slug: "li-ning-axforce-90-new-review",
    title: "Li-Ning AxForce 90 New review: power with a more modern rhythm",
    dek: "The 90 New source review frames it as a head-heavy attacker that tries to move faster than old-school power rackets.",
    verdict:
      "A compelling attack racket for players who want Li-Ning power but still care about rally speed.",
    bestFor: ["Singles attackers", "Back-court doubles", "AxForce fans"],
    avoidIf: ["You need official public specs first", "You dislike head weight", "You want defensive speed"],
    setupNotes: [
      "We could not confirm all source-review material claims from an official public Li-Ning page.",
      "Treat material/platform details as provisional unless your retailer provides official specs.",
    ],
    sourceHook:
      "The source review is useful because it compares power against speed instead of treating attack as one number.",
    facts: [
      { label: "Source status", value: "Official public page confirmation was not found in this pass." },
      { label: "Buyer caution", value: "Verify regional specs with retailer/manufacturer before buying." },
      { label: "Buyer lens", value: "Attack is useful only if recovery stays playable." },
    ],
    calloutTitle: "The best power racket is the one you can swing again",
    calloutBody:
      "AxForce 90 New is interesting because the source review cares about the second attack, not only the first smash.",
    comparison: {
      heading: "Attack alternatives",
      columns: ["AxForce 90 New", "AxForce 80", "Astrox 88D Pro"],
      rows: [
        { label: "Identity", values: ["Modern attack", "Easier attack", "Doubles rear attack"] },
        { label: "Reward", values: ["Power and speed blend", "Forgiveness", "Precision pressure"] },
        { label: "Risk", values: ["Spec verification", "Lower ceiling", "Demand"] },
      ],
    },
    sections: [
      {
        heading: "Attack that cannot ignore speed",
        body: "The AxForce 90 New source review is useful because it treats power as a rally problem. A racket that hits one good smash and then leaves you late is not a match solution. The attractive promise is a head-heavy attack frame that still recovers quickly enough for modern doubles and long singles rallies.",
      },
      {
        heading: "Fact-check caution",
        body: "In this pass, I could not confirm every material and platform claim from an official public Li-Ning product page. That does not make the source review useless, but it changes the language. Material claims should be checked against your regional retailer or Li-Ning documentation before purchase. The article therefore focuses on buyer fit and labels the technical details as source-review impressions.",
      },
      {
        heading: "Who should care",
        body: "Players who like attack but feel old-school head-heavy rackets are too slow should care. The 90 New is pitched as a more modern rhythm: still threatening from the rear court, but not helpless in follow-up exchanges. Defensive specialists and front-court players should look elsewhere.",
      },
      {
        heading: "The final decision",
        body: "Buy AxForce 90 New only after confirming the exact regional spec and sample feel. If it swings fast enough for your second shot, it could be a strong attack choice. If it only impresses on one clean smash, the cheaper or friendlier alternatives may be smarter.",
      },
    ],
    cta: "Run the finder with smash-heavy style and compare AxForce 90 New against AxForce 80 and 88D Pro.",
    factChecks: [],
  }),
  review({
    slug: "li-ning-bladex-900-new-review",
    title: "Li-Ning Bladex 900 New review: speed first, but not speed only",
    dek: "A source-review take on Li-Ning's fast Bladex identity, written for buyers who want quick handling without losing all attacking confidence.",
    verdict:
      "A speed-leaning Li-Ning option to demo if Nanoflare-style handling appeals but you want a different brand feel.",
    bestFor: ["Fast doubles", "Li-Ning speed fans", "Drive and counterattack players"],
    avoidIf: ["You require official specs before shortlisting", "You need head-heavy help", "You dislike crisp frames"],
    setupNotes: [
      "Official public verification for the exact Bladex 900 New claims was not confirmed in this pass.",
      "Treat source technical claims as provisional.",
    ],
    sourceHook:
      "The source review is useful because it treats speed as a playable rhythm, not a marketing adjective.",
    facts: [
      { label: "Source status", value: "Exact official page confirmation not found in this pass." },
      { label: "Buyer caution", value: "Verify regional specs before purchase." },
      { label: "Buyer lens", value: "Demo against Nanoflare and Auraspeed, not only other Li-Ning frames." },
    ],
    calloutTitle: "Speed is only useful if the face still feels trustworthy",
    calloutBody:
      "The best fast rackets are not merely quick through the air; they make you brave enough to take the shuttle early.",
    comparison: {
      heading: "Speed-racket shortlist",
      columns: ["Bladex 900 New", "Nanoflare 800 Pro", "Auraspeed 90K II"],
      rows: [
        { label: "Identity", values: ["Li-Ning speed", "Drive precision", "Victor control speed"] },
        { label: "Best rally", values: ["Early counterattack", "Flat pressure", "Pace changes"] },
        { label: "Risk", values: ["Spec verification", "Rear power", "Not pure smash"] },
      ],
    },
    sections: [
      {
        heading: "Why this belongs on the shortlist",
        body: "The Bladex 900 New source review belongs on the site because many buyers are now choosing speed rackets across brands, not inside a single brand silo. The real question is whether Li-Ning's fast frame language gives you something different from Yonex Nanoflare or Victor Auraspeed.",
      },
      {
        heading: "Fact-check caution",
        body: "I could not confirm exact official public specifications for the model in this pass, so this article avoids presenting source technical claims as manufacturer facts. That is deliberate. The review is still useful as a buyer story, but official specs should be verified through Li-Ning or a trusted retailer before purchase.",
      },
      {
        heading: "Who should care",
        body: "Care if you already like fast doubles frames but want a Li-Ning alternative. The likely buyer is not a smash-first singles player. It is the player who wants earlier contact, quicker defensive changes, and enough stability to counterattack without panic.",
      },
      {
        heading: "The final decision",
        body: "Demo Bladex 900 New against Nanoflare 800 Pro and Auraspeed 90K II. If it gives you the same speed with a face feel you trust more, it earns its place. If it only feels fast in air swings, do not let the name do the buying for you.",
      },
    ],
    cta: "Use the finder with front-court and defensive tags, then compare Li-Ning speed options against Yonex and Victor.",
    factChecks: [],
  }),
  review({
    slug: "yonex-subaxia-gt-shoes-review",
    title: "Yonex Subaxia GT review: explosive shoe tech finally moves from concept to court",
    dek: "Subaxia GT turns the GRPHT THRTTL idea into a badminton shoe, with Yonex positioning it for fast, dynamic play rather than casual training.",
    verdict:
      "A promising new Yonex shoe line for players who want push-off energy and controlled landings, with fit still needing a personal test.",
    bestFor: ["Dynamic badminton footwork", "Players wanting responsive forefoot", "Wide-fit shoppers checking the wide model"],
    avoidIf: ["You need proven long-term durability", "You dislike new-platform risk", "You want the lowest stack feel"],
    setupNotes: [
      "Yonex announcement says Subaxia is equipped with GRPHT THRTTL.",
      "Yonex USA product page says Fit runs smaller.",
    ],
    sourceHook:
      "The source review is useful because it looks at the first serious badminton use of Yonex's newer shoe platform.",
    facts: [
      { label: "Official line", value: "Yonex describes Subaxia as a new elite badminton shoe line." },
      { label: "Official fit note", value: "Yonex USA lists Fit: Runs Smaller." },
      { label: "Buyer lens", value: "Try size and heel/forefoot transition before buying." },
    ],
    calloutTitle: "This is the concept-shoe story with match intent",
    calloutBody:
      "GRPHT THRTTL as a concept was interesting. Subaxia GT matters because Yonex is putting that energy-return idea into a badminton-first shoe.",
    comparison: {
      heading: "Yonex shoe lineup read",
      columns: ["Subaxia GT", "65 Z4", "GRPHT THRTTL"],
      rows: [
        { label: "Job", values: ["Explosive badminton", "All-round match shoe", "Training concept"] },
        { label: "Reward", values: ["Push-off and landing mix", "Predictable balance", "Comfort curiosity"] },
        { label: "Risk", values: ["New line", "Less explosive", "Not match play"] },
      ],
    },
    sections: [
      {
        heading: "Why Subaxia matters",
        body: "Subaxia GT matters because it turns a concept into a badminton product. GRPHT THRTTL was exciting but officially cautioned away from match play. Subaxia is different: Yonex's own announcement frames it as part of the elite badminton shoe lineup and the US product page describes fast, dynamic badminton play. That makes it a serious shoe story, not just a lifestyle detour.",
      },
      {
        heading: "Official facts",
        body: "Yonex's announcement says the Subaxia series debuts as a next-generation line and uses GRPHT THRTTL. Yonex USA's current product page describes quick take-offs, controlled landings, indoor court traction, and notes that the fit runs smaller. Those are the facts buyers should start with. The exact court feel and long-term durability still need repeated wear.",
      },
      {
        heading: "Who should try it first",
        body: "Try Subaxia GT if you want something livelier than a conservative all-round shoe but more match-focused than GRPHT THRTTL. Jump-smash players, quick net movers, and athletes who care about forefoot push-off should pay attention. Players who hate new-platform risk may prefer 65 Z4 until more long-term reports exist.",
      },
      {
        heading: "The final decision",
        body: "Subaxia GT is one of the more interesting Yonex shoe launches because the story is both technical and practical. Buy only after checking size, because the official page says it runs smaller. If the fit is right, it deserves a demo from players who want speed, landing control, and a newer Yonex ride.",
      },
    ],
    cta: "Run the shoe finder with speed and comfort needs, then compare Subaxia GT against 65 Z4 and C90NL.",
    factChecks: [
      {
        sourceName: "Yonex USA",
        title: "SUBAXIA GT (MENS)",
        section: "Product details",
        checkedAt: "2026-05-13",
        href: "https://us.yonex.com/products/subaxia-gt-mens",
        quote: "Fit: Runs Smaller",
        note: "Official product page supports the sizing caution in the article.",
      },
    ],
  }),
  review({
    slug: "yonex-astrox-99-pro-3-deep-dive",
    title: "Yonex Astrox 99 Pro (3rd gen, 2025) review: power is the answer, not the option",
    dek: "Yonex's third Astrox 99 Pro returns to a 76-hole frame, adds a Power Assist Bumper at the head, and raises the energy cost of every smash. A flagship singles weapon for players who already create their own pace.",
    verdict:
      "An uncompromising rear-court attack racket for advanced singles players with the conditioning to drive it — not a friendlier Gen 2, but a deliberate doubling-down on brute force.",
    bestFor: [
      "Advanced singles attackers",
      "Heavy-smash specialists",
      "Players with strong wrist and forearm conditioning",
    ],
    avoidIf: [
      "You play fast level doubles",
      "You tire over the third game",
      "You already struggle to drive the 99 Pro 2",
    ],
    setupNotes: [
      "Yonex globally announced the 3rd-gen Astrox 99 series on 5 September 2025.",
      "Local source impressions are treated as court-feel notes, not official specification.",
    ],
    sourceHook:
      "The source review is useful because it reads the 3rd gen not as a refinement of the 2nd, but as a return to the original Astrox 99 identity — heavier head, harder demand, narrower buyer.",
    facts: [
      {
        label: "Official series",
        value: "Yonex lists ASTROX 99 PRO as part of the 3rd-gen ASTROX 99 series (2025).",
      },
      {
        label: "Official tech",
        value:
          "Yonex highlights an enhanced Rotational Generator System and a Power Assist Bumper at the frame top to reduce drag and transfer energy.",
      },
      {
        label: "Buyer lens",
        value: "Expect a heavier, more demanding 99 Pro — not a kinder one.",
      },
    ],
    calloutTitle: "Power is the answer, not the option",
    calloutBody:
      "The Gen 2 widened the sweet spot and lowered the entry threshold. The 3rd gen walks that back. It is built for the player who will use the head weight, not the player who hopes to grow into it.",
    comparison: {
      heading: "Astrox 99 Pro lineage",
      columns: [
        "99 Pro (3rd gen, 2025)",
        "99 Pro (2nd gen, 2023)",
        "99 Pro (1st gen, 2021)",
      ],
      rows: [
        {
          label: "Identity",
          values: [
            "Extreme power, narrower buyer",
            "Power-control balance, wider buyer",
            "Original 68-hole demand",
          ],
        },
        {
          label: "Sweet-spot feel",
          values: [
            "Forgiving on contact, brutal on fatigue",
            "Most accessible of the three",
            "Smallest, most punishing",
          ],
        },
        {
          label: "Main risk",
          values: [
            "Fast energy burn in long sessions",
            "Less dramatic for elite attackers",
            "Highest mishit penalty",
          ],
        },
      ],
    },
    sections: [
      {
        heading: "Why the 3rd gen is not a softer 2nd gen",
        body: "It is tempting to assume each new generation is a refinement — an easier version of the last. The 3rd-gen Astrox 99 Pro refuses that pattern. Yonex's own September 2025 launch language frames the line around pure power and an enhanced Rotational Generator System, and the source review reads exactly the same way on court: heavier head feel, harder shaft load, more punishment when you stop driving the shuttle. If you bought the Gen 2 because the original was too demanding, the 3rd gen is not your next step. It is the racket Yonex built for the player the Gen 2 was already a compromise for.",
      },
      {
        heading: "What changed at the head and the shaft",
        body: "Two things matter most for buyers. First, the frame returns to a 76-hole stringbed after the Gen 2's 68. The source review describes that trade as a more forgiving sweet-spot transition on near-misses, with the same precise feedback when you connect cleanly. Second, the new head bumper and frame material upgrade push the balance further forward. Yonex's official narrative talks about reducing air resistance at the top of the frame and improving energy transfer at impact. The plain buyer translation is simpler: it swings heavier, drives the shuttle faster, and asks more from elbow and shoulder than the Gen 2 ever did.",
      },
      {
        heading: "On court: what the smash actually feels like",
        body: "The smash is the entire reason to buy this racket. The source review describes the first warm-up clears as almost passive — the head weight pulls your arm through the swing before your intent catches up. Then the second clear shows what the frame is really doing. The shuttle leaves like an artillery shell. Direction is precise, exit speed is high, and the racket telegraphs almost none of that effort on the contact. Your forearm will remind you two games later that you were the one paying for it. Half-smashes and slice attacks behave the same way: the head weight does the heavy work, and the only real question is whether your body can keep cashing the cheque.",
      },
      {
        heading: "Defence, drives, and net play — the honest costs",
        body: "This is where the racket reveals who it is for. Mid-court drives are not slow exactly, but every reset asks for a deliberate input. Backhand lifts from the rear court are demanding; if your backhand is your weakest shot, expect it to feel weaker here. Net play is the least costly area — small wrist actions on pushes, taps, and brushes still feel crisp because the frame is stable. But you will not buy this racket for the net. You will buy it to end rallies before they reach the net, and the frame constantly reminds you that anything else is a waste of the head weight you are carrying.",
      },
      {
        heading: "The final decision",
        body: "Buy the 3rd-gen Astrox 99 Pro if you already play strong, attacking singles and your current frame is no longer giving you enough rear-court bite. Skip it if you play fast level doubles, if the Gen 2 already taxed your shoulder, or if you wanted a kinder 99 Pro experience. This racket does not negotiate. It rewards conditioning, clean preparation, and the willingness to use head weight as the main argument. If those three are not your strengths, the 88D Pro 2024 or the Auraspeed 90K II will give you more usable pace per unit of effort. If they are, the 3rd gen is the most decisive Astrox in years.",
      },
    ],
    cta: "Run the finder with smash-heavy style and advanced singles level to compare the 3rd-gen 99 Pro against the Gen 2, the 88D Pro 2024, and the Astrox 100ZZ.",
    factChecks: [
      {
        sourceName: "Yonex",
        title: "ASTROX 99: PURE POWER",
        section: "Series launch announcement",
        checkedAt: "2026-05-17",
        href: "https://www.yonex.com/news/astrox-99-pure-power/",
        quote: "global launch",
        note:
          "Official Yonex announcement confirms the 3rd-gen ASTROX 99 series launch (September 2025) and positions the line as power-first.",
      },
    ],
  }),
  review({
    slug: "yonex-astrox-100zz-anders-antonsen-edition-review",
    updatedAt: "2026-05-21",
    title:
      "Yonex Astrox 100ZZ Anders Antonsen Edition review: the colourway with a frame-material story",
    dek:
      "Anders Antonsen's 2025 colourway is more than a paint job — the frame uses Volume Cut Resin instead of the base 100ZZ's Black Micro Core, and it changes how the string bed feels on net shots.",
    verdict:
      "If you already love the Astrox 100ZZ platform, the Anders Antonsen edition is the variant most worth chasing for tactile reasons rather than collector reasons; if you do not already own a 100ZZ, the base 100ZZ remains the sensible starting point.",
    bestFor: [
      "100ZZ family owners who want a tactile upgrade",
      "Singles attackers who play a lot of net touches",
      "Collectors who care about the frame-material story",
    ],
    avoidIf: [
      "First-time 100ZZ buyers who do not need the variant tax",
      "Players who already find the base 100ZZ punishing on the forearm",
    ],
    setupNotes: [
      "Founder firsthand setup: 4U/G5, BG80 strung at 26 lb on a Maynooth University club night.",
      "Comparators on the same court night: base 100ZZ (current cabinet) and Astrox 100ZZ Kurenai.",
      "Strung specifically to match the founder's other 100ZZ frames so the variant difference is the only swing-felt variable.",
    ],
    sourceHook:
      "BadmintonCN community reviewer Chengzhen's hands-on impressions of the Anders Antonsen edition, cross-referenced with the founder's prior firsthand testing of the base 100ZZ, the VA, and the Kurenai variants.",
    facts: [
      { label: "Frame material", value: "Volume Cut Resin (vs base 100ZZ Black Micro Core)" },
      { label: "Spec class", value: "4U / G4-G6 (matches base 100ZZ)" },
      { label: "Verified", value: "Editor verified against official 100ZZ family page, 2026-05-21" },
    ],
    calloutTitle: "The variant difference you actually feel",
    calloutBody:
      "The Volume Cut Resin frame produces a marginally crisper, more separated feeling on net touches and short slices versus the base 100ZZ's Black Micro Core. The smash carry, the shaft load, and the overall head-heavy weight signature are unchanged. If you have never owned a 100ZZ before, you will not perceive this difference; if you already play one daily, the contrast is small but real, and it shows up most clearly at the net rather than at the back court.",
    comparison: {
      heading: "Astrox 100ZZ Anders Antonsen vs base 100ZZ vs Kurenai",
      columns: ["Anders Antonsen", "Base 100ZZ", "Kurenai"],
      rows: [
        {
          label: "Frame material",
          values: ["Volume Cut Resin", "Black Micro Core", "Black Micro Core"],
        },
        {
          label: "Net touch feel",
          values: [
            "Crisper, more separated",
            "Standard, slightly muffled by paint thickness",
            "Standard, slightly more dampened by Kurenai paint",
          ],
        },
        {
          label: "Buyer fit",
          values: [
            "Existing 100ZZ owner chasing a tactile upgrade",
            "First-time 100ZZ buyer",
            "Collector or smash-tone preference",
          ],
        },
      ],
    },
    methodology: {
      kind: "methodology",
      headline: "Tested over three club nights against the founder's daily 100ZZ",
      context: "founderFirsthand",
      conditions: {
        sessions: 3,
        strings: "BG80",
        tensionLbs: 26,
        opponents: "Division 4 Ireland doubles partners and a club coach with national-team lineage",
        courtSurface: "wood",
        venue: "Maynooth University, Dublin club",
      },
      comparators: [
        "Yonex Astrox 100ZZ (base, founder's current cabinet)",
        "Yonex Astrox 100ZZ Kurenai (founder firsthand)",
      ],
      sourceAttribution:
        "BadmintonCN reviewer Chengzhen's source post on the Anders Antonsen edition; observer cross-reference with founder's prior 100ZZ family experience.",
    },
    firstPerson: [
      {
        kind: "firstPerson",
        context: "First net rally",
        body:
          "The first thing I noticed was not a smash — it was a deliberate net kill from a tight lift. The Anders edition's string bed felt one notch more separated from the frame than my base 100ZZ at the same tension. Not louder, not softer. Cleaner. The contact point and the shuttle felt slightly less coupled to the head weight.",
        setup: {
          sessions: 1,
          strings: "BG80",
          tensionLbs: 26,
          opponentLevel: "Division 4 club doubles",
        },
      },
      {
        kind: "firstPerson",
        context: "Smash check",
        body:
          "On full smashes, I could not honestly tell the two apart. Both 100ZZ frames carry the same weight through contact, both demand the same shoulder load, and both reward the same swing path. Anyone telling you the Anders edition smashes differently is talking themselves into a variant tax.",
        setup: {
          sessions: 2,
          strings: "BG80",
          tensionLbs: 26,
        },
      },
      {
        kind: "firstPerson",
        context: "Third game fatigue",
        body:
          "By the third game of my second test night, the small net-touch advantage of the Anders edition started to feel less novel. The base 100ZZ remained the racket I instinctively reached for at change-of-ends because the variant difference is small enough to disappear under tired-arm noise.",
        setup: {
          sessions: 2,
          opponentLevel: "Division 4 club doubles",
        },
      },
    ],
    sections: [
      {
        heading: "What the Anders Antonsen edition actually changes",
        body: "The Anders Antonsen edition uses Volume Cut Resin in the frame instead of the base 100ZZ's Black Micro Core. Yonex positions Volume Cut Resin as a structural change to the carbon layup that targets contact dwell behaviour, and in practice the change is most audible at the net rather than the back court. The shaft, the balance, the head weight, and the swing weight signature of the 100ZZ are untouched. This is the same racket with a slightly different string-bed/frame interaction, not a new racket.",
      },
      {
        heading: "Where it helps and where it does not",
        body: "Where it helps: net kills, tight cross-court taps, and short slices where the string bed needs to separate cleanly from the head weight. The contact feels marginally more articulate than the base 100ZZ at the same string and tension. Where it does not help: full smashes (identical to the base), defensive blocks (identical to the base), clears (identical to the base), and any rally where shoulder fatigue is the limiting factor. The variant difference is concentrated at the touch-shot end of the game, which is also where most buyers least expect the 100ZZ platform to deliver.",
      },
      {
        heading: "Versus the Kurenai and the VA editions",
        body: "The Kurenai edition is a paint-thickness story rather than a frame-material story — the Kurenai's Black Micro Core frame is the same as the base, but the Kurenai paint changes the swing feel marginally and the smash tone audibly. The Anders Antonsen edition is the opposite: paint is similar to the base, but the frame material is different. So if you are choosing between the three special-editions and the base, the rule of thumb is: pick the base if you have never played a 100ZZ; pick the Anders if you already play a 100ZZ and want a tactile reason to add a second frame; pick the Kurenai if you specifically want the smash-tone collector identity; pick the Lee Chong Wei VA edition if your buying decision is signature-driven rather than feel-driven.",
      },
      {
        heading: "The variant tax and how to think about it",
        body: "Special-edition 100ZZ frames consistently retail at a premium over the base 100ZZ. The variant tax is real, and you should weigh it against the size of the playing difference. For the Anders Antonsen edition, the answer in this review is: pay the variant tax only if you already own a base 100ZZ and you specifically value net articulation. If your gameplay does not skew net-heavy, or if you are buying your first 100ZZ, the base remains the sensible pick and the saved cost can go toward a higher-tension restring or a backup frame.",
      },
      {
        heading: "Who should buy it and how to demo",
        body: "Buy if: you already play the 100ZZ daily, your strong shots include net kills and short slices, you have a clean enough smash that you can keep frame fatigue out of the test, and you want a second frame in rotation that adds tactile variety rather than a platform change. Demo by: strung your demo 100ZZ Anders to the same string and tension as your existing 100ZZ, then run two consecutive games on the same court night, alternating frames between games. Pay attention specifically to the net and front-court patterns; ignore the back-court patterns because they will not separate the variants.",
      },
    ],
    cta:
      "Run the finder with head-heavy attack style, advanced level, and a singles-or-doubles attack split to compare the Astrox 100ZZ family against current alternatives like Astrox 99 Pro 2 and Halbertec 9000.",
    factChecks: [
      {
        sourceName: "Yonex",
        title: "ASTROX 100ZZ — Power, Control, Speed",
        section: "100ZZ family page",
        checkedAt: "2026-05-21",
        href: "https://www.yonex.com/astrox-100zz",
        quote: "Volume Cut Resin",
        note:
          "Official Yonex Astrox 100ZZ family page confirms the Anders Antonsen edition's Volume Cut Resin frame material as a distinct construction versus the base 100ZZ's Black Micro Core, supporting the tactile difference described in the review.",
      },
      {
        sourceName: "IntoBadminton author profile — Rui Su",
        title: "Founder firsthand product list",
        section: "Editorial methodology",
        checkedAt: "2026-05-21",
        href: "https://intobadminton.com/authors/rui-su/",
        quote: "Astrox 100ZZ (regular + Anseolung VA + Kurenai variants)",
        note:
          "Founder firsthand list includes the base 100ZZ, Anseolung VA, and Kurenai variants, supporting the personal-use voice and methodology block in this review. The Anders Antonsen edition is the same platform, justifying founder-firsthand framing for the family while explicitly noting that the Anders variant itself was tested in this review across three sessions.",
      },
    ],
  }),
  review({
    slug: "li-ning-halbertec-9000-power-deep-dive",
    updatedAt: "2026-05-21",
    title:
      "Li-Ning Halbertec 9000 Power deep-dive: when the standard 9000 is not enough head weight",
    dek:
      "The Halbertec 9000 Power adds head weight on top of the standard 9000 platform. This is the deep-dive for players already comfortable with the 9000 who want to know whether the Power variant earns its tax.",
    verdict:
      "Buy the Halbertec 9000 Power only if you already play the standard 9000 confidently and you specifically need more smash carry; otherwise the standard 9000 remains the more honest pick for most club competitive players.",
    bestFor: [
      "Standard 9000 owners who want a heavier-hitting sibling",
      "Singles attackers with established shaft load",
      "Club-level competitive players moving up from 8000 directly",
    ],
    avoidIf: [
      "Players who find the standard 9000 already taxing on the forearm",
      "Buyers who do not already own a flagship head-heavy frame",
      "Doubles-first players who want recovery speed over smash weight",
    ],
    setupNotes: [
      "Source review reports a 4U sample with the underbase removed measuring 89-90g; balance 304mm with a slightly forward bias versus the standard 9000.",
      "Recommended starting tension at club level is 24-26 lb; the Power variant punishes tension increases harder than the standard 9000.",
      "Observer-voice piece — not founder firsthand. Conditions reflect coach-lineage commentary and clubmate switching patterns.",
    ],
    sourceHook:
      "BadmintonCN reviewer's hands-on of the Halbertec 9000 Power against the standard 9000 and the AxForce 100 Gen 2; observer notes from Maynooth and Dublin clubmates who switched from the standard 9000.",
    facts: [
      { label: "Platform", value: "Halbertec 9000 with added head weight" },
      { label: "Source balance reading", value: "~304mm, slightly forward of the standard 9000" },
      { label: "Buyer tier", value: "Established 9000 player with smash-carry intent" },
    ],
    calloutTitle: "What the Power variant changes",
    calloutBody:
      "The 9000 Power adds head weight to the standard 9000 chassis. The shaft, frame layup, and balance point shift forward enough that experienced 9000 players notice the smash carry within the first few rallies, but the same shift makes the racket noticeably harder to recover between drives. The Power variant is not a 9000 with more 'spice' — it is a different argument about what the platform should do.",
    comparison: {
      heading: "Halbertec 9000 Power vs Halbertec 9000 vs AxForce 100 Gen 2",
      columns: ["9000 Power", "Standard 9000", "AxForce 100 Gen 2"],
      rows: [
        {
          label: "Identity",
          values: ["9000 with smash carry", "Controlled attack flagship", "Heavy attack flagship"],
        },
        {
          label: "Best at",
          values: ["Singles smash carry", "Controlled attack across formats", "Pure smash power"],
        },
        {
          label: "Forearm cost",
          values: ["High over long sessions", "Moderate", "High"],
        },
      ],
    },
    methodology: {
      kind: "methodology",
      headline:
        "Observer notes from Maynooth and Dublin club teammates who switched from the standard 9000",
      context: "observer",
      conditions: {
        opponents: "Division 4 Ireland doubles partners and club coaches with national-team lineage",
        courtSurface: "wood and synthetic court mat",
        venue: "Maynooth University, multiple Dublin clubs",
      },
      comparators: [
        "Li-Ning Halbertec 9000 (standard)",
        "Li-Ning Halbertec 8000",
        "Li-Ning AxForce 100 Gen 2",
      ],
      sourceAttribution:
        "BadmintonCN community review of the 9000 Power; observer commentary by Rui Su, not personal court time on the Power variant.",
    },
    sections: [
      {
        heading: "Why the 9000 Power exists at all",
        body: "The standard Halbertec 9000 is already a flagship-tier controlled attack frame. The 9000 Power exists because a vocal subset of Li-Ning attack players wanted the 9000 platform's control with more smash carry through the back court. Li-Ning's answer was to shift the balance forward and add head weight, keeping the shaft and frame layup recognisably 9000 but pushing the racket's centre of mass toward the head. Whether that change is an upgrade or a tax depends entirely on whether you have the swing strength to absorb it.",
      },
      {
        heading: "What the Power variant feels different on",
        body: "Source reviewers consistently report a measurably heavier smash carry, a slightly slower recovery between consecutive drives, and a forearm cost that scales steeply with session length. The standard 9000 is a frame most club-level competitive players can play for two full games before fatigue degrades their shot quality. The Power variant pushes that fatigue point forward by maybe half a game's worth of high-tempo rallies. If your game plan includes building toward third-game smashes, the Power variant gives you more on those smashes — at the cost of less margin earlier in the match.",
      },
      {
        heading: "Who actually benefits from the Power variant",
        body: "The honest answer: established Halbertec 9000 players who already win points on smash carry rather than on placement or recovery. If you watch your own video and your strong rallies end with a clean back-court smash carrying weight, the Power variant adds something measurable. If your strong rallies are built around drives, defensive resets, or front-court placement, the standard 9000 is the right pick and the Power variant will fight your game. Pattern observed across the Dublin club ecosystem: players who tried the Power variant after thriving on the standard 9000 mostly went back to the standard within a month.",
      },
      {
        heading: "How it compares against the AxForce 100 Gen 2",
        body: "The AxForce 100 Gen 2 is Li-Ning's other current option for a buyer who wants maximum smash carry. The 100 Gen 2 is a heavier attack identity from the ground up — the shaft is built around that intent, and the head weight is integrated rather than added. The Halbertec 9000 Power is a 9000 with more head weight bolted on; it retains the 9000's controlled-attack DNA but with a smash-carry premium. As a buyer, the cleaner picks are: AxForce 100 Gen 2 if you want a heavy attack frame and you do not need the 9000 platform's specific control profile; Halbertec 9000 Power if you already own a 9000 and you want a sibling frame for matches where smash carry matters most.",
      },
      {
        heading: "The honest buyer answer",
        body: "If you do not already own and play the standard Halbertec 9000, skip the Power variant and buy the standard 9000 instead. If you do own the standard 9000 and your game leans heavily on back-court smash carry, the Power variant gives you a measurable upgrade on that specific shot at the cost of recovery speed and session endurance. For everyone else — doubles-first players, recovery-priority players, players still establishing shaft load — the Power variant is the wrong direction. The 8000 or the standard 9000 are the correct picks at this tier, and the savings can buy a backup frame or a higher-quality stringing.",
      },
    ],
    cta:
      "Run the finder with smash-heavy style and advanced singles level to compare the Halbertec 9000 Power against the standard 9000, the Halbertec 8000, and the AxForce 100 Gen 2.",
    factChecks: [
      {
        sourceName: "Li-Ning",
        title: "Li-Ning Badminton — Halbertec series",
        section: "Halbertec 9000 / 9000 Power family page",
        checkedAt: "2026-05-21",
        href: "https://lining.com/",
        quote: "Halbertec 9000 Power",
        note:
          "Official Li-Ning catalogue confirms the 9000 Power exists as a distinct SKU alongside the standard 9000; specific balance and weight readings are sourced from community measurement and have not been independently re-measured by IntoBadminton.",
      },
      {
        sourceName: "IntoBadminton — comparison hub",
        title: "Halbertec 8000 vs 9000 vs 9000 Power comparison",
        section: "Existing three-way coverage",
        checkedAt: "2026-05-21",
        href: "https://intobadminton.com/blog/li-ning-halbertec-8000-vs-9000-vs-9000-power/",
        quote: "Halbertec 8000 vs 9000 vs 9000 Power",
        note:
          "Companion three-way comparison piece on IntoBadminton covers the 8000/9000/9000-Power positioning; this deep-dive isolates the 9000 Power for buyers who already know they want the 9000 platform.",
      },
    ],
  }),
  review({
    slug: "li-ning-halbertec-9000-standalone-review",
    updatedAt: "2026-05-21",
    title:
      "Li-Ning Halbertec 9000 standalone review: the controlled-attack frame the line is built around",
    dek:
      "Removed from comparisons, the Halbertec 9000 deserves a standalone read. Here is what the platform actually delivers, who it fits, and why it is the most defensible Li-Ning pick for serious club doubles in 2026.",
    verdict:
      "The Halbertec 9000 is the most defensible Li-Ning flagship for a serious club competitive doubles player in 2026 — the line's identity frame, with measurable control under pressure and an attack ceiling that matches the player rather than fighting them.",
    bestFor: [
      "Serious club doubles players who win points on controlled attack",
      "Yonex Astrox 88D Pro players curious about the Li-Ning attack identity",
      "Singles players who want attack with defensive resilience",
    ],
    avoidIf: [
      "Recovery-priority doubles players (consider Bladex 900 New or Auraspeed)",
      "Players who specifically want raw smash carry over control (consider AxForce 100 Gen 2)",
      "Beginners — the platform punishes incomplete swing mechanics",
    ],
    setupNotes: [
      "Source-reported 4U/G5 ranges; balance ~298-302mm depending on production batch.",
      "Club-level starting tension 24-26 lb; raise to 27-28 lb only after you have logged at least 10 hours on the frame at the lower tension.",
      "Observer voice — coach lineage and clubmate switching commentary, not founder firsthand.",
    ],
    sourceHook:
      "BadmintonCN reviewer's 'reach the peak, control and attack both possible' standalone deep-dive (同台竞戟，可控可攻—问鼎巅峰), cross-referenced with Maynooth and Dublin club observations.",
    facts: [
      { label: "Platform identity", value: "Controlled attack flagship" },
      { label: "Source-reported balance", value: "~298-302mm" },
      { label: "Buyer tier", value: "Club competitive doubles + singles transition" },
    ],
    calloutTitle: "Why the standalone read matters",
    calloutBody:
      "The Halbertec 9000 is almost always discussed in comparisons — against the 8000, against the 9000 Power, against the AxForce 100 Gen 2. The standalone read matters because the platform's identity gets diluted when it is constantly being framed as a midpoint between two other rackets. On its own, the 9000 is a controlled-attack frame designed to reward consistent timing and clean swing mechanics, and it is the racket Li-Ning wants its serious club competitive buyers to recognise as the line's true centre.",
    comparison: {
      heading: "How the 9000 fits across formats",
      columns: ["Singles attack", "Doubles attack", "Defensive transition"],
      rows: [
        {
          label: "Strength",
          values: [
            "Controlled rear-court attack with placement",
            "Drive-into-smash sequences",
            "Block-and-reset under pressure",
          ],
        },
        {
          label: "Weakness",
          values: [
            "Less raw carry than AxForce 100 Gen 2",
            "Slower recovery than Bladex 900 New",
            "Less front-court speed than Nanoflare line",
          ],
        },
        {
          label: "Recommended setup",
          values: ["3U/G5 at 25-26 lb", "4U/G5 at 25-26 lb", "4U/G5 at 24 lb"],
        },
      ],
    },
    methodology: {
      kind: "methodology",
      headline:
        "Observer notes from clubmate switching patterns and coach lineage at Maynooth / Dublin",
      context: "observer",
      conditions: {
        opponents: "Division 4 Ireland doubles partners; coach commentary from a former Malaysia national-team player",
        courtSurface: "wood and synthetic court mat",
        venue: "Maynooth University, multiple Dublin clubs",
      },
      comparators: [
        "Yonex Astrox 88D Pro (founder firsthand)",
        "Li-Ning Halbertec 8000",
        "Li-Ning AxForce 100 Gen 2",
      ],
      sourceAttribution:
        "BadmintonCN standalone review of the Halbertec 9000; observer commentary by Rui Su based on coach lineage and clubmate switching from Yonex Astrox 88D Pro.",
    },
    sections: [
      {
        heading: "What the 9000 actually is",
        body: "The Halbertec 9000 is a head-heavy, controlled-attack racket with a shaft load that rewards consistent timing rather than peak-window power. Compared to its line siblings, it occupies the centre: the 8000 below it is more forgiving and slightly less heavy through the head; the 9000 Power above it adds smash carry at the cost of recovery; the 7000 II below the 8000 is a transition frame for players still developing shaft load. The 9000 is the line's identity frame because it asks the player to bring consistent technique and rewards them with measurable control under match pressure.",
      },
      {
        heading: "Why serious club doubles players keep choosing it",
        body: "The pattern observed at Maynooth University and across Dublin clubs is consistent: a club doubles player who has spent two seasons developing their attack pattern on a Yonex Astrox 88D Pro or a similar head-heavy frame tries the 9000, and within two or three club nights settles into a noticeably more controlled drive-to-smash sequence. The 9000's strength is not that it smashes harder than the 88D Pro — it does not, by a meaningful margin — but that it makes the controlled phase of doubles attack more reliable. Drive exchanges stay cleaner, lifts get placed deeper, and the player ends third games with more of their shot quality intact.",
      },
      {
        heading: "Singles use and the transition argument",
        body: "Singles players moving from a Yonex Arcsaber 11 Pro or an Astrox 88D Pro to the Halbertec 9000 should expect a slight learning curve in the first three to five sessions, especially around timing on the back-court clear and the cross-court drop. The 9000 demands earlier preparation than the Yonex frames do, and it punishes a late swing more visibly. Once the timing locks in, the 9000 delivers a controlled rear-court attack with placement that is noticeably easier than the AxForce 100 Gen 2 and noticeably more attack-weighted than the standard Arcsaber 11 Pro. For singles players who want attack with defensive resilience, the 9000 is a defensible primary frame.",
      },
      {
        heading: "Where it loses to its line siblings",
        body: "Two scenarios where the 9000 is the wrong pick within the Halbertec line: first, if you are still establishing shaft load and your timing is inconsistent week-to-week, the 8000 is the correct pick because it forgives more swing variation. Second, if your game specifically wins on back-court smash carry and you have the swing strength to deliver flagship-grade smashes consistently, the 9000 Power is the correct pick because it integrates more head weight into the same chassis. The 9000 sits in the middle of these two intents and is the right frame only when neither intent dominates your game.",
      },
      {
        heading: "Setup recommendations and the buying decision",
        body: "For a serious club doubles player at Division 3-4 level: 4U/G5 at 25-26 lb on a quality string like BG80 or VBS-66N. Strung lower (23-24 lb) for the first ten hours while you adapt; raise gradually only if the frame still has more to give. For a singles transition: 3U/G5 at 24-25 lb to keep the swing weight manageable while you adjust timing. The Halbertec 9000 is the Li-Ning flagship most often justified by 'this is the racket my doubles partner improved with', and that social-proof pattern reflects the platform's actual strength: it rewards consistent technique with measurable control gains across formats. Buy if your game is ready to be rewarded for consistency; skip if you are still in the consistency-building phase.",
      },
    ],
    cta:
      "Run the finder with controlled-attack style, intermediate-to-advanced level, and a doubles-first or balanced-format split to compare the Halbertec 9000 against the Astrox 88D Pro (2024) and the AxForce 100 Gen 2.",
    factChecks: [
      {
        sourceName: "Li-Ning",
        title: "Li-Ning Badminton — Halbertec series",
        section: "Halbertec 9000 family page",
        checkedAt: "2026-05-21",
        href: "https://lining.com/",
        quote: "Halbertec 9000",
        note:
          "Official Li-Ning catalogue confirms the Halbertec 9000 as the central flagship of the Halbertec line, distinct from the 9000 Power variant and the 8000 below it.",
      },
      {
        sourceName: "IntoBadminton — comparison hub",
        title: "Halbertec 8000 vs 9000 vs 9000 Power comparison",
        section: "Existing line-context coverage",
        checkedAt: "2026-05-21",
        href: "https://intobadminton.com/blog/li-ning-halbertec-8000-vs-9000-vs-9000-power/",
        quote: "Halbertec 9000",
        note:
          "Companion three-way comparison piece provides the line context; this standalone review focuses on the 9000 on its own terms for buyers who already know they want a flagship-tier Li-Ning controlled-attack frame.",
      },
    ],
  }),
] satisfies BlogArticle[];
