#!/usr/bin/env python3
"""Ingest Jul 2026 review drop: slug maps, products, blog.ts slugs."""

from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

SOURCE_MAP = ROOT / "scripts/blog-slug-source-map.json"
SLUGS_LIST = ROOT / "scripts/blog-slugs-list.json"
BLOG_TS = ROOT / "src/lib/blog.ts"
PRODUCTS = ROOT / "src/data/products.json"
REVIEW_MAP = ROOT / "src/data/blog-review-product-map.json"

SOURCE_UPDATES = {
    "li-ning-okay-1-shuttle-review": "review-li-ning-okay-1-shuttle.md",
    "victor-c90-ii-shoes-review": "review-victor-c90-ii-shoes.md",
    "li-ning-bladex-800-speed-review": "review-li-ning-bladex-800-speed-racket.md",
    "li-ning-bladex-800-power-review": "review-li-ning-bladex-800-power-racket.md",
    "li-ning-aeronaut-8000d-review": "review-li-ning-aeronaut-8000d-racket.md",
    "mizuno-carbo-pro-823-review": "review-mizuno-carbo-pro-823-racket-quirky.md",
    "kumpoo-kh-g815-dragon-claw-shoes-review": "review-kumpoo-kh-g815-dragon-claw-shoes.md",
    "kumpoo-silver-blade-shoes-review": "review-kumpoo-silver-blade-shoes.md",
}

REVIEW_PRODUCT_UPDATES = {
    "li-ning-okay-1-shuttle-review": "ln-okay-1-shuttle",
    "victor-c90-ii-shoes-review": "vic-c90-ii",
    "li-ning-bladex-800-speed-review": "ln-bladex-800-speed",
    "li-ning-bladex-800-power-review": "ln-bladex-800-power",
    "li-ning-aeronaut-8000d-review": "ln-aeronaut-8000d",
    "mizuno-carbo-pro-823-review": "mizuno-carbo-pro-823",
    "kumpoo-kh-g815-dragon-claw-shoes-review": "kumpoo-kh-g815",
    "kumpoo-silver-blade-shoes-review": "kumpoo-silver-blade",
}

