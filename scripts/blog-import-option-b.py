#!/usr/bin/env python3
"""
Import blogs/*.md English sections into src/data/blog-articles.json (Option B).
Preserves existing blogSlugs / URLs. Strips URLs, images, Chinese. 20-pass QA.
"""

from __future__ import annotations

import json
import os
import re
import textwrap
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
_blogs_raw = os.environ.get("BLOGS_DIR", "").strip()
BLOGS = Path(_blogs_raw) if _blogs_raw else ROOT / "blogs"
if not BLOGS.is_absolute():
    BLOGS = ROOT / BLOGS
LEGACY_TS = ROOT / "scripts/archive/blog.legacy.ts"
SLUG_MAP = ROOT / "scripts/blog-slug-source-map.json"
REVIEW_MAP = ROOT / "src/data/blog-review-product-map.json"
CANONICAL = ROOT / "scripts/blog-translation-canonical-names.json"
GLOSSARY_PAGE = ROOT / "src/app/guides/glossary/page.tsx"
OUT_JSON = ROOT / "src/data/blog-articles.json"
REPORT = ROOT / "scripts/blog-import-option-b-report.json"

MARKER = "## English Translation"
PASSES = 20

# Original site editorials — keep legacy TS bodies, not forum sources
LEGACY_ONLY = {
    "racket-balance-vs-swing-speed",
    "how-to-read-badminton-reviews",
    "beginner-racket-mistakes",
    "badminton-string-selector",
    "badminton-shoe-fit-stability",
    "badminton-bag-loadout",
    "used-racket-depreciation",
    "badminton-equipment-for-kids",
    "badminton-glossary-terms-every-player-should-know",
    "yonex-grip-sizes-explained",
    "how-to-choose-a-badminton-racket",
}

"""
Slugs knowingly left on the auto-title-cased fallback.

These are NOT "we forgot" — each one has an unresolved editorial problem where
inventing a tidy headline would launder a factual error into something that
looks authoritative. Leaving the title visibly broken keeps the problem on the
backlog. Remove a slug from here only together with the underlying fix.
"""
TITLE_FALLBACK_QUARANTINE = {
    # Near-duplicate of fz-forza-88d-review: 99% token overlap, and
    # blog-slug-source-map.json shows both are generated from the same
    # reviews-fz-blade-88d-racket.md. That source says the shaft reads "Forza
    # AERO POWER 88D" with a Danish national team badge and strings it with
    # Forza-65, so the racket is FZ Forza's. The catalogue's "Victor FZ
    # sub-brand" claim appears to come from the reviewer's Victor comparison
    # points (WES 3.0, TK-15) rather than from the racket.
    #
    # NOT retired yet, because consolidating it needs a catalogue decision this
    # script cannot make: vic-fz-88d-power-purple is $115 and is a live pick on
    # /best/head-heavy-rackets-under-150/, while fz-forza-88d is $175 and would
    # be ineligible for that page. Two other rows (vic-fz-flash-1000,
    # vic-fz-100xx) share the same "Victor FZ" premise, so the brand question is
    # bigger than this one racket. Resolve the brand and the price, then retire.
    "victor-fz-88d-power-purple-review",
}
# yonex-power-cushion-88-dial-3-review was resolved 2026-08-02: it carried an
# Aerus Z2 review. Its source file is review-yonex-shbaz2mex-shoes.md, SHBAZ2MEX
# is Yonex's code for the Power Cushion Aerus Z2, the body names "AZ2" outright
# and lists three Aerus colourways, and it never mentions a dial or the number
# 88. Republished as yonex-aerus-z2-shoes-review.


def fallback_title(slug):
    """Title-case a slug, but only for slugs we have consciously quarantined.

    The old unconditional `slug.replace("-", " ").title()` fallback silently
    produced 67 published headlines with mangled model names — "Subaxia Gt",
    "Auraspeed 90K Ii", "Rsl At70", "Drivex 10". Because it never failed, the
    breakage was invisible until it showed up in Search Console. Now any new
    slug without a TITLE_OVERRIDES entry stops the import.
    """
    if slug not in TITLE_FALLBACK_QUARANTINE:
        raise SystemExit(
            f"blog-import: no TITLE_OVERRIDES entry for '{slug}'.\n"
            f"  Auto-title-casing mangles model names (e.g. 'Gt' for 'GT'), so\n"
            f"  add a hand-written title to TITLE_OVERRIDES in this file.\n"
            f"  If the article has an unresolved factual problem that makes a\n"
            f"  clean title dishonest, add it to TITLE_FALLBACK_QUARANTINE\n"
            f"  with a comment explaining what needs resolving first."
        )
    return slug.replace("-", " ").title()


# Keep legacy editorial bodies when markdown would duplicate another live slug.
LEGACY_PREFERRED = {
    "victor-drivex-12-vs-astrox-88d-pro",
    "li-ning-thunder-100-gen-2-vs-gen-1",
}

