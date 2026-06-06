# Web App Improvement Plan — Sprint 94 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-b2af`  
**Baseline:** Sprint 93 — budget + wide-feet shoes commercial review-map e2e + `minMappedE2eGuards: 46` (PR #241).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 94 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | Budget racket picks exit to spec PDP with finder panel | ✅ Nanoflare 1000 Play + Arcsaber 7 Play review-map golden profiles + e2e |
| **Wirecutter** | Head-heavy-under-150 pairs every mapped pick with editorial review | ✅ Astrox Nextage review-map golden profile + e2e |
| **RTINGS** | Review↔SKU map regressions caught in CI | ✅ `minMappedE2eGuards: 51` prevents silent e2e shrinkage |
| **Tennis Warehouse** | String guides link to editorial string reviews | ✅ L69 string review-map golden profile + `string` in `reviewProductById` |
| **RacketGuide** | Tier-4 value SKUs show verified distributor photos | ⏳ CN-market image backfill deferred (no Western listing found) |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v30, lab + CrUX + GSC + full product-funnel + editorial CI guards.

---

## 2. Top 5 gaps (Sprint 94)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Nanoflare 1000 Play lacks review-map e2e** | #1 budget pick on `/best/rackets-under-100/` unguarded | ✅ `commercial-yy-nanoflare-1000-play` golden profile + e2e |
| 2 | **Arcsaber 7 Play lacks review-map e2e** | Control-first budget pick on `/best/rackets-under-100/` unguarded | ✅ `commercial-yy-arcsaber-7-play` golden profile + e2e |
| 3 | **Astrox Nextage lacks review-map e2e** | Forgiving attack pick on `/best/head-heavy-rackets-under-150/` unguarded | ✅ `commercial-yy-astrox-nextage` golden profile + e2e |
| 4 | **Thruster 9900 lacks review-map e2e** | Max-budget smash pick on `/best/rackets-under-100/` unguarded | ✅ `tier4-vic-thruster-9900` golden profile + e2e |
| 5 | **L69 string lacks review-map e2e** | Sole mapped pick on `/best/strings/` blocked by `reviewProductById` category gate | ✅ `string` in `REVIEW_ELIGIBLE_CATEGORIES` + `commercial-ln-l69-string` golden profile + e2e |

**Deferred (Sprint 95+):** tier-4 Western distributor image hunt; Nanoray Light 70i verified image; Thruster Ryuga II + DriveX 8S review ingestion; YouTube `sameAs`; `VideoObject` schema; fill CrUX/GSC CSV metrics; raise `TIER4_IMAGE_MIN_VERIFIED` to 2 when second SKU image lands; HelpfulReaction owner secret + wire workflow.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| `string` in `REVIEW_ELIGIBLE_CATEGORIES` | `src/lib/review-pages.ts`, `scripts/sync-reviews-baseline.mjs` |
| `minMappedE2eGuards: 51` coverage counter | `docs/baselines/review-product-map-queries.json` |
| 5 new golden profiles | same baseline file |
| Unit tests | `src/lib/review-product-map-baseline.test.ts` |
| Master plan | `docs/WEB_APP_IMPROVEMENT_PLAN_2026-06.md` |

**Golden profiles added:**

| Query id | Review slug | Product id | Landing |
|----------|-------------|------------|---------|
| commercial-yy-nanoflare-1000-play | yonex-nanoflare-1000z-play-review | yy-nanoflare-1000-play | /best/rackets-under-100/, /best/rackets-for-shoulder-comfort/ |
| commercial-yy-arcsaber-7-play | yonex-arcsaber-7-play-review | yy-arcsaber-7-play | /best/rackets-under-100/ |
| commercial-yy-astrox-nextage | yonex-astrox-nextage-review | yy-astrox-nextage | /best/head-heavy-rackets-under-150/ |
| tier4-vic-thruster-9900 | victor-thruster-9900-curiosity-review | vic-thruster-9900 | /best/rackets-under-100/ |
| commercial-ln-l69-string | li-ning-l69-string-review | ln-l69-string | /best/strings/ |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 93 deferred items + competitive audit | ✅ |
| 2 | yonex-nanoflare-1000z-play-review maps to `yy-nanoflare-1000-play` (racket) | ✅ |
| 3 | yonex-arcsaber-7-play-review maps to `yy-arcsaber-7-play` (racket) | ✅ |
| 4 | yonex-astrox-nextage-review maps to `yy-astrox-nextage` (racket) | ✅ |
| 5 | victor-thruster-9900-curiosity-review maps to `vic-thruster-9900` (racket) | ✅ |
| 6 | li-ning-l69-string-review maps to `ln-l69-string` (string) after category gate lift | ✅ |
| 7 | `minMappedE2eGuards: 51` enforced in evaluator | ✅ |
| 8 | Static export — no new API routes on site | ✅ |
| 9 | E2e count rises from 46 → 51 mapped review profiles | ✅ |
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
| Mapped review e2e golden profiles | 51 |
| Explainer slug golden profiles | 13/13 (unchanged) |
| Tier-4 reviews with e2e smoke | 14/14 (+ Thruster 9900) |
| Commercial landings under image CI | 17/17 (unchanged) |
