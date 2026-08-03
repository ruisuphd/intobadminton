# Fact-check audit - 2026-05-09

Scope: high-traffic racket rows and source-authority handling in `src/data/products.json`.

## Official corrections applied

### Yonex NANOFLARE 1000 Z

Source name: Yonex  
Document title: `NANOFLARE 1000 Z` product page  
URL: `https://www.yonex.com/nf-1000z`  
Accessed: 2026-05-09

Exact source wording used:

- `Flex | Extra Stiff`
- `Weight / Grip | 4U (Avg. 83g) G5,6、3U(Avg. 88g) G4,5,6`
- `Stringing Advice | 4U: 20 - 28 lbs 3U: 21 - 29 lbs`

App change:

- `yy-nanoflare-1000z` renamed from `Nanoflare 1000Z` to `Nanoflare 1000 Z`.
- `shaftFlex` changed from `stiff` to `extra_stiff`.
- `commonStringTensionLbs.max` changed from `28` to `29`.
- Source changed to the product-specific official page and status changed to `official_verified`.

### Yonex ASTROX 99 PRO

Source name: Yonex  
Document title: `ASTROX 99 PRO` product page  
URL: `https://www.yonex.com/astrox-99-pro-3ax99-p`  
Accessed: 2026-05-09

Exact source wording used:

- `Flex | STIFF`
- `Stringing Advice | 4U: 20 - 28 lbs 3U: 21 - 29 lbs`
- `Item Code | 3AX99-P`

App change:

- `yy-astrox-99-pro.shaftFlex` changed from `extra_stiff` to `stiff`.
- Source changed to the product-specific official page and status changed to `official_verified`.

### Yonex ASTROX 77 PRO

Source name: Yonex  
Document title: `ASTROX 77 PRO` product page  
URL: `https://www.yonex.com/badminton/racquets/astrox-77-pro`  
Accessed: 2026-05-09

Exact source wording used:

- `Flex Medium`
- `Weight / Grip 4U (Avg. 83g) G5,6`
- `Stringing Advice 4U: 19 - 27 lbs 3U: 20 - 28 lbs`

App change:

- `commonStringTensionLbs.min` changed from `20` to `19`.
- Status changed to `official_verified`.

### Yonex ARCSABER 11 PRO

Source name: Yonex  
Document title: `ARCSABER 11 PRO` product page  
URL: `https://www.yonex.com/arc11-p`  
Accessed: 2026-05-09

Exact source wording used:

- `Flex | STIFF`
- `Weight / Grip | 4U (Avg. 83g) G5, 6 3U (Avg. 88g) G4, 5, 6`
- `Stringing Advice | 4U: 19 - 27 lbs 3U: 20 - 28 lbs`

App change:

- Source changed to the product-specific official page.
- Status changed to `official_verified`.

### Yonex NANOFLARE 800 PRO

Source name: Yonex  
Document title: `NANOFLARE 800 PRO` product page  
URL: `https://www.yonex.com/nf-800pr`  
Accessed: 2026-05-09

Exact source wording used:

- `Flex | STIFF`
- `Weight / Grip | 4U (Avg. 83g) G5,6、3U(Avg. 88g) G4,5,6`
- `Stringing Advice | 4U: 20 - 28 lbs、3U: 21 - 29 lbs`

App change:

- `commonStringTensionLbs.max` changed to `29`.
- Duplicate Nanoflare 800 Pro row aligned to `stiff` rather than `extra_stiff`.
- Source changed to the product-specific official page and status changed to `official_verified`.

### Victor DriveX 12 O

Source name: VICTOR Badminton  
Document title: `DriveX 12 O` product page  
URL: `https://www.victorsport.com/product/drivex`  
Accessed: 2026-05-09

Exact source wording used:

- `Weight / Grip Size | 3U/G5 4U/G5`
- `String tension LBS | ≦ 33 lbs(15kg) ≦ 32 lbs(14.5kg)`

App change:

- `vic-drivex-12` renamed to `DriveX 12 O`.
- Source changed to the product-specific official page and status changed to `official_verified`.

