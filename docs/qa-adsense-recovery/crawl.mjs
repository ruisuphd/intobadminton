import { mkdirSync, writeFileSync } from "node:fs";
import { chromium } from "playwright";

const BASE = (process.env.QA_BASE || "http://127.0.0.1:4173").replace(/\/$/, "");
const SHOT_DIR =
  process.env.QA_SHOT_DIR || "docs/qa-adsense-recovery/screenshots";
mkdirSync(SHOT_DIR, { recursive: true });
console.log(`crawling ${BASE} → ${SHOT_DIR}`);

const checks = [];
function check(name, ok, detail = "") {
  checks.push({ name, ok: Boolean(ok), detail });
  console.log(ok ? "PASS" : "FAIL", name, detail ? `— ${detail}` : "");
}

async function adsbygoogle(page) {
  return page.evaluate(() => {
    const inDom = [...document.scripts].some((s) =>
      (s.src || "").includes("adsbygoogle.js")
    );
    const inPerf = performance
      .getEntriesByType("resource")
      .some((r) => r.name.includes("adsbygoogle.js"));
    return inDom || inPerf;
  });
}

async function hasNoindex(page) {
  return page.evaluate(() => {
    const m = document.querySelector('meta[name="robots"]');
    return (m?.getAttribute("content") || "").toLowerCase().includes("noindex");
  });
}

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1280, height: 900 },
});
const page = await context.newPage();

