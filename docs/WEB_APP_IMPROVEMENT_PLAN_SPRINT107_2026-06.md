# Web App Improvement Plan — Sprint 107 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-f8b0`  
**Baseline:** Sprint 106 — racket three-way editorial parity CI + PDP golden profiles (PR #254).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 107 response |
|------------|---------------------------|---------------------|
| **Tennis Warehouse** | Accessory buying guides for grips and bags with consistent editorial exits | ✅ `/best/grips/` + `/best/bags/` commercial landings (20th–21st guarded pages) |
| **Wirecutter** | PDP, catalog browse, and commercial picks agree on editorial exit per SKU | ✅ Grip + bag three-way parity guards |
| **RTINGS** | Cross-surface regression on remaining equipment categories | ✅ `lint:grip-editorial-baselines` + `lint:bag-editorial-baselines` aggregates |
| **RacketGuide-style finders** | Explainer guides for SKUs without dedicated reviews | ✅ Yonex grips → `yonex-grip-sizes-explained`; bags → `badminton-bag-loadout` |
| **YouTube-first reviewers** | Video evidence on product pages | ⏳ `VideoObject` schema still deferred |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v32, racket/shoe/string/shuttle three-way parity, 20/20 commercial image CI.

---

## 2. Top 5 gaps (Sprint 107)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **No commercial `/best/grips/` or `/best/bags/` landings** | Last two catalogue categories lacked Wirecutter-style guides | ✅ Seven-pick grips + two-pick bags landings |
| 2 | **Grip/bag PDP/catalog/commercial parity unasserted** | Yonex grips exited only to PDP; bags had no editorial exits | ✅ Grip + bag three-way parity guards (7 + 2 SKUs) |
| 3 | **Yonex grip SKUs lacked explainer editorial exits** | Six Yonex grips had no review map or guide wiring | ✅ `PRODUCT_REVIEW_EXPLAINER_ALIASES` → `yonex-grip-sizes-explained` |
| 4 | **HelpfulReaction production wiring** | Social proof counts still local-only without owner secret | ⏳ Owner: set `REACTIONS_API_URL` + run wire workflow |
| 5 | **Grip/bag verified product photography gaps** | Wave Grap, Smash Grap, GP100 Pro, Victor backpack lack verified images | ⏳ 3 grip + 1 bag waivers documented on commercial landings |

**Deferred (Sprint 108+):** dedicated Yonex string hands-on articles; tier-4 Western distributor image backfill; Nanoray Light 70i verified image; YouTube `sameAs`; `VideoObject` schema; fill CrUX/GSC CSV metrics.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Commercial grip + bag landings | `src/app/best/grips/page.tsx`, `src/app/best/bags/page.tsx` |
| Grip/bag explainer aliases | `src/lib/review-pages.ts` |
| Catalog + commercial golden profiles | `docs/baselines/catalog-grip-queries.json`, `commercial-grip-queries.json`, `catalog-bag-queries.json`, `commercial-bag-queries.json` |
| Three-way parity evaluators + tests | `src/lib/grip-editorial-parity.ts`, `bag-editorial-parity.ts` + tests |
| Catalog + commercial baseline libs | `src/lib/catalog-grip-baseline.ts`, `commercial-grip-baseline.ts`, `catalog-bag-baseline.ts`, `commercial-bag-baseline.ts` |
| PDP golden profiles (7 grip + 2 bag SKUs) | `docs/baselines/pdp-queries.json` |
| CI lint scripts | `scripts/catalog-grip-baseline.mjs`, `commercial-grip-baseline.mjs`, `grip-editorial-parity.mjs`, `grip-editorial-baselines.mjs`, bag equivalents |
| E2E smoke | `e2e/catalog-grip-baseline-smoke.spec.ts`, `commercial-grip-baseline-smoke.spec.ts`, bag equivalents |
| Hub / search / PWA / Lighthouse | `src/app/best/page.tsx`, `src/lib/site-search.ts`, `public/sw.js`, `lighthouserc.json` |
| Related reading clusters | `src/lib/related-content.ts` |
| CI workflow | `.github/workflows/ci.yml` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 106 deferred items + competitive audit | ✅ |
| 2 | All 7 grip productIds in catalog + commercial baselines | ✅ |
| 3 | All 2 bag productIds in catalog + commercial baselines | ✅ |
| 4 | All 9 SKUs have PDP rows with correct slug/kind | ✅ |
| 5 | Yonex grips use guide kind; GP100 uses review kind | ✅ |
| 6 | Three-way parity agrees on slug/kind per productId | ✅ |
| 7 | `minCatalogFilterSlugs: 22` (was 20) | ✅ |
| 8 | HelpfulReaction owner secret assessed — blocked on repo secret | ✅ deferred |
| 9 | Image waivers documented (3 grip + 1 bag) | ✅ |
| 10 | `npm test` + baselines + `npm run build` pass | ✅ |

---

## 5. Verification

```bash
npm test
npm run lint:grip-editorial-baselines
npm run lint:bag-editorial-baselines
npm run lint:pdp-baseline
npm run lint:best-baseline
npm run build
npx playwright test e2e/catalog-grip-baseline-smoke.spec.ts e2e/commercial-grip-baseline-smoke.spec.ts e2e/catalog-bag-baseline-smoke.spec.ts e2e/commercial-bag-baseline-smoke.spec.ts
```

---

## 6. Metrics

| Goal | Target |
|------|--------|
| Commercial landings under image CI | 20/20 (was 18) |
| PDP golden profiles with e2e | 41 (was 38; +2 grip +1 bag) |
| Catalog grip golden profiles | 7 |
| Commercial grip golden profiles | 7 |
| Grip editorial three-way parity | 7/7 SKUs |
| Bag editorial three-way parity | 2/2 SKUs |
| Racket/shoe/string/shuttle parity | unchanged |