NEW_PRODUCTS = [
    {
        "id": "ln-okay-1-shuttle",
        "category": "shuttle",
        "name": "OKAY 1 Synthetic Shuttle",
        "brand": "Li-Ning",
        "priceUsd": 7,
        "shuttleType": "synthetic_feather",
        "speedRating": "medium",
        "durabilityRating": "high",
        "launchYear": 2026,
        "regionAvailability": ["cn", "sg", "asia"],
        "officialSourceUrl": "https://www.lining.com.cn/",
        "lastVerifiedAt": "2026-07-04",
        "verificationStatus": "needs_review",
        "minRecommendedLevel": "recreational",
        "maxRecommendedLevel": "club",
        "bestFor": ["club_training", "durability", "budget_sessions"],
        "sourceUrls": ["https://bbs.badmintoncn.com/"],
        "editorNote": "Li-Ning's first 14-feather synthetic shuttle. Training and club tier — not premium natural replacement.",
        "reviewCount": 0,
    },
    {
        "id": "vic-c90-ii",
        "category": "shoes",
        "name": "C90 II",
        "brand": "Victor",
        "priceUsd": 165,
        "weightClass": "standard",
        "launchYear": 2026,
        "regionAvailability": ["cn", "sg", "asia", "global"],
        "officialSourceUrl": "https://www.victorsport.com/",
        "lastVerifiedAt": "2026-07-04",
        "verificationStatus": "needs_review",
        "minRecommendedLevel": "club",
        "maxRecommendedLevel": "pro_oriented",
        "bestFor": ["wide_feet", "stability", "cushion"],
        "sourceUrls": ["https://bbs.badmintoncn.com/"],
        "editorNote": "Victor C90 II flagship stability shoe — 2.5U wide last, nitrogen foam + HYPEREVA, large L-S.S. brace.",
        "reviewCount": 0,
    },
    {
        "id": "ln-bladex-800-power",
        "category": "racket",
        "name": "Bladex 800 Power (锋影 800 Power)",
        "brand": "Li-Ning",
        "priceUsd": 240,
        "headWeight": "even",
        "shaftFlex": "medium",
        "weightClass": "4U",
        "weightVariants": ["3U", "4U"],
        "gripSizes": ["G5", "G6"],
        "balanceMm": 303,
        "balanceCategory": "even",
        "swingWeightEstimate": "medium",
        "commonStringTensionLbs": {"min": 21, "max": 30},
        "shaftFlexSource": "editor_estimate",
        "launchYear": 2026,
        "regionAvailability": ["global", "cn", "sg"],
        "officialSourceUrl": "https://www.lining.com.cn/",
        "lastVerifiedAt": "2026-07-04",
        "verificationStatus": "needs_review",
        "minRecommendedLevel": "competitive",
        "maxRecommendedLevel": "pro_oriented",
        "bestFor": ["doubles_attack", "control_speed_hybrid", "m46x"],
        "sourceUrls": ["https://bbs.badmintoncn.com/"],
        "editorNote": "M46X gen-three Bladex 800 Power twin — attack-biased sibling to 800 Speed.",
        "reviewCount": 0,
    },
    {
        "id": "ln-aeronaut-8000d",
        "category": "racket",
        "name": "Aeronaut 8000D (风动 8000D)",
        "brand": "Li-Ning",
        "priceUsd": 180,
        "headWeight": "head_heavy",
        "shaftFlex": "medium",
        "weightClass": "3U",
        "weightVariants": ["3U"],
        "gripSizes": ["G5", "G6"],
        "balanceMm": 311,
        "balanceCategory": "head_heavy",
        "swingWeightEstimate": "heavy",
        "commonStringTensionLbs": {"min": 24, "max": 32},
        "shaftFlexSource": "editor_estimate",
        "launchYear": 2020,
        "regionAvailability": ["cn", "asia"],
        "officialSourceUrl": "https://www.lining.com.cn/",
        "lastVerifiedAt": "2026-07-04",
        "verificationStatus": "needs_review",
        "minRecommendedLevel": "club",
        "maxRecommendedLevel": "competitive",
        "bestFor": ["singles_attack", "box_frame", "placement"],
        "sourceUrls": ["https://bbs.badmintoncn.com/"],
        "editorNote": "Overlooked Aeronaut 8000D box-frame singles hammer — high swing weight, precise placement.",
        "reviewCount": 0,
    },
    {
        "id": "kumpoo-kh-g815",
        "category": "shoes",
        "name": "KH-G815 Dragon Claw",
        "brand": "Kumpoo",
        "priceUsd": 95,
        "weightClass": "lightweight",
        "launchYear": 2026,
        "regionAvailability": ["cn", "asia"],
        "officialSourceUrl": "https://www.kumpoo.com/",
        "lastVerifiedAt": "2026-07-04",
        "verificationStatus": "needs_review",
        "minRecommendedLevel": "club",
        "maxRecommendedLevel": "competitive",
        "bestFor": ["speed", "ventilation", "flagship"],
        "sourceUrls": ["https://bbs.badmintoncn.com/"],
        "editorNote": "Kumpoo ventilated speed flagship — ACF cushion, aggressive claw upper vents.",
        "reviewCount": 0,
    },
    {
        "id": "kumpoo-silver-blade",
        "category": "shoes",
        "name": "Silver Blade",
        "brand": "Kumpoo",
        "priceUsd": 65,
        "weightClass": "standard",
        "launchYear": 2026,
        "regionAvailability": ["cn", "asia"],
        "officialSourceUrl": "https://www.kumpoo.com/",
        "lastVerifiedAt": "2026-07-04",
        "verificationStatus": "needs_review",
        "minRecommendedLevel": "recreational",
        "maxRecommendedLevel": "club",
        "bestFor": ["ventilation", "dial_closure", "value"],
        "sourceUrls": ["https://bbs.badmintoncn.com/"],
        "editorNote": "Dial-lock summer shoe with Leopard ETPU midsole and heavy ventilation.",
        "reviewCount": 0,
    },
]


def load_json(path: Path):
    return json.loads(path.read_text())


def save_json(path: Path, data):
    path.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n")


def merge_products(products: list, new_rows: list) -> list:
    by_id = {p["id"]: p for p in products}
    for row in new_rows:
        if row["id"] in by_id:
            by_id[row["id"]].update(row)
        else:
            by_id[row["id"]] = row
    return sorted(by_id.values(), key=lambda p: p["id"])


def update_blog_ts(slugs: list[str]):
    text = BLOG_TS.read_text()
    for slug in slugs:
        if f'"{slug}"' in text:
            continue
        marker = "export const blogSlugs = ["
        idx = text.find(marker)
        if idx == -1:
            raise SystemExit("blogSlugs array not found")
        close = text.find("] as const", idx)
        before = text[:close].rstrip()
        if not before.endswith(","):
            before += ","
        text = before + f'\n  "{slug}",' + text[close:]
    BLOG_TS.write_text(text)


def main():
    source_map = load_json(SOURCE_MAP)
    source_map.update(SOURCE_UPDATES)
    save_json(SOURCE_MAP, dict(sorted(source_map.items())))

    slugs_list = sorted(set(load_json(SLUGS_LIST) + list(SOURCE_UPDATES.keys())))
    save_json(SLUGS_LIST, slugs_list)

    review_map = load_json(REVIEW_MAP)
    review_map.update(REVIEW_PRODUCT_UPDATES)
    save_json(REVIEW_MAP, dict(sorted(review_map.items())))

    products = load_json(PRODUCTS)
    save_json(PRODUCTS, merge_products(products, NEW_PRODUCTS))

    update_blog_ts(list(SOURCE_UPDATES.keys()))

    print(f"Updated {len(SOURCE_UPDATES)} slug mappings")
    print(f"Added/updated {len(NEW_PRODUCTS)} catalog rows")


if __name__ == "__main__":
    main()
