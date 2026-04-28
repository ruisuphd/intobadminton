# Deploy

`next.config.ts` uses `output: "export"`. The static bundle is in `out/` after `npm run build`.

## GitHub Pages (project site)

If the site is served at `https://<user>.github.io/<repo>/`, set at build time:

```bash
NEXT_PUBLIC_BASE_PATH=/intobadminton npm run build
```

`assetPrefix` / `basePath` follow `NEXT_PUBLIC_BASE_PATH`. Push `out/` to `gh-pages` (e.g. [peaceiris/actions-gh-pages](https://github.com/peaceiris/actions-gh-pages)) or use a workflow that runs the command above with your repo name.

**Note:** `NEXT_PUBLIC_SITE_URL` should match the public origin for `metadata` in `src/app/layout.tsx`.

## GitHub Pages (custom domain, v1 recommendation)

For the AdSense-first static launch, use a custom domain such as
`intobadminton.com` instead of the default GitHub subdomain.

1. Keep `public/CNAME` set to the exact custom domain.
2. Set `NEXT_PUBLIC_SITE_URL=https://intobadminton.com` during build.
3. Leave `NEXT_PUBLIC_BASE_PATH` empty for the apex/custom domain.
4. Publish the generated `out/` directory to GitHub Pages.
5. Verify `/ads.txt`, `/sitemap.xml`, `/robots.txt`, `/en/`, and `/zh/`.

`public/ads.txt` intentionally contains a placeholder comment. Replace it with
the exact AdSense line after the AdSense account provides the publisher ID.

## Firebase Hosting

1. `firebase init hosting` in this repo, point to `out` as the public directory.
2. `NEXT_PUBLIC_BASE_PATH` empty for apex or custom domain.
3. If you add Cloud Functions for APIs later, move off pure static or split the app—see the main plan (§2.4).

## Backend recommendation

For the growth phase, prefer Firebase / Google Cloud rather than GitHub Pages alone. See [BACKEND_DECISION.md](./BACKEND_DECISION.md).

## Company billing

Use a **company** GCP / Firebase project for production; set **billing alerts** on Blaze.

## Security headers

Configure equivalent headers in Firebase Hosting, Cloudflare, or your host:

- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- `Content-Security-Policy` allowing your own origin plus Google domains required for GA4/AdSense only when those features are enabled.

Because AdSense injects resources dynamically, test CSP in report-only mode before enforcing.

## Compliance launch

See [COMPLIANCE.md](./COMPLIANCE.md), [DATA_INVENTORY.md](./DATA_INVENTORY.md), and [LAUNCH_CHECKLIST.md](./LAUNCH_CHECKLIST.md).
