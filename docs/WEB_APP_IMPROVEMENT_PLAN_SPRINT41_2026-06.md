# Web App Improvement Plan — Sprint 41 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-c9e5`  
**Baseline:** Sprint 40 — on-site search golden-query baseline (PR #188).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 41 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | Search submit routes SKU queries to filtered browse | ✅ Golden queries for product-intent `/catalog/?q=` routing |
| **RTINGS** | Lab + field + search + UX layers tracked separately | ✅ Baseline covers index, submit routing, and autocomplete |
| **Wirecutter** | Browser QA before publish | ✅ Playwright smoke driven by committed `"e2e"` golden queries |
| **Running Warehouse** | Operator runbook for refreshing baselines | ✅ README documents routing + suggestion layers |
| **BadmintonCentral** | Cross-user helpful counts | ✅ Reactions worker contract tests (deploy still owner) |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v26 offline recovery, lab + CrUX + GSC + on-site search CI guards.

---

## 2. Top 5 gaps (Sprint 41)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Golden queries only tested `searchSite` index** | Submit routing regressions invisible | ✅ `expectSubmitHrefContains` expectations |
| 2 | **Autocomplete suggestions unguarded in CI** | Header combobox UX can drift | ✅ `expectFirstSuggestionKind` + suggestion href checks |
| 3 | **No browser e2e tied to committed golden queries** | Unit vs DOM mismatch undetected | ✅ `e2e/search-baseline-smoke.spec.ts` |
| 4 | **Reactions worker only scaffold-tested** | API contract breaks silently pre-deploy | ✅ `workers/reactions/index.test.js` contract suite |
| 5 | **Baselines README omitted routing/autocomplete layers** | Agents compare wrong search surfaces | ✅ README four-surface section |

**Deferred (owner / editorial):** deploy reactions worker + `REACTIONS_API_URL`; fill `crux-template.csv` and `gsc-template.csv` from live exports; original `public/products/` photography; uncomment YouTube `sameAs` after channel claim.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Routing + suggestion evaluators | `src/lib/search-baseline.ts` |
| Extended golden queries (29 total) | `docs/baselines/site-search-queries.json` |
| Baseline unit tests | `src/lib/search-baseline.test.ts` |
| Reactions worker contract tests | `workers/reactions/index.test.js` |
| Playwright golden-query smoke | `e2e/search-baseline-smoke.spec.ts` |
| Baselines README | `docs/baselines/README.md` |
| Master plan | `docs/WEB_APP_IMPROVEMENT_PLAN_2026-06.md` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 40 deferred items + competitive audit | ✅ |
| 2 | Golden JSON validates extended schema (routing + suggestion fields) | ✅ |
| 3 | All 29 queries pass against live index + routing + suggestions | ✅ |
| 4 | Product-intent queries (`ac102c`, `yy-ac102c`) route to catalog | ✅ |
| 5 | Static export — no new API routes | ✅ |
| 6 | Unit tests: schema + evaluator + worker contract | ✅ |
| 7 | `npm run lint:search-baseline` passes | ✅ |
| 8 | E2e smoke reads committed `"e2e"` queries only | ✅ |
| 9 | `npm test` + `npm run build` | ✅ |
| 10 | Master plan doc updated with Sprint 41 entry | ✅ |

---

## 5. Verification

```bash
npm test
npm run lint:search-baseline
npm run build
npm run test:e2e -- e2e/search-baseline-smoke.spec.ts
```

---

## 6. Metrics (unchanged)

| Goal | Target |
|------|--------|
| Lighthouse performance (CrUX URLs) | ≥ 0.9 (lab baseline) |
| CrUX field data (when filled) | LCP ≤ 2500 ms, INP ≤ 200 ms, CLS ≤ 0.1 |
| GSC clicks/impressions (when filled) | No >10% drop vs committed baseline |
| On-site search golden queries | 100% pass in CI |
| Review→product map (mappable slugs) | 100% (140/140) |
