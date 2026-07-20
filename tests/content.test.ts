import { test } from "node:test";
import assert from "node:assert/strict";

import {
  ROUTES,
  MIGRATION_REDIRECTS,
  getTranslation,
  getHref,
} from "../src/lib/routes.ts";
import { SITE_CONFIG } from "../src/lib/config.ts";
import {
  fiHome,
  fiCabin,
  fiGallery,
  fiRates,
  fiContact,
  fiGalleryImages,
  FI_NAV,
} from "../src/content/fi.ts";
import {
  enHome,
  enCabin,
  enGallery,
  enRates,
  enContact,
  enGalleryImages,
  EN_NAV,
} from "../src/content/en.ts";

test("route map covers all five page pairs in both languages", () => {
  const langs = Object.keys(ROUTES) as Array<keyof typeof ROUTES>;
  assert.deepEqual(langs.sort(), ["en", "fi"]);
  for (const lang of langs) {
    assert.deepEqual(
      Object.keys(ROUTES[lang]).sort(),
      ["cabin", "contact", "gallery", "home", "rates"],
      `route keys for ${lang}`,
    );
  }
});

test("migration redirects target canonical routes", () => {
  const bySource = Object.fromEntries(
    MIGRATION_REDIRECTS.map((r) => [r.source, r.destination]),
  );
  assert.equal(bySource["/en/gallery"], getHref("en", "gallery"));
  assert.equal(bySource["/en"], getHref("en", "home"));
});

test("language switcher maps each page to its translation pair", () => {
  assert.equal(getTranslation("fi", "home", "en"), ROUTES.en.home);
  assert.equal(getTranslation("en", "cabin", "fi"), ROUTES.fi.cabin);
  assert.equal(getTranslation("fi", "rates", "en"), ROUTES.en.rates);
});

test("owner-approved contacts and capacity are present in site config", () => {
  assert.equal(SITE_CONFIG.contact.phone, "+358500633744");
  assert.equal(SITE_CONFIG.contact.email, "hiihtogreeni@hiihtogreeni.fi");
  assert.equal(SITE_CONFIG.maintenance.phone, "+358443456001");
  assert.equal(SITE_CONFIG.maintenance.email, "jens.pitkanen@aavalevi.fi");
  assert.equal(SITE_CONFIG.capacity.guestsPerApartment, 14);
  assert.equal(SITE_CONFIG.capacity.apartments, 2);
});

test("every canonical page has a title and an h1, unique within its language", () => {
  const fiPages = [fiHome, fiCabin, fiGallery, fiRates, fiContact];
  const enPages = [enHome, enCabin, enGallery, enRates, enContact];
  const allPages = [...fiPages, ...enPages];
  for (const p of allPages) {
    assert.ok(p.title.length > 0, `${p.slug} title`);
    assert.ok(p.h1.length > 0, `${p.slug} h1`);
  }
  assert.equal(
    new Set(fiPages.map((p) => p.title)).size,
    fiPages.length,
    "Finnish titles must be unique",
  );
  assert.equal(
    new Set(enPages.map((p) => p.title)).size,
    enPages.length,
    "English titles must be unique",
  );
  assert.equal(
    new Set(fiPages.map((p) => p.h1)).size,
    fiPages.length,
    "Finnish h1 must be unique",
  );
  assert.equal(
    new Set(enPages.map((p) => p.h1)).size,
    enPages.length,
    "English h1 must be unique",
  );
});

test("navigation matches the five canonical pages and language", () => {
  assert.equal(FI_NAV.length, 5);
  assert.equal(EN_NAV.length, 5);
  for (const item of FI_NAV) assert.ok(item.href.startsWith("/"));
  for (const item of EN_NAV) assert.ok(item.href.startsWith("/en/"));
});

test("galleries reference retained legacy media URLs under wp-content/uploads", () => {
  const all = [...fiGalleryImages, ...enGalleryImages];
  assert.ok(all.length >= 20, "gallery must preserve approved image count");
  for (const img of all) {
    assert.ok(
      img.src.includes("/wp-content/uploads/"),
      `legacy media URL under wp-content/uploads required: ${img.src}`,
    );
    assert.ok(img.alt.length > 0, `alt text required: ${img.src}`);
    assert.ok(img.width > 0, `intrinsic width required: ${img.src}`);
    assert.ok(img.height > 0, `intrinsic height required: ${img.src}`);
  }
});

test("Finnish and English gallery counts preserved from the approved source", () => {
  assert.equal(fiGalleryImages.length, 25, "Finnish gallery is 25 images");
  assert.equal(enGalleryImages.length, 23, "English gallery is 23 images (source listed 24, but Hiihtogreeni-tekstit.jpg has no valid source and was dropped, matching the Phase 5 media-availability correction)");
});
