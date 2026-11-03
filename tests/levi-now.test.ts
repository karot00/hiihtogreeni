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

test("both cabin pages show the map in their location section", () => {
  for (const [file, lang] of [["src/app/(fi)/mokki/page.tsx", "fi"], ["src/app/(en)/en/cabin/page.tsx", "en"]]) {
    const src = readFileSync(new URL(`../${file}`, import.meta.url), "utf8");
    assert.ok(src.includes(`<LeviNowMap lang="${lang}" page="cabin-page" />`), file);
  }
});
