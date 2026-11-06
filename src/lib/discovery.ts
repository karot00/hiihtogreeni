import { API_BASE, MCP_URL, OPENAPI_URL } from "./booking-api.ts";
import { SITE_CONFIG } from "./config.ts";

/**
 * Machine-readable pointers from this domain to the booking system's API and
 * MCP server, which live on cabins.levifinland.fi. That system publishes the
 * same catalogs (levifinland2026 plan 7.8.8): keep the identifier and links in step.
 */
export const API_CATALOG_PATH = "/.well-known/api-catalog";
export const API_CATALOG_URL = `${SITE_CONFIG.url}${API_CATALOG_PATH}`;
export const API_CATALOG_TYPE = 'application/linkset+json; profile="https://www.rfc-editor.org/info/rfc9727"';
export const AI_CATALOG_TYPE = "application/ai-catalog+json";
export const SERVER_CARD_TYPE = "application/mcp-server-card+json";
export const SERVER_CARD_URL = `${MCP_URL}/server-card`;

/** RFC 9727 API catalog. */
export function apiCatalog() {
  return {
    linkset: [
      {
        anchor: API_BASE,
        "service-desc": [{ href: OPENAPI_URL, type: "application/json" }],
        "service-doc": [{ href: `${SITE_CONFIG.url}/llms.txt`, type: "text/plain" }],
      },
    ],
  };
}

/** AI Catalog 1.0: the MCP server's card for domain-level discovery. */
export function aiCatalog() {
  return {
    specVersion: "1.0",
    entries: [
      {
        identifier: "urn:air:levifinland.fi:mcp:levin-hiihtogreeni",
        displayName: "Levin Hiihtogreeni, Levi (booking)",
        type: SERVER_CARD_TYPE,
        url: SERVER_CARD_URL,
      },
    ],
  };
}

/** The documents are static metadata and open to any origin. */
export function discoveryHeaders(type: string): Record<string, string> {
  return { "access-control-allow-origin": "*", "cache-control": "public, max-age=3600", "content-type": type };
}
