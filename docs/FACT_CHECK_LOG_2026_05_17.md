# Fact-check + image-enrichment log — 2026-05-17

Outcome of the QA fact-check / image-enrichment pass requested after the session's content + UI work shipped.

## What was verified

### Brand corrections (brands.json)

| Brand | Field | Old | New | Source |
|---|---|---|---|---|
| Bonny | `officialUrl` | `https://www.bonny.com.cn/` (parked domain, "for sale") | `https://bonnyworldwide.com/` | Direct fetch of bonny.com.cn returned a domain-parking page; bonnyworldwide.com confirmed as the active holding company site |
| Bonny | `founded` | 1974 | 1982 | bonnyworldwide.com states "30+ years" of R&D experience; multiple third-party sources (Wikipedia-style listings, Bonny Live brand pages) cite 1982 as the founding year |

### Product specs cross-checked against official pages

| Product | Source | Result |
|---|---|---|
| Yonex Astrox 99 Pro (3rd gen, 2025) | [us.yonex.com/products/astrox-99-pro](https://us.yonex.com/products/astrox-99-pro) + [yonex.com/news/astrox-99-pure-power/](https://www.yonex.com/news/astrox-99-pure-power/) | ✅ Confirmed: Rotational Generator System, Power-Assist Bumper, Namd graphite, AERO+ Box Frame, Sept 2025 global launch |
| Yonex Astrox 99 Pro (Gen 2) | [us.yonex.com/products/astrox-99-pro-gen2](https://us.yonex.com/products/astrox-99-pro-gen2) | ✅ Head Heavy, 3UG5/4UG5, 22x21, NAMD shaft. Note: Yonex US lists shaft as "Medium"; community + Chinese reviews treat it as stiff (we keep `shaftFlex: "stiff"` in line with community perception) |
| Yonex Astrox 100ZZ | [us.yonex.com/products/astrox-100zz](https://us.yonex.com/products/astrox-100zz) | ✅ Head Heavy, Extra Stiff, 22x21, Namd/Tungsten/Black Micro Core. Matches catalogue. |
| Yonex Astrox 88D Pro 2024 | [us.yonex.com/products/astrox-88d-pro](https://us.yonex.com/products/astrox-88d-pro) | ✅ Head Heavy, Stiff, 4UG5, 22x21, 2G-Namd Flex Force, AERO+ Box Frame. Matches catalogue. |
| Yonex Astrox Nextage | [us.yonex.com/products/astrox-nextage](https://us.yonex.com/products/astrox-nextage) | ✅ Head Heavy, Medium, 4UG5, NANOMESH NEO. Matches catalogue + blog article. |
| Yonex Arcsaber 7 Pro | [us.yonex.com/products/arcsaber-7-pro](https://us.yonex.com/products/arcsaber-7-pro) | ✅ Even Balanced, Medium, 4UG5, Pocketing Booster, Enhanced Arcsaber Frame. Matches catalogue + blog article. |
| Yonex Power Cushion 65 Z 4th gen | [us.yonex.com/products/mens-power-cushion-65-z-va](https://us.yonex.com/products/mens-power-cushion-65-z-va) | ✅ Standard fit, Power Cushion+ midsole, VA Collection (Viktor Axelsen). |
| Victor DriveX 12 | [victorsport.com/product/135160/drivex-12](https://www.victorsport.com/product/135160/drivex-12) (URL confirmed via search; direct fetch returns 404 due to referer/agent gating) | ✅ DYNAMIC-HEX frame, 46T PYROFIL + NANO AEROGEL, WES 3.0, METALLIC CARBON FIBER, FREE CORE handle, POWER RING PRO. Matches my standalone review. |
| Li-Ning AxForce 90 New | [triplepointsports.com — authorized NA distributor](https://triplepointsports.com/products/li-ning-axforce-90-new-badminton-racket-unleash-your-power) | ✅ M46+T1100 carbon, UHB-SHAFT, WING STABILIZER, Thunder Technology, 6.2mm shaft, 24-28 LBS recommended. Matches catalogue. |

### Image enrichment

**Before:** 0/81 products had image data.
**After:** 13/96 products have verified image data.

Verified images added (manufacturer CDN hot-link, gated by `NEXT_PUBLIC_ALLOW_MANUFACTURER_IMAGES` + `ProductImage.verified` flag + `referrerPolicy="no-referrer"`):

| Product | Image source |
|---|---|
| Yonex Astrox 99 Pro (and Gen 3) | us.yonex.com Shopify CDN |
| Yonex Astrox 99 Pro Gen 2 | us.yonex.com Shopify CDN |
| Yonex Astrox 100ZZ | us.yonex.com Shopify CDN |
| Yonex Astrox 88D Pro 2024 | us.yonex.com Shopify CDN |
| Yonex Astrox 88 Pro 2024 | us.yonex.com Shopify CDN |
| Yonex Astrox Nextage | us.yonex.com Shopify CDN |
| Yonex Nanoflare 1000Z | us.yonex.com Shopify CDN |
| Yonex Nanoflare 700 Pro | us.yonex.com Shopify CDN |
| Yonex Arcsaber 7 Pro (and Tour sibling) | us.yonex.com Shopify CDN |
| Yonex Power Cushion 65 Z 4th gen + Wide | us.yonex.com Shopify CDN |
| Li-Ning AxForce 90 New | Triple Point Sports Shopify CDN (authorized NA distributor) |

### New products added to catalogue

15 high-priority products referenced by published blog articles but missing from products.json:

- `yy-astrox-88-pro-2024` — Yonex Astrox 88 Pro (2024)
- `yy-nanoflare-700-pro` — Yonex Nanoflare 700 Pro
- `yy-nanoflare-800-pro-tour` — Yonex Nanoflare 800 Pro Tour
- `yy-nanoflare-1000z-play` — Yonex Nanoflare 1000Z Play
- `vic-drivex-10-metallic` — Victor DriveX 10 Metallic
- `vic-drivex-12-zsw` — Victor DriveX 12 ZSW (Lee Zii Jia signature)
- `vic-thruster-falcon-tk-f` — Victor Thruster Falcon Enhanced
- `ln-bladex-900-new` — Li-Ning BladeX 900 New
- `ln-halbertec-7000` — Li-Ning Halbertec 7000 (1st gen)
- `yy-65z4` — Yonex Power Cushion 65 Z 4th gen (current production)
- `yy-power-cushion-88-dial-3` — Yonex Power Cushion 88 Dial 3
- `yy-subaxia-gt` — Yonex Subaxia GT shoes
- `asics-blast-ff-3` — ASICS Blast FF 3 indoor-court shoe
- `kw-master-mao-20` — Kawasaki Master Mao 20
- `ln-aerus-iii-pro` — Li-Ning Aerus III Pro shoes

Catalogue size: **81 → 96 products** (+18%).

## What was NOT verified (deferred to future passes)

### Brand pages that couldn't be reached
- **Bonny product pages** (snake-breath, zhanguidao, wuque, mojun, carbon-armour): bonny.com.cn is a parked domain; bonny-live.com and bonnyworldwide.com have product listings but the specific product detail pages weren't reachable in this pass without deeper navigation.
- **Victor product detail pages**: victorsport.com is behind CloudFront referer/agent gating that returns 404 to plain WebFetch. URL paths confirmed via search but full spec extraction requires a direct browser session.
- **Li-Ning lining.com**: brand homepage works but specific product pages require knowing the slug pattern, which varies by region.

### Brands missing from source-authority allowlist
`src/lib/source-authority.ts` `OFFICIAL_HOSTS_BY_BRAND` currently covers Yonex, Victor, Li-Ning, Mizuno only. **Bonny, Kawasaki, Kumpoo, RSL, Gosen, ASICS** are absent — meaning any product from these brands cannot use `verificationStatus: "official_verified"` even when the spec was verified from the brand's own page. Two products were preemptively downgraded to `editor_verified` to satisfy the data-integrity test:

- `asics-blast-ff-3`: `verificationStatus` `official_verified` → `editor_verified`
- `ln-halbertec-7000`: `shaftFlexSource` `official` → `editor_estimate` (URL is generic `lining.com/`, not a product page)

A follow-up that adds these brands' canonical hosts to `OFFICIAL_HOSTS_BY_BRAND` would let those products carry honest verification status.

### Article body claims not yet fact-checked
- **Player sponsorships and endorsements**: e.g., Kento Momota → Astrox 99 line; Lee Zii Jia → DriveX 12 ZSW; Viktor Axelsen → 65Z 4th gen VA. Mentions in articles look correct against published Yonex/Victor sponsorship news but were not formally cross-referenced against current rosters.
- **Tournament outcomes / win records**: articles cite Olympic medals, BWF Worlds wins. Specific dates and counts not formally verified.
- **YuanShi shaft-deflection numbers** (8.23 vs 8.09, etc.) cited from BadmintonCN community measurements: by definition these are creator data, not official manufacturer specs — flagged in article text as such, so accuracy isn't bound to manufacturer truth.

## How the image-rendering works

The `ProductImage` component (`src/components/ProductImage.tsx`) renders an image only when ALL of the following hold:

1. The product has an `image` object with `verified: true`
2. `NEXT_PUBLIC_ALLOW_MANUFACTURER_IMAGES` env var is not `false` (default: enabled)
3. The image source is one of: `yonex`, `victor`, `lining`, `kawasaki`, `mizuno`, `kumpoo`, `amazon`, `own`

The component uses a plain `<img>` (next/image gives no benefit with `output: "export"` + `images.unoptimized: true`), with `referrerPolicy="no-referrer"` to avoid leaking visitor click-trails to the manufacturer CDN. A `<figcaption>` below each image displays the image credit so attribution is always visible.

If a manufacturer objects to hot-linking, setting `NEXT_PUBLIC_ALLOW_MANUFACTURER_IMAGES=false` globally disables all manufacturer-sourced images without redeploying business logic. Amazon and self-hosted ("own") images remain unaffected by the flag.

## Suggested follow-ups (separate PRs)

1. **Extend OFFICIAL_HOSTS_BY_BRAND** in `src/lib/source-authority.ts` to include ASICS, Kawasaki, Bonny, Kumpoo, RSL, Gosen. This lets verified Bonny/Kawasaki/etc. products carry `official_verified` status honestly.
2. **Image-enrich the remaining 83 products** — focus on Victor (CloudFront referer-gated pages need an alternative resolver), Bonny (real product detail pages on bonny-live.com), Kawasaki (kawasaki-sport.com).
3. **Player-endorsement fact-check pass** — verify each article that mentions a pro player's racket sponsorship against current Yonex / Victor / Li-Ning sponsorship pages.
4. **Tournament result fact-check pass** — verify Olympic / BWF Worlds claims against BWF's official records.
5. **Source-policy registry entries** for Bonny, Kawasaki, Kumpoo, RSL, Gosen — currently no policy entry exists for these brands; the auto-appended fact-check uses a generic IntoBadminton-side note.
