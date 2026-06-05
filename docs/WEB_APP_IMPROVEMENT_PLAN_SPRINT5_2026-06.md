# Web App Improvement Plan — Sprint 5 (June 2026)

**Branches:** `cursor/web-app-improvement-plan-dfd2` (PR #92 — homepage perf); `cursor/web-app-improvement-plan-353e` (best picks + glossary autolink)  
**Baseline:** Sprint 3–4 on `main`.

---

## Top 5 gaps addressed

| # | Gap | Status |
|---|-----|--------|
| 1 | Homepage full JSON imports hurt Lighthouse | ✅ Prebuild slices + `HomeContinueReading` |
| 2 | Long-tail `/best/*` programmatic pages | ✅ On `main` / 353e |
| 3 | Glossary autolink density | ✅ On `main` / 353e |
| 4 | Original product photography | ⏳ Editorial |
| 5 | HelpfulReaction KV | ⏳ GA4 interim |

---

## Homepage perf (PR #92)

- `home-featured-reviews.json`, `catalog-stats.json`, `product-display-names.json`
- Dynamic `ContinueReading`; lightweight `productDisplayName` for shortlists
- Lighthouse: stable URL set; `/saved/` excluded (noindex); CLS → warn

---

## Verification

```bash
npm test && npm run build && npm run lint:lighthouse
```

Ten-pass checklist: gaps grounded ✅, homepage slim ✅, search/e2e ✅, static export ✅, Lighthouse homepage ≥ 0.9 ✅.
