# Web App Improvement Plan — Sprint 6 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-cc42`  
**Baseline:** Sprint 5 on `main` (PRs #116–#122, #129, #134).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 6 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | Faceted browse → compare tray | Catalog URL filters + save/compare + GA4 |
| **Wirecutter / RTINGS** | Related reading + social proof | `RelatedReadingShelf`; HelpfulReaction API scaffold |
| **RacketGuide** | Long-tail `/best/*` landings | control, singles, head-light, all-round, wide-feet shoes |
| **Retailer PDPs** | Product detail pages | ⏳ Sprint 7 — PDP-lite |

---

## 2. Top 5 gaps (combined Sprint 6)

| # | Gap | Status |
|---|-----|--------|
| 1 | Catalog save/compare funnel | ✅ `CatalogProductActions` + GA4 |
| 2 | Site search typo tolerance | ✅ `search-fuzzy.ts` (main #134) |
| 3 | Related reading on commercial pages | ✅ `RelatedReadingShelf` |
| 4 | Programmatic `/best/*` coverage | ✅ 5 new landing pages across parallel PRs |
| 5 | HelpfulReaction aggregates | ⏳ Workers/KV (env scaffold on main #129) |

---

## 3. This PR (`#127`) deliverables

1. **`CatalogProductActions`** — save + compare on `/catalog/` rows.
2. **`CompareShell`** — `compare_view` + `compare_share_link` analytics.
3. **`related-content.ts` + `RelatedReadingShelf`** — guides, best-of, compare-guides.
4. **`/best/wide-feet-badminton-shoes/`** and **`/best/all-round-rackets/`**.

---

## 4. Ten-pass verification

All passes ✅ — `npm test` (236+ tests), `npm run build`, Lighthouse CI (port 4173).

---

## 5. PR #137 follow-up (`cursor/web-app-improvement-plan-5049`)

Additional maturity items merged after parallel Sprint 6 PRs (#127, #129, #134):

| Deliverable | Files |
|-------------|-------|
| Compare share-link hydration fix | `ProfileContext.tsx` (`storageReady`), `compare/page.tsx` |
| Compare row winner highlight | `CompareTable.tsx` |
| PWA manifest shortcuts | `public/manifest.webmanifest` |
| Retention-flow e2e | `e2e/catalog-compare-saved-smoke.spec.ts` |
| Review map suggestion script | `scripts/suggest-review-product-map.mjs` |

Review-product map coverage on `main`: **116/146 (79%)** after prior editorial expansion.
