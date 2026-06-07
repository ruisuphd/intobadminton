# Web App Improvement Plan — Sprint 99 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-6edc`  
**Baseline:** Sprint 98 — string explainer exits + Ryuga PDP alias + alias-aware PDP links (PR #246 merged).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 99 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | String category rows link to string buying guides, not bare spec pages | ✅ Catalog + PDP BG65 exit to `badminton-string-selector` with guide CTA |
| **RTINGS** | Product pages distinguish guide vs hands-on review exits | ✅ PDP baseline `expectReviewKind` guard (guide vs review) |
| **Wirecutter** | Consistent honest labelling across catalog browse and commercial landings | ✅ Guide CTA on PDP, catalog, and `/best/strings/` |
| **RacketGuide** | Filter browse deep-links to nearest editorial depth | ✅ Catalog string filter links to explainer article |
| **YouTube-first reviewers** | Video evidence on product pages | ⏳ `VideoObject` schema still deferred |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v30, 56 review-map golden profiles, 17/17 commercial image CI.

---

## 2. Top 5 gaps (Sprint 99)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **String SKU PDP lacks guide-kind CI guard** | Sprint 98 wired guide CTA but PDP e2e only checked "Read the full review" | ✅ `pdp-explainer-yy-bg65` baseline + guide-aware e2e |
| 2 | **PDP baseline cannot distinguish guide vs review exits** | Aliased review rows and explainer rows share slug field only | ✅ `expectReviewKind` on `PdpBaselineQuery` |
| 3 | **Catalog string browse links to PDP not guide** | Missed editorial depth vs Tennis Warehouse string category UX | ✅ Verified `catalogProductHref` + catalog e2e smoke |
| 4 | **Stale review-map baseline notes** | Docs still say DriveX 8S / Ryuga II "blocked" after Sprint 96–98 aliases | ✅ Notes updated to alias resolution |
| 5 | **HelpfulReaction production wiring** | Social proof counts still local-only without owner secret | ⏳ Owner: set `REACTIONS_API_URL` + run wire workflow |

**Deferred (Sprint 100+):** tier-4 Western distributor image hunt; Nanoray Light 70i verified product image; dedicated Yonex string review ingestion; YouTube `sameAs`; `VideoObject` schema; fill CrUX/GSC CSV metrics.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| PDP `expectReviewKind` validation | `src/lib/pdp-baseline.ts`, `src/lib/pdp-baseline.test.ts` |
| BG65 explainer golden profile | `docs/baselines/pdp-queries.json` |
| Guide-aware PDP baseline e2e | `e2e/pdp-baseline-smoke.spec.ts` |
| Catalog + PDP string guide smoke | `e2e/pdp-smoke.spec.ts` |
| Catalog href unit test | `src/lib/review-pages.test.ts` |
| Stale alias notes | `docs/baselines/review-product-map-queries.json` |
| Master plan | `docs/WEB_APP_IMPROVEMENT_PLAN_2026-06.md` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 98 deferred items + competitive audit | ✅ |
| 2 | `expectReviewKind` uses existing `editorialReviewKind()` — no duplicate logic | ✅ |
| 3 | BG65 baseline resolves slug `badminton-string-selector` | ✅ unit test |
| 4 | Ryuga II baseline keeps `expectReviewKind: review` | ✅ |
| 5 | PDP e2e checks guide label for explainer, review label for aliases | ✅ |
| 6 | Catalog BG65 click lands on string-selector article | ✅ e2e |
| 7 | Grip baseline (`yy-ac102c`) unchanged — no review slug | ✅ |
| 8 | `minMappedE2eGuards: 56` unchanged | ✅ no new golden profiles |
| 9 | HelpfulReaction owner secret assessed — blocked on repo secret | ✅ deferred |
| 10 | `npm test` + baselines + `npm run build` pass | ✅ |

---

## 5. Verification

```bash
npm test
npm run lint:pdp-baseline
npm run build
npx playwright test e2e/pdp-smoke.spec.ts e2e/pdp-baseline-smoke.spec.ts
```

---

## 6. Metrics

| Goal | Target |
|------|--------|
| Mapped review e2e golden profiles | 56 (unchanged) |
| Explainer slug golden profiles | 13/13 (unchanged) |
| Commercial landings under image CI | 17/17 (unchanged) |
| PDP golden profiles with e2e | 5 (was 4) |
| String explainer alias pairs | 5 (unchanged) |
