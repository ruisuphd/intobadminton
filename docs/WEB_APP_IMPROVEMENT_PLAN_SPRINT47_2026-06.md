# Web App Improvement Plan — Sprint 47 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-132a`  
**Baseline:** Sprint 46 — compare share URL golden baseline, extended product-funnel command (PR #194).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 47 response |
|------------|---------------------------|-------------------|
| **Wirecutter** | Product schema locked to canonical review→SKU wiring | ✅ Review map golden-profile CI guard |
| **RTINGS** | Review pages always resolve to spec-backed product rows | ✅ Committed slug→id expectations + JSON-LD check |
| **Tennis Warehouse** | Editorial and product funnel guards refreshed together | ✅ `npm run lint:editorial-baselines` meta-command |
| **Running Warehouse** | Browser QA on review→catalog cross-links | ✅ Playwright smoke: review finder panel + catalog CTA |
| **BadmintonCentral** | Explainer articles stay separate from product map | ✅ `expectUnmapped` guard on explainer allowlist |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v26 offline recovery, lab + CrUX + GSC + search + catalog + discovery parity + finder + results URL + compare share URL + review map CI guards.

---

## 2. Top 5 gaps (Sprint 47)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Review→product map lacks committed golden-profile CI guard** | Map regressions invisible until manual audit | ✅ `review-product-map-queries.json` + evaluator |
| 2 | **No unified operator command for editorial guards** | Agents refresh product funnel but miss review map | ✅ `lint:editorial-baselines` |
| 3 | **No browser e2e for review→PDP finder panel + catalog CTA** | Static export review page can drift from catalogue | ✅ `e2e/review-product-map-baseline-smoke.spec.ts` |
| 4 | **Baselines README omitted review map layer** | Wrong JSON files refreshed on map changes | ✅ README editorial + review map sections |
| 5 | **CrUX-priority reviews not in committed golden map** | Lighthouse review URL wiring untracked in CI | ✅ Arcsaber 7 Pro + Nanoflare 1000Z golden rows |

**Deferred (owner / editorial):** deploy reactions worker + `REACTIONS_API_URL`; fill `crux-template.csv` and `gsc-template.csv`; original `public/products/` photography; YouTube `sameAs` after channel claim.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Review map evaluator | `src/lib/review-product-map-baseline.ts` |
| Golden map profiles | `docs/baselines/review-product-map-queries.json` |
| Unit tests | `src/lib/review-product-map-baseline.test.ts` |
| CLI guard | `scripts/review-product-map-baseline.mjs` |
| Unified editorial command | `scripts/editorial-baselines.mjs` |
| Playwright smoke | `e2e/review-product-map-baseline-smoke.spec.ts` |
| CI step | `.github/workflows/ci.yml` |
| Baselines README | `docs/baselines/README.md` |
| Master plan | `docs/WEB_APP_IMPROVEMENT_PLAN_2026-06.md` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 46 deferred items + competitive audit | ✅ |
| 2 | Golden JSON validates schema (slug + expectProductId or expectUnmapped) | ✅ |
| 3 | All committed slugs pass map + catalogue parity | ✅ |
| 4 | CrUX Arcsaber 7 Pro review preserves yy-arcsaber-7-pro | ✅ |
| 5 | Explainer slug stays outside product map | ✅ |
| 6 | Static export — no new API routes | ✅ |
| 7 | Unit tests: schema + evaluator + coverage | ✅ |
| 8 | `npm run lint:editorial-baselines` passes | ✅ |
| 9 | `npm test` + `npm run build` | ✅ |
| 10 | Master plan doc updated with Sprint 47 entry | ✅ |

---

## 5. Verification

```bash
npm test
npm run lint:editorial-baselines
npm run lint:review-product-map-baseline
npm run build
npm run test:e2e -- e2e/review-product-map-baseline-smoke.spec.ts
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
| Review→product map (mappable slugs) | 100% (140/140) |
