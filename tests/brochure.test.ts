import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, statSync } from "node:fs";

import { BROCHURE_PATHS, BROCHURE_STRINGS, brochureLink, buildBrochureHtml, perPersonNight } from "../src/lib/brochure.ts";
import { companyExamples } from "../src/lib/company-examples.ts";
import { UMAMI_EVENTS, classifyClick } from "../src/lib/umami.ts";
import { buildLlmsTxt } from "../src/lib/llms.ts";
import { SITE_CONFIG } from "../src/lib/config.ts";
import { ROUTES } from "../src/lib/routes.ts";
import nextConfig from "../next.config.ts";

const IMAGES = {
  cover: "cover.jpg",
  living: "living.jpg",
  conference: "conference.jpg",
  workshop: "workshop.jpg",
  mapSummer: "summer.jpg",
  mapWinter: "winter.jpg",
  floorDown: "down.jpg",
  floorUp: "up.jpg",
};

const example = companyExamples("2026-11-03").find((e) => e.key === "mayApartment")!;
const quote = { checkIn: example.checkIn, checkOut: example.checkOut, nights: 3, lines: [], totalEur: 2010 };
const html = (lang: "fi" | "en", examples = [{ example, quote }]) =>
  buildBrochureHtml({ lang, today: "2026-11-03", examples, images: IMAGES, fontCss: "", qrSvg: "<svg></svg>", shortStay: "SHORT-STAY-RULE" });

test("the brochure has nine slides in both languages, with the price date and a from price", () => {
  for (const lang of ["fi", "en"] as const) {
    const doc = html(lang);
    assert.equal(doc.match(/<section class="slide/g)?.length, 9, lang);
    assert.ok(doc.includes(`<title>${BROCHURE_STRINGS[lang].docTitle}</title>`));
    assert.ok(doc.includes(lang === "fi" ? "3.11.2026" : "3 Nov 2026"));
  }
  assert.equal(perPersonNight(example, quote), 56);
  // The one-apartment example is set-up 3, and the from price says so.
  assert.match(html("fi"), /alkaen 56\s€ \/ henkilö \/ yö \(kokoonpano 3\)/);
  assert.match(html("en"), /Example 10\s?–\s?13 May 2027, 12 people/);
  assert.ok(html("fi").includes("SHORT-STAY-RULE"));
  // Without prices the brochure points to the booking calendar instead.
  assert.ok(html("en", []).includes(BROCHURE_STRINGS.en.pricesUnavailable));
});

test("the AI-generated workshop photo is labelled as such", () => {
  for (const lang of ["fi", "en"] as const) {
    assert.ok(html(lang).includes(`<span class="label">${BROCHURE_STRINGS[lang].aiLabel}</span>`), lang);
  }
});

test("brochure links carry the plan's UTM tags", () => {
  const link = new URL(brochureLink("fi", "rates", "#booking-calendar"));
  assert.equal(link.pathname, ROUTES.fi.rates);
  assert.equal(link.searchParams.get("utm_source"), "esite");
  assert.equal(link.searchParams.get("utm_medium"), "pdf");
  assert.equal(link.searchParams.get("utm_campaign"), "yritysryhmat");
  assert.ok(html("en").includes(brochureLink("en", "companies").replace(/&/g, "&amp;")));
});

test("the built PDFs are in public/ and under 5 MB", () => {
  for (const path of Object.values(BROCHURE_PATHS)) {
    const file = `public${path}`;
    assert.ok(existsSync(file), `${file} missing: run npm run brochure`);
    assert.ok(statSync(file).size < 5 * 1024 * 1024);
  }
});

test("a brochure download is a Umami event with the language only", () => {
  const origin = SITE_CONFIG.url;
  assert.deepEqual(classifyClick(BROCHURE_PATHS.fi, origin, "content"), {
    name: UMAMI_EVENTS.brochureDownload,
    data: { language: "fi", where: "content" },
  });
  assert.equal(classifyClick(BROCHURE_PATHS.en, origin, "content")?.data.language, "en");
});

test("the PDFs send search engines to the companies page", async () => {
  const rules = await nextConfig.headers!();
  for (const lang of ["fi", "en"] as const) {
    const rule = rules.find((r) => r.source === BROCHURE_PATHS[lang]);
    assert.deepEqual(rule?.headers, [{ key: "Link", value: `<${SITE_CONFIG.url}${ROUTES[lang].companies}>; rel="canonical"` }]);
  }
});

test("llms.txt links the brochure", () => {
  assert.ok(buildLlmsTxt().includes(`${SITE_CONFIG.url}${BROCHURE_PATHS.en}`));
});