TITLE_OVERRIDES = {
    # --- Sprint 131: titles that were falling through to slug.title() ---
    # Every entry below replaces an auto-title-cased headline that mangled the
    # product's own name ("Subaxia Gt", "90K Ii", "Drivex 10", "Rsl At70").
    # Brand casing is the point: these are the exact strings players type into
    # Google, and the top page here was carrying 139 clicks/quarter with the
    # model name spelled wrong.
    # "GT" is not a trim level — it is Yonex's GRPHT THRTTL (Graphite Throttle)
    # midsole tech, confirmed on yonex.com/graphite-throttle. Both titles say so,
    # because "subaxia gt review" and "yonex grpht thrttl review" are separate
    # live query clusters that should each land on the right page.
    "yonex-subaxia-gt-shoes-review": "Yonex Power Cushion Subaxia GT review: Graphite Throttle in a badminton shoe",
    "yonex-grpht-thrttl-training-shoe-review": "Yonex GRPHT THRTTL (Graphite Throttle) review: the concept cross-trainer",
    # Was published as a "Power Cushion 88 Dial 3" review. It never was one —
    # see the note on TITLE_FALLBACK_QUARANTINE below.
    "yonex-aerus-z2-shoes-review": "Yonex Power Cushion Aerus Z2 review: the 240 g speed boot, three colourways",
    "li-ning-axforce-100-gen-2-vs-gen-1": "Li-Ning AxForce 100 Gen 2 vs Gen 1: a lower entry bar, same ceiling",
    "li-ning-axforce-90-new-5u-deep-dive": "Li-Ning AxForce 90 New 5U deep dive: the light build that still bites",
    "victor-drivex-12-zsw-vs-original-comparison": "Victor DriveX 12 ZSW vs original: Nanjing build against Taiwan build",
    "victor-auraspeed-90k-ii-review": "Victor Auraspeed 90K II review: Antonsen's speed pillar, updated",
    "li-ning-axforce-90-new-review": "Li-Ning AxForce 90 New review: faster and far more forgiving",
    "kawasaki-chocolate-88d-vs-yonex-astrox-88d-pro": "Kawasaki Chocolate 88D vs Yonex Astrox 88D Pro: near-identical on court",
    "yonex-nanoflare-700-pro-vs-nf700-800-pro-1000z": "Nanoflare 700 Pro vs 700, 800 Pro and 1000Z: which speed frame fits",
    "yonex-nanoflare-nextage-review": "Yonex Nanoflare NEXTAGE review: soft, fast, and short on threat",
    "yonex-nanoflare-800-pro-tour-review": "Yonex Nanoflare 800 Pro and Tour review: the Pro badge tested",
    "asics-blast-ff-3-badminton-shoes-review": "ASICS Blast FF 3 badminton review: no carbon plate, no problem",
    "yonex-astrox-88s-tour-curious-review": "Yonex Astrox 88S Tour review: fun frame, hard-to-justify price",
    "yonex-astrox-99-pro-gen-1-review": "Yonex Astrox 99 Pro Gen 1 review: where the 99 family turned serious",
    "victor-drivex-12-vs-drivex-10-and-88d-pro-2024": "Victor DriveX 12 vs DriveX 10 and Astrox 88D Pro: Victor's best shaft yet",
    "kumpoo-kh-g805-lite-pro-shoes-review": "Kumpoo KH-G805 LITE PRO review: three weeks as a main match shoe",
    "yonex-astrox-nextage-review": "Yonex Astrox NEXTAGE review: a staged experiment, not a revolution",
    "victor-drivex-10-review": "Victor DriveX 10 METALLIC review: control leaning attack, firm and fast",
    "rsl-at70-racket-review": "RSL AT70 review: a flagship-tier singles weapon outside the big three",
    "li-ning-lt66-power-string-review": "Li-Ning LT66 Power string review: the coated 0.66 mm power variant",
    "li-ning-bladex-880-shida-racket-review": "Li-Ning Bladex 880 Shida review: a signature edition with real upgrades",
    "yonex-nanoflare-700-review": "Yonex Nanoflare 700 review: the frame that started the Nanoflare line",
    "li-ning-bladex-arrow-review": "Li-Ning Bladex Arrow (Bladex EX) review: the entry-advanced Bladex",
    "yonex-arcsaber-7-play-review": "Yonex Arcsaber 7 Play review: how much Arcsaber survives the Play tier",
    "kawasaki-h2-6u-superlight-racket-review": "Kawasaki H2 6U review: superlight done without gutting the frame",
    "rsl-supreme-shuttle-review": "RSL Supreme shuttle review: a real step up from RSL Classic?",
    "victor-thruster-hwql-nuke-review": "Victor Thruster HWQL review: a blunt, effective mid-range kill racket",
    "bonny-wind-shadow-budget-speed-shoes-review": "Bonny Wind Shadow review: dual carbon plates on a sub-200-yuan budget",
    "li-ning-bladesabre-2-pro-shoes-review": "Li-Ning Bladesabre 2 Pro review: lighter, softer fast-launch shoe",
    "kawasaki-glacier-800-racket-review": "Kawasaki Glacier 800 review: budget frame from a weekend buying spree",
    "kumpoo-js-67-string-review": "Kumpoo JS-67 string review: what the ice-blue 0.67 mm line actually does",
    "victor-thruster-sr-cherry-blossom-review": "Victor Thruster SR Cherry Blossom review: paint job or real racket?",
    "victor-fz-flash-1000-racket-review": "Victor FZ Flash 1000 review: speed-type swing at a mid-tier price",
    "li-ning-gp100-pro-overgrip-review": "Li-Ning GP100 Pro overgrip review: budget dry grip, honestly tested",
    "kawasaki-star-cross-second-perspective-review": "Kawasaki Star Cross review: a high-end speed-offence frame, second look",
    "victor-sonic-boom-pro-budget-attack-review": "Victor Sonic Boom Pro review: broad, stable attack just north of 300 yuan",
    "victor-thruster-falcon-review": "Victor Thruster F Falcon Ultra review: a full upgrade on Black Gold",
    "bonny-zhangui-dao-8888ax-ultra-review": "Bonny Zhangui Dao 8888AX Ultra review: high-end balance without ego specs",
    "yonex-arcsaber-7-pro-review": "Yonex Arcsaber 7 Pro review: light, stable control for doubles front court",
    "bonny-snake-breath-second-tier-flagship-review": "Bonny Snake's Breath review: a self-developed flagship, not a clone",
    "victor-jetspeed-12-curious-review": "Victor Jetspeed 12 review: a doubles classic that earned its reputation",
    "victor-thruster-9900-curiosity-review": "Victor Thruster K 9900 review: the small-frame cult racket revisited",
    "li-ning-l66-string-first-look": "Li-Ning L66 string first look: a balanced 0.66 mm answer to BG65",
    "bonny-wuque-xuanwu-review": "Bonny Wuque Xuanwu review: nine months on from the factory's promise",
    "bonny-mojun-vs-arcsaber-11-pro-attack-racket-review": "Bonny Mojun vs Yonex Arcsaber 11 Pro: does the benchmark hold up?",
    "bonny-wuque-1982-y3k-shoes-review": "Bonny Wuque 1982 Y3K review: cyberpunk paint on a classic platform",
    "bonny-carbon-armour-shoes-review": "Bonny Carbon Armour shoes review: quick notes after a long stint",
    "kumpoo-js-65-string-review": "Kumpoo JS-65 string review: the 0.65 mm durability line, honestly",
    "bonny-wuque-flagship-088-shoes-review": "Bonny Wuque 088 review: a flagship court tool with no obvious weak point",
    "jujiang-lbtu-value-racket-review": "JuJiang LBTU review: the value advanced frame I keep recommending",
    "bonny-phantom-100-racket-review": "Bonny Phantom 100 review: solid craft without the luxury markup",
    "bonny-future-land-3-polaris-shoes-review": "Bonny Future Land III Polaris review: an all-round stable court shoe",
    "gosen-kyokugen-racket-review": "Gosen Kyokugen review: a big-three-grade frame from outside the big three",
    "bonny-baidi-800lt-racket-review": "Bonny Baidi 800LT review: Nanoflare 800 LT feel without the price",
    "anta-dingyin-1000-racket-review": "Anta Dingyin 1000 review: the first retail frame marketed with Toray M46X",
    "jujiang-mzs-66un-string-review": "JuJiang MZS-66UN string review: second-tier hype, first-tier questions",
    "goshen-leiming-69-string-review": "Gosen Leiming 69 string review: a beginner's honest first impression",
    "kawasaki-twilight-shoes-review": "Kawasaki Twilight shoes review: dial fit and carbon anti-torsion, tested",
    "chengong-feng-racket-review": "Chengong Feng review: a secondary brand chasing the Nanoflare 1000Z lane",
    "kawasaki-crimson-blade-racket-review": "Kawasaki Crimson Blade review: strong tech at a borrowed-gear price",
    "li-ning-bladex-500-pro-curious-review": "Li-Ning Bladex 500 Pro review: a rare honest Pro upgrade",
    "victor-jipo-ls-racket-review": "Victor Jipo LS review: the racket I reached for in a bad patch",
    "victor-yinbao-a-boom-shoes-review": "Victor A-BOOM review: the lazy player's 300-yuan staple shoe",

    "yonex-nanoflare-1000z-review": "Yonex Nanoflare 1000 Z review: speed flagship with real control",
    "yonex-nanoflare-1000z-play-review": "Nanoflare 1000 Z vs 1000 Play: speed flagship vs entry tier",
    "rsl-no4-plus-shuttle-review": "RSL No.4 Plus shuttle: mixed-feather upgrade that misses",
    "li-ning-halbertec-7000-review": "Li-Ning Halbertec 7000 review: balanced control with a stiff edge",
    "li-ning-halbertec-flagship-lineup-review": "Li-Ning Halbertec 5000–9000 lineup: where control peaks",
    "yonex-nanoflare-800-pro-vs-nf700": "Nanoflare 800 Pro vs Nanoflare 700: speed upgrade or lost sweetness?",
    "yonex-aerosensa-50-shuttle-review": "Yonex Aerosensa 50 shuttle: premium flight half a step beyond AS-40",
    "yonex-comfort-z3-shoes-review": "Yonex Power Cushion Comfort Z3: cushion-first match shoe",
    "li-ning-halbertec-8000-vs-9000-vs-9000-power": "Li-Ning Halbertec 8000 vs 9000 vs 9000 Power: which one fits your game",
    "victor-yu-12-racket-review": "Victor DriveX 12 review: control players finally have a Victor flagship",
    # The URL keeps the legacy Anders Antonsen string, but the page is the
    # standard Astrox 100ZZ against its 100ZX sibling. The VA-versus-Kurenai
    # comparison moved to yonex-astrox-100zz-axelsen-va-vs-kurenai, which is
    # the slug the product map already points at the VA catalogue row.
    "yonex-astrox-100zz-anders-antonsen-vs-va-vs-kurenai": "Yonex Astrox 100ZZ vs 100ZX: the Hyper Slim flagship and its Taiwan sibling",
    "li-ning-okay-1-shuttle-review": "Li-Ning OKAY 1 review: Li-Ning's first synthetic feather shuttle",
    "victor-c90-ii-shoes-review": "Victor C90 II review: wide last, heavy stability, flagship cushion",
    "li-ning-bladex-800-speed-review": "Li-Ning Bladex 800 Speed review: tight M46X speed twin",
    "li-ning-bladex-800-power-review": "Li-Ning Bladex 800 Power review: the lubricated attack twin",
    "li-ning-aeronaut-8000d-review": "Li-Ning Aeronaut 8000D review: the overlooked windstorm hammer",
    "kumpoo-kh-g815-dragon-claw-shoes-review": "Kumpoo KH-G815 Dragon Claw review: ventilated speed flagship",
    "kumpoo-silver-blade-shoes-review": "Kumpoo Silver Blade review: dial lock, maximum ventilation",
    "mizuno-carbo-pro-823-review": "Mizuno Carbo Pro 823 review: the stick in the naughty-kid happy meal",
    "li-ning-mirage-ii-pro-shoes-review": "Li-Ning Mirage II Pro review: pure speed, racing mode only",
    "victor-vbs70-string-review": "Victor VBS-70 review: durable string that wakes up at high tension",
    "gosen-raimei-58-string-review": "Gosen Raimei 58 review: thin-string pleasure with a short honeymoon",
    "gosen-raimei-62-string-review": "Gosen Raimei 62 review: niche 0.62 mm built for control",
    "decathlon-920d-racket-review": "Decathlon 920D review: plain French frame that plays sweeter than it looks",
    "rsl-tourney-l7-shuttle-review": "RSL Tourney L7 review: custom shape, silly value",
    "li-ning-g100s-shuttle-review": "Li-Ning G100S review: goose single-side for training, not matches",
    "bonny-infinity-002-shoes-review": "Bonny Infinity 002 review: training shoe that covers club nights",
    "babolat-satelite-blast-racket-review": "Babolat Satelite Blast review: controversial flagship, mid-tier soul",
    "li-ning-axforce-10-beginner-attack-review": "Li-Ning AxForce 10 review: beginner offence without the scare",
    "li-ning-saga-ii-se-shoes-review": "Li-Ning Saga II SE review: mid-tier cushion with real ankle lock",
    "li-ning-aeronaut-9000c-racket-review": "Li-Ning Aeronaut 9000C review: older Combat flagship that still hits",
    "victor-vbs-63-string-review": "Victor VBS-63 review: high-spring thin string that demands timing",
    "yonex-exbolt-68-string-review": "Yonex EXBOLT 68 review: hard attack string with friendlier damping",
    "kawasaki-nezer-19-ii-racket-review": "Kawasaki Nezer 19 II review: stiffer sequel with a higher drive bar",
    "bonny-lunar-8-racket-review": "Bonny Lunar 8 review: firmer Crescent Moon speed-attack frame",
    "victor-thruster-k-30-pro-racket-review": "Victor Thruster K 30 Pro review: little Onigiri Pro still slams",
    "yonex-exbolt-63-string-review": "Yonex EXBOLT 63 review: crisp thin attack string that lasts",
    "yonex-bg80-string-review": "Yonex BG80 review: classic hard attack string that still sets the bar",
    "victor-thruster-ryuga-ii-pro-racket-review": "Victor Thruster Ryuga II Pro review: controlled dragon attack frame",
    "victor-thruster-ryuga-metallic-racket-review": "Victor Thruster Ryuga Metallic review: black-dragon smash ceiling",
    "victor-thruster-ryuga-racket-review": "Victor Thruster Ryuga review: gen 1 original smash hammer",
    "victor-thruster-hmrl-ex-racket-review": "Victor Thruster HMRL EX review: light entry Hammer Light refresh",
    "li-ning-axforce-100-max-racket-review": "Li-Ning AxForce 100 MAX review: expert trim above Gen 2",
    "li-ning-li-jian-dual-pack-racket-review": "Li-Ning Li Jian dual-pack review: beginner gift set, not Bladex Arrow",
    "kumpoo-beimo-racket-review": "Kumpoo Beimo review: mid attack blank that needs a real string",
    "kawasaki-kace-shoes-review": "Kawasaki KACE review: Master flagship that finally braces like a tournament shoe",
    "li-ning-invincible-ace-shoes-review": "Li-Ning Invincible ACE review: stability flagship, snow-camo edition",
    "li-ning-axforce-100-gen-2-review": "Li-Ning AxForce 100 Gen 2 review: offensive peak with a wider audience",
    "li-ning-thunder-2-pro-shoes-review": "Li-Ning Thunder 2 Pro shoes: tough cushion, natural wrap",
    "victor-vbs-66n-string-review": "Victor VBS-66N string: durable thin all-rounder",
    "li-ning-axforce-cannon-racket-review": "Li-Ning AxForce Cannon review: entry attack stick that can play",
    "victor-drivex-12-zsw-racket-review": "Victor DriveX 12 ZSW review: Zheng Siwei whip-first Drive flagship",
    "victor-drivex-12-vs-zsw-vs-arc11-halbertec-8000": "DriveX 12 vs ZSW: with Arcsaber 11 Pro and Halbertec 8000 context",
    "li-ning-axforce-100-gen-1-review": "Li-Ning AxForce 100 Gen 1 review: offensive peak champagne flagship",
    "li-ning-axforce-70-racket-review": "Li-Ning AxForce 70 review: M40X attack for club continuity",
    "li-ning-axforce-70-vs-80-vs-90": "AxForce 70 vs 80 vs 90 Dragon Max: where the wolf sits",
    "li-ning-axforce-90-dragon-max-review": "Li-Ning AxForce 90 Dragon Max review: thin-shaft flagship attack",
    "li-ning-axforce-90-dragon-max-dragon-vs-tiger": "AxForce 90 Dragon Max: Dragon vs Tiger colourways",
    "li-ning-axforce-90-dragon-max-vs-astrox-100zz": "AxForce 90 Dragon Max vs Astrox 100ZZ: attack and continuity",
    "li-ning-bladex-900-new-vs-nanoflare-1000z": "Bladex 900 New vs Nanoflare 1000 Z: hard-fast vs soft speed",
    "li-ning-bladex-900-new-vs-1000z-auraspeed-falcon-se": "Bladex 900 New vs 1000 Z, Auraspeed, and Falcon SE",
    "li-ning-halbertec-5000-racket-review": "Li-Ning Halbertec 5000 review: soft-balance control stick",
    "li-ning-halbertec-9000-standalone-review": "Li-Ning Halbertec 9000 review: control peak with real pace",
    "li-ning-halbertec-9000-power-deep-dive": "Li-Ning Halbertec 9000 Power review: control peak with attack efficiency",
    "li-ning-no-1-string-review": "Li-Ning No. 1 string: cheap thin repulsion pioneer",
    "li-ning-bladex-900-new-review": "Li-Ning Bladex 900 New review: speed peak with usable stability",

    "victor-auraspeed-hs-plus-deep-dive": "Victor Auraspeed HS Plus: the speed racket that turned into a smash weapon",
    "victor-auraspeed-hs-plus-attack-review": "Victor Auraspeed HS Plus attack review: WES 3.0 doubles weapon",
    # --- Sprint 132: the five duplicate-source pairs, split ---
    # Each of these slugs used to render a sibling's body with a one-line
    # disambiguation prefix bolted on. They now have their own source markdown,
    # so the titles describe what the page actually contains.
    #
    # The 100ZZ pair splits along the product map: the legacy Antonsen URL is
    # wired to `yy-astrox-100zz` and covers the standard flagship and the
    # 100ZX, while the Axelsen URL is wired to `yy-astrox-100zz-va` and is now
    # a review of that variant rather than a second copy of the same article.
    "yonex-astrox-100zz-axelsen-va-vs-kurenai": "Yonex Astrox 100ZZ VA review: the Axelsen edition against Kurenai",
    # Gen 2 is a distinct catalogue product (`yy-astrox-99-pro-2`, 2023) and no
    # longer shares the gen-1 source. The old title said only "Astrox 99 Pro",
    # which is what made the two pages indistinguishable in the SERP.
    "yonex-astrox-99-pro-2-deep-dive": "Yonex Astrox 99 Pro (gen 2) review: same violence, lower entry fee",
    "yonex-astrox-99-pro-3-deep-dive": "Yonex Astrox 99 Pro (gen 3): violence with clearer control",
    "yonex-arcsaber-7-tour-review": "Yonex Arcsaber 7 Tour review: the value pick of the Arcsaber 7 line",
    "rsl-aero-u-shuttle-review": "RSL Aero U shuttle review: late-rally consistency in a tube",
    "yonex-astrox-88-pro-2024-review": "Yonex Astrox 88S / 88D Pro (2024): refined twins, not a radical reboot",
}

