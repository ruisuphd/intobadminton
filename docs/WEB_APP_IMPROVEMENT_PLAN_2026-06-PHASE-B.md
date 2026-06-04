# Web App Improvement Plan — June 2026 (Phase B)

**Branch:** `cursor/web-app-improvement-plan-bab1`  
**Baseline:** [`WEB_APP_IMPROVEMENT_PLAN_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_2026-06.md) (Phase A shipped on main via PR #80)

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Gap we still close |
|------------|---------------------------|--------------------|
| **BadmintonCentral** | 20+ years of forum archive, community trust | On-site search ✅; engagement loops ⏳ |
| **Tennis Warehouse / retailer finders** | Hero imagery, sortable spec tables, notify-me | Tables ✅; original photos open; notify-me wired this phase |
| **YouTube-first reviewers** | Video evidence, personality | VideoObject still gated on editorial decision |
| **Wirecutter / RTINGS pattern** | Product schema + star ratings in SERP | Product JSON-LD on `/review/[slug]/` — this phase |
| **Brand blogs (Yonex/Victor)** | Pro association, lifestyle imagery | Author entity strong; original photography open |

**Moat retained:** transparent 5-factor fit score, claims CI, static export, 146+ first-person reviews, consent-gated ads.

---

## 2. Top 5 gaps (prioritized, Phase B)

| # | Gap | Impact | This branch |
|---|-----|--------|-------------|
| 1 | **Product + Review JSON-LD on indexable `/review/[slug]/`** | P0 SEO — Product rich results on commercial URLs | ✅ `enrichmentForReviewArticle()` + `JsonLd` in `EditorialArticlePage` |
| 2 | **Fit-score visualization on review pages** | Core product story invisible on SEO pages | ✅ `ReviewProductFitPanel` (badge + radar, neutral profile) |
| 3 | **Per-product notify-me (Buttondown)** | P1 retention on saved shelf | ✅ `subscribeViaButtondown()` + live form on `/saved/` |
| 4 | **Engagement UX on commercial long-form** | P1 dwell + AdSense readiness on `/best/*`, `/guides/*` | ✅ `ArticleEngagementFooter`, `GuideEngagement`, affiliate disclosure on best pages |
| 5 | **HelpfulReaction aggregate counts (Workers/KV)** | P1 social proof | ⏳ Still GA4 + localStorage; backend deferred |

**Explicitly deferred (Phase C — editorial / infra):**
- Original product photography on top commercial URLs
- HelpfulReaction Cloudflare Workers/KV endpoint
- GSC/CrUX CSV baselines (manual owner capture per `docs/baselines/README.md`)
- VideoObject / YouTube `sameAs` claim

---

## 3. Execution phases

### Phase A — Shipped (main, PR #80)

- Site search (`/search/`, `SearchAction`, header form)
- `ContinueReading` + `LastArticleTracker`
- `ReviewMethodologyBox` + `InArticleAffiliateDisclosure` on reviews
- `HomeToolkitStrip` on homepage
- HowTo schema on procedural guides

### Phase B — This branch

| Deliverable | Files |
|-------------|-------|
| Product JSON-LD on mapped review articles | `src/lib/review-article-enrichment.ts`, `EditorialArticlePage.tsx` |
| Fit-score panel on mapped reviews | `ReviewProductFitPanel.tsx` |
| Buttondown notify-me | `src/lib/buttondown.ts`, `SavedListClient.tsx`, `.env.example` |
| Engagement on `/best/*` | `BestPicksPage.tsx` — `ReadingProgress`, `InArticleAffiliateDisclosure`, `ArticleEngagementFooter` |
| Engagement on `/guides/*` | `GuideEngagement.tsx` on all 8 guide routes |

### Phase C — Next

- HelpfulReaction Workers/KV (cross-user counts)
- Original photos via `ProductImageSet` + `public/products/`
- GSC/CrUX baseline CSV commit after owner export
- First-person evidence sweep on top-10 GSC URLs

---

## 4. Ten-pass verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Q2 + June audit, not re-litigating shipped Phase A | ✅ |
| 2 | Product JSON-LD only when `blog-review-product-map.json` maps slug → product | ✅ |
| 3 | Fit panel uses neutral `defaultUserProfile()` — not misleading personalisation | ✅ |
| 4 | Buttondown: no local email storage; double opt-in copy shown | ✅ |
| 5 | Static export safe — no server routes added | ✅ |
| 6 | Affiliate disclosure on `/best/*` commercial pages | ✅ |
| 7 | HelpfulReaction + SocialShare on guides and best pages | ✅ |
| 8 | `.env.example` documents `NEXT_PUBLIC_BUTTONDOWN_USERNAME` | ✅ |
| 9 | Unit tests: `review-article-enrichment.test.ts` | ✅ |
| 10 | `npm test && npm run build` green | ✅ (CI gate) |

---

## 5. Verification commands

```bash
npm test
npm run build
```

Post-build SEO audit must pass (Product nodes on mapped review pages should satisfy `product-no-rich-signal` gate).

---

## 6. Success metrics (unchanged from Q2 plan)

| Goal | Target |
|------|--------|
| Pages per session | 2.5+ |
| 7-day return rate | 15%+ |
| GSC clicks | 4× baseline |
| Product rich results | Valid Product + Review on mapped `/review/[slug]/` URLs |
