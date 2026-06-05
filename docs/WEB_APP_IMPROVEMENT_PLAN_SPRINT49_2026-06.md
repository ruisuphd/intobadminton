# Web App Improvement Plan — Sprint 49 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-24cb`  
**Baseline:** Sprint 48 — PDP golden baseline, all-baselines command (PR #196).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 49 response |
|------------|---------------------------|-------------------|
| **Wirecutter** | Programmatic best-of with comparison tables + catalog exit | ✅ Best-of golden-profile CI guard |
| **Tennis Warehouse** | Filtered browse from every buying guide | ✅ `catalogHrefFromBestSlug` committed expectations |
| **RTINGS** | Illustrative scores on buying guides | ✅ Fit-score wiring on mapped shoe pick |
| **Running Warehouse** | Browser QA on high-intent best-of shells | ✅ Playwright smoke from baseline JSON |
| **BadmintonCentral** | Category-specific shoe/string guides | ✅ Strings + shoes + budget slug rows |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v26, lab + CrUX + GSC + full product-funnel + editorial CI guards.

---

## 2. Top 5 gaps (Sprint 49)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Best-of lacks committed golden-profile CI guard** | Lighthouse best-of regressions invisible until manual audit | ✅ `best-queries.json` + evaluator |
| 2 | **No unit guard for catalog exit wiring on `/best/*`** | Slug→filter map drift breaks retailer-style browse | ✅ `catalogHrefFromBestSlug` parity checks |
| 3 | **No browser e2e tied to committed best-of golden profiles** | `best-smoke.spec.ts` uses hardcoded slug, not baseline JSON | ✅ `e2e/best-baseline-smoke.spec.ts` |
| 4 | **Baselines README omitted best-of layer** | Wrong JSON files refreshed on best-of changes | ✅ README best-of section |
| 5 | **Editorial baselines command omitted best-of guard** | Agents refresh PDP/review map but skip best-of | ✅ `lint:editorial-baselines` extended |

**Deferred (owner / editorial):** deploy reactions worker + `REACTIONS_API_URL`; fill `crux-template.csv` and `gsc-template.csv`; original `public/products/` photography; YouTube `sameAs` after channel claim.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Best-of evaluator | `src/lib/best-baseline.ts` |
| Golden best-of profiles | `docs/baselines/best-queries.json` |
| Unit tests | `src/lib/best-baseline.test.ts` |
| CLI guard | `scripts/best-baseline.mjs` |
| Catalog filter slug export | `src/lib/catalog-url.ts` (`bestCatalogFilterSlugs`) |
| Extended editorial command | `scripts/editorial-baselines.mjs` |
| Playwright smoke | `e2e/best-baseline-smoke.spec.ts` |
| CI step | `.github/workflows/ci.yml` |
| Baselines README | `docs/baselines/README.md` |
| Master plan | `docs/WEB_APP_IMPROVEMENT_PLAN_2026-06.md` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 48 deferred items + competitive audit | ✅ |
| 2 | Golden JSON validates schema (slug + expectCatalogHref) | ✅ |
| 3 | All committed slugs pass catalog href + related reading | ✅ |
| 4 | Shoes pick preserves illustrative fit + review href | ✅ |
| 5 | Defensive top pick wired to catalogue + fit score | ✅ |
| 6 | Static export — no new API routes | ✅ |
| 7 | Unit tests: schema + evaluator + href parity | ✅ |
| 8 | `npm run lint:editorial-baselines` passes | ✅ |
| 9 | `npm test` + `npm run build` | ✅ |
| 10 | Master plan doc updated with Sprint 49 entry | ✅ |

---

## 5. Verification

```bash
npm test
npm run lint:best-baseline
npm run lint:editorial-baselines
npm run lint:all-baselines
npm run build
npm run test:e2e -- e2e/best-baseline-smoke.spec.ts
```

---

## 6. Metrics (unchanged)

| Goal | Target |
|------|--------|
| Lighthouse performance (CrUX URLs) | ≥ 0.9 (lab baseline) |
| Best-of golden profiles | 100% pass in CI |
| PDP golden profiles | 100% pass in CI |
| Review→product map golden profiles | 100% pass in CI |
| Product funnel golden profiles | 100% pass in CI |
