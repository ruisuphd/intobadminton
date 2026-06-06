# Web App Improvement Plan — Sprint 87 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-41da`  
**Baseline:** Sprint 86 — Victor/Li-Ning flagship Auraspeed 90K II / AxForce 100 Gen 2 review-map e2e + `minMappedE2eGuards: 29` (PR #234).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 87 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | Classic speed/control picks exit to spec PDP with finder panel | ✅ Jetspeed 12 + Halbertec 8000 review-map golden profiles + e2e |
| **Wirecutter** | Value-tier control rackets pair with commercial landings | ✅ Li-Ning Halbertec 8000 wiring guarded on control/intermediate/all-round |
| **RTINGS** | Review↔SKU map regressions caught in CI | ✅ `minMappedE2eGuards: 31` prevents silent e2e shrinkage |
| **RacketGuide** | Tier-4 value SKUs show verified distributor photos | ⏳ CN-market image backfill deferred (no Western listing found) |
| **BadmintonCentral** | Discontinued SKUs need honest imagery policy | ⏳ Nanoray Light 70i image hunt deferred (no verified Western listing found) |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v30, lab + CrUX + GSC + full product-funnel + editorial CI guards.

---

## 2. Top 5 gaps (Sprint 87)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Jetspeed 12 lacks review-map e2e** | Victor classic speed/defensive review wiring unguarded | ✅ `flagship-vic-jetspeed-12` golden profile + e2e |
| 2 | **Halbertec 8000 lacks review-map e2e** | Li-Ning value control review regressions slip through | ✅ `flagship-ln-halbertec-8000` golden profile + e2e |
| 3 | **Nanoray Light 70i blocks 4 landings** | Discontinued SKU with no official product photo | ⏳ e78.us / Badminton Warehouse search found no verified Yonex listing; waivers unchanged |
| 4 | **HelpfulReaction has no public KV counts** | Social proof on guides/reviews | ⏳ Owner: set `REACTIONS_API_URL` + run wire workflow |
| 5 | **Tier-4 CN-market product images** | Budget SKUs show brand fallback | ⏳ Western distributor backfill deferred |

**Deferred (Sprint 88+):** tier-4 Western distributor image hunt; Nanoray Light 70i verified image; YouTube `sameAs`; `VideoObject` schema; fill CrUX/GSC CSV metrics; raise `TIER4_IMAGE_MIN_VERIFIED` to 2 when second SKU image lands; Thruster Ryuga II + Bladex 800 Speed flagship e2e.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| `minMappedE2eGuards: 31` coverage counter | `docs/baselines/review-product-map-queries.json` |
| Jetspeed 12 + Halbertec 8000 golden profiles | same baseline file |
| Unit tests | `src/lib/review-product-map-baseline.test.ts` |
| Master plan | `docs/WEB_APP_IMPROVEMENT_PLAN_2026-06.md` |

**Golden profiles added:**

| Query id | Review slug | Product id | Landing |
|----------|-------------|------------|---------|
| flagship-vic-jetspeed-12 | victor-jetspeed-12-curious-review | vic-jetspeed-12 | /best/defensive-rackets/, /best/all-round-rackets/ |
| flagship-ln-halbertec-8000 | li-ning-halbertec-8000-vs-9000-vs-9000-power | ln-halbertec-8000 | /best/control-rackets/, /best/intermediate-rackets/, /best/all-round-rackets/ |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 86 deferred items + competitive audit | ✅ |
| 2 | victor-jetspeed-12-curious-review maps to `vic-jetspeed-12` (racket) | ✅ |
| 3 | li-ning-halbertec-8000-vs-9000-vs-9000-power maps to `ln-halbertec-8000` (racket) | ✅ |
| 4 | `minMappedE2eGuards: 31` enforced in evaluator | ✅ |
| 5 | Nanoray Light 70i image hunt attempted (e78.us, Badminton Warehouse) | ✅ no verified listing |
| 6 | Static export — no new API routes on site | ✅ |
| 7 | E2e count rises from 29 → 31 mapped review profiles | ✅ |
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
| Mapped review e2e golden profiles | 31 |
| Explainer slug golden profiles | 13/13 (unchanged) |
| Tier-4 reviews with e2e smoke | 13/13 (unchanged) |
| Commercial landings under image CI | 17/17 (unchanged) |
