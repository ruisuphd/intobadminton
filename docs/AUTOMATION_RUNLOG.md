# Automation run log

Cron and cloud-agent runs that sync reviews from the private `blogs/` drop.

## 2026-06-04 — nightly reviews + maturity pass

**Trigger:** scheduled automation (`0 1 * * *`)

### Blog source check

| Check | Result |
| --- | --- |
| Local path `~/…/intobadminton/blogs` | Not mounted in cloud workspace (expected; directory is gitignored) |
| Repo `blogs/` | Absent — `npm run blog:check` exits 0 with skip message |
| `blog-slug-source-map.json` vs `blog-articles.json` | 146 slugs mapped and imported; no drift |
| New translations this run | None (no new markdown available to import) |

**When new reviews land:** copy translated `## English Translation` sections into `blogs/*.md`, map filenames in `scripts/blog-slug-source-map.json`, then run:

```bash
npm run blog:check
npm run blog:import
npm run blog:validate
npm test && npm run build
```

### App maturity changes (this PR)

- Added `scripts/check-new-blog-sources.mjs` and `npm run blog:check` for cron/CI.
- Wired existing `ArticleToc`, `SocialShare`, and `HelpfulReaction` on `/review/[slug]/` articles.
- Reviews index shows live article count.
- Lint cleanup: removed stale eslint-disable directives and unused import in `structured-data.ts`.

### Verification

- `npm run lint` — pass (0 errors)
- `npm test` — 168 tests pass
- `npm run build` — pass; SEO audit OK (643 HTML, 204 sitemap URLs)
