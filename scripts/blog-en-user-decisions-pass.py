#!/usr/bin/env python3
"""Apply user voice decisions: flatten merge tables, level refs, generic timeline, guide tone."""

from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BLOGS = ROOT / "blogs"
MARKER = "## English Translation"

FLATTEN: dict[str, tuple[str, str]] = {
    "reviews-fz-blade-88d-racket.md": (
        "### Where my view shifted\n\n| Topic | First take | Later retest | Why |\n|-------|--------|--------|----------------|\n| Swing weight / identity | Low swing weight, smooth drive—TK-15-like | Substantial 4U offensive all-rounder, strong smash focus | Different string/setup and I baseline |\n| Control on long lines | Box frame stabilises routes | Light body hurts long passive placement precision | Rally type—active vs forced defensive |\n| Name / positioning | 88D label somewhat misleading vs feel | Balanced “purple aura” flagship for most amateurs | Expectation from Astrox 88D comparison vs Forza Power line tuning |\n| Sweet spot | Small-forgiving “steel cannon” | Large effective area for drops and slices | Focus on flat speed vs rear-court leverage |",
        "### How my take evolved\n\nMy first impression was a low swing-weight, smooth-drive frame — almost TK-15-like. After more time with different string setups, it read as a substantial 4U offensive all-rounder with a strong smash focus; the gap mostly came down to stringing and what I was comparing against.\n\nOn long lines the box frame stabilised routes at first. In passive defensive rallies, the lighter body hurt placement precision — it rewards active play more than long forced defence.\n\nThe “88D” label felt slightly misleading next to Astrox 88D expectations. Over time I filed it as Forza Power line tuning: a balanced “purple aura” flagship that suits most amateurs.\n\nSweet spot: early notes called it a small but forgiving “steel cannon” focused on flat speed; later I valued the large effective area for drops and slices when leaning on rear-court leverage.",
    ),
    "reviews-li-ning-axforce-90-new-racket.md": (
        "### Where my view shifted\n\n| Topic | First take | Later retest | Why |\n|-------|--------|--------|----------------|\n| Entry barrier | “No drive threshold”; very easy even when unwell (4U) | “Not beginner friendly”; “high entry difficulty” on 3U | **Weight spec (3U vs 4U/5U)** and player strength |\n| Feel | Soft, gentle, resilient-elastic | Crisp, hard frame, explosive spring | String choice, frame tune perception, review focus |\n| vs AxForce 80 swing weight | Lower than 80 (4U test) | 5U clearly heavier than 80 Muse | **Different 80 variant and weight class** |\n| Doubles | Comprehensive singles/doubles weapon | Struggles in fast mid-court; consider 5U | 3U/4U head-heavy vs 5U speed build |\n| Offence ceiling | Trades AxForce 90 Long/Tiger kill for speed/forgiveness | Still a serious attack racket with firm shaft options | Long and Tiger comparison baseline differs |",
        "### How my take evolved\n\nEntry barrier shifts hard by weight: 4U felt like “no drive threshold” — very easy even when I was unwell. 3U was different — not beginner-friendly, with genuinely high entry difficulty if you lack arm speed.\n\nFeel moved from soft, gentle, and resilient-elastic to crisp, hard-framed explosive spring depending on string choice and how I was evaluating the frame.\n\nvs AxForce 80: 4U tested lower swing weight than 80; 5U landed clearly heavier than 80 Muse — compare the same weight class.\n\nDoubles: first pass called it a comprehensive singles/doubles weapon; longer term, 3U/4U head-heavy builds struggled in fast mid-court — I would steer speed-first doubles players toward 5U.\n\nOffence ceiling: I initially thought it traded AxForce 90 Long/Tiger kill speed for forgiveness; it still holds serious attack credentials with firm shaft options — the Long/Tiger baseline just sets a different bar.",
    ),
    "reviews-li-ning-l66-string.md": (
        "### Where my view shifted\n\n| Topic | First take | Later retest | Why |\n|-------|--------|--------|----------------|\n| Entry barrier | Low; beginners adapt quickly | Clears and four-corner control need solid technique first | Player level and session type |\n| Sound / speed | Explosive, rivals sound strings | Less sharp and slightly slower off the bed than thin gauges | Comparison to 0.63–0.65 mm lines |\n| Feel label | Firm, solid, “hardy” | Excellent elasticity, upper-mid rebound | Focus on feedback vs rebound |",
        "### How my take evolved\n\nBeginners adapted quickly at first, but clears and four-corner control still need solid technique — session type and level matter.\n\nSound and speed felt explosive early, rivalling thin sound strings; against 0.63–0.65 mm gauges it is less sharp and slightly slower off the bed.\n\nFeel label: “firm, solid, hardy” on first hits; longer use brought out excellent elasticity and upper-mid rebound — feedback vs rebound depends on what you focus on.",
    ),
    "reviews-victor-a970-nitro-lite-shoes.md": (
        "### Where my view shifted\n\n| Topic | First take | Later retest | Why |\n|-------|--------|--------|----------------|\n| Weight vs ACE | NitroLite midsole is lighter technology | Whole shoe ~6 g heavier per shoe | Thicker midsole and upper stack offset foam gains |\n| Launch vs ACE | Difference modest in real play | Noticeably slower and less court feel | Forefoot stack increase and my sensitivity |\n| Pro adoption | Many singles stars wear it | Not ideal for extreme speed seekers | Role as cushioned all-around flagship vs speed niche |",
        "### How my take evolved\n\nOn paper NitroLite foam is lighter tech than ACE, but the finished shoe runs ~6 g heavier per side — thicker midsole and upper stack eat the gain.\n\nLaunch vs ACE felt modest at first; after more sessions the forefoot stack made steps noticeably slower with less court feel.\n\nMany singles pros wear it; for extreme speed seekers it is a cushioned all-around flagship, not a pace shoe.",
    ),
    "reviews-victor-auraspeed-99-racket.md": (
        "### Where my view shifted\n\n| Topic | First take | Later retest | Why |\n|-------|--------|--------|----------------|\n| Stiffness vs official rating | Level-9 label feels **less extreme than expected**; elastic, not punishing at first touch | **Stiff**, one grade harder than Ryuga 2 Pro; near-max hardness; small deflection | Shoulder injury / wrist-only test vs full-power loading; adaptation over sessions |\n| Entry barrier | Minor flaw only for **low-power** players; broadly recommended to hard-spring fans | **Hard for beginners**; high self-imposed difficulty; early clears fall short | Player level (~4-minus cited) and time on racket |\n| Speed vs attack identity | Described primarily as a **speed racket** with excellent defence | **Almost not a pure speed frame**; attack-cap raised vs Auraspeed 90K Metallic; speed \"not the main trait anymore\" | Comparison baseline (Hypersonic / Auraspeed 90K Metallic) vs standalone first impressions |\n| Passive defence | Defence \"needs little explanation\" on drives/blocks | Passive pickup **not Hypersonic-nimble**; passive rear lift **very hard** | Active vs passive scenarios |\n| vs Auraspeed 90K Metallic | Natural successor in the tech-max tradition (after DriveX 12 impression) | **Not a simple Auraspeed 90K Metallic upgrade**—richer feel layers, different speed connotation | DriveX 12 / Auraspeed 90K Metallic owner expectations |\n| Flat drives vs siblings | Among the fastest flat-drive experiences tested | Ranks **third** behind Hypersonic and Auraspeed 90K Metallic in flat drive/block trio test | Head-feel stiffness vs choked-handle agility |\n| Continuous smash comfort | Milder feedback than Auraspeed 90K Metallic; WES 3.0 comfort second to Hypersonic Free Core | Still **demanding** on form; force not always fully transferred before shuttle leaves | Perfect vs average contact quality |",
        "### How my take evolved\n\nStiffness: the level-9 label felt less extreme than expected at first touch — elastic, not punishing. Full-power sessions (vs early wrist-only testing after shoulder trouble) showed a stiff frame one grade harder than Ryuga 2 Pro, near-max hardness with small deflection.\n\nEntry: minor flaw for low-power players in early notes; over time it is hard for beginners — high self-imposed difficulty and early clears fall short unless you already hit with authority.\n\nIdentity: first pass labelled it a speed racket with excellent defence. Side-by-side with Hypersonic and Auraspeed 90K Metallic, it is almost not a pure speed frame — attack capacity rises vs 90K Metallic and speed is no longer the main trait.\n\nPassive defence: active drives and blocks need little explanation; passive pickup is not Hypersonic-nimble and passive rear lifts are very hard.\n\nvs Auraspeed 90K Metallic: not a simple tech-max successor if you come from DriveX 12 / 90K Metallic expectations — richer feel layers, different speed connotation.\n\nFlat drives: among the fastest in isolation; in a Hypersonic / 90K Metallic / AS99 trio it ranks third — head-feel stiffness vs choked-handle agility.\n\nContinuous smashes: milder feedback than 90K Metallic with WES 3.0 comfort second to Hypersonic Free Core, but still demanding on form — force is not always fully transferred before the shuttle leaves on average contact.",
    ),
    "reviews-victor-auraspeed-hs-plus-racket.md": (
        "### Where my view shifted\n\n| Topic | First take | Later retest | Why |\n|-------|--------|--------|----------------|\n| Frame upper third | Useful hold for net spin | Hard to control for hard flat players | Contact zone and playing style |\n| Overall vs JS-10 | More stable post-swing | Still same small-sweet burden | Same head size, different WES generation |\n| Singles suitability | Usable if you have power | Rear-court specialist only | Stamina and sweet-spot accuracy |",
        "### How my take evolved\n\nThe upper third of the frame helps net spin hold at first; hard flat players may find that zone hard to control — contact point and style matter.\n\nvs JS-10: more stable post-swing but the same small-sweet-spot burden — same head size, different WES generation.\n\nSingles: usable if you have power early on; longer term it fits rear-court specialists with stamina and sweet-spot accuracy.",
    ),
    "reviews-victor-p8500-ii-shoes.md": (
        "### Where my view shifted\n\n| Topic | First take | Later retest | Why |\n|-------|--------|--------|----------------|\n| Breathability | Never stuffy over month of long sessions | Poor once summer heat hits despite vents | Climate, session length, sensitivity |\n| Forefoot wrap | Slightly unfilled but fine in play | Secure full-foot wrap on U 2.5E | Lacing tension and foot volume |\n| Eagle Claw TPU | Effective anti-roll in match play | Soft under pressure; creases over time | Expectation of rigid TPU vs comfort-led design |\n| Launch | Sharp enough with HyperEVA at ~314 g | Lacks court feel vs speed shoes | Comparison baseline (P9600 vs A970 ACE vs speed models) |\n| Grip | Reliable across mats and wood | Occasional slip on deceptive front-back steps | Footwork situation and fatigue |",
        "### How my take evolved\n\nBreathability was fine over a month of long sessions until summer heat — climate, session length, and personal sensitivity all weigh in.\n\nForefoot wrap felt slightly unfilled initially; on U 2.5E with adjusted lacing it became a secure full-foot wrap.\n\nEagle Claw TPU worked in match play at first; under pressure it runs soft and creases over time — expect comfort-led design, not rigid anti-roll TPU.\n\nLaunch felt sharp enough at ~314 g with HyperEVA vs P9600; compared with A970 ACE and true speed models it lacks court feel.\n\nGrip held on mats and wood; deceptive front-back steps under fatigue can still slip.",
    ),
    "reviews-yonex-astrox-100zz-and-100zx.md": (
        "### Where my view shifted\n\n| Topic | First take | Later retest | Why |\n|-------|--------|--------|----------------|\n| Shaft sensation (4U navy) | Easier than DZS/AX99 but \"nothing else stunned me\" | Famous elasticity; anti-torsion breakthrough builds confidence | Expectation vs incremental gain; my strength level |\n| Drive threshold | 4U manageable; defence is the surprise highlight | Most scenes feel hard to fully drive; 3U especially tiring | **3U vs 4U** and technique level |\n| Backhand comfort | Among best \"Z\" defence; lift with confidence | Flexible feel without obvious drive; escapes land mid-court | Active vs passive defence; string setup |\n| 100ZX difficulty | Mid-price \"easier\" alternative imagined | Harder to handle than Astrox 100ZZ despite lower price | Swing weight **89–90 vs 85–85.5** |\n| Doubles fit | Excellent net intercept and continuity weapon | High swing-weight offence loses flat-drive races vs speed frames | Opponent level and role (front vs rear) |\n| Axelsen vs Kurenai | Lighter, faster, doubles-friendly | Theoretical smash/placement edge on Kurenai barely perceptible | Small shaft-hardness gap; similar swing weights when strung |\n| Sweet-spot adaptation | Vertical extension still demands adjustment from DZS | By 2025, homage frames lowered the hurdle | Experience timeline and reference frames |",
        "### How my take evolved\n\n4U navy shaft: easier than DZS/AX99 at first without a clear wow moment; elasticity and anti-torsion confidence built over time — expectation vs incremental gain and my strength level.\n\nDrive threshold: 4U manageable with defence as the surprise highlight; most scenes get hard to fully drive over time, 3U especially tiring — weight spec and technique.\n\nBackhand: among the best “Z” defences early; passive lifts can feel flexible without obvious drive and escapes land mid-court — string setup and active vs passive defence.\n\n100ZX: imagined as a mid-price easier alternative; swing weight 89–90 vs 85–85.5 on ZZ makes it harder to handle despite lower price.\n\nDoubles: excellent net intercept and continuity weapon; high swing-weight offence loses flat-drive races vs speed frames depending on opponent level and front vs rear role.\n\nAxelsen vs Kurenai: Kurenai lighter and doubles-friendly in theory; smash/placement edge barely perceptible — small shaft-hardness gap, similar strung swing weights.\n\nSweet spot: vertical extension still demands adjustment from DZS; by 2025 homage frames lowered the hurdle as reference frames evolved.",
    ),
    "reviews-yonex-astrox-88s-88d-pro-new-color.md": (
        "### Where my view shifted\n\n| Topic | First take | Later retest | Why |\n|-------|--------|--------|----------------|\n| 88D Pro new colour feel | Scattered, sluggish offence | Lighter swing, better chains than camel gold | Player level and prior 88D experience |\n| 88S Pro playability | Best overall feedback vs D | Less fun than gen-one sparse-hole 88S Pro | Preference for concentration vs manipulation |\n| Primary recommendation | 88S Pro for most | 88D Pro for versatility | Singles/doubles role and smash style |\n| Adaptation | S Pro easy to love quickly | S Pro net rush causes frequent frame hits early | Stroke length change (670 mm) |\n\nEvery player’s feel differs—the above merges published personal experiences only.",
        "### How my take evolved\n\n88D Pro new colour felt scattered and sluggish on offence at first; more court time and prior 88D experience brought a lighter swing and better chains than camel gold.\n\n88S Pro had the best overall feedback vs D early on; vs gen-one sparse-hole 88S Pro I eventually found it less fun — concentration vs manipulation preference.\n\nRecommendation shifted: 88S Pro for most at first, 88D Pro for versatility once smash style and singles/doubles role settled.\n\nAdaptation: S Pro felt easy to love quickly, but net rush at 670 mm length caused frequent frame hits early — stroke length takes time.",
    ),
}

