# Web App Improvement Plan — June 2026

**Branches:** PR [#80](https://github.com/ruisuphd/intobadminton/pull/80), [#84](https://github.com/ruisuphd/intobadminton/pull/84), [#94](https://github.com/ruisuphd/intobadminton/pull/94) merged to `main`; follow-up `cursor/web-app-improvement-plan-dfd2` (homepage Lighthouse perf)  
**Baseline:** [`IMPROVEMENT_PLAN_2026Q2.md`](IMPROVEMENT_PLAN_2026Q2.md), [`AUDIT_2026-05.md`](AUDIT_2026-05.md)

---

## 1. Competitive audit (June 2026)

| Site | Strength vs IntoBadminton | Gap / response |
|------|----------------------------|----------------|
| **BadmintonCentral** | Community archive, search | ✅ On-site search (`/search/`) |
| **Tennis Warehouse / retailer finders** | Imagery, comparison tables, notify-me | Tables ✅; notify-me ✅ (Buttondown on `/saved/`) |
| **RacketGuide-style finders** | Filter-first UX | Finder + toolkit strip; return hooks shipped |
| **YouTube-first reviewers** | Video evidence | Open — `VideoObject` gated on video commitment |
| **Brand / affiliate blogs** | Pro association | Author entity + methodology; certified CMP (EEA) pending |

**Moat:** transparent fit score, claims CI, static export, 146+ first-person reviews, postbuild SEO gate.

---

## 2. Top 5 gaps (prioritized — post Phase A/B)

| # | Gap | Impact | Status |
|---|-----|--------|--------|
| 1 | Homepage Lighthouse / critical-path JS | CI + CWV | ✅ Follow-up dfd2 (slim JSON + deferred engagement) |
| 2 | SEO topical clusters (shoe-fit + doubles) | Long-tail rankings | ✅ Shipped on `main` |
| 3 | Compare-guide search coverage | Discovery | ✅ PR #84 merged |
| 4 | Original photography / video | AdSense + experience signal | ⏳ Editorial pipeline |
| 5 | HelpfulReaction KV aggregates | Social proof | ⏳ GA4 interim only |

**Shipped on `main`:** site search, `SearchAction`, `ContinueReading`, `HomeRecentShortlists`, Buttondown notify-me, Product JSON-LD enrichment, engagement on `/best/*` and `/guides/*`.

---

## 3. Execution phases

### Phase A — Shipped (main)

- Site search, return-visit hooks, methodology box, affiliate disclosure, toolkit strip

### Phase B — Shipped (main)

- SEO cluster guides; Product JSON-LD enrichment; Buttondown notify-me; compare-guide search index + e2e
- Homepage bundle slimming (dfd2): `home-featured-reviews.json`, `catalog-stats.json`, `product-display-names.json`

### Phase C — Next

- GSC/CrUX baseline CSV capture
- Original photos on top commercial URLs
- HelpfulReaction Workers/KV
- YouTube `sameAs` on author entity

---

## 4. Ten-pass verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Q2 plan + audit | ✅ |
| 2 | Search covers reviews + compare guides | ✅ |
| 3 | Homepage avoids full JSON corpora on `/` | ✅ (dfd2) |
| 4 | Notify-me + engagement without signup wall | ✅ |
| 5 | Static export safe | ✅ |
| 6 | Product JSON-LD via enrichment helper | ✅ |
| 7 | `site-search.test.ts` + search e2e | ✅ |
| 8 | `/search/` in sitemap | ✅ |
| 9 | `npm test` | ✅ |
| 10 | `npm run build` + Lighthouse homepage ≥ 0.9 | ✅ (dfd2) |

---

## 5. Verification

```bash
npm test
npm run build
npm run lint:lighthouse
```

---

## 6. Metrics (Q2 plan)

| Goal | Target |
|------|--------|
| Pages per session | 2.5+ |
| 7-day return rate | 15%+ |
| GSC clicks | 4× baseline |
| Lighthouse performance (homepage) | ≥ 0.9 |
| SearchAction | Functional + declared |
