import { API_CATALOG_TYPE, API_CATALOG_URL, apiCatalog, discoveryHeaders } from "../../../lib/discovery.ts";

export const dynamic = "force-static";

// RFC 9727 wants the Link header on HEAD too; Next.js answers HEAD from this handler.
export function GET() {
  return new Response(JSON.stringify(apiCatalog()), {
    headers: { ...discoveryHeaders(API_CATALOG_TYPE), link: `<${API_CATALOG_URL}>; rel="api-catalog"` },
  });
}
