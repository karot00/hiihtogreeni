import { test } from "node:test";
import assert from "node:assert/strict";

import {
  CONSENT_COOKIE_NAME,
  CONSENT_SCHEMA_VERSION,
  CONSENT_UNSET_UPDATED_AT,
} from "../src/lib/cookie-consent/constants.ts";
import {
  CONSENT_INVENTORY,
  CONSENT_CATEGORY_CONFIG,
} from "../src/lib/cookie-consent/config.ts";
import {
  isBannerRequired,
  isCategoryAllowed,
} from "../src/lib/cookie-consent/gate.ts";
import {
  createDefaultConsentState,
  parseConsentState,
  readConsentFromDocumentCookie,
  serializeConsentState,
} from "../src/lib/cookie-consent/storage.ts";
import type { ConsentState } from "../src/lib/cookie-consent/types.ts";
import { FI_COOKIE_CONSENT } from "../src/content/fi.ts";
import { EN_COOKIE_CONSENT } from "../src/content/en.ts";

function decidedState(
  overrides: Partial<ConsentState["categories"]> = {},
): ConsentState {
  return {
    version: CONSENT_SCHEMA_VERSION,
    updatedAt: "2026-07-27T12:00:00.000Z",
    categories: {
      essential: true,
      functional: false,
      analytics: false,
      marketing: false,
      ...overrides,
    },
  };
}

test("essential is always allowed, other categories require explicit opt-in", () => {
  const state = decidedState({ analytics: true });
  assert.equal(isCategoryAllowed(state, "essential"), true);
  assert.equal(isCategoryAllowed(state, "analytics"), true);
  assert.equal(isCategoryAllowed(state, "functional"), false);
  assert.equal(isCategoryAllowed(state, "marketing"), false);
});

test("banner is required only while consent is unset", () => {
  assert.equal(isBannerRequired(createDefaultConsentState()), true);
  assert.equal(isBannerRequired(decidedState()), false);
});

test("default state denies every optional category", () => {
  const state = createDefaultConsentState();
  assert.equal(state.updatedAt, CONSENT_UNSET_UPDATED_AT);
  assert.deepEqual(state.categories, {
    essential: true,
    functional: false,
    analytics: false,
    marketing: false,
  });
});

test("consent state survives a serialize/parse round-trip", () => {
  const original = decidedState({ analytics: true, functional: true });
  const roundTripped = parseConsentState(serializeConsentState(original));
  assert.deepEqual(roundTripped, original);
});

test("parse rejects malformed, non-JSON, and shape-less values", () => {
  const fallback = createDefaultConsentState();
  assert.deepEqual(parseConsentState(undefined), fallback);
  assert.deepEqual(parseConsentState(""), fallback);
  assert.deepEqual(parseConsentState("not-json"), fallback);
  assert.deepEqual(parseConsentState(encodeURIComponent('"just a string"')), fallback);
  assert.deepEqual(
    parseConsentState(encodeURIComponent(JSON.stringify({ version: 1 }))),
    fallback,
  );
});

test("parse never grants a category from a non-boolean value and forces essential", () => {
  const tampered = encodeURIComponent(
    JSON.stringify({
      version: CONSENT_SCHEMA_VERSION,
      updatedAt: "2026-07-27T12:00:00.000Z",
      categories: { essential: false, analytics: "yes", marketing: 1 },
    }),
  );
  const parsed = parseConsentState(tampered);
  assert.equal(parsed.categories.essential, true);
  assert.equal(parsed.categories.analytics, false);
  assert.equal(parsed.categories.marketing, false);
});

test("document.cookie reader picks the newest hg_consent value and ignores other cookies", () => {
  const older = serializeConsentState(decidedState({ analytics: true }));
  const newer = serializeConsentState({
    ...decidedState(),
    updatedAt: "2026-07-28T09:00:00.000Z",
  });
  const cookie = `foo=bar; ${CONSENT_COOKIE_NAME}=${older}; ${CONSENT_COOKIE_NAME}=${newer}`;
  const parsed = readConsentFromDocumentCookie(cookie);
  assert.equal(parsed.updatedAt, "2026-07-28T09:00:00.000Z");
  assert.equal(parsed.categories.analytics, false);
});

test("document.cookie reader falls back to defaults when hg_consent is absent", () => {
  assert.deepEqual(
    readConsentFromDocumentCookie("foo=bar; other=1"),
    createDefaultConsentState(),
  );
});

test("cookie name is the host-only hg_consent, not the levifinland original", () => {
  assert.equal(CONSENT_COOKIE_NAME, "hg_consent");
});

test("inventory is truthful: hg_consent essential+active, GA4 cookies active, no functional/marketing rows", () => {
  const byId = Object.fromEntries(CONSENT_INVENTORY.map((i) => [i.id, i]));
  assert.equal(byId.hg_consent.category, "essential");
  assert.equal(byId.hg_consent.required, true);
  assert.equal(byId.hg_consent.active, true);

  assert.equal(byId.ga.name, "_ga");
  assert.equal(byId.ga.category, "analytics");
  assert.equal(byId.ga.active, true);
  assert.equal(byId.ga_session.name, "_ga_4963QM11X1");
  assert.equal(byId.ga_session.category, "analytics");
  assert.equal(byId.ga_session.active, true);

  assert.equal(
    CONSENT_INVENTORY.filter(
      (i) => i.category === "functional" || i.category === "marketing",
    ).length,
    0,
    "no invented functional/marketing technologies",
  );
});

test("every inventory item and category has localized copy in both languages", () => {
  for (const copy of [FI_COOKIE_CONSENT, EN_COOKIE_CONSENT]) {
    for (const item of CONSENT_INVENTORY) {
      const itemCopy = copy.inventory.items[item.id];
      assert.ok(itemCopy.purpose.length > 0, `${item.id} purpose`);
      assert.ok(itemCopy.duration.length > 0, `${item.id} duration`);
    }
    for (const category of CONSENT_CATEGORY_CONFIG) {
      const categoryCopy = copy.categories[category.id];
      assert.ok(categoryCopy.title.length > 0, `${category.id} title`);
      assert.ok(categoryCopy.description.length > 0, `${category.id} description`);
    }
  }
});
