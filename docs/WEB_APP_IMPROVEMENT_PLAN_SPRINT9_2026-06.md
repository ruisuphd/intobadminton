# Web App Improvement Plan — Sprint 9 (June 2026)

**Branches:** `cursor/web-app-improvement-plan-dca0`, PR #144 `cursor/web-app-improvement-plan-dbcf`  
**Baseline:** Sprint 8 — search snippets, RSS `rel=alternate`, catalog CLS, `/data/` claims registry, PDP-lite, product-map 86%.

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 9 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | Sortable spec grids with implicit “match” signals | ✅ Illustrative **Finder fit** column on `/best/*` tables |
| **Wirecutter / RTINGS** | Scores visible before long copy; no dead review links | ✅ `FitScoreBadge` in table; ✅ `editorialReviewHref` guard |
| **RacketGuide** | Offline browse after install | ✅ PWA `ib-v3` precaches `/catalog/` |
| **BadmintonCentral** | Social proof on threads | ⏳ HelpfulReaction KV (worker scaffold; deploy optional) |
| **Brand PDPs** | Hero photography | ⏳ Editorial `public/products/` pipeline |

**Moat unchanged:** transparent fit score, claims CI + `/data/`, static export, postbuild SEO gate, 146+ reviews, contextual search snippets.

---

## 2. Top 5 gaps (Sprint 9)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Best-of pages lack scannable fit signal** | Commercial intent; parity with finder results | ✅ `best-picks-scoring.ts` + sortable Finder fit column |
| 2 | **“Read full review” could 404** | Trust + crawl waste on unmapped SKUs | ✅ `editorialReviewHref()` — link only when blog slug exists |
| 3 | **PWA offline shell skips catalog** | Return visits on club Wi‑Fi | ✅ `ib-v3` + `/catalog/` in `PRECACHE_URLS` |
| 4 | **Duplicate product map → wrong legacy redirect** | SEO + e2e flake (`play-review` vs `review`) | ✅ Canonical slug scoring in `review-pages` + `blog-redirect-helpers` |
| 5 | **HelpfulReaction cross-user counts** | Social proof on articles | ⏳ Workers/KV deploy (`NEXT_PUBLIC_REACTIONS_API_URL`) |

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Illustrative fit scores | `src/lib/best-picks-scoring.ts`, `best-picks-scoring.test.ts` |
| Comparison table column | `src/components/BestPicksComparisonTable.tsx` |
| Review link guard | `src/lib/review-pages.ts` (`editorialReviewHref`), `BestPicksPage.tsx` |
| PWA catalog precache | `public/sw.js` (`ib-v3`) |
| productId backfill | `src/app/best/*/page.tsx` (9 routes) |
| Canonical review slug tie-break | `review-pages.ts`, `blog-redirect-helpers.mjs` |
| E2E / CI hardening | `playwright.config.ts` retries; `review-consolidation.spec.ts` `waitForURL` |
| E2E regression | `e2e/best-fit-smoke.spec.ts` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 6–8 deferred list + competitive audit | ✅ |
| 2 | Fit score uses `referenceClubDoublesProfile` (methodology-aligned) | ✅ |
| 3 | Canonical review slug wins over `-play-` when both map to one product | ✅ |
| 4 | `editorialReviewHref` null when no blog map entry | ✅ |
| 5 | Static export — no new dynamic routes | ✅ |
| 6 | PWA cache version bumped (`ib-v3`) | ✅ |
| 7 | Unit tests: best-picks-scoring, review-pages | ✅ |
| 8 | E2E: Finder fit column + legacy redirect | ✅ |
| 9 | `npm test` + `npm run build` + postbuild SEO audit | ✅ |
| 10 | Lighthouse CI on PR #144 (run 26990611633) | ✅ |

---

## 5. Verification

```bash
npm test
npm run build
npm run lint
npm run test:e2e
npx playwright test e2e/best-fit-smoke.spec.ts
```

---

## 6. Deferred (Sprint 10+)

- HelpfulReaction Workers/KV production deploy + env in hosting
- GSC/CrUX baseline CSV exports in `docs/baselines/`
- Original `public/products/` photography on top commercial URLs
- `VideoObject` / YouTube `sameAs` (editorial commitment)
