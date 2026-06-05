# Web App Improvement Plan — Sprint 8 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-32b1` (PR #145)  
**Baseline:** Sprint 7 on `main` (#140 string guide + `/updates/`; #130 `/data/`).

---

## 1. Top 5 gaps (PR #145)

| # | Gap | Status |
|---|-----|--------|
| 1 | String cluster cross-links incomplete | ✅ `related-content` hub→spoke |
| 2 | Review pages lack decision-path shelf | ✅ `relatedReadingForReviewSlug` |
| 3 | Homepage hides freshness lane | ✅ `HomeRecentUpdates` |
| 4 | Blog redirect canonical drift | ✅ `blog-redirect-helpers.mjs` |
| 5 | HelpfulReaction KV aggregates | ⏳ |

---

## 2. Execution

| Item | Files |
|------|-------|
| Review decision shelf | `EditorialArticlePage.tsx`, `related-content.ts` |
| Homepage updates strip | `HomeRecentUpdates.tsx`, `LocalizedHome.tsx` |
| Redirect canonical ranking | `scripts/blog-redirect-helpers.mjs` |

---

## 3. Verification

```bash
npm test
npm run lint
npm run build
```

---

## 4. Deferred (Sprint 9+)

- HelpfulReaction Workers/KV deploy
- Original `public/products/` photography