DEK_OVERRIDES = {
    "victor-yu-12-racket-review": "DriveX 12 gets Victor's full control-focused rebuild: alloy carbon, WES 3.0, and a firmer all-court feel.",
    "yonex-astrox-100zz-anders-antonsen-vs-va-vs-kurenai": "The Astrox 100ZZ against the 100ZX: Hyper Slim shaft, measured builds, and why the cheaper sibling is the harder racket to handle.",
    # Sprint 132 — deks for the five split pairs. Each of these pages used to
    # inherit its sibling's opening paragraph, so the meta description in the
    # SERP was identical on both URLs of the pair.
    "li-ning-axforce-90-new-5u-deep-dive": "The 5U AxForce 90 New keeps the 4U shaft hardness and drops the head mass. What that buys in fast doubles, and how it compares with the 3U and 4U builds.",
    "yonex-astrox-100zz-axelsen-va-vs-kurenai": "Volume Cut Resin instead of Black Micro Core makes the VA a lighter-swinging 100ZZ. Measured builds, shaft hardness, and whether Kurenai is still worth it.",
    "victor-auraspeed-hs-plus-deep-dive": "Victor's hardest shaft in a small aero frame: specs, WES 3.0 construction, on-court character across every phase, and where the Auraspeed badge misleads.",
    "victor-auraspeed-hs-plus-attack-review": "A near-even speed frame that smashes from shaft whip rather than head mass — what it out-hits, what it costs to drive, and when the attack case breaks down.",
    "yonex-astrox-99-pro-2-deep-dive": "The 2023 Astrox 99 Pro keeps the head weight and the intent, and lowers the power you need to reach them. How gen 2 sits between the original Pro and gen 3.",
    # Without this the dek is the first sentence of the generation-context
    # paragraph, so the meta description opens "Generation context:" — scaffold
    # language in the SERP snippet.
    "yonex-astrox-99-pro-gen-1-review": "The first Astrox 99 Pro: a 68-hole bed, a weighted handle and almost no forgiveness. Why it built the line's reputation, and why gen 2 exists.",
    # Expanded thin pages: without an override these deks are the first 160
    # characters of the overview with an ellipsis bolted on, which is what
    # ships as the meta description. Written deks instead.
    "li-ning-halbertec-5000-racket-review": "Halbertec 5000 is the cheapest way into Li-Ning's control family: flexible shaft, easy clears, low arm load, and no headline trait — which is rather the point.",
    "li-ning-halbertec-9000-standalone-review": "The base Halbertec 9000 is head-light, stiff and built for flat drives — and it is not the 9000 Power. Specs, line comparison, and who each version suits.",
    "rsl-aero-u-shuttle-review": "RSL's Aero U is a BWF-approved goose-feather shuttle whose case is late-rally consistency: thicker vanes, cleaner second-half flight, speed 77.",
    "yonex-arcsaber-7-tour-review": "Arcsaber 7 Tour sits between Play and Pro, and it is the one most club players should buy. Measured specs, the tier ladder, and where it gives way.",
    "yonex-astrox-99-pro-3-deep-dive": "The third-generation Astrox 99 Pro returns to 76 holes with full-racket Namd. A rear-court hammer with a stamina cost — and how it stacks up against the 100ZZ.",
    "yonex-comfort-z3-shoes-review": "Comfort Z3 trades 130 g against the Aerus Z2 for landing protection that lasts a full evening. Weight, break-in, fit, and where it sits in the Z3 trio.",
}

