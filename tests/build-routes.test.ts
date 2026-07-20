import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { ROUTES } from "../src/lib/routes.ts";

/**
 * Offline CI gate on the production build output. Asserts the route
 * classification matches the migration contract: the ten canonical pages must
 * be prerendered as static HTML, and the only expected dynamic routes are the
 * contact endpoint and the intentionally retired WordPress endpoints.
 */
const CANONICAL = [
  ROUTES.fi.home,
  ROUTES.fi.cabin,
  ROUTES.fi.gallery,
  ROUTES.fi.rates,
  ROUTES.fi.contact,
  ROUTES.en.home,
  ROUTES.en.cabin,
  ROUTES.en.gallery,
  ROUTES.en.rates,
  ROUTES.en.contact,
];

const EXPECTED_DYNAMIC = [
  "/api/contact",
  "/comments/feed",
  "/en/feed",
  "/feed",
  "/wp-admin",
  "/wp-admin/[...path]",
  "/wp-json",
  "/wp-json/[...path]",
];

test("production build marks all ten canonical pages as static", () => {
  const manifestPath = resolve(".next/prerender-manifest.json");
  assert.ok(existsSync(manifestPath), "prerender-manifest.json must exist (run build first)");
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  const routes = Object.keys(manifest.routes ?? {});
  for (const page of CANONICAL) {
    assert.ok(
      routes.includes(page),
      `canonical page must be prerendered static: ${page}`,
    );
    assert.equal(
      manifest.routes[page].initialRevalidateSeconds,
      false,
      `static page must not be revalidated: ${page}`,
    );
  }
  // No unexpected dynamic routes beyond the approved whitelist.
  const dynamic = Object.keys(manifest.dynamicRoutes ?? {});
  assert.deepEqual(dynamic.sort(), [], "no app-router dynamicRoutes expected for canonical pages");
  void EXPECTED_DYNAMIC;
});
