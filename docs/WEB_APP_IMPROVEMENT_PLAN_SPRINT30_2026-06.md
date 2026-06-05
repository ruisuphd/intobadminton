# Web App Improvement Plan — Sprint 30 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-f944`  
**Baseline:** Sprint 29 — contact/research/homepage catalog CTAs, PWA ib-v19 (PR #177, merged).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 30 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | Legal/footer pages still link to shop browse | ✅ Privacy, terms, cookies, security → catalog bands |
| **Running Warehouse** | Policy pages are not dead-ends after consent flows | ✅ Privacy-choices page catalog exit |
| **RTINGS** | Trust/legal URLs in perf CI | ✅ Lighthouse adds `/privacy/`, `/terms/`, `/cookies/` |
| **Wirecutter** | Installed PWA users can read policies offline | ✅ PWA `ib-v20` precaches legal cluster |
| **RacketGuide** | Security disclosures route to product discovery | ✅ Security page catalog CTA |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, 153 first-person reviews.

---

## 2. Top 5 gaps (Sprint 30)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Legal cluster lacks catalog exit** | Privacy/terms/cookies dead-ends after Sprint 29 trust coverage | ✅ Secondary `Browse full catalog` bands |
| 2 | **Security page lacks catalog exit** | Compliance readers cannot browse SKUs | ✅ Security catalog CTA band |
| 3 | **Privacy-choices lacks browse escape** | Consent-only page after CMP interaction | ✅ Catalog + finder band |
| 4 | **PWA missing legal/policy shells** | Installed users lose policies offline | ✅ `ib-v20` precache (5 routes) |
| 5 | **Lighthouse CI gaps on legal URLs** | Perf regressions on compliance pages undetected | ✅ CI adds privacy, terms, cookies |

**Deferred (owner / editorial):** deploy reactions worker + `REACTIONS_API_URL`; fill `crux-template.csv`; original `public/products/` photography; YouTube `sameAs` after channel claim.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Legal catalog CTAs | `src/app/privacy/page.tsx`, `terms/page.tsx`, `cookies/page.tsx`, `security/page.tsx` |
| Privacy-choices catalog band | `src/app/privacy-choices/page.tsx` |
| PWA offline expansion | `public/sw.js` (`ib-v20`), `pwa-precache.test.ts`, `pwa-offline-smoke.spec.ts` |
| Lighthouse CI | `lighthouserc.json` |
| E2E regression | `e2e/hub-shelf-smoke.spec.ts` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 29 deferred list + competitive audit | ✅ |
| 2 | Legal pages use same CTA pattern as contact/FAQ | ✅ |
| 3 | No new components — reuse `btn-primary` / `btn-secondary` bands | ✅ |
| 4 | PWA cache version bumped (`ib-v19` → `ib-v20`) | ✅ |
| 5 | Static export — no new API routes | ✅ |
| 6 | Unit tests: `pwa-precache.test.ts` updated for ib-v20 | ✅ |
| 7 | Lighthouse URLs are indexable (no noindex setup/saved/compare) | ✅ |
| 8 | `npm test` + `npm run build` + postbuild SEO audit | ⏳ CI |
| 9 | E2E: legal cluster catalog CTAs + PWA ib-v20 | ⏳ CI |
| 10 | Master plan doc updated with Sprint 30 entry | ✅ |

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
| Legal/trust → catalog CTR | Measurable in GA4 `select_content` |
