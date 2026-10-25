import { test } from "node:test";
import assert from "node:assert/strict";

import {
  AVAILABILITY_URL,
  PRICING_URL,
  formatDateRange,
  freeRanges,
  parseAvailability,
  parsePricing,
  priceRange,
} from "../src/lib/booking-api.ts";
import { BOOKING_ORIGIN } from "../src/content/shared.ts";
import { AVAILABILITY_JSON, PRICING_JSON } from "./fixtures/booking-api.ts";

test("reads the booking system's public API", () => {
  assert.equal(PRICING_URL, `${BOOKING_ORIGIN}/api/v1/hiihtogreeni/pricing`);
  assert.equal(AVAILABILITY_URL, `${BOOKING_ORIGIN}/api/v1/hiihtogreeni/availability`);
});

test("parses the pricing document and drops seasons without both apartments' prices", () => {
  const pricing = parsePricing(PRICING_JSON);
  assert.ok(pricing);
  assert.deepEqual(pricing.seasons.map((s) => s.name), ["Alkutalvi", "Joulu ja uusivuosi"]);
  assert.deepEqual(pricing.seasons[1].b, { weekly: 5040, nightly: 990 });
  assert.deepEqual(pricing.base, { a: { weekly: 3500, nightly: 575 }, b: { weekly: 3500, nightly: 575 } });
  assert.equal(pricing.extras.cleaningPerApartment, 290);
  assert.equal(pricing.minNights, 3);
  assert.deepEqual(pricing.lastMinute, { percent: 20, arrivalsUntil: "2026-11-24" });
  assert.deepEqual(priceRange(pricing), { nightly: [570, 990], weekly: [3070, 5040] });
});

test("anything not in the expected shape gives null, so the pages fall back to the calendar", () => {
  for (const bad of [null, "error", { error: "booking_source_unavailable" }, { ...PRICING_JSON, rules: { min_nights: "3" } }]) {
    assert.equal(parsePricing(bad), null);
  }
  const badDate = { ...PRICING_JSON, seasons: [{ ...PRICING_JSON.seasons[0], first_night: "1.11.2026" }] };
  assert.equal(parsePricing(badDate), null);
  assert.equal(parsePricing({ ...PRICING_JSON, last_minute: null })?.lastMinute, null);
  assert.equal(parseAvailability({ today: "2026-11-21", nights: [{ date: "x" }] }), null);
});

test("free periods per apartment and for the whole house, at least the minimum stay", () => {
  const availability = parseAvailability(AVAILABILITY_JSON);
  assert.ok(availability);
  assert.deepEqual(freeRanges(availability.nights, "a", 3), [
    { checkIn: "2026-11-25", checkOut: "2026-12-01", nights: 6, openEnded: true },
  ]);
  assert.deepEqual(freeRanges(availability.nights, "a", 2), [
    { checkIn: "2026-11-21", checkOut: "2026-11-23", nights: 2, openEnded: false },
    { checkIn: "2026-11-25", checkOut: "2026-12-01", nights: 6, openEnded: true },
  ]);
  assert.deepEqual(freeRanges(availability.nights, "b", 3), [
    { checkIn: "2026-11-21", checkOut: "2026-11-26", nights: 5, openEnded: false },
    { checkIn: "2026-11-27", checkOut: "2026-12-01", nights: 4, openEnded: true },
  ]);
  assert.deepEqual(freeRanges(availability.nights, "ab", 3), [
    { checkIn: "2026-11-27", checkOut: "2026-12-01", nights: 4, openEnded: true },
  ]);
});

test("date ranges read naturally in both languages", () => {
  assert.equal(formatDateRange("fi", "2026-11-21", "2026-11-28"), "21.–28.11.2026");
  assert.equal(formatDateRange("en", "2026-12-26", "2027-01-02"), "26 Dec 2026 – 2 Jan 2027");
});
