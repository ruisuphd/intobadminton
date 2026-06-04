# Web App Improvement Plan — Sprint 5 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-353e`  
**Baseline:** Sprint 3–4 on `main` (PR #97, #105 — catalog filters, glossary links, toolkit cross-links).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Gap / response |
|------------|---------------------------|----------------|
| **Tennis Warehouse / retailer finders** | Faceted spec browse | ✅ `/catalog/` on main (#105) |
| **RacketGuide / affiliate roundups** | Long-tail landings (`5U`, shoulder comfort) | ✅ Two new `/best/*` pages (this PR) |
| **BadmintonCentral / authority blogs** | Inline concept links to glossary | ✅ Auto + manual `segmentArticleGlossary` |
| **Wirecutter / RTINGS** | Social proof vote counts | ⏳ HelpfulReaction Workers/KV |
| **Brand PDPs** | First-party product photography | ⏳ Editorial `public/products/` pipeline |

---

## 2. Top 5 gaps (this sprint)

| # | Gap | Impact | Sprint 5 |
|---|-----|--------|----------|
| 1 | **Missing long-tail programmatic `/best/*` landings** | SEO topical coverage | ✅ 5U + shoulder comfort |
| 2 | **Glossary autolink only on declared terms** | Internal linking density | ✅ Automatic fill-in after manual links |
| 3 | Faceted catalogue browse | Discovery | ✅ Already on main (`/catalog/`) |
| 4 | Original product photography | AdSense / experience | ⏳ Editorial pipeline |
| 5 | HelpfulReaction aggregate counts (Workers/KV) | Social proof | ⏳ Phase C backend |

---

## 3. Execution summary

1. **`/best/lightweight-rackets-5u/`** and **`/best/rackets-for-shoulder-comfort/`** — six catalog-backed picks each.
2. **`segmentArticleGlossary`** — manual `glossaryLinks` first, then automatic first-mention fill-in from `glossary-terms.ts`.
3. Registry updates — `editorial-meta`, `site-search`, `/best/` hub, homepage popular searches, Lighthouse URLs.

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Q2 §3.3 programmatic pages + competitive audit | ✅ |
| 2 | New best picks align with `products.json`; review links only when mapped | ✅ |
| 3 | Each new best page has ≥200 words original intro | ✅ |
| 4 | `editorial-meta` + sitemap `lastReviewedAt` registered | ✅ |
| 5 | Distinct lenses vs existing `/best/*` guides | ✅ |
| 6 | Static export safe (no API routes) | ✅ |
| 7 | Glossary manual links take precedence over autolink | ✅ |
| 8 | `npm test` | ✅ |
| 9 | `npm run build` + postbuild SEO audit | ✅ |
| 10 | Lighthouse config includes new best URLs + `/catalog/` | ✅ |

---

## 5. Verification

```bash
npm test
npm run build
```