GLOBAL_REPLACEMENTS: list[tuple[str, str]] = [
    (
        r"I have been playing badminton seriously for several years across club nights in Ireland, Singapore, and China — around division 4 / mid-club level \(roughly BadmintonCN level 4\)\.",
        "I have been playing badminton seriously for several years across club nights in Ireland, Singapore, and China — around division 4 club level.",
    ),
    (
        r"Nine years ago at the Rio Olympics, when Chen Long held the N55 and used his steel-wall defence and powerful counterattacks to crush Lee Chong Wei's Olympic gold dream with two 21-18 sets, the badminton youth who had been sighing the day before because Lin Dan narrowly lost to Lee Chong Wei in the semifinals was no longer disappointed because of this tall player in all-red Li-Ning gear\. It was he who reclaimed that precious men's singles gold medal from Lee Chong Wei's hands, winning another Olympic gold for our country and demonstrating the strength and style of a great sporting nation\.\n\nAt that moment, this low-key champion was already on par with Lin-Lee in my heart, becoming the savior hero in a youth's eyes—only later did I learn he had already won World Championship gold two years in a row, and took bronze at the 2012 London Olympics, defending the glory of the Chinese national badminton team with his strength\.\n\nChen Long's equipment was another key that guided me to explore the badminton world\. At the 2021 Tokyo Olympics, this 32-year-old veteran held the AxForce 80, wore the classic red-gold AYAE001 shoes, and relied on his signature defensive counterattack to step by step fight his way into the final past the rising power attacker Lee Zii Jia, the ageless actor Chou Tien Chen, and the speed-maximised Indonesian cannon Anthony Ginting\. Carrying the major debuff of blisters on his feet, facing peak-form Viktor Axelsen, he took this hard-won Olympic silver with a 15-21, 12-21 score—his third Olympic medal, completing the Olympic gold-silver-bronze set and retiring in fulfillment\. In those years, the Chinese Dragon shouldered the load, maintaining international competitiveness with the immortal legend of the steel wall, writing the glorious legend of our country's men's singles!\n\nThough already a veteran, he could still achieve such high honors while carrying injuries—could it be thanks to this new weapon, the AxForce 80\? Having long used entry-level rackets, I grew more and more interested in Li-Ning rackets and equipment\. The enticing appeal of new series and strong curiosity led me, in my expansion phase, to wear down my mother for days, and I finally spent 1150 yuan to buy my first racket of my own, the same model as my idol—the AxForce 80\. And my connection with Li-Ning equipment began from there\.\.\.\n\nThis Chen Long same-model weapon was not just a weapon, but a key opening the door to the world of Li-Ning equipment—after that, I successively paid high launch prices out of my own pocket to experience the violent offence of AxForce 100, the precise control of Halbertec 8000 and 9000, and the speed aesthetics of Bladex 900 New\. If not for national team veterans proving these rackets' excellence with results, I might never have discovered that Chinese brands have quietly been writing a new legend in badminton equipment\.",
        "Chen Long at Rio 2016 — N55, steel-wall defence, two 21-18 sets against Lee Chong Wei — was the match that made me pay attention to Li-Ning gear. I only learned later he had already won back-to-back world titles and Olympic bronze in London.\n\nTokyo 2021 cemented it: AxForce 80, defensive counterattack through Lee Zii Jia, Chou Tien Chen, and Anthony Ginting, silver against peak Axelsen. That was enough for me to save up and buy my first proper frame — an AxForce 80, same model as my idol. That purchase opened the door to AxForce 100, Halbertec 8000 and 9000, and Bladex 900 New over the years. Without national-team results proving the line, I might not have taken Chinese-brand frames seriously as early as I did.",
    ),
    (r"At university, natural prices spiked", "Years ago, when natural shuttles spiked in price"),
    (r"When I was living in China,", "Years ago,"),
    (
        r"My men's doubles partner \(around mid 3\+ club level\)",
        "A club player at Zhongyu level 3+",
    ),
    (
        r"My men's doubles partner \(Zhongyu level 3\+[^\)]*\)",
        "A club player at Zhongyu level 3+",
    ),
    (r"On BadmintonCN, the mixed doubles pairs", "In forum discussion, the mixed doubles pairs"),
    (r"Thanks to BadmintonCN and Li-Ning official", "Thanks to the forum trial and Li-Ning official"),
    (r"First — massive thanks to BadmintonCN for the rare L69 trial", "First — massive thanks to the forum trial for the rare L69 trial"),
    (r"perfect slot for the BadmintonCN L69", "perfect slot for the forum-trial L69"),
    (r"BadmintonCN got me onto Li-Ning L69", "The forum trial got me onto Li-Ning L69"),
    (r"thanks again to BadmintonCN and everyone reading", "thanks again to everyone reading"),
    (r"Mention BadmintonCN for \*\*5 yuan off\*\*", "Mention the forum for **5 yuan off**"),
    (r"Level feels a touch under BadmintonCN level 4 but above 3 — call it 3\.5\.", "Level feels upper-intermediate — a touch below division 4 club form on the day, but above casual club play."),
    (r"Related reading: BadmintonCN unboxing Li-Ning Halbertec 7000\.", "Related reading: forum unboxing of Li-Ning Halbertec 7000."),
    (r"Thanks to the BadmintonCN community test", "Thanks to the community test"),
    (r"At roughly BadmintonCN 4-minus level,", "At roughly division 4 club level,"),
    (r"\bmid 3\+ on BadmintonCN\b", "Zhongyu level 3+"),
    (r"\b~mid 3\+ club level\b", "Zhongyu level 3+"),
    (r"\(division 4 in Ireland\)", ""),
    (r"I recommends\b", "I recommend"),
]


def apply_global(en: str) -> tuple[str, int]:
    n = 0
    for pat, repl in GLOBAL_REPLACEMENTS:
        new, c = re.subn(pat, repl, en)
        if c:
            n += c
            en = new
    return en, n


def main() -> None:
    total = 0
    for path in sorted(BLOGS.glob("*.md")):
        text = path.read_text(encoding="utf-8")
        if MARKER not in text:
            continue
        zh, en = text.split(MARKER, 1)
        fixes = 0
        if path.name in FLATTEN:
            old, new = FLATTEN[path.name]
            if old in en:
                en = en.replace(old, new, 1)
                fixes += 1
            else:
                print(f"WARN: flatten block not found in {path.name}")
        en, n = apply_global(en)
        fixes += n
        if fixes:
            path.write_text(zh + MARKER + en, encoding="utf-8")
            total += fixes
            print(f"{path.name}: {fixes} change(s)")
    print(f"Done. {total} total changes.")


if __name__ == "__main__":
    main()