> Superseded 2026-08-02: the `O` suffix is the orange/black retail colourway, not a
> separate model, so `vic-drivex-12` is named `DriveX 12` again. The duplicate
> `vic-yu-12` row was merged into it and now redirects via
> `src/data/product-redirects.json`. `vic-drivex-12-zsw` remains a distinct build.

## Rows downgraded for source authority

The app now treats generic brand homepages, retailer pages, blogs, and forum pages as insufficient for manufacturer-verified specs. These rows may still appear as recommendations, but their confidence and UI labels are downgraded until an official product-specific source is attached.

I cannot confirm the Li-Ning racket specs without a reliable product-specific official source.

Downgraded examples:

- `vic-drivex-8s`
- `vic-auraspeed-100x-se`
- `vic-auraspeed-hs-plus`
- `vic-brave-sword-12`
- `vic-thruster-falcon-enhanced`
- `vic-auraspeed-99`
- all Li-Ning racket rows currently in `src/data/products.json`

## 2026-05-15 — Fact-check framework + sample sweep (P3 of audit plan)

### Framework

Introduced `content/claims.json` as a structured registry of every quotable
numeric or rule-based claim referenced on the site. Each entry carries:

- `id`, `label`, `value`, `unit?` — what is being asserted
- `sourceTier` — 1 (manufacturer product page), 2 (BWF / standards body),
  3 (manufacturer brand-level / support page), 4 (independent measurement,
  must be disclosed as such to readers)
- `source.{name,url,accessedAt,quote}` — exact citation with verbatim quote
- `usedOn` — routes that reference this claim

`scripts/postbuild-seo-audit.mjs` now fails the build if any claim's
`accessedAt` is more than 365 days old and warns between 180 and 365 days.
`src/lib/claims.ts` is the TypeScript loader; `src/lib/claims.test.ts`
validates the registry shape on every test run.

### Initial registered claims (2026-05-15)

**BWF Laws of Badminton (Tier 2):**

- `bwf-court-length-m`: 13.4 m
- `bwf-court-width-doubles-m`: 6.10 m
- `bwf-court-width-singles-m`: 5.18 m
- `bwf-net-height-posts-m`: 1.55 m
- `bwf-net-height-centre-m`: 1.524 m
- `bwf-shuttle-weight-g`: 4.74–5.50 g
- `bwf-shuttle-feathers`: 16 feathers
- `bwf-match-format`: best of 3 games to 21

**Yonex manufacturer product pages (Tier 1):**

- `yonex-astrox-99-pro-flex`: Stiff
- `yonex-astrox-99-pro-tension-4u-lb`: 20–28 lb
- `yonex-nanoflare-1000z-flex`: Extra Stiff
- `yonex-nanoflare-1000z-tension-4u-lb`: 4U 20–28 lb / 3U 21–29 lb

**Industry-convention weight bands (Tier 3, manufacturer support pages):**

- `weight-class-3u-g`: 85–89 g
- `weight-class-4u-g`: 80–84 g
- `weight-class-5u-g`: 75–79 g

**Yonex grip-size ladder (Tier 3):**

- `yonex-grip-g4-inches`: ~3 5/8 in
- `yonex-grip-g5-inches`: ~3 1/2 in

### Not yet swept (deferred to follow-up runs)

The plan calls for six fact-check sweeps. Only the framework + a sample of
each tier shipped in this run. Remaining sweeps:

1. ✓ BWF rules (sample registered; full glossary sweep deferred until the
   `/guides/badminton-rules-bwf/` pillar page lands)
2. Yonex official spec verification across **all** Yonex rackets in
   `products.json` (currently 8 verified per the original audit; need to
   register the rest in `claims.json`).
3. ✓ Yonex grip sizes (sample registered; full `/blog/yonex-grip-sizes-explained/`
   review against the Yonex grip size guidance deferred).
4. Victor official spec verification.
5. Li-Ning official spec verification (or formal "no Tier-1 source" tagging
   per row).
6. Other brands (Kawasaki, Bonny, Kumpoo, Apacs, FZ Forza, Mizuno).

Each remaining sweep follows the same pattern: cite exact source wording,
log accessedAt, write the entry to `claims.json`, link `usedOn`. The
postbuild gate enforces freshness; future sweeps add coverage.