# Prepended to the overview when two slugs would otherwise share identical JSON bodies.
SLUG_DISAMBIGUATION: dict[str, str] = {
    # Sprint 132 removed four entries from this table. A disambiguation prefix
    # is a patch over two slugs sharing one markdown file; once each slug has
    # its own source and opens by saying what it covers, the prefix is a second
    # copy of the first paragraph. Removed along with the shared sources:
    # li-ning-axforce-90-new-5u-deep-dive, yonex-astrox-99-pro-gen-1-review,
    # victor-auraspeed-hs-plus-attack-review, and the Axelsen 100ZZ URL.
    #
    # This one stays because the URL still carries a name the article does not:
    # the slug says Anders Antonsen and the page is about the standard 100ZZ.
    "yonex-astrox-100zz-anders-antonsen-vs-va-vs-kurenai": "This URL keeps a legacy Anders Antonsen slug for continuity — it is not an Antonsen signature racket. The VA edition has its own review.",
    # rsl-aero-classic-tourney-shuttle-review no longer needs a disambiguation
    # prefix: rsl-aero-u-shuttle-review now has its own source markdown
    # (review-rsl-aero-u-shuttle.md) instead of sharing the Classic Tourney
    # file, and both articles open by placing themselves in RSL's range.
    "li-ning-halbertec-7000-review": "Original Halbertec 7000 (2023) — not the Halbertec 7000 II refresh review.",
    "li-ning-halbertec-flagship-lineup-review": "Halbertec 5000 through 9000 lineup compare — not the standalone Halbertec 9000 product review.",
    "yonex-nanoflare-800-pro-vs-nf700": "Head-to-head Nanoflare 800 Pro vs Nanoflare 700 — not the multi-model 800 Pro/Tour/Game review.",
    "fz-forza-88d-review": "Forza 88D under the FZ brand line — separate from Victor's FZ 88D Power Purple variant review.",
    "li-ning-bladex-800-speed-vs-halbertec-9000-power": "Head-to-head Bladex 800 Speed vs Halbertec 9000 Power — not the standalone 9000 Power deep dive.",
}

