# Web App Improvement Plan — Sprint 51 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-3690`  
**Baseline:** Sprint 50 — compare-guides golden baseline, editorial-baselines extension (PR #198).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 51 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | Procedural education → filtered catalogue browse | ✅ Guides golden-profile CI guard |
| **RTINGS** | How-to explainers with retailer exit | ✅ Catalog CTA + href parity on procedural guides |
| **Wirecutter** | Evergreen guides with related reading shelves | ✅ Keep reading shelf assertion in e2e |
| **Running Warehouse** | Browser QA on high-intent guide shells | ✅ Playwright smoke from baseline JSON |
| **BadmintonCentral** | String/shoe/doubles procedural archive | ✅ 11-slug catalog filter coverage check |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v26, lab + CrUX + GSC + full product-funnel + editorial CI guards.

---

## 2. Top 5 gaps (Sprint 51)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Guides lack committed golden-profile CI guard** | Lighthouse guide regressions invisible until manual audit | ✅ `guides-queries.json` + evaluator |
| 2 | **No unit guard for catalog exit wiring on `/guides/*`** | Slug→filter map drift breaks retailer-style browse | ✅ `catalogHrefFromGuideSlug` parity checks |
| 3 | **No browser e2e tied to committed guide golden profiles** | Procedural layouts untested from baseline JSON | ✅ `e2e/guides-baseline-smoke.spec.ts` |
| 4 | **Baselines README omitted guides layer** | Wrong JSON files refreshed on guide changes | ✅ README guides section |
| 5 | **Editorial baselines command omitted guides guard** | Agents refresh compare-guides but skip guides | ✅ `lint:editorial-baselines` extended |

**Deferred (owner / editorial):** deploy reactions worker + `REACTIONS_API_URL`; fill `crux-template.csv` and `gsc-template.csv`; original `public/products/` photography; YouTube `sameAs` after channel claim.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Guides evaluator | `src/lib/guides-baseline.ts` |
| Golden guide profiles | `docs/baselines/guides-queries.json` |
| Unit tests | `src/lib/guides-baseline.test.ts` |
| CLI guard | `scripts/guides-baseline.mjs` |
| Catalog filter slug export | `src/lib/catalog-url.ts` (`guideCatalogFilterSlugs`) |
| Extended editorial command | `scripts/editorial-baselines.mjs` |
| Playwright smoke | `e2e/guides-baseline-smoke.spec.ts` |
| CI step | `.github/workflows/ci.yml` |
| Baselines README | `docs/baselines/README.md` |
| Master plan | `docs/WEB_APP_IMPROVEMENT_PLAN_2026-06.md` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 50 deferred items + competitive audit | ✅ |
| 2 | Golden JSON validates schema (slug + expectCatalogHref) | ✅ |
| 3 | All committed slugs pass catalog href + related reading | ✅ |
| 4 | Catalog CTA labels resolve for every wired slug | ✅ |
| 5 | Coverage matches 11 guide catalog filter slugs | ✅ |
| 6 | Static export — no new API routes | ✅ |
| 7 | Unit tests: schema + evaluator + href parity | ✅ |
| 8 | `npm run lint:editorial-baselines` passes | ✅ |
| 9 | `npm test` + `npm run build` | ✅ |
| 10 | Master plan doc updated with Sprint 51 entry | ✅ |

---

## 5. Verification

```bash
npm test
npm run lint:guides-baseline
npm run lint:editorial-baselines
npm run lint:all-baselines
npm run build
npm run test:e2e -- e2e/guides-baseline-smoke.spec.ts
```

---

## 6. Metrics (unchanged)

| Goal | Target |
|------|--------|
| Lighthouse performance (CrUX URLs) | ≥ 0.9 (lab baseline) |
| Guides golden profiles | 100% pass in CI |
| Compare-guides golden profiles | 100% pass in CI |
| Best-of golden profiles | 100% pass in CI |
| PDP golden profiles | 100% pass in CI |
| Product funnel golden profiles | 100% pass in CI |
