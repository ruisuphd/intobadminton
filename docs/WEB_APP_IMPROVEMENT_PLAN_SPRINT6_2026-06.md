# Web App Improvement Plan — Sprint 6 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-06b6`  
**Baseline:** Sprint 5 on `main` (PR #116 — programmatic `/best/*`, glossary autolink); Q2 plan in [`IMPROVEMENT_PLAN_2026Q2.md`](IMPROVEMENT_PLAN_2026Q2.md).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Gap / Sprint 6 response |
|------------|---------------------------|------------------------|
| **Wirecutter / RTINGS** | Public helpful-vote counts on every guide | ⏳ HelpfulReaction Workers/KV client + deployable worker |
| **Tennis Warehouse / RacketGuide** | Role-specific landings (singles vs doubles vs control) | ✅ `/best/singles-rackets/` + `/best/head-light-rackets/` |
| **Retailer PDPs** | Product hero imagery on every pick row | ✅ Branded `ProductImagePlaceholder` when no verified image |
| **Authority sites (BadmintonCentral)** | Long-tail SEO cluster completeness | ✅ Singles + head-light pillars close the role matrix |
| **Mature content ops** | Lighthouse score regression gates | ✅ `scripts/lighthouse-baseline.mjs` snapshot + compare |

**Moat retained:** transparent fit score, postbuild SEO gate, static export, 146+ signed reviews, claims CI.

**Still deferred (editorial / infra owner):** first-party `public/products/` photography, GSC/CrUX CSV capture, `Person.sameAs` profile claims, `VideoObject`, web push, comments.

---

## 2. Top 5 gaps (this sprint)

| # | Gap | Impact | Sprint 6 |
|---|-----|--------|----------|
| 1 | **HelpfulReaction shows no public counts** | Social proof on guides/best/reviews | ✅ Optional Workers/KV API + client |
| 2 | **Missing singles + head-light programmatic landings** | Long-tail SEO (role matrix incomplete) | ✅ Two new `/best/*` pages |
| 3 | **Best-of rows without verified images look empty** | Visual maturity / AdSense readiness | ✅ Branded placeholder component |
| 4 | **No Lighthouse regression baseline in repo** | CWV guardrail (Q2 §5 #34) | ✅ Baseline snapshot script |
| 5 | **Original product photography pipeline idle** | E-E-A-T last mile | ⏳ Editorial — Sharp path ready when assets land |

---

## 3. Execution summary

1. **`workers/reactions/`** — Cloudflare Worker (KV) for anonymous reaction counts; CORS-safe GET/POST.
2. **`src/lib/reactions-api.ts`** — client fetch/submit; gated on `NEXT_PUBLIC_REACTIONS_API_URL`.
3. **`HelpfulReaction`** — show aggregate counts when API responds; local vote dedup unchanged.
4. **`/best/singles-rackets/`** and **`/best/head-light-rackets/`** — six curated picks each, registry + search + hub updates.
5. **`ProductImagePlaceholder`** — SVG brand chip on best-of rows missing verified images.
6. **`scripts/lighthouse-baseline.mjs`** — capture/compare category scores against `docs/baselines/lighthouse-scores.json`.

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Q2 competitive audit + Sprint 5 deferrals | ✅ |
| 2 | Reactions API is optional — static export safe without env | ✅ |
| 3 | Worker stores counts only (no PII); CORS limited to GET/POST | ✅ |
| 4 | New best picks use distinct lenses vs doubles/smash/5U guides | ✅ |
| 5 | Each new best page has ≥200 words original intro + FAQs | ✅ |
| 6 | `editorial-meta`, site search, `/best/` hub, Lighthouse URLs updated | ✅ |
| 7 | Placeholder renders only when `canShowProductImage` is false | ✅ |
| 8 | Unit tests for reactions-api + product filter helpers | ✅ |
| 9 | `npm test` + `npm run build` + postbuild SEO audit | ✅ |
| 10 | No API routes added to Next.js app (worker is external) | ✅ |

---

## 5. Verification

```bash
npm test
npm run lint
npm run build
node scripts/lighthouse-baseline.mjs --help
```

Deploy reactions worker separately:

```bash
cd workers/reactions && npx wrangler deploy
# Then set NEXT_PUBLIC_REACTIONS_API_URL=https://reactions.intobadminton.com
```

---

## 6. Metrics (unchanged from Q2)

| Goal | Target |
|------|--------|
| Pages per session | 2.5+ |
| 7-day return rate | 15%+ |
| GSC clicks | 4× baseline |
| Helpful vote engagement | GA4 `helpful_reaction` + public counts when API live |
| CWV p75 LCP | <2.5s |