VOICE_FIXES = [
    (r"\bTiGe XLab\b", ""),
    (r"\bTiGe\b(?!\s)", ""),
    (r"\bBadmintonCN\b", "the forum"),
    (r"\bthe author\b", "I"),
    (r"\bthe reviewer\b", "I"),
    (r"\bthe I\b", "I"),
    (r"\btesters?\b", "I"),
    (r"\breviewers?\b", "I"),
    (r"\bFor I\b", "For me"),
    (r"\bWhat makes I more\b", "What makes me more"),
    (r"\bI's level\b", "my level"),
    (r"\bthe same I cohort\b", "the same review cohort"),
    (r"\bI's specific notes\b", "My specific notes"),
    (r"\bI specifically reports\b", "I specifically report"),
    (r"\bFor me's\b", "For my"),
    (r"\bEven I who\b", "Even I, who"),
    (r"\bsurprised I\b(?![a-z])", "surprised me"),
    (r"\bHalberd\b", "Halbertec"),
    (r"\bThunder 100\b", "AxForce 100"),
    (r"\bAerus III Pro\b", "Saga III Pro"),
    (r"https?://\S+", ""),
    (r"\[([^\]]+)\]\([^)]+\)", r"\1"),
    (r"!\[[^\]]*\]\([^)]+\)", ""),
    (r"[\u4e00-\u9fff]+", ""),
    (r"\(\s*\)", ""),
]


def load_glossary() -> list[tuple[str, str]]:
    src = GLOSSARY_PAGE.read_text(encoding="utf-8")
    return re.findall(r'id:\s*"([^"]+)",\s*term:\s*"([^"]+)"', src)


def load_canonical() -> list[tuple[str, str]]:
    if not CANONICAL.exists():
        return []
    data = json.loads(CANONICAL.read_text(encoding="utf-8"))
    pairs = []
    if isinstance(data, dict):
        for wrong, right in data.items():
            if isinstance(right, str):
                pairs.append((wrong, right))
    return sorted(pairs, key=lambda x: -len(x[0]))


