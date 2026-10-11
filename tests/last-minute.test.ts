import { test } from "node:test";
import assert from "node:assert/strict";

import {
  dealHref,
  fill,
  formatDealDates,
  formatEuros,
  formatShortDates,
  seasonFor,
  visibleDeal,
} from "../src/lib/last-minute.ts";
import { fiLastMinute } from "../src/content/fi.ts";
import { enLastMinute } from "../src/content/en.ts";

const deal = {
  checkIn: "2026-11-07",
  checkOut: "2026-11-14",
  nights: 7,
  saturdayWeek: true,
  units: "AB",
  priceCents: 274600,
  normalPriceCents: 336000,
  discountPercent: 20,
};
const feed = (over: Record<string, unknown> = {}, dealOver: Record<string, unknown> = {}) => ({
  today: "2026-10-11",
  inquiriesOpen: true,
  offer: { enabled: true, percent: 20, days: 30 },
  deal: { ...deal, ...dealOver },
  ...over,
});

test("the banner shows a discounted deal while the offer is on and inquiries are open", () => {
  assert.deepEqual(visibleDeal(feed()), {
    checkIn: "2026-11-07",
    checkOut: "2026-11-14",
    nights: 7,
    units: "AB",
    priceCents: 274600,
    normalPriceCents: 336000,
    discountPercent: 20,
  });
});

test("no banner without the offer, a discount, open inquiries or a valid deal", () => {
  assert.equal(visibleDeal(feed({ offer: { enabled: false, percent: 20, days: 30 } })), null);
  assert.equal(visibleDeal(feed({ inquiriesOpen: false })), null);
  assert.equal(visibleDeal(feed({ deal: null })), null);
  assert.equal(visibleDeal(feed({}, { discountPercent: 0, priceCents: 336000 })), null);
  assert.equal(visibleDeal(feed({}, { checkIn: "7.11.2026" })), null);
  assert.equal(visibleDeal(feed({}, { units: "C" })), null);
  assert.equal(visibleDeal({ error: "unavailable" }), null);
  assert.equal(visibleDeal(null), null);
});

test("the season follows the arrival date, with the owner's boundaries", () => {
  const cases: [string, string][] = [
    ["2026-10-01", "firstSnow"],
    ["2026-11-10", "firstSnow"],
    ["2026-11-11", "earlyWinter"],
    ["2026-12-14", "earlyWinter"],
    ["2026-12-15", "christmas"],
    ["2027-01-06", "christmas"],
    ["2027-01-07", "midwinter"],
    ["2027-02-15", "midwinter"],
    ["2027-02-16", "peak"],
    ["2027-03-31", "peak"],
    ["2027-04-01", "spring"],
    ["2027-05-16", "quiet"],
    ["2027-06-05", "quiet"],
    ["2027-06-06", "summer"],
    ["2027-08-31", "summer"],
    ["2027-09-01", "ruska"],
    ["2027-09-30", "ruska"],
  ];
  for (const [date, season] of cases) assert.equal(seasonFor(date), season, date);
  for (const strings of [fiLastMinute, enLastMinute]) {
    for (const [, season] of cases) assert.ok(strings.seasons[season as keyof typeof strings.seasons].text);
  }
});

test("the banner links to the rates page's calendar with the stay", () => {
  const shown = visibleDeal(feed())!;
  assert.equal(dealHref("fi", shown), "/hinnoittelu/?checkIn=2026-11-07&checkOut=2026-11-14#booking-calendar");
  assert.equal(
    dealHref("en", { ...shown, units: "B" }),
    "/en/rates/?checkIn=2026-11-07&checkOut=2026-11-14&units=B#booking-calendar",
  );
});

test("dates, prices and texts are written for each language", () => {
  const shown = visibleDeal(feed())!;
  assert.equal(formatDealDates("fi", shown), "la 7.11. – la 14.11.");
  assert.equal(formatDealDates("en", shown), "Sat 7 Nov – Sat 14 Nov");
  assert.equal(formatShortDates("fi", shown), "7.–14.11.");
  assert.match(formatShortDates("en", shown), /^7\s?–\s?14 Nov$/);
  assert.equal(formatEuros("fi", 274600), "2 746 €");
  assert.equal(formatEuros("en", 274600), "€2,746");
  assert.equal(
    fill(fiLastMinute.title, { percent: 20 }),
    "Nyt äkkilähtö Leville isollakin porukalla −20 % normaalihinnasta",
  );
  assert.equal(fill("{a} {missing}", { a: 1 }), "1 {missing}");
});
