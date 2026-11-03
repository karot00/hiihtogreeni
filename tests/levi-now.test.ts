import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import { GOOGLE_MAPS_URL, leviNowEmbedUrl } from "../src/lib/levi-now.ts";

test("the Levi Now map: Hiihtogreeni as the stay, the page language, UTM tags", () => {
  assert.equal(
    leviNowEmbedUrl("fi", "cabin-page"),
    "https://map.levifinland.fi/fi/?embed=1&stay=hiihtogreeni&utm_source=hiihtogreeni.fi&utm_medium=referral&utm_campaign=map-embed&utm_content=cabin-page",
  );
  assert.ok(leviNowEmbedUrl("en", "cabin-page").startsWith("https://map.levifinland.fi/en/?embed=1&stay=hiihtogreeni&"));
  assert.equal(GOOGLE_MAPS_URL, "https://www.google.com/maps/search/?api=1&query=67.801561,24.900871");
});

test("the contact pages show the map, and the location links lead to it, not off-site", () => {
  const read = (file: string) => readFileSync(new URL(`../${file}`, import.meta.url), "utf8");
  for (const [file, lang, anchor] of [["src/app/(fi)/yhteystiedot/page.tsx", "fi", "sijainti"], ["src/app/(en)/en/contact-information/page.tsx", "en", "location"]]) {
    const src = read(file);
    assert.ok(src.includes(`<LeviNowMap lang="${lang}" page="contact-page" />`), `${file}: the map`);
    assert.ok(src.includes(`id="${anchor}"`) && src.includes(`href="#${anchor}"`), `${file}: the location button leads to the map`);
    assert.ok(!src.includes("EXTERNAL_LINKS.levi"), `${file}: no "see location" link to the levifinland.fi blog post`);
  }
  for (const [file, anchor] of [["src/app/(fi)/mokki/page.tsx", "#sijainti"], ["src/app/(en)/en/cabin/page.tsx", "#location"]]) {
    const src = read(file);
    assert.ok(!src.includes("<LeviNowMap"), `${file}: the map is on the contact page`);
    assert.ok(src.includes(`"contact")}${anchor}`), `${file}: links to the map`);
  }
});
