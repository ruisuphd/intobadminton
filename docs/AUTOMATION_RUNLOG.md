# Automation run log

Cron and cloud-agent runs that sync reviews from the private `blogs/` drop.

## 2026-06-04 — PR #90 `ready_for_review` re-trigger (branch `cursor/new-chinese-reviews-translation-8322`)

**Trigger:** GitHub pull request #90 (`ready_for_review`) — documents the blocked translation run for PR #86 (`ready_for_review`). No new `blogs/` drop was mounted in the cloud workspace.

### Blog source check

| Check | Result |
| --- | --- |
| Path `/Users/ruisu/Desktop/Files/Singapore Company/intobadminton/blogs` | **Not found** (`npm run blog:sync` exit 1) |
| Repo `blogs/` | **Absent** — `CURSOR_AGENT=1 npm run blog:check` exit 1 |
| Chinese filenames pending `## English Translation` | **Unknown** (no drop to scan) |
| `blog-slug-source-map.json` vs imported articles | **146 / 146** — no drift on `main` |
| New translations this run | **None** |

### Verification (no review content changes)

- `npm run blog:validate` — 20/20 passes, 0 issues
- `npm test` — 177 passed
- `npm run build` + postbuild SEO audit — pass (646 HTML, 207 sitemap URLs)

### Merge status

Translation, rename, import, and web-app review updates **not performed** (no `blogs/` drop). **Do not merge** until the private drop is synced and translated content is imported. Re-run after:

```bash
npm run blog:sync -- "/Users/ruisu/Desktop/Files/Singapore Company/intobadminton/blogs"
CURSOR_AGENT=1 npm run blog:check
# translate (Chinese above, ## English Translation below), rename to English, then:
npm run blog:import && npm run blog:validate && npm test && npm run build
```

---

## 2026-06-04 — PR #86 `ready_for_review` (branch `cursor/new-chinese-reviews-translation-c252`)

**Trigger:** GitHub pull request #86 (`ready_for_review`) — Phase B SEO guides PR **already merged** to `main` as `1e416cd` before this translation run completed. No new `blogs/` drop was mounted in the cloud workspace.

### Blog source check

| Check | Result |
| --- | --- |
| Path `/Users/ruisu/Desktop/Files/Singapore Company/intobadminton/blogs` | **Not found** (`npm run blog:sync` exit 1) |
| Repo `blogs/` | **Absent** — `CURSOR_AGENT=1 npm run blog:check` exit 1 |
| Chinese filenames pending `## English Translation` | **Unknown** (no drop to scan) |
| `blog-slug-source-map.json` vs imported articles | **146 / 146** — no drift on `main` |
| New translations this run | **None** |

### Verification (no review content changes)

- `npm run blog:validate` — 20/20 passes, 0 issues
- `npm test` — 177 passed
- `npm run build` + postbuild SEO audit — pass (646 HTML, 207 sitemap URLs)

### Merge status

Translation, rename, import, and web-app review updates **not performed** (no `blogs/` drop). Superseded by PR #90 runlog on branch `cursor/new-chinese-reviews-translation-8322`.

---

## 2026-06-04 — PR #84 `ready_for_review` (branch `cursor/new-chinese-reviews-translation-dbb4`)

**Trigger:** GitHub pull request #84 (`ready_for_review`) — Chinese review translation workflow (cron template). PR #84 itself is web-app Phase B (`cursor/web-app-improvement-plan-a493`); translation remains blocked without the private `blogs/` drop.

### Blog source check

| Check | Result |
| --- | --- |
| Path `/Users/ruisu/Desktop/Files/Singapore Company/intobadminton/blogs` | **Not found** (`npm run blog:sync` exit 1) |
| Repo `blogs/` | **Absent** — `CURSOR_AGENT=1 npm run blog:check` exit 1 |
| Chinese filenames pending `## English Translation` | **Unknown** (no drop to scan) |
| `blog-slug-source-map.json` mapped sources | **126** |
| `blog-articles.json` imported articles | **146** — no import drift on `main` |
| New translations this run | **None** |

### Verification (no review content changes)

- `npm run blog:validate` — 20/20 passes, 0 issues
- `npm test` — 177 passed
- `npm run build` + postbuild SEO audit — pass (646 HTML, 207 sitemap URLs)

### Merge status

