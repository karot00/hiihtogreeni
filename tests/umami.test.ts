import { test } from "node:test";
import assert from "node:assert/strict";

import { UMAMI_DOMAINS, UMAMI_EVENTS, UMAMI_SCRIPT_URL, UMAMI_WEBSITE_ID, classifyClick, inquiryEvent } from "../src/lib/umami.ts";
import { BOOKING_ORIGIN, RENTAL_CONTACT, bookingPageUrl } from "../src/content/shared.ts";
import { FI_COOKIE_CONSENT } from "../src/content/fi.ts";
import { EN_COOKIE_CONSENT } from "../src/content/en.ts";
import { SITE_CONFIG } from "../src/lib/config.ts";

const ORIGIN = SITE_CONFIG.url;

test("the tracker is the renamed self-hosted script, limited to the production host", () => {
  assert.equal(UMAMI_SCRIPT_URL, "https://stats.experiencelevi.fi/s");
  assert.equal(UMAMI_DOMAINS, new URL(SITE_CONFIG.url).host);
  // NEXT_PUBLIC_UMAMI_WEBSITE_ID is not set in tests, so the component renders nothing.
  assert.equal(UMAMI_WEBSITE_ID, "");
});

test("tel: and mailto: links are contact clicks without the number or address", () => {
  const tel = classifyClick(`tel:${RENTAL_CONTACT.phone}`, ORIGIN, "footer");
  assert.deepEqual(tel, { name: UMAMI_EVENTS.contactClick, data: { kind: "tel", where: "footer" } });
  const mail = classifyClick(`mailto:${RENTAL_CONTACT.email}`, ORIGIN, "content");
  assert.deepEqual(mail, { name: UMAMI_EVENTS.contactClick, data: { kind: "mailto", where: "content" } });
});

test("links to the rates page or the booking site are booking CTA clicks", () => {
  for (const href of ["/hinnoittelu/", "/en/rates/", "/hinnoittelu/?checkIn=2026-11-07&checkOut=2026-11-14#booking-calendar"]) {
    assert.deepEqual(classifyClick(href, ORIGIN, "content"), {
      name: UMAMI_EVENTS.bookCtaClick,
      data: { to: "rates", where: "content" },
    }, href);
  }
  assert.deepEqual(classifyClick(`${bookingPageUrl("fi")}#booking`, ORIGIN, "content"), {
    name: UMAMI_EVENTS.bookCtaClick,
    data: { to: "booking-site", where: "content" },
  });
});

test("other links send no event", () => {
  for (const href of [
    "/mokki/",
    "/en/contact-information/",
    "https://greenfee.levifinland.fi",
    `${BOOKING_ORIGIN}/fi/nulkkachalet`,
    `${BOOKING_ORIGIN}/api/v1/hiihtogreeni/openapi.json`,
    "/llms.txt",
    "#main",
  ]) {
    assert.equal(classifyClick(href, ORIGIN, "content"), null, href);
  }
});

test("the cookie settings describe the cookieless statistics in both languages", () => {
  for (const copy of [FI_COOKIE_CONSENT, EN_COOKIE_CONSENT]) {
    assert.match(copy.preferences.cookielessStats, /Umami/);
    assert.match(copy.preferences.cookielessStats, /stats\.experiencelevi\.fi/);
    assert.match(copy.preferences.cookielessStats, /Do Not Track/);
  }
});

test("the widget's inquiry message becomes inquiry_submitted with counts only", () => {
  const message = { type: "hiihtogreeni-embed:inquiry", nights: 7, units: "AB", guests: 20, leadDays: 45 };
  assert.deepEqual(inquiryEvent(message), {
    name: UMAMI_EVENTS.inquirySubmitted,
    data: { channel: "web", nights: 7, units: "AB", guests: 20, lead_days: 45 },
  });
  for (const bad of [
    null,
    "hiihtogreeni-embed:inquiry",
    { type: "hiihtogreeni-embed:height", height: 900 },
    { ...message, units: "C" },
    { ...message, nights: -1 },
    { ...message, guests: 2.5 },
    { ...message, email: "guest@example.com", guests: "20" },
  ]) {
    assert.equal(inquiryEvent(bad), null, JSON.stringify(bad));
  }
});
