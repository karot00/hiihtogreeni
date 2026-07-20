import { test } from "node:test";
import assert from "node:assert/strict";
import { spawn, type ChildProcess } from "node:child_process";
import { LINK_CHECK_PAGES, EXPECTED_NON_200_SAME_ORIGIN } from "./fixtures/linkcheck.ts";

const LIVE = process.env.LINKCHECK_LIVE_TEST === "1";

test(
  "live production server: same-origin links and images resolve (no broken internal links)",
  { skip: LIVE ? false : "set LINKCHECK_LIVE_TEST=1 with a built .next to crawl links" },
  async () => {
    const port = 3941;
    const base = `http://127.0.0.1:${port}`;
    const server = await startServer(port);
    try {
      const checked = new Set<string>();
      for (const start of LINK_CHECK_PAGES) {
        const queue = [start];
        while (queue.length) {
          const path = queue.shift()!;
          if (checked.has(path)) continue;
          checked.add(path);
          const res = await fetch(`${base}${path}`, { redirect: "manual" });
          const html = res.status === 200 ? await res.text() : "";
          const hrefs = collect(html, /<a[^>]*\bhref="([^"]+)"/gi);
          const imgs = collect(html, /<(?:img|source)[^>]*\bsrc="([^"]+)"/gi);
          const links = [...hrefs, ...imgs];
          for (const raw of links) {
            if (!raw.startsWith("/")) continue;
            const clean = raw.split("#")[0].split("?")[0];
            if (clean === path) continue;
            if (EXPECTED_NON_200_SAME_ORIGIN.has(clean)) continue;
            const target = await fetch(`${base}${clean}`, { redirect: "manual" });
            assert.ok(
              target.status === 200 || target.status === 308 || target.status === 410,
              `broken same-origin link ${clean} from ${path} -> ${target.status}`,
            );
            if (target.status === 200 && clean.endsWith("/") && LINK_CHECK_PAGES.includes(clean)) {
              queue.push(clean);
            }
          }
        }
      }
    } finally {
      stopServer(server);
    }
  },
);

function collect(html: string, re: RegExp): string[] {
  const out: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) out.push(m[1]);
  return out;
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
      await fetch(`http://127.0.0.1:${port}/`);
      return;
    } catch {
      await new Promise((r) => setTimeout(r, 750));
    }
  }
  throw new Error("server did not become ready");
}

function stopServer(child: ChildProcess): void {
  child.kill("SIGTERM");
}
