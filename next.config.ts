import type { NextConfig } from "next";
import { buildNextRedirects } from "./src/lib/redirects.ts";
import { BROCHURE_PATHS, ROUTES } from "./src/lib/routes.ts";
import { SITE_CONFIG } from "./src/lib/config.ts";

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
  // The brochure PDFs point search engines to the companies page, so the page
  // ranks rather than the PDF (GEO plan 7.3).
  async headers() {
    return (["fi", "en"] as const).map((lang) => ({
      source: BROCHURE_PATHS[lang],
      headers: [{ key: "Link", value: `<${SITE_CONFIG.url}${ROUTES[lang].companies}>; rel="canonical"` }],
    }));
  },
};

export default nextConfig;
