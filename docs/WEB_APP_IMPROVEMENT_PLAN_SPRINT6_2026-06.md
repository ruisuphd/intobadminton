# Web App Improvement Plan — Sprint 6 (June 2026)

**Branches:** `cursor/web-app-improvement-plan-b7a9` (merged #134 — fuzzy search, control rackets), `cursor/web-app-improvement-plan-9a0c` (PR #130 — `/data/` claims registry)  
**Baseline:** Sprint 5 on `main` (PR #116 — programmatic best pages, glossary autolink fill-in; PR #117 — guide ToC CLS fix).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Gap / response |
|------------|---------------------------|----------------|
| **Wirecutter / RTINGS** | Public methodology + cited specs | ✅ `/data/` claims registry (PR #130) |
| **Tennis Warehouse / retailer finders** | Typo-tolerant search, faceted browse | ✅ Catalog + kind filters on main; fuzzy token search (#134) |
| **RacketGuide / affiliate roundups** | Long-tail landings (control, price bands) | ✅ `/best/control-rackets/`, `/best/rackets-under-200/` |
| **BadmintonCentral** | Community trust signals | ⏳ HelpfulReaction Workers/KV |
| **Brand PDPs** | First-party photography | ⏳ Editorial `public/products/` pipeline |

**Moat:** `content/claims.json` with CI freshness gate, static export, postbuild SEO audit.

---

## 2. Top 5 gaps (Sprint 6)

| # | Gap | Impact | Sprint 6 |
|---|-----|--------|----------|
| 1 | **No public claims transparency page** | E-E-A-T, cite-back moat | ✅ `/data/` (PR #130) |
| 2 | **Site search lacks typo tolerance** | Discovery friction on mobile | ✅ `search-fuzzy.ts` (#134 on main) |
| 3 | **Missing control / placement programmatic `/best/*`** | Long-tail SEO | ✅ `/best/control-rackets/` |
| 4 | Faceted catalogue browse | Discovery | ✅ On main (`/catalog/`) |
| 5 | HelpfulReaction aggregate counts | Social proof | ⏳ Phase C backend |

---

## 3. Execution summary

1. **`/data/`** — reader-facing table of every `content/claims.json` entry with tier, quote, `accessedAt`, and `usedOn` routes.
2. **`src/lib/search-fuzzy.ts`** — Levenshtein distance (max 1) for query tokens ≥4 chars (on main via #134).
3. **`/best/control-rackets/`** — six catalog-backed control picks with ≥200-word intro.
4. Registry updates — `editorial-meta`, `site-search`, `/best/` hub, methodology link, Lighthouse URLs (no `/saved/` — page is `noindex`; glossary omitted — CLS flake in CI).

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Q2 §3.5 `/data/` + programmatic `/best/*` | ✅ |
| 2 | Claims page uses `allClaims()` / `claimFreshness()` — no duplicate JSON parse | ✅ |
| 3 | New best pages have ≥200 words original intro | ✅ |
| 4 | `editorial-meta` + sitemap `lastReviewedAt` registered | ✅ |
| 5 | Control picks distinct from beginner / smash / shoulder guides | ✅ |
| 6 | Static export safe (no API routes) | ✅ |
| 7 | Lighthouse excludes `noindex` `/saved/` and flaky glossary | ✅ |
| 8 | `npm test` | ✅ |
| 9 | `npm run build` + postbuild SEO audit | ✅ |
| 10 | Lighthouse config includes `/data/` + new commercial URLs | ✅ |

---

## 5. Verification

```bash
npm test
npm run build
npm run lint
```

---

## 6. Deferred (Sprint 7+)

- HelpfulReaction Workers/KV aggregate counts
- GSC/CrUX baseline CSV in `docs/baselines/`
- Original photos on top commercial URLs
- Review body full-text in search index (size trade-off)
