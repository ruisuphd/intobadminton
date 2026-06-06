# Web App Improvement Plan — Sprint 55 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-cf6e`  
**Baseline:** Sprint 54 — guides/best baseline extension, reviews hub golden profile (PR #202).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 55 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | Every buying-guide URL exits to filtered browse | ✅ All 19 wired `/best/*` slugs in golden profiles |
| **Wirecutter** | Programmatic best-of long tail guarded in CI | ✅ 6 missing price-band/style slugs committed |
| **Tennis Warehouse** | Head-to-head duel archive fully regression-tested | ✅ All 12 compare-guide slugs in golden profiles |
| **RTINGS** | Hub pages drive discovery with catalog exit | ✅ Best/guides/compare/tools hub index golden profiles |
| **RacketGuide** | Calculator hub + shoe-fit education e2e | ✅ e2e backfill on guides, brands tier-2, tools court diagram |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v26, lab + CrUX + GSC + full product-funnel + editorial CI guards.

---

## 2. Top 5 gaps (Sprint 55)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **6 wired best-of slugs lack committed golden-profile rows** | Price-band and shoe-fit guides untested in CI | ✅ `best-queries.json` extended to 19 slugs + hub index |
| 2 | **6 compare-guide duels lack committed golden-profile rows** | Long-tail duels precached but unguarded | ✅ `compare-guides-queries.json` extended to 12 slugs + hub index |
| 3 | **4 editorial hub indexes lack golden-profile CI guard** | Hub shelf + catalog CTA regressions invisible | ✅ Hub `index` rows in best/guides/compare/tools baselines |
| 4 | **Committed golden rows lack browser e2e coverage** | CI unit guards pass but hub UX untested | ✅ e2e flags backfilled; hub-aware smoke specs |
| 5 | **Baseline evaluators don't support hub `index` slug** | Hub rows would fail schema evaluation | ✅ `bestPathForSlug` / guides / compare / tools index support |

**Deferred (Sprint 56+):** owner deploy reactions worker + `REACTIONS_API_URL`; fill CrUX/GSC CSVs; original photography; YouTube `sameAs`; per-article review golden profiles beyond hub.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Best-of long tail + hub | `docs/baselines/best-queries.json`, `src/lib/best-baseline.ts` |
| Compare-guides long tail + hub | `docs/baselines/compare-guides-queries.json`, `src/lib/compare-guides-baseline.ts` |
| Guides hub profile | `docs/baselines/guides-queries.json`, `src/lib/guides-baseline.ts` |
| Tools hub profile | `docs/baselines/tools-queries.json`, `src/lib/tools-baseline.ts` |
| Brands e2e backfill | `docs/baselines/brands-queries.json` |
| Playwright smoke updates | `e2e/best-baseline-smoke.spec.ts`, `e2e/guides-baseline-smoke.spec.ts`, `e2e/compare-guides-baseline-smoke.spec.ts` |
| Baselines README | `docs/baselines/README.md` |
| Master plan | `docs/WEB_APP_IMPROVEMENT_PLAN_2026-06.md` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 54 deferred items + competitive audit | ✅ |
| 2 | Golden JSON validates schema (slug + expectCatalogHref) | ✅ |
| 3 | All 19 best-of catalog filter slugs have committed rows | ✅ |
| 4 | All 12 compare-guide slugs have committed rows | ✅ |
| 5 | 4 editorial hub indexes resolve catalog exit + shelf/CTA | ✅ |
| 6 | Static export — no new API routes | ✅ |
| 7 | Unit tests: schema + evaluator + coverage counters | ✅ |
| 8 | `npm run lint:editorial-baselines` passes | ✅ |
| 9 | `npm test` + `npm run build` | ✅ |
| 10 | Baseline e2e smoke passes on hub + long-tail slugs | ✅ |

---

## 5. Verification

```bash
npm test
npm run lint:best-baseline
npm run lint:compare-guides-baseline
npm run lint:guides-baseline
npm run lint:tools-baseline
npm run lint:editorial-baselines
npm run build
npm run test:e2e -- e2e/best-baseline-smoke.spec.ts e2e/compare-guides-baseline-smoke.spec.ts e2e/guides-baseline-smoke.spec.ts e2e/tools-baseline-smoke.spec.ts
```

---

## 6. Metrics (unchanged)

| Goal | Target |
|------|--------|
| Lighthouse performance (CrUX URLs) | ≥ 0.9 (lab baseline) |
| Best-of golden profiles | 100% wired slugs in CI |
| Compare-guides golden profiles | 100% wired slugs in CI |
| Editorial hub golden profiles | 100% pass in CI |
| Product funnel golden profiles | 100% pass in CI |
