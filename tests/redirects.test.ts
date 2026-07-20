import { test } from "node:test";
import assert from "node:assert/strict";
import { spawn, type ChildProcess } from "node:child_process";
import { createInterface } from "node:readline";
import { REDIRECT_FIXTURES, assertConfigMatchesFixtures } from "./fixtures/redirects.ts";

test("redirect fixtures match the application redirect configuration", () => {
  assertConfigMatchesFixtures();
});

test("every redirect fixture has a unique source and a valid expectation", () => {
  const seen = new Set<string>();
  for (const fx of REDIRECT_FIXTURES) {
    assert.ok(!seen.has(fx.source), `duplicate fixture source: ${fx.source}`);
    seen.add(fx.source);
    if (fx.expectedStatus >= 300 && fx.expectedStatus < 400) {
      assert.ok(fx.expectedLocation, `redirect ${fx.source} must declare a location`);
    } else {
      assert.equal(fx.expectedLocation, null, `non-redirect ${fx.source} must not declare a location`);
    }
  }
  assert.ok(seen.has("/en/gallery"));
  assert.ok(seen.has("/wp-sitemap.xml"));
});

const LIVE = process.env.REDIRECT_LIVE_TEST === "1";

test(
  "live production server returns the expected status and final location for every fixture",
  { skip: LIVE ? false : "set REDIRECT_LIVE_TEST=1 with a built .next to validate over HTTP" },
  async () => {
    const port = 3939;
    const base = `http://127.0.0.1:${port}`;
    const server = await startServer(port);
    try {
      for (const fx of REDIRECT_FIXTURES) {
        const res = await fetch(`${base}${fx.source}`, { redirect: "manual" });
        assert.equal(
          res.status,
          fx.expectedStatus,
          `${fx.source} -> expected ${fx.expectedStatus} but got ${res.status}`,
        );
        const location = res.headers.get("location");
        if (fx.expectedLocation === null) {
          assert.equal(location, null, `${fx.source} should not emit a location`);
        } else {
          assert.ok(location, `${fx.source} should emit a location header`);
          assert.equal(
            normalizeLocation(location!),
            normalizeLocation(fx.expectedLocation),
            `${fx.source} -> location mismatch`,
          );
        }
      }
    } finally {
      stopServer(server);
    }
  },
);

function normalizeLocation(loc: string): string {
  return loc.replace(/^https?:\/\/[^/]+/, "");
}

async function startServer(port: number): Promise<ChildProcess> {
  const child = spawn("npx", ["next", "start", "-p", String(port)], {
    cwd: process.cwd(),
    stdio: ["ignore", "pipe", "pipe"],
    env: process.env,
  });
  await waitForReady(child, port);
  return child;
}

async function waitForReady(child: ChildProcess, port: number): Promise<void> {
  const deadline = Date.now() + 30_000;
  const ready = new Promise<void>((resolve, reject) => {
    const out = child.stdout ? createInterface({ input: child.stdout }) : null;
    const err = child.stderr ? createInterface({ input: child.stderr }) : null;
    const check = () => fetch(`http://127.0.0.1:${port}/`).then(
      () => resolve(),
      () => {
        if (Date.now() > deadline) reject(new Error("server did not become ready"));
      },
    );
    const timer = setInterval(check, 500);
    const done = () => {
      clearInterval(timer);
      out?.close();
      err?.close();
    };
    Promise.race([out ? new Promise((res) => out.on("line", res)) : Promise.resolve(), Promise.resolve()]);
    child.on("exit", (code) => {
      done();
      reject(new Error(`server exited early with code ${code}`));
    });
    check();
  });
  return ready;
}

function stopServer(child: ChildProcess): void {
  child.kill("SIGTERM");
}
