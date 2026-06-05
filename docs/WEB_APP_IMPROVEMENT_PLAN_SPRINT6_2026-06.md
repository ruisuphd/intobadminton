# Web App Improvement Plan — Sprint 6 (June 2026)

**Branches:** `cursor/web-app-improvement-plan-b7a9` (PR #134, merged) + `cursor/web-app-improvement-plan-06b6` (PR #129)  
**Baseline:** Sprint 5 on `main` (PR #116); guide ToC CLS fix (PR #117); catalog URL filters (PR #122).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Gap / Sprint 6 response |
|------------|---------------------------|------------------------|
| **Tennis Warehouse / retailer finders** | Typo-tolerant search, faceted browse | ✅ Fuzzy token search + catalog filters on main |
| **Wirecutter / RTINGS** | Public helpful-vote counts | ✅ HelpfulReaction Workers/KV client + deployable worker |
| **RacketGuide / affiliate roundups** | Role-specific landings (singles, control, head-light) | ✅ Four new `/best/*` pages |
| **Retailer PDPs** | Product hero imagery on every pick row | ✅ Branded `ProductImagePlaceholder` |
| **Mature content ops** | Lighthouse regression gates | ✅ `scripts/lighthouse-baseline.mjs` |

**Moat:** transparent fit score, postbuild SEO gate, static export, 146+ signed reviews, claims CI.

**Deferred:** first-party `public/products/` photography, GSC/CrUX CSV capture, `Person.sameAs`, `VideoObject`, web push, comments.

---

## 2. Top 5 gaps (closed Sprint 6)

| # | Gap | Impact | Status |
|---|-----|--------|--------|
| 1 | Site search lacks typo tolerance | Discovery friction | ✅ `search-fuzzy.ts` (PR #134) |
| 2 | Role matrix incomplete (singles, control, head-light) | Long-tail SEO | ✅ Four programmatic `/best/*` pages |
| 3 | HelpfulReaction shows no public counts | Social proof | ✅ Optional Workers/KV API (PR #129) |
| 4 | Best-of rows without verified images look empty | Visual maturity | ✅ `ProductImagePlaceholder` |
| 5 | No Lighthouse regression baseline in repo | CWV guardrail | ✅ Baseline snapshot script |

---

## 3. Execution summary

**PR #134 (merged):** fuzzy search, `/best/control-rackets/`, `/best/rackets-under-200/`, catalog URL filters.

**PR #129:** `workers/reactions/`, `reactions-api.ts`, `/best/singles-rackets/`, `/best/head-light-rackets/`, `ProductImagePlaceholder`, `lighthouse-baseline.mjs`.

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Q2 competitive audit + Sprint 5 deferrals | ✅ |
| 2 | Reactions API optional — static export safe without env | ✅ |
| 3 | Fuzzy search rejects nonsense queries | ✅ |
| 4 | New best picks use distinct lenses vs existing guides | ✅ |
| 5 | Each new best page has ≥200 words original intro + FAQs | ✅ |
| 6 | `editorial-meta`, site search, `/best/` hub, Lighthouse URLs updated | ✅ |
| 7 | Placeholder renders only when `canShowProductImage` is false | ✅ |
| 8 | Unit tests for reactions-api, search-fuzzy, product filters | ✅ |
| 9 | `npm test` + `npm run build` + postbuild SEO audit | ✅ |
| 10 | No Next.js API routes (worker is external) | ✅ |

---

## 5. Verification

```bash
npm test
npm run lint
npm run build
node scripts/lighthouse-baseline.mjs --help
```

Deploy reactions worker (optional):

```bash
cd workers/reactions && npx wrangler deploy
# Set NEXT_PUBLIC_REACTIONS_API_URL on the static site
```

---

## 6. Metrics (Q2)

| Goal | Target |
|------|--------|
| Pages per session | 2.5+ |
| 7-day return rate | 15%+ |
| GSC clicks | 4× baseline |
| Helpful vote engagement | GA4 + public counts when API live |
| CWV p75 LCP | <2.5s |
