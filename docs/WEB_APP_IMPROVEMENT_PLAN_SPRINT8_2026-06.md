# Web App Improvement Plan — Sprint 8 (June 2026)

**Branches:** `cursor/web-app-improvement-plan-9a0c` (claims registry on `main`), `cursor/web-app-improvement-plan-dbcf` (search snippets — PR #144)  
**Baseline:** Sprint 7 on `main` (PR #135 — review body search excerpts + fuzzy e2e).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Gap / Sprint 8 response |
|------------|---------------------------|-------------------------|
| **Wirecutter / RTINGS** | Public methodology + claim sourcing | ✅ `/data/` claims registry (main) |
| **Tennis Warehouse / retailer search** | Result snippets show why a product matched | ✅ `searchResultSummary()` (PR #144) |
| **BadmintonCentral** | RSS + forum return visits | ✅ RSS `rel=alternate` in root metadata |
| **Brand PDPs** | Product detail pages | ✅ `/product/[id]/` PDP-lite (main) |
| **YouTube-first reviewers** | Video evidence | ⏳ `VideoObject` gated on video commitment |

**Moat unchanged:** transparent fit score, claims CI, static export, 146+ reviews, postbuild SEO gate.

---

## 2. Top 5 gaps (Sprint 8)

| # | Gap | Impact | Status |
|---|-----|--------|--------|
| 1 | No public claims transparency (Q2 §3.5 #28) | Trust / AdSense reviewers | ✅ `/data/` registry (main) |
| 2 | **Search cards hide body-match context** | Discovery friction | ✅ Contextual snippets (PR #144) |
| 3 | No PDP-lite for catalog products | Retailer parity | ✅ `/product/[id]/` (main) |
| 4 | HelpfulReaction aggregate counts live | Social proof | ⏳ Deploy Workers/KV + env URL |
| 5 | Original product photography | Visual maturity | ⏳ Editorial pipeline |

---

## 3. Execution summary

### Shipped on `main` (parallel Sprint 8 track)

1. **`/data/`** — `content/claims.json` surfaced with tiers, quotes, freshness, `usedOn` links.
2. **`/product/[id]/`** — PDP-lite with spec rows, buy links, related reading.
3. **Review→product map** — 80% coverage; `scripts/suggest-review-product-map.mjs`.
4. **Programmatic best pages** — budget shoes, head-heavy under $150.

### PR #144 (`cursor/web-app-improvement-plan-dbcf`)

1. **`searchResultSummary()`** — body-match excerpts on `/search/` when title/dek did not match.
2. **Root layout** — `application/rss+xml` alternate → `/feed.xml`.
3. **Catalog CLS** — reserved 72×72 image box; hide credit line in list rows.
4. **Tests** — unit + Playwright for snippet path.

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 7 deferred list + competitive audit | ✅ |
| 2 | Claims registry + search snippets are complementary | ✅ |
| 3 | Snippet cap ≤140 chars | ✅ |
| 4 | Static export safe | ✅ |
| 5 | Body-only search e2e | ✅ |
| 6 | `/data/` + `/product/` in sitemap | ✅ (main) |
| 7 | `npm test` | ✅ |
| 8 | `npm run build` + postbuild SEO audit | ✅ |
| 9 | Catalog list CLS fix | ✅ |
| 10 | Lighthouse CI | ⏳ verify on PR #144 after merge with main |

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
- GSC/CrUX baseline CSV capture (owner manual per `docs/baselines/README.md`)
- Original photos on top commercial URLs
- YouTube `sameAs` on author entity (after channel claim)
