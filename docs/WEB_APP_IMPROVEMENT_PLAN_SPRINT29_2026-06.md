# Web App Improvement Plan — Sprint 29 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-c3b6`  
**Baseline:** Sprint 28 — trust cluster catalog CTAs, profile weight class, PWA ib-v18 (PR #176, merged).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 29 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | Homepage and support pages exit to filtered shop browse | ✅ Homepage + contact secondary `Browse full catalog` bands |
| **Running Warehouse** | Research/roadmap pages link to product index after education | ✅ Research page catalog CTA alongside finder |
| **RTINGS** | Author and support URLs in perf CI | ✅ Lighthouse adds `/contact/`, `/research/`, `/authors/rui-su/` |
| **Wirecutter** | Price-band buying guides available offline for installed users | ✅ PWA `ib-v19` precaches price-band + shoes best-of shells |
| **RacketGuide** | Contact/support not dead-ends after quiz funnel | ✅ Contact + research catalog exits; homepage browse escape |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, 153 first-person reviews.

---

## 2. Top 5 gaps (Sprint 29)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Contact page lacks catalog exit** | Support/editorial dead-end after Sprint 28 trust coverage | ✅ Secondary `Browse full catalog` band |
| 2 | **Research page lacks catalog exit** | Market-research readers only routed to quiz | ✅ Secondary catalog CTA in roadmap section |
| 3 | **Homepage final CTA is quiz-only** | Retail-style browse escape missing on `/` | ✅ Secondary catalog button in closing band |
| 4 | **PWA missing contact/research + price-band best-of** | Installed users lose support + budget browse offline | ✅ `ib-v19` precache expansion (11 routes) |
| 5 | **Lighthouse CI gaps on contact/research/author** | Perf regressions on support + E-E-A-T URLs undetected | ✅ CI adds 3 indexable routes; E2E for new CTAs |

**Deferred (owner / editorial):** deploy reactions worker + `REACTIONS_API_URL`; fill `crux-template.csv`; original `public/products/` photography; YouTube `sameAs` after channel claim.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Contact catalog CTA | `src/app/contact/page.tsx` |
| Research catalog CTA | `src/components/MarketResearchPage.tsx` |
| Homepage catalog band | `src/components/LocalizedHome.tsx` |
| PWA offline expansion | `public/sw.js` (`ib-v19`), `pwa-precache.test.ts`, `pwa-offline-smoke.spec.ts` |
| Lighthouse CI | `lighthouserc.json` |
| E2E regression | `e2e/hub-shelf-smoke.spec.ts` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 28 deferred list + competitive audit | ✅ |
| 2 | Contact/research/homepage use same secondary CTA pattern as FAQ/about | ✅ |
| 3 | No new components — reuse `btn-primary` / `btn-secondary` bands | ✅ |
| 4 | PWA cache version bumped (`ib-v18` → `ib-v19`) | ✅ |
| 5 | Static export — no new API routes | ✅ |
| 6 | Unit tests: `pwa-precache.test.ts` updated for ib-v19 | ✅ |
| 7 | Lighthouse URLs are indexable (no noindex saved/compare) | ✅ |
| 8 | `npm test` + `npm run build` + postbuild SEO audit | ✅ |
| 9 | E2E: contact/research/homepage catalog CTAs + PWA ib-v19 | ✅ |
| 10 | Master plan doc updated with Sprint 29 entry | ✅ |

---

## 5. Verification

```bash
npm test
npm run build
npx playwright test e2e/hub-shelf-smoke.spec.ts e2e/pwa-offline-smoke.spec.ts
```

---

## 6. Metrics (unchanged)

| Goal | Target |
|------|--------|
| Review→product map (mappable slugs) | 100% (140/140) |
| Pages per session | 2.5+ |
| Support/research → catalog CTR | Measurable in GA4 `select_content` |
