# Web App Improvement Plan — Sprint 3 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-9035`  
**Baseline:** Sprint 1–2 shipped on `main` ([`WEB_APP_IMPROVEMENT_PLAN_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_2026-06.md), [`WEB_APP_IMPROVEMENT_PLAN_SPRINT2_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT2_2026-06.md)).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Gap / response |
|------------|---------------------------|----------------|
| **BadmintonCentral** | Forum search, community threads | ✅ Site search; ❌ no UGC threads (deferred) |
| **Tennis Warehouse / retailer finders** | PDP imagery, faceted filters | Finder strong; first-party `public/products/` photos still open |
| **RacketGuide / generic affiliate roundups** | Price-sorted lists | ✅ Editorial under-$100 page with 200+ words + trade-offs (this sprint) |
| **Wirecutter / RTINGS** | Notify-on-price, email loops | ✅ Local notify-me intent + GA4 until Buttondown ships |
| **YouTube reviewers** | Video evidence | `VideoObject` still gated on video commitment |

**Moat:** transparent fit score, postbuild SEO gate, 146+ reviews, static-export CWV, claims CI.

---

## 2. Top 5 gaps (this sprint)

| # | Gap | Impact | Sprint 3 |
|---|-----|--------|----------|
| 1 | **No budget-tier programmatic landing** (`/best/rackets-under-100/`) | Long-tail commercial queries | ✅ |
| 2 | **Homepage lacks discoverability search** (search only in header) | Discovery / SearchAction usage | ✅ Hero `SiteSearchForm` |
| 3 | **Notify-me fallback when Buttondown unset** | Retention prep | ✅ `localStorage` + Buttondown from `main` |
| 4 | Original product photography on commercial URLs | AdSense / March 2026 experience | ⏳ Editorial pipeline |
| 5 | HelpfulReaction aggregate counts (Workers/KV) | Social proof on articles | ⏳ Phase C backend |

**Deferred:** Buttondown live API; `Person.sameAs`; zh locale content; community comments.

---

## 3. Execution summary

1. Add `/best/rackets-under-100/` — six catalog-backed picks ≤$100 with intro analysis, comparison table, and FAQs (no `/review/{productId}/` links until those articles exist).
2. Register route in `editorial-meta`, `site-search`, `/best/` hub, homepage popular searches.
3. `src/lib/notify-me.ts` — per-product email intent in `localStorage` (30d TTL) when `NEXT_PUBLIC_BUTTONDOWN_USERNAME` is unset; `SavedListClient` uses Buttondown when configured.
4. `LocalizedHome` hero — compact `SiteSearchForm` under primary CTAs.
5. Lighthouse CI — audit new best page + cluster guide URLs.

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Q2 §3.3 programmatic pages + Sprint 3 engagement | ✅ |
| 2 | Under-$100 picks align with `products.json` catalog rows | ✅ |
| 3 | Page has ≥200 words original intro (not template-only) | ✅ |
| 4 | `editorial-meta` + sitemap `lastReviewedAt` registered | ✅ |
| 5 | Distinct from `/best/beginner-rackets/` (price lens, not level lens) | ✅ |
| 6 | Static export safe (no API routes) | ✅ |
| 7 | Notify-me stores locally only; copy states email not sent yet | ✅ |
| 8 | `npm test` (site-search, editorial-meta, notify-me) | ✅ |
| 9 | `npm run build` + postbuild SEO audit | ✅ |
| 10 | Lighthouse config includes new URL | ✅ |

---

## 5. Verification

```bash
npm test
npm run build
```

---

## 6. Metrics (unchanged from Q2)

| Goal | Target |
|------|--------|
| Pages per session | 2.5+ |
| 7-day return rate | 15%+ |
| GSC clicks | 4× baseline |
