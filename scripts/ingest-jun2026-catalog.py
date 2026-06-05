#!/usr/bin/env python3
"""Add catalog rows + Anta brand for the 2026-06-04 drop (7 reviews).

Rows are needs_review / shaftFlexSource=editor_estimate (community-sourced specs,
not official) and imageless (no brand-CDN ProductImageSource for these). Specs are
taken from the source reviews. Also wires review->product cross-links.
"""
from __future__ import annotations
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PRODUCTS = ROOT / "src/data/products.json"
BRANDS = ROOT / "src/data/brands.json"
REVIEW_MAP = ROOT / "scripts/blog-review-product-map.json"
DATE = "2026-06-05"


def racket(**kw):
    base = {
        "category": "racket",
        "regionAvailability": ["cn", "global"],
        "lastVerifiedAt": DATE,
        "verificationStatus": "needs_review",
        "shaftFlexSource": "editor_estimate",
        "sourceUrls": [],
        "reviewCount": 0,
    }
    base.update(kw)
    return base


def bcn(summary, conf="medium"):
    return [{"source": "badmintoncn", "label": "Community source review (BadmintonCN)",
             "summary": summary, "confidence": conf}]


ROWS = [
    racket(
        id="yy-nanospeed-9900-ltg", name="NanoSpeed 9900 LTG (Green Sword)", brand="Yonex",
        priceUsd=320, headWeight="head_light", shaftFlex="stiff", weightClass="3U",
        weightVariants=["3U"], gripSizes=["G4", "G5"], balanceMm=298, balanceCategory="head_light",
        swingWeightEstimate="fast", commonStringTensionLbs={"min": 20, "max": 28},
        launchYear=2011, regionAvailability=["global", "jp", "cn"],
        officialSourceUrl="https://www.yonex.com/", sourceUrls=["https://www.yonex.com/"],
        minRecommendedLevel="club", maxRecommendedLevel="pro_oriented",
        bestFor=["doubles", "fast_drive", "defense", "collector"],
        editorNote="Rare 2011 London Worlds limited 'Green Sword' (LT green), never reissued; price is an indicative second-hand/collector figure, not retail. Plays like a fast, forgiving head-light speed frame nearer 3.5U; firmer shaft than the standard NS9900. Buy on authenticity/condition.",
        marketSignals=bcn("3U plays close to 3.5U at ~90g fully set up; fast, planted drives and strong defence; smashes are fast and accurate rather than heavy; notably consistent on off days. A grail finish more than a performance upgrade over a modern speed racket."),
    ),
    racket(
        id="yy-voltric-z-force-ltd", name="Voltric Z-Force LTD (2012)", brand="Yonex",
        priceUsd=400, headWeight="head_heavy", shaftFlex="extra_stiff", weightClass="4U",
        weightVariants=["3U", "4U"], gripSizes=["G4", "G5"], balanceMm=300, balanceCategory="head_heavy",
        swingWeightEstimate="medium", commonStringTensionLbs={"min": 20, "max": 27},
        launchYear=2012, regionAvailability=["global", "jp", "cn"],
        officialSourceUrl="https://www.yonex.com/", sourceUrls=["https://www.yonex.com/"],
        minRecommendedLevel="competitive", maxRecommendedLevel="pro_oriented",
        bestFor=["singles", "smash_heavy", "attack", "collector"],
        editorNote="2012 London Olympics limited 'Purple-Gold' Voltric Z-Force LTD; price is an indicative collector figure. The 4U (~88g) is a surprisingly all-court attacker, but the shaft is in Yonex's stiffest historic tier (100ZZ/Astrox 99 class) and unplayable without concentrated whip power; fragile paint. For committed attackers only.",
        marketSignals=bcn("4U/G4 around 88g; fast-accurate smashes plus underrated soft-press and very easy clears; bigger sweet spot than VTZF2. Core flaw is an extremely stiff shaft with a high skill threshold and wrist/shoulder risk if you cannot load it."),
    ),
    racket(
        id="gosen-ryoga-shiden", name="Ryoga Shiden (1st gen)", brand="Gosen",
        priceUsd=250, headWeight="even", shaftFlex="extra_stiff", weightClass="3U",
        weightVariants=["3U"], gripSizes=["G5"], balanceMm=300, balanceCategory="even",
        swingWeightEstimate="fast", commonStringTensionLbs={"min": 22, "max": 28},
        launchYear=2016, regionAvailability=["jp", "cn", "global"],
        officialSourceUrl="https://www.gosen.jp/", sourceUrls=["https://www.gosen.jp/"],
        minRecommendedLevel="competitive", maxRecommendedLevel="pro_oriented",
        bestFor=["fast_drive", "smash_heavy", "attack", "collector"],
        editorNote="Cult first-gen Ryoga Shiden ('Blue-Purple Lightning') with a tapered Zylon/Aermet conical shaft (7.5mm->6.7mm) and Gosen's hardest +3 shaft; price is an indicative collector figure. Extraordinary point-smash and drive feel, but a tiny sweet spot and near-zero tolerance. String choice (hybrid) matters a lot.",
        marketSignals=bcn("3U; best-in-class instant-release point smashes and bullet flat drives, but the smallest sweet spot the reviewer has used and an iron-stiff +3 shaft demanding active, concentrated power. High ceiling, very state-dependent."),
    ),
    racket(
        id="vic-fz-100xx", name="FZ-100XX", brand="Victor",
        priceUsd=78, headWeight="head_heavy", shaftFlex="medium", weightClass="4U",
        weightVariants=["4U"], gripSizes=["G5"], balanceMm=298, balanceCategory="head_heavy",
        swingWeightEstimate="medium", commonStringTensionLbs={"min": 22, "max": 30},
        launchYear=2025, regionAvailability=["cn", "global"],
        officialSourceUrl="https://www.victorsport.com/", sourceUrls=["https://www.victorsport.com/"],
        minRecommendedLevel="club", maxRecommendedLevel="competitive",
        bestFor=["attack", "doubles", "singles", "value"],
        editorNote="Mid-tier value attacker in Victor's FZ sub-line, styled on the Astrox 100ZZ, with a wide fluid box frame, second-gen floating handle and Whip Enhance 3.0. Lower skill floor than a flagship attacker; real smash power for the price. Positioned as a budget Axelsen-style attack racket.",
        marketSignals=bcn("Slight head-heavy box frame with an elastic shaft: easy clears, forgiving big sweet spot, and accessible whip smashes for improving players. Stable under continuous attack; trails dedicated speed rackets only in the very fastest exchanges."),
    ),
    racket(
        id="anta-ah600w", name="AH600W", brand="Anta",
        priceUsd=35, headWeight="even", shaftFlex="flexible", weightClass="5U",
        weightVariants=["4U", "5U"], gripSizes=["G6"], balanceMm=299, balanceCategory="even",
        swingWeightEstimate="fast", commonStringTensionLbs={"min": 24, "max": 26},
        launchYear=2025, regionAvailability=["cn"],
        officialSourceUrl="https://www.anta.com/", sourceUrls=["https://www.anta.com/"],
        minRecommendedLevel="recreational", maxRecommendedLevel="club",
        bestFor=["beginner", "balanced", "lightweight"],
        editorNote="Sportswear brand Anta's first badminton racket: a 5U/G6 (~82g) balanced beginner blade, box frame, 76 holes, strung 24-26 lb. Honest entry-level, likely OEM-built, but surprisingly drivable. Note the AH600 is 4U and the AH600W is 5U - confirm the code before buying.",
        marketSignals=bcn("5U/G6, ~82g in use, 299mm balance, mid-low stiffness: a tidy balanced blade, easy to start, with no borrow deficit and even a little rebound on downward presses. A respectable debut but a low-ceiling stepping-stone.", conf="low"),
    ),
    racket(
        id="bonny-leisu-800-lt", name="Leisu 800 LT", brand="Bonny",
        priceUsd=70, headWeight="head_heavy", shaftFlex="stiff", weightClass="5U",
        weightVariants=["5U"], gripSizes=["G5"], balanceMm=305, balanceCategory="head_heavy",
        swingWeightEstimate="fast", commonStringTensionLbs={"min": 25, "max": 27},
        launchYear=2026, regionAvailability=["cn"],
        officialSourceUrl="http://www.bonny.com/", sourceUrls=["http://www.bonny.com/"],
        minRecommendedLevel="club", maxRecommendedLevel="competitive",
        bestFor=["fast_drive", "attack", "doubles", "speed"],
        editorNote="A clearly named tribute to the discontinued Nanoflare 800 LT: 5U/G5 (~85g), high 305mm balance but fast swing, small box frame. Colourways carry different shafts (nickel-titanium vs boron). Precise, fast continuous attack; the small frame charges an accuracy tax. In-production way to get the NF800LT character.",
        marketSignals=bcn("5U/G5 ~85g, 305mm balance, mid-high stiffness, small box frame: crisp, decisive drives and whip-loaded continuous smashes via the NiTi shaft. Lower damping reduces net/drop confidence; small frame magnifies precision demands on defence."),
    ),
    racket(
        id="mizuno-carbo-pro-825", name="Carbo Pro 825", brand="Mizuno",
        priceUsd=60, headWeight="head_heavy", shaftFlex="medium", weightClass="4U",
        weightVariants=["4U"], gripSizes=["G5"], balanceMm=300, balanceCategory="head_heavy",
        swingWeightEstimate="heavy", commonStringTensionLbs={"min": 20, "max": 26},
        launchYear=2023, regionAvailability=["cn", "global"],
        officialSourceUrl="https://www.mizuno.com/", sourceUrls=["https://www.mizuno.com/"],
        minRecommendedLevel="club", maxRecommendedLevel="competitive",
        bestFor=["attack", "control", "value"],
        editorNote="The softer, stickier sibling to the Carbo Pro 823 (a distinct SKU, not a recolour): 4U/G5 (~94g), thinner rounder fluid box frame, 72 holes. Less-extreme base attacker, more forgiving than the 823 with stronger hold-on-ball; weak front-court flat drives. Restring firmer than the stock string for net feel.",
        marketSignals=bcn("4U/G5 ~94g, 300mm balance, mid-low stiffness: lower power impedance and easier to use than the 823, stable box frame, sticky hold-on-ball aiding slice drops. Better rear-court continuity and defence than the 823; flat drives remain its weakness."),
    ),
]

