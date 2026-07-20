import type { NextConfig } from "next";
import { buildNextRedirects } from "./src/lib/redirects.ts";

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
};

export default nextConfig;
