# Web App Improvement Plan — Sprint 42 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-8fec`  
**Baseline:** Sprint 41 — search routing/autocomplete golden queries, reactions worker contract tests (PR #189).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 42 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | Filter regression discipline on SKU/spec queries | ✅ Catalog keyword golden-query baseline + CI guard |
| **RTINGS** | Lab / field / search / catalog metrics tracked separately | ✅ README five-surface separation (adds catalog keyword layer) |
| **Wirecutter** | Browser QA on engagement surfaces | ✅ HelpfulReaction vote-persistence e2e smoke |
| **Running Warehouse** | Operator runbook for refreshing baselines | ✅ `npm run lint:catalog-baseline` + catalog e2e from committed JSON |
| **BadmintonCentral** | Cross-user helpful counts | ✅ Reactions client↔worker contract parity module |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v26 offline recovery, lab + CrUX + GSC + on-site search + catalog keyword CI guards.

---

## 2. Top 5 gaps (Sprint 42)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Catalog `?q=` keyword filter unguarded in CI** | Retailer-style browse regressions invisible | ✅ `catalog-keyword-queries.json` + `lint:catalog-baseline` |
| 2 | **Search baseline covered index/routing but not catalog filter parity** | Product-intent routing could drift from catalog matches | ✅ Golden queries for SKU/spec tokens (`ac102c`, `p9200`, `4u head light`) |
| 3 | **Reactions worker contract tested but client parsing diverged silently** | Deploy breaks aggregate counts UI | ✅ `reactions-contract.ts` shared by client + worker contract tests |
| 4 | **No browser e2e for HelpfulReaction vote persistence** | Engagement UX regressions undetected | ✅ `e2e/helpful-reaction-smoke.spec.ts` |
| 5 | **Baselines README omitted catalog keyword layer** | Agents compare wrong discovery surfaces | ✅ README catalog section before on-site search |

**Deferred (owner / editorial):** deploy reactions worker + `REACTIONS_API_URL`; fill `crux-template.csv` and `gsc-template.csv` from live exports; original `public/products/` photography; uncomment YouTube `sameAs` after channel claim.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Catalog baseline evaluator | `src/lib/catalog-baseline.ts` |
| Golden queries (9 total) | `docs/baselines/catalog-keyword-queries.json` |
| Baseline unit tests | `src/lib/catalog-baseline.test.ts` |
| Reactions contract module | `src/lib/reactions-contract.ts` |
| Contract parity tests | `src/lib/reactions-contract.test.ts` |
| Client uses shared contract | `src/lib/reactions-api.ts` |
| CLI guard | `scripts/catalog-baseline.mjs` |
| Playwright catalog golden-query smoke | `e2e/catalog-baseline-smoke.spec.ts` |
| Playwright helpful-reaction smoke | `e2e/helpful-reaction-smoke.spec.ts` |
| CI catalog guard | `.github/workflows/ci.yml` |
| Baselines README | `docs/baselines/README.md` |
| Master plan | `docs/WEB_APP_IMPROVEMENT_PLAN_2026-06.md` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 41 deferred items + competitive audit | ✅ |
| 2 | Golden JSON validates extended schema (min/max/product/brand fields) | ✅ |
| 3 | All 9 catalog queries pass against live product index | ✅ |
| 4 | SKU queries (`ac102c`, `bg65`) match catalog rows | ✅ |
| 5 | Static export — no new API routes | ✅ |
| 6 | Unit tests: catalog schema + reactions contract parity | ✅ |
| 7 | `npm run lint:catalog-baseline` passes | ✅ |
| 8 | E2e smoke reads committed `"e2e"` catalog rows + guide reaction vote | ✅ |
| 9 | `npm test` + `npm run build` | ✅ |
| 10 | Master plan doc updated with Sprint 42 entry | ✅ |

---

## 5. Verification

```bash
npm test
npm run lint:search-baseline
npm run lint:catalog-baseline
npm run build
npm run test:e2e -- e2e/catalog-baseline-smoke.spec.ts e2e/helpful-reaction-smoke.spec.ts
```

---

## 6. Metrics (unchanged)

| Goal | Target |
|------|--------|
| Lighthouse performance (CrUX URLs) | ≥ 0.9 (lab baseline) |
| CrUX field data (when filled) | LCP ≤ 2500 ms, INP ≤ 200 ms, CLS ≤ 0.1 |
| GSC clicks/impressions (when filled) | No >10% drop vs committed baseline |
| On-site search golden queries | 100% pass in CI |
| Catalog keyword golden queries | 100% pass in CI |
| Review→product map (mappable slugs) | 100% (140/140) |