def grab_field(chunk: str, field: str) -> str:
    fm = re.search(rf'{field}:\s*"((?:[^"\\]|\\.)*)"', chunk)
    if not fm:
        return ""
    raw = fm.group(1)
    return raw.replace('\\"', '"').replace("\\n", "\n").replace("\\'", "'")


def parse_legacy_articles() -> dict[str, dict]:
    src = LEGACY_TS.read_text(encoding="utf-8")
    articles: dict[str, dict] = {}
    chunk_re = re.compile(
        r'\{\s*slug:\s*"([^"]+)"[\s\S]*?(?=\{\s*slug:\s*"|]\s*,\s*zh:|\]\s*,?\s*\}\s*;)',
    )
    for m in chunk_re.finditer(src):
        chunk = m.group(0)
        slug = m.group(1)
        title = grab_field(chunk, "title")
        dek = grab_field(chunk, "dek")
        updated = re.search(r'updatedAt:\s*"([^"]+)"', chunk)
        updated_at = updated.group(1) if updated else "2026-05-24"
        sections = []
        for sm in re.finditer(
            r'heading:\s*"((?:[^"\\]|\\.)*)"\s*,\s*body:\s*"((?:[^"\\]|\\.)*)"',
            chunk,
        ):
            sections.append(
                {
                    "heading": sm.group(1).replace('\\"', '"').replace("\\n", "\n"),
                    "body": sm.group(2).replace('\\"', '"').replace("\\n", "\n"),
                }
            )
        intro = grab_field(chunk, "intro")
        if intro and not sections:
            sections = [{"heading": "Overview", "body": intro}]
        elif intro and sections:
            sections[0]["body"] = intro + " " + sections[0]["body"]
        verdict = grab_field(chunk, "verdict")
        if not verdict:
            rs = re.search(
                r'reviewSummary:\s*\{[\s\S]*?verdict:\s*"((?:[^"\\]|\\.)*)"',
                chunk,
            )
            if rs:
                verdict = rs.group(1).replace('\\"', '"').replace("\\n", "\n")
        articles[slug] = {
            "title": title,
            "dek": dek,
            "updatedAt": updated_at,
            "verdict": verdict,
            "sections": sections,
        }
    return articles


def extract_english(path: Path) -> str:
    text = path.read_text(encoding="utf-8")
    if MARKER not in text:
        return ""
    return text.split(MARKER, 1)[1].strip()


def parse_md_updated_at(path: Path) -> str | None:
    text = path.read_text(encoding="utf-8")
    parts = text.split("---", 2)
    if len(parts) < 2:
        return None
    m = re.search(r'updatedAt:\s*"([^"]+)"', parts[1])
    return m.group(1) if m else None


def strip_markdown_inline(text: str) -> str:
    text = re.sub(r"\*\*([^*]+)\*\*", r"\1", text)
    text = re.sub(r"\*([^*]+)\*", r"\1", text)
    text = re.sub(r"`([^`]+)`", r"\1", text)
    return text


def clean_prose(text: str) -> str:
    text = strip_markdown_inline(text)
    for pat, repl in VOICE_FIXES:
        text = re.sub(pat, repl, text, flags=re.I)
    for wrong, right in load_canonical():
        text = text.replace(wrong, right)
    text = re.sub(r"\n{3,}", "\n\n", text)
    text = re.sub(r"  +", " ", text)
    text = re.sub(r" +\n", "\n", text)
    return text.strip()


def normalize_heading(heading: str, body: str) -> tuple[str, str]:
    heading = heading.strip()
    if (
        len(heading) > 72
        or heading.count(".") >= 1
        or heading.startswith("*")
        or re.search(r"\b(I|my|the)\b", heading, re.I)
        and len(heading.split()) > 8
    ):
        merged = f"{heading}\n\n{body}".strip() if body else heading
        return "Overview", merged
    return heading or "Overview", body


def merge_overview_sections(sections: list[dict[str, str]]) -> list[dict[str, str]]:
    overviews: list[str] = []
    rest: list[dict[str, str]] = []
    for sec in sections:
        if sec["heading"].lower() in {"overview", "introduction"}:
            overviews.append(sec["body"])
        else:
            rest.append(sec)
    if not overviews:
        return sections
    return [{"heading": "Overview", "body": "\n\n".join(overviews)}] + rest


def sentence_dek(body: str, limit: int = 165) -> str:
    """Build a dek that ends on a full stop instead of mid-word.

    The dek is this site's meta description, so it is the sentence Google shows
    under the title in the SERP. The old rule was `body[:160] + "…"`, which cut
    63% of articles (130 of 205) mid-sentence — the top page ended on "what a
    pro badminton shoe built on that idea might look like…". Snippets that
    break off mid-thought read as machine-generated and cost clicks on a site
    already converting at ~2.2%.

    Take whole sentences while they fit. Fall back to a word boundary with an
    ellipsis only when the very first sentence is longer than the budget.
    """
    text = " ".join(body.split()).strip()
    if not text:
        return ""
    if len(text) <= limit:
        return text

    sentences = [s for s in re.split(r"(?<=[.!?])\s+", text) if s.strip()]
    out = ""
    for sentence in sentences:
        candidate = f"{out} {sentence}".strip() if out else sentence
        if len(candidate) > limit:
            break
        out = candidate
    if out:
        return out

    # First sentence alone blows the budget — cut on a word, never mid-word.
    clipped = text[:limit].rsplit(" ", 1)[0].rstrip(",;:—-")
    return f"{clipped}…"


def ensure_dek(dek: str, sections: list[dict[str, str]], title: str) -> str:
    dek = dek.strip()
    if len(dek) >= 50:
        return dek
    blob = " ".join(s["body"] for s in sections[:3])
    sentences = [s.strip() for s in re.split(r"(?<=[.!?])\s+", blob) if len(s.strip()) > 20]
    candidate = " ".join(sentences[:2])[:220].strip()
    if len(candidate) >= 50:
        return candidate
    return f"{title}. {candidate}".strip()[:240]



