# HelpfulReaction counts worker

Anonymous aggregate counts for the `HelpfulReaction` component. Stores `{ up, down, more }` per `contentId` in Cloudflare KV — no user ids, no cookies.

## Deploy checklist

1. **KV namespace** — `cd workers/reactions && npx wrangler kv namespace create REACTIONS`
2. **Bind id** — paste the namespace id into `wrangler.toml` under `[[kv_namespaces]]`.
3. **Contract tests** — from repo root: `npm test -- workers/reactions/index.test.js src/lib/reactions-contract.test.ts`
4. **Deploy** — `cd workers/reactions && npx wrangler deploy`  
   Or run the **Deploy reactions worker** GitHub Action on `main` after setting `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` repository secrets. The workflow runs contract tests, deploys, then hits `GET /health` on the published worker URL.
5. **Pages secret** — add repository secret **`REACTIONS_API_URL`** with the worker URL (e.g. `https://intobadminton-reactions.<account>.workers.dev`). The deploy workflow prints the URL in its log. The Pages workflow passes it as `NEXT_PUBLIC_REACTIONS_API_URL` at build time.
6. **Smoke** — `REACTIONS_API_URL=https://…workers.dev npm run reactions:smoke` (hits `GET /health`). The **Reactions worker health** workflow re-runs this weekly when the secret is set. Then open a guide with `HelpfulReaction`, vote once, reload; counts should persist. CI covers local vote UX in `e2e/helpful-reaction-smoke.spec.ts` (API-off path when secret unset).

## API

- `GET /health` → `{ "ok": true, "service": "reactions" }`
- `GET ?contentId=guide:racket-balance` → `{ "up": 12, "down": 1, "more": 3 }`
- `POST` `{ "contentId": "guide:racket-balance", "reaction": "up" }` → updated counts

CORS allows browser calls from the static site origin.
