# Web App Improvement Plan — Sprint 40 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-ba24`  
**Baseline:** Sprint 39 — GSC performance CI guard (PR #187).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 40 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | Search regression discipline on buying-season queries | ✅ Golden-query baseline + CI guard |
| **RTINGS** | Lab / field / search metrics tracked separately | ✅ README four-layer separation (lab, CrUX, GSC, on-site search) |
| **Wirecutter** | Editorial discovery QA before publish | ✅ Committed `site-search-queries.json` with 25 expectations |
| **Running Warehouse** | Operator runbook for refreshing baselines | ✅ `npm run lint:search-baseline` |
| **BadmintonCentral** | Cross-user helpful counts | ⏳ Reactions worker deploy still owner (`REACTIONS_API_URL`) |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v26 offline recovery, lab + CrUX + GSC CI guards.

---

## 2. Top 5 gaps (Sprint 40)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **No committed on-site search golden queries** | Index regressions invisible until manual QA | ✅ `docs/baselines/site-search-queries.json` |
| 2 | **Search quality not in CI** | Unlike lab/CrUX/GSC guards | ✅ `lint:search-baseline` in `lint-and-build` job |
| 3 | **Baselines README conflated GSC with on-site search** | Agents compare wrong layers | ✅ Four-layer README section |
| 4 | **Golden expectations scattered in unit tests only** | Hard to extend without code edits | ✅ JSON schema + `search-baseline.ts` validator |
| 5 | **Typo / body-only matches unguarded in CI** | Fuzzy search regressions slip through | ✅ Golden queries for typos + body excerpts |

**Deferred (owner / editorial):** deploy reactions worker + `REACTIONS_API_URL`; fill `crux-template.csv` and `gsc-template.csv` from live exports; original `public/products/` photography; uncomment YouTube `sameAs` after channel claim.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Golden-query schema + evaluator | `src/lib/search-baseline.ts` |
| Baseline tests | `src/lib/search-baseline.test.ts` |
| Committed expectations | `docs/baselines/site-search-queries.json` |
| CLI guard | `scripts/search-baseline.mjs` |
| CI search guard | `.github/workflows/ci.yml` |
| Baselines README | `docs/baselines/README.md` |
| Master plan | `docs/WEB_APP_IMPROVEMENT_PLAN_2026-06.md` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 39 deferred items + competitive audit | ✅ |
| 2 | Golden JSON validates structure (version, required fields) | ✅ |
| 3 | All 25 queries pass against live `searchSite` index | ✅ |
| 4 | Nonsense query guarded with `maxResults: 0` | ✅ |
| 5 | Static export — no new API routes | ✅ |
| 6 | Unit tests: schema + evaluator edge cases | ✅ |
| 7 | `npm run lint:search-baseline` uses Node 22 TS import | ✅ |
| 8 | CI runs after `npm test` in lint-and-build | ✅ |
| 9 | `npm test` + `npm run build` | ✅ |
| 10 | Master plan doc updated with Sprint 40 entry | ✅ |

---

## 5. Verification

```bash
npm test
npm run lint:search-baseline
npm run build
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
