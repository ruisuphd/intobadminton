# Web App Improvement Plan — Sprint 107 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-b4e3`  
**Baseline:** Sprint 106 — racket three-way editorial parity CI + PDP golden profiles (PR #254).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 107 response |
|------------|---------------------------|---------------------|
| **Tennis Warehouse** | Accessory buying guides for grips and bags | ✅ `/best/grips/` + `/best/bags/` commercial landings (20th + 21st guarded pages) |
| **Wirecutter** | PDP, catalog browse, and commercial picks agree on editorial exit per SKU | ✅ Grip + bag three-way parity guards (PDP ↔ catalog ↔ commercial) |
| **RTINGS** | Cross-surface regression on accessory categories | ✅ `lint:grip-editorial-baselines` + `lint:bag-editorial-baselines` aggregates + CI workflow |
| **RacketGuide-style finders** | Filter-first catalog exits to mapped reviews/guides | ✅ `catalog-grip-queries.json` + `catalog-bag-queries.json` golden profiles |
| **YouTube-first reviewers** | Video evidence on product pages | ⏳ `VideoObject` schema still deferred |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v32, 44 racket + 16 shoe + 6 string + 6 shuttle three-way parity, 20/20 commercial image CI.

---

## 2. Top 5 gaps (Sprint 107)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **No commercial `/best/grips/` or `/best/bags/` landings** | Accessory discovery vs Tennis Warehouse | ✅ Six-pick grips + two-pick bags with comparison tables |
| 2 | **Grip/bag PDP/catalog/commercial parity unasserted** | Sprint 106 deferred item | ✅ `grip-editorial-parity.ts` + `bag-editorial-parity.ts` three-way unit guards |
| 3 | **Yonex grip SKUs exit to PDP only** | No editorial depth on highest-volume accessory | ✅ `PRODUCT_REVIEW_EXPLAINER_ALIASES` → `yonex-grip-sizes-explained` guide |
| 4 | **HelpfulReaction production wiring** | Social proof counts still local-only without owner secret | ⏳ Owner: set `REACTIONS_API_URL` + run wire workflow |
| 5 | **Tier-4 / CN-market accessory images** | Wave Grap, Smash Grap, GP100 Pro, Victor backpack lack verified Western photos | ⏳ Documented 3/6 grip + 1/2 bag image waivers |

**Deferred (Sprint 108+):** dedicated Yonex string hands-on articles; tier-4 Western distributor image backfill; Nanoray Light 70i verified image; YouTube `sameAs`; `VideoObject` schema; fill CrUX/GSC CSV metrics.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Commercial grip + bag landings | `src/app/best/grips/page.tsx`, `src/app/best/bags/page.tsx` |
| Explainer aliases + link labels | `src/lib/review-pages.ts` |
| Catalog + commercial golden profiles | `docs/baselines/catalog-grip-queries.json`, `docs/baselines/commercial-grip-queries.json`, `docs/baselines/catalog-bag-queries.json`, `docs/baselines/commercial-bag-queries.json` |
| Three-way parity evaluators + tests | `src/lib/grip-editorial-parity.ts`, `src/lib/bag-editorial-parity.ts`, baseline libs + tests |
| PDP golden profiles (6 grip + 2 bag SKUs) | `docs/baselines/pdp-queries.json` |
| CI lint scripts | `scripts/*-grip-*`, `scripts/*-bag-*`, `scripts/editorial-baselines.mjs` |
| E2E smoke | `e2e/catalog-grip-baseline-smoke.spec.ts`, `e2e/commercial-grip-baseline-smoke.spec.ts`, `e2e/catalog-bag-baseline-smoke.spec.ts`, `e2e/commercial-bag-baseline-smoke.spec.ts` |
| Hub / search / PWA / Lighthouse | `src/app/best/page.tsx`, `src/lib/site-search.ts`, `public/sw.js`, `lighthouserc.json` |
| CI workflow | `.github/workflows/ci.yml` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 106 deferred items + competitive audit | ✅ |
| 2 | All six grip productIds in catalog + commercial baselines | ✅ |
| 3 | All two bag productIds in catalog + commercial baselines | ✅ |
| 4 | All eight SKUs have PDP `expectCategory` rows with slug/kind | ✅ |
| 5 | Yonex grip picks use `yonex-grip-sizes-explained` guide; Li-Ning uses review | ✅ |
| 6 | Bag picks use `badminton-bag-loadout` guide on all surfaces | ✅ |
| 7 | Three-way parity agrees on slug/kind per productId (grip + bag) | ✅ |
| 8 | HelpfulReaction owner secret assessed — blocked on repo secret | ✅ deferred |
| 9 | Accessory image backfill assessed — waivers documented | ✅ 4 waivers |
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
| Commercial landings under image CI | 20/20 (was 18/18) |
| PDP golden profiles with e2e | 41 (was 38; +2 grip +1 bag with e2e) |
| Catalog grip golden profiles | 6 |
| Commercial grip golden profiles | 6 |
| Grip editorial three-way parity | 6/6 SKUs |
| Catalog bag golden profiles | 2 |
| Commercial bag golden profiles | 2 |
| Bag editorial three-way parity | 2/2 SKUs |
| Racket/shoe/string/shuttle parity | unchanged |
