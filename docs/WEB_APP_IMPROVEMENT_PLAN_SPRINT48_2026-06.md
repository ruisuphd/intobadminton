# Web App Improvement Plan — Sprint 48 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-3c85`  
**Baseline:** Sprint 47 — review product map golden baseline, editorial-baselines command (PR #195).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 48 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | Every SKU has a spec-backed PDP with cross-sells | ✅ PDP golden-profile CI guard |
| **RTINGS** | Product pages wire to canonical review + schema | ✅ Review reverse-map + Product JSON-LD checks |
| **Wirecutter** | Buying guides exit to filtered catalogue browse | ✅ `catalogHrefFromProduct` committed expectations |
| **Running Warehouse** | Browser QA on high-intent PDP shells | ✅ Playwright smoke from baseline JSON |
| **BadmintonCentral** | PDP-only SKUs stay separate from review map | ✅ `expectNoReviewSlug` guard on Nanoray Light 70i |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v26 offline recovery, lab + CrUX + GSC + search + catalog + discovery parity + finder + results URL + compare share URL + review map + PDP CI guards.

---

## 2. Top 5 gaps (Sprint 48)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **PDP lacks committed golden-profile CI guard** | Lighthouse PDP shell regressions invisible until manual audit | ✅ `pdp-queries.json` + evaluator |
| 2 | **No unified operator command for all regression guards** | Agents refresh product funnel or editorial separately | ✅ `lint:all-baselines` |
| 3 | **No browser e2e tied to committed PDP golden profiles** | `pdp-smoke.spec.ts` uses hardcoded id, not baseline JSON | ✅ `e2e/pdp-baseline-smoke.spec.ts` |
| 4 | **Baselines README omitted PDP layer** | Wrong JSON files refreshed on PDP changes | ✅ README PDP + all-baselines sections |
| 5 | **CrUX/Lighthouse PDP not in committed golden set** | `yy-grpht-thrttl` wiring untracked in CI | ✅ Lighthouse PDP golden row + e2e |

**Deferred (owner / editorial):** deploy reactions worker + `REACTIONS_API_URL`; fill `crux-template.csv` and `gsc-template.csv`; original `public/products/` photography; YouTube `sameAs` after channel claim.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| PDP evaluator | `src/lib/pdp-baseline.ts` |
| Golden PDP profiles | `docs/baselines/pdp-queries.json` |
| Unit tests | `src/lib/pdp-baseline.test.ts` |
| CLI guard | `scripts/pdp-baseline.mjs` |
| Unified all-baselines command | `scripts/all-baselines.mjs` |
| Extended editorial command | `scripts/editorial-baselines.mjs` |
| Playwright smoke | `e2e/pdp-baseline-smoke.spec.ts` |
| Shoes PDP related-reading fix | `src/lib/related-content.ts` (`shoes` → `shoe-fit` cluster) |
| CI step | `.github/workflows/ci.yml` |
| Baselines README | `docs/baselines/README.md` |
| Master plan | `docs/WEB_APP_IMPROVEMENT_PLAN_2026-06.md` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 47 deferred items + competitive audit | ✅ |
| 2 | Golden JSON validates schema (productId + expectations) | ✅ |
| 3 | All committed product ids pass catalogue + spec parity | ✅ |
| 4 | CrUX Arcsaber 7 Pro PDP preserves review reverse-map | ✅ |
| 5 | PDP-only Nanoray Light 70i stays outside review map | ✅ |
| 6 | Static export — no new API routes | ✅ |
| 7 | Unit tests: schema + evaluator + reverse-map | ✅ |
| 8 | `npm run lint:all-baselines` passes | ✅ |
| 9 | `npm test` + `npm run build` | ✅ |
| 10 | Master plan doc updated with Sprint 48 entry | ✅ |

---

## 5. Verification

```bash
npm test
npm run lint:all-baselines
npm run lint:pdp-baseline
npm run build
npm run test:e2e -- e2e/pdp-baseline-smoke.spec.ts
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
| Review→product map golden profiles | 100% pass in CI |
| PDP golden profiles | 100% pass in CI |
