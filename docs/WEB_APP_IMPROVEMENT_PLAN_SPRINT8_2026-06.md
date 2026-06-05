# Web App Improvement Plan — Sprint 8 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-b4ca` / PR #142  
**Baseline:** Sprint 7 on `main` (PR #135); PR #142 stack (PDP-lite, budget shoes, 84% map, claims registry).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Gap / response |
|------------|---------------------------|----------------|
| **Tennis Warehouse / retailer finders** | Role-based landing URLs (defensive, power, all-round) | ✅ 17+ `/best/*` pages; **defensive doubles landing (this sprint)** |
| **Wirecutter / RTINGS** | Social proof vote counts | ⏳ HelpfulReaction Workers/KV (env scaffold shipped; deploy + `NEXT_PUBLIC_REACTIONS_API_URL`) |
| **RacketGuide / affiliate roundups** | Long-tail SEO clusters | ✅ Smash, head-light, all-round, budget shoes; **defensive keyword cluster** |
| **Brand PDPs** | First-party product photography + `/product/[id]/` | ✅ PDP-lite on PR #142 stack |
| **YouTube-first reviewers** | Video evidence | ⏳ `VideoObject` gated on video commitment |

**Moat unchanged:** transparent fit score, claims CI, static export, 146+ reviews, postbuild SEO gate, fuzzy site search with review body excerpts.

---

## 2. Top 5 gaps (Sprint 8)

| # | Gap | Impact | Sprint 8 |
|---|-----|--------|----------|
| 1 | **No `/best/defensive-rackets/` landing** | Misses "defensive badminton racket" long-tail vs RacketGuide/TW | ✅ Programmatic best-of page |
| 2 | **Review map below 90%** | Product JSON-LD / finder panel coverage | ✅ Merged PR #142 stack at ~84%+; added `1000z-play` mapping |
| 3 | HelpfulReaction aggregate counts live | Social proof (Wirecutter parity) | ⏳ Worker deploy + env (infra) |
| 4 | Original product photography | AdSense / visual maturity | ⏳ Editorial pipeline |
| 5 | Video / `VideoObject` schema | E-E-A-T visual evidence | ⏳ Gated on video commitment |

---

## 3. Execution summary

1. **`/best/defensive-rackets/`** — six picks for defensive doubles / front-court recovery.
2. **`site-search.ts`** — index entry for defensive landing.
3. **`related-content.ts`** — `defensive-rackets` cluster + path mappings.
4. **`/best/` hub** — link to defensive guide.
5. **`lighthouserc.json`** — Lighthouse URL for new page (alongside budget shoes, PDP sample).
6. **`e2e/best-smoke.spec.ts`** — smoke for defensive page + search discovery.

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 7 deferred list + competitive audit | ✅ |
| 2 | Defensive page distinct SEO intent from head-light (role vs geometry) | ✅ |
| 3 | All `productId` values exist in `products.json` | ✅ |
| 4 | Static export safe (no API routes) | ✅ |
| 5 | Sitemap auto-discovers new `/best/defensive-rackets/` route | ✅ |
| 6 | Map entries only for catalogue-backed products | ✅ |
| 7 | Related reading + search index wired | ✅ |
| 8 | `npm test` | ✅ |
| 9 | `npm run build` + postbuild SEO audit | ✅ |
| 10 | Lighthouse CI includes new URL | ✅ |

---

## 5. Verification

```bash
npm test
npm run build
npm run lint
node scripts/audit-review-product-map.mjs
```

---

## 6. Deferred (Sprint 9+)

- Deploy HelpfulReaction Workers/KV and set `NEXT_PUBLIC_REACTIONS_API_URL`
- GSC/CrUX baseline CSV in `docs/baselines/`
- Original photos on top commercial URLs
- Expand map toward 90%+ (comparison slugs need editorial judgment)
- YouTube `sameAs` on author entity (after channel claim)
