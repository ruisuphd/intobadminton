# Web App Improvement Plan — Sprint 56 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-0808`  
**Baseline:** Sprint 55 — golden-profile long tail, editorial hub guards (PR #203).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 56 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | Every review URL exits to filtered brand browse | ✅ 5 mapped review slugs with brand+category catalog exit in CI |
| **Wirecutter** | Individual review pages carry methodology + related picks | ✅ Equipment finder panel + Keep reading shelf guarded per article |
| **RTINGS** | Large review archive with consistent product cross-links | ✅ Hub + 6 priority article golden profiles in one guard |
| **BadmintonCentral** | Explainer articles separate from product reviews | ✅ Unmapped explainer guard (`how-to-choose-a-badminton-racket`) |
| **RacketGuide** | CrUX-priority review URLs regression-tested end-to-end | ✅ CrUX Arcsaber 7 Pro + flagship Nanoflare 1000Z in e2e smoke |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v26, lab + CrUX + GSC + full product-funnel + editorial CI guards.

---

## 2. Top 5 gaps (Sprint 56)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Reviews baseline only guards hub index** | 153-article archive regressions invisible at article level | ✅ Evaluator extended for per-article slugs |
| 2 | **5 review-product-map slugs lack review golden-profile rows** | Map guard passes but catalog CTA / shelf wiring untested | ✅ 5 mapped slugs committed in `reviews-queries.json` |
| 3 | **CrUX review URL lacks review-baseline e2e** | Product-map e2e covers finder but not Keep reading shelf | ✅ `crux-arcsaber-7-pro` e2e with shelf + panel |
| 4 | **Unmapped explainer lacks intentional regression guard** | Accidental product-map wiring would go unnoticed | ✅ `explainer-intentional-unmapped` row + e2e |
| 5 | **No coverage counter for article-level review profiles** | Future sprints could shrink guard scope silently | ✅ `coverage.minArticleSlugs: 5` in baseline JSON |

**Deferred (Sprint 57+):** owner deploy reactions worker + `REACTIONS_API_URL`; fill CrUX/GSC CSVs; original photography; YouTube `sameAs`; full Lighthouse review URL set in golden profiles.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Per-article review profiles | `docs/baselines/reviews-queries.json` |
| Extended evaluator | `src/lib/reviews-baseline.ts` |
| Unit tests | `src/lib/reviews-baseline.test.ts` |
| Playwright smoke updates | `e2e/reviews-baseline-smoke.spec.ts` |
| Baselines README | `docs/baselines/README.md` |
| Master plan | `docs/WEB_APP_IMPROVEMENT_PLAN_2026-06.md` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 55 deferred items + competitive audit | ✅ |
| 2 | Golden JSON validates schema (slug + expectCatalogHref + map fields) | ✅ |
| 3 | All 5 mapped review-product-map slugs have committed rows | ✅ |
| 4 | CrUX + flagship article slugs resolve catalog exit + enrichment | ✅ |
| 5 | Unmapped explainer stays outside product map | ✅ |
| 6 | Static export — no new API routes | ✅ |
| 7 | Unit tests: schema + evaluator + coverage counter | ✅ |
| 8 | `npm run lint:editorial-baselines` passes | ✅ |
| 9 | `npm test` + `npm run build` | ✅ |
| 10 | Baseline e2e smoke passes on hub + article slugs | ✅ |

---

## 5. Verification

```bash
npm test
npm run lint:reviews-baseline
npm run lint:editorial-baselines
npm run build
npm run test:e2e -- e2e/reviews-baseline-smoke.spec.ts
```

---

## 6. Metrics (unchanged)

| Goal | Target |
|------|--------|
| Lighthouse performance (CrUX URLs) | ≥ 0.9 (lab baseline) |
| Reviews golden profiles | Hub + 6 priority articles in CI |
| Product funnel golden profiles | 100% pass in CI |
| Editorial hub golden profiles | 100% pass in CI |
