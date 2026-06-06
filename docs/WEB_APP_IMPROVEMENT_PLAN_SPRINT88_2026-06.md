# Web App Improvement Plan — Sprint 88 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-19c0`  
**Baseline:** Sprint 87 — Victor/Li-Ning classic Jetspeed 12 / Halbertec 8000 review-map e2e + `minMappedE2eGuards: 31` (PR #235, merged).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 88 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | Head-light speed picks exit to spec PDP with finder panel | ✅ Bladex 800 Speed + Auraspeed Fantome review-map golden profiles + e2e |
| **Wirecutter** | Speed-tier rackets pair with commercial landings | ✅ Li-Ning Bladex 800 Speed wiring guarded on /best/head-light-rackets/ |
| **RTINGS** | Review↔SKU map regressions caught in CI | ✅ `minMappedE2eGuards: 33` prevents silent e2e shrinkage |
| **RacketGuide** | Tier-4 value SKUs show verified distributor photos | ⏳ CN-market image backfill deferred (no Western listing found) |
| **BadmintonCentral** | Discontinued SKUs need honest imagery policy | ⏳ Nanoray Light 70i image hunt deferred (no verified Western listing found) |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v30, lab + CrUX + GSC + full product-funnel + editorial CI guards.

---

## 2. Top 5 gaps (Sprint 88)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Bladex 800 Speed lacks review-map e2e** | Li-Ning speed flagship review wiring unguarded on head-light landing | ✅ `flagship-ln-bladex-800-speed` golden profile + e2e |
| 2 | **Auraspeed Fantome lacks review-map e2e** | Victor head-light speed review regressions slip through | ✅ `flagship-vic-auraspeed-fantome` golden profile + e2e |
| 3 | **Thruster Ryuga II has no review article** | Victor attack flagship in catalogue but no editorial slug to map | ⏳ Blocked — no `blog-articles.json` entry; Fantome substituted on same landing |
| 4 | **Nanoray Light 70i blocks 4 landings** | Discontinued SKU with no official product photo | ⏳ e78.us / Badminton Warehouse search found no verified Yonex listing; waivers unchanged |
| 5 | **HelpfulReaction has no public KV counts** | Social proof on guides/reviews | ⏳ Owner: set `REACTIONS_API_URL` + run wire workflow |

**Deferred (Sprint 89+):** tier-4 Western distributor image hunt; Nanoray Light 70i verified image; Thruster Ryuga II review ingestion; YouTube `sameAs`; `VideoObject` schema; fill CrUX/GSC CSV metrics; raise `TIER4_IMAGE_MIN_VERIFIED` to 2 when second SKU image lands; AxForce 90 New + DriveX 8S review-map e2e.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| `minMappedE2eGuards: 33` coverage counter | `docs/baselines/review-product-map-queries.json` |
| Bladex 800 Speed + Auraspeed Fantome golden profiles | same baseline file |
| Unit tests | `src/lib/review-product-map-baseline.test.ts` |
| Master plan | `docs/WEB_APP_IMPROVEMENT_PLAN_2026-06.md` |

**Golden profiles added:**

| Query id | Review slug | Product id | Landing |
|----------|-------------|------------|---------|
| flagship-ln-bladex-800-speed | li-ning-bladex-800-speed-tough-elastic | ln-bladex-800-speed | /best/head-light-rackets/, /compare-guides/bladex-800-speed-vs-nanoflare-1000z/ |
| flagship-vic-auraspeed-fantome | victor-auraspeed-fantome-review | vic-auraspeed-fantome | /best/head-light-rackets/ |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 87 deferred items + competitive audit | ✅ |
| 2 | li-ning-bladex-800-speed-tough-elastic maps to `ln-bladex-800-speed` (racket) | ✅ |
| 3 | victor-auraspeed-fantome-review maps to `vic-auraspeed-fantome` (racket) | ✅ |
| 4 | `minMappedE2eGuards: 33` enforced in evaluator | ✅ |
| 5 | Thruster Ryuga II assessed — no review article in `blog-articles.json` | ✅ blocked |
| 6 | Static export — no new API routes on site | ✅ |
| 7 | E2e count rises from 31 → 33 mapped review profiles | ✅ |
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
| Mapped review e2e golden profiles | 33 |
| Explainer slug golden profiles | 13/13 (unchanged) |
| Tier-4 reviews with e2e smoke | 13/13 (unchanged) |
| Commercial landings under image CI | 17/17 (unchanged) |
