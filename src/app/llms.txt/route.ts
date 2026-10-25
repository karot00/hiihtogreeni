import { buildLlmsTxt } from "../../lib/llms.ts";

// Built from the content files, so it is rendered once at build time.
export const dynamic = "force-static";

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
