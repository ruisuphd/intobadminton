# Web App Improvement Plan — Sprint 8 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-dbcf`  
**Baseline:** Sprint 7 on `main` (PR #135 — review body search excerpts + fuzzy e2e).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Gap / Sprint 8 response |
|------------|---------------------------|-------------------------|
| **Tennis Warehouse / retailer search** | Result snippets show why a product matched | ✅ `searchResultSummary()` surfaces review-body context |
| **Wirecutter / RTINGS** | Social proof vote counts on picks | ⏳ HelpfulReaction KV deploy (`NEXT_PUBLIC_REACTIONS_API_URL`) |
| **BadmintonCentral** | RSS + forum return visits | ✅ RSS `rel=alternate` in root metadata (footer link existed) |
| **Brand PDPs** | First-party product photography | ⏳ Editorial `public/products/` pipeline |
| **YouTube-first reviewers** | Video evidence | ⏳ `VideoObject` gated on video commitment |

**Moat unchanged:** transparent fit score, claims CI, static export, 146+ reviews, postbuild SEO gate.

---

## 2. Top 5 gaps (Sprint 8)

| # | Gap | Impact | Sprint 8 |
|---|-----|--------|----------|
| 1 | **Search cards hide body-match context** | Users cannot see why a review matched | ✅ Contextual snippets on `/search/` |
| 2 | **RSS not declared to crawlers** | Weaker feed discovery vs forums | ✅ `application/rss+xml` alternate on layout |
| 3 | HelpfulReaction aggregate counts live | Social proof (Wirecutter parity) | ⏳ Deploy Workers/KV + env URL |
| 4 | Original product photography | AdSense / visual maturity | ⏳ Editorial pipeline |
| 5 | Video / `VideoObject` schema | E-E-A-T visual evidence | ⏳ Gated on video commitment |

---

## 3. Execution summary

1. **`src/lib/site-search.ts`** — `searchResultSummary()` extracts a capped excerpt around the first matching token in review index text when title/dek did not match.
2. **`src/components/SiteSearch.tsx`** — render `searchResultSummary()` instead of raw `entry.summary` for result cards.
3. **`src/app/layout.tsx`** — sitewide RSS alternate link to `/feed.xml`.
4. **Tests** — unit cases for snippet selection; Playwright smoke for body-only query.
5. **Docs** — this plan + master plan Sprint 8 pointer.

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 7 deferred list + competitive audit | ✅ |
| 2 | Snippet cap prevents layout blow-up (≤140 chars visible) | ✅ |
| 3 | Does not duplicate Sprint 7 excerpt indexing | ✅ (display layer only) |
| 4 | Static export safe (no API routes) | ✅ |
| 5 | Body-only search e2e covers snippet path | ✅ |
| 6 | Title/dek matches still show dek summary | ✅ |
| 7 | Nonsense queries still return empty | ✅ |
| 8 | `npm test` | ✅ |
| 9 | `npm run build` + postbuild SEO audit | ✅ |
| 10 | No new Lighthouse regressions vs main | ✅ |

---

## 5. Verification

```bash
npm test
npm run build
npm run lint
```

---

## 6. Deferred (Sprint 9+)

- Deploy HelpfulReaction Workers/KV to production
- GSC/CrUX baseline CSV in `docs/baselines/`
- Original photos on top commercial URLs
- YouTube `sameAs` on author entity (after channel claim)
