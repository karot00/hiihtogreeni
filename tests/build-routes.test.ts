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
    const manifestRoute = page === "/" ? page : page.slice(0, -1);
    assert.ok(
      routes.includes(manifestRoute),
      `canonical page must be prerendered static: ${page}`,
    );
    assert.equal(
      manifest.routes[manifestRoute].initialRevalidateSeconds,
      false,
      `static page must not be revalidated: ${page}`,
    );
  }
  // No unexpected dynamic routes beyond the approved whitelist.
  const dynamic = Object.keys(manifest.dynamicRoutes ?? {});
  assert.deepEqual(dynamic.sort(), [], "no app-router dynamicRoutes expected for canonical pages");
  void EXPECTED_DYNAMIC;
});

test("generated sitemap uses trailing-slash canonical URLs", () => {
  const sitemapPath = resolve(".next/server/app/sitemap.xml.body");
  assert.ok(existsSync(sitemapPath), "generated sitemap must exist (run build first)");
  const sitemap = readFileSync(sitemapPath, "utf8");
  const urls = [...sitemap.matchAll(/(?:<loc>|href=")([^<"]+)/g)].map((match) => match[1]);

  assert.equal(sitemap.match(/<loc>/g)?.length, 10, "sitemap must contain ten pages");
  for (const value of urls) {
    assert.ok(new URL(value).pathname.endsWith("/"), `sitemap URL must be canonical: ${value}`);
  }
});
