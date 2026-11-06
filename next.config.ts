import type { NextConfig } from "next";
import { buildNextRedirects } from "./src/lib/redirects.ts";
import { BROCHURE_PATHS, ROUTES } from "./src/lib/routes.ts";
import { SITE_CONFIG } from "./src/lib/config.ts";
import { API_CATALOG_URL } from "./src/lib/discovery.ts";

const nextConfig: NextConfig = {
  trailingSlash: true,
  experimental: {
    globalNotFound: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.hiihtogreeni.fi",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
  async redirects() {
    return buildNextRedirects();
  },
  async headers() {
    return [
      // The brochure PDFs point search engines to the companies page, so the
      // page ranks rather than the PDF (GEO plan 7.3).
      ...(["fi", "en"] as const).map((lang) => ({
        source: BROCHURE_PATHS[lang],
        headers: [{ key: "Link", value: `<${SITE_CONFIG.url}${ROUTES[lang].companies}>; rel="canonical"` }],
      })),
      // RFC 9727: the home page tells agents where the API catalog is.
      { source: "/", headers: [{ key: "Link", value: `<${API_CATALOG_URL}>; rel="api-catalog"` }] },
    ];
  },
};

export default nextConfig;
