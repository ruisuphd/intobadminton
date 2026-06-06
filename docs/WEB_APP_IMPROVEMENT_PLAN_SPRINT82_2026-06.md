# Web App Improvement Plan — Sprint 82 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-af11`  
**Baseline:** Sprint 81 — explainer slug CI completion + DriveX/P9200 review-map e2e (PR #229).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 82 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | Flagship racket reviews exit to spec PDP with finder panel | ✅ Astrox 100ZZ VA vs Kurenai review-map golden profile + e2e |
| **Wirecutter** | Flagship attack rackets pair with deep-dive review exits | ✅ Astrox 99 Pro 2 review-map golden profile + e2e |
| **RTINGS** | Review↔SKU map regressions caught in CI | ✅ `minMappedE2eGuards: 20` prevents silent e2e shrinkage |
| **RacketGuide** | Tier-4 value SKUs show verified distributor photos | ⏳ CN-market image backfill deferred (no Western listing found) |
| **BadmintonCentral** | Discontinued SKUs need honest imagery policy | ⏳ Nanoray Light 70i image hunt deferred (no verified Western listing found) |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v30, lab + CrUX + GSC + full product-funnel + editorial CI guards.

---

## 2. Top 5 gaps (Sprint 82)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **No CI guard on mapped review e2e count** | Flagship review-map e2e profiles can shrink silently | ✅ `minMappedE2eGuards: 20` in review-map baseline |
| 2 | **Astrox 100ZZ compare review lacks review-map e2e** | Flagship compare-guide review regressions slip through | ✅ `flagship-astrox-100zz-va-vs-kurenai` golden profile + e2e |
| 3 | **Astrox 99 Pro 2 deep-dive lacks review-map e2e** | Flagship attack review wiring unguarded | ✅ `flagship-astrox-99-pro-2` golden profile + e2e |
| 4 | **Nanoray Light 70i blocks 4 landings** | Discontinued SKU with no official product photo | ⏳ e78.us / Badminton Warehouse search found no verified Yonex listing; waivers unchanged |
| 5 | **HelpfulReaction has no public KV counts** | Social proof on guides/reviews | ⏳ Owner: set `REACTIONS_API_URL` + run wire workflow |

**Deferred (Sprint 83+):** tier-4 Western distributor image hunt; Nanoray Light 70i verified image; YouTube `sameAs`; `VideoObject` schema; fill CrUX/GSC CSV metrics; raise `TIER4_IMAGE_MIN_VERIFIED` to 2 when second SKU image lands.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| `minMappedE2eGuards` coverage counter | `src/lib/review-product-map-baseline.ts` |
| Astrox 100ZZ + 99 Pro 2 golden profiles | `docs/baselines/review-product-map-queries.json` |
| Unit tests | `src/lib/review-product-map-baseline.test.ts` |
| Master plan | `docs/WEB_APP_IMPROVEMENT_PLAN_2026-06.md` |

**Golden profiles added:**

| Query id | Review slug | Product id | Landing |
|----------|-------------|------------|---------|
| flagship-astrox-100zz-va-vs-kurenai | yonex-astrox-100zz-axelsen-va-vs-kurenai | yy-astrox-100zz | compare-guides/astrox-99-pro-vs-astrox-100zz |
| flagship-astrox-99-pro-2 | yonex-astrox-99-pro-2-deep-dive | yy-astrox-99-pro | /best/singles-rackets/ |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 81 deferred items + competitive audit | ✅ |
| 2 | yonex-astrox-100zz-axelsen-va-vs-kurenai maps to `yy-astrox-100zz` (racket) | ✅ |
| 3 | yonex-astrox-99-pro-2-deep-dive maps to `yy-astrox-99-pro` (racket) | ✅ |
| 4 | `minMappedE2eGuards: 20` enforced in evaluator | ✅ |
| 5 | Nanoray Light 70i image hunt attempted (e78.us, Badminton Warehouse) | ✅ no verified listing |
| 6 | Static export — no new API routes on site | ✅ |
| 7 | E2e count rises from 18 → 20 mapped review profiles | ✅ |
| 8 | All 13 explainer guards unchanged | ✅ |
| 9 | `lint:review-product-map-baseline` + `npm test` pass | ✅ |
| 10 | `npm run build` passes | ✅ |

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
| Mapped review e2e golden profiles | 20 |
| Explainer slug golden profiles | 13/13 (unchanged) |
| Tier-4 reviews with e2e smoke | 13/13 (unchanged) |
| Commercial landings under image CI | 17/17 (unchanged) |
