# Web App Improvement Plan — Sprint 39 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-81b0`  
**Baseline:** Sprint 38 — CrUX field-data CI guard, GSC template (PR #186).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 39 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | Search Console trend exports for buying seasons | ✅ GSC CSV validator + regression guard scaffold |
| **RTINGS** | Lab + field + search metrics tracked separately | ✅ README documents lab / CrUX / GSC baseline layers |
| **Wirecutter** | Editorial performance regression discipline | ✅ >10% clicks/impressions drop guard when baseline filled |
| **Running Warehouse** | Owner runbook for refreshing search baselines | ✅ `npm run lint:gsc-baseline` + `scripts/gsc-baseline.mjs` |
| **BadmintonCentral** | Cross-user helpful counts | ⏳ Reactions worker deploy still owner (`REACTIONS_API_URL`) |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v26 offline recovery, lab + CrUX CI guards.

---

## 2. Top 5 gaps (Sprint 39)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **GSC template had no CI validator** | Owner could commit malformed Search Console exports | ✅ `src/lib/gsc-baseline.ts` + `lint:gsc-baseline` |
| 2 | **No GSC metric sanity checks when data filled** | Bad ctr/date rows would slip into baselines | ✅ Date range, ctr↔clicks parity, integer checks |
| 3 | **GSC regression rule documented but not automated** | >10% clicks/impressions drops invisible until manual review | ✅ `lint:gsc-baseline:compare` + committed baseline JSON |
| 4 | **Search vs lab vs field baselines conflated in docs** | Agents might compare GSC to Lighthouse incorrectly | ✅ README three-layer separation |
| 5 | **Partial GSC rows possible** | Mixed empty/filled cells hide bad exports | ✅ All-or-nothing metric rule per row |

**Deferred (owner / editorial):** deploy reactions worker + `REACTIONS_API_URL`; fill `crux-template.csv` and `gsc-template.csv` from live exports; original `public/products/` photography; uncomment YouTube `sameAs` after channel claim.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| GSC parse + validate | `src/lib/gsc-baseline.ts` |
| GSC baseline tests | `src/lib/gsc-baseline.test.ts` |
| CLI validator + compare | `scripts/gsc-baseline.mjs` |
| Committed baseline snapshot | `docs/baselines/gsc-performance-baseline.json` |
| CI search-performance guard | `.github/workflows/ci.yml` |
| Baselines README | `docs/baselines/README.md` |
| Master plan | `docs/WEB_APP_IMPROVEMENT_PLAN_2026-06.md` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 38 deferred items + competitive audit | ✅ |
| 2 | Validator accepts empty template (current production state) | ✅ |
| 3 | Validator fails on ctr/clicks mismatch when data present | ✅ |
| 4 | Partial metric rows rejected | ✅ |
| 5 | Static export — no new API routes | ✅ |
| 6 | Unit tests: gsc template + regression compare | ✅ |
| 7 | `npm run lint:gsc-baseline` uses Node 22 TS import | ✅ |
| 8 | CI runs after CrUX guard | ✅ |
| 9 | `npm test` + `npm run build` | ✅ |
| 10 | Master plan doc updated with Sprint 39 entry | ✅ |

---

## 5. Verification

```bash
npm test
npm run build
npm run lint:gsc-baseline
npm run lint:gsc-baseline:compare
```

---

## 6. Metrics (unchanged)

| Goal | Target |
|------|--------|
| Lighthouse performance (CrUX URLs) | ≥ 0.9 (lab baseline) |
| CrUX field data (when filled) | LCP ≤ 2500 ms, INP ≤ 200 ms, CLS ≤ 0.1 |
| GSC clicks/impressions (when filled) | No >10% drop vs committed baseline |
| Review→product map (mappable slugs) | 100% (140/140) |
