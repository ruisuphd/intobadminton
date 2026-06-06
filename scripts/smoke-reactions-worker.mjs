#!/usr/bin/env node
/**
 * Operator smoke for the HelpfulReaction Cloudflare Worker.
 * Usage: REACTIONS_API_URL=https://…workers.dev npm run reactions:smoke
 */
const base = process.env.REACTIONS_API_URL?.trim();
if (!base) {
  console.error("REACTIONS_API_URL is required (worker origin, no trailing path).");
  process.exit(1);
}

const origin = base.replace(/\/$/, "");
const healthUrl = `${origin}/health`;

const res = await fetch(healthUrl, { method: "GET" });
if (!res.ok) {
  console.error(`Health check failed: GET ${healthUrl} → ${res.status}`);
  process.exit(1);
}

let body;
try {
  body = await res.json();
} catch {
  console.error("Health check returned non-JSON body");
  process.exit(1);
}

if (body?.ok !== true || body?.service !== "reactions") {
  console.error("Unexpected health payload:", body);
  process.exit(1);
}

console.log(`reactions worker ok: ${healthUrl}`);
