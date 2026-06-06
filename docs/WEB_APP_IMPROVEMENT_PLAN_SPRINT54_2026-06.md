# Web App Improvement Plan — Sprint 54 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-f860`  
**Baseline:** Sprint 53 — brands golden baseline, editorial-baselines extension (PR #201).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 54 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | Every education URL exits to filtered browse | ✅ Guides golden profiles cover all 11 Lighthouse guide slugs |
| **Wirecutter** | Programmatic best-of pages with catalog parity | ✅ Best-of golden profiles extended to 13 Lighthouse slugs |
| **RTINGS** | Large review archive with hub discovery | ✅ Reviews hub golden-profile CI guard |
| **BadmintonCentral** | Manufacturer + procedural reference depth | ✅ Equipment authenticity + glossary in guides guard |
| **RacketGuide** | Shoe-fit and doubles role education | ✅ shoes-footwork + doubles-roles in guides guard |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v26, lab + CrUX + GSC + full product-funnel + editorial CI guards.

---

## 2. Top 5 gaps (Sprint 54)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **5 Lighthouse guide slugs lack committed golden-profile rows** | Guide catalog regressions invisible until manual audit | ✅ `guides-queries.json` extended |
| 2 | **7 Lighthouse best-of slugs lack committed golden-profile rows** | Price-band and style guides untested in CI | ✅ `best-queries.json` extended |
| 3 | **Reviews hub (`/review/`) lacks golden-profile CI guard** | 153-article archive unprotected vs other hubs | ✅ `reviews-queries.json` + evaluator |
| 4 | **No browser e2e tied to reviews hub golden profile** | Hub shelf + catalog CTA untested from baseline JSON | ✅ `e2e/reviews-baseline-smoke.spec.ts` |
| 5 | **Editorial baselines command omitted reviews hub guard** | Agents refresh brands but skip reviews hub | ✅ `lint:editorial-baselines` extended |

**Deferred (Sprint 55+):** owner deploy reactions worker + `REACTIONS_API_URL`; fill CrUX/GSC CSVs; original photography; YouTube `sameAs`.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Guides extension | `docs/baselines/guides-queries.json` |
| Best-of extension | `docs/baselines/best-queries.json` |
| Reviews hub evaluator | `src/lib/reviews-baseline.ts` |
| Golden reviews profile | `docs/baselines/reviews-queries.json` |
| Unit tests | `src/lib/reviews-baseline.test.ts` |
| CLI guard | `scripts/reviews-baseline.mjs` |
| Extended editorial command | `scripts/editorial-baselines.mjs` |
| Playwright smoke | `e2e/reviews-baseline-smoke.spec.ts` |
| CI step | `.github/workflows/ci.yml` |
| Baselines README | `docs/baselines/README.md` |
| Master plan | `docs/WEB_APP_IMPROVEMENT_PLAN_2026-06.md` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 53 deferred items + competitive audit | ✅ |
| 2 | Golden JSON validates schema (slug + expectCatalogHref) | ✅ |
| 3 | All 11 guide catalog filter slugs have committed rows | ✅ |
| 4 | 13 best-of Lighthouse slugs have committed rows | ✅ |
| 5 | Reviews hub resolves to full catalog exit + 3+ related reading | ✅ |
| 6 | Static export — no new API routes | ✅ |
| 7 | Unit tests: schema + evaluator + article count | ✅ |
| 8 | `npm run lint:editorial-baselines` passes | ✅ |
| 9 | `npm test` + `npm run build` | ✅ |
| 10 | Master plan doc updated with Sprint 54 entry | ✅ |

---

## 5. Verification

```bash
npm test
npm run lint:guides-baseline
npm run lint:best-baseline
npm run lint:reviews-baseline
npm run lint:editorial-baselines
npm run lint:all-baselines
npm run build
npm run test:e2e -- e2e/reviews-baseline-smoke.spec.ts
```

---

## 6. Metrics (unchanged)

| Goal | Target |
|------|--------|
| Lighthouse performance (CrUX URLs) | ≥ 0.9 (lab baseline) |
| Guides golden profiles | 100% pass in CI |
| Best-of golden profiles | 100% pass in CI |
| Reviews hub golden profile | 100% pass in CI |
| Brands golden profiles | 100% pass in CI |
| Product funnel golden profiles | 100% pass in CI |
