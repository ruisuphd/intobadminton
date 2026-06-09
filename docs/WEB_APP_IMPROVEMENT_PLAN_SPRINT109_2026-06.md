# Web App Improvement Plan — Sprint 109 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-a2d5`  
**Baseline:** Sprint 108 — all-category editorial parity aggregate + CrUX/offline expansion (PR #257).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 109 response |
|------------|---------------------------|---------------------|
| **Tennis Warehouse** | Every accessory PDP has spec table + editorial exit smoke-tested | ✅ Full grip/bag PDP e2e (6/6 grips + 2/2 bags) |
| **RTINGS** | Shuttle category PDPs regression-guarded like rackets/shoes | ✅ RSL shuttle PDP e2e (6/6 shuttle PDPs) |
| **Wirecutter** | Mapped accessory reviews in review-map e2e suite | ✅ Li-Ning GP100 Pro overgrip review-map e2e guard |
| **Google CWV tooling** | Field-data baselines auto-refreshed from PSI | ✅ `capture:crux-psi` script (owner API key) |
| **YouTube-first reviewers** | Video evidence on product pages | ⏳ `VideoObject` schema still deferred |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v32, 20/20 commercial image CI, 80/80 all-category editorial parity.

---

## 2. Top 5 gaps (Sprint 109)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Grip/bag PDP e2e incomplete** | 5/7 accessory PDPs lacked Playwright smoke after Sprint 107 | ✅ e2e on 4 Yonex grips + Victor Compact Backpack |
| 2 | **RSL shuttle PDP e2e missing** | Sprint 104 added 4 RSL PDP rows without e2e (only AS-50 + Carbonsonic had smoke) | ✅ e2e on 4 RSL shuttle PDPs (6/6 shuttle category) |
| 3 | **GP100 grip review absent from review-map e2e** | L69 string had map e2e; GP100 grip did not | ✅ `accessory-ln-gp100-pro-grip` guard; `minMappedE2eGuards` 56→57 |
| 4 | **CrUX CSV metrics empty** | Owner manual PSI paste is error-prone | ✅ `scripts/crux-capture-psi.mjs` + `npm run capture:crux-psi` |
| 5 | **HelpfulReaction production wiring** | Social proof counts local-only without owner secret | ⏳ Owner: set `REACTIONS_API_URL` + run wire workflow |

**Deferred (Sprint 110+):** dedicated Yonex string hands-on articles; tier-4 Western distributor image backfill; Nanoray Light 70i verified image; YouTube `sameAs`; `VideoObject` schema; fill CrUX CSV cells (owner runs `capture:crux-psi` with API key).

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Accessory + shuttle PDP e2e | `docs/baselines/pdp-queries.json` (33→42 e2e profiles) |
| GP100 grip review-map e2e | `docs/baselines/review-product-map-queries.json` |
| CrUX PSI auto-capture | `scripts/crux-capture-psi.mjs`, `package.json`, `docs/baselines/README.md` |
| Documentation | this file, master plan addendum |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 108 deferred items + competitive audit | ✅ |
| 2 | All 6 grip PDP rows have `e2e: true` | ✅ |
| 3 | Both bag PDP rows have `e2e: true` | ✅ |
| 4 | All 6 shuttle PDP rows have `e2e: true` | ✅ |
| 5 | GP100 review-map guard has correct productId + category | ✅ |
| 6 | `minMappedE2eGuards` bumped 56→57 | ✅ |
| 7 | CrUX PSI script requires owner API key; manual hints unchanged | ✅ |
| 8 | HelpfulReaction owner secret assessed — blocked on repo secret | ✅ deferred |
| 9 | Tier-4 image / VideoObject assessed — unchanged waivers | ✅ deferred |
| 10 | `npm test` + baselines + `npm run build` pass | ✅ |

---

## 5. Verification

```bash
npm test
npm run lint:pdp-baseline
npm run lint:review-product-map-baseline
npm run build
npx playwright test e2e/pdp-baseline-smoke.spec.ts
```

---

## 6. Metrics

| Goal | Target |
|------|--------|
| PDP e2e golden profiles | 42 (was 33) |
| Shuttle category PDP e2e | 6/6 |
| Grip category PDP e2e | 6/6 |
| Bag category PDP e2e | 2/2 |
| Review-map mapped e2e guards | 57 (was 56) |
| Commercial landings under image CI | 20/20 (unchanged) |
| All-category editorial parity picks | 80/80 (unchanged) |
