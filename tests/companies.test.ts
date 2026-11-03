import { test } from "node:test";
import assert from "node:assert/strict";

import { companiesFaq, companyExamples, shortStayAnswer, upcomingWeekday } from "../src/lib/company-examples.ts";
import { parsePricing, parseQuote, quoteUrl, type Pricing } from "../src/lib/booking-api.ts";
import { buildLlmsFullTxt, buildLlmsTxt } from "../src/lib/llms.ts";
import { enCompaniesSections } from "../src/content/en.ts";
import { fiCompaniesSections } from "../src/content/fi.ts";
import { ROUTES } from "../src/lib/routes.ts";
import { SITE_CONFIG } from "../src/lib/config.ts";

const pricing = (minNights: number, minChargedNights: number) => ({ minNights, minChargedNights }) as Pricing;

test("example stays fall on the template weekday, at least three weeks ahead", () => {
  assert.equal(upcomingWeekday("2026-11-03", 5, 10, 1), "2027-05-10");
  // Too close this year, so next year's first Monday on or after 10 May.
  assert.equal(upcomingWeekday("2027-05-01", 5, 10, 1), "2028-05-15");
  assert.equal(upcomingWeekday("2026-11-03", 9, 7, 2), "2027-09-07");
  for (const example of companyExamples("2026-11-03")) {
    assert.ok(example.checkIn > "2026-11-24", example.key);
    assert.equal((Date.parse(example.checkOut) - Date.parse(example.checkIn)) / 86_400_000, 3);
    assert.ok(example.bedsMade && example.conferenceRoom);
  }
});

test("each set-up has its own price example, in the same order", () => {
  for (const sections of [fiCompaniesSections, enCompaniesSections]) {
    assert.deepEqual(
      sections.configs.map((c) => c.example),
      companyExamples("2026-11-03").map((e) => e.key),
    );
  }
});

test("the shortest-stay answer follows the live rules", () => {
  assert.equal(shortStayAnswer("fi", pricing(3, 0)), "Lyhin varaus on 3 yötä.");
  assert.match(shortStayAnswer("fi", pricing(1, 3)), /^Lyhin varaus on 1 yö\. Alle 3 yön varaus veloitetaan 3 yön hinnalla/);
  assert.match(shortStayAnswer("en", pricing(2, 3)), /^The shortest stay is 2 nights\. A stay of fewer than 3 nights is charged as 3 nights/);
  assert.equal(shortStayAnswer("en", null), enCompaniesSections.shortStay.unknown);
});

test("both languages have the same companies page structure", () => {
  const fi = fiCompaniesSections;
  const en = enCompaniesSections;
  for (const key of ["facts", "useCases", "configs", "programs", "practical", "faq"] as const) {
    assert.equal(fi[key].length, en[key].length, key);
  }
  assert.equal(companiesFaq("fi", null).length, fi.faq.length + 1);
  assert.equal(companiesFaq("en", null)[5].q, en.shortStay.q);
  assert.ok(fi.faq.length + 1 >= 8 && fi.faq.length + 1 <= 12, "8–12 questions");
});

test("the companies texts make no promise the owner has not confirmed", () => {
  const text = JSON.stringify([fiCompaniesSections, enCompaniesSections]);
  // C3–C5: no room size, screen size or network speed; C7–C9: no named partners.
  assert.doesNotMatch(text, /Mbps|m²|catering|husky|moottorikelk|snowmobile/i);
});

test("pricing reads the minimum charged nights only when it is above the minimum stay", () => {
  const doc = (rules: Record<string, unknown>) => ({ seasons: [], extras: {}, rules });
  assert.equal(parsePricing(doc({ min_nights: 3 }))?.minChargedNights, 0);
  assert.equal(parsePricing(doc({ min_nights: 1, min_charged_nights: 3 }))?.minChargedNights, 3);
  assert.equal(parsePricing(doc({ min_nights: 3, min_charged_nights: 3 }))?.minChargedNights, 0);
});

test("a quote is read from the booking API's document", () => {
  const url = new URL(quoteUrl("fi", { checkIn: "2027-05-10", checkOut: "2027-05-13", units: "AB", guests: 14, conferenceRoom: true, bedsMade: true }));
  assert.equal(url.searchParams.get("units"), "AB");
  assert.equal(url.searchParams.get("beds_made"), "true");
  assert.equal(url.searchParams.get("conference_room"), "true");
  const quote = parseQuote({
    quote: {
      check_in: "2027-05-10",
      check_out: "2027-05-13",
      nights: 3,
      lines: [{ item: "apartment_a", description: "Apartment A", quantity: 3, total_eur: 1170 }],
      total_eur: 3270,
    },
  });
  assert.equal(quote?.totalEur, 3270);
  assert.equal(quote?.lines[0].quantity, 3);
  assert.equal(parseQuote({ error: { code: "unavailable" } }), null);
});

test("llms.txt points to the companies page and tells agents to price with /quote", () => {
  const short = buildLlmsTxt();
  const full = buildLlmsFullTxt();
  for (const text of [short, full]) {
    assert.ok(text.includes("## For companies and leadership offsites"));
    assert.ok(text.includes(`${SITE_CONFIG.url}${ROUTES.en.companies}`));
    assert.ok(text.includes("conference_room=true"));
  }
  assert.ok(full.includes(enCompaniesSections.faq[0].q));
});
