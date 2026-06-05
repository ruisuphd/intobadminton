# Web App Improvement Plan — Sprint 8 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-9a0c`  
**Baseline:** Sprint 7 on `main` (PR #135 — review excerpt search, fuzzy e2e).

---

## 1. Top gap closed

| Gap | Response |
|-----|----------|
| No public claims transparency (Q2 §3.5 #28) | ✅ `/data/` registry page |

---

## 2. Execution

1. **`/data/`** — `content/claims.json` surfaced with tiers, quotes, freshness, `usedOn` links.
2. **Registry** — `editorial-meta`, `site-search`, methodology, footer, Lighthouse URL.

---

## 3. Verification

```bash
npm test   # 244 passed
npm run build   # SEO audit pass
```