REVIEW_LINKS = {
    "yonex-nanospeed-9900-ltg-green-sword-review": "yy-nanospeed-9900-ltg",
    "yonex-voltric-z-force-ltd-2012-review": "yy-voltric-z-force-ltd",
    "gosen-ryoga-shiden-review": "gosen-ryoga-shiden",
    "victor-fz-100xx-budget-attack-review": "vic-fz-100xx",
    "anta-ah600w-racket-review": "anta-ah600w",
    "bonny-leisu-800-lt-review": "bonny-leisu-800-lt",
    "mizuno-carbo-pro-825-review": "mizuno-carbo-pro-825",
}

ANTA_BRAND = {
    "id": "anta", "name": "Anta", "nameZh": "安踏", "tier": "tier4",
    "regions": ["cn"], "officialUrl": "https://www.anta.com/", "founded": 1991,
    "country": "China",
    "knownFor": "Major Chinese sportswear group that recently entered badminton rackets. Early models such as the AH600 / AH600W are entry-level frames; the brand's distribution and scale make it one to watch in the category.",
    "knownForZh": "中国大型运动品牌，近期进入羽毛球拍领域。AH600 / AH600W 等早期型号为入门级产品；凭借渠道与规模值得关注。",
    "categoriesCovered": ["racket"],
}


def main():
    products = json.loads(PRODUCTS.read_text(encoding="utf-8"))
    have = {p["id"] for p in products}
    added = [r for r in ROWS if r["id"] not in have]
    products.extend(added)
    PRODUCTS.write_text(json.dumps(products, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    brands = json.loads(BRANDS.read_text(encoding="utf-8"))
    bids = {b.get("id") for b in brands}
    brand_added = ANTA_BRAND["id"] not in bids
    if brand_added:
        brands.append(ANTA_BRAND)
        BRANDS.write_text(json.dumps(brands, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    rmap = json.loads(REVIEW_MAP.read_text(encoding="utf-8"))
    for slug, pid in REVIEW_LINKS.items():
        rmap[slug] = pid
    REVIEW_MAP.write_text(json.dumps(rmap, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    print(json.dumps({
        "rows_added": [r["id"] for r in added],
        "products_total": len(products),
        "anta_brand_added": brand_added,
        "brands_total": len(brands),
        "review_links_added": len(REVIEW_LINKS),
    }, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
