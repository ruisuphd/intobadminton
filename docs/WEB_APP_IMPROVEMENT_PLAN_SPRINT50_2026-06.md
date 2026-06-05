# Web App Improvement Plan — Sprint 50 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-7f36`  
**Baseline:** Sprint 49 — best-of golden baseline, editorial-baselines extension (PR #197).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 50 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | Head-to-head comparison articles → filtered catalogue browse | ✅ Compare-guides golden-profile CI guard |
| **RTINGS** | Side-by-side spec tables on every duel page | ✅ Duel layout table assertion in e2e |
| **Wirecutter** | Brand-family explainers with retailer exit | ✅ Concept layout catalog CTA in golden JSON |
| **Running Warehouse** | Browser QA on high-intent comparison shells | ✅ Playwright smoke from baseline JSON |
| **BadmintonCentral** | Archive of racket family debates | ✅ Manifest + related-reading parity checks |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v26, lab + CrUX + GSC + full product-funnel + editorial CI guards.

---

## 2. Top 5 gaps (Sprint 50)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Compare-guides lack committed golden-profile CI guard** | Lighthouse compare-guide regressions invisible until manual audit | ✅ `compare-guides-queries.json` + evaluator |
| 2 | **No unit guard for catalog exit wiring on `/compare-guides/*`** | Slug→filter map drift breaks retailer-style browse | ✅ `catalogHrefFromCompareSlug` parity checks |
| 3 | **No browser e2e tied to committed compare-guide golden profiles** | Duel vs concept layouts untested from baseline JSON | ✅ `e2e/compare-guides-baseline-smoke.spec.ts` |
| 4 | **Baselines README omitted compare-guides layer** | Wrong JSON files refreshed on compare-guide changes | ✅ README compare-guides section |
| 5 | **Editorial baselines command omitted compare-guides guard** | Agents refresh PDP/best-of but skip compare-guides | ✅ `lint:editorial-baselines` extended |

**Deferred (owner / editorial):** deploy reactions worker + `REACTIONS_API_URL`; fill `crux-template.csv` and `gsc-template.csv`; original `public/products/` photography; YouTube `sameAs` after channel claim.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Compare-guides evaluator | `src/lib/compare-guides-baseline.ts` |
| Golden compare-guide profiles | `docs/baselines/compare-guides-queries.json` |
| Unit tests | `src/lib/compare-guides-baseline.test.ts` |
| CLI guard | `scripts/compare-guides-baseline.mjs` |
| Catalog filter slug export | `src/lib/catalog-url.ts` (`compareCatalogFilterSlugs`) |
| Extended editorial command | `scripts/editorial-baselines.mjs` |
| Playwright smoke | `e2e/compare-guides-baseline-smoke.spec.ts` |
| CI step | `.github/workflows/ci.yml` |
| Baselines README | `docs/baselines/README.md` |
| Master plan | `docs/WEB_APP_IMPROVEMENT_PLAN_2026-06.md` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 49 deferred items + competitive audit | ✅ |
| 2 | Golden JSON validates schema (slug + expectCatalogHref) | ✅ |
| 3 | All committed slugs pass catalog href + related reading | ✅ |
| 4 | Duel pick preserves product id + review href wiring | ✅ |
| 5 | Manifest coverage matches 12 compare guides | ✅ |
| 6 | Static export — no new API routes | ✅ |
| 7 | Unit tests: schema + evaluator + href parity | ✅ |
| 8 | `npm run lint:editorial-baselines` passes | ✅ |
| 9 | `npm test` + `npm run build` | ✅ |
| 10 | Master plan doc updated with Sprint 50 entry | ✅ |

---

## 5. Verification

```bash
npm test
npm run lint:compare-guides-baseline
npm run lint:editorial-baselines
npm run lint:all-baselines
npm run build
npm run test:e2e -- e2e/compare-guides-baseline-smoke.spec.ts
```

---

## 6. Metrics (unchanged)

| Goal | Target |
|------|--------|
| Lighthouse performance (CrUX URLs) | ≥ 0.9 (lab baseline) |
| Compare-guides golden profiles | 100% pass in CI |
| Best-of golden profiles | 100% pass in CI |
| PDP golden profiles | 100% pass in CI |
| Product funnel golden profiles | 100% pass in CI |
