# Web App Improvement Plan — June 2026

**Branch:** `cursor/web-app-improvement-plan-3b6d`  
**Scope:** Maturity gaps vs leading badminton equipment sites after Sprint 1–4 delivery.  
**Baseline:** [`IMPROVEMENT_PLAN_2026Q2.md`](IMPROVEMENT_PLAN_2026Q2.md), [`AUDIT_2026-05.md`](AUDIT_2026-05.md).

---

## 1. Competitive audit (June 2026)

### Comparable sites

| Site | Strength vs IntoBadminton | Gap IntoBadminton had |
|------|----------------------------|------------------------|
| **BadmintonCentral** forums + reviews | Deep community threads, long archive | No on-site search across 146+ reviews |
| **Tennis Warehouse–style retailers** | Rich product imagery, comparison tables | Partially closed (comparison tables, fit badges shipped) |
| **RacketGuide / retailer finders** | Filter-first UX, instant spec scan | Finder strong; return-visit hooks weak |
| **YouTube-first reviewers** | Video evidence, personality | Still open (VideoObject gated on video commitment) |
| **AllAboutBadminton / brand blogs** | Pro player association | Author entity strong; `sameAs` profiles still TODO |

### IntoBadminton moat (keep)

- Transparent 5-factor fit score with named reason codes
- Postbuild SEO gate + claims registry freshness in CI
- Consent Mode v2 + AdSense scaffolding
- 146 review articles with first-person English voice
- Static export performance (462+ routes, sub-3s LCP on key pages)

---

## 2. Top 5 remaining gaps (prioritized)

| # | Gap | Impact | This PR |
|---|-----|--------|---------|
| 1 | **No functional site search** — readers cannot query reviews/guides/tools | SEO (SearchAction), UX discovery | ✅ `/search/` + index |
| 2 | **No return-visit surface on homepage** — history only on `/results/` | Retention, pages/session | ✅ `ContinueReading` |
| 3 | **Review E-E-A-T box missing on article pages** — methodology exists but not visible | Product Reviews update signal | ✅ `ReviewMethodologyBox` |
| 4 | **HowTo schema thin on procedural guides** — only authenticity tool had it | Rich results on how-to queries | ✅ string-tension + racket-balance |
| 5 | **Lighthouse CI drift** — audited stale `/blog/` URLs post-migration | CI signal integrity | ✅ updated `lighthouserc.json` |

### Deferred (next sprint)

- Per-product notify-me backend (Buttondown)
- HelpfulReaction Workers/KV aggregate counts
- Original product photography on commercial pages
- `Person.sameAs` external profile claims
- zh locale content expansion

---

## 3. Execution summary (this PR)

1. **`src/lib/site-search.ts`** — build-time index over reviews, guides, best-of, tools, brands (~170+ entries).
2. **`/search/`** — client-side search with `?q=` deep links; enables `WebSite` `SearchAction` JSON-LD.
3. **`ContinueReading`** — homepage card for last-read article + latest finder shortlist (localStorage).
4. **`ReviewMethodologyBox`** — visible “What we tested” block on every review article.
5. **`GuideStructuredData` HowTo** — optional steps on string-tension and racket-balance guides.
6. **Lighthouse URLs** — replaced legacy `/blog/` paths with current `/review/` and `/search/`.

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gap list grounded in code audit + Q2 plan | ✅ |
| 2 | Search index covers reviews + static hubs | ✅ `buildSearchIndex()` |
| 3 | SearchAction URL template matches `/search/?q=` | ✅ `company.ts` |
| 4 | No server/API required (static export safe) | ✅ client-only search |
| 5 | ContinueReading respects no-signup promise | ✅ localStorage only |
| 6 | ReviewMethodologyBox links to `/methodology/` | ✅ |
| 7 | HowTo steps match visible guide content | ✅ editorial review |
| 8 | `/search/` in sitemap + editorial-meta | ✅ |
| 9 | Unit tests for search scoring | ✅ `site-search.test.ts` |
| 10 | `npm test && npm run build` + postbuild SEO audit | ✅ CI gate |

---

## 5. Metrics (unchanged from Q2 plan)

| Goal | Target |
|------|--------|
| Pages per session | 2.5+ |
| 7-day return rate | 15%+ |
| GSC clicks | 4× baseline |
| SearchAction eligibility | Declared + functional |

---

## 6. Sources

- Internal: [`IMPROVEMENT_PLAN_2026Q2.md`](IMPROVEMENT_PLAN_2026Q2.md), [`DESIGN.md`](DESIGN.md)
- Competitive: BadmintonCentral, Tennis Warehouse UX patterns, Google Product Reviews Update guidance (March 2026)
