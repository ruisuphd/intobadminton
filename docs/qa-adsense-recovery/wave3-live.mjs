/**
 * Wave 3 HTML inventory against a live origin (default: production).
 *
 *   node docs/qa-adsense-recovery/wave3-live.mjs
 *   QA_BASE=https://intobadminton.com node docs/qa-adsense-recovery/wave3-live.mjs
 */
const ORIGIN = (process.env.QA_BASE || "https://intobadminton.com").replace(
  /\/$/,
  ""
);

const fail = [];
const notes = [];

async function get(path) {
  const url = path.startsWith("http") ? path : `${ORIGIN}${path}`;
  const res = await fetch(url, { redirect: "manual" });
  const body = await res.text();
  return { url, status: res.status, location: res.headers.get("location"), body };
}

function robotsNoindex(html) {
  return /name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html) ||
    /content=["'][^"']*noindex[^"']*["'][^>]*name=["']robots["']/i.test(html);
}

const sitemap = await get("/sitemap.xml");
if (sitemap.status !== 200) fail.push(`sitemap.xml HTTP ${sitemap.status}`);
if (/\/product\//.test(sitemap.body)) fail.push("sitemap contains /product/");
else notes.push("sitemap: no /product/");

for (const frag of [
  `${ORIGIN}/</loc>`,
  "/guides/string-tension/",
  "/best/rackets-under-150/",
  "/best/rackets-under-200/",
  "/review/how-to-choose-a-badminton-racket/",
  "/review/yonex-nanoflare-1000z-review/",
]) {
  if (!sitemap.body.includes(frag)) fail.push(`sitemap missing ${frag}`);
}
for (const frag of [
  "/review/kumpoo-beimo-racket-review/",
  "/review/kumpoo-fourth-major-badminton-brand-profile/",
]) {
  if (sitemap.body.includes(frag)) fail.push(`sitemap unexpectedly contains ${frag}`);
}

const adsTxt = await get("/ads.txt");
if (adsTxt.status !== 200) fail.push(`ads.txt HTTP ${adsTxt.status}`);
else notes.push("ads.txt 200");

const home = await get("/");
if (!/google-adsense-account/i.test(home.body)) {
  fail.push("index missing google-adsense-account (Pages build should set NEXT_PUBLIC_ADSENSE_CLIENT)");
} else notes.push("index has google-adsense-account");
if (/209 review/i.test(home.body) || /Read 209/i.test(home.body)) {
  fail.push("homepage copy leak: 209 reviews");
} else notes.push("homepage: no 209-review copy");
if (/\b[12] min\b/.test(home.body)) fail.push("homepage featured shows 1 or 2 min");
else notes.push("homepage: no 1–2 min featured cards");

const mustNoindex = [
  "/product/yy-nanoflare-1000z/",
  "/product/yy-grpht-thrttl/",
  "/review/kumpoo-beimo-racket-review/",
  "/setup/",
];
const mustIndex = [
  "/",
  "/guides/string-tension/",
  "/best/rackets-under-150/",
  "/review/yonex-nanoflare-1000z-review/",
  "/review/how-to-choose-a-badminton-racket/",
];

for (const path of mustNoindex) {
  const page = await get(path);
  if (page.status !== 200) fail.push(`${path} HTTP ${page.status}`);
  if (/pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js/.test(page.body)) {
    fail.push(`${path} loads adsbygoogle.js`);
  }
  if (!robotsNoindex(page.body)) fail.push(`${path} missing noindex`);
}
for (const path of mustIndex) {
  const page = await get(path);
  if (page.status !== 200) fail.push(`${path} HTTP ${page.status}`);
  if (/pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js/.test(page.body)) {
    fail.push(`${path} loads adsbygoogle.js (mode should stay disabled)`);
  }
  if (robotsNoindex(page.body)) fail.push(`${path} unexpectedly noindex`);
}

const redirects = [
  [
    "/review/kawasaki-star-cross-second-perspective-review/",
    "/review/kawasaki-star-cross-racket-review/",
  ],
  [
    "/review/victor-drivex-12-vs-drivex-10-and-88d-pro-2024/",
    "/review/victor-drivex-12-vs-astrox-88d-pro/",
  ],
  [
    "/review/yonex-astrox-99-pro-gen-1-review/",
    "/review/yonex-astrox-99-pro-3-deep-dive/",
  ],
];
for (const [from, to] of redirects) {
  const page = await get(from);
  const loc = page.location || "";
  const html = page.body;
  const ok =
    (page.status >= 300 && page.status < 400 && loc.includes(to)) ||
    html.includes(to);
  if (!ok) fail.push(`redirect ${from} -> ${to} (HTTP ${page.status} loc=${loc})`);
  else notes.push(`redirect ${from} -> ${to}`);
}

console.log(`origin ${ORIGIN}`);
console.log("NOTES:");
for (const n of notes) console.log("  -", n);
console.log(fail.length ? "FAILURES:" : "FAILURES: none");
for (const f of fail) console.log("  -", f);
process.exit(fail.length ? 1 : 0);
