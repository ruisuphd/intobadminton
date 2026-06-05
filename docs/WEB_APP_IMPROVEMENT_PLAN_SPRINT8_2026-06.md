# Web App Improvement Plan — Sprint 8 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-8de3`  
**Baseline:** `main` after PR #137 (compare UX), PR #138 (`/product/[id]/` PDP-lite), Phase D map 80% (#114).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 8 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | Shareable filter + product URLs | Catalog `?id=` highlight (complements `/product/[id]/`) |
| **Wirecutter / RTINGS** | Related reading on commercial pages | `RelatedReadingShelf` on `/catalog/` |
| **Retailer PDPs** | Product detail pages | ✅ PR #138 `/product/[id]/` on `main` |
| **Transparency sites** | Public claims registry | ✅ `/data/` on parallel branch (#130) |
| **YouTube reviewers** | Video evidence | ⏳ Gated on video commitment |

---

## 2. Top 5 gaps (this follow-up PR)

| # | Gap | Impact | Status |
|---|-----|--------|--------|
| 1 | **No shareable catalog row in filtered browse** | Weak retailer parity for filtered lists | ✅ `?id=` + highlight |
| 2 | **Catalog lacks related reading** | Lower pages/session | ✅ `RelatedReadingShelf` |
| 3 | **PDP-lite for unmapped products** | Lost product context | ✅ On `main` via `/product/[id]/` (#138) |
| 4 | **Review map coverage** | Product JSON-LD gaps | ✅ 117/146 (80%) on `main` (#114) |
| 5 | HelpfulReaction aggregate counts | Social proof | ⏳ Workers/KV |

---

## 3. Execution summary

1. **`src/lib/catalog-url.ts`** — `productId` in URL state; `catalogProductShareUrl()`.
2. **`src/app/catalog/CatalogClient.tsx`** — highlight, scroll, out-of-filter notice.
3. **`src/app/catalog/page.tsx`** — related reading shelf.
4. **`src/lib/related-content.ts`** — catalog cluster.
5. **Tests** — catalog-url, related-content, e2e deep link.

`catalogProductHref` continues to use `/review/[slug]/` or `/product/[id]/` from `main` — catalog `?id=` is for filtered-browse sharing only.

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 6–7 deferred list | ✅ |
| 2 | Complements (does not replace) `/product/[id]/` | ✅ |
| 3 | Mapped reviews still route to `/review/[slug]/` | ✅ |
| 4 | Highlight works when product outside active filters | ✅ |
| 5 | Related reading paths exist in static export | ✅ |
| 6 | `npm test` | ✅ |
| 7 | `npm run build` + postbuild SEO audit | ✅ |
| 8 | Playwright catalog deep-link smoke | ✅ |
| 9 | No Lighthouse URL regressions | ✅ |
| 10 | PR #137 merged; this PR targets remaining Sprint 8 catalog UX | ✅ |

---

## 5. Verification

```bash
npm test
npm run build
npm run lint
```

---

## 6. Deferred (Sprint 9+)

- HelpfulReaction Workers/KV production deploy
- GSC/CrUX baseline CSV capture
- Original photos on top commercial URLs
- Review map toward 90%+ coverage
