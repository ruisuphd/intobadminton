# Web App Improvement Plan — Sprint 45 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-cc4b`  
**Baseline:** Sprint 44 — finder golden-profile baseline, unified discovery-baselines command (PR #192).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 45 response |
|------------|---------------------------|-------------------|
| **RacketGuide / retailer finders** | Shareable recommendation links reproduce exact shortlists | ✅ Results URL golden-profile CI guard |
| **RTINGS** | Scoring methodology locked across surfaces (engine + share links) | ✅ URL serialisation ↔ scoring parity evaluator |
| **Tennis Warehouse** | Single operator command refreshes full product funnel guards | ✅ `npm run lint:product-funnel-baselines` |
| **Wirecutter** | End-to-end browser QA on shareable decision URLs | ✅ Playwright smoke: direct `/results/?` navigation |
| **BadmintonCentral** | Community trust in shared recommendation quality | ✅ Transparent fit-score moat guarded through share URLs |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v26 offline recovery, lab + CrUX + GSC + search + catalog + discovery parity + finder + results URL CI guards.

---

## 2. Top 5 gaps (Sprint 45)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Share URLs lack committed golden-profile CI guard** | URL serialisation regressions invisible until manual QA | ✅ `results-url-queries.json` + evaluator |
| 2 | **No unified operator command for full product funnel** | Agents refresh discovery or finder guards separately | ✅ `npm run lint:product-funnel-baselines` |
| 3 | **No browser e2e for direct share URL → shortlist** | Static export results page can drift from scoring | ✅ `e2e/results-url-baseline-smoke.spec.ts` |
| 4 | **Baselines README omitted results URL layer** | Wrong JSON files refreshed on share-link changes | ✅ README product-funnel + results URL sections |
| 5 | **Finder golden profiles not linked to share URL round-trip** | Scoring engine and URL layer tested in isolation | ✅ `finderProfileId` references in results URL JSON |

**Deferred (owner / editorial):** deploy reactions worker + `REACTIONS_API_URL`; fill `crux-template.csv` and `gsc-template.csv`; original `public/products/` photography; YouTube `sameAs` after channel claim.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Results URL evaluator | `src/lib/results-url-baseline.ts` |
| Golden share profiles | `docs/baselines/results-url-queries.json` |
| Unit tests | `src/lib/results-url-baseline.test.ts` |
| CLI guard | `scripts/results-url-baseline.mjs` |
| Unified product funnel command | `scripts/product-funnel-baselines.mjs` |
| Playwright smoke | `e2e/results-url-baseline-smoke.spec.ts` |
| CI step | `.github/workflows/ci.yml` |
| Baselines README | `docs/baselines/README.md` |
| Master plan | `docs/WEB_APP_IMPROVEMENT_PLAN_2026-06.md` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 44 deferred items + competitive audit | ✅ |
| 2 | Golden JSON validates schema (finderProfileId references) | ✅ |
| 3 | All share URLs pass URL round-trip + scoring parity | ✅ |
| 4 | Club doubles share URL preserves top product id | ✅ |
| 5 | Budget beginner share URL preserves price-band shortlist | ✅ |
| 6 | Static export — no new API routes | ✅ |
| 7 | Unit tests: schema + evaluator + share path builder | ✅ |
| 8 | `npm run lint:product-funnel-baselines` passes | ✅ |
| 9 | `npm test` + `npm run build` | ✅ |
| 10 | Master plan doc updated with Sprint 45 entry | ✅ |

---

## 5. Verification

```bash
npm test
npm run lint:product-funnel-baselines
npm run lint:results-url-baseline
npm run build
npm run test:e2e -- e2e/results-url-baseline-smoke.spec.ts
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
| Finder golden profiles | 100% pass in CI |
| Results share URL golden profiles | 100% pass in CI |
| Review→product map (mappable slugs) | 100% (140/140) |