def _assert_no_duplicate_override_keys() -> None:
    """Fail if TITLE_OVERRIDES or DEK_OVERRIDES declares a slug twice.

    Python resolves a duplicate dict key by silently keeping the last one, so a
    merge that brings two branches' overrides together can drop a hand-written
    title with no error anywhere. That happened during the 2026-08-02
    integration: two slugs ended up declared twice, and only a manual read of
    the merged file caught it. Cheap to check, expensive to miss.
    """
    source = Path(__file__).read_text(encoding="utf-8")
    for name in ("TITLE_OVERRIDES", "DEK_OVERRIDES", "SLUG_DISAMBIGUATION"):
        # Tolerates an inline type annotation, e.g. `NAME: dict[str, str] = {`.
        header = re.search(rf"^{name}(?::[^=]+)? = {{$", source, re.M)
        if header is None:
            raise SystemExit(f"blog-import: could not locate {name} to check")
        start = header.start()
        end = source.index("\n}", start)
        keys = re.findall(r'^\s{4}"([^"]+)":', source[start:end], re.M)
        duplicates = sorted({k for k in keys if keys.count(k) > 1})
        if duplicates:
            raise SystemExit(
                f"blog-import: {name} declares these slugs more than once: "
                f"{', '.join(duplicates)}.\n"
                f"  Python keeps only the last one, so an earlier hand-written\n"
                f"  entry would be dropped silently. Delete the stale line."
            )


_assert_no_duplicate_override_keys()


def parse_md_table(body: str) -> tuple[str, dict | None]:
    if "|" not in body:
        return body, None

    lines_all = body.split("\n")
    table_lines = [
        line.strip()
        for line in lines_all
        if "|" in line
        and line.strip()
        and not re.match(r"^\|?\s*-+", line.strip())
    ]
    if len(table_lines) < 2:
        return body, None

    rows_raw: list[list[str]] = []
    for line in table_lines:
        cells = [cell.strip() for cell in line.strip("|").split("|")]
        if any(cells):
            rows_raw.append(cells)
    if len(rows_raw) < 2 or len(rows_raw[0]) < 2:
        return body, None

    header = rows_raw[0]
    data_rows = []
    for row in rows_raw[1:]:
        if len(row) < len(header):
            continue
        data_rows.append({"label": row[0], "values": row[1:]})
    if not data_rows:
        return body, None

    first_table_idx = next(
        i
        for i, line in enumerate(lines_all)
        if "|" in line and line.strip() and not re.match(r"^\|?\s*-+", line.strip())
    )
    last_table_idx = max(
        i
        for i, line in enumerate(lines_all)
        if "|" in line and line.strip() and not re.match(r"^\|?\s*-+", line.strip())
    )
    intro = "\n".join(lines_all[:first_table_idx]).strip()
    outro = "\n".join(lines_all[last_table_idx + 1 :]).strip()
    summary_parts = [
        intro,
        f"Compared {len(data_rows)} rows across {', '.join(header[1:])}.",
        outro,
    ]
    summary = "\n\n".join(part for part in summary_parts if part)

    comparison = {
        "caption": header[0] or "Comparison",
        "columns": header[1:],
        "rows": data_rows,
    }
    return summary, comparison


def apply_disambiguation(slug: str, sections: list[dict[str, str]]) -> None:
    intro = SLUG_DISAMBIGUATION.get(slug)
    if not intro or not sections:
        return
    if intro in sections[0]["body"]:
        return
    sections[0]["body"] = f"{intro}\n\n{sections[0]['body']}"


def split_sections(en: str) -> tuple[list[dict[str, str]], dict | None]:
    if not en:
        return [], None
    # Markdown headings
    if re.search(r"\n#{1,3}\s+", en):
        parts = re.split(r"\n(?=#{1,3}\s+)", en)
    else:
        # Plain-text headings: short standalone lines between blank lines
        parts = []
        blocks = re.split(r"\n\n+", en.strip())
        i = 0
        while i < len(blocks):
            block = blocks[i].strip()
            if (
                i + 1 < len(blocks)
                and "\n" not in block
                and len(block) <= 72
                and not block.endswith(".")
                and not block.startswith("|")
                and block.lower() not in {"overview", "introduction"}
            ):
                parts.append(block + "\n\n" + blocks[i + 1])
                i += 2
                continue
            parts.append(block)
            i += 1
    sections = []
    comparison: dict | None = None
    for part in parts:
        part = part.strip()
        if not part:
            continue
        lines = part.split("\n")
        if lines[0].startswith("#"):
            heading = re.sub(r"^#+\s*", "", lines[0]).strip()
            body = "\n".join(lines[1:]).strip()
        elif "\n" in part:
            heading = lines[0].strip()
            body = "\n".join(lines[1:]).strip()
        else:
            heading = "Overview"
            body = part
        body = clean_prose(body)
        heading = clean_prose(heading)
        heading, body = normalize_heading(heading, body)
        if not body:
            continue
        if "|" in body:
            parsed_body, table = parse_md_table(body)
            body = parsed_body
            if table and comparison is None:
                comparison = table
        sections.append({"heading": heading or "Overview", "body": body})
    sections = merge_overview_sections(sections)
    merged: list[dict[str, str]] = []
    for sec in sections:
        if (
            merged
            and sec["heading"].lower() in {"overview", "introduction"}
            and merged[-1]["heading"].lower() == sec["heading"].lower()
        ):
            merged[-1]["body"] = merged[-1]["body"] + "\n\n" + sec["body"]
        else:
            merged.append(sec)
    return merged, comparison


def extract_verdict(sections: list[dict[str, str]], dek: str) -> str:
    for key in ("verdict", "summary", "bottom line", "overall", "conclusion"):
        for s in sections:
            if key in s["heading"].lower() and len(s["body"]) > 40:
                return s["body"][:320].rsplit(".", 1)[0] + "." if len(s["body"]) > 320 else s["body"]
    if sections:
        first = sections[0]["body"]
        sentences = re.split(r"(?<=[.!?])\s+", first)
        if sentences:
            return sentences[0][:280]
    return dek[:200] if dek else ""


def attach_glossary(sections: list[dict[str, str]], glossary: list[tuple[str, str]]) -> None:
    full = " ".join(s["body"] for s in sections).lower()
    for sid, term in glossary:
        pat = re.compile(r"\b" + re.escape(term.lower()) + r"\b")
        if len(pat.findall(full)) >= 3:
            sections[0].setdefault("glossaryLinks", [])
            links = sections[0]["glossaryLinks"]
            if not any(l["id"] == sid for l in links):
                links.append({"term": term, "id": sid})


