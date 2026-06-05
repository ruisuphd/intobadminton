# Web App Improvement Plan — Sprint 44 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-1268`  
**Baseline:** Sprint 43 — discovery parity guard, search-submit catalog e2e (PR #191).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 44 response |
|------------|---------------------------|-------------------|
| **RacketGuide / retailer finders** | Regression-tested recommendation outputs per persona | ✅ Finder golden-profile baseline + CI guard |
| **RTINGS** | Scoring methodology locked with automated QA | ✅ Committed profiles for budget, injury, and premium bands |
| **Tennis Warehouse** | Single command refreshes all discovery guards | ✅ `npm run lint:discovery-baselines` meta-command |
| **Wirecutter** | End-to-end browser QA on core product funnel | ✅ Playwright smoke: quiz → results shortlist |
| **BadmintonCentral** | Community trust in recommendation quality | ✅ Transparent fit-score moat guarded in CI |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v26 offline recovery, lab + CrUX + GSC + search + catalog + discovery parity + finder profile CI guards.

---

## 2. Top 5 gaps (Sprint 44)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Scoring engine lacks committed golden-profile CI guard** | Persona regressions invisible until manual QA | ✅ `finder-profile-queries.json` + evaluator |
| 2 | **No unified operator command for all discovery baselines** | Agents refresh one JSON layer and miss others | ✅ `npm run lint:discovery-baselines` |
| 3 | **No browser e2e tying quiz funnel to scoring output** | Static export quiz DOM can drift from scoring | ✅ `e2e/finder-baseline-smoke.spec.ts` |
| 4 | **Baselines README omitted finder scoring layer** | Wrong JSON files refreshed on scoring changes | ✅ README finder + unified sections |
| 5 | **Budget / injury / premium scoring paths untracked in committed baselines** | Core moat scenarios only in ad-hoc unit tests | ✅ Six golden profiles in JSON |

**Deferred (owner / editorial):** deploy reactions worker + `REACTIONS_API_URL`; fill `crux-template.csv` and `gsc-template.csv`; original `public/products/` photography; YouTube `sameAs` after channel claim.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Finder baseline evaluator | `src/lib/finder-baseline.ts` |
| Golden profiles | `docs/baselines/finder-profile-queries.json` |
| Unit tests | `src/lib/finder-baseline.test.ts` |
| CLI guard | `scripts/finder-baseline.mjs` |
| Unified discovery command | `scripts/discovery-baselines.mjs` |
| Playwright smoke | `e2e/finder-baseline-smoke.spec.ts` |
| CI step | `.github/workflows/ci.yml` |
| Baselines README | `docs/baselines/README.md` |
| Master plan | `docs/WEB_APP_IMPROVEMENT_PLAN_2026-06.md` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 43 deferred items + competitive audit | ✅ |
| 2 | Golden JSON validates schema (profile + scoring expectations) | ✅ |
| 3 | All six profiles pass live scoring engine | ✅ |
| 4 | Budget beginner top-3 stays under $150 | ✅ |
| 5 | Ankle-injury profile avoids extra-stiff top pick | ✅ |
| 6 | Static export — no new API routes | ✅ |
| 7 | Unit tests: schema + evaluator + edge cases | ✅ |
| 8 | `npm run lint:finder-baseline` + `lint:discovery-baselines` pass | ✅ |
| 9 | `npm test` + `npm run build` | ✅ |
| 10 | Master plan doc updated with Sprint 44 entry | ✅ |

---

## 5. Verification

```bash
npm test
npm run lint:discovery-baselines
npm run lint:finder-baseline
npm run build
npm run test:e2e -- e2e/finder-baseline-smoke.spec.ts
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
| Review→product map (mappable slugs) | 100% (140/140) |
