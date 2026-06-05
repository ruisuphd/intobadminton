# Web App Improvement Plan — Sprint 52 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-d880`  
**Baseline:** Sprint 51 — guides golden baseline, editorial-baselines extension (PR #199).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 52 response |
|------------|---------------------------|-------------------|
| **RacketGuide** | Calculator → filtered catalogue browse | ✅ Tools golden-profile CI guard |
| **Tennis Warehouse** | Interactive spec tools with retailer exit | ✅ Catalog CTA + href parity on `/tools/*` |
| **RTINGS** | Explainer calculators with product browse | ✅ Finder + catalog dual CTA assertion in e2e |
| **Running Warehouse** | Browser QA on high-intent tool shells | ✅ Playwright smoke from baseline JSON |
| **BadmintonCentral** | String tension / level reference tools | ✅ 5-slug catalog filter coverage check |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v26, lab + CrUX + GSC + full product-funnel + editorial CI guards.

---

## 2. Top 5 gaps (Sprint 52)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Tools lack committed golden-profile CI guard** | Lighthouse calculator regressions invisible until manual audit | ✅ `tools-queries.json` + evaluator |
| 2 | **No unit guard for catalog exit wiring on `/tools/*`** | Slug→filter map drift breaks calculator→browse funnel | ✅ `toolCatalogFilterSlugs` parity checks |
| 3 | **No browser e2e tied to committed tool golden profiles** | Interactive layouts untested from baseline JSON | ✅ `e2e/tools-baseline-smoke.spec.ts` |
| 4 | **Baselines README omitted tools layer** | Wrong JSON files refreshed on tool changes | ✅ README tools section |
| 5 | **Editorial baselines command omitted tools guard** | Agents refresh guides but skip tools | ✅ `lint:editorial-baselines` extended |

**Deferred (Sprint 53+):** brands golden baseline; extend `guides-queries.json` with 5 missing Lighthouse slugs; extend `best-queries.json`; review hub golden profile; owner deploy reactions worker + `REACTIONS_API_URL`; fill CrUX/GSC CSVs; original photography; YouTube `sameAs`.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Tools evaluator | `src/lib/tools-baseline.ts` |
| Golden tool profiles | `docs/baselines/tools-queries.json` |
| Unit tests | `src/lib/tools-baseline.test.ts` |
| CLI guard | `scripts/tools-baseline.mjs` |
| Catalog filter slug export | `src/lib/catalog-url.ts` (`toolCatalogFilterSlugs`) |
| Extended editorial command | `scripts/editorial-baselines.mjs` |
| Playwright smoke | `e2e/tools-baseline-smoke.spec.ts` |
| CI step | `.github/workflows/ci.yml` |
| Baselines README | `docs/baselines/README.md` |
| Master plan | `docs/WEB_APP_IMPROVEMENT_PLAN_2026-06.md` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 51 deferred items + competitive audit | ✅ |
| 2 | Golden JSON validates schema (slug + expectCatalogHref) | ✅ |
| 3 | All committed slugs pass catalog href + CTA label | ✅ |
| 4 | Catalog CTA labels resolve for every wired slug | ✅ |
| 5 | Coverage matches 5 tool catalog filter slugs | ✅ |
| 6 | Static export — no new API routes | ✅ |
| 7 | Unit tests: schema + evaluator + href parity | ✅ |
| 8 | `npm run lint:editorial-baselines` passes | ✅ |
| 9 | `npm test` + `npm run build` | ✅ |
| 10 | Master plan doc updated with Sprint 52 entry | ✅ |

---

## 5. Verification

```bash
npm test
npm run lint:tools-baseline
npm run lint:editorial-baselines
npm run lint:all-baselines
npm run build
npm run test:e2e -- e2e/tools-baseline-smoke.spec.ts
```

---

## 6. Metrics (unchanged)

| Goal | Target |
|------|--------|
| Lighthouse performance (CrUX URLs) | ≥ 0.9 (lab baseline) |
| Tools golden profiles | 100% pass in CI |
| Guides golden profiles | 100% pass in CI |
| Compare-guides golden profiles | 100% pass in CI |
| Best-of golden profiles | 100% pass in CI |
| PDP golden profiles | 100% pass in CI |
| Product funnel golden profiles | 100% pass in CI |
