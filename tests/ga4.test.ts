import { test } from "node:test";
import assert from "node:assert/strict";

import {
  ADS_CONVERSIONS,
  BOOKING_CALENDAR_HOSTS,
  GOOGLE_ADS_ID,
  GA4_ADS_DENIED,
  GA4_EVENTS,
  GA4_MEASUREMENT_ID,
  buildConsentUpdate,
  pushToDataLayer,
  safeOutboundHostname,
  setAdsConsent,
  trackAdsConversion,
  trackEvent,
} from "../src/lib/analytics.ts";

test("measurement ID defaults to empty when the env var is unset", () => {
  // In the test environment NEXT_PUBLIC_GA4_MEASUREMENT_ID is not defined, so
  // the helper must fall back to an empty string (no tracking without it).
  assert.equal(GA4_MEASUREMENT_ID, "");
});

test("buildConsentUpdate grants analytics but keeps ads denied without marketing", () => {
  const granted = buildConsentUpdate(true);
  assert.equal(granted.analytics_storage, "granted");
  assert.equal(granted.ad_storage, "denied");
  assert.equal(granted.ad_user_data, "denied");
  assert.equal(granted.ad_personalization, "denied");
});

test("buildConsentUpdate denies analytics when consent is revoked", () => {
  const denied = buildConsentUpdate(false);
  assert.equal(denied.analytics_storage, "denied");
  assert.equal(denied.ad_storage, GA4_ADS_DENIED.ad_storage);
});

test("buildConsentUpdate grants the ad signals only with marketing consent", () => {
  const ads = buildConsentUpdate(false, true);
  assert.equal(ads.ad_storage, "granted");
  assert.equal(ads.ad_user_data, "granted");
  assert.equal(ads.ad_personalization, "granted");
  assert.equal(ads.analytics_storage, "denied");
  assert.deepEqual(
    { ...buildConsentUpdate(true, false), analytics_storage: "x" },
    { ...GA4_ADS_DENIED, analytics_storage: "x" },
  );
});

test("Google Ads conversions belong to the account's tag and are sent only with marketing consent", () => {
  for (const [key, sendTo] of Object.entries(ADS_CONVERSIONS)) {
    assert.match(sendTo, new RegExp(`^${GOOGLE_ADS_ID}/[A-Za-z0-9_-]+$`), key);
  }
  assert.ok(BOOKING_CALENDAR_HOSTS.has("cabins.levifinland.fi"));

  const originalWindow = globalThis.window;
  const calls: unknown[][] = [];
  Object.assign(globalThis, { window: { gtag: (...args: unknown[]) => calls.push(args) } });
  try {
    setAdsConsent(false);
    trackAdsConversion("contactForm");
    assert.equal(calls.length, 0, "no conversion without marketing consent");

    setAdsConsent(true);
    trackAdsConversion("contactForm");
    assert.deepEqual(calls, [["event", "conversion", { send_to: ADS_CONVERSIONS.contactForm }]]);

    calls.length = 0;
    trackAdsConversion("bookingRequest");
    assert.deepEqual(calls, [["event", "conversion", { send_to: ADS_CONVERSIONS.bookingRequest }]]);
  } finally {
    setAdsConsent(false);
    if (originalWindow === undefined) {
      delete (globalThis as { window?: unknown }).window;
    } else {
      Object.assign(globalThis, { window: originalWindow });
    }
  }
});

test("event names are stable and bilingual-neutral", () => {
  assert.equal(GA4_EVENTS.contactSubmit, "contact_form_submit");
  assert.equal(GA4_EVENTS.contactClick, "contact_click");
  assert.equal(GA4_EVENTS.outboundClick, "outbound_click");
  assert.equal(GA4_EVENTS.galleryLightboxOpen, "gallery_lightbox_open");
});

test("safeOutboundHostname returns null for same-origin links", () => {
  assert.equal(
    safeOutboundHostname("/en/home/", "https://www.hiihtogreeni.fi"),
    null,
  );
  assert.equal(
    safeOutboundHostname(
      "https://www.hiihtogreeni.fi/kuvagalleria/",
      "https://www.hiihtogreeni.fi",
    ),
    null,
  );
});

test("safeOutboundHostname returns the hostname only for external links", () => {
  assert.equal(
    safeOutboundHostname(
      "https://www.levifinland.fi/",
      "https://www.hiihtogreeni.fi",
    ),
    "www.levifinland.fi",
  );
  assert.equal(
    safeOutboundHostname(
      "https://greenfee.levifinland.fi/book?ref=hiihtogreeni",
      "https://www.hiihtogreeni.fi",
    ),
    "greenfee.levifinland.fi",
  );
});

test("safeOutboundHostname returns null for invalid hrefs", () => {
  assert.equal(
    safeOutboundHostname("not a url", "https://www.hiihtogreeni.fi"),
    null,
  );
});

test("trackEvent is a no-op and does not throw when gtag is absent", () => {
  // No window in node:test; behavior is guarded by the typeof check.
  assert.doesNotThrow(() => trackEvent(GA4_EVENTS.contactSubmit, { language: "fi" }));
});

test("queued gtag commands are array-like objects for gtag.js", () => {
  const originalWindow = globalThis.window;
  const dataLayer: unknown[] = [];
  Object.assign(globalThis, { window: { dataLayer } });

  try {
    pushToDataLayer(["config", "G-TEST123", { page_title: "Test" }]);
    const command = dataLayer[0] as Record<string, unknown>;

    assert.equal(Array.isArray(command), false);
    assert.equal(command[0], "config");
    assert.equal(command[1], "G-TEST123");
    assert.deepEqual(command[2], { page_title: "Test" });
    assert.equal(command.length, 3);
  } finally {
    if (originalWindow === undefined) {
      delete (globalThis as { window?: unknown }).window;
    } else {
      Object.assign(globalThis, { window: originalWindow });
    }
  }
});
