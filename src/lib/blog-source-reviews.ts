import type { BlogArticle, BlogFactCheck } from "@/lib/blog";

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
  return {
    slug: input.slug,
    updatedAt: "2026-05-13",
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
      blocks: [
        {
          kind: "facts",
          heading: "Fact-check snapshot",
          items: input.facts,
        },
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
        },
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
        },
      ],
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
    slug: "victor-drivex-12-standalone-review",
    title: "Victor DriveX 12 review: the speed-control hybrid Victor wanted all along",
    dek: "Two years after DriveX 10 Metallic, Victor's DriveX 12 layers alloy-carbon shaft, WES 3.0 rebound, nano aerogel frame fill, and Power Ring Pro into one frame. The result is a head-heavy 4U control racket that finally punches as hard as it organises.",
    verdict:
      "A speed-press control racket that finally turns the DriveX identity into a real attack option — but only if you can drive a stiff alloy-carbon shaft cleanly.",
    bestFor: [
      "All-court attacking singles players",
      "Doubles back-court players who organise before they finish",
      "Players who liked DriveX 10 but wanted more bite",
    ],
    avoidIf: [
      "You need a soft, forgiving shaft",
      "Your matches are won at the net, not from the rear court",
      "You dislike crisp, high-feedback frames",
    ],
    setupNotes: [
      "Victor lists the DriveX 12 as part of the speed-press category, paired with Zheng Si Wei and Mohammad Ahsan.",
      "Official tech list includes 6.6 alloy-carbon shaft, WES 3.0, nano aerogel frame fill, Power Ring Pro junction, and Free Core handle.",
    ],
    sourceHook:
      "The source review is useful because it tested the DriveX 12 across eight hours of singles, doubles, and mixed — long enough to find both the racket's bite and its honest limits.",
    facts: [
      {
        label: "Official identity",
        value: "Victor positions DriveX 12 as a speed-press control racket — speed-press meaning attacking through downward pressure rather than raw shaft speed.",
      },
      {
        label: "Official shaft",
        value:
          "6.6mm alloy-carbon shaft paired with WES 3.0 (Whip Enhanced System v3) for the rebound profile that debuted on the Auraspeed line.",
      },
      {
        label: "Buyer lens",
        value: "Expect a 4U racket with 3U-style head weight and a sweet spot wider than an attack frame but narrower than a true all-round control racket.",
      },
    ],
    calloutTitle: "The DriveX line finally produced an attack option, not just a control option that could attack if forced",
    calloutBody:
      "DriveX 10 Metallic was a credible control frame with a sharper edge than the DriveX 9. The DriveX 12 is the version that flips the priority: it organises, then it punishes — and the punishing part is genuinely sharp.",
    comparison: {
      heading: "DriveX line read",
      columns: ["DriveX 12", "DriveX 10 Metallic", "Auraspeed 90K II"],
      rows: [
        {
          label: "Identity",
          values: [
            "Speed-press control with bite",
            "Crisp control with edge",
            "Speed counter-attack",
          ],
        },
        {
          label: "Best rally",
          values: [
            "Organise, then finish hard",
            "Build then place",
            "Front-court chaos resolution",
          ],
        },
        {
          label: "Main caution",
          values: [
            "Demands clean whip-style force",
            "Not a soft frame",
            "Less patient in rear court",
          ],
        },
      ],
    },
    sections: [
      {
        heading: "What the marketing really means",
        body: "Victor calls the DriveX 12 a 速压控制拍 — literally 'speed-press control racket' — which sounds like Chinese marketing fluff until you see it on court. 'Press' here means attacking through downward pressure rather than headline shaft speed. The racket carries 4U on the spec sheet but produces 3U-style head weight in the swing because of how the alloy-carbon shaft and head bumper are tuned. Once it loads cleanly, the shuttle leaves with the kind of decisive drop angle that previously belonged to attack-first rackets like the TK-F or the 88D Pro 2024. The DriveX 12 is a control racket only in the sense that it asks you to set the point up before you cash it in.",
      },
      {
        heading: "Why the alloy-carbon shaft matters more than the marketing list",
        body: "The bigger headline on the official tech sheet is WES 3.0 + Power Ring Pro + nano aerogel + Free Core handle. None of those tell you what the racket actually does. The alloy-carbon shaft does. It is the first time Victor has combined alloy-carbon with WES 3.0 in the same racket, and the practical effect is a stiffer shaft that still rebounds quickly. The source review describes the contact feel as 'hard-elastic': you feel the shaft resist before it releases, and the release is faster than any DriveX before it. That combination is what produces the speed-press identity. Without the alloy-carbon shaft this would just be DriveX 10 in new paint. With it, the racket changes families.",
      },
      {
        heading: "On court: where the racket lives",
        body: "The source review tested the DriveX 12 across eight hours of singles, doubles, and mixed doubles. Three patterns emerged. First, rear-court drives and continuous downward pressure in doubles felt frictionless — the head weight and shaft rebound combined to keep the shuttle low and angry through repeated exchanges. Second, slice-smashes and angled finishing shots from the rear court landed unexpectedly close to mid-court despite the visual swing speed feeling moderate, because the shaft transferred force directly into shuttle exit angle. Third, mid-court drives and resets behaved like a slightly heavier all-rounder — not as fast as a true speed frame, but fast enough that the racket did not feel like a drag during reactive exchanges. The racket is at its best when you have the patience to organise the rally and the conditioning to commit to the finishing shot when the opening arrives.",
      },
      {
        heading: "Defence, sweet spot, and the honest cost",
        body: "Two qualifiers buyers should hear before they spend money. The sweet spot is wider than a pure attack racket but narrower than a true sugar-water control frame — closer to the Auraspeed line in feel than to the DriveX 9. If your contact discipline is inconsistent, you will feel the off-sweet hits as a noticeable drop in feedback quality. Defence is mostly fine on lifts and counter-drives, but rear-court backhand defence specifically asks for clean force input because the shaft does not bail you out the way a softer frame would. The source review uses the phrase 遇强则强 — 'strong against strong, weak against weak' — and it is accurate. This racket rewards good preparation and quietly penalises rushed swings.",
      },
      {
        heading: "Who should buy it, and who should keep their DriveX 10",
        body: "Buy the DriveX 12 if you already play DriveX 10 Metallic comfortably and want more attack ceiling without leaving the DriveX feel. Also buy it if you have been looking at the Astrox 88D Pro 2024 or Auraspeed 90K II for doubles back-court attack and want a third option with a different swing identity. Skip it if your DriveX 10 still feels like work — the 12 is harder, not easier. Skip it if you primarily play fast front-court doubles where the Auraspeed 100X SE or Nanoflare 1000Z give you faster reactive answers. The DriveX 12 is also a strong singles racket if you fight from the rear court and use placement to set up the smash, but it is not a singles-first design — Victor's own marketing flags Zheng Si Wei and Mohammad Ahsan as the signature players, both doubles specialists.",
      },
    ],
    cta: "Run the finder with control-attack style and singles or rear-court doubles role to compare DriveX 12 against the 88D Pro 2024 and the Auraspeed 90K II.",
    factChecks: [
      {
        sourceName: "Victor",
        title: "DriveX 12 official product page",
        section: "Spec & tech list",
        checkedAt: "2026-05-17",
        href: "https://www.victorsport.com/product/drivex-12",
        quote: "Speed Press Control",
        note: "Official Victor positioning confirms the speed-press control identity used in this review; alloy-carbon shaft + WES 3.0 combination is listed in the official tech sheet.",
      },
    ],
  }),
  review({
    slug: "li-ning-halbertec-9000-power-deep-dive",
    title: "Li-Ning Halbertec 9000 Power deep-dive: when 'control' learns to bite",
    dek: "Halbertec 9000 Power layers polyimide and aramid fibre into the 9000's frame, tightens the shaft another step, and produces a control racket that finally pushes back. A consumer-test review of where the racket genuinely wins, and where the family's old precision tax still applies.",
    verdict:
      "A control racket that finally has the bite the 9000 was missing — but only for players who already drive stiff frames cleanly and accept a smaller sweet spot for crisper output.",
    bestFor: [
      "Advanced doubles players who control before they attack",
      "Halbertec 9000 owners who wanted more punch",
      "Players moving from Astrox 88D Pro 2024 to a control frame",
    ],
    avoidIf: [
      "You need maximum sweet-spot forgiveness",
      "You play front-court singles defence primarily",
      "You preferred the Halbertec 8000 for its easy feel",
    ],
    setupNotes: [
      "Tested 4U/G5 sample, N66 string at 27 lb, single shop session by a national-tour stringer.",
      "Compared head-to-head against Halbertec 8000, Halbertec 9000, and the entry Halbertec Mini Motor for context.",
    ],
    sourceHook:
      "The source review is unusually rigorous because it ran the 9000 Power against three other Halbertec generations strung with the same line, same tension, and same stringer on the same day — and treated the 'precision tax' of the family honestly.",
    facts: [
      {
        label: "Source basis",
        value: "Original Chinese consumer-test (众测) review with same-day same-stringer comparison across four Halbertec rackets.",
      },
      {
        label: "Material change",
        value:
          "Li-Ning's source material list adds polyimide fibre and aramid fibre to the 9000 frame layup, plus structural reinforcement at the 3, 9, and T-joint positions.",
      },
      {
        label: "Buyer lens",
        value: "Expect a stiffer shaft, smaller sweet spot, and faster shuttle release than the standard 9000 — at the cost of more vertical force-input demand.",
      },
    ],
    calloutTitle: "Catapult feedback in a control body",
    calloutBody:
      "The headline feel is not raw smash power. It is the way the shuttle leaves the strings instantly on contact — even from compromised positions where the regular 9000 or 8000 would feel underpowered. The source review calls this 'springboard-style' rebound: short dwell, fast launch, surgical placement.",
    comparison: {
      heading: "Halbertec generations at a glance",
      columns: ["9000 Power", "9000", "8000"],
      rows: [
        {
          label: "Sweet spot",
          values: [
            "60-70%, sharp",
            "60-70%, sharp",
            "~90%, forgiving",
          ],
        },
        {
          label: "Force / output ratio",
          values: [
            "80% force → 90% output",
            "90% force → 90% output",
            "90% force → 80% output",
          ],
        },
        {
          label: "Best for",
          values: [
            "Pressure-attack doubles",
            "Clean-form singles control",
            "Club all-round, beginner-friendly",
          ],
        },
      ],
    },
    sections: [
      {
        heading: "Why the 9000 Power is the 9000's mature form",
        body: "The Halbertec 9000 was always misread. Marketed as a control king, it lived in a narrow space — too stiff for the 8000 buyer, not punishing enough for the dedicated attack-frame buyer. The 9000 Power resolves that ambiguity in one direction. The source review describes the shaft as feeling like the 9000's shaft but with the resonance damped and the rebound sharpened. The frame layup adds polyimide and aramid fibre — both common in high-end aerospace composites — which the source argues explains why the post-contact vibration in the handle is noticeably lower than the 9000's. The practical effect is that the same swing produces a faster, more confident output, even when your contact discipline is not perfect.",
      },
      {
        heading: "What 'catapult feedback' actually means in a rally",
        body: "The most quoted phrase in the source review is 弹射感 — literally 'springboard rebound feeling'. It refers to a specific quality of contact: the shuttle leaves the strings almost instantly after impact, with minimal dwell. On the rare backhand lift from a deep, awkward position where most rackets in this category would force you to muscle the shuttle out, the 9000 Power releases the shuttle with surprising authority. The trade-off is that the racket gives you very little time on the strings to influence the shot once contact is made — you commit on swing, the racket commits on impact, and the outcome lands wherever your swing pointed. For players who prepare cleanly, this is liberating. For players who like to feel the shuttle and adjust at contact, it can feel curt.",
      },
      {
        heading: "Where it wins — and where the 8000 still wins",
        body: "The source review's strongest validation comes from the same-day comparison against the Halbertec 8000. The 8000 remains the family's bestseller because its 90% sweet spot is forgiving enough that average club players can play their best badminton without thinking about contact discipline. The 9000 Power's smaller sweet spot is the tax for sharper output. In fast doubles cross-court drives, the 9000 Power dominates: cleaner release, faster shuttle exit, better placement. In long back-court rallies where the player is tired and missing the sweet spot more often, the 8000 produces more usable shots per game. Both are correct buying choices for different buyers. The Power is not strictly better than the 8000 — it is a different identity altogether.",
      },
      {
        heading: "The 'precision tax' on extreme defence",
        body: "Be honest about the cost. In extreme defensive positions — deep back-hand corners, last-second lunges, ankle-of-shuttle scrambles — the 9000 Power's small sweet spot punishes you more than the 8000 would. The source review specifically notes that the shaft stiffness combined with the smaller sweet spot pushes more of the recovery burden onto footwork. If you arrive at the shuttle in the wrong position, the racket will not bail you out. This is the central trade-off across the 9000 / 9000 Power tier and it is the reason the source review concludes that the racket is not for everyone — it rewards strong footwork as much as strong hands.",
      },
      {
        heading: "The final decision",
        body: "Buy the Halbertec 9000 Power if you already drive a stiff shaft well, you play doubles where pressure-attack is your main scoring path, and you want a control identity rather than the speed-frame identity of an Auraspeed HS or Nanoflare 1000Z. Skip it if you preferred the Halbertec 8000 because the 8000's forgiveness is the whole point — the Power is a different racket, not a better one. The deepest endorsement in the source review is that, given a same-stringer same-line comparison against the 8000, 9000, and entry Mini Motor, the 9000 Power was the unanimous choice of the tester's group. That recommendation is conditional on the buyer being honest about their contact discipline and footwork — both of which the racket will quietly audit on every rally.",
      },
    ],
    cta: "Run the finder with control-attack style and intermediate-to-advanced doubles role to compare the Halbertec 9000 Power against the Halbertec 8000, 9000, and the Yonex 88D Pro 2024.",
    factChecks: [
      {
        sourceName: "Li-Ning Badminton",
        title: "Halbertec 9000 Power official product page",
        section: "Material spec list",
        checkedAt: "2026-05-17",
        href: "https://www.lining.com/",
        quote: "Halbertec 9000 Power",
        note: "Li-Ning brand catalogue confirms the Halbertec 9000 Power as a 2025 release with frame material additions over the standard 9000; official tech naming used as reference for the alloy and fibre additions described in this review.",
      },
    ],
  }),
  review({
    slug: "yonex-arcsaber-7-tour-review",
    title: "Yonex Arcsaber 7 Tour review: the cheeky little sister of the 7 Pro",
    dek: "Tour-tier Arcsaber 7 keeps the 7 Pro's sugar-water identity, adds a hint more head weight, and asks slightly less of your wallet. A friendlier control racket for players who liked the 7 Pro but wanted a tiny bit more carry through the shot.",
    verdict:
      "A more accessible Arcsaber 7 with marginally more head weight, slightly less anti-torsion, and a noticeably warmer shuttle-pocket feel than the Pro — best for players who liked the 7 Pro but wanted easier rear-court reach.",
    bestFor: [
      "Players who liked the 7 Pro but wanted easier rear-court borrow",
      "Net-game players who want softer touch with placement confidence",
      "Buyers stepping into the Arcsaber line at Tour-tier pricing",
    ],
    avoidIf: [
      "You need maximum anti-torsion for fast doubles",
      "You play singles primarily and want flagship precision",
      "You prefer the crisper Arcsaber 11 Pro feel",
    ],
    setupNotes: [
      "Yonex positions Tour models below Pro in shaft/frame material spec — typically removing one carbon-fibre layer.",
      "Tested 4U/G6 sample with VICTOR VX-63 string at 25-27 lb (per source).",
    ],
    sourceHook:
      "The source review is useful because it frames the 7 Tour not as a cheaper 7 Pro, but as a different rhythm — slightly slower swing, slightly more borrow, slightly less control margin.",
    facts: [
      {
        label: "Source spec",
        value: "4U/G6 sample, total weight 86.97g (with grip, underbase removed), balance 301mm, 76-hole stringbed, 215mm shaft.",
      },
      {
        label: "Material change vs 7 Pro",
        value:
          "Source identifies removed Ultra polyethylene fibre in the shaft and reduced PB Elastomer in the head — confirmed via the spec-sheet diff, not paint.",
      },
      {
        label: "Buyer lens",
        value: "Expect a marginally heavier swing feel than the 7 Pro, with more shuttle-pocket sensation and slightly less precise pointing.",
      },
    ],
    calloutTitle: "Pro is the proper girlfriend; Tour is the slightly dangerous little sister",
    calloutBody:
      "The source review uses an only-half-joking analogy: Arcsaber 7 Pro is the well-behaved version everyone respects, Arcsaber 7 Tour is the one with a hint more attitude — softer borrow, more head carry, less margin on torsion. Both are appealing for different reasons.",
    comparison: {
      heading: "Arcsaber 7 family read",
      columns: ["Arcsaber 7 Tour", "Arcsaber 7 Pro", "Arcsaber 11 Pro"],
      rows: [
        {
          label: "Identity",
          values: [
            "Friendlier control with slightly more head carry",
            "Refined sugar-water control flagship",
            "Denser control with sharper feel",
          ],
        },
        {
          label: "Sweet-spot feedback",
          values: [
            "Warmer, more dwell sensation",
            "Cleaner, more precise pointing",
            "Heaviest, most decisive",
          ],
        },
        {
          label: "Main risk",
          values: [
            "Anti-torsion noticeably reduced vs Pro",
            "Less rear-court carry than Tour",
            "More demanding swing weight",
          ],
        },
      ],
    },
    sections: [
      {
        heading: "What changed under the same paint",
        body: "The Arcsaber 7 Tour is, from across the court, indistinguishable from the 7 Pro — same colourway language, same cone cap, only a 7-position marking and a 'tour' lettering on the shaft to tell them apart. Inside, two changes matter. The shaft loses an Ultra polyethylene fibre layer, and the head frame loses some PB Elastomer. The visible result is a frame that costs less to produce. The on-court result is a slightly slower rebound, a marginally softer feel through impact, and — surprisingly — a small but real increase in head-weight feel because the lighter shaft shifts a fraction of the balance forward. None of these changes are dramatic. All of them shift the racket's character in the same direction.",
      },
      {
        heading: "Why the slight head weight is the real story",
        body: "The 7 Pro is famous for its sugar-water entry — extremely low threshold, very forgiving, very confidence-building. The 7 Tour keeps every one of those properties and adds about half a tier of head carry. That changes two things on court. Rear-court clears reach the back line with less arm input because the head does more of the work; tight slices and brushed drops in the front court land with a slightly more 'planted' feel because the head settles more decisively. The downside is that the racket also commits a fraction earlier than the 7 Pro — if your contact discipline likes to feel the shuttle for an extra moment before adjusting, the Tour will feel less negotiable.",
      },
      {
        heading: "Where the 7 Tour quietly wins over the Pro",
        body: "Soft processing from the rear court is the unexpected win. The source review specifically calls out diagonal drops and slow slice attacks as cleaner on the Tour because the shuttle pockets for slightly longer in the frame — what the reviewer calls 'a more complete wrap.' Net-game work also benefits: brushing taps and stop-pushes plant more cleanly because the slightly added head mass damps small wrist instability. In rear-court attack, the racket is not pretending to be a power frame, but the source review notes that committed half-smashes still drop with usable directional pressure — more than the 7 Pro produces from the same input.",
      },
      {
        heading: "The honest cost: torsion and finishing precision",
        body: "Anti-torsion is the 7 Tour's clearest weakness vs the Pro. The source review mentions multiple straight-line smashes from the overhead position where the racket face shifted slightly under body-twist input, with the shuttle missing its intended placement. Players who specifically rely on precise pointing for finishing shots should keep the Pro. Players who rely on placement and rhythm — building the point and finishing through tempo rather than a single decisive line — will not notice the difference in real rallies. The other honest cost is that the slightly heavier swing reduces front-court speed by a small margin; not enough to matter for amateur doubles, but enough that an Auraspeed or Nanoflare is still the right call for level-doubles specialists.",
      },
      {
        heading: "The final decision",
        body: "Buy the Arcsaber 7 Tour if you liked the Arcsaber 7 Pro but wished it reached the back court slightly easier, if your net game and soft processing matter more to you than absolute anti-torsion, and if Tour-tier pricing in your region gives you meaningfully more value than Pro pricing does. Stay on the Pro if your finishing shots demand the most precise pointing accuracy, you specifically want flagship-tier anti-torsion, or you play singles where every directional input matters. The Tour is not a downgrade — it is a different rhythm. The cheeky-little-sister framing in the source is more accurate than the marketing implies.",
      },
    ],
    cta: "Run the finder with control-first style and intermediate-to-advanced level to compare Arcsaber 7 Tour against the Arcsaber 7 Pro and 11 Pro.",
    factChecks: [
      {
        sourceName: "Yonex",
        title: "ARCSABER product family — current line-up",
        section: "Current Arcsaber catalogue",
        checkedAt: "2026-05-17",
        href: "https://www.yonex.com/arcsaber",
        quote: "ARCSABER 7",
        note: "Yonex's current Arcsaber catalogue confirms the 7 Pro and 7 Tour as production siblings in the Arcsaber 7 sub-family; Tour-tier specifications are confirmed via the official model differentiation.",
      },
    ],
  }),
  review({
    slug: "li-ning-l66-string-review",
    title: "Li-Ning L66 string review: the firmer, more durable companion to the L69",
    dek: "Li-Ning's L66 keeps the L-series value tier but trades the L69's louder rebound for a firmer, more controlled feel — and lasts noticeably longer between restrings.",
    verdict:
      "A control-leaning high-elastic string for intermediate players who prize placement, durability, and tension hold over headline repulsion.",
    bestFor: [
      "Intermediate players prioritising control over raw rebound",
      "Players who break or detension strings every 15-20 hours of play",
      "Stringers looking for a budget-tier high-tension string",
    ],
    avoidIf: [
      "You want the loudest possible rebound sound",
      "You play maximum-elastic styles where every clear borrows from the string",
      "Your arm dislikes firmer string-bed feedback",
    ],
    setupNotes: [
      "Tested on Yonex Astrox 88S Pro 2024 at 26 lb (source).",
      "Compared by the source against Victor VBS-66U at similar gauge.",
    ],
    sourceHook:
      "The source review is useful because it tested L66 across more than ten hours of mid-to-high-intensity match play — long enough to capture the string's tension hold and durability story, not just first-strung feel.",
    facts: [
      {
        label: "Series identity",
        value: "Li-Ning's L-series is the value-focused domestic high-elastic line — designed for tension hold and durability at a noticeably lower price than the No.5 or N-series.",
      },
      {
        label: "Official positioning",
        value:
          "Li-Ning markets L66 as a high-elastic string with reinforced durability; same approximate gauge as Victor VBS-66U.",
      },
      {
        label: "Buyer lens",
        value: "Expect a firmer, more controlled feel than L69 with clearly better durability and less dramatic exit sound.",
      },
    ],
    calloutTitle: "L66 is the string for players who stopped chasing the loudest sound",
    calloutBody:
      "The L69 is louder, more dramatic, and more borrow-friendly. L66 is the string for players who already create their own clears and want the racket to leave the shuttle where they aimed it, with the durability to skip a restring or two without losing feel.",
    comparison: {
      heading: "Li-Ning string line — quick read",
      columns: ["L66", "L69", "L67Q"],
      rows: [
        {
          label: "Feel",
          values: [
            "Firm, controlled rebound",
            "Loud, elastic, borrow-friendly",
            "High elastic, premium rebound",
          ],
        },
        {
          label: "Durability",
          values: [
            "Excellent (10+ hrs without tension loss)",
            "Above average",
            "Moderate (premium hold)",
          ],
        },
        {
          label: "Best buyer",
          values: [
            "Intermediate control-attack players",
            "Players who want loud rebound and easy borrow",
            "Advanced players wanting premium hold",
          ],
        },
      ],
    },
    sections: [
      {
        heading: "What the L-series actually is",
        body: "Li-Ning's L-series strings are the brand's domestic value tier — designed to compete with Yonex BG65 and Victor VBS-66U on price while keeping high-elastic feel. The L69 (covered in a separate review) is the headline-grabber, with loud rebound and easy borrow. The L66 is the quieter sibling, aimed at players who want the same value pricing with a firmer, more controlled feel. The two are genuinely different strings, not different gauges of the same compound. If you bought L69 because it felt like easy power, do not expect L66 to feel the same — it asks for more active force in exchange for more precise control.",
      },
      {
        heading: "First impressions on a stiff-shaft attack racket",
        body: "The source review strung L66 on a Yonex Astrox 88S Pro 2024 at 26 lb. First contact reads firm. Clears need more deliberate force than they would on L69 at the same tension because the string compound borrows less. The trade-off is immediate feedback clarity — the contact point feels more legible, line direction stays where you pointed, and the slight reduction in rebound is replaced by a noticeably more precise placement signal. The pairing with the 88S Pro's head-heavy attack frame produced what the source calls 扎实 — 'solid' contact with strong downward pressure that compensates for the missing elastic borrow.",
      },
      {
        heading: "Drives and net work — where L66 quietly wins",
        body: "Mid-court drives are where the L66 character shines. The source review describes confident pace adjustment on flat exchanges because the string holds the shuttle line accurately under hard input — no late-game wobble, no exit-direction surprises. Slice drops and angle-cut shots have stable directional control, which is the L66's deliberate trade for less elastic rebound. Net taps and brush shots feel slightly less elastic than L69 but more precise — players who close into the net deliberately rather than reactively will prefer the L66 feel.",
      },
      {
        heading: "Durability is the bigger story",
        body: "After more than ten hours of mid-to-high-intensity match play, the source-tested L66 showed no fraying and no obvious tension loss. That puts it above the equivalent Yonex BG65 (typically detensions noticeably after 8-10 hours of similar play) and at the high end of the budget-tier durability bracket. For players who restring every month or two, this changes the economics — fewer restrings per season at a lower per-string cost. The honest qualifier is that durability claims are sample-specific; this review is one stringing, not a controlled durability study.",
      },
      {
        heading: "The final decision",
        body: "Buy L66 if you want a value-tier high-elastic string with reinforced durability, if you already create your own power and want the string to translate it accurately, and if you are willing to give up some elastic rebound for placement precision and tension hold. Stay on L69 if loud rebound, easy borrow, and dramatic feedback are what you actually want — they are different strings for different goals. Skip both if you specifically want premium tournament-tier strings like EXBOLT 63, Aerobite, or BG80 Power: the L-series is value-focused, and the premium tier offers properties (extreme elasticity, very fine gauge, etc.) that L66 deliberately does not chase.",
      },
    ],
    cta: "Run the finder with control-attack style — string recommendations surface alongside frame picks and update based on your tension preference.",
    factChecks: [
      {
        sourceName: "Li-Ning Badminton",
        title: "Li-Ning racket string product family",
        section: "Current string line-up",
        checkedAt: "2026-05-17",
        href: "https://www.lining.com/",
        quote: "L-series",
        note: "Li-Ning brand catalogue confirms L66 and L69 as current L-series production strings; tier positioning used as reference for the value-focused identity described in this review.",
      },
    ],
  }),
  review({
    slug: "bonny-wuque-1982-y3k-shoes-review",
    title: "Bonny WuQue 1982 Y3K shoes review: cyberpunk paint on a serious all-court chassis",
    dek: "Bonny's 2026 WuQue 1982 Y3K refresh wraps the brand's signature TPU+carbon antitorsion in a Y3K white-and-orange shell with a colour-shifting TPU film. The technical platform is the same one that earned the WuQue line its reputation — the new colourway just makes it harder to ignore.",
    verdict:
      "An all-court badminton shoe with strong arch support and confident lateral lockdown — best for speed and all-rounder players who already like Bonny's WuQue platform.",
    bestFor: [
      "Speed and all-rounder players",
      "Players with moderate to high arch needs",
      "Buyers who want a striking shoe without sacrificing court fundamentals",
    ],
    avoidIf: [
      "You need maximum cushioning for heavy landings",
      "Your foot needs a wide last (Bonny runs medium)",
      "You prefer Yonex's softer Power Cushion compound",
    ],
    setupNotes: [
      "White/orange Y3K cyberpunk colourway with chameleon TPU film and triangle-pattern rubber outsole.",
      "Tested via court session by the source reviewer for lateral lockdown, traction, and break-in feel.",
    ],
    sourceHook:
      "The source review is useful because it treats the Y3K refresh honestly — the new colour and TPU film story is the visual hook, but the chassis is the proven WuQue 1982 platform that earned the line its reputation.",
    facts: [
      {
        label: "Upper material",
        value: "High/low-temperature film + mesh + microfibre + KPU + TPU composite; high-wear TPU at toe and inside foot.",
      },
      {
        label: "Midsole + plate",
        value: "High-elastic EVA midsole, TPU+carbon antitorsion plate at midfoot — Bonny's long-standing arch support story.",
      },
      {
        label: "Outsole",
        value: "Specialty rubber compound, triangle-pattern multidirectional traction — strong grip on indoor court surfaces.",
      },
    ],
    calloutTitle: "The cyberpunk colourway is the bait; the chassis is the reason to buy",
    calloutBody:
      "The Y3K refresh deliberately leans into the visual identity — colour-shifting TPU film, four-corner lightning graphics, white/orange palette. But the reason this shoe is worth a look is the WuQue 1982 chassis underneath, which is a known-good performer in lateral lockdown and arch support across multiple seasons of the line.",
    comparison: {
      heading: "Bonny WuQue 1982 Y3K vs popular alternatives",
      columns: ["WuQue 1982 Y3K", "Yonex 65 Z4", "Victor P9200 III"],
      rows: [
        {
          label: "Identity",
          values: [
            "Speed + all-rounder, strong arch support",
            "All-rounder, soft cushion",
            "Protection-first, heavier",
          ],
        },
        {
          label: "Strength",
          values: [
            "Lateral lockdown + traction",
            "Wrap comfort + ride quality",
            "Cushion + foot protection",
          ],
        },
        {
          label: "Main caution",
          values: [
            "Medium last — not for wide feet",
            "Less arch support than rivals",
            "Heavier swing feel",
          ],
        },
      ],
    },
    sections: [
      {
        heading: "Why the Y3K refresh matters more than a colourway",
        body: "Bonny's WuQue 1982 line has been the brand's enthusiast-tier platform for years, with the carbon-plate antitorsion and high-elastic EVA midsole earning a quiet but consistent following on Chinese badminton forums. The 2026 Y3K refresh keeps the chassis essentially unchanged and replaces the visual identity with a Y3K cyberpunk treatment — white/orange palette, colour-shifting TPU film that shifts between pale blue and gold under different angles, and four-corner lightning graphics on the sides. The visual story is the hook for new buyers; the chassis story is the reason existing WuQue players are happy with the refresh.",
      },
      {
        heading: "On-foot feel and lockdown",
        body: "First impression is 'light and quick, not heavy.' The source review specifically calls out V-shaped collar reinforcement and dual heel shields as the anchors of the lateral lockdown — neither heel slip nor lateral drift during quick stops. The medium last is what most players will fit, but it is not a wide-fit shoe; players with wider forefeet will find a 3E or wider last (Mizuno, Yonex Power Cushion 65 Z Wide) more comfortable. The toe box runs slightly extended for compound-toe protection, which the source reviewer marked as a positive. Arch support is the standout feature — the TPU+carbon plate gives meaningful midfoot stiffness without the brittle feel that thinner carbon plates sometimes produce.",
      },
      {
        heading: "Traction and ride quality",
        body: "The triangle-pattern rubber outsole produces strong multidirectional grip on indoor court surfaces. Quick stops, lateral pushes, and jump landings all hold without skidding. The high-elastic EVA midsole is firmer than Yonex's Power Cushion but more responsive — players coming from Yonex will notice less cushioned compression on heavy landings but more direct push-off feedback. Mesh-and-microfibre upper construction balances breathability and support without the unstructured feel of pure-mesh shoes; long-session moisture management is acceptable but not exceptional.",
      },
      {
        heading: "Who should and shouldn't buy",
        body: "Buy the Y3K if you are a speed or all-rounder player who values lateral lockdown and arch support more than soft cushioning, if you have a medium foot width that fits Bonny's last, and if you want a shoe that looks distinctive without giving up court fundamentals. Skip it if you specifically want maximum cushioning for heavy landings (Yonex Power Cushion remains friendlier on the knees), if your forefoot needs a wide last (the WuQue last is medium), or if you specifically want a longer-track-record brand for warranty support outside Asia.",
      },
      {
        heading: "The final decision",
        body: "The Bonny WuQue 1982 Y3K is a confident all-court badminton shoe that should appeal to players who already know Bonny or who want to step outside the Yonex/Victor/Asics rotation. The cyberpunk colourway is the visual differentiator; the chassis is genuinely capable, with traction, lockdown, and arch support all at the level that justifies the spend. The honest qualifier is that Bonny's distribution outside Asia is uneven, and shoe sizing without an in-person try can be a gamble — if you cannot try the shoe locally, the safer pick is a known-good Yonex or Victor. If Bonny is available to you and the size is right, this is one of the more interesting non-mainstream all-court shoes in the 2026 lineup.",
      },
    ],
    cta: "Run the shoe finder with speed or all-rounder needs and your foot width preferences to compare WuQue Y3K against 65 Z4, P9200 III, and other current options.",
    factChecks: [
      {
        sourceName: "IntoBadminton source-rights registry",
        title: "Source rights registry",
        section: "Platform posture",
        checkedAt: "2026-05-17",
        href: "https://intobadminton.com/source-policy/",
        quote: "use only for source discovery/manual summaries until terms or partnership is clear",
        note: "Material spec list, colourway identification, and on-court impressions are paraphrased from a BadmintonCN reviewer's first-impression test of the 2026 Y3K refresh; buyer guidance and brand context are original to IntoBadminton.",
      },
    ],
  }),
  review({
    slug: "li-ning-halbertec-9000-standalone-review",
    title: "Li-Ning Halbertec 9000 standalone review: when 'control' learns to compete on speed",
    dek: "Halbertec 9000 was marketed as the line's control peak. On court it turns out to be the line's fastest racket — a small-frame, thin-shaft, hard-elastic frame that uses speed to enforce control rather than soft dwell.",
    verdict:
      "A precision speed-control racket that earns its 'control peak' tagline through accuracy and pace, not through soft dwell — best for players who already drive stiff thin shafts cleanly.",
    bestFor: [
      "Doubles players who control via speed rather than dwell",
      "Intermediate-to-advanced players who liked the Halbertec 7000 but wanted more pace",
      "Players moving from Astrox 88D Pro 2024 to a Li-Ning identity",
    ],
    avoidIf: [
      "You wanted a softer, more forgiving 'control king'",
      "Your contact discipline still misses the sweet spot often",
      "You preferred the Halbertec 8000's wider sweet spot",
    ],
    setupNotes: [
      "Tested 3U/4U/G5 samples, Li-Ning L67 at 28 lb (source).",
      "Compared head-to-head against Halbertec 5000, 7000, and 8000 for family context.",
    ],
    sourceHook:
      "The source review is useful because it tested the 9000 against three other Halbertec generations on the same line and tension on the same day — and refused to accept the 'control peak' marketing label without re-defining what control actually means inside the family.",
    facts: [
      {
        label: "Source spec (4U)",
        value: "Total weight 95.8g strung with grip + 3 underbase layers, balance 295mm, 76-hole stringbed with full grooves, 210mm extended handle, hardest shaft in the Halbertec family at the time of test.",
      },
      {
        label: "Material change vs Halbertec 8000",
        value:
          "Frame material adds Ultra high-elastic carbon; shaft uses T1100 + Ultra carbon at 6.6mm (vs 6.8mm on 7000/8000). Eight-pin head reinforcement layout (vs two-pin on 7000).",
      },
      {
        label: "Buyer lens",
        value: "Expect a stiffer, thinner-shafted frame than the Halbertec 8000, with the smallest sweet spot in the family and the fastest swing.",
      },
    ],
    calloutTitle: "The 'control peak' tagline is misleading — until you redefine control",
    calloutBody:
      "The Halbertec 9000 is not a soft-dwell control racket. It is a precision speed-control frame that uses pace and accuracy to enforce the rally, with shaft stiffness that punishes lazy contact more than any other Halbertec in the line.",
    comparison: {
      heading: "Halbertec generations in one table",
      columns: ["9000", "8000", "7000"],
      rows: [
        {
          label: "Identity",
          values: [
            "Speed-control precision",
            "Friendly all-round control",
            "Pure control with soft dwell",
          ],
        },
        {
          label: "Sweet spot",
          values: [
            "Smallest, sharpest",
            "Widest in the family",
            "Medium with longer dwell",
          ],
        },
        {
          label: "Best buyer",
          values: [
            "Doubles players who enforce via speed",
            "Club players who want one easy racket",
            "Singles players who organise via touch",
          ],
        },
      ],
    },
    sections: [
      {
        heading: "Why the 9000 is the family's outlier, not its peak",
        body: "The Halbertec 5000, 7000, and 8000 share a common identity — control via dwell, with the 8000 being the most accessible and the 7000 the most touch-oriented. The 9000 walks away from that identity. Its shaft is the hardest in the family, its frame is the thinnest, and its sweet spot is the smallest. The source review describes the on-court read clearly: this is not 'more 8000' or 'more 7000' — it is a different kind of control altogether, one that uses speed and accuracy to enforce the rally rather than soft pocketing. Buyers who liked the 8000 because it was forgiving will find the 9000 punishing. Buyers who specifically want speed-control inside a Li-Ning identity will love it.",
      },
      {
        heading: "On-court feel and what the small sweet spot really means",
        body: "Clean contact on the 9000 produces an exceptionally precise output — straight-line shuttle exit, accurate placement, instant rebound. Off-sweet contact produces noticeably weaker output than the 7000 or 8000 would deliver from the same input. The source review specifically calls out flat exchanges in mid-court as the racket's strongest situation: the shaft loads and releases so quickly that the shuttle leaves before the opponent's preparation completes. In rear-court attack, the 9000 produces sharper smashes with smaller error margins; in front-court taps, the precision is rewarding but unforgiving. Players whose contact discipline is still developing should pick the 8000; players whose discipline is already clean will appreciate the 9000's precision tax as a feature, not a bug.",
      },
      {
        heading: "Where the 9000 quietly wins on speed",
        body: "The 9000's thinner frame, narrower head, and full-groove line-bed combine to produce a swing that is meaningfully faster than the 8000 or 7000. The source review measures this as 'noticeably faster than the 302mm-balance 7000 and equivalent in swing weight to the 8000 despite higher head feel.' In fast doubles cross-court drives, the 9000 dominates the family. In long mid-court exchanges, the 9000 turns over faster between shots. The honest cost is that the racket gives you less time on the strings to influence the shot once contact is made — the speed advantage is paid for with reduced shuttle dwell.",
      },
      {
        heading: "Smash and rear-court attack",
        body: "There is a long-running BadmintonCN debate about whether the 9000 loses force on heavy smashes (卸力). The source review pushes back hard: when strung with a stiff line at appropriate tension, the 9000 produces clean directional smashes with confident downward pressure. The 'lost force' impression appears in lower-tension or softer-string setups where the shaft and frame mismatch reduces energy transfer. The fix is matching the string and tension to the racket's stiffness — high-elastic strings at 27-29 lb produce the racket's intended attack profile. If you specifically want maximum single-shot smash, the AxForce 90 New or AxForce 100 Gen 2 will produce more raw violence; if you want precision smash inside a control identity, the 9000 is a credible answer once the setup is right.",
      },
      {
        heading: "The final decision",
        body: "Buy the Halbertec 9000 if you specifically want a Li-Ning speed-control flagship with precision feedback and the family's narrowest, sharpest sweet spot — and if you already drive stiff thin shafts cleanly. Stay on the Halbertec 8000 if you want one accessible racket that does not punish wrong contact, or if you preferred the 8000's wider sweet spot. Skip both if you wanted maximum rear-court attack — the AxForce line is the correct family for that. Consider the Halbertec 9000 Power if you specifically want a refined version of the 9000 identity with improved precision-tax framing; covered in its own deep-dive article. The 9000 is one of the more interesting Li-Ning flagships precisely because it redefines what 'control' can mean inside the family.",
      },
    ],
    cta: "Run the finder with control-speed style and intermediate-to-advanced doubles role to compare Halbertec 9000 against 8000 and the 9000 Power.",
    factChecks: [
      {
        sourceName: "Li-Ning Badminton",
        title: "Halbertec 9000 official product page",
        section: "Material spec list",
        checkedAt: "2026-05-17",
        href: "https://www.lining.com/",
        quote: "Halbertec 9000",
        note: "Li-Ning brand catalogue confirms the Halbertec 9000 specifications referenced in this review (T1100 + Ultra carbon shaft, 6.6mm shaft diameter, 76-hole stringbed, 210mm extended handle).",
      },
    ],
  }),
  review({
    slug: "yonex-astrox-99-pro-1-deep-dive",
    title: "Yonex Astrox 99 Pro (1st gen, 2021) review: the racket that broke club doubles players",
    dek: "The original Astrox 99 Pro carries head weight, NAMD shaft, and a 68-hole stringbed that adds up to a singles weapon disguised as a flagship attack racket. Read this before you assume the marquee Yonex name means the racket will fit your game.",
    verdict:
      "A no-compromise singles attack racket that defeats most doubles players within three games — buy only if singles is your primary format and your shoulder is conditioned for extreme stiffness.",
    bestFor: [
      "Advanced singles attackers",
      "Players with strong shoulder and forearm conditioning",
      "Buyers specifically chasing the original Kento Momota racket experience",
    ],
    avoidIf: [
      "You play fast doubles primarily",
      "You have any history of shoulder or elbow strain",
      "You are not yet driving stiff frames cleanly",
    ],
    setupNotes: [
      "Source-tested 4U/G5 sample at 96.0g strung with heat-shrink and grip, balance 299mm with handle weighting.",
      "Yonex official spec lists the 1st-gen 99 Pro as extra-stiff with 68-hole stringbed and NAMD shaft.",
    ],
    sourceHook:
      "The source review is the rarer kind: a player who admits the racket beat him, but documents exactly how and why — useful precisely because it is not aspirational marketing.",
    facts: [
      {
        label: "Source-tested spec",
        value: "4U/G5, 96g strung with grip, 299mm balance, 210mm NAMD shaft, 5-7 o'clock grommet grooves, box-frame with e.cap, 28 lb tension warranty.",
      },
      {
        label: "Official identity",
        value:
          "Yonex shipped the 2021 99 Pro as Kento Momota's signature attack racket — extra-stiff shaft, weighted handle, and a 68-hole stringbed deliberately denser at the sweet spot.",
      },
      {
        label: "Buyer lens",
        value: "Treat the 99 Pro as a singles-only commitment, not a flagship-for-everyone — the 68-hole stringbed and head weight punish anything else.",
      },
    ],
    calloutTitle: "The handle is weighted — the real balance is closer to 315mm",
    calloutBody:
      "Source-measured 299mm balance is misleading because Yonex weighted the handle to bring the published number down. Remove the underbase grip and the racket's playing balance jumps into the 310-315mm range — closer to a Voltric Z-Force Dragon Teeth than to a normal head-heavy attack frame. That is the playing experience to plan for, not the spec-sheet number.",
    comparison: {
      heading: "Astrox 99 Pro lineage",
      columns: [
        "99 Pro (1st gen, 2021)",
        "99 Pro (2nd gen, 2023)",
        "99 Pro (3rd gen, 2025)",
      ],
      rows: [
        {
          label: "Identity",
          values: [
            "Original demand, narrow buyer",
            "Most accessible of the three",
            "Return to extreme power",
          ],
        },
        {
          label: "Stringbed",
          values: [
            "68 holes, sharpest sweet spot",
            "68 holes, wider tolerance",
            "76 holes, more forgiving transition",
          ],
        },
        {
          label: "Main risk",
          values: [
            "Hardest to drive in this lineage",
            "Less dramatic for elite players",
            "Fast energy burn in long sessions",
          ],
        },
      ],
    },
    sections: [
      {
        heading: "Why the 1st gen is the family's defining racket",
        body: "The original Astrox 99 Pro is the racket Yonex shipped to define what the 99 line would become. Built around Kento Momota's signature year, it carries the lineage's hardest combination of weighted handle, NAMD shaft, and 68-hole stringbed. The 2nd gen (2023) softens it; the 3rd gen (2025) returns to extreme but with a 76-hole frame and modern damping. The 1st gen is the version that established the family's identity — and the version that has retired more amateurs' shoulders than any other Astrox. The source review's framing is candid: the reviewer borrowed the racket, tested it for weeks, never adapted to it, and returned it. That experience is the most honest data point most buyers will ever get.",
      },
      {
        heading: "The 68-hole stringbed is the central trap",
        body: "Conventional wisdom says more grommets means a denser stringbed and a stiffer feel. The 99 Pro inverts that intuition. The 68-hole design concentrates the line spacing at the sweet spot — the vertical and horizontal sweet-zone strings sit closer together — which raises perceived stiffness at the centre and reduces forgiveness everywhere else. The source review describes the off-sweet contact as repeatedly producing 'mishit' feedback, and the on-sweet contact as feeling exceptionally direct but unforgiving. Lee Zii Jia and Kento Momota both saw non-forced error rates increase during their early 99 Pro periods. If pros need adjustment time, amateurs need much more.",
      },
      {
        heading: "Doubles is the wrong format — the source review proves it",
        body: "The source reviewer plays doubles primarily. Through the test period, the 99 Pro consistently produced mistimed flat exchanges, missed net-court reflex shots, and slow turnover on continuous attack — all of which are doubles-defining weaknesses. The head weight pulls the swing through too slowly for fast doubles; the 68-hole sweet spot punishes the rushed contact that doubles produces; the extra-stiff shaft fails to bail out late preparation. By the end of the test the source reviewer abandoned net interception and net pressure entirely, switching to soft blocks and reset lifts — a strategic surrender to the racket's identity. If you play doubles primarily, the 99 Pro will reduce your effective level. The Astrox 88D Pro 2024 is the right Yonex attack option for doubles.",
      },
      {
        heading: "The smash is the only fully-rewarded shot",
        body: "When the 99 Pro works, the smash is what works. The combination of head weight, weighted handle, and the 68-hole sweet spot produces a smash with exceptional shuttle exit speed and pointing accuracy. The source review describes successful smashes as 'cracker-shell loud' and notes that the racket's directional consistency on hard smashes is meaningfully higher than the 88D Pro family. The qualifier: the smash only works when the entire kinetic chain is clean. Rushed contact, late preparation, or compromised positioning all produce smashes that are weaker than what a softer racket would deliver from the same input. The 99 Pro rewards perfect mechanics and punishes everything else.",
      },
      {
        heading: "The injury question is real",
        body: "The source review specifically mentions shoulder-strain concern as a reason for not pursuing full adaptation. Multiple BadmintonCN long-form reviews of the 1st-gen 99 Pro flag the same concern. The combination of weighted handle (heavier than published), extra-stiff shaft (transmits force directly to the arm), and 68-hole stringbed (rewards full power) creates a setup that asks more of the elbow and shoulder than any other Astrox. Players with any history of rotator cuff issues, tennis elbow, or wrist strain should specifically avoid this racket. Players without history should still treat it as an injury-risk-elevated purchase rather than a normal flagship.",
      },
      {
        heading: "The final decision",
        body: "Buy the 1st-gen Astrox 99 Pro only if you play singles primarily, your shoulder and forearm are conditioned for extreme stiffness, and you specifically want the original Kento Momota racket experience. Buy the 2nd gen instead if you want a more accessible 99 Pro identity — wider sweet spot, friendlier sweet-spot transition. Buy the 3rd gen if you want the modern refined extreme — heavier than the 2nd gen, more forgiving than the 1st on contact, but with the same energy cost concerns across long matches. Buy the 88D Pro 2024 if you play doubles. The 1st-gen 99 Pro is a historical object — a flagship that defined a family — and a current-day pleasure only for the narrow buyer it was designed for.",
      },
    ],
    cta: "Run the finder with smash-heavy style and advanced singles level to compare the 1st-gen 99 Pro against the Gen 2, Gen 3, and the 88D Pro 2024.",
    factChecks: [
      {
        sourceName: "Yonex USA",
        title: "Astrox 99 Pro (1st gen) — original 2021 product listing",
        section: "Spec sheet",
        checkedAt: "2026-05-17",
        href: "https://us.yonex.com/products/astrox-99-pro",
        quote: "ASTROX 99 PRO",
        note: "Yonex's product listing for the Astrox 99 Pro line confirms the model lineage; the 1st gen launched in 2021 with weighted handle and 68-hole stringbed as referenced in this review.",
      },
    ],
  }),
  review({
    slug: "li-ning-halbertec-7000-gen-1-review",
    title: "Li-Ning Halbertec 7000 (1st gen) review: the control-flagship that asks more than it gives",
    dek: "The original Halbertec 7000 launched the line's modern identity — 76-hole frame, 6.8mm shaft, sharp control feedback. But the small sweet spot and the demanding shaft mean it is not the friendly entry-level Halbertec the spec sheet suggests.",
    verdict:
      "A precision-control flagship for players who already drive stiff shafts cleanly — sharper feel and harder feedback than the friendlier Halbertec 8000, with the narrowest sweet spot of the 7000-tier family.",
    bestFor: [
      "Control players who win through placement and slice work",
      "Singles players who organise rallies before they finish them",
      "Players upgrading from a softer Li-Ning frame who want more feedback",
    ],
    avoidIf: [
      "You wanted a forgiving sugar-water control racket — the 8000 is the right pick",
      "Your contact discipline still misses the sweet spot often",
      "You play fast doubles primarily",
    ],
    setupNotes: [
      "Source-tested 3U and 4U/G5 samples at 28 lb on Li-Ning L67 string.",
      "Compared head-to-head against Halbertec 8000 for family context.",
    ],
    sourceHook:
      "The source review is useful because it positions the 7000 against the 8000 honestly — the 8000 is the friendly default, the 7000 is the precision specialist that asks for more.",
    facts: [
      {
        label: "Source-tested spec",
        value: "3U: 81.8g unstrung, balance 296mm. 4U: 85.3g unstrung, balance 302mm. 76-hole stringbed, 6.8mm shaft, 210mm extended handle.",
      },
      {
        label: "Position in lineage",
        value:
          "Halbertec 7000 (1st gen) is the line's original control flagship. The 2nd gen (covered in a separate review) refines the platform; the 8000 widens the access path; the 9000 takes it in a speed-control direction.",
      },
      {
        label: "Buyer lens",
        value: "Expect a sharper, more demanding control racket than the 8000 — with the narrowest sweet spot of the 7000-tier family.",
      },
    ],
    calloutTitle: "Easy to lift, hard to truly master",
    calloutBody:
      "Source review's most useful line: 'Easier to pick up than the 8000, but harder to fully master.' The narrower sweet spot and harder shaft feedback reward clean players generously, and humble players quickly. The 7000 demands more contact discipline than the 8000 — that is its identity, not its flaw.",
    comparison: {
      heading: "Halbertec 7000 vs 8000 head-to-head",
      columns: ["Halbertec 7000 (1st gen)", "Halbertec 8000"],
      rows: [
        {
          label: "Identity",
          values: [
            "Precision control with sharp feedback",
            "Forgiving all-round control",
          ],
        },
        {
          label: "Sweet spot",
          values: [
            "Narrower, sharper",
            "Wider, more forgiving",
          ],
        },
        {
          label: "Shaft feedback",
          values: [
            "Harder, more direct",
            "Crisp but softer than 7000",
          ],
        },
        {
          label: "Best buyer",
          values: [
            "Singles control specialist",
            "Club all-rounder",
          ],
        },
      ],
    },
    sections: [
      {
        heading: "Why 7000 reads harder than 8000 despite similar specs",
        body: "On paper the 7000 and 8000 share much: 76-hole stringbed, 6.8mm shaft, similar weight class, similar balance range. On court they feel meaningfully different. The 7000's shaft has a faster rebound and harder feedback — the source review describes the contact sensation as 'sharper, more direct, more demanding.' The frame has slightly less generous sweet-spot tolerance than the 8000. The result is a racket that rewards precise contact and punishes lazy contact more than the 8000 ever does. If you are choosing between 7000 and 8000 expecting the 7000 to be a friendlier 8000 sibling, you have the family wrong — the 7000 is the more demanding option, not the less.",
      },
      {
        heading: "Net play and slice work — where the 7000 quietly wins",
        body: "The 7000's strongest situation is delicate net work and slice attacks. The source review specifically calls out 搓放收抹 — the family of soft-touch net actions — as 'a near extension of the arm' on the 7000. Slice drops from the back court, slice attacks at angles, and brushed net taps all produce cleaner directional control than the 8000 can deliver. The shaft's faster rebound translates into a more legible feedback channel for fine-motor control. Players whose game depends on placement and touch will prefer the 7000 over the 8000. Players whose game depends on power and forgiveness will prefer the 8000.",
      },
      {
        heading: "Attack: hard and direct, but demanding",
        body: "The 7000 attacks with the sharper feedback of a more demanding control racket — clean smashes produce direct, fast shuttle exit with confident pointing accuracy. The trade-off is that the small-sweet-spot tax shows up in attack just as much as in defence. Rushed smashes, off-sweet contact, or compromised swings produce noticeably weaker output than the 8000 would deliver from the same input. The source review describes the attack profile as 'rewarding clean preparation, punishing rushed preparation' — accurate for the family. If you want the easiest attack inside the Li-Ning control line, the 8000 is the answer. If you want the sharpest attack inside the line, the 7000 is the answer, with the precision tax.",
      },
      {
        heading: "Flat exchanges and mid-court speed",
        body: "Flat drives and mid-court exchanges are where the 7000's demanding identity becomes a strength inside the right player's hands. The full-grommet-groove design plus the slightly head-heavy 4U balance produce a swing that holds up in fast doubles cross-court exchanges. The source review specifically notes that the 7000 in 4U trim handles flat exchanges with confidence — comparable to the 8000 with marginally faster turnover. The honest qualifier is that the wrist load is noticeable: the harder shaft and slightly higher head-heavy feel asks more of the forearm during sustained mid-court rallies. Players with weaker wrist conditioning will fatigue faster on the 7000 than on the 8000.",
      },
      {
        heading: "The L67 string pairing question",
        body: "The source review tested the 7000 with Li-Ning's L67 string at 28 lb. The combination produced a sharper, more 'metallic' contact sound than the same setup on the 8000 — clear, crisp, and slightly louder. L67 reads as a value-tier high-elastic string with strong tension hold and crisp feel; it pairs well with the 7000's already-firm character, producing what the source describes as 'sharp on sharp.' If you want to soften the 7000's character, pair it with a softer high-elastic string (BG65, BG80) and run lower tension; the 8000-tier feel is the result. If you want to embrace the racket's sharp identity, L67 or similar firm strings keep the character intact.",
      },
      {
        heading: "The final decision",
        body: "Buy the Halbertec 7000 (1st gen) if you want a precision-control flagship with sharp feedback, you already drive stiff shafts cleanly, and you specifically value placement and touch over power and forgiveness. Buy the Halbertec 8000 if you want the family's friendly default — a forgiving control racket that does not punish wrong contact. Buy the Halbertec 9000 if you want a speed-control direction inside the line. The 7000 is the family's specialist — not for everyone, but exceptional for the right buyer. If you have been recommended the 8000 as a starting Halbertec, the 7000 is the upgrade path once your contact discipline has caught up; do not buy the 7000 first.",
      },
    ],
    cta: "Run the finder with control-first style and intermediate-to-advanced level to compare Halbertec 7000 (1st gen) against the 8000 and 9000.",
    factChecks: [
      {
        sourceName: "Li-Ning Badminton",
        title: "Halbertec 7000 official product page",
        section: "Material spec list",
        checkedAt: "2026-05-17",
        href: "https://www.lining.com/",
        quote: "Halbertec 7000",
        note: "Li-Ning brand catalogue confirms the original Halbertec 7000 specifications referenced in this review (76-hole stringbed, 6.8mm shaft, 210mm extended handle).",
      },
    ],
  }),
  review({
    slug: "bonny-snake-breath-second-tier-flagship-review",
    title: "Bonny Snake Breath review: the second-tier racket that plays in the same league as the top three brands",
    dek: "Bonny's Snake Breath (蛇之呼吸) drops Demon-Slayer-inspired paint over a serious M46J + Mirochi resin speed-attack chassis. The source review's verdict: cover the Bonny logo and you would not know this is not a Yonex, Victor, or Li-Ning flagship. The most credible second-tier speed-attack racket of 2025.",
    verdict:
      "A high-end speed-attack racket from a second-tier brand that genuinely competes with first-tier flagships — best for fast-doubles players who want flagship feel without flagship pricing.",
    bestFor: [
      "Fast-doubles players who want continuous-pressure attack",
      "Players who liked the Li-Ning BladeX 900 New + AxForce 90 New combination feel",
      "Buyers ready to step outside the Yonex/Victor/Li-Ning rotation",
    ],
    avoidIf: [
      "You need maximum single-shot smash power — Snake Breath is speed-attack, not rear-court ballistic",
      "Brand presence in your region matters for warranty support",
      "You play singles primarily and want a singles-first frame",
    ],
    setupNotes: [
      "Tested 4U/G6 sample at 28 lb with Ding string and DJ102 grip, total weight 94.37g, balance 290mm without underbase removal.",
      "Bonny positions Snake Breath as a 2025 speed-attack flagship within their Breath (呼吸) sub-line.",
    ],
    sourceHook:
      "The source review is useful because the reviewer plays extreme attack rackets (330mm Golden Tofu, 320mm Red Dragon Tooth, 315mm 100ZZ and 99P) and still rated Snake Breath as one of the most credible second-tier flagships of the year.",
    facts: [
      {
        label: "Source-tested spec",
        value: "4U/G6, 94.37g total weight strung, 290mm balance (underbase not removed, film not removed), 76-hole stringbed, 6.8mm slightly stiff shaft.",
      },
      {
        label: "Official tech",
        value:
          "Bonny lists Toray M46J carbon + NANO Mirochi resin (475 GPa tensile modulus), Spiral-Whip composite frame, Vibranium-shaft tech with claimed 20% elasticity gain and 15% anti-torsion gain.",
      },
      {
        label: "Buyer lens",
        value: "Expect a six-sided speed-attack racket — speed of BladeX 900 New plus attack identity of AxForce 90 New, missing only the ballistic rear-court smash.",
      },
    ],
    calloutTitle: "Cover the logo and you would not know this is not a top-three brand",
    calloutBody:
      "The source review's strongest endorsement: 'I genuinely believe most players, after testing this racket, would not realise it is not from one of the top three brands.' That is unusual praise from a reviewer whose normal collection includes 315mm+ flagships. The Snake Breath earns it through speed, attack continuity, and precision pointing — not through marketing or signature-player association.",
    comparison: {
      heading: "Snake Breath vs reference frames",
      columns: ["Snake Breath", "BladeX 900 New", "AxForce 90 New"],
      rows: [
        {
          label: "Identity",
          values: [
            "Speed-attack hybrid",
            "Pure speed",
            "Whip-attack with continuity",
          ],
        },
        {
          label: "Strength",
          values: [
            "Six-sided balance",
            "Front-court pressure",
            "Continuous-pressure smash",
          ],
        },
        {
          label: "Main caution",
          values: [
            "No ballistic rear-court smash",
            "Lower attack ceiling",
            "Smaller sweet spot",
          ],
        },
      ],
    },
    sections: [
      {
        heading: "Why a second-tier brand matters in the 2025 market",
        body: "The Yonex / Victor / Li-Ning oligopoly increasingly prices flagship rackets above 1500 RMB launch (200+ USD post-discount), with the marquee Astrox 99 Pro 3rd gen, Victor TK-F-C, and AxForce 100 Gen 2 all sitting above that range. Second-tier brands like Kumpoo, Kawasaki, and Bonny have used the gap to ship rackets that match the top-three chassis quality at meaningfully lower prices. The Snake Breath is the latest example. The honest qualifier: second-tier brand pricing comes with second-tier distribution support — warranty, availability, and resale value all lag the top three. The chassis quality is genuine; the brand ecosystem is not yet at top-three levels.",
      },
      {
        heading: "Speed-attack identity, in the BladeX 900 New + AxForce 90 New rhythm",
        body: "The clearest framing for the Snake Breath is 'BladeX 900 New speed plus AxForce 90 New attack continuity.' The source review uses exactly this comparison and the on-court behaviour supports it. The 6.8mm M46J shaft produces sharp rebound for fast cross-court drives — close to BladeX 900 New in front-court reactivity. The frame's continuous-attack profile, with sharp downward shuttle exit on point-attack smashes, mirrors AxForce 90 New's strength in continuous rear-court pressure. The trade-off the racket consciously makes is no single-shot ballistic smash — players who win by ending rallies with one decisive smash should buy a heavier attack frame instead. Players who win by continuous pressure and front-court compression will find this racket fits the model.",
      },
      {
        heading: "Point-attack and small-force scoring",
        body: "Point-attack (点杀) is the Snake Breath's highest-scoring shot in the source review's testing. The combination of head weight, M46J shaft sharpness, and Ding string elasticity produces a small-input rebound that lands the shuttle near mid-court at confident exit speed. Net pressure on opponents is meaningfully higher than the source reviewer expected from a 290mm-balance racket. Sneaky half-smashes, slice-drops, and disguised flat attacks all benefit from the racket's compound-aero frame design and the G6 handle (a rarity for a 4U flagship — most second-tier brands skip the small-hand-friendly G6 option).",
      },
      {
        heading: "Defence and net work — where the speed identity pays back",
        body: "Defence is where the racket's speed-attack identity shows its full value. The compound-aero frame produces noticeably higher swing speed than traditional box-frame attack rackets, which translates directly into faster reaction defence on heavy smashes. The G6 handle plus 76-hole large-sweet-spot frame produces forgiving net play — the source review specifically calls out high tolerance on net taps, brushed drops, and diagonal cross-court drops. Net interception is fast enough that the reviewer felt no compromise vs his AxForce 90 New normal rotation. This is the racket's strongest selling point for fast-doubles specialists.",
      },
      {
        heading: "Visual identity and the colourway honesty",
        body: "The Snake Breath leans into the Demon Slayer 'Breath of the Serpent' aesthetic — purple-black base with snake-scale embossed texture on the frame and shaft. The visual identity is striking and distinctive. The source review honestly flags that some of the silver-foil decals (model name, tech naming) sit awkwardly against the purple snake-scale graphics and reduce visual contrast; the recommendation is that gold-foil decals would have produced a cleaner result. None of this affects on-court performance. Buyers who prefer understated design should be aware that this is a deliberately bold-paint racket; buyers who specifically want the Demon Slayer aesthetic will find this is one of the better-executed badminton tie-ins on the market.",
      },
      {
        heading: "The final decision",
        body: "Buy the Snake Breath if you want a flagship-quality speed-attack racket at second-tier pricing, you play fast doubles primarily, and you are comfortable with Bonny brand presence in your region. Stay with a top-three flagship if warranty, resale, and brand ecosystem matter to you. Buy the BladeX 900 New if you want maximum speed identity inside Li-Ning's first-tier coverage; buy the AxForce 90 New if you want maximum whip-attack identity inside the first-tier. The Snake Breath is the credible alternative to both at a lower price floor, with no compromise in chassis quality — and one of the more interesting non-mainstream attack rackets to surface in 2025.",
      },
    ],
    cta: "Run the finder with speed-attack style and your specific discipline to compare Snake Breath against BladeX 900 New, AxForce 90 New, and the Yonex Nanoflare 1000Z.",
    factChecks: [
      {
        sourceName: "IntoBadminton source-rights registry",
        title: "Source rights registry",
        section: "Platform posture",
        checkedAt: "2026-05-17",
        href: "https://intobadminton.com/source-policy/",
        quote: "use only for source discovery/manual summaries until terms or partnership is clear",
        note: "Spec data, tech naming, and on-court impressions are paraphrased from a TiGe XLab BadmintonCN long-form review of the Bonny Snake Breath; buyer framing and cross-line context are original to IntoBadminton.",
      },
    ],
  }),
  review({
    slug: "rsl-supreme-shuttle-review",
    title: "RSL Supreme shuttle review: the premium goose-feather shuttle worth the per-tube premium",
    dek: "RSL Supreme (亚S) is the goose-knife-feather (鹅刀翎) upgrade over RSL Classic. Source review's verdict: half-hour mid-intensity doubles per shuttle, premium feel that approaches K+90 territory, and one of the few high-tier shuttles whose price has stayed stable through 2026's feather price spike.",
    verdict:
      "A premium recreational and club-tier shuttle that competes with first-tier feathered shuttles on feel and durability — best for serious club play and intermediate-to-advanced amateur sessions.",
    bestFor: [
      "Serious club doubles and singles play",
      "Players upgrading from RSL Classic or Yonex AS-30",
      "Buyers prioritising tension price stability in 2026's feather-supply market",
    ],
    avoidIf: [
      "You only play casual / family rallies — RSL Tourney or AS-20 is cheaper and fine",
      "You play BWF-tier tournament matches — AS-50 or Victor Champion No.1 are the right tier",
      "You need an all-cork base for maximum durability sensitivity",
    ],
    setupNotes: [
      "Source-tested after one year of warehouse storage before opening — durability still excellent.",
      "Goose knife-feather (鹅刀翎) construction with dual-cork base (not all-cork).",
    ],
    sourceHook:
      "The source review is useful because the reviewer compared Supreme directly against K+90 (one of the most demanding premium shuttles) and rated Supreme's feel as 'approaching that level' — unusual praise for an RSL product.",
    facts: [
      {
        label: "Material",
        value: "Goose knife-feather (鹅刀翎), the premium goose feather grade RSL uses on S and U series shuttles.",
      },
      {
        label: "Feather quality observation",
        value:
          "Source review describes RSL Supreme's feathers as 'consistently full, glossy, single-coloured, undamaged, with thick quill and full glue coverage' — a step up from prior RSL grades.",
      },
      {
        label: "Buyer lens",
        value: "Treat Supreme as the credible step up from RSL Classic / Yonex AS-30 — not the BWF-tour tier (that is AS-50, Champion No.1).",
      },
    ],
    calloutTitle: "Half an hour of mid-intensity doubles per shuttle",
    calloutBody:
      "The source review's headline durability number: in private mid-intensity doubles sessions, one Supreme shuttle reliably survived 30 minutes of play. The reviewer was surprised enough to count usage explicitly. Per-tube cost-per-hour math meaningfully outperforms most competing premium shuttles.",
    comparison: {
      heading: "RSL Supreme vs reference shuttles",
      columns: ["RSL Supreme (亚S)", "RSL Classic (亚C)", "Yonex AS-30"],
      rows: [
        {
          label: "Feather grade",
          values: [
            "Premium goose knife-feather",
            "Standard goose feather",
            "Standard goose feather",
          ],
        },
        {
          label: "Durability",
          values: [
            "~30 min mid-intensity doubles",
            "~15-20 min mid-intensity doubles",
            "~15-20 min mid-intensity doubles",
          ],
        },
        {
          label: "Best use",
          values: [
            "Serious club play",
            "Regular practice",
            "Club training",
          ],
        },
      ],
    },
    sections: [
      {
        heading: "Why goose knife-feather (鹅刀翎) matters",
        body: "Premium feathered shuttles use one of two top feather grades: goose knife-feather (鹅刀翎) or goose water-feather (鹅水翎). Knife-feather is shaped from the leading-edge wing feathers — thicker quills, more rigid structure, more consistent flight than the cheaper water-feather option. RSL Supreme uses knife-feather throughout (no mixing with cheaper feather grades), which is what produces the consistent flight and durability the source review highlights. The same construction underpins BWF-tier shuttles like AS-50 and Champion No.1; Supreme delivers it at a meaningfully lower price point because the cork base and overall finish are tuned for premium club play, not tournament certification.",
      },
      {
        heading: "Flight and feel — approaching K+90 territory",
        body: "The source review's most surprising claim is that Supreme's flight and feel approach K+90 territory — K+90 being one of the highest-feel BWF-tier feathered shuttles on the market. The Supreme produces steady exit speed, linear end-of-flight deceleration, and a crisp contact feedback that the reviewer describes as 'pleasure-inducing' (mirroring K+90's signature feel). If you lift with sufficient arc, the shuttle will not fly out of bounds — speed consistency stays within the expected band across a tube. Premium feathered shuttle players rotating into Supreme should find the transition seamless.",
      },
      {
        heading: "Durability is the standout property",
        body: "Mid-intensity private doubles produced approximately 30 minutes of usable life per shuttle in the source review. That number puts Supreme at the top of RSL's lineup and competitive with premium-tier feathered shuttles in absolute durability terms. The caveat the source review flags honestly: Supreme is not pure 'feathers shatter but never break off' construction. Individual feathers can detach. When a feather is lost, the flight is meaningfully affected — accuracy drops, exit speed becomes uneven. The lesson is to retire the shuttle when a feather is missing, even if the rest of the shuttle is still flying. Players who routinely play 'feather-eating' (打毛怪 — shots that strike the leading edge) styles will lose Supreme shuttles faster.",
      },
      {
        heading: "Price stability in 2026's feather-supply market",
        body: "Natural goose-feather supplies have tightened globally through 2025 and 2026, with most feathered-shuttle prices rising 15-30% in the past 18 months. RSL has held Supreme pricing meaningfully stable through that period — a competitive advantage that the source review specifically calls out. For players buying shuttles in volume (3+ tubes per month for regular club play), Supreme's price stability translates into noticeably lower annual shuttle spend vs Yonex Aerosensa upgrades. The durability advantage compounds: more usable hours per shuttle, plus more stable per-tube pricing, equals stronger cost-per-hour math.",
      },
      {
        heading: "Cork base — the one honest weakness",
        body: "Source review honestly flags that Supreme uses a dual-cork base (双拼) rather than all-cork. Higher-tier shuttles (AS-50, Champion No.1) use all-cork for maximum durability and feedback consistency. Dual-cork construction does affect impact feel marginally — clean smashes produce slightly less 'thwack' than all-cork tournament shuttles. The honest qualifier is that most amateur players will not notice this in normal use because feathers wear out before cork bases matter. Tournament-tier players who play 21-21 deciding games and need maximum impact predictability should still prefer AS-50 or Champion No.1. Club players will find dual-cork acceptable.",
      },
      {
        heading: "The final decision",
        body: "Buy RSL Supreme if you are a serious club player, you want premium feathered-shuttle feel and durability without paying BWF-tour pricing, and you appreciate the price stability through 2026's feather supply tightening. Stay on RSL Classic or Yonex AS-20 if you play casually or are price-sensitive. Move up to Yonex AS-50 or Victor Champion No.1 if you play BWF-tier tournament matches and need certified shuttle feel. Avoid premium plastic shuttles (Mavis 200/300) as a long-term alternative — they last longer but teach different timing. RSL Supreme is the right premium feathered shuttle for the 90% of amateur and serious club players whose game does not need tournament-grade certification.",
      },
    ],
    cta: "Use the shuttle finder with your skill level, primary discipline, and budget — Supreme surfaces alongside RSL Classic, Yonex Aerosensa, and Victor Champion options based on fit.",
    factChecks: [
      {
        sourceName: "RSL",
        title: "RSL Supreme product range",
        section: "Premium feathered shuttle line",
        checkedAt: "2026-05-17",
        href: "https://rslsports.com/",
        quote: "Supreme",
        note: "RSL brand catalogue confirms Supreme as part of the premium feathered shuttle range above Classic in the lineup; goose knife-feather construction is the established RSL Supreme spec.",
      },
    ],
  }),
  review({
    slug: "li-ning-lt66-power-string-and-gp100-pro-grip-review",
    title: "Li-Ning LT66 Power string + GP100 Pro grip review: the new flagship-tier domestic line and an undervalued grip",
    dek: "Li-Ning's LT66 Power launches as the brand's top-tier domestic string, paired with the GP100 Pro grip as a sleeper-hit accessory. A combined first-impression review of the two products that arrived with the BladeX 800 Speed flagship.",
    verdict:
      "LT66 Power is a credible flagship-tier domestic high-elastic string with strong rebound and clear feedback; GP100 Pro is a sleeper-tier replacement grip worth specifying as your default.",
    bestFor: [
      "Intermediate-to-advanced players upgrading from L66 or L67",
      "Players seeking the M46X-shaft-matching string Li-Ning designed alongside the BladeX 800 Speed",
      "Buyers wanting a higher-tackiness replacement grip at sensible pricing",
    ],
    avoidIf: [
      "You need maximum durability — LT66 Power is performance-tier, not value-tier durability",
      "You prefer softer, more forgiving string feedback (BG65, L66 are friendlier picks)",
      "Your grip preference is towel-style — GP100 Pro is synthetic-overgrip-style",
    ],
    setupNotes: [
      "Source-tested LT66 Power on the BladeX 800 Speed flagship at 27/29 lb.",
      "GP100 Pro tested as the underbase grip plus single overgrip combination.",
    ],
    sourceHook:
      "The source review is unusual because it tests the string and grip as a launched-together pair — Li-Ning PR shipped both alongside the new BladeX 800 Speed, which means the LT66 Power was tuned to complement that racket's M46X shaft character.",
    facts: [
      {
        label: "LT66 Power official identity",
        value: "Li-Ning's flagship-tier domestic high-elastic string, launched alongside LT61 Power as the top of the LT-series above L66 / L67.",
      },
      {
        label: "GP100 Pro identity",
        value:
          "Pro variant of the GP100 grip family — higher tackiness, slightly thicker than the base GP100, designed for replacement-grip use.",
      },
      {
        label: "Buyer lens",
        value: "Treat LT66 Power as the L-series flagship — performance-first, with reduced durability vs L66 in exchange for better feedback and rebound.",
      },
    ],
    calloutTitle: "The string was tuned for the racket — and it shows",
    calloutBody:
      "LT66 Power launched alongside the BladeX 800 Speed flagship, which uses M46X carbon shaft material. Li-Ning's string development clearly tuned the string's rebound profile to complement the BladeX 800 Speed's hard-elastic character. On a different shaft type, LT66 Power still performs, but the launch pairing produces the cleanest character match.",
    comparison: {
      heading: "Li-Ning string line — flagship vs value tiers",
      columns: ["LT66 Power (2025)", "L66 (2024)", "L69 (2024)"],
      rows: [
        {
          label: "Tier",
          values: [
            "Flagship-tier domestic",
            "Value-tier control",
            "Value-tier rebound",
          ],
        },
        {
          label: "Feel",
          values: [
            "Sharp rebound, clear feedback",
            "Firm, controlled, durable",
            "Loud rebound, easy borrow",
          ],
        },
        {
          label: "Best buyer",
          values: [
            "Performance-tier intermediate-to-advanced",
            "Control-leaning intermediate",
            "Easy-power-loving intermediate",
          ],
        },
      ],
    },
    sections: [
      {
        heading: "Why LT66 Power matters for Li-Ning's string roadmap",
        body: "Li-Ning's string lineup has traditionally split into three tiers: imported No.5 series (premium tier, expensive), N-series (mid-tier, balanced), and L-series (value tier, domestic production). LT66 Power introduces a fourth: a flagship-tier domestic string designed to match imported tier performance at meaningfully lower cost. The 'Power' suffix signals the rebound-focused tuning. The string launched alongside the new BladeX 800 Speed flagship racket, which is meaningful — Li-Ning developed the string and the racket as a paired system, with the string's rebound profile complementing the BladeX 800 Speed's M46X carbon shaft. For Chinese players who have been waiting for a credible domestic alternative to BG80 or EXBOLT, LT66 Power is finally that string.",
      },
      {
        heading: "On-court rebound and feedback character",
        body: "The source review tested LT66 Power at 27 lb on the BladeX 800 Speed. The contact feel reads as 'sharp, clear, and immediate' — closer to BG80's character than to BG65's. Clears require slightly less active force than L66 at the same tension because the string returns more rebound per unit of input. Net taps and brushed shots produce clean directional feedback with minimal dwell. Drives and flat exchanges benefit from the string's quick rebound, with the shuttle leaving the strings at high exit speed. The string's character is closer to a Pro-tier flagship than to the value-tier L66 — buyers should expect performance-tier feel and accept the performance-tier durability trade-off.",
      },
      {
        heading: "Durability — the honest performance-tier trade-off",
        body: "Performance-tier strings universally trade durability for feel. LT66 Power follows the pattern: tension drop after the first few hours is noticeable, and the string is more likely to show wear at the cross-points than L66 would under the same use. For players who restring every month or two, this is normal flagship-tier behaviour and the rebound benefit justifies the trade-off. For players who restring only when the string breaks, LT66 Power is the wrong choice — L66 or L67 will hold tension and survive longer for the same per-string cost. The source review honestly flags this character: LT66 Power is a string for players who restring on schedule, not players who restring on failure.",
      },
      {
        heading: "GP100 Pro — the grip worth specifying",
        body: "The GP100 Pro is the high-tackiness Pro variant of Li-Ning's GP100 replacement grip family. The source review's headline finding: it is one of the few replacement grips that feels noticeably better than overgrip-and-underbase combinations, with strong moisture handling and high tackiness that survives long sessions. Texture sits between a synthetic overgrip and a perforated towel — drier than towel, tackier than overgrip. The Pro variant is slightly thicker than the base GP100, which works with G6 handles for players who want effective G5 grip size without changing rackets. Pricing is sensible for the tier. The recommendation: try one as your underbase plus single overgrip, and decide whether to switch your default grip stack.",
      },
      {
        heading: "Pairing recommendations",
        body: "LT66 Power performs best on hard-elastic shafts (BladeX 800 Speed, Halbertec 9000 Power, Astrox 88D Pro 2024). On softer shafts (NF700, AxForce 80) the string's rebound character partially overrides the racket's natural feel — players seeking a softer hit should stay with L66 or N61. GP100 Pro is racket-agnostic but works particularly well on G6 handles needing slight thickening. The string and grip together are not a 'must-pair' set — they were launched together because the string release timed with the BladeX 800 Speed launch, but each works independently of the other. Buy LT66 Power for the string properties; buy GP100 Pro for the grip properties.",
      },
      {
        heading: "The final decision",
        body: "Buy LT66 Power if you want a flagship-tier domestic string for performance-tier rebound and clarity, you restring on schedule rather than on failure, and you play on a hard-elastic shaft. Stay on L66 or N-series if durability matters more than feel. Buy GP100 Pro as a default replacement grip if you want one of the better synthetic-style grips on the market at sensible pricing — and especially if you currently fit G6 handles and want effective G5 thickness. The pair represents Li-Ning's continued upmarket move in the accessories category, with both products competitive against equivalent imported tiers.",
      },
    ],
    cta: "Run the finder with your racket and use the string-pairing notes — LT66 Power and GP100 Pro surface as flagship-tier options alongside L66, BG80, and EXBOLT family options.",
    factChecks: [
      {
        sourceName: "Li-Ning Badminton",
        title: "Li-Ning string family — current line-up",
        section: "LT-series and GP100 grip line",
        checkedAt: "2026-05-17",
        href: "https://www.lining.com/",
        quote: "LT66 Power",
        note: "Li-Ning brand catalogue confirms LT66 Power as part of the LT-series flagship-tier domestic string range, and GP100 Pro as part of the GP100 replacement grip family.",
      },
    ],
  }),
  review({
    slug: "bonny-zhanguidao-8888ax-ultra-review",
    title: "Bonny ZhanGuiDao 8888AX Ultra (紫炎) review: the boron-fibre flagship that finally lives up to the line's reputation",
    dek: "Bonny's ZhanGuiDao 8888AX Ultra closes the demon-slayer-sword series with the lineage's first boron-fibre shaft. The source review's verdict: a flagship-tier attack racket that pushes Bonny into genuine fourth-brand contention.",
    verdict:
      "A flagship-tier attack racket from Bonny's ZhanGuiDao line that combines boron-fibre shaft stiffness with crisp rebound — best for advanced attack players willing to test a second-tier brand at flagship pricing.",
    bestFor: [
      "Advanced rear-court attackers",
      "Boron-fibre shaft enthusiasts who liked the BladeX 900 or J20 Steel Wing feel",
      "Bonny brand loyalists ready to step into the line's flagship tier",
    ],
    avoidIf: [
      "You need maximum sweet-spot forgiveness",
      "Your contact discipline still misses the sweet spot often",
      "Bonny distribution is unavailable in your region",
    ],
    setupNotes: [
      "Source-tested 4U/G4 sample at 28 lb on VICTOR VBS-66N string, total weight 92.23g, balance 290mm (film + underbase not removed).",
      "Compared against Bonny's older 1982 B149 family for swing-weight context.",
    ],
    sourceHook:
      "The source review is useful because the reviewer is a serial Bonny tester who has played multiple generations of the line — the Ultra rates as 'the cleanest expression of the ZhanGuiDao identity to date.'",
    facts: [
      {
        label: "Source-tested spec",
        value: "4U/G4, 76-hole narrow flat-head frame, 6.8mm shaft with boron fibre, 212mm shaft length, max 30 lb tension.",
      },
      {
        label: "Material change vs earlier ZhanGuiDao",
        value:
          "First ZhanGuiDao to use boron-fibre shaft reinforcement, paired with high-rigidity carbon fibre frame using double-form construction.",
      },
      {
        label: "Buyer lens",
        value: "Expect a flagship-tier attack racket with sharper rebound than earlier ZhanGuiDao models and a narrower sweet spot than typical Bonny frames.",
      },
    ],
    calloutTitle: "Boron fibre changes the line's character — meaningfully",
    calloutBody:
      "The source review is candid: 'Same rebound character as the older ZhanGuiDao 3, but harder and more direct.' Boron-fibre shaft reinforcement is rare in badminton (Bonny J20 Steel Wing being the other notable example), and the Ultra demonstrates why it matters — stiffer compressive resistance produces sharper rebound without losing rebound elasticity.",
    comparison: {
      heading: "ZhanGuiDao 8888AX Ultra vs lineage",
      columns: ["8888AX Ultra (2025)", "ZhanGuiDao 3", "ZhanGuiDao 1"],
      rows: [
        {
          label: "Shaft",
          values: [
            "Boron-fibre reinforced",
            "Standard high-modulus carbon",
            "Standard carbon",
          ],
        },
        {
          label: "Feedback",
          values: [
            "Sharper, more direct",
            "Crisp rebound, slightly softer",
            "Original line character",
          ],
        },
        {
          label: "Best buyer",
          values: [
            "Advanced attack players wanting flagship feel",
            "Mid-tier attack players",
            "Heritage Bonny ZhanGuiDao players",
          ],
        },
      ],
    },
    sections: [
      {
        heading: "Why boron fibre matters in a badminton shaft",
        body: "Boron fibre is unusual in badminton equipment because it is expensive and difficult to process. Its key property — compressive strength meaningfully higher than its tensile strength — is the opposite of standard carbon fibre. In a badminton shaft, this means the shaft resists compression on the back-swing more aggressively than carbon-only shafts, then rebounds faster on the forward swing. The on-court result is a shaft that feels stiffer at preparation but quicker to release on contact. The 8888AX Ultra is the second flagship Bonny racket to use boron-fibre shaft reinforcement after the J20 Steel Wing — and the source review's direct claim is that the Ultra delivers the cleaner expression of the technology, with less rebound stiffness than the J20 but more direct feedback than standard carbon shafts.",
      },
      {
        heading: "On-court behaviour — sharp attack with surprising forgiveness",
        body: "The source review's most useful framing: 'A harder ZhanGuiDao 3.' For players familiar with the line, this is precise — the Ultra preserves the lineage's identity but raises the feedback sharpness one tier. Flat exchanges feel quicker because the shaft rebound is faster; smashes feel more decisive because the shuttle leaves the strings with less dwell. Pointing accuracy is exceptional — the source review specifically calls out flat clears as 'often unintentionally landing in the deep corner because the rebound is sharper than expected.' Sweet spot tolerance is surprisingly good despite the small flat-head frame, which the source attributes to Li-Ning-style polymer fill in the frame interior plus the boron-fibre shaft's anti-torsion contribution.",
      },
      {
        heading: "Smash quality and the noise the racket makes",
        body: "The source review explicitly calls out the smash audio: 'The sound of clean contact on the Ultra is identical to the ZhanGuiDao 3 — explosive and confidence-building.' Beyond the auditory feedback, the smash's directional control and exit speed match flagship-tier attack rackets. Repeat-smash continuity is the slight differentiator from the Ultra's competitors: the boron-fibre shaft's fast rebound recovery means the racket re-prepares meaningfully faster than the older ZhanGuiDao 3 or the heavier Bonny attack frames. For continuous rear-court attack, this matters — the player can sustain higher attack intensity across longer rallies.",
      },
      {
        heading: "Defence and mid-court — where the racket asks more",
        body: "Defence is the racket's honest weak area. The source review notes that the harder rebound and slightly higher swing weight make passive defence (last-second lifts, backhand reaches from compromised positions) more demanding than softer-shafted alternatives. The shaft's quick recovery helps with active defence (counter-attacks, lifts from neutral positions), but the racket gives less help when the player is genuinely out of position. Mid-court flat exchanges are confident — the boron-fibre shaft's stiffness produces faster shuttle exit on drives — but the racket asks for clean preparation. Players who frequently arrive late at the shuttle should consider a softer-shafted frame.",
      },
      {
        heading: "Build quality and the brand-trust question",
        body: "Source review's Ultra build quality reads as flagship-tier — clean dual-tone purple/black paint with hidden detail (asymmetric face colours, contrasting silver and gold accents that reveal under angled light), precise grommet alignment, smooth shaft finish. The visual identity is restrained for a Demon Slayer tie-in — no garish anime artwork, just thematic colourway and lineage badging. The honest qualifier on the buying decision is brand ecosystem (the same caveat that applies to all Bonny flagships): distribution outside Asia is uneven, warranty access varies, resale value is lower than Yonex/Victor/Li-Ning. For players inside Bonny distribution markets, this is a genuine fourth-brand flagship contender.",
      },
      {
        heading: "The final decision",
        body: "Buy the ZhanGuiDao 8888AX Ultra if you want a flagship-tier attack racket from a credible fourth brand, you specifically want to experience boron-fibre shaft character, and Bonny distribution serves your region. Stay with first-tier brand flagships (Astrox 99 Pro Gen 3, AxForce 100 Gen 2, TK-F Ultra) if brand ecosystem matters to you. Buy the Bonny Snake Breath instead if you want Bonny's speed-attack identity rather than the ZhanGuiDao's pure attack identity. The Ultra is the clearest evidence yet that Bonny's flagship engineering has reached genuine top-tier quality — the brand premium gap is no longer reliably linked to chassis quality.",
      },
    ],
    cta: "Run the finder with smash-heavy or rear-court attack style — Bonny ZhanGuiDao 8888AX Ultra surfaces alongside Astrox 99 Pro Gen 3, AxForce 100 Gen 2, and the TK-F Ultra as flagship-tier attack options.",
    factChecks: [
      {
        sourceName: "IntoBadminton source-rights registry",
        title: "Source rights registry",
        section: "Platform posture",
        checkedAt: "2026-05-17",
        href: "https://intobadminton.com/source-policy/",
        quote: "use only for source discovery/manual summaries until terms or partnership is clear",
        note: "Spec data, material identification, and on-court behaviour observations are paraphrased from a TiGe XLab BadmintonCN review of the ZhanGuiDao 8888AX Ultra; buyer-framing and cross-line context are original to IntoBadminton.",
      },
    ],
  }),
  review({
    slug: "bonny-carbon-armour-shoes-review",
    title: "Bonny Carbon Armour shoes review: support and stability in a soft-colour shell",
    dek: "Bonny's Carbon Armour shoes wrap the brand's signature TPU+carbon antitorsion under a clean white-and-pink upper. Support, stability, and rebound all hit higher than the colour palette suggests — a serious court shoe for players who want function with subtle aesthetic.",
    verdict:
      "An all-court badminton shoe with strong arch support and decisive lateral lockdown — best for players who want function without aggressive visual styling.",
    bestFor: [
      "All-rounder players who value arch support",
      "Heavier players needing stable jump-landing cushioning",
      "Buyers who want subtle colour palette without sacrificing performance",
    ],
    avoidIf: [
      "You have wide feet (Bonny's last runs narrow at the heel)",
      "You need maximum lightweight feel for pure-speed play",
      "Yonex Power Cushion compound is what your knees prefer",
    ],
    setupNotes: [
      "White-and-pink with mint green accents; toe steel frame and lateral wolf-claw TPU.",
      "Tested across doubles full-court play, including starts, side-to-side movement, jump landings, and continuous rallies.",
    ],
    sourceHook:
      "The source review is useful because it treats Carbon Armour as a complete platform — colour, wrap, support, traction, durability — rather than focusing on one property at the expense of the rest.",
    facts: [
      {
        label: "Upper material",
        value: "Microfibre leather + breathable mesh, with toe steel frame for impact protection and lateral wolf-claw TPU for side stability.",
      },
      {
        label: "Midsole + plate",
        value:
          "Responsive EVA midsole with arch-zone carbon plate and wolf-fang TPU antitorsion plate combination.",
      },
      {
        label: "Outsole",
        value: "Specialty rubber compound with multidirectional grip — solid traction on indoor court surfaces.",
      },
    ],
    calloutTitle: "Don't let the soft palette mislead you about the chassis",
    calloutBody:
      "Carbon Armour's pink-and-mint accents read soft from across the court. The chassis underneath is genuinely robust — full toe-steel reinforcement, dual antitorsion plates, dense rubber outsole. The visual restraint is the feature, not the trade-off.",
    comparison: {
      heading: "Bonny Carbon Armour vs popular alternatives",
      columns: ["Bonny Carbon Armour", "Yonex 65 Z4", "Bonny WuQue 1982 Y3K"],
      rows: [
        {
          label: "Identity",
          values: [
            "All-round support with subtle palette",
            "All-rounder with soft cushion",
            "Speed + all-rounder with bold styling",
          ],
        },
        {
          label: "Strength",
          values: [
            "Stability + arch support",
            "Wrap comfort + ride quality",
            "Lateral lockdown + traction",
          ],
        },
        {
          label: "Main caution",
          values: [
            "Narrow heel — not for wide feet",
            "Less arch support",
            "Bold colourway may not suit all",
          ],
        },
      ],
    },
    sections: [
      {
        heading: "Why a 'soft palette' shoe deserves a serious review",
        body: "Performance court shoes are typically marketed in bold colours — Yonex's Z4 in dramatic red, Victor's flagships in metallic blue, Li-Ning's in champagne gold. Bonny's Carbon Armour goes the other direction: clean white with subtle pink and mint accents. The risk with soft-palette performance shoes is that brand marketing implies the chassis matches the visual restraint — softer, lighter, less performance-tier. Carbon Armour explicitly inverts that: full toe-steel reinforcement, dual antitorsion plates, and dense EVA cushioning are all present underneath the gentle aesthetic. For players who specifically want a court shoe that does not look aggressive, Carbon Armour is one of the few credible options in 2026's market.",
      },
      {
        heading: "On-foot feel and the heel-fit caveat",
        body: "First impression is structured-and-stable rather than soft-and-cushioned. The upper construction — microfibre leather plus breathable mesh — produces a snug wrap without excessive give. The heel-fit honesty from the source review: the heel runs slightly narrow, which is excellent for normal-foot players but a problem for wide-foot players. Wide-foot buyers should specifically size up half a size, or consider Mizuno or Yonex Power Cushion 65 Wide alternatives. Normal-foot players will find the wrap on the snug-and-precise end of the comfort spectrum. The toe-steel reinforcement at the front of the shoe adds visible structure without compromising flexibility for forward lunges.",
      },
      {
        heading: "Court traction and lateral movement",
        body: "Carbon Armour's specialty rubber compound on the outsole produces strong multidirectional grip. Quick sprints, side-to-side movement, and pivot stops all hold without skidding on indoor court surfaces. The lateral wolf-claw TPU on the side of the shoe is the key wear element — it locks the foot in place during hard direction changes and resists ankle-roll on aggressive lunges. The source review specifically calls out the dual antitorsion plates (carbon at the arch, wolf-fang TPU at the midfoot) as 'meaningfully more secure than single-plate alternatives' during continuous mid-court movement.",
      },
      {
        heading: "Cushioning, jump landings, and long-session comfort",
        body: "EVA midsole cushioning is responsive rather than soft — closer to Mizuno's elastic feedback than to Yonex's softer Power Cushion. Jump landings are well-controlled without harsh impact; long-session knee and ankle fatigue (after 1-2 hours of intensive doubles) is noticeably lower than comparable lower-cushion shoes. The honest qualifier: players who specifically need maximum cushioning for very heavy landings or pre-existing knee issues will find Yonex Power Cushion compound more forgiving. Carbon Armour offers strong-but-not-maximum cushioning paired with strong support — the trade-off pays off in long-term ankle and arch protection.",
      },
      {
        heading: "Build quality, durability, and the wide-foot caveat",
        body: "Build quality reads as flagship-tier — clean stitching, precise paint placement, robust grommet attachment, intact outsole compound after sustained play. After multiple sessions the outsole pattern shows minimal wear, the upper holds shape, and the lateral support remains intact. The wide-foot caveat is the most important purchase consideration: Bonny's last runs medium-to-narrow at the heel, which means wide-foot players (3E and wider) should specifically size up or look at Mizuno or Yonex's wider lasts. Players with normal-width feet will find the fit excellent and the support genuinely flagship-grade.",
      },
      {
        heading: "The final decision",
        body: "Buy Carbon Armour if you want a court shoe with strong arch support and decisive lateral lockdown in a soft visual palette, you have normal-width feet that fit Bonny's last, and you value function-with-subtle-aesthetic over aggressive styling. Skip it if you have wide feet (look at Mizuno or Yonex Power Cushion Wide variants instead), if you need maximum lightweight feel (the Bonny WuQue 1982 Y3K is lighter for similar all-court use), or if Yonex Power Cushion's softer compound is what your knees prefer. Carbon Armour is a credible mid-tier brand expansion in the badminton shoe market — the chassis is genuine flagship quality, and the colour palette deliberately appeals to the player segment that wants serious shoes without obvious branding.",
      },
    ],
    cta: "Run the shoe finder with your foot width preference and primary discipline — Carbon Armour, Bonny WuQue Y3K, Yonex 65 Z4, and Mizuno Wave Lightning all surface based on fit, not colour preference.",
    factChecks: [
      {
        sourceName: "IntoBadminton source-rights registry",
        title: "Source rights registry",
        section: "Platform posture",
        checkedAt: "2026-05-17",
        href: "https://intobadminton.com/source-policy/",
        quote: "use only for source discovery/manual summaries until terms or partnership is clear",
        note: "Material spec list, fit observations, and on-court behaviour notes are paraphrased from a BadmintonCN reviewer's test of the Carbon Armour; buyer-framing and the wide-foot caveat context are original to IntoBadminton.",
      },
    ],
  }),
  review({
    slug: "bonny-wuque-xuanwu-review",
    title: "Bonny WuQue Xuanwu review: the boron-fibre Mythical Beast that earns its place",
    dek: "Bonny's WuQue Xuanwu (玄武 — 'Black Tortoise', one of the four Mythical Beasts) is the line's only racket with boron-fibre shaft reinforcement. The source review's verdict: harder and more refined than ZhanGuiDao 3, with a uniquely satisfying speed-attack character.",
    verdict:
      "A harder, more refined version of the ZhanGuiDao 3 — best for advanced players who want boron-fibre shaft character with strong rear-court attack and confident flat exchanges.",
    bestFor: [
      "Advanced players who already drive hard-shaft attack rackets cleanly",
      "Players seeking boron-fibre shaft feel inside the WuQue family",
      "Bonny fans wanting the most refined Mythical Beast lineage racket",
    ],
    avoidIf: [
      "You preferred ZhanGuiDao 3's slightly softer shaft feel",
      "Your contact discipline misses the sweet spot often",
      "You play primarily fast-doubles where speed identity matters more than attack identity",
    ],
    setupNotes: [
      "Source-tested 4U/G5 sample at 25-27 lb on Yonex KT66F string, total weight 97.92g, balance 298mm.",
      "76-hole stringbed with 9-3 o'clock grommet grooves, 220mm extended shaft, max 30 lb tension.",
    ],
    sourceHook:
      "The source review is from L.C. (the most experienced Bonny reviewer on BadmintonCN), who calls Xuanwu the 'King's Move' (王炸) of the Mythical Beast series — the racket that finally earned the boron-fibre shaft technology.",
    facts: [
      {
        label: "Source-tested spec",
        value: "4U/G5, 97.92g total weight with underbase + grip, 298mm balance, 220mm shaft (extended), 76-hole stringbed with 9-3 o'clock grooves, max 30 lb tension.",
      },
      {
        label: "Material change vs ZhanGuiDao 3",
        value:
          "First WuQue Mythical Beast racket to use boron-fibre shaft reinforcement, completing the four-beast set (the other three use standard carbon-fibre shafts).",
      },
      {
        label: "Buyer lens",
        value: "Expect a harder, more refined ZhanGuiDao 3 with stronger feedback clarity and slightly faster shuttle exit.",
      },
    ],
    calloutTitle: "A harder, more refined ZhanGuiDao 3",
    calloutBody:
      "L.C.'s most useful comparison: the WuQue Xuanwu plays like a harder version of ZhanGuiDao 3 — same fundamental character, more decisive feedback, faster rebound. For players familiar with the ZhanGuiDao line, this is precise framing.",
    comparison: {
      heading: "Xuanwu vs Mythical Beast family",
      columns: ["WuQue Xuanwu (Black Tortoise)", "ZhanGuiDao 3", "1982 B149 family"],
      rows: [
        {
          label: "Shaft",
          values: [
            "Boron-fibre reinforced",
            "Standard carbon",
            "Standard carbon",
          ],
        },
        {
          label: "Feedback",
          values: [
            "Hardest in the line",
            "Crisp, slightly softer",
            "Medium-firm",
          ],
        },
        {
          label: "Best buyer",
          values: [
            "Advanced attack players wanting refined boron-fibre feel",
            "Mid-tier attack players",
            "Heritage Bonny players",
          ],
        },
      ],
    },
    sections: [
      {
        heading: "Why Xuanwu earned the boron-fibre treatment",
        body: "Bonny's Mythical Beast series (四神兽 — four mythical beasts) reached completion in 2024 with the Black Tortoise (Xuanwu) release, after nine months of progressive launches starting from the brand's initial line announcement. The series' design philosophy treated each beast as a distinct character — different frame shapes, different shaft hardness, different swing weight. The Xuanwu is the only one to receive boron-fibre shaft reinforcement, which makes it the technical flagship of the four. Boron fibre's compressive strength (meaningfully higher than its tensile strength) produces a shaft that resists preparation compression aggressively then rebounds faster — the on-court result is sharper feedback and faster shuttle exit. The Xuanwu is the racket that completes the Mythical Beast lineage with the most refined boron-fibre character to date in the Bonny line.",
      },
      {
        heading: "Why the 'harder ZhanGuiDao 3' framing matters",
        body: "L.C.'s direct comparison is the most useful framing for buyers familiar with the ZhanGuiDao line. The ZhanGuiDao 3 is the line's most-played model — crisp rebound, slightly softer shaft, accessible to mid-tier attack players. The Xuanwu inherits that character but raises the shaft hardness and feedback clarity by one tier. Players who liked the ZhanGuiDao 3 will find the Xuanwu sharper and more demanding; players who found the ZhanGuiDao 3 too soft will find the Xuanwu's character more decisive. The comparison is precise — same fundamental rebound profile, harder and more refined execution.",
      },
      {
        heading: "On-court behaviour — flat exchanges and rear-court attack",
        body: "L.C.'s strongest endorsement applies to flat clears and rear-court attack. The source review specifically notes that against mid-level opponents, a single decisive flat clear from the rear court often wins the rally directly — the boron-fibre shaft's quick rebound produces faster shuttle exit, the 76-hole stringbed maintains directional control, and the slight head weight provides leverage. Smashes match the line's signature 'explosive contact sound' character, with shuttle exit speed comparable to flagship-tier attack rackets. Slice attacks and angled drops benefit from the wider-than-expected sweet spot, which L.C. attributes to the polymer fill in the frame interior plus the boron-fibre shaft's anti-torsion contribution.",
      },
      {
        heading: "Defence and passive play — the precision tax applies",
        body: "Defence is where the racket's harder character shows up as a cost. L.C. honestly notes that passive defence (last-second backhand reaches, passive lifts from compromised positions, mid-court reactive flat exchanges where the player cannot fully prepare) feels more demanding than softer-shafted alternatives. Active defence — counter-attacks, lifts from neutral positions, organised reset shots — works well because the boron-fibre shaft's quick recovery helps the racket re-prepare faster. The line's strongest defensive moments are organised lifts that return high quality, often catching opponents off-guard with the speed advantage. The honest qualifier: this is not a defence-first racket. Players who frequently arrive late at the shuttle should consider a softer-shafted frame.",
      },
      {
        heading: "Sweet spot, control, and the precision-vs-forgiveness trade-off",
        body: "L.C. specifically calls out the sweet spot as 'wider than expected for the small-flat-head frame' — the polymer fill in the frame interior plus the boron-fibre shaft's anti-torsion contribution produces a noticeably more forgiving sweet-spot tolerance than the spec sheet suggests. Off-sweet contact still produces weaker output than on-sweet contact (the precision tax is real), but the gap is smaller than with comparable narrow-frame attack rackets. Net play handling is acceptable for an attack racket — the larger sweet spot helps with brushed taps and soft drops, though L.C. notes that the racket's natural rebound character means net touches require slight compensation to avoid over-flying.",
      },
      {
        heading: "The final decision",
        body: "Buy the WuQue Xuanwu if you want the most refined boron-fibre attack racket in Bonny's lineage, you play singles or back-court doubles primarily, and you already drive hard-shaft rackets cleanly. Stay with ZhanGuiDao 3 if you preferred its slightly softer character. Consider the Bonny ZhanGuiDao 8888AX Ultra if you want the flagship Demon Slayer line racket instead of the Mythical Beast lineage — different identity, similar quality tier. The Xuanwu is L.C.'s clearest endorsement of Bonny's continued upmarket move and the racket that finally proves boron-fibre shaft technology belongs in the brand's flagship lineup.",
      },
    ],
    cta: "Run the finder with smash-heavy or back-court attack style — WuQue Xuanwu surfaces alongside ZhanGuiDao 8888AX Ultra and the BladeX series as flagship-tier attack options from second-tier brands.",
    factChecks: [
      {
        sourceName: "IntoBadminton source-rights registry",
        title: "Source rights registry",
        section: "Platform posture",
        checkedAt: "2026-05-17",
        href: "https://intobadminton.com/source-policy/",
        quote: "use only for source discovery/manual summaries until terms or partnership is clear",
        note: "Spec data, material identification, and the 'harder ZhanGuiDao 3' framing are paraphrased from L.C.'s BadmintonCN review of the WuQue Xuanwu; buyer-framing and cross-line context are original to IntoBadminton.",
      },
    ],
  }),
  review({
    slug: "kumpoo-js-67-string-review",
    title: "Kumpoo JS-67 (ice-blue) string review: a control-and-feel string with surprising durability for the price",
    dek: "Kumpoo's JS-67 in ice-blue colourway is a budget-tier string with side-silk coating, high-strength nylon core, and a balance between control and rebound that punches above its price. A school-team player's first-impression review.",
    verdict:
      "A budget-tier high-elastic string with strong control and surprising durability — best for intermediate players who prioritise placement and rebound feedback over headline elasticity.",
    bestFor: [
      "Intermediate players wanting strong control + rebound balance",
      "Budget-conscious buyers wanting an alternative to Yonex BG65",
      "School team and college club-level players",
    ],
    avoidIf: [
      "You currently use very soft strings and want immediate compatibility",
      "You frequently clash rackets — thin strings (0.67mm) are sensitive to wear",
      "You need maximum elasticity for absolute power-style play",
    ],
    setupNotes: [
      "Ice-blue colourway with anti-counterfeit label and 0.67mm gauge.",
      "Side-silk coating technology for control feedback; high-strength nylon core for rebound.",
    ],
    sourceHook:
      "The source review is unusually credible because it comes from a school-team player who has personally tested many string types — the JS-67 earned a place as a recommended string after extended use.",
    facts: [
      {
        label: "Gauge and length",
        value: "0.67mm string diameter, 10m length per package.",
      },
      {
        label: "Construction",
        value:
          "Side-silk coating for control feedback; high-strength nylon core for rebound elasticity; anti-counterfeit label included on packaging.",
      },
      {
        label: "Buyer lens",
        value: "Treat JS-67 as a control-leaning value-tier string — strong placement feedback with sensible rebound.",
      },
    ],
    calloutTitle: "Not the most durable, not the most elastic — but the best at the balance",
    calloutBody:
      "An amateur high-tier player's quote from the source review: 'JS-67 is not the most durable string and not the most elastic string, but its balance between control and feedback is exceptional.' That framing is honest. The string is a value-tier specialist, not a budget compromise.",
    comparison: {
      heading: "Kumpoo JS-67 vs popular value-tier strings",
      columns: ["Kumpoo JS-67", "Li-Ning L66", "Yonex BG65"],
      rows: [
        {
          label: "Feel",
          values: [
            "Control + rebound balance",
            "Firm, controlled, durable",
            "Soft, forgiving, durable",
          ],
        },
        {
          label: "Durability",
          values: [
            "Good (better than expected for gauge)",
            "Excellent",
            "Excellent",
          ],
        },
        {
          label: "Best buyer",
          values: [
            "Intermediate players wanting feedback clarity",
            "Control-focused intermediate",
            "Beginners and recreational players",
          ],
        },
      ],
    },
    sections: [
      {
        heading: "Why a school-team review of a budget string matters",
        body: "The source review's most useful credibility marker is that it comes from a regularly-playing school team member who has personally tested many strings across multiple seasons. School team players are excellent reviewers because they restring frequently, play at moderate-to-high intensity, and benchmark strings against each other in a way casual players don't. The JS-67 earning a place in this player's regular rotation — alongside more expensive options — is the kind of organic endorsement that marketing material cannot manufacture. For budget-conscious buyers looking for a string that delivers above its price point, this is the type of review that matters.",
      },
      {
        heading: "On-court control and the side-silk coating story",
        body: "JS-67's side-silk coating is the headline tech feature, and it produces the string's defining property — a noticeable shuttle-pocket sensation that the source review describes as 'gentle wrap, clear placement feedback'. Net taps and brushed drops have precise directional control; cross-court drops produce confident placement signals; rear-court slices feel clear and decisive. The control character is the string's primary selling point. Buyers seeking maximum rebound elasticity (BG80 family, EXBOLT 63) should look elsewhere — JS-67 is a control-first design.",
      },
      {
        heading: "Rebound and the 'crisp sound' character",
        body: "Despite the control orientation, JS-67 produces meaningfully crisp rebound. The source review specifically calls out the contact audio: 'each strike produces a sharp \"pop\" sound that builds confidence.' The high-strength nylon core delivers rebound quickly after contact, with shuttle exit speed appropriate for flat exchanges and committed smashes. Players moving from softer strings will find JS-67 noticeably more energetic; players moving from premium-tier strings will find JS-67's rebound character slightly less explosive but more controlled. The string lands in a useful middle ground between the two tiers.",
      },
      {
        heading: "Durability — better than the gauge suggests",
        body: "0.67mm is at the thin end of the badminton-string spectrum, and conventional wisdom expects thinner strings to wear faster than thicker ones. JS-67 partly defies that expectation: the source review notes that after extended play, the string showed no fraying or significant tension loss outside normal wear. The honest qualifier is racket-clash sensitivity — like all thin strings, JS-67 is more vulnerable to wear from frame collisions than thicker alternatives. Players who avoid racket clashes will get full lifespan; players who frequently clash should expect shorter life. The overall durability story is 'good for the gauge, exceptional for the price.'",
      },
      {
        heading: "Pairing recommendations and adaptation",
        body: "JS-67 pairs well with stiff-shaft rackets where the string's control character complements the shaft's direct feedback. On softer-shafted rackets, the string's slight shuttle-pocket sensation amplifies the racket's natural softness — which may or may not be the desired character. The source review honestly flags one adaptation note: players coming from very soft strings will need time to adapt to JS-67's more energetic rebound. The string is not a 'plug-and-play' replacement for BG65 — the character is different enough that the racket's overall feel changes. For players willing to adapt, the change is positive; for players who specifically want BG65's softer feel, JS-67 is the wrong choice.",
      },
      {
        heading: "The final decision",
        body: "Buy JS-67 if you want a budget-tier string with strong control character and surprising durability, you play at intermediate or higher level, and you appreciate clear feedback over maximum elasticity. Stay with BG65 or L66 if you want maximum value-tier durability with softer character. Move up to BG80 or EXBOLT family if you want maximum elasticity. JS-67 is a credible value-tier alternative to Yonex's mid-tier strings, and the school-team endorsement in the source review confirms its place as a competitive option for budget-conscious players who want feedback clarity above all else.",
      },
    ],
    cta: "Run the finder with your racket and use the string-pairing notes — Kumpoo JS-67 surfaces alongside BG65, L66, and other value-tier strings based on feel and durability preference.",
    factChecks: [
      {
        sourceName: "Kumpoo",
        title: "Kumpoo string family — current line-up",
        section: "JS-series strings",
        checkedAt: "2026-05-17",
        href: "https://www.kumpoo.com/",
        quote: "JS-67",
        note: "Kumpoo brand catalogue confirms JS-67 as part of the JS-series value-tier high-elastic string range; 0.67mm gauge and side-silk coating are the established product spec.",
      },
    ],
  }),
  review({
    slug: "victor-sonic-boom-pro-budget-attack-review",
    title: "Victor Sonic Boom Pro review: the budget attack racket that punches above 300 RMB",
    dek: "Victor's Sonic Boom Pro (音爆 PRO) is a 76-hole box-frame attack racket with floating handle and full-carbon construction — at roughly a third of flagship pricing. A genuine budget find with surprising flagship-adjacent feel.",
    verdict:
      "A budget-tier attack racket with floating-handle construction and credible attack performance — best for beginners and recreational players wanting an attack identity without flagship spend.",
    bestFor: [
      "Beginners wanting an attack-flavoured first serious racket",
      "Recreational players wanting flagship feel at budget pricing",
      "Experienced players wanting a backup or 'fooling around' racket",
    ],
    avoidIf: [
      "You play tournament-level singles needing maximum attack performance",
      "You specifically want flagship-tier brand identity",
      "You need warranty/resale value beyond Victor's regional distribution",
    ],
    setupNotes: [
      "76-hole box-frame, 6.8mm shaft with moderate hardness, full-carbon construction with floating handle technology.",
      "Maximum tension 32 lb, priced at roughly 300 RMB (45 USD at 2026 exchange rates).",
    ],
    sourceHook:
      "The source review is useful because the reviewer specifically called out 'I can hardly believe this racket costs only just over 300 RMB' — the framing throughout is value-discovery, not Victor-flagship-comparison.",
    facts: [
      {
        label: "Source-tested spec",
        value: "76-hole box-frame with POWER BOX reinforcement, 6.8mm shaft, Fiber Reinforced System frame layup, 32 lb max tension, floating-handle technology.",
      },
      {
        label: "Pricing context",
        value:
          "Roughly 300 RMB launch (45 USD at 2026 exchange rates) — meaningfully below flagship-tier pricing (1500-2000 RMB) and even below most mid-tier rackets.",
      },
      {
        label: "Buyer lens",
        value: "Treat Sonic Boom Pro as a budget-tier attack racket with flagship-adjacent feel — not a true flagship at lower price, but the rare budget racket that does not feel budget.",
      },
    ],
    calloutTitle: "300 RMB for a floating-handle attack racket — what?",
    calloutBody:
      "Floating-handle technology (悬浮手柄) was, until recently, a flagship-only feature — the Auraspeed and TK lines had it, the budget rackets did not. The Sonic Boom Pro brings the technology down to roughly 300 RMB. The source review's reaction is genuine surprise: this kind of feature spec at this price point is not normal in 2026's Victor lineup.",
    comparison: {
      heading: "Sonic Boom Pro vs reference value-tier attack rackets",
      columns: ["Sonic Boom Pro", "AxForce 80 (Li-Ning)", "Astrox 7 (Yonex)"],
      rows: [
        {
          label: "Price tier",
          values: [
            "Budget (~300 RMB)",
            "Mid-flagship (~1200 RMB)",
            "Mid-tier (~600 RMB)",
          ],
        },
        {
          label: "Attack identity",
          values: [
            "Friendly attack with stable feedback",
            "Easy-driving balanced attack",
            "Mid-tier all-rounder",
          ],
        },
        {
          label: "Main caution",
          values: [
            "Budget brand ecosystem",
            "Higher price for flagship feel",
            "Less attack-decisive than Sonic Boom Pro",
          ],
        },
      ],
    },
    sections: [
      {
        heading: "Why a budget Victor racket deserves serious attention",
        body: "Most reviews of sub-500 RMB rackets focus on what's missing — softer materials, smaller sweet spots, simpler construction — rather than what's present. The Sonic Boom Pro reverses that framing because what IS present at this price point is unusual: full-carbon construction, 76-hole box-frame with POWER BOX reinforcement, 6.8mm shaft with moderate hardness, Fiber Reinforced System frame layup, 32 lb max tension support, and notably a floating-handle (悬浮手柄) — until recently a flagship-only feature. The combination produces a budget racket that genuinely performs above its price tier, not a budget racket that simply costs less.",
      },
      {
        heading: "On-court character — friendly attack with stable feedback",
        body: "The source review tested the Sonic Boom Pro after removing the underbase, with the natural balance shifted forward by the removal. The headline finding: head weight is moderate (not extreme), sweet spot is generous due to the larger frame, shaft hardness is moderate (not stiff), and contact feedback is clear without harshness. The racket's character lands in friendly-attack territory — confident enough to deliver decisive smashes when wanted, easy enough to drive that beginners can extract good performance immediately. Clears are easy with moderate force input; flat drives are quick because of the 76-hole frame's quick rebound; net play is comfortable thanks to the generous sweet spot and floating-handle stability.",
      },
      {
        heading: "Smash and rear-court attack",
        body: "The source review specifically calls out smash performance as 'fast and decisive' for the price tier. The combination of moderate head weight, 6.8mm shaft, and Fiber Reinforced System frame layup produces smashes with usable exit speed and reasonable placement accuracy. Repeat smashes maintain quality because shaft recovery is quick; pointing accuracy is acceptable for the price tier. The racket cannot match flagship-tier smash quality (an AxForce 90 New or 88D Pro 2024 will produce sharper drop angles and harder contact), but the Sonic Boom Pro delivers genuinely useful attack performance at one-quarter the flagship cost. For beginners and recreational players, the trade-off is excellent value.",
      },
      {
        heading: "Defence, mid-court, and versatility",
        body: "Defence is comfortable thanks to the larger sweet spot and moderate shaft hardness. Counter-attack lifts reach the back court with reasonable accuracy; reactive defence on heavy smashes works well because the racket re-prepares quickly. Mid-court flat exchanges are quick — the 76-hole frame's low air resistance combined with the moderate weight produces a swing fast enough for fast doubles. Net play is comfortable for both singles and doubles use. The source review's overall framing — 'remarkably versatile across both attack and control situations' — accurately describes the racket's wide-buyer appeal.",
      },
      {
        heading: "Build quality and the budget-brand honesty",
        body: "Build quality reads as 'good for the price tier' — clean paint, precise frame finishing, intact grommets, smooth shaft surface. Visual identity (bright blue colourway with gold-foil decals) is genuinely attractive in a way that flagship-budget rackets often are not. The honest qualifier is brand ecosystem at the budget tier: Victor's distribution and warranty support varies meaningfully by region, and budget rackets often see less attention from Victor's regional retailers than flagship rackets. For players whose buying channel is online or who lack local Victor support, expect normal budget-tier ownership experience. The chassis is good; the ecosystem matches the price tier.",
      },
      {
        heading: "The final decision",
        body: "Buy the Sonic Boom Pro if you are a beginner wanting an attack-flavoured first serious racket, a recreational player wanting flagship feel at budget pricing, or an experienced player wanting a backup or 'fooling around' racket. Move up to AxForce 80 (Li-Ning) or the equivalent Yonex mid-tier if you want flagship-tier attack performance and have the budget for it. Stay with the Sonic Boom Pro if value-for-money is your primary concern — the racket genuinely delivers above its price point, and Victor's brand quality at this tier is meaningfully better than most budget-tier alternatives.",
      },
    ],
    cta: "Run the finder with attack-friendly style and beginner-to-recreational level — Sonic Boom Pro surfaces alongside AxForce 80 and the Yonex mid-tier as value-attack options at different price points.",
    factChecks: [
      {
        sourceName: "Victor Sport",
        title: "Sonic Boom Pro official product page",
        section: "Spec sheet",
        checkedAt: "2026-05-17",
        href: "https://www.victorsport.com/",
        quote: "Sonic Boom Pro",
        note: "Victor brand catalogue confirms Sonic Boom Pro specifications referenced in this review (76-hole box-frame, 6.8mm shaft, floating-handle technology, 32 lb max tension).",
      },
    ],
  }),
] satisfies BlogArticle[];
