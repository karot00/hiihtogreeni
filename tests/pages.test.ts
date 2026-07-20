import { test } from "node:test";
import assert from "node:assert/strict";
import { spawn, type ChildProcess } from "node:child_process";
import { SITE_CONFIG } from "../src/lib/config.ts";
import {
  PAGE_SMOKE_FIXTURES,
  type PageSmokeFixture,
} from "./fixtures/pages.ts";

function abs(path: string): string {
  return `${SITE_CONFIG.url}${path}`;
}

test("page fixtures cover all ten canonical pages", () => {
  const fiExpected = ["/", "/mokki/", "/kuvagalleria/", "/hinnoittelu/", "/yhteystiedot/"];
  const enExpected = [
    "/en/home/",
    "/en/cabin/",
    "/en/photo-gallery/",
    "/en/rates/",
    "/en/contact-information/",
  ];
  const fi = PAGE_SMOKE_FIXTURES.filter((f) => f.lang === "fi").map((f) => f.path).sort();
  const en = PAGE_SMOKE_FIXTURES.filter((f) => f.lang === "en").map((f) => f.path).sort();
  assert.deepEqual(fi, fiExpected.sort());
  assert.deepEqual(en, enExpected.sort());
});

test("page fixtures assert unique language values and canonical hosts", () => {
  for (const fx of PAGE_SMOKE_FIXTURES) {
    assert.ok(fx.lang === "fi" || fx.lang === "en", `unexpected lang ${fx.lang}`);
    assert.ok(
      fx.canonicalHost === "www.hiihtogreeni.fi",
      `canonical host must be www: ${fx.path}`,
    );
  }
});

const LIVE = process.env.PAGE_LIVE_TEST === "1";

test(
  "live production server renders every canonical page with correct lang, title, canonical, h1, and indexable robots",
  { skip: LIVE ? false : "set PAGE_LIVE_TEST=1 with a built .next to validate rendered HTML" },
  async () => {
    const port = 3940;
    const base = `http://127.0.0.1:${port}`;
    const server = await startServer(port);
    try {
      for (const fx of PAGE_SMOKE_FIXTURES) {
        const res = await fetch(`${base}${fx.path}`, { redirect: "manual" });
        assert.equal(
          res.status,
          200,
          `${fx.path} -> expected 200 but got ${res.status}`,
        );
        const html = await res.text();
        assertPage(fx, html);
      }
    } finally {
      stopServer(server);
    }
  },
);

function assertPage(fx: PageSmokeFixture, html: string): void {
  const lang = /<html[^>]*\blang="([^"]+)"/i.exec(html)?.[1];
  assert.equal(lang, fx.lang === "fi" ? "fi" : "en-GB", `${fx.path} html lang`);

  const title = /<title>([^<]*)<\/title>/i.exec(html)?.[1]?.trim();
  assert.ok(title, `${fx.path} has a title`);
  assert.equal(title, fx.title, `${fx.path} title`);

  const canonical = /<link[^>]*\brel="canonical"[^>]*\bhref="([^"]+)"/i.exec(html)?.[1];
  assert.ok(canonical, `${fx.path} has a canonical link`);
  assert.equal(
    canonical?.replace(/^https?:\/\//, ""),
    abs(fx.path).replace(/^https?:\/\//, ""),
    `${fx.path} canonical matches production URL`,
  );

  const robots = /<meta[^>]*\bname="robots"[^>]*\bcontent="([^"]+)"/i.exec(html);
  if (robots) {
    assert.ok(
      !/noindex/i.test(robots[1]),
      `${fx.path} must not be noindex: ${robots[1]}`,
    );
  }

  const h1 = (html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) ?? []).length;
  assert.equal(h1, 1, `${fx.path} must have exactly one h1`);

  const hreflangs = [...html.matchAll(/<link[^>]*\brel="alternate"[^>]*\bhreflang="([^"]+)"[^>]*\bhref="([^"]+)"/gi)];
  const hreflangCodes = hreflangs.map((m) => m[1]);
  for (const expected of ["fi", "en-GB", "x-default"]) {
    assert.ok(
      hreflangCodes.includes(expected),
      `${fx.path} must declare hreflang ${expected}`,
    );
  }
}

async function startServer(port: number): Promise<ChildProcess> {
  const child = spawn("npx", ["next", "start", "-p", String(port)], {
    cwd: process.cwd(),
    stdio: ["ignore", "ignore", "ignore"],
    env: process.env,
  });
  await waitForReady(port);
  return child;
}

async function waitForReady(port: number): Promise<void> {
  const deadline = Date.now() + 60_000;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/`);
      if (res.ok || res.status === 404) return;
    } catch {
      // not ready yet
    }
    await new Promise((r) => setTimeout(r, 750));
  }
  throw new Error("server did not become ready");
}

function stopServer(child: ChildProcess): void {
  child.kill("SIGTERM");
}
