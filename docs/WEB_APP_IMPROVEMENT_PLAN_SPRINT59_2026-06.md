# Web App Improvement Plan — Sprint 59 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-2b6e`  
**Baseline:** Sprint 58 — featured review golden profiles, homepage parity (PR #206).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 59 response |
|------------|---------------------------|-------------------|
| **RTINGS** | Every high-traffic review URL in perf CI with equipment panels | ✅ 6 review article URLs in Lighthouse CI + golden-profile parity |
| **Wirecutter** | Featured homepage reviews regression-tested in lab perf | ✅ Featured Gosen + Anta reviews added to `lighthouserc.json` |
| **Tennis Warehouse** | Flagship SKU reviews (Nanoflare, Tour series) in perf baseline | ✅ Nanoflare 1000Z + Tour buying guide in Lighthouse set |
| **BadmintonCentral** | Explainer articles distinct from product reviews in CI | ✅ Unmapped racket-chooser explainer in Lighthouse + baseline |
| **RacketGuide** | Shared URL parsing for PWA + CI guards | ✅ `lighthouse-paths.ts` module deduplicates parsing |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v26, lab + CrUX + GSC + full product-funnel + editorial CI guards.

---

## 2. Top 5 gaps (Sprint 59)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Lighthouse CI covers only 1 review article URL** | Perf regressions on flagship/featured reviews undetected | ✅ 5 additional review URLs in `lighthouserc.json` |
| 2 | **No lighthouse↔reviews baseline parity guard** | New Lighthouse review URLs could ship without golden profiles | ✅ `requireLighthouseParity` in `reviews-baseline.ts` |
| 3 | **Duplicated Lighthouse URL parsing** | PWA and baseline guards can drift on path normalisation | ✅ Shared `lighthouse-paths.ts` module |
| 4 | **Featured/popular review URLs absent from perf CI** | Homepage carousel + search grid articles lack lab regression signal | ✅ Gosen, Anta, Tour guide, Nanoflare in Lighthouse set |
| 5 | **Explainer review layout untested in Lighthouse** | Unmapped decision-path shelf regressions invisible in perf CI | ✅ `how-to-choose-a-badminton-racket` in Lighthouse set |

**Deferred (Sprint 60+):** owner deploy reactions worker + `REACTIONS_API_URL`; fill CrUX/GSC CSVs; original photography; YouTube `sameAs`; expand review golden profiles beyond Lighthouse set.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Shared Lighthouse path parser | `src/lib/lighthouse-paths.ts`, `src/lib/lighthouse-paths.test.ts` |
| Lighthouse review parity guard | `src/lib/reviews-baseline.ts`, `docs/baselines/reviews-queries.json` |
| Expanded Lighthouse CI URLs | `lighthouserc.json` |
| PWA ib-v27 precache | `public/sw.js`, `src/lib/pwa-precache-paths.ts` |
| PWA test deduplication | `src/lib/pwa-precache.test.ts` |
| Unit tests | `src/lib/reviews-baseline.test.ts` |
| Baselines README | `docs/baselines/README.md` |
| Master plan | `docs/WEB_APP_IMPROVEMENT_PLAN_2026-06.md` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 58 deferred items + competitive audit | ✅ |
| 2 | Golden JSON validates schema (slug + expectCatalogHref + map fields) | ✅ |
| 3 | All Lighthouse `/review/[slug]/` URLs in reviews baseline | ✅ |
| 4 | All 6 Lighthouse review article slugs have equipment panel or unmapped guard | ✅ |
| 5 | Shared module used by PWA precache test and reviews guard | ✅ |
| 6 | Static export — no new API routes | ✅ |
| 7 | Unit tests: lighthouse-paths + parity counter | ✅ |
| 8 | `npm run lint:discovery-baselines` + `lint:editorial-baselines` pass | ✅ |
| 9 | `npm test` + `npm run build` | ✅ |
| 10 | Baseline e2e smoke passes on review articles | ✅ |

---

## 5. Verification

```bash
npm test
npm run lint:reviews-baseline
npm run lint:discovery-baselines
npm run lint:editorial-baselines
npm run build
npm run test:e2e -- e2e/reviews-baseline-smoke.spec.ts
```

---

## 6. Metrics (unchanged)

| Goal | Target |
|------|--------|
| Lighthouse performance (CrUX URLs) | ≥ 0.9 (lab baseline) |
| Lighthouse review article URLs in golden profiles | 100% parity |
| Reviews golden profiles | Hub + map + featured + lighthouse articles in CI |
| Product funnel golden profiles | 100% pass in CI |
| Editorial hub golden profiles | 100% pass in CI |
