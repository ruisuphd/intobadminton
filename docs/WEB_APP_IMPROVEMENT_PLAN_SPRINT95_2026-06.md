# Web App Improvement Plan — Sprint 95 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-77f8`  
**Baseline:** Sprint 94 — budget racket + L69 string commercial review-map e2e + `minMappedE2eGuards: 51` (PR #242).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 95 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | Smash picks exit to spec PDP with editorial review | ✅ 100ZZ VA remap + `PRODUCT_REVIEW_ALIASES` for P9200 / 65 Z Wide / 77 Play |
| **Wirecutter** | Tournament shuttle picks link to hands-on review | ✅ AS-50 shuttle review-map golden profile + e2e |
| **RTINGS** | Review↔SKU map regressions caught in CI | ✅ `minMappedE2eGuards: 56` prevents silent e2e shrinkage |
| **Tennis Warehouse** | 65-series shoes pair with editorial sibling | ✅ 65 Z4 review-map e2e + wide SKU alias |
| **RacketGuide** | Tier-4 value SKUs show verified distributor photos | ⏳ CN-market image backfill deferred (no Western listing found) |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v30, lab + CrUX + GSC + full product-funnel + editorial CI guards.

---

## 2. Top 5 gaps (Sprint 95)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **100ZZ VA lacks dedicated review-map target** | Smash-heavy rank 6 maps to generic 100ZZ slug | ✅ Remap axelsen slug → `yy-astrox-100zz-va` + golden profile update |
| 2 | **P9200 Series / 65 Z Wide / 77 Play lack editorial href** | `/best/shoes/` and `/best/beginner-rackets/` picks had no review exit | ✅ `PRODUCT_REVIEW_ALIASES` to nearest reviewed sibling SKU |
| 3 | **AS-50 shuttle lacks review-map e2e** | Shuttle category mapped but unguarded in Playwright CI | ✅ `commercial-shuttle-yy-as-50` golden profile + e2e |
| 4 | **65 Z4 / 99 Pro gen-1 / HS Plus attack / AxForce 90 New standalone lack e2e** | High-traffic editorial slugs unguarded | ✅ Four new golden profiles |
| 5 | **DriveX 8S + Thruster Ryuga II still blocked** | Four+ commercial landings reference unmapped Victor SKUs | ⏳ No dedicated review article in `blog-articles.json`; Nanoray Light 70i image hunt deferred |

**Deferred (Sprint 96+):** tier-4 Western distributor image hunt; Nanoray Light 70i verified image; Thruster Ryuga II + DriveX 8S review ingestion; YouTube `sameAs`; `VideoObject` schema; fill CrUX/GSC CSV metrics; HelpfulReaction owner secret + wire workflow.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| `PRODUCT_REVIEW_ALIASES` for commercial sibling SKUs | `src/lib/review-pages.ts`, `src/lib/review-pages.test.ts` |
| 100ZZ VA remap | `src/data/blog-review-product-map.json` |
| `minMappedE2eGuards: 56` coverage counter | `docs/baselines/review-product-map-queries.json` |
| 5 new golden profiles + 1 updated profile | same baseline file |
| Unit tests | `src/lib/review-product-map-baseline.test.ts` |
| Master plan | `docs/WEB_APP_IMPROVEMENT_PLAN_2026-06.md` |

**Golden profiles added:**

| Query id | Review slug | Product id | Landing / note |
|----------|-------------|------------|----------------|
| commercial-shuttle-yy-as-50 | yonex-aerosensa-50-shuttle-review | yy-as-50 | Shuttle category CI |
| commercial-yy-65z4-shoes | yonex-65z4-shoes-review | yy-power-cushion-65-z4 | `/best/shoes/` via 65 Z Wide alias |
| commercial-yy-astrox-99-pro-gen1 | yonex-astrox-99-pro-gen-1-review | yy-astrox-99-pro | `/best/smash-heavy-rackets/` alternate path |
| commercial-vic-auraspeed-hs-plus-attack | victor-auraspeed-hs-plus-attack-review | vic-auraspeed-hs-plus | Compare-guide cluster |
| commercial-ln-axforce-90-new-standalone | li-ning-axforce-90-new-review | ln-axforce-90-new | Attack flagship standalone |

**Golden profile updated:**

| Query id | Change |
|----------|--------|
| flagship-astrox-100zz-va-vs-kurenai | `expectProductId` `yy-astrox-100zz` → `yy-astrox-100zz-va` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 94 deferred items + competitive audit | ✅ |
| 2 | yonex-astrox-100zz-axelsen-va-vs-kurenai maps to `yy-astrox-100zz-va` (racket) | ✅ |
| 3 | yonex-aerosensa-50-shuttle-review maps to `yy-as-50` (shuttle) | ✅ |
| 4 | yonex-65z4-shoes-review maps to `yy-power-cushion-65-z4` (shoes) | ✅ |
| 5 | yonex-astrox-99-pro-gen-1-review maps to `yy-astrox-99-pro` (racket) | ✅ |
| 6 | victor-auraspeed-hs-plus-attack-review maps to `vic-auraspeed-hs-plus` (racket) | ✅ |
| 7 | li-ning-axforce-90-new-review maps to `ln-axforce-90-new` (racket) | ✅ |
| 8 | `PRODUCT_REVIEW_ALIASES` resolves P9200 / 65 Z Wide / 77 Play editorial hrefs | ✅ |
| 9 | `minMappedE2eGuards: 56` enforced in evaluator | ✅ |
| 10 | `lint:review-product-map-baseline` + `npm test` + `npm run build` pass | ✅ |

---

## 5. Verification

```bash
npm test
npm run lint:review-product-map-baseline
npm run lint:editorial-baselines
npm run build
```

---

## 6. Metrics

| Goal | Target |
|------|--------|
| Mapped review e2e golden profiles | 56 |
| Explainer slug golden profiles | 13/13 (unchanged) |
| Commercial landings under image CI | 17/17 (unchanged) |
| Commercial sibling alias pairs | 3 |
