# Web App Improvement Plan — Sprint 106 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-4e07`  
**Baseline:** Sprint 105 — shoe three-way editorial parity CI + PDP slug alignment (PR #253).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 106 response |
|------------|---------------------------|---------------------|
| **Tennis Warehouse** | Racket PDP, category browse, and buying guides agree on editorial exit per SKU | ✅ Racket three-way parity guard (PDP ↔ catalog ↔ commercial) |
| **Wirecutter** | 13 programmatic racket landings with consistent review depth links | ✅ 44 unique SKUs across all `/best/*` racket landings |
| **RTINGS** | Cross-surface regression on the primary equipment category | ✅ `lint:racket-editorial-baselines` aggregate + CI workflow |
| **RacketGuide-style finders** | Filter-first catalog exits to mapped reviews | ✅ `catalog-racket-queries.json` golden profiles |
| **YouTube-first reviewers** | Video evidence on product pages | ⏳ `VideoObject` schema still deferred |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v31, 56 review-map golden profiles, 18/18 commercial image CI, string/shuttle/shoe three-way parity.

---

## 2. Top 5 gaps (Sprint 106)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Racket PDP/catalog/commercial parity unasserted** | Largest category (99 SKUs) had review-map CI but no cross-surface guard | ✅ `racket-editorial-parity.ts` three-way unit guard (44 commercial picks) |
| 2 | **Missing PDP golden profiles for racket commercial picks** | Only 4/44 racket picks had PDP baseline rows | ✅ 44 commercial + 2 PDP-only alias rows in `pdp-queries.json` |
| 3 | **No unified racket editorial lint command** | Operators ran PDP + review-map checks separately per category | ✅ `lint:racket-editorial-baselines` aggregate |
| 4 | **HelpfulReaction production wiring** | Social proof counts still local-only without owner secret | ⏳ Owner: set `REACTIONS_API_URL` + run wire workflow |
| 5 | **Nanoray Light 70i verified Western distributor image** | Budget speed pick lacks verified product photography | ⏳ Documented waiver on `/best/rackets-under-100/` |

**Deferred (Sprint 107+):** dedicated Yonex string hands-on articles; tier-4 Western distributor image backfill; YouTube `sameAs`; `VideoObject` schema; fill CrUX/GSC CSV metrics; grip/bag three-way parity.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Catalog + commercial golden profiles | `docs/baselines/catalog-racket-queries.json`, `docs/baselines/commercial-racket-queries.json` |
| Three-way parity evaluator + tests | `src/lib/racket-editorial-parity.ts`, `src/lib/racket-editorial-parity.test.ts` |
| Catalog + commercial baseline libs | `src/lib/catalog-racket-baseline.ts`, `src/lib/commercial-racket-baseline.ts` |
| PDP golden profiles (44 commercial racket SKUs) | `docs/baselines/pdp-queries.json` |
| CI lint scripts | `scripts/catalog-racket-baseline.mjs`, `scripts/commercial-racket-baseline.mjs`, `scripts/racket-editorial-parity.mjs`, `scripts/racket-editorial-baselines.mjs` |
| Baseline generator | `scripts/generate-racket-editorial-baselines.mjs` |
| E2E smoke | `e2e/catalog-racket-baseline-smoke.spec.ts`, `e2e/commercial-racket-baseline-smoke.spec.ts` |
| Editorial aggregate | `scripts/editorial-baselines.mjs` |
| CI workflow | `.github/workflows/ci.yml` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 105 deferred items + competitive audit | ✅ |
| 2 | All 44 commercial racket productIds in catalog + commercial baselines | ✅ |
| 3 | All 44 commercial racket productIds have PDP `expectCategory: racket` rows | ✅ |
| 4 | Alias picks (DriveX 8S, Nanoray Light 70i, Astrox 77 Play) use correct resolved review slugs | ✅ |
| 5 | Commercial queries include `expectBestSlug` for 13 racket landings | ✅ |
| 6 | Three-way parity agrees on slug/kind per productId | ✅ |
| 7 | PDP-only alias rows (`vic-thruster-ryuga-ii`, `bonny-leisu-800`) excluded from parity reverse check | ✅ |
| 8 | HelpfulReaction owner secret assessed — blocked on repo secret | ✅ deferred |
| 9 | Nanoray Light 70i image backfill assessed — no verified Western distributor URL | ✅ waiver documented |
| 10 | `npm test` + baselines + `npm run build` + racket e2e pass | ✅ |

---

## 5. Verification

```bash
npm test
npm run lint:racket-editorial-baselines
npm run lint:pdp-baseline
npm run build
npx playwright test e2e/catalog-racket-baseline-smoke.spec.ts e2e/commercial-racket-baseline-smoke.spec.ts
```

---

## 6. Metrics

| Goal | Target |
|------|--------|
| Commercial landings under image CI | 18/18 (unchanged) |
| PDP golden profiles with e2e | 38 (was 22; +16 racket) |
| Catalog racket golden profiles | 44 |
| Commercial racket golden profiles | 44 |
| Racket editorial three-way parity | 44/44 commercial picks |
| Shoe editorial three-way parity | 16/16 SKUs (unchanged) |
| Shuttle editorial three-way parity | 6/6 SKUs (unchanged) |
| String editorial three-way parity | 6/6 SKUs (unchanged) |
