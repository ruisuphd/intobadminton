# Web App Improvement Plan — Sprint 57 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-d566`  
**Baseline:** Sprint 56 — per-article review golden profiles (PR #204).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 57 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | Homepage drives filtered browse + category intent | ✅ CrUX homepage golden profile with catalog/finder exit + commercial deep-links |
| **Wirecutter** | Landing page surfaces latest reviews + buying guides | ✅ Featured review slice + popular-search grid guarded in CI |
| **RacketGuide** | Calculator/finder entry above the fold | ✅ Finder CTA href regression guard on `/` |
| **RTINGS** | Every mapped review article exits to filtered catalog | ✅ Review map ↔ reviews baseline parity + e2e on all 5 mapped slugs |
| **BadmintonCentral** | Large review archive with consistent cross-links | ✅ `coverage.requireReviewMapParity` prevents guard scope shrinkage |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v26, lab + CrUX + GSC + full product-funnel + editorial CI guards.

---

## 2. Top 5 gaps (Sprint 57)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **CrUX homepage `/` lacks golden-profile CI guard** | Only CrUX URL without committed regression layer | ✅ `home-queries.json` + `home-baseline.ts` |
| 2 | **Homepage popular-search grid not regression-guarded** | Commercial deep-link regressions invisible | ✅ Shared `home-popular-searches.ts` + CrUX href expectations |
| 3 | **3 mapped review slugs lack e2e smoke** | DriveX, P9200, Bonny panels untested in browser | ✅ `e2e: true` on all mapped review rows |
| 4 | **Review map and reviews baselines can drift** | Map guard passes but article guard missing rows | ✅ `requireReviewMapParity` coverage counter |
| 5 | **No unified discovery command for homepage guard** | Operators refresh search/catalog but miss homepage | ✅ `lint:home-baseline` in `lint:discovery-baselines` + CI |

**Deferred (Sprint 58+):** owner deploy reactions worker + `REACTIONS_API_URL`; fill CrUX/GSC CSVs; original photography; YouTube `sameAs`; expand per-article review profiles beyond map parity set.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Homepage golden profile | `docs/baselines/home-queries.json`, `src/lib/home-baseline.ts` |
| Shared popular searches | `src/lib/home-popular-searches.ts`, `src/components/LocalizedHome.tsx` |
| Reviews map parity | `src/lib/reviews-baseline.ts`, `docs/baselines/reviews-queries.json` |
| Unit tests | `src/lib/home-baseline.test.ts`, `src/lib/reviews-baseline.test.ts` |
| Playwright smoke | `e2e/home-baseline-smoke.spec.ts`, `e2e/reviews-baseline-smoke.spec.ts` |
| CI + scripts | `.github/workflows/ci.yml`, `scripts/discovery-baselines.mjs`, `package.json` |
| Baselines README | `docs/baselines/README.md` |
| Master plan | `docs/WEB_APP_IMPROVEMENT_PLAN_2026-06.md` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 56 deferred items + competitive audit | ✅ |
| 2 | Golden JSON validates schema (catalog + finder hrefs) | ✅ |
| 3 | All CrUX commercial paths in homepage popular-search grid | ✅ |
| 4 | All review-map article slugs in reviews baseline | ✅ |
| 5 | Mapped review articles have equipment finder panel e2e | ✅ |
| 6 | Static export — no new API routes | ✅ |
| 7 | Unit tests: schema + evaluator + parity counter | ✅ |
| 8 | `npm run lint:discovery-baselines` + `lint:editorial-baselines` pass | ✅ |
| 9 | `npm test` + `npm run build` | ✅ |
| 10 | Baseline e2e smoke passes on homepage + review articles | ✅ |

---

## 5. Verification

```bash
npm test
npm run lint:home-baseline
npm run lint:discovery-baselines
npm run lint:editorial-baselines
npm run build
npm run test:e2e -- e2e/home-baseline-smoke.spec.ts e2e/reviews-baseline-smoke.spec.ts
```

---

## 6. Metrics (unchanged)

| Goal | Target |
|------|--------|
| Lighthouse performance (CrUX URLs) | ≥ 0.9 (lab baseline) |
| CrUX URL golden-profile coverage | 100% (homepage closes last gap) |
| Reviews golden profiles | Hub + all review-map article slugs in CI |
| Product funnel golden profiles | 100% pass in CI |
| Editorial hub golden profiles | 100% pass in CI |
