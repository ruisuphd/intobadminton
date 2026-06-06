# Web App Improvement Plan — Sprint 84 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-553c`  
**Baseline:** Sprint 83 — flagship Arcsaber 11 Pro / Astrox 88D Pro / Nanoflare 700 Pro review-map e2e + `minMappedE2eGuards: 23` (PR #231).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 84 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | Front-court doubles picks exit to spec PDP with finder panel | ✅ Astrox 88S Pro review-map golden profile + e2e |
| **Wirecutter** | Speed/defensive flagship picks pair with deep-dive review exits | ✅ Nanoflare 800 Pro review-map golden profile + e2e |
| **RTINGS** | Review↔SKU map regressions caught in CI | ✅ `minMappedE2eGuards: 25` prevents silent e2e shrinkage |
| **RacketGuide** | Tier-4 value SKUs show verified distributor photos | ⏳ CN-market image backfill deferred (no Western listing found) |
| **BadmintonCentral** | Discontinued SKUs need honest imagery policy | ⏳ Nanoray Light 70i image hunt deferred (no verified Western listing found) |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v30, lab + CrUX + GSC + full product-funnel + editorial CI guards.

---

## 2. Top 5 gaps (Sprint 84)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Astrox 88S Pro (2024) lacks review-map e2e** | Flagship front-court doubles review wiring unguarded | ✅ `flagship-astrox-88s-pro` golden profile + e2e |
| 2 | **Nanoflare 800 Pro (2024) lacks review-map e2e** | Flagship speed/defensive review regressions slip through | ✅ `flagship-nanoflare-800-pro` golden profile + e2e |
| 3 | **Nanoray Light 70i blocks 4 landings** | Discontinued SKU with no official product photo | ⏳ e78.us / Badminton Warehouse search found no verified Yonex listing; waivers unchanged |
| 4 | **HelpfulReaction has no public KV counts** | Social proof on guides/reviews | ⏳ Owner: set `REACTIONS_API_URL` + run wire workflow |
| 5 | **Tier-4 CN-market product images** | Budget SKUs show brand fallback | ⏳ Western distributor backfill deferred |

**Deferred (Sprint 85+):** tier-4 Western distributor image hunt; Nanoray Light 70i verified image; YouTube `sameAs`; `VideoObject` schema; fill CrUX/GSC CSV metrics; raise `TIER4_IMAGE_MIN_VERIFIED` to 2 when second SKU image lands.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| `minMappedE2eGuards: 25` coverage counter | `docs/baselines/review-product-map-queries.json` |
| Astrox 88S Pro + Nanoflare 800 Pro golden profiles | same baseline file |
| Unit tests | `src/lib/review-product-map-baseline.test.ts` |
| Master plan | `docs/WEB_APP_IMPROVEMENT_PLAN_2026-06.md` |

**Golden profiles added:**

| Query id | Review slug | Product id | Landing |
|----------|-------------|------------|---------|
| flagship-astrox-88s-pro | yonex-astrox-88d-pro-vs-88s-pro-2024 | yy-astrox-88s-pro-2024 | /best/doubles-rackets/, /best/control-rackets/ |
| flagship-nanoflare-800-pro | yonex-nanoflare-800-pro-and-victor-hs-plus | yy-nanoflare-800-pro-2024 | /best/defensive-rackets/, /best/head-light-rackets/ |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 83 deferred items + competitive audit | ✅ |
| 2 | yonex-astrox-88d-pro-vs-88s-pro-2024 maps to `yy-astrox-88s-pro-2024` (racket) | ✅ |
| 3 | yonex-nanoflare-800-pro-and-victor-hs-plus maps to `yy-nanoflare-800-pro-2024` (racket) | ✅ |
| 4 | `minMappedE2eGuards: 25` enforced in evaluator | ✅ |
| 5 | Nanoray Light 70i image hunt attempted (e78.us, Badminton Warehouse) | ✅ no verified listing |
| 6 | Static export — no new API routes on site | ✅ |
| 7 | E2e count rises from 23 → 25 mapped review profiles | ✅ |
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
| Mapped review e2e golden profiles | 25 |
| Explainer slug golden profiles | 13/13 (unchanged) |
| Tier-4 reviews with e2e smoke | 13/13 (unchanged) |
| Commercial landings under image CI | 17/17 (unchanged) |
