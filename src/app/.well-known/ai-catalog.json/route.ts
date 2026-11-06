import { AI_CATALOG_TYPE, aiCatalog, discoveryHeaders } from "../../../lib/discovery.ts";

export const dynamic = "force-static";

export function GET() {
  return new Response(JSON.stringify(aiCatalog()), { headers: discoveryHeaders(AI_CATALOG_TYPE) });
}
