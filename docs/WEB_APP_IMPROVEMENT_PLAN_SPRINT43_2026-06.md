# Web App Improvement Plan — Sprint 43 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-62a2`  
**Baseline:** Sprint 42 — catalog keyword golden queries, reactions contract parity (PR #190).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 43 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | Search submit and filtered browse stay in sync on SKU queries | ✅ Discovery parity guard: product-intent routing ↔ catalog matches |
| **RTINGS** | Cross-surface metrics (search vs catalog) tracked separately | ✅ Sixth baselines layer in README + `lint:discovery-baseline` |
| **Wirecutter** | End-to-end browser QA on discovery funnels | ✅ Playwright smoke: header submit → catalog results |
| **Running Warehouse** | Single operator command refreshes all discovery guards | ✅ `npm run lint:discovery-baseline` after search + catalog guards |
| **BadmintonCentral** | Helpful counts after deploy | ✅ Reactions deploy runbook (owner steps unchanged) |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v26 offline recovery, lab + CrUX + GSC + search + catalog + discovery parity CI guards.

---

## 2. Top 5 gaps (Sprint 43)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Product-intent search routing tested separately from catalog filter** | Submit can route to empty catalog | ✅ `discovery-parity-queries.json` + evaluator |
| 2 | **No CI guard linking `searchSubmitHref` to catalog row counts** | SKU regressions slip between Sprint 41–42 guards | ✅ `npm run lint:discovery-baseline` |
| 3 | **No browser e2e for search-submit → catalog product list** | DOM routing vs static export mismatch | ✅ `e2e/discovery-parity-smoke.spec.ts` |
| 4 | **Baselines README omitted search↔catalog parity layer** | Agents refresh wrong JSON files | ✅ README discovery-parity section |
| 5 | **Reactions worker deploy steps scattered** | Owner cannot deploy aggregates quickly | ✅ `workers/reactions/README.md` deploy checklist |

**Deferred (owner / editorial):** deploy reactions worker + `REACTIONS_API_URL`; fill `crux-template.csv` and `gsc-template.csv`; original `public/products/` photography; YouTube `sameAs` after channel claim.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Discovery parity evaluator | `src/lib/discovery-parity.ts` |
| Golden pairs (product-intent) | `docs/baselines/discovery-parity-queries.json` |
| Unit tests | `src/lib/discovery-parity.test.ts` |
| CLI guard | `scripts/discovery-parity.mjs` |
| Playwright smoke | `e2e/discovery-parity-smoke.spec.ts` |
| CI step | `.github/workflows/ci.yml` |
| Baselines README | `docs/baselines/README.md` |
| Reactions deploy runbook | `workers/reactions/README.md` |
| Master plan | `docs/WEB_APP_IMPROVEMENT_PLAN_2026-06.md` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 42 deferred items + competitive audit | ✅ |
| 2 | Golden JSON validates schema (routing + catalog expectations) | ✅ |
| 3 | All product-intent pairs pass live routing + catalog filter | ✅ |
| 4 | `ac102c` / `yy-ac102c` route to catalog with SKU rows | ✅ |
| 5 | Static export — no new API routes | ✅ |
| 6 | Unit tests: schema + evaluator + parity edge cases | ✅ |
| 7 | `npm run lint:discovery-baseline` passes | ✅ |
| 8 | E2e smoke reads committed `"e2e"` rows only | ✅ |
| 9 | `npm test` + `npm run build` | ✅ |
| 10 | Master plan doc updated with Sprint 43 entry | ✅ |

---

## 5. Verification

```bash
npm test
npm run lint:search-baseline
npm run lint:catalog-baseline
npm run lint:discovery-baseline
npm run build
npm run test:e2e -- e2e/discovery-parity-smoke.spec.ts
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
| Discovery parity golden pairs | 100% pass in CI |
| Review→product map (mappable slugs) | 100% (140/140) |
