# Web App Improvement Plan — Sprint 91 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-6460`  
**Baseline:** Sprint 90 — defensive/all-round Halbertec 7000 II / Arcsaber 7 Tour review-map e2e + `minMappedE2eGuards: 37` (PR #238).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 91 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | Intermediate picks exit to spec PDP with finder panel | ✅ Victor Yu 12 (DriveX 12) review-map golden profile + e2e |
| **Wirecutter** | Control-rackets landing pairs every pick with editorial review | ✅ Halbertec 9000 standalone review-map golden profile + e2e |
| **RTINGS** | Review↔SKU map regressions caught in CI | ✅ `minMappedE2eGuards: 39` prevents silent e2e shrinkage |
| **RacketGuide** | Tier-4 value SKUs show verified distributor photos | ⏳ CN-market image backfill deferred (no Western listing found) |
| **BadmintonCentral** | Discontinued SKUs need honest imagery policy | ⏳ Nanoray Light 70i image hunt deferred (no verified Western listing found) |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v30, lab + CrUX + GSC + full product-funnel + editorial CI guards.

---

## 2. Top 5 gaps (Sprint 91)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Victor Yu 12 lacks review-map e2e** | Sole unguarded pick on `/best/intermediate-rackets/` | ✅ `flagship-vic-yu-12` golden profile + e2e |
| 2 | **Halbertec 9000 lacks review-map e2e** | Sole unguarded pick on `/best/control-rackets/` | ✅ `flagship-ln-halbertec-9000` golden profile + e2e |
| 3 | **DriveX 8S has no review article** | Victor all-round pick on 4 landings but no editorial slug to map | ⏳ Blocked — no `blog-articles.json` entry |
| 4 | **Nanoray Light 70i blocks 4 landings** | Discontinued SKU with no verified product photo | ⏳ e78.us / Badminton Warehouse search found no verified Yonex listing; waivers unchanged |
| 5 | **Main `/best/shoes/` mapped picks lack review-map e2e** | CrUX shoes page picks (Comfort Z3, Eclipsion Z3, Bladesabre MAX) unguarded | ⏳ Sprint 92 candidate |

**Deferred (Sprint 92+):** tier-4 Western distributor image hunt; Nanoray Light 70i verified image; Thruster Ryuga II + DriveX 8S review ingestion; YouTube `sameAs`; `VideoObject` schema; fill CrUX/GSC CSV metrics; raise `TIER4_IMAGE_MIN_VERIFIED` to 2 when second SKU image lands; shoes commercial review-map e2e.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| `minMappedE2eGuards: 39` coverage counter | `docs/baselines/review-product-map-queries.json` |
| Yu 12 + Halbertec 9000 golden profiles | same baseline file |
| Unit tests | `src/lib/review-product-map-baseline.test.ts` |
| Master plan | `docs/WEB_APP_IMPROVEMENT_PLAN_2026-06.md` |

**Golden profiles added:**

| Query id | Review slug | Product id | Landing |
|----------|-------------|------------|---------|
| flagship-vic-yu-12 | victor-yu-12-racket-review | vic-yu-12 | /best/intermediate-rackets/ |
| flagship-ln-halbertec-9000 | li-ning-halbertec-9000-standalone-review | ln-halbertec-9000 | /best/control-rackets/ |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 90 deferred items + competitive audit | ✅ |
| 2 | victor-yu-12-racket-review maps to `vic-yu-12` (racket) | ✅ |
| 3 | li-ning-halbertec-9000-standalone-review maps to `ln-halbertec-9000` (racket) | ✅ |
| 4 | `minMappedE2eGuards: 39` enforced in evaluator | ✅ |
| 5 | DriveX 8S assessed — no review article in `blog-articles.json` | ✅ blocked |
| 6 | Static export — no new API routes on site | ✅ |
| 7 | E2e count rises from 37 → 39 mapped review profiles | ✅ |
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
| Mapped review e2e golden profiles | 39 |
| Explainer slug golden profiles | 13/13 (unchanged) |
| Tier-4 reviews with e2e smoke | 13/13 (unchanged) |
| Commercial landings under image CI | 17/17 (unchanged) |