Translation, rename, import, and web-app review updates **not performed** (no `blogs/` drop). Merged to `main` as runlog documentation (#89).

---

## 2026-06-04 — PR #83 `ready_for_review` (branch `cursor/new-chinese-reviews-translation-f3aa`)

**Trigger:** GitHub pull request #83 (`ready_for_review`) — Sprint 2 web-app PR **already merged** to `main` as `15eba41` before this run completed.

### Blog source check

| Check | Result |
| --- | --- |
| Path `/Users/ruisu/Desktop/Files/Singapore Company/intobadminton/blogs` | **Not found** (`npm run blog:sync` exit 1) |
| Repo `blogs/` | **Absent** — `CURSOR_AGENT=1 npm run blog:check` exit 1 |
| Chinese filenames pending `## English Translation` | **Unknown** (no drop to scan) |
| `blog-slug-source-map.json` vs imported articles | **146 / 146** — no drift on `main` |
| New translations this run | **None** |

### Verification (no review content changes)

- `npm run blog:validate` — 20/20 passes, 0 issues
- `npm test` — 176 passed
- `npm run build` + postbuild SEO audit — pass (644 HTML, 205 sitemap URLs)

### Merge status

Translation, rename, import, and web-app review updates **not performed** (no `blogs/` drop). Merged to `main` as runlog documentation (#87).

---

## 2026-06-04 — PR #80 `ready_for_review` (branch `cursor/new-chinese-reviews-translation-d661`)

**Trigger:** GitHub pull request #80 (`ready_for_review`) — web-app maturity PR **already merged** to `main` as `efbcab2` before this run started.

### Blog source check

| Check | Result |
| --- | --- |
| Path `/Users/ruisu/Desktop/Files/Singapore Company/intobadminton/blogs` | **Not found** (`npm run blog:sync` exit 1) |
| Repo `blogs/` | **Absent** — `CURSOR_AGENT=1 npm run blog:check` exit 1 |
| Chinese filenames pending `## English Translation` | **Unknown** (no drop to scan) |
| `blog-slug-source-map.json` vs imported articles | **146 / 146** — no drift on `main` |
| New translations this run | **None** |

### Verification (no review content changes)

- `npm run blog:validate` — 20/20 passes, 0 issues
- `npm test` — 173 passed
- `npm run build` + postbuild SEO audit — pass (644 HTML, 205 sitemap URLs)

### Merge status

Translation, rename, import, and web-app review updates **not performed** (no `blogs/` drop). Merge this PR only to land run-log documentation; re-run after syncing the private drop:

```bash
npm run blog:sync -- "/Users/ruisu/Desktop/Files/Singapore Company/intobadminton/blogs"
# or: BLOGS_DIR=/path/to/mounted/blogs npm run blog:check
```

---

## 2026-06-04 — PR #78 `ready_for_review` re-trigger (branch `cursor/new-chinese-reviews-translation-66ff`)

**Trigger:** GitHub pull request #78 (`ready_for_review`) — runlog PR **already merged** to `main` as `65e6153`; PR #79 landed overlapping runlog while this run was in flight.

### Blog source check

| Check | Result |
| --- | --- |
| Path `/Users/ruisu/Desktop/Files/Singapore Company/intobadminton/blogs` | **Not found** (`npm run blog:sync` exit 1) |
| Repo `blogs/` | **Absent** — `CURSOR_AGENT=1 npm run blog:check` exit 1 |
| Chinese filenames pending `## English Translation` | **Unknown** (no drop to scan) |
| `blog-articles.json` vs slug list | **146 / 146** — no drift on `main` |
| New translations this run | **None** |

### Verification (no content changes)

- `npm test` — 173 passed
- `npm run blog:validate` — 20/20 passes, 0 issues
- `npm run build` + postbuild SEO audit — pass (644 HTML, 205 sitemap URLs)

### Merge status

No translation PR merged (no `blogs/` drop). PR #81 closed as duplicate of PR #79 runlog on `main`. Re-run after `npm run blog:sync` with the Desktop path or `BLOGS_DIR`.

---

## 2026-06-04 — PR #79 `ready_for_review` (branch `cursor/new-chinese-reviews-translation-c075`)

**Trigger:** GitHub pull request #79 (`ready_for_review`) — documents the same blocked translation run as PR #77; no new source drop in cloud VM.

### Blog source check

| Check | Result |
| --- | --- |
| Path `/Users/ruisu/Desktop/Files/Singapore Company/intobadminton/blogs` | **Not found** (`npm run blog:sync` exit 1) |
| Repo `blogs/` | **Absent** — `CURSOR_AGENT=1 npm run blog:check` exit 1 |
| Chinese filenames pending `## English Translation` | **Unknown** (no drop to scan) |
| `blog-slug-source-map.json` vs imported articles | **146 / 146** — no drift on `main` |
| New translations this run | **None** |

### Verification (no review content changes)

- `npm run blog:validate` — 20/20 passes, 0 issues
- `npm test` — 173 passed
- `npm run build` + postbuild SEO audit — pass (644 HTML, 205 sitemap URLs)

### Merge status

Translation, rename, import, and web-app review updates **not performed** (no `blogs/` drop). Merged to `main` as `e3273c5`. Re-run after `npm run blog:sync` with the Desktop path or a mounted `BLOGS_DIR`.

---

## 2026-06-04 — PR #77 `ready_for_review` (branch `cursor/new-chinese-reviews-translation-c075`)

**Trigger:** GitHub pull request #77 (`ready_for_review`) — web-app maturity PR **already merged** to `main` as `c9bf4ef` before this run completed.

### Blog source check

| Check | Result |
| --- | --- |
| Path `/Users/ruisu/Desktop/Files/Singapore Company/intobadminton/blogs` | **Not found** (`npm run blog:sync` exit 1) |
| Repo `blogs/` | **Absent** — `CURSOR_AGENT=1 npm run blog:check` exit 1 |
| Chinese filenames pending `## English Translation` | **Unknown** (no drop to scan) |
| `blog-slug-source-map.json` vs `blog-articles.json` | **146 / 146** — no drift on `main` |
| New translations this run | **None** |

### Verification (no review content changes)

- `npm run blog:validate` — 20/20 passes, 0 issues
- `npm test` — 173 passed
- `npm run build` + postbuild SEO audit — pass (644 HTML, 205 sitemap URLs)

### Merge status

No Chinese source files to translate, rename, or import. Re-run after syncing `blogs/` into the workspace (see unblock steps in the cron entry below).

---

## 2026-06-04 — PR #76 `ready_for_review` re-trigger (branch `cursor/new-chinese-reviews-translation-29b3`)

**Trigger:** GitHub pull request #76 (`ready_for_review`) — documentation PR **already merged** to `main` as `d267f61`.

### Blog source check

| Check | Result |
| --- | --- |
| Path `/Users/ruisu/Desktop/Files/Singapore Company/intobadminton/blogs` | **Not found** (`npm run blog:sync` exit 1) |
| Repo `blogs/` | **Absent** — `CURSOR_AGENT=1 npm run blog:check` exit 1 |
| Chinese filenames pending `## English Translation` | **Unknown** (no drop to scan) |
| `blog-articles.json` vs slug list | **146 / 146** — no drift on `main` |
| New translations this run | **None** |

### Verification (no content changes)

- `npm test` — 173 passed
- `npm run blog:validate` — 20/20 passes, 0 issues

### Merge status

PR #76 already merged. No translation PR opened (no `blogs/` drop). Re-run after `npm run blog:sync` with the Desktop path or `BLOGS_DIR` pointing at a mounted copy.

---

## 2026-06-04 — PR #75 `ready_for_review` (branch `cursor/new-chinese-reviews-translation-6a07`)

**Trigger:** GitHub pull request #75 (`ready_for_review`) — tooling PR already **merged** to `main` as `b206650`.

### Blog source check

| Check | Result |
| --- | --- |
| Path `/Users/ruisu/Desktop/Files/Singapore Company/intobadminton/blogs` | **Not found** in cloud VM (`npm run blog:sync` exit 1) |
| Repo `blogs/` | **Absent** — `CURSOR_AGENT=1 npm run blog:check` exit 1 |
| Chinese filenames pending `## English Translation` | **Unknown** (no drop to scan) |
| `blog-articles.json` vs slug list | **146 / 146** — no drift on `main` |
| New translations this run | **None** |

### Verification (no content changes)

- `npm test` — 168 passed
- `npm run blog:validate` — 20/20 passes, 0 issues

### Merge status

PR #75 merged with sync/check tooling only. No follow-up PR opened (nothing to import). Re-run after syncing `blogs/` into the workspace.

---

## 2026-06-04 — Chinese reviews translation cron (`0 22 * * *`)

**Trigger:** scheduled automation (`0 22 * * *`) — branch `cursor/new-chinese-reviews-translation-5143`

### Blog source check

| Check | Result |
| --- | --- |
| Local path `~/Desktop/Files/Singapore Company/intobadminton/blogs` | Not mounted in cloud workspace |
| Repo `blogs/` | Absent — translation/import blocked |
| `blog-slug-source-map.json` vs `blog-articles.json` | 146 slugs mapped and imported on `main`; no drift |
| New Chinese reviews translated this run | **None** (no markdown drop available) |

**Unblock for next cron run:** sync the private drop before the agent starts:

```bash
npm run blog:sync -- "/Users/ruisu/Desktop/Files/Singapore Company/intobadminton/blogs"
npm run blog:check   # fails in Cursor Agent if Chinese files lack ## English Translation
```

Then translate (Chinese above, English below), rename files to English, update `scripts/blog-slug-source-map.json`, and run `blog:import` → `blog:validate` → tests → build.

### Repo changes this run

- `scripts/blog-path.mjs`, `scripts/sync-blogs-drop.mjs`, `npm run blog:sync`
- `blog:check` reports Chinese filenames missing `## English Translation`; fails under `CURSOR_AGENT=1` when `blogs/` is absent

---

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
