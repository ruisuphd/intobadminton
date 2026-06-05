# Web App Improvement Plan — Sprint 7 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-10b8` (PR #140)  
**Baseline:** Sprint 6–7 work already on `main` (#130 `/data/`, #135 search excerpts, #138 PDP-lite, #141 balanced rackets).

---

## 1. Top 5 gaps (this PR — incremental)

| # | Gap | Impact | PR #140 |
|---|-----|--------|---------|
| 1 | **Incomplete stringing SEO cluster** | Topical authority | ✅ `/guides/string-feel-vs-durability/` |
| 2 | **No domain freshness lane** | Crawler + return-visit signal | ✅ `/updates/` |
| 3 | Search / PDP / claims | — | ✅ Already on `main` |
| 4 | Original product photography | AdSense | ⏳ Editorial pipeline |
| 5 | HelpfulReaction aggregate counts | Social proof | ⏳ Workers/KV |

---

## 2. Execution summary

1. **`/guides/string-feel-vs-durability/`** — gauge vs durability guide with HowTo schema; hub links from string-tension guide.
2. **`/updates/`** — `listEditorialUpdates()` freshness feed with CollectionPage JSON-LD.
3. Registry — `editorial-meta`, `site-search`, guides index, footer, Lighthouse URLs.

---

## 3. Ten-pass verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Q2 §3.3 stringing cluster + `/updates/` | ✅ |
| 2 | String guide distinct from tension guide | ✅ |
| 3 | `/updates/` uses editorial dates, not build time | ✅ |
| 4 | `editorial-meta` registered | ✅ |
| 5 | Static export safe | ✅ |
| 6 | Does not duplicate `/data/` (on main via #130) | ✅ |
| 7 | `npm test` | ✅ 255 passed |
| 8 | `npm run build` + postbuild SEO audit | ✅ |
| 9 | Lighthouse URLs include new routes | ✅ |
| 10 | Footer + guides index wired | ✅ |

---

## 4. Verification

```bash
npm test
npm run build
npm run lint
```
