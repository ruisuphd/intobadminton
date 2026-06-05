# Web App Improvement Plan — Sprint 38 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-1be0`  
**Baseline:** Sprint 37 — Lighthouse CrUX lab baseline + CI regression guard (PR #185).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 38 response |
|------------|---------------------------|-------------------|
| **RTINGS** | Field CWV tracked over time with regression discipline | ✅ CrUX CSV validator + CI guard when metrics are filled |
| **Tennis Warehouse** | Search Console trend exports for buying seasons | ✅ `gsc-template.csv` + structural test |
| **Wirecutter** | Lab + field data kept in separate baselines | ✅ README documents lab (`lighthouse-scores.json`) vs field (`crux-template.csv`) |
| **Running Warehouse** | Owner runbook for refreshing baselines | ✅ `npm run lint:crux-baseline` + `scripts/crux-baseline.mjs` |
| **BadmintonCentral** | Cross-user helpful counts | ⏳ Reactions worker deploy still owner (`REACTIONS_API_URL`) |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v26 offline recovery, lab Lighthouse baseline guard.

---

## 2. Top 5 gaps (Sprint 38)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **CrUX template had no CI validation** | Owner could commit malformed PSI exports | ✅ `src/lib/crux-baseline.ts` + `lint:crux-baseline` |
| 2 | **No CWV threshold guard when field data filled** | Regressions invisible until manual PSI check | ✅ Good-tier LCP/INP/CLS enforcement |
| 3 | **GSC export format undocumented** | Inconsistent owner snapshots | ✅ `gsc-template.csv` + unit test |
| 4 | **Lab vs field baselines conflated in docs** | Agents might compare LHCI to CrUX incorrectly | ✅ README + sprint doc separation |
| 5 | **Partial CrUX rows possible** | Mixed empty/filled cells hide bad URLs | ✅ All-or-nothing metric rule per row |

**Deferred (owner / editorial):** deploy reactions worker + `REACTIONS_API_URL`; paste PSI metrics into `crux-template.csv`; original `public/products/` photography; YouTube `sameAs` after channel claim.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| CrUX parse + validate | `src/lib/crux-baseline.ts` |
| CrUX + GSC baseline tests | `src/lib/crux-baseline.test.ts`, `src/lib/gsc-baseline.test.ts` |
| CLI validator | `scripts/crux-baseline.mjs` |
| GSC template | `docs/baselines/gsc-template.csv` |
| CI field-data guard | `.github/workflows/ci.yml` |
| Baselines README | `docs/baselines/README.md` |
| Master plan | `docs/WEB_APP_IMPROVEMENT_PLAN_2026-06.md` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 37 deferred items + competitive audit | ✅ |
| 2 | Validator accepts empty template (current production state) | ✅ |
| 3 | Validator fails on LCP > 2500 ms when data present | ✅ |
| 4 | Partial metric rows rejected | ✅ |
| 5 | Static export — no new API routes | ✅ |
| 6 | Unit tests: crux + gsc templates | ✅ |
| 7 | `npm run lint:crux-baseline` uses Node 22 TS import | ✅ |
| 8 | CI runs after Lighthouse baseline compare | ✅ |
| 9 | `npm test` + `npm run build` | ✅ |
| 10 | Master plan doc updated with Sprint 38 entry | ✅ |

---

## 5. Verification

```bash
npm test
npm run build
npm run lint:crux-baseline
```

---

## 6. Metrics (unchanged)

| Goal | Target |
|------|--------|
| Lighthouse performance (CrUX URLs) | ≥ 0.9 (lab baseline) |
| CrUX field data (when filled) | LCP ≤ 2500 ms, INP ≤ 200 ms, CLS ≤ 0.1 |
| Review→product map (mappable slugs) | 100% (140/140) |
