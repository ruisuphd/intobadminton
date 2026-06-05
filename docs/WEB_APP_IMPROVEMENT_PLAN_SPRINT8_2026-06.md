# Web App Improvement Plan — Sprint 8 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-32b1` (PR #145)  
**Baseline:** Sprint 7 on `main` (#141 product map 86%, PDP-lite, `/data/`).

---

## 1. Top 5 gaps (PR #145)

| # | Gap | Status |
|---|-----|--------|
| 1 | String cluster incomplete | ✅ string feel guide + `related-content` |
| 2 | Review pages lack decision-path shelf | ✅ `relatedReadingForReviewSlug` |
| 3 | Homepage hides freshness lane | ✅ `HomeRecentUpdates` → `/updates/` |
| 4 | Original product photography | ⏳ editorial |
| 5 | HelpfulReaction KV aggregates | ⏳ deploy worker |

*(Product map 85%+ gate shipped on `main` via #141 — separate Sprint 8 track.)*

---

## 2. Execution

| Item | Files |
|------|-------|
| String cluster links | `related-content.ts` |
| Review decision shelf | `EditorialArticlePage.tsx` |
| Homepage updates strip | `HomeRecentUpdates.tsx`, `LocalizedHome.tsx` |
| Tests | `related-content.test.ts` |

---

## 3. Ten-pass verification

| Pass | Result |
|------|--------|
| 1–5 | Gaps, static export, editorial dates, cluster links | ✅ |
| 6–8 | Tests + build + SEO audit | ✅ |
| 9–10 | Lighthouse + merge with latest `main` | ✅ |

---

## 4. Verification

```bash
npm test
npm run lint
npm run build
```

---

## 5. Deferred (Sprint 9+)

- Deploy `workers/reactions/` + `NEXT_PUBLIC_REACTIONS_API_URL`
- GSC/CrUX baseline CSV
- Original `public/products/` photography
- YouTube `Person.sameAs` after channel claim
