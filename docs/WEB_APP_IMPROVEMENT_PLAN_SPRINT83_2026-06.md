# Web App Improvement Plan — Sprint 83 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-680d`  
**Baseline:** Sprint 82 — flagship Astrox review-map e2e + `minMappedE2eGuards: 20` (PR #230).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 83 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | Control and doubles flagship reviews exit to spec PDP with finder panel | ✅ Arcsaber 11 Pro + Astrox 88D Pro review-map golden profiles + e2e |
| **Wirecutter** | Singles/defensive picks pair with deep-dive review exits | ✅ Nanoflare 700 Pro review-map golden profile + e2e |
| **RTINGS** | Review↔SKU map regressions caught in CI | ✅ `minMappedE2eGuards: 23` prevents silent e2e shrinkage |
| **RacketGuide** | Tier-4 value SKUs show verified distributor photos | ⏳ CN-market image backfill deferred (no Western listing found) |
| **BadmintonCentral** | Discontinued SKUs need honest imagery policy | ⏳ Nanoray Light 70i image hunt deferred (no verified Western listing found) |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v30, lab + CrUX + GSC + full product-funnel + editorial CI guards.

---

## 2. Top 5 gaps (Sprint 83)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Arcsaber 11 Pro lacks review-map e2e** | Flagship control/singles review wiring unguarded | ✅ `flagship-arcsaber-11-pro` golden profile + e2e |
| 2 | **Astrox 88D Pro (2024) lacks review-map e2e** | Flagship doubles/smash review regressions slip through | ✅ `flagship-astrox-88d-pro` golden profile + e2e |
| 3 | **Nanoflare 700 Pro lacks review-map e2e** | Defensive/singles review wiring unguarded | ✅ `flagship-nanoflare-700-pro` golden profile + e2e |
| 4 | **Nanoray Light 70i blocks 4 landings** | Discontinued SKU with no official product photo | ⏳ e78.us / Badminton Warehouse search found no verified Yonex listing; waivers unchanged |
| 5 | **HelpfulReaction has no public KV counts** | Social proof on guides/reviews | ⏳ Owner: set `REACTIONS_API_URL` + run wire workflow |

**Deferred (Sprint 84+):** tier-4 Western distributor image hunt; Nanoray Light 70i verified image; YouTube `sameAs`; `VideoObject` schema; fill CrUX/GSC CSV metrics; raise `TIER4_IMAGE_MIN_VERIFIED` to 2 when second SKU image lands; Astrox 88S Pro and Nanoflare 800 Pro flagship e2e.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| `minMappedE2eGuards: 23` coverage counter | `docs/baselines/review-product-map-queries.json` |
| Arcsaber 11 Pro + Astrox 88D Pro + Nanoflare 700 Pro golden profiles | same baseline file |
| Unit tests | `src/lib/review-product-map-baseline.test.ts` |
| Master plan | `docs/WEB_APP_IMPROVEMENT_PLAN_2026-06.md` |

**Golden profiles added:**

| Query id | Review slug | Product id | Landing |
|----------|-------------|------------|---------|
| flagship-arcsaber-11-pro | yonex-arcsaber-11-pro-review | yy-arcsaber-11-pro | /best/singles-rackets/, /best/control-rackets/ |
| flagship-astrox-88d-pro | yonex-astrox-88-pro-2024-review | yy-astrox-88d-pro-2024 | /best/doubles-rackets/, /best/smash-heavy-rackets/ |
| flagship-nanoflare-700-pro | yonex-nanoflare-700-review | yy-nanoflare-700-pro-2024 | /best/defensive-rackets/, /best/singles-rackets/ |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 82 deferred items + competitive audit | ✅ |
| 2 | yonex-arcsaber-11-pro-review maps to `yy-arcsaber-11-pro` (racket) | ✅ |
| 3 | yonex-astrox-88-pro-2024-review maps to `yy-astrox-88d-pro-2024` (racket) | ✅ |
| 4 | yonex-nanoflare-700-review maps to `yy-nanoflare-700-pro-2024` (racket) | ✅ |
| 5 | `minMappedE2eGuards: 23` enforced in evaluator | ✅ |
| 6 | Nanoray Light 70i image hunt attempted (e78.us, Badminton Warehouse) | ✅ no verified listing |
| 7 | Static export — no new API routes on site | ✅ |
| 8 | E2e count rises from 20 → 23 mapped review profiles | ✅ |
| 9 | All 13 explainer guards unchanged | ✅ |
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
| Mapped review e2e golden profiles | 23 |
| Explainer slug golden profiles | 13/13 (unchanged) |
| Tier-4 reviews with e2e smoke | 13/13 (unchanged) |
| Commercial landings under image CI | 17/17 (unchanged) |
