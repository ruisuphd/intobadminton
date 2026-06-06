# Web App Improvement Plan — Sprint 61 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-03c0`  
**Baseline:** Sprint 60 — compare-guide review golden profiles, parity guards (PR #208).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 61 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | Every PDP/review URL regression-tested in CI | ✅ 140 mapped review slugs in golden-profile CI |
| **RTINGS** | Full archive catalog-exit wiring guarded | ✅ `requireFullMappedParity` links reviews baseline to product map |
| **Wirecutter** | Large review corpus cannot silently drift | ✅ `sync-reviews-baseline.mjs` auto-sync on map expansion |
| **BadmintonCentral** | String/grip reviews still need catalog exits | ✅ Non-PDP categories get catalog href without finder panel |
| **RacketGuide** | Operator tooling for baseline maintenance | ✅ `npm run reviews:sync-baseline` |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v28, lab + CrUX + GSC + full product-funnel + editorial CI guards.

---

## 2. Top 5 gaps (Sprint 61)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Review golden profiles cover only 22/140 mapped slugs** | 85% of mapped reviews unguarded in CI | ✅ Expanded to 142 article rows (140 mapped + 2 explainers) |
| 2 | **No full-corpus parity guard** | New map entries can ship without baseline rows | ✅ `requireFullMappedParity` in `reviews-baseline.ts` |
| 3 | **String/grip mapped reviews fail PDP-style guards** | Auto-sync would break on non-review-eligible categories | ✅ Category-aware sync + full-catalog href resolver |
| 4 | **Manual baseline expansion does not scale** | 120+ rows error-prone to hand-author | ✅ `scripts/sync-reviews-baseline.mjs` |
| 5 | **Shared manifest for mapped slugs missing** | PWA/CI guards duplicate map keys | ✅ `src/lib/mapped-review-slugs.ts` |

**Deferred (Sprint 62+):** owner deploy reactions worker + `REACTIONS_API_URL`; fill CrUX/GSC CSVs; original photography; YouTube `sameAs`; PWA precache for full review corpus (impractical at 140+ URLs).

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Mapped slug manifest | `src/lib/mapped-review-slugs.ts`, `src/lib/mapped-review-slugs.test.ts` |
| Full-corpus parity guard | `src/lib/reviews-baseline.ts` |
| Baseline sync tooling | `scripts/sync-reviews-baseline.mjs`, `npm run reviews:sync-baseline` |
| Expanded golden profiles | `docs/baselines/reviews-queries.json` (22 → 142 article rows) |
| Unit tests | `src/lib/reviews-baseline.test.ts` |
| Baselines README | `docs/baselines/README.md` |
| Master plan | `docs/WEB_APP_IMPROVEMENT_PLAN_2026-06.md` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 60 deferred items + competitive audit | ✅ |
| 2 | Golden JSON validates schema for 142 article rows | ✅ |
| 3 | All 140 mapped slugs in reviews baseline | ✅ |
| 4 | String/grip rows omit finder panel, retain catalog exit | ✅ |
| 5 | Existing e2e flags preserved on priority slugs | ✅ |
| 6 | Static export — no new API routes | ✅ |
| 7 | Unit tests: mapped-review-slugs + full-corpus parity | ✅ |
| 8 | `npm run lint:editorial-baselines` pass | ✅ |
| 9 | `npm test` + `npm run build` | ✅ |
| 10 | Priority e2e smoke unchanged (`e2e/reviews-baseline-smoke.spec.ts`) | ✅ |

---

## 5. Verification

```bash
npm test
npm run lint:reviews-baseline
npm run lint:editorial-baselines
npm run build
```

---

## 6. Metrics (unchanged)

| Goal | Target |
|------|--------|
| Reviews golden profiles | Hub + full mapped corpus (140) in CI |
| Mapped corpus parity | 100% |
| Product funnel golden profiles | 100% pass in CI |
| Editorial hub golden profiles | 100% pass in CI |
