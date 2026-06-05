# Web App Improvement Plan — Sprint 46 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-b708`  
**Baseline:** Sprint 45 — results share URL golden baseline, unified product-funnel command (PR #193).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 46 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | Shareable compare trays reproduce exact product sets | ✅ Compare share URL golden-profile CI guard |
| **RTINGS** | Side-by-side spec tables locked across share links | ✅ URL serialisation ↔ catalog parity evaluator |
| **RacketGuide / retailer finders** | Persona shortlists feed one-click compare | ✅ Finder-derived top-pair compare baselines |
| **Wirecutter** | End-to-end browser QA on shareable decision URLs | ✅ Playwright smoke: direct `/compare/?` navigation |
| **BadmintonCentral** | Community trust in shared compare quality | ✅ Transparent spec-table moat guarded through share URLs |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v26 offline recovery, lab + CrUX + GSC + search + catalog + discovery parity + finder + results URL + compare share URL CI guards.

---

## 2. Top 5 gaps (Sprint 46)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Compare share URLs lack committed golden-profile CI guard** | Compare tray serialisation regressions invisible until manual QA | ✅ `compare-share-queries.json` + evaluator |
| 2 | **Product funnel command omitted compare layer** | Agents refresh discovery/finder/results guards but miss compare | ✅ `lint:product-funnel-baselines` extended |
| 3 | **No browser e2e for direct compare share URL → spec table** | Static export compare page can drift from catalog | ✅ `e2e/compare-baseline-smoke.spec.ts` |
| 4 | **Baselines README omitted compare share layer** | Wrong JSON files refreshed on compare URL changes | ✅ README compare share section |
| 5 | **Finder golden profiles not linked to compare top-pair round-trip** | Scoring engine and compare layer tested in isolation | ✅ `finderProfileId` references in compare JSON |

**Deferred (owner / editorial):** deploy reactions worker + `REACTIONS_API_URL`; fill `crux-template.csv` and `gsc-template.csv`; original `public/products/` photography; YouTube `sameAs` after channel claim.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Compare share evaluator | `src/lib/compare-baseline.ts` |
| Golden compare profiles | `docs/baselines/compare-share-queries.json` |
| Share path builder | `src/lib/compare-share-url.ts` (`buildCompareSharePath`) |
| Unit tests | `src/lib/compare-baseline.test.ts` |
| CLI guard | `scripts/compare-baseline.mjs` |
| Unified product funnel command | `scripts/product-funnel-baselines.mjs` |
| Playwright smoke | `e2e/compare-baseline-smoke.spec.ts` |
| CI step | `.github/workflows/ci.yml` |
| Baselines README | `docs/baselines/README.md` |
| Master plan | `docs/WEB_APP_IMPROVEMENT_PLAN_2026-06.md` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 45 deferred items + competitive audit | ✅ |
| 2 | Golden JSON validates schema (finderProfileId + productIds) | ✅ |
| 3 | All compare share URLs pass URL round-trip + catalog parity | ✅ |
| 4 | Flagship racket duel preserves both product ids | ✅ |
| 5 | Club doubles top-pair derives from finder golden profile | ✅ |
| 6 | Static export — no new API routes | ✅ |
| 7 | Unit tests: schema + evaluator + share path builder | ✅ |
| 8 | `npm run lint:product-funnel-baselines` passes | ✅ |
| 9 | `npm test` + `npm run build` | ✅ |
| 10 | Master plan doc updated with Sprint 46 entry | ✅ |

---

## 5. Verification

```bash
npm test
npm run lint:product-funnel-baselines
npm run lint:compare-baseline
npm run build
npm run test:e2e -- e2e/compare-baseline-smoke.spec.ts
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
| Compare share URL golden profiles | 100% pass in CI |
| Review→product map (mappable slugs) | 100% (140/140) |
