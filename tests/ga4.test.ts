import { test } from "node:test";
import assert from "node:assert/strict";

import {
  GA4_ADS_DENIED,
  GA4_EVENTS,
  GA4_MEASUREMENT_ID,
  buildConsentUpdate,
  safeOutboundHostname,
  trackEvent,
} from "../src/lib/analytics.ts";

test("measurement ID defaults to empty when the env var is unset", () => {
  // In the test environment NEXT_PUBLIC_GA4_MEASUREMENT_ID is not defined, so
  // the helper must fall back to an empty string (no tracking without it).
  assert.equal(GA4_MEASUREMENT_ID, "");
});

test("buildConsentUpdate grants analytics but keeps ads denied", () => {
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
