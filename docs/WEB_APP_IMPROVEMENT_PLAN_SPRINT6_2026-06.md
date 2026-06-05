# Web App Improvement Plan — Sprint 6 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-9a0c`  
**Baseline:** Sprint 5 on `main` (PR #116 — programmatic `/best/*`, glossary autolink).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Gap / response |
|------------|---------------------------|----------------|
| **Wirecutter / RTINGS** | Public methodology + cited specs | ✅ `/data/` claims registry (this PR) |
| **Tennis Warehouse** | Price-band discovery landings | ✅ `/best/rackets-under-200/` |
| **RacketGuide / affiliate roundups** | Control / placement long-tail | ✅ `/best/control-rackets/` |
| **BadmintonCentral** | Community trust signals | ⏳ HelpfulReaction Workers/KV |
| **Brand PDPs** | First-party photography | ⏳ Editorial `public/products/` pipeline |

**Moat:** `content/claims.json` with CI freshness gate, static export, postbuild SEO audit.

---

## 2. Top 5 gaps (this sprint)

| # | Gap | Impact | Sprint 6 |
|---|-----|--------|----------|
| 1 | **No public claims transparency page** | E-E-A-T, cite-back moat | ✅ `/data/` |
| 2 | **Missing $150–$200 price-band landing** | Mid-budget SEO | ✅ `/best/rackets-under-200/` |
| 3 | **No control / placement programmatic hub** | Long-tail commercial queries | ✅ `/best/control-rackets/` |
| 4 | Faceted catalogue browse | Discovery | ✅ On main (`/catalog/`) |
| 5 | HelpfulReaction aggregate counts | Social proof | ⏳ Phase C backend |

---

## 3. Execution summary

1. **`/data/`** — reader-facing table of every `content/claims.json` entry with tier, quote, `accessedAt`, and `usedOn` routes.
2. **`/best/rackets-under-200/`** — catalogue-backed price-band page via `buildPriceBandRacketsConfig`.
3. **`/best/control-rackets/`** — six editor-ranked even-balance / placement frames with ≥200-word intro.
4. Registry updates — `editorial-meta`, `site-search`, `/best/` hub, methodology link, Lighthouse URLs (no `/saved/` — page is `noindex`).

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
| 7 | Lighthouse excludes `noindex` `/saved/` | ✅ |
| 8 | `npm test` | ✅ |
| 9 | `npm run build` + postbuild SEO audit | ✅ |
| 10 | Lighthouse config includes new commercial URLs | ✅ |

---

## 5. Verification

```bash
npm test
npm run build
```