def audit_article(slug: str, article: dict) -> list[str]:
    issues = []
    blob = json.dumps(article).lower()
    if "tige xlab" in blob or "badmintoncn" in blob:
        issues.append("channel attribution remnant")
    if re.search(r"https?://", blob):
        issues.append("URL leaked")
    if re.search(r"[\u4e00-\u9fff]", blob):
        issues.append("CJK in English")
    if re.search(r"\btesters?\b", blob) and "how-to-read-badminton-reviews" not in slug:
        issues.append("third-person voice")
    if re.search(r"\breviewers?\b", blob) and slug != "how-to-read-badminton-reviews":
        issues.append("third-person voice")
    if re.search(r"\bthe author\b", blob):
        issues.append("third-person author")
    if re.search(r"\*\*[^*]+\*\*", blob):
        issues.append("markdown bold leaked")
    if len(article.get("dek", "")) < 50:
        issues.append("dek too short")
    if not article.get("title"):
        issues.append("missing title")
    if not article.get("sections"):
        issues.append("empty sections")
    if not article.get("verdict"):
        issues.append("missing verdict")
    for pat in (r"source-to-buyer", r"fact-check snapshot", r"why this source"):
        if pat in blob:
            issues.append(f"editorial scaffold: {pat}")
    if re.search(r"\bI's specific\b", blob):
        issues.append("persona corruption: I's")
    if re.search(r"\bWhat makes I more\b", blob):
        issues.append("persona corruption: What makes I")
    return [f"{slug}: {i}" for i in issues]


def apply_audit_fixes(article: dict) -> int:
    n = 0
    for key in ("title", "dek", "verdict", "cta"):
        if key in article and isinstance(article[key], str):
            new = clean_prose(article[key])
            if new != article[key]:
                article[key] = new
                n += 1
    for sec in article.get("sections", []):
        for field in ("heading", "body"):
            new = clean_prose(sec.get(field, ""))
            if new != sec.get(field):
                sec[field] = new
                n += 1
    return n


def main() -> None:
    if not LEGACY_TS.exists():
        raise SystemExit(f"Missing {LEGACY_TS} — copy src/lib/blog.ts to blog.legacy.ts first")

    slug_map: dict[str, str | None] = json.loads(SLUG_MAP.read_text(encoding="utf-8"))
    for s in LEGACY_ONLY:
        slug_map[s] = None

    slugs = json.loads((ROOT / "scripts/blog-slugs-list.json").read_text(encoding="utf-8"))
    sprint_path = ROOT / "scripts/blog-main-sprint-articles.json"
    sprint_by_slug: dict[str, dict] = {}
    if sprint_path.exists():
        for art in json.loads(sprint_path.read_text(encoding="utf-8")):
            sprint_by_slug[art["slug"]] = art

    legacy = parse_legacy_articles()
    glossary = load_glossary()
    review_map: dict[str, str] = {}
    if REVIEW_MAP.exists():
        review_map = {
            k: v
            for k, v in json.loads(REVIEW_MAP.read_text(encoding="utf-8")).items()
            if isinstance(v, str)
        }
    articles = []
    report = {"date": str(date.today()), "passes": [], "articles": len(slugs)}

    for slug in slugs:
        meta = legacy.get(slug, {})
        sprint_meta = sprint_by_slug.get(slug, {})
        source_file = slug_map.get(slug)
        sections: list[dict] = []
        comparison: dict | None = None
        md_updated: str | None = None
        use_legacy = slug in LEGACY_ONLY or slug in LEGACY_PREFERRED
        if source_file and not use_legacy and (BLOGS / source_file).exists():
            md_path = BLOGS / source_file
            md_updated = parse_md_updated_at(md_path)
            en = extract_english(md_path)
            sections, comparison = split_sections(en)
        if not sections and sprint_meta.get("sections"):
            sections = [
                {"heading": clean_prose(s["heading"]), "body": clean_prose(s["body"])}
                for s in sprint_meta["sections"]
            ]
        if not sections:
            sections = [
                {"heading": s["heading"], "body": clean_prose(s["body"])}
                for s in meta.get("sections", [])
            ]
        title = (
            TITLE_OVERRIDES.get(slug)
            or sprint_meta.get("title")
            or meta.get("title")
            or fallback_title(slug)
        )
        raw_dek = (
            DEK_OVERRIDES.get(slug)
            or (
                sentence_dek(sections[0]["body"])
                if md_updated and sections and not DEK_OVERRIDES.get(slug)
                else None
            )
            or sprint_meta.get("dek")
            or meta.get("dek")
            or (sentence_dek(sections[0]["body"]) if sections else "")
        )
        dek = ensure_dek(raw_dek, sections, title)
        verdict_from_sections = extract_verdict(sections, dek)
        verdict = (
            verdict_from_sections
            if any("verdict" in s["heading"].lower() for s in sections)
            else sprint_meta.get("verdict")
            or meta.get("verdict")
            or verdict_from_sections
        )
        verdict = clean_prose(verdict)
        apply_disambiguation(slug, sections)
        attach_glossary(sections, glossary)
        article: dict = {
            "slug": slug,
            "updatedAt": md_updated or sprint_meta.get("updatedAt") or meta.get("updatedAt", "2026-05-24"),
            "title": clean_prose(title),
            "dek": clean_prose(dek),
            "verdict": verdict,
            "sections": sections,
            "cta": sprint_meta.get("cta")
            or meta.get("cta")
            or "Not sure which racket or shoe fits your game? Try the finder quiz.",
        }
        if comparison:
            article["comparison"] = comparison
        if review_map.get(slug):
            article["relatedReviewProductId"] = review_map[slug]
        if sprint_meta.get("methodology"):
            article["methodology"] = clean_prose(sprint_meta["methodology"])
        if sprint_meta.get("factChecks"):
            article["factChecks"] = sprint_meta["factChecks"]
        articles.append(article)

    for pass_num in range(1, PASSES + 1):
        fixes = 0
        issues: list[str] = []
        for art in articles:
            fixes += apply_audit_fixes(art)
            issues.extend(audit_article(art["slug"], art))
        report["passes"].append({"pass": pass_num, "fixes": fixes, "issues": len(issues), "samples": issues[:5]})
        if pass_num >= 16 and issues:
            report["passes"][-1]["all_issues"] = issues

    OUT_JSON.parent.mkdir(parents=True, exist_ok=True)
    OUT_JSON.write_text(json.dumps(articles, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    report["final_issue_count"] = report["passes"][-1]["issues"]
    REPORT.write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"articles": len(articles), "issues": report["final_issue_count"], "out": str(OUT_JSON)}, indent=2))


if __name__ == "__main__":
    main()
