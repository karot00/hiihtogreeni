import { test } from "node:test";
import assert from "node:assert/strict";

import robots, { AI_CRAWLERS } from "../src/app/robots.ts";
import { buildLlmsFullTxt, buildLlmsTxt } from "../src/lib/llms.ts";
import { CAPACITY, COMPANY, MAINTENANCE_CONTACT, RENTAL_CONTACT, STAY_TIMES, bookingPageUrl, bookingTermsUrl } from "../src/content/shared.ts";
import { fiRatesSections } from "../src/content/fi.ts";
import { enRatesSections } from "../src/content/en.ts";
import { ROUTES } from "../src/lib/routes.ts";
import { SITE_CONFIG } from "../src/lib/config.ts";

const WP_DISALLOW = ["/wp-admin/", "/wp-json/", "/feed/"];

test("robots allows the AI crawlers by name and keeps the WordPress disallows in every group", () => {
  const { rules } = robots();
  assert.ok(Array.isArray(rules));
  const named = rules.flatMap((rule) => [rule.userAgent].flat());
  assert.ok(named.includes("*"));
  for (const bot of ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "PerplexityBot", "Google-Extended", "Applebot-Extended"]) {
    assert.ok(AI_CRAWLERS.includes(bot), bot);
    assert.ok(named.includes(bot), bot);
  }
  for (const rule of rules) {
    assert.equal(rule.allow, "/");
    assert.deepEqual(rule.disallow, WP_DISALLOW);
  }
});

test("both rates pages state the check-in and check-out times from the booking terms", () => {
  assert.ok(enRatesSections.terms.some((term) => term.includes("17:00") && term.includes("11:00")));
  assert.ok(fiRatesSections.terms.some((term) => term.includes("klo 17.00") && term.includes("klo 11.00")));
});

for (const [name, build] of [["llms.txt", buildLlmsTxt], ["llms-full.txt", buildLlmsFullTxt]] as const) {
  test(`${name} carries the same facts as the shared content`, () => {
    const text = build();
    assert.ok(text.startsWith(`# ${SITE_CONFIG.name}\n\n> `), "llmstxt.org header");
    assert.ok(text.includes(COMPANY.address.street));
    assert.ok(text.includes(`${CAPACITY.guestsPerApartment} guests per apartment`));
    assert.ok(text.includes(`${CAPACITY.guestsPerApartment * CAPACITY.apartments} for the whole house`));
    assert.ok(text.includes(String(COMPANY.geo.latitude)));
    assert.ok(text.includes(RENTAL_CONTACT.phoneDisplay));
    assert.ok(text.includes(`Check-in from ${STAY_TIMES.checkIn}`));
    assert.ok(text.includes(`check-out by ${STAY_TIMES.checkOut}`));
    assert.ok(text.includes(bookingPageUrl("en")));
    assert.ok(text.includes(bookingTermsUrl("en")));
    for (const path of [...Object.values(ROUTES.en), ...Object.values(ROUTES.fi)]) {
      assert.ok(text.includes(`(${SITE_CONFIG.url}${path})`), path);
    }
  });

  test(`${name} shows no click-to-load email and no accommodation prices`, () => {
    const text = build();
    assert.ok(!text.includes(RENTAL_CONTACT.email));
    assert.ok(!text.includes(MAINTENANCE_CONTACT.email));
    // llms-full.txt has only the linen delivery fee (booking FAQ) and the green fee.
    const euros = (text.match(/€\s?\d[\d\s,.]*/g) ?? []).map((amount) => amount.trim());
    assert.deepEqual(euros.sort(), name === "llms-full.txt" ? ["€27", "€50"] : []);
  });
}

test("with live data, llms.txt lists the seasonal prices, extras, offer and free periods from the API", async () => {
  const { parseAvailability, parsePricing } = await import("../src/lib/booking-api.ts");
  const { AVAILABILITY_JSON, PRICING_JSON } = await import("./fixtures/booking-api.ts");
  const live = { pricing: parsePricing(PRICING_JSON), availability: parseAvailability(AVAILABILITY_JSON) };
  for (const text of [buildLlmsTxt(live), buildLlmsFullTxt(live)]) {
    assert.ok(text.includes("live from the booking system"));
    assert.ok(text.includes("| Alkutalvi | 1 – 30 Nov 2026 | €3,070 | €570 |"));
    assert.ok(text.includes("| Joulu ja uusivuosi | 17 Dec 2026 – 6 Jan 2027 | A €4,940 / B €5,040 | €990 |"));
    assert.ok(text.includes("| Other times | | €3,500 | €575 |"));
    assert.ok(text.includes("Final cleaning €290 per apartment"));
    assert.ok(text.includes("Minimum stay 3 nights"));
    assert.ok(text.includes("Last minute: 20% off the accommodation for arrivals until 24 Nov 2026"));
    assert.ok(text.includes("- Whole house (28 guests): from 27 Nov 2026"));
    assert.ok(text.includes("- Apartment B (14 guests): 21 – 26 Nov 2026 (5 nights); from 27 Nov 2026"));
    assert.ok(!text.includes("Unpriced"));
    assert.ok(!text.includes(RENTAL_CONTACT.email));
  }
});

test("without live data, llms.txt points to the booking calendar instead of quoting prices", () => {
  const text = buildLlmsTxt({ pricing: null, availability: null });
  assert.ok(text.includes("could not be read from the booking system"));
  assert.ok(!text.includes("### Seasonal prices"));
  assert.ok(!text.includes("### Free periods"));
});
