# Deploy

`next.config.ts` uses `output: "export"`. The static bundle is in `out/` after `npm run build`.

## GitHub Pages (project site)

If the site is served at `https://<user>.github.io/<repo>/`, set at build time:

```bash
NEXT_PUBLIC_BASE_PATH=/intobadminton npm run build
```

`assetPrefix` / `basePath` follow `NEXT_PUBLIC_BASE_PATH`. Push `out/` to `gh-pages` (e.g. [peaceiris/actions-gh-pages](https://github.com/peaceiris/actions-gh-pages)) or use a workflow that runs the command above with your repo name.

**Note:** `NEXT_PUBLIC_SITE_URL` should match the public origin for `metadata` in `src/app/layout.tsx`.

## Firebase Hosting

1. `firebase init hosting` in this repo, point to `out` as the public directory.
2. `NEXT_PUBLIC_BASE_PATH` empty for apex or custom domain.
3. If you add Cloud Functions for APIs later, move off pure static or split the app—see the main plan (§2.4).

## Company billing

Use a **company** GCP / Firebase project for production; set **billing alerts** on Blaze.
