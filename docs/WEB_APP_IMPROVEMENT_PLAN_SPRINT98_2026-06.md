# Web App Improvement Plan — Sprint 98 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-5169`  
**Baseline:** Sprint 97 — remaining racket commercial review aliases + `minMappedE2eGuards: 56` (PR #245).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 98 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | String guides link to string-specific editorial depth | ✅ Five Yonex string picks exit to `badminton-string-selector` explainer |
| **Wirecutter** | Budget picks without dedicated reviews link to nearest sibling editorial | ✅ Thruster Ryuga II aliases to Thruster 9900 curiosity review |
| **RTINGS** | Product pages surface editorial exit even for discontinued SKUs | ✅ PDP uses alias-aware `editorialReviewHref` (fixes Nanoray Light 70i-class gaps) |
| **RacketGuide** | Honest labelling when exit is a guide vs hands-on review | ✅ `Read string guide →` vs `Read full review →` on `/best/strings/` |
| **YouTube-first reviewers** | Video evidence on product pages | ⏳ `VideoObject` schema still deferred |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v30, lab + CrUX + GSC + full product-funnel + editorial CI guards.

---

## 2. Top 5 gaps (Sprint 98)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Yonex string picks lack editorial href** | Five `/best/strings/` rows had no review exit | ✅ `PRODUCT_REVIEW_EXPLAINER_ALIASES` → `badminton-string-selector` + e2e |
| 2 | **Thruster Ryuga II PDP lacks review exit** | Flagship Victor attack frame stuck on specs-only PDP | ✅ Alias to `vic-thruster-9900` + PDP baseline e2e |
| 3 | **PDP review links ignore sibling aliases** | Aliased catalogue rows (e.g. Nanoray Light 70i) missed review CTA on `/product/` | ✅ `ProductDetailPage` uses `editorialReviewHref` |
| 4 | **String vs review link copy ambiguous** | Linking multi-SKU explainer as "full review" misleads vs Tennis Warehouse honesty | ✅ Guide-specific CTA label on commercial landings |
| 5 | **HelpfulReaction production wiring** | Social proof counts still local-only without owner secret | ⏳ Owner: set `REACTIONS_API_URL` + run wire workflow |

**Deferred (Sprint 99+):** tier-4 Western distributor image hunt; Nanoray Light 70i verified product image; dedicated Yonex string review ingestion; YouTube `sameAs`; `VideoObject` schema; fill CrUX/GSC CSV metrics.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| String explainer aliases + Ryuga sibling alias | `src/lib/review-pages.ts`, `src/lib/review-pages.test.ts` |
| Guide vs review CTA labels | `src/lib/review-pages.ts`, `src/components/BestPicksPage.tsx` |
| PDP alias-aware review links | `src/components/ProductDetailPage.tsx` |
| Strings + Ryuga e2e smoke | `e2e/review-consolidation.spec.ts`, `e2e/pdp-smoke.spec.ts`, `e2e/pdp-baseline-smoke.spec.ts` |
| PDP baseline retarget | `docs/baselines/pdp-queries.json` |
| Master plan | `docs/WEB_APP_IMPROVEMENT_PLAN_2026-06.md` |

**Explainer alias pairs added:**

| Product id | Resolves to | Editorial slug | Landing |
|------------|-------------|----------------|---------|
| `yy-bg65` | explainer | badminton-string-selector | strings rank 1 |
| `yy-bg80` | explainer | badminton-string-selector | strings rank 2 |
| `yy-exbolt-63` | explainer | badminton-string-selector | strings rank 3 |
| `yy-aerobite` | explainer | badminton-string-selector | strings rank 4 |
| `yy-bg80-power` | explainer | badminton-string-selector | strings rank 6 |

**Sibling alias added:**

| Product id | Resolves to | Editorial slug |
|------------|-------------|----------------|
| `vic-thruster-ryuga-ii` | `vic-thruster-9900` | victor-thruster-9900-curiosity-review |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 97 deferred items + competitive audit | ✅ |
| 2 | Explainer slugs stay unmapped in `blog-review-product-map.json` | ✅ separate alias map |
| 3 | Five Yonex strings resolve to `/review/badminton-string-selector/` | ✅ unit tests |
| 4 | L69 keeps dedicated review label + href | ✅ unit + e2e |
| 5 | Ryuga II resolves to Thruster 9900 curiosity review | ✅ unit + PDP baseline |
| 6 | PDP grip baseline (`yy-ac102c`) stays review-less | ✅ pdp-queries.json |
| 7 | `minMappedE2eGuards: 56` unchanged | ✅ no new golden profiles |
| 8 | Static export — alias resolution is build-time only | ✅ |
| 9 | HelpfulReaction owner secret assessed — blocked on repo secret | ✅ deferred |
| 10 | `npm test` + baselines + `npm run build` pass | ✅ |

---

## 5. Verification

```bash
npm test
npm run lint:review-product-map-baseline
npm run lint:pdp-baseline
npm run build
npx playwright test e2e/review-consolidation.spec.ts e2e/pdp-smoke.spec.ts e2e/pdp-baseline-smoke.spec.ts
```

---

## 6. Metrics

| Goal | Target |
|------|--------|
| Mapped review e2e golden profiles | 56 (unchanged) |
| Explainer slug golden profiles | 13/13 (unchanged) |
| Commercial landings under image CI | 17/17 (unchanged) |
| Commercial sibling alias pairs | 13 |
| String explainer alias pairs | 5 |
