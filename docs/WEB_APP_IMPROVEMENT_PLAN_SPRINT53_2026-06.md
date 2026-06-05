# Web App Improvement Plan — Sprint 53 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-a504`  
**Baseline:** Sprint 52 — tools golden baseline, editorial-baselines extension (PR #200).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 53 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | Brand hubs with filtered SKU browse | ✅ Brands golden-profile CI guard |
| **Running Warehouse** | Brand landing → category-filtered catalog | ✅ Catalog CTA + href parity on `/brands/*` |
| **BadmintonCentral** | Manufacturer reference pages | ✅ 7 dedicated brand shells in baseline JSON |
| **Wirecutter** | Brand context → product discovery exit | ✅ Finder + catalog dual CTA assertion in e2e |
| **RacketGuide** | Hub pages with cross-link shelves | ✅ Brands index Keep reading shelf guard |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v26, lab + CrUX + GSC + full product-funnel + editorial CI guards.

---

## 2. Top 5 gaps (Sprint 53)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Brand landings lack committed golden-profile CI guard** | Lighthouse brand regressions invisible until manual audit | ✅ `brands-queries.json` + evaluator |
| 2 | **No unit guard for slug→brand name catalog exit wiring** | Brand slug drift breaks hub→browse funnel | ✅ `dedicatedBrandPageSlugs` + `catalogHrefFromBrandSlug` parity |
| 3 | **No browser e2e tied to committed brand golden profiles** | Brand layouts untested from baseline JSON | ✅ `e2e/brands-baseline-smoke.spec.ts` |
| 4 | **Baselines README omitted brands layer** | Wrong JSON files refreshed on brand changes | ✅ README brands section |
| 5 | **Editorial baselines command omitted brands guard** | Agents refresh tools but skip brands | ✅ `lint:editorial-baselines` extended |

**Deferred (Sprint 54+):** extend `guides-queries.json` with 5 missing Lighthouse slugs; extend `best-queries.json`; review hub golden profile; owner deploy reactions worker + `REACTIONS_API_URL`; fill CrUX/GSC CSVs; original photography; YouTube `sameAs`.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Brands evaluator | `src/lib/brands-baseline.ts` |
| Golden brand profiles | `docs/baselines/brands-queries.json` |
| Unit tests | `src/lib/brands-baseline.test.ts` |
| CLI guard | `scripts/brands-baseline.mjs` |
| Brand slug catalog export | `src/lib/catalog-url.ts` (`dedicatedBrandPageSlugs`, `catalogHrefFromBrandSlug`) |
| Extended editorial command | `scripts/editorial-baselines.mjs` |
| Playwright smoke | `e2e/brands-baseline-smoke.spec.ts` |
| CI step | `.github/workflows/ci.yml` |
| Baselines README | `docs/baselines/README.md` |
| Master plan | `docs/WEB_APP_IMPROVEMENT_PLAN_2026-06.md` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 52 deferred items + competitive audit | ✅ |
| 2 | Golden JSON validates schema (slug + expectCatalogHref) | ✅ |
| 3 | All committed dedicated brand slugs pass catalog href + CTA label | ✅ |
| 4 | Brands hub index resolves to full catalog exit | ✅ |
| 5 | Coverage matches 7 dedicated brand page slugs | ✅ |
| 6 | Static export — no new API routes | ✅ |
| 7 | Unit tests: schema + evaluator + href parity | ✅ |
| 8 | `npm run lint:editorial-baselines` passes | ✅ |
| 9 | `npm test` + `npm run build` | ✅ |
| 10 | Master plan doc updated with Sprint 53 entry | ✅ |

---

## 5. Verification

```bash
npm test
npm run lint:brands-baseline
npm run lint:editorial-baselines
npm run lint:all-baselines
npm run build
npm run test:e2e -- e2e/brands-baseline-smoke.spec.ts
```

---

## 6. Metrics (unchanged)

| Goal | Target |
|------|--------|
| Lighthouse performance (CrUX URLs) | ≥ 0.9 (lab baseline) |
| Brands golden profiles | 100% pass in CI |
| Tools golden profiles | 100% pass in CI |
| Guides golden profiles | 100% pass in CI |
| Compare-guides golden profiles | 100% pass in CI |
| Best-of golden profiles | 100% pass in CI |
| PDP golden profiles | 100% pass in CI |
| Product funnel golden profiles | 100% pass in CI |