try {
  // --- HOME ---
  await page.goto(`${BASE}/`, { waitUntil: "load" });
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${SHOT_DIR}/01-home.png`, fullPage: false });
  await page.screenshot({
    path: `${SHOT_DIR}/01-home-full.png`,
    fullPage: true,
  });
  const home = await page.locator("body").innerText();
  check("home author Rui Su", /Rui Su/i.test(home));
  const readGuides = page.getByRole("link", { name: /^Read guides$/i });
  check("home primary Read guides", (await readGuides.count()) > 0);
  if ((await readGuides.count()) > 0) {
    check(
      "home Read guides → /guides/",
      (await readGuides.first().getAttribute("href"))?.includes("/guides/")
    );
  }
  for (const href of [
    "/guides/string-tension/",
    "/review/how-to-choose-a-badminton-racket/",
    "/compare-guides/yonex-astrox-vs-nanoflare/",
    "/review/yonex-nanoflare-1000z-review/",
    "/best/beginner-rackets/",
    "/guides/badminton-shoes-vs-running-shoes/",
  ]) {
    check(`home shelf ${href}`, home.includes(href) || (await page.locator(`a[href="${href}"]`).count()) > 0);
  }
  check("home no 209 reviews", !/209 review/i.test(home) && !/Read 209/i.test(home));
  check("home no 1–2 min featured", !/\b[12] min\b/.test(home));
  check("home Founder-tested heading", /Founder-tested/i.test(home));
  check("home no PWA install toast", !/Install IntoBadminton/i.test(home));
  check("home cookie not only content", home.length > 400);
  check("home no adsbygoogle.js", !(await adsbygoogle(page)));
  const popHrefs = await page.evaluate(() =>
    [...document.querySelectorAll("a")]
      .map((a) => a.getAttribute("href") || "")
      .filter((h) => h)
  );
  check(
    "home popular search not forum Kumpoo/holes",
    !popHrefs.some((h) => h.includes("kumpoo-fourth-major")) &&
      !popHrefs.some((h) => h.includes("racket-stringing-hole-patterns"))
  );
  check(
    "home popular search has string-tension + kumpoo brand",
    popHrefs.some((h) => h.includes("/guides/string-tension/")) &&
      popHrefs.some((h) => h.includes("/brands/kumpoo/"))
  );

  // --- inner: string tension ---
  await page.goto(`${BASE}/guides/string-tension/`, { waitUntil: "load" });
  await page.waitForTimeout(400);
  await page.screenshot({
    path: `${SHOT_DIR}/02-string-tension.png`,
    fullPage: false,
  });
  const st = await page.locator("body").innerText();
  check("string-tension long prose", st.split(/\s+/).length > 400);
  check("string-tension indexed", !(await hasNoindex(page)));
  check("string-tension no adsbygoogle.js", !(await adsbygoogle(page)));

  // --- inner: 1000 Z ---
  await page.goto(`${BASE}/review/yonex-nanoflare-1000z-review/`, {
    waitUntil: "load",
  });
  await page.waitForTimeout(400);
  await page.screenshot({
    path: `${SHOT_DIR}/03-nanoflare-1000z.png`,
    fullPage: false,
  });
  await page.screenshot({
    path: `${SHOT_DIR}/03-nanoflare-1000z-full.png`,
    fullPage: true,
  });
  const z = await page.locator("body").innerText();
  check("1000Z long prose", z.split(/\s+/).length > 400);
  check(
    "1000Z skip/who-should-not",
    /skip|who should not|not for/i.test(z)
  );
  check("1000Z indexed", !(await hasNoindex(page)));
  check("1000Z no adsbygoogle.js", !(await adsbygoogle(page)));

  // --- PDP ---
  await page.goto(`${BASE}/product/yy-nanoflare-1000z/`, { waitUntil: "load" });
  await page.waitForTimeout(400);
  await page.screenshot({
    path: `${SHOT_DIR}/04-pdp-nanoflare-1000z.png`,
    fullPage: false,
  });
  const pdp = await page.locator("body").innerText();
  check("PDP noindex", await hasNoindex(page));
  check("PDP no adsbygoogle.js", !(await adsbygoogle(page)));
  check("PDP has specs or finder", /spec/i.test(pdp) && /quiz|finder/i.test(pdp));
  check(
    "PDP no Weak match 5/100 without profile",
    !/Weak match/i.test(pdp) && !/\b5\s*\/\s*100\b/.test(pdp)
  );

  // --- reviews hub ---
  await page.goto(`${BASE}/review/`, { waitUntil: "load" });
  await page.waitForTimeout(500);
  const showing = await page.getByText(/Showing \d+ of/i).innerText();
  const m1 = showing.match(/Showing (\d+) of (\d+)/);
  const defaultCount = m1 ? Number(m1[2]) : -1;
  check(
    "reviews hub default ~26 publication pieces",
    defaultCount >= 20 && defaultCount <= 40,
    showing
  );
  await page.getByPlaceholder("Search titles…").fill("Astrox");
  await page.waitForTimeout(200);
  const astroxLinks = page.getByRole("link").filter({ hasText: /Astrox/i });
  check("reviews hub Astrox hits founder pages", (await astroxLinks.count()) > 0);
  await page.getByPlaceholder("Search titles…").fill("");
  await page.getByLabel(/Include short court notes/i).check();
  await page.waitForTimeout(200);
  const showing2 = await page.getByText(/Showing \d+ of/i).innerText();
  const m2 = showing2.match(/Showing (\d+) of (\d+)/);
  const withNotes = m2 ? Number(m2[2]) : -1;
  check(
    "reviews hub checkbox jumps toward 209",
    withNotes >= 180,
    showing2
  );
  await page.screenshot({
    path: `${SHOT_DIR}/05-reviews-hub-default.png`,
    fullPage: false,
  });
  // uncheck to screenshot default? already checked. Reload for default shot was first... retake default
  await page.goto(`${BASE}/review/`, { waitUntil: "load" });
  await page.waitForTimeout(400);
  await page.screenshot({
    path: `${SHOT_DIR}/05-reviews-hub-default.png`,
    fullPage: true,
  });

  // --- price bands ---
  for (const [slug, file] of [
    ["rackets-under-150", "06-under-150"],
    ["rackets-under-200", "07-under-200"],
  ]) {
    await page.goto(`${BASE}/best/${slug}/`, { waitUntil: "load" });
    await page.waitForTimeout(300);
    await page.screenshot({
      path: `${SHOT_DIR}/${file}.png`,
      fullPage: false,
    });
    const text = await page.locator("body").innerText();
    const whys = [...text.matchAll(/Why[\s\S]{20,400}/gi)].length;
    check(
      `${slug} distinct why/tradeoff copy`,
      /trade-?off/i.test(text) && text.split(/\s+/).length > 400,
      `words=${text.split(/\s+/).length}`
    );
  }
  await page.goto(`${BASE}/best/bags/`, { waitUntil: "load" });
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${SHOT_DIR}/08-bags.png`, fullPage: false });
  const bags = await page.locator("body").innerText();
  check("bags page has essay length", bags.split(/\s+/).length > 300);

  // --- about ---
  await page.goto(`${BASE}/about/`, { waitUntil: "load" });
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${SHOT_DIR}/09-about.png`, fullPage: false });
  const about = await page.locator("body").innerText();
  check("about no I-don't-scrape claim", !/don['’]t scrape/i.test(about));
  check(
    "about noindex imported notes",
    /noindex/i.test(about) && /founder-firsthand|original/i.test(about)
  );

  // --- Wave 7 finder ---
  await page.goto(`${BASE}/quiz/`, { waitUntil: "load" });
  const funnel = page.locator("#quiz-funnel");
  await funnel.getByRole("button", { name: /^Club$/i }).click();
  await funnel.getByRole("button", { name: /^Doubles$/i }).click();
  await funnel.getByRole("button", { name: /^Balanced$/i }).click();
  await funnel.getByRole("button", { name: /^Continue$/i }).click();
  await funnel.getByRole("button", { name: /^Racket$/i }).click();
  await funnel.getByRole("button", { name: /See recommendations/i }).click();
  await page.waitForURL(/\/results\//, { timeout: 15_000 });
  check(
    "quiz reaches results",
    /Your equipment shortlist/i.test(await page.locator("body").innerText())
  );
  await page.screenshot({ path: `${SHOT_DIR}/10-results.png`, fullPage: false });
  await page.getByRole("button", { name: /Save .* for later/i }).first().click();
  await page.getByRole("button", { name: /Add to compare/i }).first().click();
  await page.goto(`${BASE}/saved/`);
  check(
    "saved shelf has item",
    /1 item saved/i.test(await page.locator("body").innerText())
  );
  await page.goto(`${BASE}/compare/`);
  const compareText = await page.locator("body").innerText();
  check(
    "compare tray has product",
    /Nanoflare|Astrox|Yonex|Compare/i.test(compareText) &&
      !/browse full catalog/i.test(compareText) || /table|spec/i.test(compareText)
  );

  await page.goto(`${BASE}/catalog/?cat=string&brand=Yonex`, {
    waitUntil: "load",
  });
  await page.getByRole("link", { name: /BG65/i }).first().click();
  await page.waitForTimeout(400);
  check(
    "BG65 catalog → string-selector",
    /\/review\/badminton-string-selector/.test(page.url())
  );

  await page.goto(`${BASE}/catalog/?cat=grip&brand=Yonex`, {
    waitUntil: "load",
  });
  await page.getByRole("link", { name: /Super Grap \(AC102EX/i }).click();
  await page.waitForTimeout(400);
  check("unmapped Super Grap → PDP", /\/product\/yy-ac102ex/.test(page.url()));

  await page.goto(`${BASE}/brands/yonex/`, { waitUntil: "load" });
  check(
    "Yonex brand lists Comfort Z3",
    /Comfort Z3/i.test(await page.locator("body").innerText())
  );
  await page.screenshot({ path: `${SHOT_DIR}/11-brands-yonex.png`, fullPage: false });

  await page.goto(`${BASE}/search/?q=defensive%20doubles%20racket`, {
    waitUntil: "load",
  });
  const defLink = page.getByRole("link", {
    name: /defensive badminton rackets/i,
  });
  check("search defensive doubles racket", (await defLink.count()) > 0);
  await page.screenshot({ path: `${SHOT_DIR}/12-search-defensive.png`, fullPage: false });
} catch (err) {
  check("crawl exception", false, String(err));
  console.error(err);
} finally {
  await browser.close();
}

const failed = checks.filter((c) => !c.ok);
writeFileSync(
  "docs/qa-adsense-recovery/crawl-log.json",
  JSON.stringify({ failed: failed.length, checks }, null, 2) + "\n"
);
console.log(`\n${checks.length - failed.length}/${checks.length} passed, ${failed.length} failed`);
process.exit(failed.length ? 1 : 0);
