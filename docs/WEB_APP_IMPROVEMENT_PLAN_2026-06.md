# IntoBadminton — Web App Improvement Plan (June 2026)

**Branch:** `cursor/web-app-improvement-plan-d967`  
**Supersedes (extends):** [`IMPROVEMENT_PLAN_2026Q2.md`](IMPROVEMENT_PLAN_2026Q2.md)  
**Audit date:** 2026-06-04

---

## 1. Competitive audit (summary)

Compared against leading badminton commerce/editorial surfaces (Bash Badminton guides, retailer “best of” roundups, BadmintonCentral forum depth, Yonex selector flows) and general affiliate review patterns (comparison tables, spec grids, search, author E-E-A-T).

| Dimension | IntoBadminton (Jun 2026) | Typical strong competitor |
|-----------|---------------------------|---------------------------|
| Personalised finder | **Strong** — 5-factor scoring, no signup | Weak or absent |
| Review depth | **Strong** — 146 English reviews, evidence labels | Medium — often thin affiliate copy |
| Comparison tables | **Strong** on `/best/*` and in-article | Strong |
| Site search | **Was missing** → shipped `/search/` | Universal |
| Return visits | **Partial** — saved shelf; history only on results | Wishlists, email, apps |
| Interactive tools | **Strong** — 5 tools under `/tools/` | Rare |
| First-hand methodology UI | **Partial** → `ReviewMethodologyBox` | Variable |
| Video / original photo moat | **Weak** (content pipeline) | Mixed |
| zh locale content | **Infrastructure only** | N/A for EN competitors |

**IntoBadminton moat:** transparent scoring + claims CI + static performance + honest editorial voice.  
**Biggest remaining gaps:** discoverability (search), return-visit surfacing on home, AdSense/CMP/content moat (photos, video), notify-me backend.

---

## 2. Top 5 gaps (prioritised)

| # | Gap | Impact | This PR |
|---|-----|--------|---------|
| 1 | **No functional site search** — readers rely on scroll/Google | SEO sitelinks, UX | ✅ `/search/` + index + `SearchAction` |
| 2 | **“What we tested” not visible on review pages** | E-E-A-T / Product Reviews update | ✅ `ReviewMethodologyBox` |
| 3 | **Return-visit hooks buried** — history only on `/results/` | Engagement / pages per session | ✅ Home `RecentHistory` + toolkit strip |
| 4 | **In-article affiliate disclosure** before monetization scales | AdSense / FTC | ✅ `InArticleAffiliateDisclosure` |
| 5 | **Original photography + video evidence** on commercial URLs | Ranking + AdSense “low value” risk | ⏳ Content/editorial (not code-only) |

---

## 3. Execution roadmap (mature plan)

### Phase A — Discoverability & trust (this PR)

- Client-side search index (`scripts/generate-search-index.mjs`, `public/search-index.json`)
- `/search/` results page; hero + header search forms
- `WebSite` `SearchAction` JSON-LD restored in `src/lib/company.ts`
- `ReviewMethodologyBox` + in-article affiliate disclosure on `EditorialArticlePage`
- Homepage engagement strip (recent shortlists + toolkit cards)
- Lighthouse CI URLs updated for `/review/` canonical paths

### Phase B — Engagement backends (next)

- HelpfulReaction → Workers/KV aggregate counts
- Per-product notify-me → Buttondown double opt-in
- GSC/CrUX baseline capture in `docs/baselines/`

### Phase C — Content moat (editorial)

- Top-10 commercial pages: ≥1 original photo each
- 3–5 first-person evidence moments per high-traffic review (see Q2 plan §3.2)
- Optional `methodology` field population in `blog-articles.json`

### Phase D — Monetization readiness

- Google-certified CMP for EEA (`cmp_tcf`)
- AdSense application after Phase C visual proof
- Slot taxonomy per page type (existing strategy doc)

---

## 4. Ten-pass plan verification

| Pass | Question | Verdict |
|------|----------|---------|
| 1 | Does scope match user request (audit → plan → execute → PR)? | ✅ |
| 2 | Are gaps grounded in competitor + internal audit? | ✅ |
| 3 | Is static `output: "export"` preserved? | ✅ — search is client JSON |
| 4 | Any false `SearchAction` before search worked? | ✅ — search ships same PR |
| 5 | Privacy / no-signup promise intact? | ✅ — search is local-only |
| 6 | Export-audit affiliate rules satisfied? | ✅ — `data-affiliate-disclosure="article"` |
| 7 | Tests + build gates defined? | ✅ — vitest + postbuild SEO |
| 8 | Lighthouse URLs reflect `/review/` migration? | ✅ |
| 9 | Remaining gap #5 explicitly content-owned? | ✅ |
| 10 | No scope creep (video, CMS, dark mode)? | ✅ |

---

## 5. Verification commands

```bash
npm test
npm run build
npm run test:e2e   # optional
```

Expected: search index generated in prebuild; SEO audit pass; new tests in `site-search.test.ts`.

---

## 6. Metrics (unchanged from Q2 plan)

Track weekly: GSC clicks, pages/session, quiz completion, 7-day return rate, CWV p75, AdSense status.
