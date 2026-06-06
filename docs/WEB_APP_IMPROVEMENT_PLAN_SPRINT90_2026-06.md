# Web App Improvement Plan — Sprint 90 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-2d5a`  
**Baseline:** Sprint 89 — attack/graduation AxForce 90 New / Astrox 77 Pro review-map e2e + `minMappedE2eGuards: 35` (PR #237).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 90 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | Defensive/all-round picks exit to spec PDP with finder panel | ✅ Halbertec 7000 II + Arcsaber 7 Tour review-map golden profiles + e2e |
| **Wirecutter** | Commercial defensive landings pair with editorial reviews | ✅ `/best/defensive-rackets/` wiring guarded for both SKUs |
| **RTINGS** | Review↔SKU map regressions caught in CI | ✅ `minMappedE2eGuards: 37` prevents silent e2e shrinkage |
| **RacketGuide** | Tier-4 value SKUs show verified distributor photos | ⏳ CN-market image backfill deferred (no Western listing found) |
| **BadmintonCentral** | Discontinued SKUs need honest imagery policy | ⏳ Nanoray Light 70i image hunt deferred (no verified Western listing found) |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v30, lab + CrUX + GSC + full product-funnel + editorial CI guards.

---

## 2. Top 5 gaps (Sprint 90)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Halbertec 7000 II lacks review-map e2e** | Li-Ning defensive pick on `/best/defensive-rackets/` unguarded | ✅ `flagship-ln-halbertec-7000-ii` golden profile + e2e |
| 2 | **Arcsaber 7 Tour lacks review-map e2e** | Yonex control-defensive pick on defensive + all-round landings unguarded | ✅ `flagship-yy-arcsaber-7-tour` golden profile + e2e |
| 3 | **DriveX 8S has no review article** | Victor all-round pick on 4 landings but no editorial slug to map | ⏳ Blocked — no `blog-articles.json` entry |
| 4 | **Nanoray Light 70i blocks 4 landings** | Discontinued SKU with no official product photo | ⏳ e78.us / Badminton Warehouse search found no verified Yonex listing; waivers unchanged |
| 5 | **HelpfulReaction has no public KV counts** | Social proof on guides/reviews | ⏳ Owner: set `REACTIONS_API_URL` + run wire workflow |

**Deferred (Sprint 91+):** tier-4 Western distributor image hunt; Nanoray Light 70i verified image; Thruster Ryuga II + DriveX 8S review ingestion; YouTube `sameAs`; `VideoObject` schema; fill CrUX/GSC CSV metrics; raise `TIER4_IMAGE_MIN_VERIFIED` to 2 when second SKU image lands.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| `minMappedE2eGuards: 37` coverage counter | `docs/baselines/review-product-map-queries.json` |
| Halbertec 7000 II + Arcsaber 7 Tour golden profiles | same baseline file |
| Unit tests | `src/lib/review-product-map-baseline.test.ts` |
| Master plan | `docs/WEB_APP_IMPROVEMENT_PLAN_2026-06.md` |

**Golden profiles added:**

| Query id | Review slug | Product id | Landing |
|----------|-------------|------------|---------|
| flagship-ln-halbertec-7000-ii | li-ning-halbertec-7000-ii-review | ln-halbertec-7000-ii | /best/defensive-rackets/, /best/all-round-rackets/ |
| flagship-yy-arcsaber-7-tour | yonex-arcsaber-7-tour-review | yy-arcsaber-7-tour | /best/defensive-rackets/, /best/all-round-rackets/ |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 89 deferred items + competitive audit | ✅ |
| 2 | li-ning-halbertec-7000-ii-review maps to `ln-halbertec-7000-ii` (racket) | ✅ |
| 3 | yonex-arcsaber-7-tour-review maps to `yy-arcsaber-7-tour` (racket) | ✅ |
| 4 | `minMappedE2eGuards: 37` enforced in evaluator | ✅ |
| 5 | DriveX 8S assessed — no review article in `blog-articles.json` | ✅ blocked |
| 6 | Static export — no new API routes on site | ✅ |
| 7 | E2e count rises from 35 → 37 mapped review profiles | ✅ |
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
| Mapped review e2e golden profiles | 37 |
| Explainer slug golden profiles | 13/13 (unchanged) |
| Tier-4 reviews with e2e smoke | 13/13 (unchanged) |
| Commercial landings under image CI | 17/17 (unchanged) |
